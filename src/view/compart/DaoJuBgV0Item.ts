/**Created by the LayaAirIDE*/
module view.compart {
	export class DaoJuBgV0Item extends ui.compart.DaoJuBgV0ItemUI {
		constructor() {
			super();
		}
		/**
		 * 
		 * @param item(data:符文信息, type 符文类型0身上1背包) 
		 * @param index 符文道具在list里的索引
		 */
		public index;
		public item;
		public setData(item, index): DaoJuBgV0Item {
			this.img_light.visible = false;
			this.index = index;
			if (item.type) {
				this.item = item;
				let itemInfo = new ProtoCmd.ItemBase;
				itemInfo.clone(item.data.data);
				this.ui_item.setData(itemInfo);
				if (item.type == 0) {
					this.ui_item.img_onself.visible = true;
				} else {
					this.ui_item.img_onself.visible = false;
				}
			} else {
				this.ui_item.img_item.visible = false;
				this.ui_item.lbl_count.visible = false;
			}
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.on(Laya.UIEvent.CLICK, this, () => {
				if (this.item.type) {
					GameApp.LListener.event(ProtoCmd.Hero_runeSelect, (this.item.type, this.index));
				}
			})
		}
	}
}