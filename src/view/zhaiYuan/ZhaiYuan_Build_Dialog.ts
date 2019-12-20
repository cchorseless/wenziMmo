/**Created by the LayaAirIDE*/
module view.zhaiYuan {
	export class ZhaiYuan_Build_Dialog extends ui.zhaiYuan.ZhaiYuan_Build_DialogUI {
		public static self: ZhaiYuan_Build_Dialog
		public arr;
		constructor() {
			super();
			ZhaiYuan_Build_Dialog.self = this;
			this.panel_build.vScrollBarSkin = '';
			this.addEvent();
			this.setData();
		}
		public addEvent() {
			this.btn_close.on(Laya.UIEvent.CLICK, this, function () {
				this.close();
			})
		}
		public setData() {
			this.panel_build.removeChildren();
			this.arr = GameApp.GameEngine.zhaiYuanLevels;
			for (let i in this.arr) {
				this.upDataView(this.arr[i], parseInt(i));
			}
		}
		public upDataView(buildLv: number, typeID) {
			let o = new ZhaiYuan_Build_Info();
			let configID = buildLv + typeID * 1000
			let skin = SheetConfig.zhaiyuan_upgrade.getInstance(null).ICON(configID + '');
			let name = SheetConfig.zhaiyuan_upgrade.getInstance(null).NAME(configID + '');
			let need;
			if (buildLv < 10) {
				need = SheetConfig.zhaiyuan_upgrade.getInstance(null).DESCRIBE(configID + 1);
			} else {
				need = '已满级'
			}
			let lv = buildLv;
			let increase = SheetConfig.zhaiyuan_upgrade.getInstance(null).EFFICIENCY(configID + '');
			o.setData(skin, name, need, lv, increase, configID);
			let itemPosID = typeID - 1
			let item = this.panel_build.getChildAt(itemPosID);
			if (item) {
				this.panel_build.removeChildAt(itemPosID);
			}
			o.y = itemPosID * (o.height + 15);
			this.panel_build.addChild(o);
		}
	}
}