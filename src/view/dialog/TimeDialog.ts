/**Created by the LayaAirIDE*/
module view.dialog{
	export class TimeDialog extends ui.dialog.TimeDialogUI{
		constructor(){
			super();
			this.addEvent();
		}
		public setData(): void {
	}
	public addEvent(): void {
			this.btn_timeClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
		})
	}
	}
}