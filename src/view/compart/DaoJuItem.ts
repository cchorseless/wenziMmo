/**Created by the LayaAirIDE*/
module view.compart {
	export class DaoJuItem extends ui.compart.DaoJuItemUI {
		public item: ProtoCmd.ItemBase;
		public model: EnumData.ItemInfoModel = 0;
		constructor() {
			super();
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
			this.initUI(this.item, model);
			this.addEvent();
		}

		public addEvent(): void {
			if (this.model == EnumData.ItemInfoModel.SHOW_NONE) {
				return
			}
			this.on(Laya.UIEvent.CLICK, this, () => {
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
					// 背包场景 0背包-回收 1背包仓库 2背包摆摊
					case EnumData.ItemInfoModel.SHOW_IN_BAG:
						itemInfoDialog.setData(this.item, PanelManage.BeiBao.tab_changeView.selectedIndex).show(true);
						break;
					// 仓库场景
					case EnumData.ItemInfoModel.SHOW_IN_CANGKU:
						itemInfoDialog.setData(this.item, 3).show(true);
						break;
					// 角色弟子身上场景
					case EnumData.ItemInfoModel.SHOW_IN_PLAYER:
						itemInfoDialog.setData(this.item, 4).show(true);
						break;
					// 邮件场景
					case EnumData.ItemInfoModel.SHOW_IN_MAIL:
						itemInfoDialog.setData(this.item, 5).show(true);
						break;
					// 商店场景
					case EnumData.ItemInfoModel.SHOW_IN_SHOP:
						itemInfoDialog.setData(this.item, 6).show(true);
						break;
				}
			});
		}

		/**
		 * 通过不更新绑定UI的情况下初始化UI
		 * @param item 
		 * @param model 
		 */
		public initUI(item: ProtoCmd.ItemBase, model: EnumData.ItemInfoModel = EnumData.ItemInfoModel.SHOW_NONE): void {
			this.model = model;
			// 是否绑定
			this.img_lock.visible = Boolean(item.dwBinding);
			// 物品ICON
			this.img_item.skin = 'image/common/daoju/itemicon_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID('' + item.dwBaseID) + '.png';
			// 底图
			this.img_bg.skin = 'image/common/daoju/quality_' + item.btQuality + '.png';
			// 物品数量
			this.lbl_count.text = '' + ((item.dwCount === 0 || item.dwCount === 1) ? '' : item.dwCount);
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