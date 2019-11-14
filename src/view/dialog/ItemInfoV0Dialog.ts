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
			switch (this.model) {
				// 背包-装备
				// 背包-回收
				case EnumData.ItemInfoModel.SHOW_IN_BAG_EQUIP:
				case EnumData.ItemInfoModel.SHOW_IN_BAG_HUISHOU:
					this.viw_model.selectedIndex = 0;
					break;
				// 背包-仓库,道具不能拆分放入仓库，所以隐藏
				case EnumData.ItemInfoModel.SHOW_IN_BAG_CANGKU:
					this.viw_model.selectedIndex = 1;
					break;
				// 背包-摆摊
				case EnumData.ItemInfoModel.SHOW_IN_BAG_BAITAN:
					this.viw_model.selectedIndex = 2;
					// 参考价格
					this.input_price.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).JYH_PRICE('' + obj.dwBaseID) * this.itemObj.dwCount;
					// 输入完成事件
					this.input_price.on(Laya.UIEvent.BLUR, this, () => {
						let price = parseInt(this.input_price.text);
						let minPrice = SheetConfig.mydb_item_base_tbl.getInstance(null).JYH_MINPRICE('' + obj.dwBaseID) * this.hsbar_count.value;
						this.input_price.text = '' + Math.max(Math.min(999999999, price), minPrice);
					})
					break;
				// 仓库内，道具不能拆分取出仓库，所以隐藏
				case EnumData.ItemInfoModel.SHOW_IN_CANGKU:
					this.viw_model.selectedIndex = 3;
					break;
				// 邮件内,无操作按钮，所以需要缩短界面高度
				default:
					this.viw_model.visible = false;
					this.height -= this.viw_model.height;
					break;
			}

			// 物品数量,数量小于1应该隐藏 或者 背包-仓库,道具不能拆分放入仓库，所以隐藏
			let ban_model =
				[EnumData.ItemInfoModel.SHOW_IN_BAG_CANGKU,
				EnumData.ItemInfoModel.SHOW_IN_CANGKU,
				EnumData.ItemInfoModel.SHOW_IN_MAIL
				];

			if (this.itemObj.dwCount === 1 || ban_model.indexOf(this.model) != -1) {
				this.box_count.visible = false;
				this.height -= this.box_count.height;
				this.hsbar_count.max = this.hsbar_count.min = this.hsbar_count.value = 1;
			}
			else {
				this.hsbar_count.max = this.itemObj.dwCount;
				this.hsbar_count.min = 1;
				this.hsbar_count.value = this.itemObj.dwCount;
				this.hsbar_count.changeHandler = Laya.Handler.create(this, (value) => {
					this.lbl_countDes.text = '使用道具数量：' + value;
					this.input_price.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).JYH_PRICE('' + obj.dwBaseID) * value;
				}, null, false)
			}
			this.ui_item.setData(obj);
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
					// 物品使用
					this.btn_use.on(Laya.UIEvent.CLICK, this, this.useItem);
					// 丢弃\销毁物品
					this.btn_destroy.on(Laya.UIEvent.CLICK, this, () => {
						let sureHander = Laya.Handler.create(this, () => {
							let pkt = new ProtoCmd.CretForsakeItem()
							pkt.setValue('i64id', this.itemObj.i64ItemID)
							lcp.send(pkt, this, (data) => {
								let msg = new ProtoCmd.CretForsakeItem(data);
								let errorcode = msg.getValue('btErrorCode');
								switch (errorcode) {
									case 0:
										TipsManage.showTips('丢弃物品成功');
										break;
									case 33:
										TipsManage.showTips('绑定物品不允许丢弃');
										break;
									default:
										TipsManage.showTips('该物品不允许丢弃');
										break;
								}
								msg.clear();
								msg = null;
							});
						})
						new view.dialog.SureOrCanelDialog().setData('确定要删除该物品吗？', sureHander).popup(true);
					});
					break;
				// 背包-仓库,道具不能拆分放入仓库，所以隐藏
				case EnumData.ItemInfoModel.SHOW_IN_BAG_CANGKU:
					// 放入仓库
					this.btn_putToCangKu.on(Laya.UIEvent.CLICK, this, this.putToCangKu);
					break;
				// 背包-摆摊
				case EnumData.ItemInfoModel.SHOW_IN_BAG_BAITAN:
					// 上架物品
					this.btn_goSell.on(Laya.UIEvent.CLICK, this, this.goToSell);
					break;
				// 仓库内，道具不能拆分取出仓库，所以隐藏
				case EnumData.ItemInfoModel.SHOW_IN_CANGKU:
					// 取出道具
					this.btn_putBackCangKu.on(Laya.UIEvent.CLICK, this, this.putBackCangKu);
					break
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
				let data = [this.itemObj.dwBaseID, itemCount, this.itemObj.i64ItemID.toString()];
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.ITEM_LoopUseItem, data);
				lcp.send(pkt);
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

		/**
		 * 上架道具
		 */
		public goToSell(): void {
			this.close();
			if (this.ui_item.ui_item.isNotCanSell) {
				TipsManage.showTips('绑定物品不能交易');
				return
			}
			if (PanelManage.BeiBao && PanelManage.BeiBao.checkTanWeiIsFull()) {
				let pkt = new ProtoCmd.stAuctionSellItem();
				pkt.setValue('i64Id', this.itemObj.i64ItemID);
				pkt.setValue('dwCount', this.hsbar_count.value);
				pkt.setValue('dwPrice', parseInt(this.input_price.text));
				pkt.setValue('btDays', 1);
				pkt.setValue('boShowName', false);
				lcp.send(pkt, this, (data) => {
					let cbpkt = new ProtoCmd.stStallRet(data);
					if (cbpkt.result === 0) {
						TipsManage.showTips('上架成功');
						PanelManage.BeiBao && PanelManage.BeiBao.updateTanWei();
					}
					else {
						TipsManage.showTips('上架失败');
					};
					cbpkt.clear();
					cbpkt = null;
				});

			}
			else {
				TipsManage.showTips('摊位已满无法上架');
			}
		}

	}
}