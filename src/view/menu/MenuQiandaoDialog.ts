/**Created by the LayaAirIDE*/
module view.menu{
	export class MenuQiandaoDialog extends ui.menu.MenuQiandaoDialogUI{
		constructor(){
			super();
			this.setData();
		}
		public setData():void{
			this.btn_qiandaoClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}