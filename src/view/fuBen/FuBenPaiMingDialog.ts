/**Created by the LayaAirIDE*/
module view.fuBen{
	export class FuBenPaiMingDialog extends ui.fuBen.FuBenPaiMingDialogUI{
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