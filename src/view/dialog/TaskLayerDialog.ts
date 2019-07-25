/**Created by the LayaAirIDE*/
module view.dialog{
	export class TaskLayerDialog extends ui.dialog.TaskLayerDialogUI{
		constructor(){
			super();
			this.addEvent();
		}
		public setData(): void {

		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
		})
	}

}}