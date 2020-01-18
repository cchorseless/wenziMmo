/**Created by the LayaAirIDE*/
module view.dialog {
	export class ItemInfoV0Dialog extends ui.dialog.ItemInfoV0DialogUI {
		constructor() {
			super();
			this.group = 'ItemInfoDialog';
		}
		public itemObj: ProtoCmd.ItemBase;
		public model = 0;
		public setData(obj: ProtoCmd.ItemBase, model = 0): ItemInfoV0Dialog {
			this.itemObj = obj;
			this.model = model;
			this.lab_Name.text = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(obj.dwBaseID.toString());
			this.lab_Name.fontSize = (this.lab_Name.text.length > 5) ? 26 : 36;
			let dwBaseID = '' + obj.dwBaseID;
			// 物品描述
			this.div_itemDes.style.fontSize = 25;
			this.div_itemDes.style.wordWrap = true;
			this.div_itemDes.innerHTML = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMDES(dwBaseID);
			this.img_bg.height = this.div_itemDes.y + this.div_itemDes.contextHeight + 5;
			//物品类型
			let type = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMTYPE(dwBaseID);
			this.lbl_type.text = LangConfig.emItemTypeDes[EnumData.ItemTypeDef[type]];
			// 使用等级
			let zs_level = SheetConfig.mydb_item_base_tbl.getInstance(null).ZS_LEVEL(dwBaseID);
			this.lbl_useLevel.text = (zs_level == 0 ? '' : '' + zs_level + '转') + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMLVNEED(dwBaseID) + '级';
			//售价
			this.lbl_score.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMSELLPRICE(dwBaseID);
			// 道具ICON信息赋值
			this.ui_item.initUI(obj);
			//获取途径
			let from = SheetConfig.mydb_item_base_tbl.getInstance(null).ACCESS_WAY(dwBaseID);
			for (let item of from) {
				new view.compart.DaoJu_ChannelItem().setData(item);
			}
			this.box_channel.y = this.img_bg.y + this.img_bg.height + 5;
			this.box_operation.visible = true;
			this.img_bigBg.height = this.box_channel.y + this.box_channel.height + 168;
			switch (this.model) {
				// 背包-装备
				// 背包-回收
				case EnumData.ItemInfoModel.SHOW_IN_BAG_EQUIP:
				case EnumData.ItemInfoModel.SHOW_IN_BAG_HUISHOU:
					// this.viw_model.selectedIndex = 0;
					break;
				// 背包-仓库,道具不能拆分放入仓库，所以隐藏
				case EnumData.ItemInfoModel.SHOW_IN_BAG_CANGKU:
					this.btn_putToCangKu.label = '存入仓库';
					this.btn_use.disabled = this.btn_sell.disabled = true;
					break;
				// 背包-摆摊
				case EnumData.ItemInfoModel.SHOW_IN_BAG_BAITAN:
					this.btn_use.disabled = this.btn_sell.disabled = true;
					// this.viw_model.selectedIndex = 2;
					// 参考价格
					// this.input_price.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).JYH_PRICE('' + obj.dwBaseID) * this.itemObj.dwCount;
					// 输入完成事件
					// this.input_price.on(Laya.UIEvent.BLUR, this, () => {
					// let price = parseInt(this.input_price.text);
					// let minPrice = SheetConfig.mydb_item_base_tbl.getInstance(null).JYH_MINPRICE('' + obj.dwBaseID) * this.hsbar_count.value;
					// this.input_price.text = '' + Math.max(Math.min(999999999, price), minPrice);
					// })
					break;
				// 仓库内，道具不能拆分取出仓库，所以隐藏
				case EnumData.ItemInfoModel.SHOW_IN_CANGKU:
					this.btn_use.disabled = this.btn_sell.disabled = this.btn_goSell.disabled = true;
					this.btn_putToCangKu.label = '取出仓库';
					// this.viw_model.selectedIndex = 3;
					break;
				// 邮件内,无操作按钮，所以需要缩短界面高度
				case EnumData.ItemInfoModel.SHOW_IN_MAIL:
					this.box_operation.visible = false;
					this.img_bigBg.height = this.box_channel.y + this.box_channel.height+40;
					break;
			}
			if (obj.dwBinding) {
				this.btn_goSell.disabled = true;
			}
			// 物品数量,数量小于1应该隐藏 或者 背包-仓库,道具不能拆分放入仓库，所以隐藏
			// let ban_model =
			// 	[EnumData.ItemInfoModel.SHOW_IN_BAG_CANGKU,
			// 	EnumData.ItemInfoModel.SHOW_IN_CANGKU,
			// 	EnumData.ItemInfoModel.SHOW_IN_MAIL
			// 	];

			// if (this.itemObj.dwCount === 1 || ban_model.indexOf(this.model) != -1) {
			// 	this.box_count.visible = false;
			// 	this.height -= this.box_count.height;
			// 	this.hsbar_count.max = this.hsbar_count.min = this.hsbar_count.value = 1;
			// }
			// else {
			// this.hsbar_count.max = this.itemObj.dwCount;
			// this.hsbar_count.min = 1;
			// this.hsbar_count.value = this.itemObj.dwCount;
			// this.hsbar_count.changeHandler = Laya.Handler.create(this, (value) => {
			// 	this.lbl_countDes.text = '使用道具数量：' + value;
			// this.input_price.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).JYH_PRICE('' + obj.dwBaseID) * value;
			// }, null, false)
			// }

			this.addEvent();
			return this;
		}
		public addEvent(): void {
			// 关闭
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			});

