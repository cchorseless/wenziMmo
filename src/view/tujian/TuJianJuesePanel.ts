/**Created by the LayaAirIDE*/
module view.tujian{
	export class TuJianJuesePanel extends ui.tujian.TuJianJuesePanelUI{
		constructor(){
			super();
		}
		public setData():void{
			this.panel_TuJianJuese.vScrollBarSkin ="";
			this.vbox_TuJianJuese['sortItem']=(items)=>{};
		}
	}
}