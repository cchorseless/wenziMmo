/**Created by the LayaAirIDE*/
module view.tujian{
	export class TuJianBossPanel extends ui.tujian.TuJianBossPanelUI{
		constructor(){
			super();
		}
		public setData():void{
			 this.box_boss.on(Laya.UIEvent.CLICK, this, () => {
					new view.dialog.TuJianRewardDialog().popup(true);
			})
		}
	}
}