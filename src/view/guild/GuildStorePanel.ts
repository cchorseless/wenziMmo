/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildStorePanel extends ui.guild.GuildStorePanelUI {
		constructor() {
			super();
			this.addEvent()
		}
		public setData(): void {
			this.panel_guildStore.vScrollBarSkin = this.panel_bag.vScrollBarSkin = '';
			this.vbox_guildStore['sortItem'] = this.vbox_bag['sortItem'] = (items) => { };
			this.updateGongXianLbl();
			for (let i = 0; i < 4; i++) {
				this.vbox_bag.addChild(new view.compart.DaoJuGroupItem());
				this.vbox_guildStore.addChild(new view.compart.DaoJuGroupItem());
			}
			for (let key in GameApp.GameEngine.bagItemDB) {
				let equipItem: ProtoCmd.ItemBase = GameApp.GameEngine.bagItemDB[key];
				let juanXianExp = SheetConfig.mydb_item_base_tbl.getInstance(null).CONTRIBUTIONVALUE('' + equipItem.dwBaseID);//捐献帮会贡献
				// 是装备且未绑定且在背包内且帮贡大于0
				if (!equipItem.dwBinding &&
					equipItem.itemType == EnumData.ItemTypeDef.ITEM_TYPE_EQUIP
					&& equipItem.location.btLocation == EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE
					&& juanXianExp > 0) {
					let ui = new view.compart.DaoJuItem();
					ui.setData(equipItem, EnumData.ItemInfoModel.SHOW_IN_GUILD_BAG);
					this.addItem(ui, true);
				}
			}
			this.initUI();
		}


		public initUI(): void {
			// 请求仓库数据
			let pkt = new ProtoCmd.stViewGuildPackage();
			pkt.setValue('dwStoreId', 0);
			lcp.send(pkt);
		}

		public addEvent(): void {
			this.btn_guildStoreReturn.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			});
			this.addLcpEvent();
		}

		public addLcpEvent(): void {
			// 拉取仓库的时候 可能返回多个包
			GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.stViewGuildPackageRet), this, this.updateCangKu);
			// 更新帮贡
			GameApp.LListener.on(LcpEvent.UPDATE_UI_GUILDSCORE, this, this.updateGongXianLbl);
		}

		public Dispose(): void {
			GameApp.LListener.offCaller(ProtoCmd.Packet.eventName(ProtoCmd.stViewGuildPackageRet), this);
			GameApp.LListener.offCaller(LcpEvent.UPDATE_UI_GUILDSCORE, this)
			PopUpManager.Dispose(this);
		}
		public updateCangKu(data): void {
			let cbPkt = new ProtoCmd.stViewGuildPackageRet(data);
			let dwStoretype = cbPkt.getValue('dwStoretype');
			for (let _item of cbPkt.items) {
				let ui = new view.compart.DaoJuItem();
				let item = new ProtoCmd.ItemBase();
				item.clone(_item.data);
				ui.setData(item, EnumData.ItemInfoModel.SHOW_IN_GUILD_CANGKU);
				this.addItem(ui, false);
			}
			switch (dwStoretype) {
				// 发包结束
				case 2:
				case 3:
					// 仓库数量标识
					this.updateCangKuCount();
					break;
			}
			cbPkt.clear();
			cbPkt = null;
		}
		public updateGongXianLbl(): void {
			// 帮派贡献
			this.lbl_bangGong.text = '' + GameApp.MainPlayer.wealth.guildDedication;
		}
		/**
		 * 添加道具
		 * @param item 
		 * @param model 
		 */
		public addItem(item: view.compart.DaoJuItem, model: boolean) {
			let vbox: Laya.VBox;
			// 添加到公会背包中
			if (model) {
				vbox = this.vbox_bag;
			}
			// 添加公会仓库中
			else {
				vbox = this.vbox_guildStore;
			}

			for (let child of vbox._childs) {
				if (!(child as view.compart.DaoJuGroupItem).checkIsFull()) {
					child.addItem(item);
					break;
				}
			}
			// 添加格子
			if (item.parent == null) {
				let groupItem = new view.compart.DaoJuGroupItem();
				groupItem.addItem(item);
				vbox.addChild(groupItem);
			}
		}
		/**
		 * 更新仓库内数量
		 */
		public updateCangKuCount(): void {
			let vbox = this.vbox_guildStore;
			let count = 0;
			for (let child of vbox._childs) {
				count += child.getItemCount();
			}
			this.lbl_count.text = '' + count;
		}

	}
}