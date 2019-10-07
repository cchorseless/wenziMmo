/**Created by the LayaAirIDE*/
module view.zhaiYuan {
	export class ZhaiYuan_lianQiDialog extends ui.zhaiYuan.ZhaiYuan_lianQiDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): ZhaiYuan_lianQiDialog {			
			this.addEvent();
			return this
		}
		public addEvent(): void {
			this.tab_top.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_top.selectedIndex = index;
					if(index==2){
					this.tab_down.visible=false;
				}
				else{
					this.tab_down.visible=true;
				}
			}, null, false);
			this.tab_down.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_down.selectedIndex = index;
			
			}, null, false);
			
			this.btn_close.on(Laya.UIEvent.CLICK, this, this.close)
		}
	}
}