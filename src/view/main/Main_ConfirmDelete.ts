/**Created by the LayaAirIDE*/
module view.main {
	export class Main_ConfirmDelete extends ui.main.Main_ConfirmDeleteUI {
		private handle:Laya.Handler;
		constructor() {
			super();
			this.addEvent()
		}
		public addEvent() {
			
			EventManage.onWithEffect(this.btn_close, Laya.UIEvent.CLICK, this, () => {
				this.close()
			})
			EventManage.onWithEffect(this.btn_cancel, Laya.UIEvent.CLICK, this, () => {
				this.close()
			})
			EventManage.onWithEffect(this.btn_confirm, Laya.UIEvent.CLICK, this, () => {
				if(this.handle){
					this.handle.run();
				}
				this.close();
			})
		}
		public setData(handle:Laya.Handler,str:string) {
			this.lab_text.text = str;
			this.handle = handle;
		}

	}
}