/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_GangQiBtnItem extends ui.juese.Person_GangQiBtnItemUI {
		constructor() {
			super();
		}
		public setData(j): Person_GangQiBtnItem {
			this.addEvent(j);
			return this;
		}
		public addEvent(j): void {
			this.on(Laya.UIEvent.CLICK,this,()=>{
				PanelManage.JueSe.ui_gangQi.img_xiajie.skin='image/juese/img_gangQi_0'+j+'.png'
			})
		}
	}
}