/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_ShengWangItem extends ui.juese.Person_ShengWangItemUI {
		constructor() {
			super();
		}
		public hasInit = false;// 初始化自己
		private client_func_index = 18;// 功能ID编号
		//角色职业
		private job = GameApp.MainPlayer.job;
		public setData(): void {
			if (this.hasInit) { return };
			this.hasInit = true;
			this.panel_shengWang.hScrollBarSkin = '';
			this.hbox_shengWang['sortItem'] = (items) => { };
			this.vbox_left['sortItem'] = (items) => { };
			this.vbox_right['sortItem'] = (items) => { };
			this.addEvent();
			this.activation();
		}
		public addEvent(): void {
			//开启
			this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
				let activationLvl = SheetConfig.Introduction_play.getInstance(null).LEVEL('' + (this.client_func_index + 1000));
				if (GameApp.MainPlayer.lvlCount >= activationLvl) {
					GameUtil.setServerData(this.client_func_index);
					this.activation();
				}
				else {
					TipsManage.showTips('您当前等级不足，暂时不能开启');
				}
			});
		}
		public activation(): void {
			//判断是否激活
			if (GameUtil.getServerData(this.client_func_index)) {
				this.viw_shengwang.selectedIndex = 1;
				this.getShengWangInfo();
				this.init_myData();
			}
			else {
				this.viw_shengwang.selectedIndex = 0;
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
			this.lbl_condition.text = '' + SheetConfig.Introduction_play.getInstance(null).TEXT1('' + id)
		}
		/**
		 * 获取江湖声望信息
		 */
		public getShengWangInfo(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JS_PrestigePanel, null, null, this, (jsonData: ProtoCmd.itf_JS_ShengWangInfo) => {
				console.log('=====>声望声望', jsonData)
				this.lbl_use.text = '每日消耗' + jsonData.daydelexp + '点声望值';
				this.lbl_xiaoguo.text = '威慑\n 攻击威望值低于自己的玩家' + jsonData.damage;
				//我的声望头衔
				for (let i = 0; jsonData.titletab[i]; i++) {
					if (jsonData.prestigeid == i) {
						this.lbl_title.text = '' + jsonData.titletab[i].name;
					}
				}
				//声望经验值进度条
				this.img_progress.width = 211 * jsonData.minexp / jsonData.maxexp;
				//声望经验值
				this.lbl_value.text = jsonData.minexp + '/' + jsonData.maxexp;
				//声望排名
				this.lbl_one.text = '声望第一：' + jsonData.rank[1];
				this.lbl_two.text = '声望第二：' + jsonData.rank[2];
				this.lbl_three.text = '声望第三：' + jsonData.rank[3];
				// //当前属性
				let shuxing1 = GameUtil.parseEffectidToObj(['' + jsonData.effid])
				let attribute1 = shuxing1.des;
				let battle1 = shuxing1.battle[this.job];
				this.clip_power1.value = '' + battle1;
				let keys1 = Object.keys(attribute1)
				this.vbox_left.removeChildren();
				for (let key of keys1) {
					this.vbox_left.addChild(new view.compart.SinglePropsItem().setData(attribute1[key]))
				}
				//下级属性
				let id = parseInt(SheetConfig.mydb_effect_base_tbl.getInstance(null).NEXTID('' + jsonData.effid));
				if (id !== 0) {
					let shuxing2 = GameUtil.parseEffectidToObj(['' + id])
					let attribute2 = shuxing2.des;
					let battle = shuxing2.battle[this.job];
					this.clip_power2.value = '' + battle;
					let battle2 = shuxing2.battle[this.job];
					let keys2 = Object.keys(attribute1)
					this.vbox_right.removeChildren();
					for (let key of keys2) {
						this.vbox_right.addChild(new view.compart.SinglePropsItem().setData(attribute1[key]))
					}
				}

				//威望预览
				this.hbox_shengWang.removeChildren();
				for (let i = 0; jsonData.titletab[i]; i++) {
					this.hbox_shengWang.addChild(new view.juese.Person_ShengWangQiZiItem().setData(jsonData.titletab[i], i))
				}
			})
			lcp.send(pkt);
		}
		public init_myData(): void {
			let pkt = new ProtoCmd.stMyRankRequest();
			pkt.setValue('rankType', EnumData.emRankType.Cret_Fame_Rank)
			lcp.send(pkt, this, (data) => {
				let bpkt = new ProtoCmd.stMyRankReturn(data);
				if (bpkt.rank == undefined) {
					this.lbl_myRank.text = '未上榜';
				} else {
					this.lbl_myRank.text = '' + bpkt.rank;
				}
			})
		}
	}
}