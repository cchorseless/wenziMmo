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
			let dwBaseID = '' + item.dwBaseID;
			let player = GameApp.MainPlayer;
			// 是否有能力提升的提示
			let itemType = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMTYPE(dwBaseID);
			// 
			this.btn_isStronger.visible = false;
			// 在角色身上
			if (item.location.btLocation == EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE) {
				// 装备查看是否可以战力增加的提示
				if (itemType == EnumData.ItemTypeDef.ITEM_TYPE_EQUIP) {
					this.updateIsStronger();
				}
				// 使用等级提示
				let ZS_LEVEL = SheetConfig.mydb_item_base_tbl.getInstance(null).ZS_LEVEL(dwBaseID);
				let lvl = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMLVNEED(dwBaseID);
				if (player.zslevel * 1000 + player.level < ZS_LEVEL * 1000 + lvl) {
					this.img_bg.filters = [new Laya.ColorFilter(ColorUtils.redFilters)]
				}
				else {
					this.img_bg.filters = null;
				}
			}
			this.initUI(item, model);
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
				// 关闭其他ItemInfoDialog界面
				Laya.Dialog.closeByGroup('ItemInfoDialog');
				// 根据物品类型显示不同界面
				switch (itemType) {
					// 货币,不进背包
					case EnumData.ItemTypeDef.ITEM_TYPE_GOLD:
						return
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
				if (itemInfoDialog) {
					// 根据model显示界面不同的状态
					switch (this.model) {
						// 背包场景 有三种子状态 0背包-装备 1背包-回收 2背包-仓库 3背包-摆摊
						case EnumData.ItemInfoModel.SHOW_IN_BAG:
							let model: EnumData.ItemInfoModel;
							switch (PanelManage.BeiBao.viw_bagBottom.selectedIndex) {
								case 0:
									model = EnumData.ItemInfoModel.SHOW_IN_BAG_EQUIP;
									break;
								case 1:
									model = EnumData.ItemInfoModel.SHOW_IN_BAG_HUISHOU;
									break;
								case 2:
									model = EnumData.ItemInfoModel.SHOW_IN_BAG_CANGKU;
									break;
								case 3:
									model = EnumData.ItemInfoModel.SHOW_IN_BAG_BAITAN;
									break;
							}
							itemInfoDialog.setData(this.item, model).show(false);
							break;
						default:
							itemInfoDialog.setData(this.item, this.model).show(false);
							break;
					}
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
			let dwBaseID = '' + item.dwBaseID;
			let player = GameApp.MainPlayer;
			// 是否绑定
			this.img_lock.visible = Boolean(item.dwBinding);
			// 物品ICON
			this.img_item.skin = 'image/common/daoju/itemicon_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID(dwBaseID) + '.png';
			// 底图
			this.img_bg.skin = 'image/common/daoju/quality_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMQUALITY(dwBaseID) + '.png';
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
			this.disabled = this.isNotCanSell;
		}

		/**
		 * 更新战力提升提示
		 */
		public updateIsStronger(): void {
			let player = GameApp.MainPlayer;
			// 穿戴位置
			let pos = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMPOSITION('' + this.item.dwBaseID);
			let index_hero = [
				pos,
				pos + EnumData.emEquipPosition.EQUIP_HERO_WARRIOR_HEADDRESS,
				pos + EnumData.emEquipPosition.EQUIP_HERO_MAGE_HEADDRESS,
				pos + EnumData.emEquipPosition.EQUIP_HERO_MONK_HEADDRESS];
			// 穿戴职业
			let canJob = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMJOB('' + this.item.dwBaseID);
			// 穿戴性别
			let canSex = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMSEX('' + this.item.dwBaseID);


			for (let i = 0; i < index_hero.length; i++) {
				let index = index_hero[i];
				let itemInfo = GameUtil.findEquipInPlayer(index);
				// 优先对比角色
				let index_player = i || GameApp.MainPlayer.job;
				// 分数小于本装备
				if (itemInfo) {
					if (itemInfo.battleScore[index_player] < this.item.battleScore[index_player]) {
						this.btn_isStronger.visible = true;
						this.btn_isStronger.selected = Boolean(i);
						return
					}
				}
				// 没有装备
				else {
					this.btn_isStronger.visible = true;
					this.btn_isStronger.selected = Boolean(i);
					return
				}
			}
		}
	}
}