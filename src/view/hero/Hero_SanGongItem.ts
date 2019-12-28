/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_SanGongItem extends ui.hero.Hero_SanGongItemUI {
		constructor() {
			super();
		}
		//当前经验-最大经验
		public exp;
		//功能编号
		public client_func_index = 56;
		//开启所需等级总数
		private sum;
		//当前弟子职业
		private job;
		public xiuweidata;
		public hasint = false;
		public setData(): void {
			if (this.hasint) { return };
			this.hasint = true;
			// this.job = job;
			// let hasActive = GameApp.MainPlayer.heroObj(job).lockState == 2;
			this.vbox_left['sortItem'] = (items) => { };
			// this.vbox_right['sortItem'] = (items) => { };
			this.activation();
			this.addEvent();
		}
		public addEvent(): void {
			//转生突破
			this.btn_zhuanSheng.on(Laya.UIEvent.CLICK, this, () => {
				this.init_UpLevel();
			})
			//购买
			this.btn_buy.on(Laya.UIEvent.CLICK, this, () => {
				if (this.xiuweidata) {
					new view.juese.Person_BuyAndUseDialog().setData(this.xiuweidata, 2).popup();
				}
			})

			//开启
			this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
				if (GameApp.MainPlayer.curHero.level >= 80) {
					GameUtil.setServerData(this.client_func_index);
					this.activation();
				}
				else {
					TipsManage.showTips('您的弟子当前等级不足，暂时不能开启')
				}
			})
		}
		public activation(): void {
			//判断是否激活
			if (GameApp.MainPlayer.curHero.level >= 80) {
				this.viw_sangong.selectedIndex = 1;
				this.addLcpEvent();
				this.init_zhuangshengPanel();
				this.init_xiuwei();
			}
			else {
				this.viw_sangong.selectedIndex = 0;
				this.notActivation();
			}
		}
		/**
	  * 未激活时
	  */
		public notActivation(): void {
			let id = this.client_func_index + 1000;
			let activationLvl = SheetConfig.Introduction_play.getInstance(null).LEVEL('' + id);
			let zsLvl = Math.floor(activationLvl / 1000);
			let lvl = activationLvl % 1000;
			this.lbl_detail.text = SheetConfig.Introduction_play.getInstance(null).CONTENT('' + id);
			this.lbl_condition.text = '弟子等级达到80级'
			this.sum = zsLvl * 1000 + lvl;
		}
		/**
		 * 转生面板
		 */
		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.Hero_zhuanShengPanel, this, (jsonData: ProtoCmd.itf_Hero_ZhuanShengInfo) => {
				let exp = jsonData.xw - jsonData.maxxw;
				this.exp = exp;
				//转生所需经验
				this.lbl_need.text = '' + LangConfig.getBigNumberDes(jsonData.maxxw);
				this.lbl_have.text = '' + LangConfig.getBigNumberDes(jsonData.xw);
				let result = jsonData.xw - jsonData.maxxw;
				if (result < 0) {
					this.lbl_have.color = '#a53232';
				} else {
					this.lbl_have.color = '#000000';
				}
				let sex;
				if (GameApp.MainPlayer.sex == EnumData.SEX_TYPE.SEX_MAN) {
					sex = EnumData.SEX_TYPE.SEX_WOMEN;
				}
				if (GameApp.MainPlayer.sex == EnumData.SEX_TYPE.SEX_WOMEN) {
					sex = EnumData.SEX_TYPE.SEX_MAN;
				}
				//弟子头像
				this.img_curhero1.skin = this.img_curhero2.skin = LangConfig.getPlayerIconSkinV1(sex, GameApp.MainPlayer.curHero.feature.simpleFeature.job)
				if (jsonData.effid != 0) {
					//当前弟子转生等级
					this.lbl_dangqian.text = GameObject.Hero.zslevel + '转';
					//当前弟子下一转生等级
					this.lbl_next.text = (GameObject.Hero.zslevel + 1) + '转';
					if (GameObject.Hero.zslevel < 15) {
						//当前转生等级不是最大转生等级
						this.img_dangqian.x = 120;
						this.img_change.visible = true;
						this.img_next.visible = true;
					} else {
						//当前转生等级是最大转生等级
						this.img_dangqian.x = 255;
						this.img_change.visible = false;
						this.img_next.visible = false;
					}
					//根据当前弟子职业偏移当前弟子效果id
					let jobid = jsonData.effid + (GameApp.MainPlayer.curHero.feature.simpleFeature.job - 1) * 1000;
					//当前属性
					let shuxing1 = GameUtil.parseEffectidToObj(['' + jobid])
					let attribute1 = shuxing1.des;
					let curJob = GameApp.MainPlayer.curHero.feature.simpleFeature.job;
					let battle1 = shuxing1.battle[curJob];
					this.lbl_battle.text = '' + battle1;
					//下级属性
					let id = SheetConfig.mydb_effect_base_tbl.getInstance(null).NEXTID('' + jobid)
					let shuxing2 = GameUtil.parseEffectidToObj(['' + id])
					let attribute2 = shuxing2.des;
					let battle2 = shuxing2.battle[curJob];
					this.lbl_battleup.text = '+' + (battle2 - battle1);
					this.vbox_left.removeChildren();
					for (let key in attribute1) {
						this.vbox_left.addChild(new view.juese.Person_attributeItem().setData(attribute1[key], attribute2[key], 1))
					}
				}
			})
		}
		public destroy(isbool): void {
			GameApp.LListener.offCaller(ProtoCmd.Hero_zhuanShengPanel, this);
			super.destroy(isbool);
		}
		/**
		 * 修为
		 */
		public init_xiuwei(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_getXiuWeiPanel, [1], null, this, (jsonData: ProtoCmd.itf_Hero_XiuWeiInfo) => {
				if (jsonData.exp != undefined) {
					this.xiuweidata = jsonData;
				}
			})
			lcp.send(pkt);
		}
		/**
		 * 突破转生
		 */
		public init_UpLevel(): void {
			if (this.exp >= 0) {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.Hero_zhuanSheng, [1])
				lcp.send(pkt);
			}
			else {
				TipsManage.showTips('当前经验不足');
			}

		}
		/**
		 * 转生面板发协议
		 */
		public init_zhuangshengPanel(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_zhuanShengPanel, [1])
			lcp.send(pkt);
		}
	}
}
