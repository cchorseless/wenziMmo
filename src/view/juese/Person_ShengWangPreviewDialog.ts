/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_ShengWangPreviewDialog extends ui.juese.Person_ShengWangPreviewDialogUI {
		constructor() {
			super();
			this.panel_item.vScrollBarSkin = '';
		}
		public setData(data) {
			this.vbox_item['sortItem'] = (items) => { };
			this.vbox_item.removeChildren();
			let keys = Object.keys(data);
			keys.sort(function (a, b) { return parseInt(a) - parseInt(b) });
			for (let i in data) {
				let o = new Person_ShengWang_PreviewInfo();
				o.setData(data[i], i);
				this.vbox_item.addChild(o);
			}
			this.btn_close.on(Laya.UIEvent.CLICK, this, function () {
				this.close();
			})
		}
	}
}