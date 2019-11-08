/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXueCloseDoorPanel extends ui.wuXue.WuXueCloseDoorPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.btn_closeDoor.selected=true;
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
			// 闭关
			this.btn_closeDoor.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueCloseDoorPanel();
			});
			// 闭关内功
			this.btn_change1.on(Laya.UIEvent.CLICK, this, () => {
				this.viw_closeDoor.selectedIndex = 0;
			});
			// 闭关外功
			this.btn_change2.on(Laya.UIEvent.CLICK, this, () => {
				this.viw_closeDoor.selectedIndex = 1;
			});
		}
	}
}