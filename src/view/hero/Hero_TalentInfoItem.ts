/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_TalentInfoItem extends ui.hero.Hero_TalentInfoItemUI {
		constructor() {
			super();
			this.setData();
		}
		public client_func_index = 54;
		//开启所需等级总数
		private sum;
		//玩家等级总数
		private mySum;
		public setData(): void {
			this.panel_talent.vScrollBarSkin = '';
			this.vbox_talent['sortItem'] = items => { };
			this.addEvent();
			this.activation();
		}
		public addEvent(): void {
			if (this.mySum >= this.sum) {
				//激活
				this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
					GameUtil.setServerData(this.client_func_index);
					this.activation();
				})
			}
			else {
				this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
					TipsManage.showTips('您当前等级不足，暂时不能开启')
				});
			}
			//属性统计
			this.btn_statistics.on(Laya.UIEvent.CLICK, this, () => {
				new view.hero.HeroTalentDialog().popup();
			})
		}
		public activation(): void {
			//判断是否激活
			if (GameUtil.getServerData(this.client_func_index)) {
				this.viw_talent.selectedIndex = 1;
				this.init_talentNum();
			}
			else {
				this.viw_talent.selectedIndex = 0;
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
			this.sum = zsLvl * 1000 + lvl;
			this.mySum = GameApp.MainPlayer.zslevel * 1000 + GameApp.MainPlayer.level;
		}
		/**
		 * 拉取天赋
		 */
		public init_talentNum(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_heroAllGeniusLvl, null, null, this, (jsonData) => {
				let keys = Object.keys(jsonData.lvltab);
				for (let key of keys) {
					let data = jsonData.lvltab[key];
					this.vbox_talent.addChild(new view.hero.Hero_TalentInfoFloorItem().setData(key))
				}
				Laya.timer.frameOnce(1, this, () => {
					this.panel_talent.scrollTo(0, this.vbox_talent.height);
				})
			})
			lcp.send(pkt);
		}
		public init_talentData(data: ProtoCmd.itf_Hero_TalentInfo): void {
			this.lbl_talentMagic.text = '' + data.gssecore;
			
		}
	}
}