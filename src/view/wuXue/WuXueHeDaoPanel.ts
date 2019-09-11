/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXueHeDaoPanel extends ui.wuXue.WuXueHeDaoPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.addEvent();
		}


		public addEvent(): void {
			// 模式切换
			this.btn_changeMode.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel();
			});
			// 返回
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});
			// 外功
			this.btn_waiGong.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueWaiGongPanel()
			});
			// 内功
			this.btn_neiGong.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueNeiGongPanel()
			});
			// 生活技能
			this.btn_lifeSkill.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueLifeSkillPanel();
			});
			//转生突破
			this.btn_zhuanSheng.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.HeroZhuanShengDialog().popup(true);
			})

		}
	}
}