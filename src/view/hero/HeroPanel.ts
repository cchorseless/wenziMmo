/**Created by the LayaAirIDE*/
module view.hero {
	export class HeroPanel extends ui.hero.HeroPanelUI {
		constructor() {
			super();
		}
		//弟子索引
		public index;
		public setData(index): void {
			this['btn_dizi' + index].selected = true;
			this.tab_left.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_left.selectedIndex = index;
				if (index == 0) {
					this.img_bg.visible = true;
				}
			}, null, false);
			this.index = index;
			this.addEvent();
			this.init_event();
			this.ui_diziInfo.baseInfo(index);
			this.ui_equipProps.baseInfo(index);
			this.ui_gangqi.setData(index);
			this.ui_sangong.setData(index);
		}
		public addEvent(): void {
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel()
			})
			EventManage.onWithEffect(this.btn_changeMode, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel();
			})
			EventManage.onWithEffect(this.btn_player, Laya.UIEvent.CLICK, this, () => {
				for (let j = 0; j < 3; j++) {
					this['btn_dizi' + j].selected = false;
				}
				this.btn_player.selected = true;
				PanelManage.openJueSePanel();
			})
			for (let i = 0; i < 3; i++) {
				EventManage.onWithEffect(this['btn_dizi' + i], Laya.UIEvent.CLICK, this, () => {
					for (let j = 0; j < 3; j++) {
						this['btn_dizi' + j].selected = false;
					}
					this['btn_dizi' + i].selected = true;
					PanelManage.openDiZiPanel(i);
					this.ui_diziInfo.baseInfo(i);
					this.ui_equipProps.baseInfo(i);
					this.ui_gangqi.setData(i);
					this.ui_sangong.setData(i);
					GameApp.GameEngine.mainPlayer.playerORHero = i + 1;
					this.tab_left.selectedIndex = this.viw_left.selectedIndex = 0;
				})
			}
		}
		/**
        * 初始化ICON
        */
		public init_event(): void {
			//我的头像
			this.img_my.skin = LangConfig.getPlayerIconSkin()
			//弟子头像
			let heroSex;
			if (GameApp.MainPlayer.sex == EnumData.SEX_TYPE.SEX_MAN) {
				heroSex = EnumData.SEX_TYPE.SEX_WOMEN;
			}
			if (GameApp.MainPlayer.sex == EnumData.SEX_TYPE.SEX_WOMEN) {
				heroSex = EnumData.SEX_TYPE.SEX_MAN;
			}
			for (let i = 1; i < 4; i++) {
				this['img_di' + i].skin = LangConfig.getPlayerIconSkin(heroSex, GameApp.GameEngine.HeroInfo[i].JOB);

			}
		}

	}
}