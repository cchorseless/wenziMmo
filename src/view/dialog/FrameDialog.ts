/**Created by the LayaAirIDE*/
module view.dialog{
	export class FrameDialog extends ui.dialog.FrameDialogUI{
		constructor(){
			super();
			this.addEvent();
		}
		public setData(): void {
			
		}
		public addEvent(): void {
			this.btn_frameClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			this.img_changeHead.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.FrameDialog().popup(true);
			});
		}
	}
}