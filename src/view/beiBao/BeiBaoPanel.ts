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
			this.btn_bagLogo.selected = true;
			this.lbl_bagLogolbl.text = '背包|回收';
			this.tab_changeView.selectHandler = Laya.Handler.create(this, (index) => {
				this.btn_itemAll.selected = false;
				this.showSmallTab(false);
				this.btn_bagLogo.skin = 'image/bag/icon_itemfunc' + index + '.png';
				this.btn_bagLogo.selected = true;
				switch (index) {
					// 仓库界面
					case 0:
					// 回收界面
					case 1:
					// 摆摊界面
					case 2:
						this.lbl_bagLogolbl.text = ['背包|回收', '背包|仓库', '背包|摆摊'][index];
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
			// 初始化背包
			this.initBag();
			// 添加事件
			this.addEvent();
		}

		public initBag(): void {
			let allKey = Object.keys(GameApp.GameEngine.bagItemDB);
			for (let key of allKey) {
				this.addItem(EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE, GameApp.GameEngine.bagItemDB[key]);
			}
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
		// 背包内所有物品
		public allItemInBeiBao = {};
		/**
		 * 添加物品
		 * @param obj 
		 */
		public addItem(type: EnumData.PACKAGE_TYPE, obj: ItemBase): void {
			// 配置表ID
			let dwBaseID = '' + obj.dwBaseID;
			// 物品数量
			let dwCount = obj.dwCount;
			// 物品类型
			let itemType = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMTYPE(dwBaseID);
			switch (type) {
				// 背包
				case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE:
					let vbox_bag;
					switch (itemType) {
						// 材料
						case EnumData.ItemTypeDef.ITEM_TYPE_NORMAL:
							vbox_bag = this.vbox_bag1;
							break;
						// 装备
						case EnumData.ItemTypeDef.ITEM_TYPE_EQUIP:
							vbox_bag = this.vbox_bag0;
							break;
						// 消耗品
						case EnumData.ItemTypeDef.ITEM_TYPE_DRUG:
						case EnumData.ItemTypeDef.ITEM_TYPE_SKILL:
						case EnumData.ItemTypeDef.ITEM_TYPE_MAZE:
						case EnumData.ItemTypeDef.ITEM_TYPE_SCROLL:
							vbox_bag = this.vbox_bag2;
							break;
						// 任务物品
						case EnumData.ItemTypeDef.ITEM_TYPE_TASK:
							vbox_bag = this.vbox_bag3;
							break;
					}
					for (let child of vbox_bag._childs) {
						if (!(child as view.compart.DaoJuGroupItem).checkIsFull()) {
							let item = new view.compart.DaoJuItem();
							item.setData(obj, EnumData.ItemInfoModel.SHOW_IN_BAG);
							child.addItem(item);
							// 添加到本地
							this.allItemInBeiBao[obj.i64ItemID.toString()] = item;
							break;
						}
					}
					break;
				// 仓库
				case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_STORE:
					this.ui_cangKu.addItem(obj);
					break;
			}
		}

		/**
		 * 丢弃物品
		 * @param type 物品位置
		 * @param itemi64id 物品唯一ID 
		 */
		public removeItem(type: EnumData.PACKAGE_TYPE, itemi64id: string): void {
			switch (type) {
				case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE:
					if (this.allItemInBeiBao[itemi64id]) {
						this.allItemInBeiBao[itemi64id].removeSelf();
					}
					break;
				case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_STORE: break;
			}
		}
	}
}