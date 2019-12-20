/**Created by the LayaAirIDE*/
module view.zhaiYuan {
	export class ZhaiYuan_HeHuaChiDialog extends ui.zhaiYuan.ZhaiYuan_HeHuaChiDialogUI {
		public static self: ZhaiYuan_HeHuaChiDialog
		public type;  //
		constructor() {
			super();
			ZhaiYuan_HeHuaChiDialog.self = this;
			this.addEvent();
		}
		public setData(type) {
			this.type = type;
		}
		public addEvent (){

		}
	}
}