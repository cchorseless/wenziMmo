/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_ShengWangPreviewDialog extends ui.juese.Person_ShengWangPreviewDialogUI {
		constructor() {
			super();
			this.panel_item.vScrollBarSkin = '';
			this.vbox_item['sortItem'] = (items) => { };
			this.btn_close.on(Laya.UIEvent.CLICK, this, function () {
				this.close();
			})
		}
		public setData(data) {
			let keys = Object.keys(data);
			keys.sort(function (a, b) { return parseInt(a) - parseInt(b) });
			for (let i in data) {
				let o = new Person_ShengWang_PreviewInfo();
				o.setData(data[i], i);
				this.vbox_item.addChild(o);
			}

		}
	}
}