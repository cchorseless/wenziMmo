/**Created by the LayaAirIDE*/
module view.dialog{
	export class FuBenPaiMingDialog extends ui.dialog.FuBenPaiMingDialogUI{
		constructor(){
			super();
			this.setData();
		}
		public setData(): void {
				this.panel_paiming.vScrollBarSkin="";
				this.vbox_paiming['sortItem']=(items)=>{};
			this.btn_paimingClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
		})
	}
	}
}