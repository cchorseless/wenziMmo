/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXueNeiGongPanel extends ui.wuXue.WuXueNeiGongPanelUI {
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
			// 生活技能
			this.btn_lifeSkill.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueLifeSkillPanel();
			});
			// 合道
			this.btn_heDao.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueHeDaoPanel();
			});
			//内功更换
			this.btn_neigongChange.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.WuXueNeigongDialog().popup(true);
			})
		}
	}
}