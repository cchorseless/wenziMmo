/**Created by the LayaAirIDE*/
module view.dialog{
	export class HeadDialog extends ui.dialog.HeadDialogUI{
		constructor(){
			super();
			this.addEvent();
		}
			public setData(): void {
			
		}
		public addEvent(): void {
			this.btn_headClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			this.img_changeFrame.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.FrameDialog().popup(true);
			});
		}
	}
}