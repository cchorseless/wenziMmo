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
			// 初始化背包
			this.initUI();
			// 添加事件
			this.addEvent();
		}

		public initUI(): void {
			// 初始化背包内界面
			let allKey_bag = Object.keys(GameApp.GameEngine.bagItemDB);
			for (let key of allKey_bag) {
				this.addItem(EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE, GameApp.GameEngine.bagItemDB[key]);
			}
			// 初始化回收界面
			this.lbl_bagLogolbl.text = '背包|回收';
			this.btn_huiShou.selected = true;
			this.ui_huiShou.setData();
		}

		public addEvent(): void {
			// 返回
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
				 PanelManage.openMainPanel()
			});
			// 摆摊
			this.btn_baiTan.on(Laya.UIEvent.CLICK, this, this.openPanel, ['btn_baiTan']);
			// 仓库
			this.btn_cangKu.on(Laya.UIEvent.CLICK, this, this.openPanel, ['btn_cangKu']);
			// 回收
			this.btn_huiShou.on(Laya.UIEvent.CLICK, this, this.openPanel, ['btn_huiShou']);
			// 交易行
			this.btn_jiaoYiHang.on(Laya.UIEvent.CLICK, this, this.openPanel, ['btn_jiaoYiHang']);
			// 小说模式
			this.btn_modeChange.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel();
			});
		}

		public openPanel(msg): void {
			let btn_tmp: Laya.Button = this[msg];
			if (btn_tmp.selected) { return };
			// 按钮变颜色
			let allBtn = ['btn_huiShou', 'btn_cangKu', 'btn_baiTan', 'btn_jiaoYiHang'];
			for (let btnName of allBtn) {
				this[btnName].selected = (btnName == msg);
			}
			// 按钮对应索引
			let index = allBtn.indexOf(msg);
			// 绑定物品不能交易
			let allKey = Object.keys(GameApp.GameEngine.bagItemDB);
			for (let key of allKey) {
				let ui_item: view.compart.DaoJuItem = GameApp.GameEngine.bagItemDB[key].ui_item;
				ui_item && ui_item.canGoToSell(index === 2);
			}
			switch (index) {
				// 回收界面
				case 0:
					this.lbl_bagLogolbl.text = '背包|回收';
					this.ui_huiShou.setData()
					this.viw_BagViewChange.selectedIndex = 0;
					this.viw_bagBottom.selectedIndex = index;
					break;
				// 仓库界面
				case 1:
					this.lbl_bagLogolbl.text = '背包|仓库';
					this.ui_cangKu.setData()
					this.viw_BagViewChange.selectedIndex = 0;
					this.viw_bagBottom.selectedIndex = index;
					break;
				// 摆摊界面
				case 2:
					this.lbl_bagLogolbl.text = '背包|摆摊';
					this.ui_tanWei.setData()
					this.viw_BagViewChange.selectedIndex = 0;
					this.viw_bagBottom.selectedIndex = index;
					break;
				// 交易行界面
				case 3:
					this.lbl_bagLogolbl.text = '交易行';
					this.ui_jiaoyihang.setData()
					this.viw_BagViewChange.selectedIndex = 1;
					break;
			}

		}



		/**
		 * 添加物品
		 * @param obj 
		 */
		public addItem(type: EnumData.PACKAGE_TYPE, obj: ProtoCmd.ItemBase): void {
			if (this.destroyed) return;
			// 配置表ID
			let dwBaseID = '' + obj.dwBaseID;
			// 物品数量
			let dwCount = obj.dwCount;
			// 物品类型
			let itemType = obj.itemType
			// 物品位置
			let local_index = obj.location.btLocation;
			switch (type) {
				// 背包
				case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE:
					// 判断位置是否是背包
					if (local_index != EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE) {
						return;
					}
					let vbox_bag;
					switch (itemType) {
						// 装备
						case EnumData.ItemTypeDef.ITEM_TYPE_EQUIP:
							vbox_bag = this.vbox_bag0;
							this.tab_bag.selectedIndex = this.viw_bag.selectedIndex = 0;
							break;
						// 材料
						case EnumData.ItemTypeDef.ITEM_TYPE_NORMAL:
							vbox_bag = this.vbox_bag1;
							this.tab_bag.selectedIndex = this.viw_bag.selectedIndex = 1;
							break;
						// 消耗品
						case EnumData.ItemTypeDef.ITEM_TYPE_DRUG:
						case EnumData.ItemTypeDef.ITEM_TYPE_SKILL:
						case EnumData.ItemTypeDef.ITEM_TYPE_MAZE:
						case EnumData.ItemTypeDef.ITEM_TYPE_SCROLL:
							vbox_bag = this.vbox_bag2;
							this.tab_bag.selectedIndex = this.viw_bag.selectedIndex = 2;
							break;
						// 任务物品
						case EnumData.ItemTypeDef.ITEM_TYPE_TASK:
							vbox_bag = this.vbox_bag3;
							this.tab_bag.selectedIndex = this.viw_bag.selectedIndex = 3;
							break;
					}
					if (vbox_bag) {
						for (let child of vbox_bag._childs) {
							if (!(child as view.compart.DaoJuGroupItem).checkIsFull()) {
								let item = new view.compart.DaoJuItem();
								item.setData(obj, EnumData.ItemInfoModel.SHOW_IN_BAG);
								child.addItem(item);
								break;
							}
						}
					}
					break;
				// 仓库
				case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_STORE:
					// 判断位置是否是背包
					if (local_index != EnumData.PACKAGE_TYPE.ITEMCELLTYPE_STORE) {
						return;
					}
					this.ui_cangKu.addItem(obj);
					break;
			}
		}

		/**
		 * 更新摊位信息
		 */
		public updateTanWei(): void {
			if (!this.destroyed && this.viw_bagBottom.selectedIndex == 2) {
				this.ui_tanWei.updateTanWeiUI();
			}
		}
		/**
		 * 更新仓库
		 */
		public updateCangKuInfo(): void {
			if (!this.destroyed && this.viw_bagBottom.selectedIndex == 1) {
				this.ui_cangKu.updateCangKuUI()
			}
		}

		/**
		 * 检查摊位是否满了
		 */
		public checkTanWeiIsFull(): boolean {
			if (this.ui_tanWei && this.ui_tanWei.vbox_sell.numChildren >= SheetConfig.canshuSheet.getInstance(null).DATA('JYH_MAXIMUM_SALES')[0]) {
				return false
			}
			return true

		}

	}
}