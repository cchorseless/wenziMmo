/**Created by the LayaAirIDE*/
module view.dialog {
	export class ItemInfoV0Dialog extends ui.dialog.ItemInfoV0DialogUI {
		constructor() {
			super();
		}
		public itemObj:ProtoCmd. ItemBase;
		public model = 0;
		public setData(obj: ProtoCmd.ItemBase, model = 0): ItemInfoV0Dialog {
			this.itemObj = obj;
			this.model = model
			switch (this.model) {
				// 背包-回收
				case 0:
				// 背包-仓库
				case 1:
				// 背包-摆摊
				case 2:
				// 仓库内
				case 3:
					// 角色身上
					// case 4:
					this.viw_model.selectedIndex = model;
					break;
				// 商店内,无操作按钮，所以需要缩短界面高度
				case 5:
					this.viw_model.selectedIndex = model;
					this.height -= this.viw_model.height;
					break;
			}
			let dwBaseID = '' + obj.dwBaseID;
			// 物品名称
			this.lbl_itemName.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(dwBaseID);
			// 物品描述
			this.div_itemDes.innerHTML = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMDES(dwBaseID);
			// 使用等级
			let zs_level = SheetConfig.mydb_item_base_tbl.getInstance(null).ZS_LEVEL(dwBaseID);
			this.lbl_useLevel.text = '使用等级：' + (zs_level == 0 ? '' : '' + zs_level + '转') + SheetConfig.mydb_item_base_tbl.getInstance(null).LVNEED(dwBaseID) + '级';
			// 使用职业
			this.lbl_jobNeed.text = '职业要求:' + ['通用', '战士', '法师', '道士'][SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMJOB(dwBaseID)];
			// 物品数量,数量小于1应该
			if (this.itemObj.dwCount === 1) {
				this.box_count.visible = false;
				this.height -= this.box_count.height;
				this.hsbar_count.value = 1;
			} else {
				this.hsbar_count.max = this.itemObj.dwCount;
				this.hsbar_count.min = 1;
				this.hsbar_count.value = this.itemObj.dwCount;
				this.hsbar_count.changeHandler = Laya.Handler.create(this, (value) => {
					this.lbl_countDes.text = '使用道具数量：' + value;
				}, null, false)
			}
			// 道具ICON信息赋值
			this.ui_item.initUI(obj);
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			// 关闭
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			});

			switch (this.model) {
				// 背包-回收
				case 0:
					// 物品使用
					this.btn_use.on(Laya.UIEvent.CLICK, this, this.useItem);
					// 丢弃\销毁物品
					this.btn_destroy.on(Laya.UIEvent.CLICK, this, () => {
						new view.dialog.SureOrCanelDialog().setData('确定要删除该物品吗？', EnumData.SureCanelModel.DELET_ITEM, this.itemObj.i64ItemID).popup(true);
					});
					break;
				// 背包-仓库
				case 1:
				// 背包-摆摊
				case 2:
				// 仓库内
				case 3:
					// 角色身上
					// case 4:

					break;
				// 商店内,无操作按钮，所以需要缩短界面高度
				case 5:
					break;
			}
		}

		/**
		 * 物品使用
		 */
		public useItem(): void {
			this.close();
			let itemCount = this.hsbar_count.value;
			// 使用1个
			if (itemCount === 1) {
				let pkt = new ProtoCmd.CretGetUseItem();
				pkt.setValue('i64id', this.itemObj.i64ItemID);
				pkt.setValue('dwCretOwnerTempId', GameApp.MainPlayer.tempId);
				lcp.send(pkt, this, (data) => {
					let pktCB = new ProtoCmd.CretGetUseItemRet(data);
					let btErrorCode = pktCB.getValue('btErrorCode');
					if (btErrorCode == 0) {
						TipsManage.showTips('道具使用成功');
					}
					else {
						TipsManage.showTips('道具使用失败');
					}
				})
			}
			// 批量使用
			else {
				let str = 'LoopUseItem(' + this.itemObj.dwBaseID + ',' + itemCount + ',' + this.itemObj.i64ItemID.toString() + ')';
				let pkt = new ProtoCmd.QuestClientData().setString(str);
				lcp.send(pkt);
			}


		}
	}
}