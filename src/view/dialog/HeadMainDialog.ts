/**Created by the LayaAirIDE*/
module view.dialog{
	export class MainChangeDialog extends ui.dialog.MainChangeDialogUI{
		constructor(){
			super();
			this.setData();
		}
			public setData(): void {
			this.btn_changeHeadFrame.on(Laya.UIEvent.CLICK, this, () => {
					new view.dialog.MainHeadDialog().popup(true);
			})
			this.btn_headMainClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}