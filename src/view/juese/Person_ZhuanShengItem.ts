/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_ZhuanShengItem extends ui.juese.Person_ZhuanShengItemUI {
		constructor() {
			super();
			this.setData();
		}
		//当前经验-最大经验
		public exp;
		//功能编号
		public client_func_index = 21;
		//修为相关数据
		public xiuweidata;
		//兑换修为弹窗
		public buyDialog: Person_BuyAndUseDialog;
		public hasint = false;
		public setData(): void {
			if (this.hasint) { return };
			this.hasint = true;
			this.vbox_left['sortItem'] = (items) => { };
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
					this.buyDialog = new Person_BuyAndUseDialog;
					this.buyDialog.setData(this.xiuweidata, 3).popup();
				}
			})
		}
		public activation(): void {
			//判断是否激活
			if (GameApp.MainPlayer.lvlCount > 80) {
				this.viw_sangong.selectedIndex = 1;
				this.addLcpEvent();
				this.init_zhuangshengPanel();
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
			this.lbl_condition.text = '玩家等级达到1转'
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
				//头像
				this.img_mine1.skin = this.img_mine2.skin = LangConfig.getPlayerIconSkinV1();
				if (jsonData.effid != 0) {
					//当前转生等级
					this.lbl_dangqian.text = GameApp.MainPlayer.zslevel + '转';
					//下一转生等级
					this.lbl_next.text = (GameApp.MainPlayer.zslevel + 1) + '转';
					if (GameApp.MainPlayer.zslevel == 0) {
						this.lbl_null.visible = true;
					} else {
						this.lbl_null.visible = false;
					}
					//根据当前职业偏移当前效果id
					let job = GameApp.MainPlayer.job;
					let jobid = jsonData.effid + (job - 1) * 1000;
					//当前属性
					let shuxing1 = GameUtil.parseEffectidToObj(['' + jobid])
					let attribute1 = shuxing1.des;
					let battle1 = shuxing1.battle[job];
					if (parseInt(this.lbl_battle.text)) {
						let num = parseInt(this.lbl_battle.text);
						GameUtil.battleChange(0, null, this.lbl_battle, num, battle1);
					}
					this.lbl_battle.text = '' + battle1;
					if (GameApp.MainPlayer.zslevel < 15) {
						//当前转生等级不是最大转生等级
						this.img_dangqian.x = 120;
						this.img_change.visible = true;
						this.img_next.visible = true;
						//下级属性
						let id = SheetConfig.mydb_effect_base_tbl.getInstance(null).NEXTID('' + jobid)
						let shuxing2 = GameUtil.parseEffectidToObj(['' + id])
						let attribute2 = shuxing2.des;
						let battle2 = shuxing2.battle[job];
						this.lbl_battleup.text = '+' + (battle2 - battle1);
						this.vbox_left.removeChildren();
						for (let key in attribute1) {
							this.vbox_left.addChild(new view.juese.Person_attributeItem().setData(attribute1[key], attribute2[key], 1))
						}
					} else {
						//当前转生等级是最大转生等级
						this.img_dangqian.x = 255;
						this.img_change.visible = false;
						this.img_next.visible = false;
						this.lbl_battleup.text = '';
						this.vbox_left.removeChildren();
						for (let key in attribute1) {
							this.vbox_left.addChild(new view.juese.Person_attributeItem().setData(attribute1[key], null, 1))
						}
					}
				}
				this.init_xiuwei();
			})
		}
		public destroy(isbool): void {
			GameApp.LListener.offCaller(ProtoCmd.Hero_zhuanShengPanel, this);
			super.destroy(isbool);
		}
		/**
		 * 修为
		 * 
		 */
		public init_xiuwei(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_getXiuWeiPanel, [0], null, this, (jsonData: ProtoCmd.itf_Hero_XiuWeiInfo) => {
				if (jsonData.exp != undefined) {
					if (this.buyDialog) {
						this.buyDialog.setData(jsonData, 3);
					}
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
				pkt.setString(ProtoCmd.Hero_zhuanSheng, [0])
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
			pkt.setString(ProtoCmd.Hero_zhuanShengPanel, [0])
			lcp.send(pkt);
		}
	}
}