/**Created by the LayaAirIDE*/
module view.tujian{
	export class TuJianRewardDialog extends ui.tujian.TuJianRewardDialogUI{
		constructor(){
			super();
			this.setData();
		}
		public setData():void {
			this.btn_tujianRewardClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		
		}
		
	}
}