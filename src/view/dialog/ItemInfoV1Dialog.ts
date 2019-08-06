/**Created by the LayaAirIDE*/
module view.dialog {
	export class ItemInfoV1Dialog extends ui.dialog.ItemInfoV1DialogUI {
		constructor() {
			super();
			this.addEvent();
		}
		public model = 0;
		public itemObj: ItemBase;
		public setData(obj: ItemBase, model = 0): ItemInfoV1Dialog {
			this.itemObj = obj;
			this.model = model;
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
				case 4:
					this.viw_model.selectedIndex = model;
					break;
				// 商店内,无操作按钮，所以需要缩短界面高度
				case 5:
					this.viw_model.selectedIndex = model;
					this.height -= this.viw_model.height;
					break;
			}
			let dwBaseID = '' + obj.dwBaseID;
			this.lbl_isLock.visible = Boolean(obj.dwBinding);
			// 物品名称
			this.lbl_itemName.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(dwBaseID);
			// 物品描述
			this.div_itemDes.innerHTML = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMDES(dwBaseID);
			// 玩家回收经验
			this.lbl_playerRecover.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).RECOVEREXP(dwBaseID);
			// 帮会回收贡献值
			this.lbl_guildRecover.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).CONTRIBUTIONVALUE(dwBaseID);
			// 道具类型
			this.lbl_type.text = ['头盔', '项链', '衣服', '武器', '手镯', '手镯', '戒指', '戒指', '鞋字', '腰带'][SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMPOSITION(dwBaseID)];
			// 道具职业
			this.lbl_job.text = '职业：' + ['通用', '战士', '法师', '道士'][SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMJOB(dwBaseID)];
			// 道具等级，使用等级
			let zs_level = SheetConfig.mydb_item_base_tbl.getInstance(null).ZS_LEVEL(dwBaseID);
			this.lbl_level.text = '等级：' + (zs_level == 0 ? '' : '' + zs_level + '转') + SheetConfig.mydb_item_base_tbl.getInstance(null).LVNEED(dwBaseID) + '级';
			// 道具性别
			this.lbl_sex.text = ['通用', '男', '女'][SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMSEX(dwBaseID)];
			// 道具ICON信息赋值
			this.ui_item.initUI(obj);
			return this;
		}
		public addEvent(): void {
			// 关闭
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			});
			// 丢弃\销毁物品
			this.btn_destroy.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.SureOrCanelDialog().setData('确定要删除该物品吗？', EnumData.SureCanelModel.DELET_ITEM, this.itemObj.i64ItemID).popup(true);
			});
			// 角色穿戴
			this.btn_playerUse.on(Laya.UIEvent.CLICK, this, this.dressEquip);
			// 英雄穿戴
			this.btn_tuDiUse.on(Laya.UIEvent.CLICK, this, this.dressEquip, ['hero']);
			// 装备卸下
			this.btn_noLongerUse.on(Laya.UIEvent.CLICK, this, this.takeOffEquip)
		}

		/**
		 * 穿戴装备
		 * @param data 
		 */
		public dressEquip(data): void {
			this.close();
			let packet = new ProtoCmd.CretProcessingItem();
			packet.setValue('dwtmpid', GameApp.MainPlayer.tempId);
			packet.setValue('i64ItemId', this.itemObj.i64ItemID);
			packet.srcLocation.clone(this.itemObj.location.data);
			packet.destLocation.setValue('btLocation', EnumData.PACKAGE_TYPE.ITEMCELLTYPE_EQUIP);
			// 给英雄穿戴装备需要加上位置偏移
			let offset = 0;
			if (data === 'hero') {
				let jobType = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMJOB('' + this.itemObj.dwBaseID);
				switch (jobType) {
					// 法师
					case EnumData.JOB_TYPE.JOB_MAGE:
						offset = EnumData.emEquipPosition.EQUIP_HERO_MAGE_HEADDRESS;
						break;
					// 道士
					case EnumData.JOB_TYPE.JOB_MONK:
						offset = EnumData.emEquipPosition.EQUIP_HERO_MONK_HEADDRESS;
						break;
					// 战士
					case EnumData.JOB_TYPE.JOB_WARRIOR:
						offset = EnumData.emEquipPosition.EQUIP_HERO_MAGE_HEADDRESS;
						break;
				}
			}
			// 双手镯双戒指可以通用位置需要特殊处理
			let itemPosition = offset + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMPOSITION('' + this.itemObj.dwBaseID);
			switch (itemPosition) {
				// 左边
				case EnumData.emEquipPosition.EQUIP_BRACELET_LEFT:
				case EnumData.emEquipPosition.EQUIP_RING_LEFT:
				case EnumData.emEquipPosition.EQUIP_HERO_WARRIOR_BRACELET_LEFT:
				case EnumData.emEquipPosition.EQUIP_HERO_WARRIOR_RING_LEFT:
				case EnumData.emEquipPosition.EQUIP_HERO_MAGE_BRACELET_LEFT:
				case EnumData.emEquipPosition.EQUIP_HERO_MAGE_RING_LEFT:
				case EnumData.emEquipPosition.EQUIP_HERO_MONK_BRACELET_LEFT:
				case EnumData.emEquipPosition.EQUIP_HERO_MONK_RING_LEFT:
					if (GameApp.GameEngine.equipDBIndex[itemPosition] && !GameApp.GameEngine.equipDBIndex[itemPosition + 1]) {
						itemPosition += 1;
					}
					break;
				// 右边
				case EnumData.emEquipPosition.EQUIP_BRACELET_RIGHT:
				case EnumData.emEquipPosition.EQUIP_RING_RIGHT:
				case EnumData.emEquipPosition.EQUIP_HERO_WARRIOR_BRACELET_RIGHT:
				case EnumData.emEquipPosition.EQUIP_HERO_WARRIOR_RING_RIGHT:
				case EnumData.emEquipPosition.EQUIP_HERO_MAGE_BRACELET_RIGHT:
				case EnumData.emEquipPosition.EQUIP_HERO_MAGE_RING_RIGHT:
				case EnumData.emEquipPosition.EQUIP_HERO_MONK_BRACELET_RIGHT:
				case EnumData.emEquipPosition.EQUIP_HERO_MONK_RING_RIGHT:
					if (GameApp.GameEngine.equipDBIndex[itemPosition] && !GameApp.GameEngine.equipDBIndex[itemPosition - 1]) {
						itemPosition -= 1;
					}
					break;
			}
			packet.destLocation.setValue('btIndex', itemPosition);
			lcp.send(packet, this, (data) => {
				let msg = new ProtoCmd.CretProcessingItem(data);
				let errorcode = msg.getValue('nErrorCode');
				let i64ItemId = msg.getValue('i64ItemId').toString();
				let src_btIndex = msg.srcLocation.getValue('btIndex');
				let src_btLocation = msg.srcLocation.getValue('btLocation');
				let des_btIndex = msg.destLocation.getValue('btIndex');
				let des_btLocation = msg.destLocation.getValue('btLocation');
				if (errorcode == 0) {
					// 全局数据更新
					let _itemBase: ItemBase = GameApp.GameEngine.bagItemDB[i64ItemId];
					if (_itemBase) {
						_itemBase.recoverUI();
						_itemBase.location.setValue('btIndex', des_btIndex);
						_itemBase.location.setValue('btLocation', des_btLocation);
						// 是否替换判断
						let old_i64ItemId = GameApp.GameEngine.equipDBIndex[des_btIndex];
						if (old_i64ItemId) {
							let old_itemBase = GameApp.GameEngine.equipDB[old_i64ItemId];
							if (old_itemBase) {
								old_itemBase.recoverUI();
								old_itemBase.location.setValue('btIndex', src_btIndex);
								old_itemBase.location.setValue('btLocation', src_btLocation);
								GameApp.GameEngine.bagItemDB[old_i64ItemId] = old_itemBase;
								delete GameApp.GameEngine.equipDB[old_i64ItemId];
								delete GameApp.GameEngine.equipDBIndex[des_btIndex];
								// 向背包中添加物品
								PanelManage.BeiBao && PanelManage.BeiBao.addItem(EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE, old_itemBase);
							}
						}
						// 清除绑定的UI
						GameApp.GameEngine.equipDB[i64ItemId] = _itemBase;
						GameApp.GameEngine.equipDBIndex[des_btIndex] = i64ItemId;
						delete GameApp.GameEngine.bagItemDB[i64ItemId];
						TipsManage.showTips('装备穿戴成功');
					}
					else {
						TipsManage.showTips('穿戴失败(client 01)');
					}
				}
				else {
					TipsManage.showTips('穿戴失败(server ' + errorcode + ')');
				}
				msg.clear();
				msg = null;
			});
		}

		/**
		 * 脱下装备
		 * @param data 
		 */
		public takeOffEquip(): void {
			this.close();
			let packet = new ProtoCmd.CretProcessingItem();
			packet.setValue('dwtmpid', GameApp.MainPlayer.tempId);
			packet.setValue('i64ItemId', this.itemObj.i64ItemID);
			packet.srcLocation.clone(this.itemObj.location.data);
			packet.destLocation.setValue('btLocation', EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE);
			packet.destLocation.setValue('btIndex', 0);
			lcp.send(packet, this, (data) => {
				let msg = new ProtoCmd.CretProcessingItem(data);
				let errorcode = msg.getValue('nErrorCode');
				let i64ItemId = msg.getValue('i64ItemId').toString();
				if (errorcode == 0) {
					// 全局数据更新
					let _itemBase: ItemBase = GameApp.GameEngine.equipDB[i64ItemId];
					if (_itemBase) {
						// 清楚装备位置索引
						let btIndex = _itemBase.location.getValue('btIndex');
						delete GameApp.GameEngine.equipDBIndex[btIndex];
						// 重置位置属性
						_itemBase.location.clone(msg.destLocation.data);
						// 清除绑定的UI
						_itemBase.recoverUI();
						GameApp.GameEngine.bagItemDB[i64ItemId] = _itemBase;
						delete GameApp.GameEngine.equipDB[i64ItemId];
						TipsManage.showTips('装备卸下成功');
					} else {
						TipsManage.showTips('卸下失败(client 01)');
					}
				}
				else {
					TipsManage.showTips('卸下失败(server ' + errorcode + ')');
				}
				msg.clear();
				msg = null;
			});
		}
	}
}