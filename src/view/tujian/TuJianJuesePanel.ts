/**Created by the LayaAirIDE*/
module view.tujian{
	export class TuJianJuesePanel extends ui.tujian.TuJianJuesePanelUI{
		constructor(){
			super();
		}
		public setData():void{
			this.panel_TuJianJuese.vScrollBarSkin ="";
			this.vbox_TuJianJuese['sortItem']=(items)=>{};
			this.addEvent();
		}
			public addEvent(): void {
			 this.box_juese.on(Laya.UIEvent.CLICK, this, () => {
					new view.dialog.TuJianRewardDialog().popup(true);
			})
			  this.box_jueseReturn.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this, true, 4);
			});
		}
	}
}