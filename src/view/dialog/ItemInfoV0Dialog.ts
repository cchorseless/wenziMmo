/**Created by the LayaAirIDE*/
module view.dialog {
	export class ItemInfoV0Dialog extends ui.dialog.ItemInfoV0DialogUI {
		constructor() {
			super();
		}
		public itemObj: ProtoCmd.ItemBase;
		public model = 0;
		public setData(obj: ProtoCmd.ItemBase, model = 0): ItemInfoV0Dialog {
			this.itemObj = obj;
			this.model = model;
			switch (this.model) {
				// 背包-回收
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
				// 角色身上
				case EnumData.ItemInfoModel.SHOW_IN_PLAYER:
					this.viw_model.selectedIndex = 4;
					break;
				// 邮件内,无操作按钮，所以需要缩短界面高度
				case EnumData.ItemInfoModel.SHOW_IN_MAIL:
					this.viw_model.selectedIndex = 5;
					this.height -= this.viw_model.height;
					break;
				// 商店内
				case 6:
					this.viw_model.selectedIndex = 6;
					break;
			}
			let dwBaseID = '' + obj.dwBaseID;
			// 是否绑定
			this.lbl_isLock.visible = Boolean(obj.dwBinding);
			// 物品名称
			this.lbl_itemName.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(dwBaseID);
			// 物品描述
			this.div_itemDes.innerHTML = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMDES(dwBaseID);
			// 使用等级
			let zs_level = SheetConfig.mydb_item_base_tbl.getInstance(null).ZS_LEVEL(dwBaseID);
			this.lbl_useLevel.text = '使用等级：' + (zs_level == 0 ? '' : '' + zs_level + '转') + SheetConfig.mydb_item_base_tbl.getInstance(null).LVNEED(dwBaseID) + '级';
			// 使用职业
			this.lbl_jobNeed.text = '职业要求:' + ['通用', '战士', '法师', '道士'][SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMJOB(dwBaseID)];
			// 物品数量,数量小于1应该隐藏 或者 背包-仓库,道具不能拆分放入仓库，所以隐藏,商店中隐藏
			let ban_model =
				[EnumData.ItemInfoModel.SHOW_IN_BAG_CANGKU,
				EnumData.ItemInfoModel.SHOW_IN_CANGKU,
				EnumData.ItemInfoModel.SHOW_IN_SHOP];
			if (this.itemObj.dwCount === 1 || ban_model.indexOf(this.model) != -1) {
				this.box_count.visible = false;
				this.height -= this.box_count.height;
				this.hsbar_count.max = this.hsbar_count.min = this.hsbar_count.value = 1;
			} else {
				this.hsbar_count.max = this.itemObj.dwCount;
				this.hsbar_count.min = 1;
				this.hsbar_count.value = this.itemObj.dwCount;
				this.hsbar_count.changeHandler = Laya.Handler.create(this, (value) => {
					this.lbl_countDes.text = '使用道具数量：' + value;
					this.input_price.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).JYH_PRICE('' + obj.dwBaseID) * value;
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
					// 放入仓库
					this.btn_putToCangKu.on(Laya.UIEvent.CLICK, this, this.putToCangKu);
					break;
				// 背包-摆摊
				case 2:
					// 上架物品
					this.btn_goSell.on(Laya.UIEvent.CLICK, this, this.goToSell);
					break;
				// 仓库内
				case 3:
					// 取出道具
					this.btn_putBackCangKu.on(Laya.UIEvent.CLICK, this, this.putBackCangKu);
					// 角色身上
					// case 4:
					break;
				// 邮件内,无操作按钮，所以需要缩短界面高度
				case 5:
					break;
				// 商店
				case 6:
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
				let data = [this.itemObj.dwBaseID, itemCount, this.itemObj.i64ItemID.toString()];
				let pkt = new ProtoCmd.QuestClientData().setString('LoopUseItem', data);
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
			packet.destLocation.setValue('btLocation', EnumData.PACKAGE_TYPE.ITEMCELLTYPE_STORE);
			packet.destLocation.setValue('btIndex', 0);
			lcp.send(packet, this, (data) => {
				let msg = new ProtoCmd.CretProcessingItem(data);
				let errorcode = msg.getValue('nErrorCode');
				let i64ItemId = msg.getValue('i64ItemId').toString();
				if (errorcode == 0) {
					// 全局数据更新
					let _itemBase: ProtoCmd.ItemBase = GameApp.GameEngine.bagItemDB[i64ItemId];
					if (_itemBase) {
						// 重置位置属性
						_itemBase.location = msg.destLocation;
						// 清除绑定的UI
						_itemBase.recoverUI();
						GameApp.GameEngine.cangKuDB[i64ItemId] = _itemBase;
						delete GameApp.GameEngine.bagItemDB[i64ItemId];
						PanelManage.BeiBao && PanelManage.BeiBao.addItem(EnumData.PACKAGE_TYPE.ITEMCELLTYPE_STORE, _itemBase);
						TipsManage.showTips('放入仓库成功');
					} else {
						TipsManage.showTips('放入仓库失败(client 01)');
					}
				}
				else {
					TipsManage.showTips('放入仓库失败(server ' + errorcode + ')');
				}
				msg.clear();
				msg = null;
			});

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
			packet.destLocation.setValue('btLocation', EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE);
			packet.destLocation.setValue('btIndex', 0);
			lcp.send(packet, this, (data) => {
				let msg = new ProtoCmd.CretProcessingItem(data);
				let errorcode = msg.getValue('nErrorCode');
				let i64ItemId = msg.getValue('i64ItemId').toString();
				if (errorcode == 0) {
					// 全局数据更新
					let _itemBase: ProtoCmd.ItemBase = GameApp.GameEngine.cangKuDB[i64ItemId];
					if (_itemBase) {
						// 重置位置属性
						_itemBase.location = msg.destLocation;
						// 清除绑定的UI
						_itemBase.recoverUI();
						GameApp.GameEngine.bagItemDB[i64ItemId] = _itemBase;
						delete GameApp.GameEngine.cangKuDB[i64ItemId];
						PanelManage.BeiBao && PanelManage.BeiBao.addItem(EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE, _itemBase);
						PanelManage.BeiBao && PanelManage.BeiBao.updateCangKuInfo();
						TipsManage.showTips('取出仓库成功');
					} else {
						TipsManage.showTips('取出仓库失败(client 01)');
					}
				}
				else {
					TipsManage.showTips('取出仓库失败(server ' + errorcode + ')');
				}
				msg.clear();
				msg = null;
			});



		}

		/**
		 * 上架道具
		 */
		public goToSell(): void {
			this.close();
			if (this.ui_item.isNotCanSell) {
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