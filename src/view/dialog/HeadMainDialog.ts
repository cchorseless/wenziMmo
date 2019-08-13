/**Created by the LayaAirIDE*/
module view.dialog{
	export class HeadMainDialog extends ui.dialog.HeadMainDialogUI{
		constructor(){
			super();
			this.setData();
		}
			public setData(): void {
			this.btn_changeHeadFrame.on(Laya.UIEvent.CLICK, this, () => {
					new view.dialog.HeadDialog().popup(true);
			})
			this.btn_headMainClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}