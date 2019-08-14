/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildSelectPanel extends ui.guild.GuildSelectPanelUI {
		constructor() {
			super();

		}
		public setData(): void {
			this.panel_guild.vScrollBarSkin = '';
			this.vbox_guild['sortItem'] = (items) => { };
			this.tab_guild.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_guild.selectedIndex = index;
			}, null, false);

			for (let i = 0; i < 10; i++) {
				this.vbox_guild.addChild(new view.compart.GuildItem());
			}
			this.updateAllBpUI();
			this.updateCreateUI();
			this.addEvent();
		}
		public addEvent(): void {
			// 创建行会
			this.btn_create.on(Laya.UIEvent.CLICK, this, this.createBangPai);
			// 购买沃玛号角
			this.btn_createItemBuy.on(Laya.UIEvent.CLICK, this, this.buyCreateItem);
		}

		/**
		 * 更新创建公会UI
		 */
		public updateCreateUI(): void {
			// 检查背包内 沃玛号角
			let needItemID = SheetConfig.canshuSheet.getInstance(null).DATA('BP_CREATEITEMID')[0];
			let needCount = GameUtil.findItemInBag(needItemID, GameApp.GameEngine.bagItemDB);
			if (needCount == 0) {
				this.img_createItem.disabled = true;
				this.btn_createItemBuy.disabled = false;
			}
			else {
				this.img_createItem.disabled = false;
				this.btn_createItemBuy.disabled = true;
				this.btn_createItemBuy.label = '已拥有';
			}

		}
		/**
		 * 更新所有公会UI
		 */
		public updateAllBpUI(): void {
			let pkt = new ProtoCmd.stGlobalGetClassList();
		}
		// todo
		public buyCreateItem(): void {
		}

		/**
		 * 创建帮会
		 */
		public createBangPai(): void {
			let bangPaiName = this.input_bangPaiName.text;
			let bangPaiKouHao = this.input_bangPaiSlogan.text;

			if (!bangPaiKouHao) {
				TipsManage.showTips('请输入帮派名称');
				return
			}
			if (!bangPaiKouHao) {
				TipsManage.showTips('请输入帮派口号');
				return
			}
			// 检查沃玛号角
			let needItemID = SheetConfig.canshuSheet.getInstance(null).DATA('BP_CREATEITEMID')[0];
			let needCount = GameUtil.findItemInBag(needItemID, GameApp.GameEngine.bagItemDB);
			if (needCount == 0) {
				TipsManage.showTips('道具不足，无法创建');
				return
			}
			// 先检测名字
			let pkt = new ProtoCmd.stCreatGlobalGuild();
			pkt.setValue('btOPType', 3);
			pkt.setValue('szGuildName', this.input_bangPaiName.text);
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stCreatGlobalGuildRet(data);
				let errorcode = cbpkt.getValue('errorcode');
				// 名字可用
				if (errorcode == 0) {
					let pkt1 = new ProtoCmd.stCreatGlobalGuild();
					pkt1.setValue('btOPType', 0);
					pkt1.setValue('szGuildName', this.input_bangPaiName.text);
					pkt1.setValue('szGuildNotice', this.input_bangPaiSlogan.text);
					lcp.send(pkt1, this, (data) => {
						let cbpkt1 = new ProtoCmd.stCreatGlobalGuildRet(data);
						let errorcode1 = cbpkt1.getValue('errorcode');
						// 创建成功
						if (errorcode1 == 0) {



						}
						// 创建失败
						else {


						}
						cbpkt1.clear();
						cbpkt1 = null;
					})

				}
				else {
					TipsManage.showTips('该名字不可用');
					this.input_bangPaiName.text = '';
				}
				cbpkt.clear();
				cbpkt = null;
			})
		}



	}
}
