/**Created by the LayaAirIDE*/
module view.zhaiYuan {
	export class ZhaiYuan_Build_Dialog extends ui.zhaiYuan.ZhaiYuan_Build_DialogUI {
		//炼丹、荷花池、种地、炼器
		// public iconSkin = ['icon_zy_liandan','icon_zy_hehuachi','icon_zy_zhongdi','icon_zy_lianqi']
		constructor() {
			super();
			this.addEvent();
			this.setData();
		}
		public addEvent() {
			this.btn_close.on(Laya.UIEvent.CLICK, this, function () {
				this.close();
			})
		}
		public setData() {
			let arr = [1, 12, 21, 33]
			for (let i = 0; i < arr.length; i++) {
				this.upDataView(arr[i],i);
			}
		}
		public upDataView(id: number, posID) {
			let o = new ZhaiYuan_Build_Info();
			let skin = SheetConfig.zhaiyuan_upgrade.getInstance(null).ICON(id + '');
			let name = SheetConfig.zhaiyuan_upgrade.getInstance(null).NAME(id + '');
			let need = SheetConfig.zhaiyuan_upgrade.getInstance(null).DESCRIBE(id + '');
			let lv = SheetConfig.zhaiyuan_upgrade.getInstance(null).LEVEL(id + '');
			let increase = SheetConfig.zhaiyuan_upgrade.getInstance(null).EFFICIENCY(id + '');
			o.setData(skin, name, need, lv, increase);
			let item = this.panel_build.getChildAt(posID);
			if (item) {
				this.panel_build.removeChildAt(posID);
			}
			o.y = posID * (o.height + 15);
			this.panel_build.addChild(o);
		}
	}
}