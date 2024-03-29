/**Created by the LayaAirIDE*/
module view.beiBao {
	export class Bag_CangKuItem extends ui.beiBao.Bag_CangKuItemUI {
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
			for (let i = 0; i < 15; i++) {
				this.vbox_0.addChild(new view.compart.DaoJuGroupItem())
			}
			let allKey = Object.keys(GameApp.GameEngine.cangKuDB);
			for (let key of allKey) {
				this.addItem(GameApp.GameEngine.cangKuDB[key]);
			}
			// 仓库上限，暂时写死
			this.lbl_maxCount.text = '80';
			this.lbl_itemCount.text = '' + allKey.length;
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
			// 保存的道具数量
			this.lbl_itemCount.text = '' + Object.keys(GameApp.GameEngine.cangKuDB).length;
		}

		public updateCangKuUI(): void {
			// 保存的道具数量
			this.lbl_itemCount.text = '' + Object.keys(GameApp.GameEngine.cangKuDB).length;
		}
	}
}