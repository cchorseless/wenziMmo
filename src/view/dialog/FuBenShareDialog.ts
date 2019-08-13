/**Created by the LayaAirIDE*/
module view.dialog{
	export class FuBenShareDialog extends ui.dialog.FuBenShareDialogUI{
		constructor(){
			super();
			this.setData();
		}
		public setData(): void {
			this.btn_shareClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}