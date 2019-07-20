/**Created by the LayaAirIDE*/
module view.beiBao {
	export class BeiBaoPanel extends ui.beiBao.BeiBaoPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			// 初始化背包
			for (let i = 0; i < 4; i++) {
				this['panel_bag' + i].vScrollBarSkin = '';
				this['vbox_bag' + i]['sortItem'] = (items) => { };
				for (let j = 0; j < 5; j++) {
					this['vbox_bag' + i].addChild(new view.compart.DaoJuGroupItem());
				}
			}
			// 背包tab
			this.tab_bag.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_bag.selectedIndex = index
			}, null, false)
			// 左边热卖商店
			this.panel_sellHot.vScrollBarSkin = '';
			this.vbox_sellHot['sortItem'] = (items) => { };
			for (let i = 0; i < 5; i++) {
				this.vbox_sellHot.addChild(new view.compart.ShopHotItem());
			}
			// 左上角功能切换
			this.btn_itemAll.selected = false;
			this.img_tabBg.visible = false;
			this.img_tabBg.scaleY = this.img_tabBg.scaleX = 0;
			this.tab_changeView.selectHandler = Laya.Handler.create(this, (index) => {
				this.btn_itemAll.selected = false;
				this.showSmallTab(false);
				switch (index) {
					// 仓库界面
					case 0:
					// 回收界面
					case 1:
					// 摆摊界面
					case 2:
						this.lbl_bagLogolbl.text = ['背包|仓库', '背包|回收', '背包|摆摊'][index];
						this.viw_BagViewChange.selectedIndex = 0;
						this.viw_bagBottom.selectedIndex = index;
						break;
					// 交易行界面
					case 3:
						this.lbl_bagLogolbl.text = '交易行';
						this.viw_BagViewChange.selectedIndex = 1;
						break;
				}
			}, null, false);
			this.addEvent();
		}

		public addEvent(): void {
			this.btn_itemAll.on(Laya.UIEvent.CLICK, this, () => {
				this.btn_itemAll.selected = !this.btn_itemAll.selected;
				this.showSmallTab(this.btn_itemAll.selected);
			});
		}

		/**
		 * 显示右上角功能区的tab
		 * @param isShow 
		 */
		public showSmallTab(isShow: boolean): void {
			if (isShow) {
				this.img_tabBg.visible = true;
				Laya.Tween.to(this.img_tabBg, { scaleY: 1, scaleX: 1 }, 200);
			}
			else {
				Laya.Tween.to(this.img_tabBg, { scaleY: 0, scaleX: 0 }, 200, null, Laya.Handler.create(this, () => { this.img_tabBg.visible = false }))
			}
		}

		/**
		 * 添加物品
		 * @param obj 
		 */
		public addItem(type: EnumData.PACKAGE_TYPE, obj: ItemBase): void {
			for (let child of this.vbox_bag0._childs) {
				if (!(child as view.compart.DaoJuGroupItem).checkIsFull()) {
					let item = new view.compart.DaoJuItem()
					item.setDate(obj);
					child.addItem(item);
					break;
				}
			}
		}
	}
}