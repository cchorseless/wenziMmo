/**Created by the LayaAirIDE*/
module view.dialog {
	export class ItemInfoV1Dialog extends ui.dialog.ItemInfoV1DialogUI {
		constructor() {
			super();
			this.group = 'ItemInfoDialog';
		}
		public model = 0;
		public itemObj: ProtoCmd.ItemBase;
		public setData(item: ProtoCmd.ItemBase, model = 0): ItemInfoV1Dialog {
			this.vbox_shuxing['sortItem'] = (items) => { };
			this.vbox_suit['sortItem'] = (items) => { };
			let obj = new ProtoCmd.ItemBase();
			obj.clone(item.data);
			this.itemObj = obj;
			this.model = model;
			//名称
			this.lab_Name.text = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(obj.dwBaseID.toString());
			this.lab_Name.fontSize = (this.lab_Name.text.length > 5) ? 26 : 36;
			// 玩家回收经验
			this.lbl_exp.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).RECOVEREXP('' + obj.dwBaseID);
			// 道具职业
			let jobLimit = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMJOB('' + obj.dwBaseID)
			this.lbl_job.text = LangConfig.JOB_TYPEDES[EnumData.JOB_TYPE[jobLimit]];
			//装备部位
			let pos = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMPOSITION('' + obj.dwBaseID)
			this.lbl_pos.text = LangConfig.emEquipPositionDes[EnumData.emEquipPosition[pos]];
			// 战斗评分
			this.lbl_score.text = obj.battleScore[jobLimit] + "";
			let itemInMy = GameUtil.findEquipInPlayer(pos);
			//星级
			let star=obj.btStrengCount;
			if(star>0){
				for(let i=1;i<=star;i++){
					this['btn_'+i].selected=true;
				}
			}
			//描述
			this.lbl_des.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMDES('' + obj.dwBaseID);
			if (itemInMy) {
				this.img_up.visible = true;
				let job = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMJOB('' + itemInMy.dwBaseID)
				let inSelf = itemInMy.battleScore[job];
				let pingfen = obj.battleScore[jobLimit]
				if (pingfen > inSelf) {
					this.img_up.skin = 'image/main/img_common_up01.png';
				} else if (pingfen < inSelf) {
					this.img_up.skin = 'image/main/img_common_down01.png';
				}
				this.img_up.x=this.lbl_score.x+this.lbl_score.width+5;
			} else {
				this.img_up.visible = false;
			}
			// 道具等级，使用等级
			let zs_level = SheetConfig.mydb_item_base_tbl.getInstance(null).ZS_LEVEL('' + obj.dwBaseID);
			let lvl = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMLVNEED('' + obj.dwBaseID);
			this.lbl_lvl.text = LangConfig.getLevelDes(zs_level, lvl);
			//绑定
			if (obj.dwBinding) {
				this.lbl_bind.color = '#38ad32';
				this.lbl_bind.text = '已绑定';
			} else {
				this.lbl_bind.color = '#a53232';
				this.lbl_bind.text = '未绑定';
			}
			// 基本属性
			let effid0;
			switch (jobLimit) {
				case EnumData.JOB_TYPE.JOB_NONE:
				case EnumData.JOB_TYPE.JOB_WARRIOR:
					effid0 = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB1_EFFICTID('' + obj.dwBaseID);
					break;
				case EnumData.JOB_TYPE.JOB_MAGE:
					effid0 = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB2_EFFICTID('' + obj.dwBaseID);
					break;
				case EnumData.JOB_TYPE.JOB_MONK:
					effid0 = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB3_EFFICTID('' + obj.dwBaseID);
					break;
			}
			if (effid0) {
				//基本属性
				let effResult0 = GameUtil.parseEffectidToObj(['' + effid0]);
				this.vbox_shuxing.removeChildren();
				for (let eff in effResult0.des) {
					this.vbox_shuxing.addChild(new view.compart.SinglePropsItem().setData(effResult0.des[eff]));
				}
			}
			// 极品属性
			if (obj.stNpPropertyString.length > 0) {
				let jipin = obj.stNpPropertyString;
				for (let i in jipin) {
					let ui_jipin = new view.compart.SinglePropsItem()
					this.vbox_shuxing.addChild(ui_jipin.setData(jipin[i]));
					ui_jipin.lbl_label.color = '#63491a';
					ui_jipin.lbl_dataDes.color = '#149a0d';
				}
			}
			this.img_bg2.height = this.vbox_shuxing._childs.length * (this.vbox_shuxing.height + 8);
			// 套装属性
			let effid1 = SheetConfig.mydb_item_base_tbl.getInstance(null).SUIT_EFFICTID('' + obj.dwBaseID);
			if (effid1) {
				this.box_suit.y = this.img_bg2.height + this.img_bg2.y + 20;
				this.box_suit.visible = true;
				this.lbl_suitname.text=SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + obj.dwBaseID).split('·')[0];
				let shuliang=0;
				for(let suitpos=EnumData.emEquipPosition.EQUIP_RUNE_UP;suitpos<=EnumData.emEquipPosition.EQUIP_RUNE_UPLEFT;suitpos++){
					let data=GameUtil.findEquipInPlayer(suitpos);
					if(data){shuliang+=1;}
				}
				this.lbl_suitNum.text=shuliang+'/8';
				let effResult1 = GameUtil.parseEffectidToObj(['' + effid1]);
				for (let i in effResult1.des) {
					this.vbox_suit.addChild(new view.compart.SinglePropsItem().setData(effResult1.des[i]));
				}
				this.box_down.y = this.vbox_suit._childs.length * this.box_suit.height + this.box_suit.y + 50;
			} else {
				this.box_suit.visible = false;
				this.box_down.y = this.img_bg2.height + this.img_bg2.y + 20;
			}
			this.img_bg1.height = this.box_down.y + this.box_down.height + 30;
			this.btn_playerUse.label = '穿戴';
			switch (this.model) {
				// 背包-装备
				case EnumData.ItemInfoModel.SHOW_IN_BAG_EQUIP:
					this.btn_playerUse.label = '穿戴';
					break;
				// 背包-回收
				case EnumData.ItemInfoModel.SHOW_IN_BAG_HUISHOU:

					break;
				// 背包-仓库
				case EnumData.ItemInfoModel.SHOW_IN_BAG_CANGKU:
					this.btn_putToCangKu.label = '存入仓库';
					break;
				// 背包-摆摊
				case EnumData.ItemInfoModel.SHOW_IN_BAG_BAITAN:
					// this.btn_playerUse.disabled = this.btn_putToHuiShou.disabled = this.btn_putToCangKu.disabled = this.btn_chongsu.disabled = true;
					this.btn_goSell.label = '上架';
					// 参考价格
					// this.input_price.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).JYH_PRICE('' + obj.dwBaseID);
					// 输入完成事件
					// this.input_price.on(Laya.UIEvent.BLUR, this, () => {
					// 	let price = parseInt(this.input_price.text);
					// let minPrice = SheetConfig.mydb_item_base_tbl.getInstance(null).JYH_MINPRICE('' + obj.dwBaseID);
					// this.input_price.text = '' + Math.max(Math.min(99999999, price), minPrice);
					// })
					break;
				// 仓库内
				case EnumData.ItemInfoModel.SHOW_IN_CANGKU:
					this.btn_putToCangKu.label = '取出仓库';
					this.btn_playerUse.disabled = this.btn_chongsu.disabled = this.btn_putToHuiShou.disabled = this.btn_goSell.disabled = true;
					break;
				// 角色身上
				case EnumData.ItemInfoModel.SHOW_IN_PLAYER:
					this.btn_playerUse.label = '卸下';
					this.btn_putToHuiShou.disabled = this.btn_putToCangKu.disabled = this.btn_chongsu.disabled
						= this.btn_goSell.disabled = true;
					break;
				// 回收炉内
				case EnumData.ItemInfoModel.SHOW_IN_HUI_SHOU_LU:
					this.btn_putToHuiShou.label = '取出'
					this.btn_putToCangKu.disabled = this.btn_chongsu.disabled = this.btn_playerUse.disabled
						= this.btn_goSell.disabled = true;
					break;
				// 邮件内,无操作按钮，所以需要缩短界面高度
				case EnumData.ItemInfoModel.SHOW_IN_MAIL:
					this.box_operation.visible = false;
					this.img_bg1.height = this.box_down.y + 100;
					break;
				// 公会背包内
				case EnumData.ItemInfoModel.SHOW_IN_GUILD_BAG:
					break;
				// 公会仓库内
				case EnumData.ItemInfoModel.SHOW_IN_GUILD_CANGKU:
					// this.viw_model.selectedIndex = 7;
					// this.lbl_duiHuanPrice.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).CONTRIBUTIONVALUE('' + obj.dwBaseID);
					break;

			}
			this.ui_item.setData(obj);
			// 添加监听
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			// 关闭
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			});
			//套装信息
			this.btn_info.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.ItemSuitInfoDialog().setData(this.itemObj).popup();
			});
			switch (this.model) {
				case EnumData.ItemInfoModel.SHOW_IN_BAG_EQUIP:
				case EnumData.ItemInfoModel.SHOW_IN_BAG_HUISHOU:
				case EnumData.ItemInfoModel.SHOW_IN_BAG_CANGKU:
				case EnumData.ItemInfoModel.SHOW_IN_BAG_BAITAN:
					// 角色穿戴
					this.btn_playerUse.on(Laya.UIEvent.CLICK, this, this.dressEquip);
					//回收
					this.btn_putToHuiShou.on(Laya.UIEvent.CLICK, this, this.putToHuiShou);
					// 上架物品
					this.btn_goSell.on(Laya.UIEvent.CLICK, this, () => {
						this.close();
						new view.dialog.Daoju_ShangJiaDialog().setData(this.itemObj).popup();
					});
					// 放入仓库
					this.btn_putToCangKu.on(Laya.UIEvent.CLICK, this, this.putToCangKu);
					break;
				// 仓库内
				case EnumData.ItemInfoModel.SHOW_IN_CANGKU:
					// 取出道具
					this.btn_putToCangKu.on(Laya.UIEvent.CLICK, this, this.putBackCangKu);
					break;
				// 角色身上
				case EnumData.ItemInfoModel.SHOW_IN_PLAYER:
					// 装备卸下
					this.btn_playerUse.on(Laya.UIEvent.CLICK, this, this.takeOffEquip);
					break;
				// 邮件内,无操作按钮，所以需要缩短界面高度
				case EnumData.ItemInfoModel.SHOW_IN_MAIL:
					break;
				// 回收炉内
				case EnumData.ItemInfoModel.SHOW_IN_HUI_SHOU_LU:
					// 取出道具
					this.btn_putToHuiShou.on(Laya.UIEvent.CLICK, this, this.putBackHuiShou);
					break;
				// 公会背包内
				case EnumData.ItemInfoModel.SHOW_IN_GUILD_BAG:
					// this.btn_juanXian.on(Laya.UIEvent.CLICK, this, this.guildJuanXian);
					break;
				// 公会仓库内
				case EnumData.ItemInfoModel.SHOW_IN_GUILD_CANGKU:
					// this.btn_duiHuan.on(Laya.UIEvent.CLICK, this, this.guildDuiHuan);
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
			// this.itemObj.ui_item.disabled = true;
			PanelManage.BeiBao.ui_huiShou.putInOneItem(this.itemObj.i64ItemID)
			PanelManage.BeiBao.ui_huiShou.onRecycle();
			this.close();
		}

		/**
		 * 取出熔炉
		 */
		public putBackHuiShou(): void {
			// this.itemObj.ui_item.disabled = false;
			PanelManage.BeiBao.ui_huiShou.takeOutOneItem(this.itemObj.i64ItemID)
			this.close();

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
		// public goToSell(): void {
		// 	this.close();
		// 	if (this.ui_item.ui_item.isNotCanSell) {
		// 		TipsManage.showTips('绑定物品不能交易');
		// 		return
		// 	}
		// 	if (PanelManage.BeiBao && PanelManage.BeiBao.checkTanWeiIsFull()) {
		// 		let pkt = new ProtoCmd.stAuctionSellItem();
		// 		pkt.setValue('i64Id', this.itemObj.i64ItemID);
		// 		pkt.setValue('dwCount', 1);
		// 		pkt.setValue('dwPrice', parseInt(this.input_price.text));
		// 		pkt.setValue('btDays', 1);
		// 		pkt.setValue('boShowName', false);
		// 		lcp.send(pkt, this, (data) => {
		// 			let cbpkt = new ProtoCmd.stStallRet(data);
		// 			if (cbpkt.result === 0) {
		// 				TipsManage.showTips('上架成功');
		// 				PanelManage.BeiBao && PanelManage.BeiBao.updateTanWei();
		// 			}
		// 			else {
		// 				TipsManage.showTips('上架失败');
		// 			};
		// 			cbpkt.clear();
		// 			cbpkt = null;
		// 		});

		// 	}
		// 	else {
		// 		TipsManage.showTips('摊位已满无法上架');
		// 	}
		// }

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