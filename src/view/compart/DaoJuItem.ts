/**Created by the LayaAirIDE*/
module view.compart {
	export class DaoJuItem extends ui.compart.DaoJuItemUI {
		public item: ProtoCmd.ItemBase;
		public model: EnumData.ItemInfoModel = EnumData.ItemInfoModel.SHOW_NONE;
		constructor() {
			super();
			this.addEvent();
		}
		/**
		 *  每个itemBase 绑定一个this,此方法通过绑定的形式初始化UI
		 * @param item 
		 * @param mode 响应事件模式,默认不显示
		 */
		public setData(item: ProtoCmd.ItemBase, model: EnumData.ItemInfoModel = EnumData.ItemInfoModel.SHOW_NONE): void {
			// 双向绑定
			this.item = item;
			item.recoverUI();
			item.ui_item = this;
			let itemData: ProtoCmd.itf_ItemInfo = {
				itemid: this.item.dwBaseID,
				dwCount: this.item.dwCount,
				binding: this.item.dwBinding
			};
			this.initUI(itemData, model);

		}

		public addEvent(): void {
			this.on(Laya.UIEvent.CLICK, this, () => {
				if (this.model == EnumData.ItemInfoModel.SHOW_NONE) {
					return
				}
				// 是否可以上架
				if (this.isNotCanSell) {
					TipsManage.showTips('绑定物品不能上架');
					return
				}
				let itemInfoDialog;
				let itemType = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMTYPE('' + this.item.dwBaseID);
				// 根据物品类型显示不同界面
				switch (itemType) {
					// 材料
					case EnumData.ItemTypeDef.ITEM_TYPE_NORMAL:
						itemInfoDialog = new view.dialog.ItemInfoV0Dialog();
						break;
					// 装备
					case EnumData.ItemTypeDef.ITEM_TYPE_EQUIP:
						itemInfoDialog = new view.dialog.ItemInfoV1Dialog();
						break;
					// 消耗品
					case EnumData.ItemTypeDef.ITEM_TYPE_DRUG:
					case EnumData.ItemTypeDef.ITEM_TYPE_SKILL:
					case EnumData.ItemTypeDef.ITEM_TYPE_MAZE:
					case EnumData.ItemTypeDef.ITEM_TYPE_SCROLL:
						itemInfoDialog = new view.dialog.ItemInfoV0Dialog();
						break;
					// 任务物品
					case EnumData.ItemTypeDef.ITEM_TYPE_TASK:
						itemInfoDialog = new view.dialog.ItemInfoV0Dialog();
						break;
				}
				// 根据model显示界面不同的状态
				switch (this.model) {
					// 背包场景 有三种子状态 0背包-回收 1背包-仓库 2背包-摆摊
					case EnumData.ItemInfoModel.SHOW_IN_BAG:
						let model: EnumData.ItemInfoModel;
						switch (PanelManage.BeiBao.viw_bagBottom.selectedIndex) {
							case 0:
								model = EnumData.ItemInfoModel.SHOW_IN_BAG_HUISHOU;
								break;
							case 1:
								model = EnumData.ItemInfoModel.SHOW_IN_BAG_CANGKU;
								break;
							case 2:
								model = EnumData.ItemInfoModel.SHOW_IN_BAG_BAITAN;
								break;
						}
						itemInfoDialog.setData(this.item, model).show(true);
						break;
					default:
						itemInfoDialog.setData(this.item, this.model).show(true);
						break;
				}
			});
		}

		/**
		 * 通过不更新绑定UI的情况下初始化UI
		 * @param item 
		 * @param model 
		 */
		public initUI(item: ProtoCmd.itf_ItemInfo, model: EnumData.ItemInfoModel = EnumData.ItemInfoModel.SHOW_NONE): void {
			this.model = model;
			// 是否绑定
			this.img_lock.visible = Boolean(item.binding);
			// 物品ICON
			this.img_item.skin = 'image/common/daoju/itemicon_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID('' + item.itemid) + '.png';
			// 底图
			this.img_bg.skin = 'image/common/daoju/quality_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMQUALITY('' + item.itemid) + '.png';
			// 物品数量
			if (item.dwCount && item.dwCount > 1) {
				this.lbl_count.text = '' + item.dwCount;
			}
			else {
				this.lbl_count.text = '';
			}
		}

		/**
		 * 更新道具数量
		 */
		public updateDwCount(): void {
			if (this.destroyed) {
				return
			}
			// 物品数量
			this.lbl_count.text = '' + ((this.item.dwCount === 0 || this.item.dwCount === 1) ? '' : this.item.dwCount);
		}

		public isNotCanSell = false;
		/**
		 * 是否能够上架
		 * @param isSell 
		 */
		public canGoToSell(isNotCanSell: boolean): void {
			this.isNotCanSell = isNotCanSell && Boolean(this.item.dwBinding);
			// 不能上架
			if (this.isNotCanSell) {
				this.alpha = 0.5;
			}
			else {
				this.alpha = 1;
			}
		}
	}
}