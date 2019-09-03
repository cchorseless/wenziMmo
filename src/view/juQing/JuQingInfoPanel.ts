
module view.juQing {
	export class JuQingInfoPanel extends ui.juQing.JuQingInfoPanelUI {
		constructor() {
			super();
		}
		public setData(): void {

			this.addEvent();
		}


		public addEvent(): void {
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.showPanel(PanelManage.JuQingMode);
			})
			this.btn_modeChange.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});
			// this.btn_pianZhang.on(Laya.UIEvent.CLICK,this,()=>{
			// 	new view.dialog.ChapterListDialog().popup(true);
			// })

		}
	}
}