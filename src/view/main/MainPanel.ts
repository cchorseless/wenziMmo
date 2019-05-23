/**Created by the LayaAirIDE*/
module view.main {
	export class MainPanel extends ui.main.MainPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.ui_mainPlayer.lbl_name.text = App.MainPlayer.realName;
			this.addEvent();

		}
		public addEvent(): void {
			this.btn_beiBao.on(Laya.UIEvent.CLICK, this, this.openPanel, ['beiBao']);
			this.btn_role.on(Laya.UIEvent.CLICK, this, this.openPanel, ['role']);
			this.btn_fuBen.on(Laya.UIEvent.CLICK, this, this.openPanel, ['fuBen']);
			this.btn_sheJiao.on(Laya.UIEvent.CLICK, this, this.openPanel, ['sheJiao']);
			this.btn_yangCheng.on(Laya.UIEvent.CLICK, this, this.openPanel, ['yangCheng']);
		}
		//界面切换时控制那些部分不变
		public showGroupTop(panel: Laya.View): void {
			this.box_mainTop.visible = true;
			panel.addChild(this.box_mainTop);
		}

		// 界面切换时控制那些部分不变
		public showGroupBottom(panel: Laya.View): void {
			this.box_mainBottom.visible = true;
			panel.addChild(this.box_mainBottom);
		}
		public openPanel(msg): void {
			switch (msg) {
				case "role":
				PanelManage.openJueSePanel()
					break;
				case "beiBao":
					break;
				case "fuBen":
					break;
				case "sheJiao":
					break;
				case "yangCheng":
					break;

			}

		}
	}
}