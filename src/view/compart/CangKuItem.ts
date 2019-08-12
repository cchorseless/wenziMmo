/**Created by the LayaAirIDE*/
module view.compart {
	export class CangKuItem extends ui.compart.CangKuItemUI {
		constructor() {
			super();

		}
		public hasInit = false;
		public setData(): void {
			if (this.hasInit) return;
			this.hasInit = true;
			this.initUI();
			this.addEvent();
		}

		public addEvent(): void {
		}

		public initUI(): void {
			this.panel_0.vScrollBarSkin = '';
			this.vbox_0['sortItem'] = (items) => { };
			for (let i = 0; i < 8; i++) {
				this.vbox_0.addChild(new view.compart.DaoJuGroupItem())
			}
			let allKey = Object.keys(GameApp.GameEngine.cangKuDB);
			for (let key of allKey) {
				this.addItem(GameApp.GameEngine.cangKuDB[key]);
			}
		}

		public addItem(obj: ProtoCmd.ItemBase): void {
			if (!this.hasInit) return;
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