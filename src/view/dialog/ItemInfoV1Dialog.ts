/**Created by the LayaAirIDE*/
module view.dialog {
	export class ItemInfoV1Dialog extends ui.dialog.ItemInfoV1DialogUI {
		constructor() {
			super();
			this.group = 'ItemInfoDialog';
		}
		public model = 0;
		public itemObj: ProtoCmd.ItemBase;
		public setData(obj: ProtoCmd.ItemBase, model = 0): ItemInfoV1Dialog {
			this.itemObj = obj;
			this.model = model;
			switch (this.model) {
				// 背包-装备
				case EnumData.ItemInfoModel.SHOW_IN_BAG_EQUIP:
					this.viw_model.selectedIndex = 0;
					break;
				// 背包-回收
				case EnumData.ItemInfoModel.SHOW_IN_BAG_HUISHOU:
					this.viw_model.selectedIndex = 5;
					break;
				// 背包-仓库
				case EnumData.ItemInfoModel.SHOW_IN_BAG_CANGKU:
					this.viw_model.selectedIndex = 1;
					break;
				// 背包-摆摊
				case EnumData.ItemInfoModel.SHOW_IN_BAG_BAITAN:
					this.viw_model.selectedIndex = 2;
					// 参考价格
					this.input_price.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).JYH_PRICE('' + obj.dwBaseID);
					// 输入完成事件
					this.input_price.on(Laya.UIEvent.BLUR, this, () => {
						let price = parseInt(this.input_price.text);
						let minPrice = SheetConfig.mydb_item_base_tbl.getInstance(null).JYH_MINPRICE('' + obj.dwBaseID);
						this.input_price.text = '' + Math.max(Math.min(99999999, price), minPrice);
					})
					break;
				// 仓库内
				case EnumData.ItemInfoModel.SHOW_IN_CANGKU:
					this.viw_model.selectedIndex = 3;
					break;
				// 角色身上
				case EnumData.ItemInfoModel.SHOW_IN_PLAYER:
					this.viw_model.selectedIndex = 4;
					break;
				// 回收炉内
				case EnumData.ItemInfoModel.SHOW_IN_HUI_SHOU_LU:
					this.viw_model.selectedIndex = 8;
					break;
				// 邮件内,无操作按钮，所以需要缩短界面高度
				case EnumData.ItemInfoModel.SHOW_IN_MAIL:
					this.viw_model.visible = false;
					this.height -= this.viw_model.height;
					break;
				// 公会背包内
				case EnumData.ItemInfoModel.SHOW_IN_GUILD_BAG:
					this.viw_model.selectedIndex = 6;
					break;
				// 公会仓库内
				case EnumData.ItemInfoModel.SHOW_IN_GUILD_CANGKU:
					this.viw_model.selectedIndex = 7;
					this.lbl_duiHuanPrice.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).CONTRIBUTIONVALUE('' + obj.dwBaseID);
					break;

			}
			let dwBaseID = '' + obj.dwBaseID;
			// 物品名称
			this.lbl_itemName.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(dwBaseID);
			// 物品描述
			this.div_itemDes.innerHTML = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMDES(dwBaseID);
			// 玩家回收经验
			this.lbl_playerRecover.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).RECOVEREXP(dwBaseID);
			// 帮会回收贡献值
			this.lbl_guildRecover.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).CONTRIBUTIONVALUE(dwBaseID);
			// 道具类型
			let pos = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMPOSITION(dwBaseID);
			this.lbl_type.text = LangConfig.emEquipPositionDes[EnumData.emEquipPosition[pos]];
			// 道具职业
			let jobLimit = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMJOB(dwBaseID)
			this.lbl_job.text = LangConfig.JOB_TYPEDES[EnumData.JOB_TYPE[jobLimit]];
			// 道具等级，使用等级
			let zs_level = SheetConfig.mydb_item_base_tbl.getInstance(null).ZS_LEVEL(dwBaseID);
			let lvl = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMLVNEED(dwBaseID);
			this.lbl_level.text = LangConfig.getLevelDes(zs_level, lvl);
			// 道具性别
			let sex = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMSEX(dwBaseID);
			this.lbl_sex.text = LangConfig.SEX_TYPEDes[EnumData.SEX_TYPE[sex]];
			// 战斗评分
			this.lbl_sorce.text = '评分:' + this.itemObj.battleScore[jobLimit];
			// 装备属性

			// 基本属性
			let effid0;
			switch (jobLimit) {
				case EnumData.JOB_TYPE.JOB_NONE:
				case EnumData.JOB_TYPE.JOB_WARRIOR:
					effid0 = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB1_EFFICTID(dwBaseID);
					break;
				case EnumData.JOB_TYPE.JOB_MAGE:
					effid0 = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB2_EFFICTID(dwBaseID);
					break;
				case EnumData.JOB_TYPE.JOB_MONK:
					effid0 = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB3_EFFICTID(dwBaseID);
					break;
			}
			if (effid0) {
				let effResult0 = GameUtil.parseEffectidToString('' + effid0);
				this.tab_props.labels = '基础属性';
				this.list_propsDes0.itemRender = view.compart.SinglePropsItem;
				this.list_propsDes0.array = effResult0.des;
				this.list_propsDes0.renderHandler = Laya.Handler.create(this, (ceil: view.compart.SinglePropsItem, data) => {
					ceil.setData(ceil.dataSource);
				}, null, false)
			}
			// 套装属性
			let effid1 = SheetConfig.mydb_item_base_tbl.getInstance(null).SUIT_EFFICTID(dwBaseID);
			if (effid1) {
				let effResult1 = GameUtil.parseEffectidToString('' + effid1);
				this.tab_props.labels += ',套装属性';
				this.list_propsDes1.itemRender = view.compart.SinglePropsItem;
				this.list_propsDes1.array = effResult1.des;
				this.list_propsDes1.renderHandler = Laya.Handler.create(this, (ceil: view.compart.SinglePropsItem, data) => {
					ceil.setData(ceil.dataSource);
				}, null, false);
			}
			// 特殊属性
			if (this.itemObj.stNpPropertyString.length > 0) {
				this.tab_props.labels += ',极品属性';
				this.list_propsDes2.itemRender = view.compart.SinglePropsItem;
				this.list_propsDes2.array = this.itemObj.stNpPropertyString;
				this.list_propsDes2.renderHandler = Laya.Handler.create(this, (ceil: view.compart.SinglePropsItem, data) => {
					ceil.setData(ceil.dataSource);
				}, null, false);
			}
			this.tab_props.selectHandler = Laya.Handler.create(this, (index) => {
				if (this.tab_props.items[index].label) {

				}
				switch (this.tab_props.items[index].label) {
					case '基础属性':
						this.viw_prop0.selectedIndex = 0;
						break;
					case '套装属性':
						this.viw_prop0.selectedIndex = 1;
						break;
					case '极品属性':
						this.viw_prop0.selectedIndex = 2;
						break;
				}
			}, null, false)
			// 道具ICON信息赋值
			this.ui_item.initUI(obj);
			// 添加监听
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
				case EnumData.ItemInfoModel.SHOW_IN_BAG_EQUIP:
					// 角色穿戴
					this.btn_playerUse.on(Laya.UIEvent.CLICK, this, this.dressEquip);
					// 英雄穿戴
					this.btn_tuDiUse.on(Laya.UIEvent.CLICK, this, this.dressEquip, ['hero']);
					break;
				// 背包-回收
				case EnumData.ItemInfoModel.SHOW_IN_BAG_HUISHOU:
					this.btn_putToHuiShou.on(Laya.UIEvent.CLICK, this, this.putToHuiShou);
					break;
				// 背包-仓库
				case EnumData.ItemInfoModel.SHOW_IN_BAG_CANGKU:
					// 放入仓库
					this.btn_putToCangKu.on(Laya.UIEvent.CLICK, this, this.putToCangKu);
					break;
				// 背包-摆摊
				case EnumData.ItemInfoModel.SHOW_IN_BAG_BAITAN:
					// 上架物品
					this.btn_goSell.on(Laya.UIEvent.CLICK, this, this.goToSell);
					break;
				// 仓库内
				case EnumData.ItemInfoModel.SHOW_IN_CANGKU:
					// 取出道具
					this.btn_putBackCangKu.on(Laya.UIEvent.CLICK, this, this.putBackCangKu);
					break;
				// 角色身上
				case EnumData.ItemInfoModel.SHOW_IN_PLAYER:
					// 装备卸下
					this.btn_noLongerUse.on(Laya.UIEvent.CLICK, this, this.takeOffEquip);
					break;
				// 邮件内,无操作按钮，所以需要缩短界面高度
				case EnumData.ItemInfoModel.SHOW_IN_MAIL:
					break;
				// 回收炉内
				case EnumData.ItemInfoModel.SHOW_IN_HUI_SHOU_LU:
					// 取出道具
					this.btn_putBackHuiShou.on(Laya.UIEvent.CLICK, this, this.putBackHuiShou);
					break;
				// 公会背包内
				case EnumData.ItemInfoModel.SHOW_IN_GUILD_BAG:
					this.btn_juanXian.on(Laya.UIEvent.CLICK, this, this.guildJuanXian);
					break;
				// 公会仓库内
				case EnumData.ItemInfoModel.SHOW_IN_GUILD_CANGKU:
					this.btn_duiHuan.on(Laya.UIEvent.CLICK, this, this.guildDuiHuan);
					break;
			}
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
			packet.srcLocation = this.itemObj.location;
			packet.destLocation.btLocation = EnumData.PACKAGE_TYPE.ITEMCELLTYPE_EQUIP;
			// 给英雄穿戴装备需要加上位置偏移
			let offset = 0;
			if (data === 'hero') {
				// 没有装备限制，给弟子穿装备
				let jobType = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMJOB('' + this.itemObj.dwBaseID) || PanelManage.BeiBao.ui_equipInfo.tab_0.selectedIndex;
				switch (jobType) {
					// 战士
					case EnumData.JOB_TYPE.JOB_WARRIOR:
						offset = EnumData.emEquipPosition.EQUIP_HERO_WARRIOR_HEADDRESS;
						break;
					// 法师
					case EnumData.JOB_TYPE.JOB_MAGE:
						offset = EnumData.emEquipPosition.EQUIP_HERO_MAGE_HEADDRESS;
						break;
					// 道士
					case EnumData.JOB_TYPE.JOB_MONK:
						offset = EnumData.emEquipPosition.EQUIP_HERO_MONK_HEADDRESS;
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
			packet.destLocation.btIndex = itemPosition;
			lcp.send(packet);
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
			packet.srcLocation = this.itemObj.location;
			packet.destLocation.btLocation = EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE;
			packet.destLocation.btIndex = 0;
			lcp.send(packet);
		}
		/**
		 * 放入熔炉
		 */
		public putToHuiShou(): void {
			this.itemObj.ui_item.disabled = true;
			PanelManage.BeiBao.ui_huiShou.addItem(this.itemObj)
			this.close();
		}

		/**
		 * 取出熔炉
		 */
		public putBackHuiShou(): void {


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
			if (this.ui_item.isNotCanSell) {
				TipsManage.showTips('绑定物品不能交易');
				return
			}
			if (PanelManage.BeiBao && PanelManage.BeiBao.checkTanWeiIsFull()) {
				let pkt = new ProtoCmd.stAuctionSellItem();
				pkt.setValue('i64Id', this.itemObj.i64ItemID);
				pkt.setValue('dwCount', 1);
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

		/**
		 * 公会捐献
		 */
		public guildJuanXian(): void {
			this.close();
			let pkt = new ProtoCmd.stBeginDonateEquip();
			pkt.setValue('i64ItemId', this.itemObj.i64ItemID);
			pkt.setValue('dwStoreId', 0);
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stBeginDonateEquipRet(data);
				let btError = cbpkt.getValue('btError');
				if (btError == 0) {
					let ui = new view.compart.DaoJuItem();
					let item = new ProtoCmd.ItemBase();
					item.clone(cbpkt.item.data);
					ui.setData(item, EnumData.ItemInfoModel.SHOW_IN_GUILD_CANGKU);
					PanelManage.GuildStore && PanelManage.GuildStore.addItem(ui, false);
					// 删除原item
					this.itemObj.recoverUI();
					// 更新数量标签
					PanelManage.GuildStore && PanelManage.GuildStore.updateCangKuCount();
				}
				else {
					TipsManage.showTips('捐献失败，错误码' + btError);
				}
				cbpkt.clear();
				cbpkt = null;
			});
		}

		/**
		 * 工会兑换
		 */
		public guildDuiHuan(): void {
			this.close();
			let pkt = new ProtoCmd.stWantGetGuildPackageItem();
			pkt.setValue('i64ItemId', this.itemObj.i64ItemID);
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stSucessGetGuildPackageItemRet(data);
				let btError = cbpkt.getValue('btError');
				if (btError == 0) {
					let ui = new view.compart.DaoJuItem();
					let item = new ProtoCmd.ItemBase();
					item.clone(cbpkt.item.data);
					ui.setData(item, EnumData.ItemInfoModel.SHOW_IN_GUILD_BAG);
					// 删除原item
					this.itemObj.recoverUI();
					PanelManage.GuildStore && PanelManage.GuildStore.addItem(ui, true);
					// 更新数量标签
					PanelManage.GuildStore && PanelManage.GuildStore.updateCangKuCount();
				}
				else {
					TipsManage.showTips('兑换失败，错误码' + btError);
				}
			})


		}
	}
}