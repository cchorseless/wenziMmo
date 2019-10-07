/**Created by the LayaAirIDE*/
module view.fuBen{
	export class FuBenShareDialog extends ui.fuBen.FuBenShareDialogUI{
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