			switch (this.model) {
				// 背包-装备
				// 背包-回收
				case EnumData.ItemInfoModel.SHOW_IN_BAG_EQUIP:
				case EnumData.ItemInfoModel.SHOW_IN_BAG_HUISHOU:
				// 背包-仓库,道具不能拆分放入仓库，所以隐藏
				case EnumData.ItemInfoModel.SHOW_IN_BAG_CANGKU:
					// 背包-摆摊
				case EnumData.ItemInfoModel.SHOW_IN_BAG_BAITAN:
					// 物品使用
					this.btn_use.on(Laya.UIEvent.CLICK, this, () => {
						let num = SheetConfig.mydb_item_base_tbl.getInstance(null).USEPRIZE('' + this.itemObj.dwBaseID);
						if (num == 0) {
							new view.compart.DaoJu_UseDialog().setData(this.itemObj).popup();
							this.close();
						} else {
							new view.compart.DaoJu_UseDialog().setData(this.itemObj, 1).popup();
							this.close();
						}
						// this.useItem();
					});
					// 上架物品
					this.btn_goSell.on(Laya.UIEvent.CLICK, this, () => {
						new view.dialog.Daoju_ShangJiaDialog().setData(this.itemObj).popup();
						this.close();
					});
					// 放入仓库
					this.btn_putToCangKu.on(Laya.UIEvent.CLICK, this, this.putToCangKu);
					// 丢弃\销毁物品
					// this.btn_destroy.on(Laya.UIEvent.CLICK, this, () => {
					// 	let sureHander = Laya.Handler.create(this, () => {
					// 		let pkt = new ProtoCmd.CretForsakeItem()
					// 		pkt.setValue('i64id', this.itemObj.i64ItemID)
					// 		lcp.send(pkt, this, (data) => {
					// 			let msg = new ProtoCmd.CretForsakeItem(data);
					// 			let errorcode = msg.getValue('btErrorCode');
					// 			switch (errorcode) {
					// 				case 0:
					// 					TipsManage.showTips('丢弃物品成功');
					// 					break;
					// 				case 33:
					// 					TipsManage.showTips('绑定物品不允许丢弃');
					// 					break;
					// 				default:
					// 					TipsManage.showTips('该物品不允许丢弃');
					// 					break;
					// 			}
					// 			msg.clear();
					// 			msg = null;
					// 		});
					// 	})
					// 	new view.dialog.SureOrCanelDialog().setData('确定要删除该物品吗？', sureHander).popup(true);
					// });
					break;
				// 仓库内，道具不能拆分取出仓库，所以隐藏
				case EnumData.ItemInfoModel.SHOW_IN_CANGKU:
					// 取出道具
					this.btn_putToCangKu.on(Laya.UIEvent.CLICK, this, this.putBackCangKu);
					break
			}
		}



		/**
		 * 放入仓库
		 */
		public putToCangKu(): void {
			this.close();
			let packet = new ProtoCmd.CretProcessingItem();
			packet.setValue('dwtmpid', GameApp.MainPlayer.tempId);
			packet.setValue('i64ItemId', this.itemObj.i64ItemID);
			packet.srcLocation = this.itemObj.location;
			packet.destLocation.btLocation = EnumData.PACKAGE_TYPE.ITEMCELLTYPE_STORE;
			packet.destLocation.btIndex = 0;
			lcp.send(packet);
		}

		/**
		 * 从仓库取出道具
		 */
		public putBackCangKu(): void {
			this.close();
			let packet = new ProtoCmd.CretProcessingItem();
			packet.setValue('dwtmpid', GameApp.MainPlayer.tempId);
			packet.setValue('i64ItemId', this.itemObj.i64ItemID);
			packet.srcLocation = this.itemObj.location;
			packet.destLocation.btLocation = EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE;
			packet.destLocation.btIndex = 0;
			lcp.send(packet);
		}


	}
}