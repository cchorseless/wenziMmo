/**Created by the LayaAirIDE*/
module view.hero {
	export class HeroPanel extends ui.hero.HeroPanelUI {
		constructor() {
			super();
		}
		//弟子职业
		public curJob;
		public setData(job): void {
			this.tab_left.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_left.selectedIndex = index;
				this.img_bg.visible = (index == 0);
			}, null, false);
			this.updateIcon();
			this.updateUI(job);
			this.addEvent();
		}

		public updateUI(job: EnumData.JOB_TYPE) {
			this.curJob = job;
			for (let j = 1; j < 4; j++) {
				this['btn_dizi' + j].selected = (job == j);
			}
			this.tab_left.selectedIndex = 0;
			// 判断是否激活
			// 是否已经激活
			let hasActive = GameApp.MainPlayer.heroObj(job).lockState == 2;
			this.tab_left.mouseEnabled = hasActive;
			if (hasActive) {
				this.ui_equipProps.setData(job);
				this.ui_gangqi.setData(job);
				this.ui_sangong.setData(job);
			}
			this.ui_diziInfo.setData(job);
		}

		public addEvent(): void {
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel()
			})
			EventManage.onWithEffect(this.btn_changeMode, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel();
			})
			EventManage.onWithEffect(this.btn_player, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJueSePanel();
			})

			for (let i = 1; i < 4; i++) {
				EventManage.onWithEffect(this['btn_dizi' + i], Laya.UIEvent.CLICK, this, () => {
					this.updateUI(i);
				})
			}
		}
		public updateIcon(): void {
			this.img_my.skin = LangConfig.getPlayerIconSkin();
			//弟子头像
			let heroSex = GameApp.MainPlayer.heroSex;
			// 战士
			this.img_di1.skin = LangConfig.getPlayerIconSkin(heroSex, EnumData.JOB_TYPE.JOB_WARRIOR);
			// 法师
			this.img_di2.skin = LangConfig.getPlayerIconSkin(heroSex, EnumData.JOB_TYPE.JOB_MAGE);
			// 道士
			this.img_di3.skin = LangConfig.getPlayerIconSkin(heroSex, EnumData.JOB_TYPE.JOB_MONK);
		}

	}
}