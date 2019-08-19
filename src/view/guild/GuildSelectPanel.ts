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

			this.updateBpListUI();
			this.updateCreateUI();
			this.addEvent();
			// this.showTFGP(this.img_teamEnter.selected);
		}
		public addEvent(): void {
			// 创建行会
			this.btn_create.on(Laya.UIEvent.CLICK, this, this.createBangPai);
			// 购买沃玛号角
			this.btn_createItemBuy.on(Laya.UIEvent.CLICK, this, this.buyCreateItem);
			// 查看行会列表翻页
			this.btn_addPage.on(Laya.UIEvent.CLICK, this, this.changePage, [true]);
			this.btn_reducePage.on(Laya.UIEvent.CLICK, this, this.changePage, [false]);
			// 搜索帮会
			this.btn_search.on(Laya.UIEvent.CLICK, this, this.searchGuild);
			// 队伍
			this.box_guildT.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTeamPanel();
			})
			// 好友
			this.box_guildF.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFriendPanel();
			})
			this.img_teamEnter.clickHandler = Laya.Handler.create(this, () => {
				if (this.img_teamEnter.selected){
					Laya.Tween.to(this.img_guildTFGP, {scaleY: 0 }, 500, Laya.Ease.bounceOut);
					
				}
				else {
					Laya.Tween.to(this.img_guildTFGP, {scaleY: 1}, 500, Laya .Ease.bounceOut);
				}
			}, null, false);
		}

	// public showTFGP(isShow: boolean): void {
	// 		if (isShow){
	// 			this.img_guildTFGP.visible = false;
	// 			Laya.Tween.to(this.img_guildTFGP, {scaleY: 0 }, 500);
	// 		}
	// 		else {
	// 			Laya.Tween.to(this.img_guildTFGP, {scaleY: 1 }, 500, null, Laya.Handler.create(this, () => { this.img_guildTFGP.visible = true }))
	// 		}
	// 	}

		/**
		 * 更新创建公会UI
		 */
		public updateCreateUI(): void {
			// 检查背包内 沃玛号角
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.BP_getHaoJaoInfo, null, this, (msgid, data: { binding: number, index: number, num: number, yuanbao: number }) => {
				let needItemID = data.index;
				let needCount = GameUtil.findItemInBag(needItemID, GameApp.GameEngine.bagItemDB);
				if (needCount < data.num) {
					this.img_createItem.disabled = true;
					this.btn_createItemBuy.disabled = false;
				}
				else {
					this.img_createItem.disabled = false;
					this.btn_createItemBuy.disabled = true;
					this.btn_createItemBuy.label = '已拥有';
				}
			})
			lcp.send(pkt);
		}

		/**
		 * 更新公会列表UI
		 */
		public updateBpListUI(curpage = 1): void {
			let pkt = new ProtoCmd.stGlobalGuildGetList();
			pkt.setValue('btType', 0);
			pkt.setValue('dwPageNum', curpage);
			lcp.send(pkt, this, (data) => {
				console.log('更新公会列表UI')
				this.vbox_guild.removeChildren();
				let cbpkt = new ProtoCmd.stGlobalGuildGetListRet(data);
				this.lbl_allPage.text = '' + cbpkt.getValue('dwMaxPage');
				this.lbl_curPage.text = '' + curpage;
				for (let guildinfo of cbpkt.stZeroArray) {
					let ui = new view.compart.GuildItem()
					let item = new ProtoCmd.stSingleGuildinfoBase();
					item.clone(guildinfo.data);
					ui.setData(item);
					this.vbox_guild.addChild(ui);
				}
				cbpkt.clear();
				cbpkt = null;
			})

		}

		/**
		 * 翻页
		 * @param isAdd 
		 */
		public changePage(isAdd): void {
			if (this.lbl_allPage.text === this.lbl_curPage.text) { return };
			let curpage = 1;
			// 页数增加
			if (isAdd) {
				curpage = parseInt(this.lbl_curPage.text) + 1;
			}
			// 页数减少
			else {
				if (this.lbl_curPage.text == '1') { return }
				curpage = parseInt(this.lbl_curPage.text) - 1;
			}
			this.updateBpListUI(curpage)
		}

		/**
		 * 购买号角
		 */
		public buyCreateItem(): void {
			if (GameApp.MainPlayer.wealth.yuanBao < 1000) {
				TipsManage.showTips('元宝不足');
				return
			}
			new view.dialog.SureOrCanelDialog().setData('确花费1000元宝购买沃玛号角吗？', EnumData.SureCanelModel.BP_BUY_CREATEITEM).popup(true);
		}

		/**
		 * 创建帮会
		 */
		public createBangPai(): void {
			// 防止重复点击
			this.btn_createItemBuy.disabled = true;
			let bangPaiName = this.input_bangPaiName.text;
			let bangPaiKouHao = this.input_bangPaiSlogan.text;

			if (!bangPaiKouHao) {
				TipsManage.showTips('请输入帮派名称');
				this.btn_createItemBuy.disabled = false;
				return
			}
			if (!bangPaiKouHao) {
				TipsManage.showTips('请输入帮派口号');
				this.btn_createItemBuy.disabled = false;
				return
			}
			// 创建行会
			let pkt = new ProtoCmd.stCreatGlobalGuild();
			pkt.setValue('btOPType', 0);
			pkt.setValue('szGuildName', this.input_bangPaiName.text);
			pkt.setValue('szGuildNotice', this.input_bangPaiSlogan.text);
			lcp.send(pkt, this, (data) => {
				let cbpkt1 = new ProtoCmd.stCreatGlobalGuildRet(data);
				let dwGuildId = cbpkt1.getValue('dwGuildId');// 行会ID
				let errorcode = cbpkt1.getValue('errorcode');
				// 创建成功
				if (errorcode == 0) {
					PanelManage.openGuildTeamPanel(dwGuildId);
				}
				// 创建失败
				else {
					TipsManage.showTips('帮派名称重复');
					this.btn_createItemBuy.disabled = false;
				}
				cbpkt1.clear();
				cbpkt1 = null;
			})
		}

		/**
		 * 搜索帮会
		 */
		public searchGuild(): void {
			if (!this.input_search.text) {
				TipsManage.showTips('请输入搜索的帮会名称')
				return
			}
			this.vbox_searchResult.removeChildren();
			let pkt = new ProtoCmd.stGlobalClientSearchGuild()
			pkt.setValue('szName', this.input_search.text)
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stGlobalClientSearchGuildRet(data);
				// 没有搜索到
				if (cbpkt.guildinfo.dwID == 0) {
					TipsManage.showTips('没有搜索到行会信息');
					return
				}
				else {
					let guildInfo = new ProtoCmd.stSingleGuildinfoBase();
					guildInfo.clone(cbpkt.guildinfo.data);
					let ui = new view.compart.GuildItem();
					ui.setData(guildInfo);
					this.vbox_searchResult.addChild(ui);
				}
			})
		}
	}
}
