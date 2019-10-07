/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXueWaiGongPanel extends ui.wuXue.WuXueWaiGongPanelUI {
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
			// 内功
			this.btn_neiGong.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueNeiGongPanel()
			});
			// 生活技能
			this.btn_lifeSkill.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueLifeSkillPanel();
			});
			// 合道
			this.btn_heDao.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueHeDaoPanel();
			});
			//技能更换
			this.btn_waigongChange.on(Laya.UIEvent.CLICK, this, () => {
				new view.wuXue.WuXueWaigongDialog().popup(true);
			})
		}
	}
}