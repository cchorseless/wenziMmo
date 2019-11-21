/**Created by the LayaAirIDE*/
module view.luckDraw {
	export class LuckDraw_ShowResultDialog extends ui.luckDraw.LuckDraw_ShowResultDialogUI {
		// public itemGroup = [];
		constructor() {
			super();
			this.panel_showResult.vScrollBarSkin = '';
			this.addEvent()
		}
		public setData(data) {
			for (let i = 0; i < data.length; i++) {
				let o = new view.compart.DaoJuWithNameItem();
				let item = new ProtoCmd.ItemBase();
				item.dwBaseID = data[i].i;
				item.dwCount = data[i].n;
				o.setData(item);
				o.x = (i % 4) * o.width
				o.y = Math.floor(i / 4) * (o.height + 15)
				// this.itemGroup.push(o);
				this.panel_showResult.addChild(o)
			}
		}
		public addEvent() {
			this.btn_close.on(Laya.UIEvent.CLICK, this, function () {
				this.closeSelf();
			})
		}
		public closeSelf() {
			// for (let i = 0; i < this.panel_showResult.numChildren; i++) {
			// 	// this.itemGroup[i]
			// 	// let p = this.panel_showResult.getChildAt(i)
			// 	Laya.Tween.to(this.panel_showResult.getChildAt(i), {
			// 		x: LuckDraw_CangBaoItem.self.btn_store.x + 0.5 * LuckDraw_CangBaoItem.self.btn_store.width,
			// 		y: LuckDraw_CangBaoItem.self.btn_store.y + 0.5 * LuckDraw_CangBaoItem.self.btn_store.height,
			// 		scaleX: 0, scaleY: 0
			// 	}, 10000, null, Laya.Handler.create(this, () => {

			// 	}));
			// }
			this.close()
		}
	}
}