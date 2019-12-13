/**Created by the LayaAirIDE*/
module view.compart {
	export class DaoJuCostItem extends ui.compart.DaoJuCostItemUI {
		public item: ProtoCmd.ItemBase;
		public model: EnumData.ItemInfoModel = EnumData.ItemInfoModel.SHOW_IN_MAIL;
		public addType;
		constructor() {
			super();
			this.addEvent();
		}
		/**
		 * 
		 * @param item   
		 * @param mode   响应事件模式,默认不显示
		 * @param costStatus   当前消耗的状态   是否足够消耗  用于改变lab_cost 的字体颜色 和img_NeedAdd的显示状态
		 * @param costStr  lab_cost 显示  
		 * @param addType  点击img_NeedAdd  对应弹出的面板类型  
		 */
		public setData(item: ProtoCmd.ItemBase, costStatus: boolean, costStr: string, addType: number, mode: EnumData.ItemInfoModel = EnumData.ItemInfoModel.SHOW_IN_MAIL) {
			this.item = item;
			this.addType = addType;
			let dwBaseID = item.dwBaseID + '';
			// 物品ICON
			this.img_item.skin = 'image/common/daoju/itemicon_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID(dwBaseID) + '.png';
			// 底图
			this.img_bg.skin = 'image/common/daoju/quality_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMQUALITY(dwBaseID) + '.png';
			if (costStatus) {
				this.lab_cost.color = '#63491a';
				// this.lab_cost.
				this.img_NeedAdd.visible = false;
				this.btn_add.visible = false;
				this.lab_cost.stroke = 0;
			} else {
				this.lab_cost.color = '#7a211f';
				this.img_NeedAdd.visible = true;
				this.btn_add.visible = true;
				this.lab_cost.stroke = 3;
			}
			this.lab_cost.text = costStr;
		}

		public addEvent(): void {
			EventManage.onWithEffect(this.btn_add, Laya.UIEvent.CLICK, this, () => {
				// switch (this.addType) {
				// 	case 1:
				// 		break;
				// }
				console.log("aaaaaaaaaaaaaaaaaaaaaaa")
				// this.btn_add.visible = false;
			})
			this.img_item.on(Laya.UIEvent.CLICK, this, function () {
				if (this.model == EnumData.ItemInfoModel.SHOW_NONE) {
					return
				}
				// 是否可以上架
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
							itemInfoDialog.setData(this.item, model, this.type).show(false);
							break;
						default:
							itemInfoDialog.setData(this.item, this.model, this.type).show(false);
							break;
					}
				}
			})
		}
	}
}