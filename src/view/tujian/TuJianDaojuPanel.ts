/**Created by the LayaAirIDE*/
module view.tujian{
	export class TuJianDaojuPanel extends ui.tujian.TuJianDaojuPanelUI{
		constructor(){
			super();
		}
		public setData():void{
			this.panel_TuJianDaoju.vScrollBarSkin ="";
			this.vbox_TuJianDaoju['sortItem']=(items)=>{};
			this.addEvent();
		}
		public addEvent(): void {
			 this.box_daoju.on(Laya.UIEvent.CLICK, this, () => {
					new view.dialog.TuJianRewardDialog().popup(true);
			})
			  this.box_daojuReturn.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this, true, 4);
			});
		}
	}
}