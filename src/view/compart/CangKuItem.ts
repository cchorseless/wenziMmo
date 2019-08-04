/**Created by the LayaAirIDE*/
module view.compart {
	export class CangKuItem extends ui.compart.CangKuItemUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.panel_0.vScrollBarSkin = '';
			this.vbox_0['sortItem'] = (items) => { };
			for (let i = 0; i < 8; i++) {
				this.vbox_0.addChild(new view.compart.DaoJuGroupItem())
			}
			this.addEvent();

		}
		public addEvent(): void {
			this.btn_zhengLi.on(Laya.UIEvent.CLICK, this, () => {

			})
		}
		public addItem(obj: ItemBase): void {
			for (let child of this.vbox_0._childs) {
				if (!(child as view.compart.DaoJuGroupItem).checkIsFull()) {
					let item = new view.compart.DaoJuItem()
					item.setData(obj, EnumData.ItemInfoModel.SHOW_IN_CANGKU);
					child.addItem(item);
					break;
				}
			}
		}

	}
}