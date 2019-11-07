/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_InfoItem extends ui.hero.Hero_InfoItemUI {
		constructor() {
			super();
			this.setData();
		}
		private num;
		private proto;
		public job;
		public info = GameApp.GameEngine.HeroInfo;
		public setData(): void {
			this.addEvent();
		}
		public addEvent(): void {
			//激活弟子
			this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
				if (this.num == 1) {
					//激活弟子1
					this.proto = ProtoCmd.Hero_firstGenHero;
					this.init_JiHuo();
				}
				else {
					//激活弟子2|3
					this.proto = ProtoCmd.Hero_HeroJiHuo2and3;
					this.init_JiHuo();

				}
			})
			//符文套装
			this.btn_rune.on(Laya.UIEvent.CLICK, this, () => {
				new view.hero.Hero_RuneDialog().setData(this.job).popup(true);
			})
		}
		/**
		 * 弟子基本信息
		 */
		public baseInfo(i): void {
			let j = i + 1;
			this.job = this.info[j].JOB;
			//弟子全身像
			let heroSex;
			if (GameApp.MainPlayer.sex == EnumData.SEX_TYPE.SEX_MAN) {
				heroSex = EnumData.SEX_TYPE.SEX_WOMEN;
			}
			if (GameApp.MainPlayer.sex == EnumData.SEX_TYPE.SEX_WOMEN) {
				heroSex = EnumData.SEX_TYPE.SEX_MAN;
			}
			this.img_hero.skin = LangConfig.getPlayerAvatarSkin(heroSex, this.job)
			this.num = j;
			this.btn_jihuo.gray = false;
			this.btn_jihuo.mouseEnabled = false;
			this.btn_jihuo.label = '激活';
			PanelManage.DiZi.tab_left.mouseEnabled = true;
			switch (this.info[j].STATE) {
				case 0:
					this.btn_jihuo.gray = true;
					this.viw_dizi.selectedIndex = 0;
					PanelManage.DiZi.tab_left.mouseEnabled = false;
					break;
				case 1:
					this.btn_jihuo.label = '可激活';
					this.viw_dizi.selectedIndex = 0;
					PanelManage.DiZi.tab_left.mouseEnabled = false;
					this.btn_jihuo.mouseEnabled = true;
					break;
				case 2:
					this.viw_dizi.selectedIndex = 1;
					break;
			}

		}
		//激活第一个弟子
		public init_JiHuo(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(this.proto, [this.num])
			lcp.send(pkt);
			//刷新弟子状态
			this.info[this.num].STATE = 2;
			this.baseInfo((this.num - 1));
		}
	}

}