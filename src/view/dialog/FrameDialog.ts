/**Created by the LayaAirIDE*/
module view.dialog{
	export class MainFrameDialog extends ui.dialog.MainFrameDialogUI{
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
				new view.dialog.MainHeadDialog().popup(true);
			});
		}
	}
}