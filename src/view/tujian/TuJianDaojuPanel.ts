/**Created by the LayaAirIDE*/
module view.tujian{
	export class TuJianDaojuPanel extends ui.tujian.TuJianDaojuPanelUI{
		constructor(){
			super();
		}
		public setData():void{
			this.panel_TuJianDaoju.vScrollBarSkin ="";
			this.vbox_TuJianDaoju['sortItem']=(items)=>{};
		}
	}
}