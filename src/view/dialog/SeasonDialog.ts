/**Created by the LayaAirIDE*/
module view.dialog{
	export class SeasonDialog extends ui.dialog.SeasonDialogUI{
		constructor(){
			super();
			this.setData();
		}
		public setData(): void {
			this.btn_seasonClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
	}
	}
}