/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXueLifeSkillPanel extends ui.wuXue.WuXueLifeSkillPanelUI {
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
			// 合道
			this.btn_heDao.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueHeDaoPanel();
			});
			// 鱼种预览
			this.btn_fishView.on(Laya.UIEvent.CLICK, this, () => {
				new view.wuXue.WuXueLife_FishDialog().popup(true);
			});
		}
	}
}