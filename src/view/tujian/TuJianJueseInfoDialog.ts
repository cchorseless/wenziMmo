/**Created by the LayaAirIDE*/
module view.tujian{
	export class TuJianJueseInfoDialog extends ui.tujian.TuJianJueseInfoDialogUI{
		constructor(){
			super();
			this.setData();
		}
		public setData():void {
			this.btn_tujianJueseInfoClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		
		}
	}
}