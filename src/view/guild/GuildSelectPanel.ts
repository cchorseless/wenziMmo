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
			// 是否只显示满足条件帮会
			this.check_01.clickHandler = Laya.Handler.create(this, () => {
				for (let _child of this.vbox_guild._childs) {
					let player = GameApp.MainPlayer;
					if (this.check_01.selected) {
						let canJoin = player.level >= (_child as view.compart.GuildApplyItem).item.dwJoinNeedLvl && player.zslevel >= (_child as view.compart.GuildApplyItem).item.zsLevel;
						_child.scaleY = canJoin ? 1 : 0;
					}
					else {
						_child.scaleY = 1;
					}
				}
			}, null, false);
			this.updateBpListUI();
			this.updateCreateUI();
			this.addEvent();
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

			// 返回
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => { PanelManage.openMainPanel() });
			// 队伍
			this.btn_team.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTeamPanel();
			})
			// 好友
			this.btn_friend.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFriendPanel();
			})
			// NPC好感度
			// todo
			// 小说模式
			this.btn_changeMode.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel();
			});

		}


		/**
		 * 更新创建公会UI
		 */
		public updateCreateUI(): void {
			// 检查背包内 沃玛号角
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.BP_getHaoJaoInfo, null, this, (msgid, data: ProtoCmd.itf_Guild_HaoJiaoInfo) => {
				console.log(msgid, data);
				let needItemID = data.index;
				let needCount = GameUtil.findItemInBag(needItemID, GameApp.GameEngine.bagItemDB);
				if (needCount < data.num) {
					this.img_createItem.disabled = true;
					this.btn_createItemBuy.disabled = false;
				}
				else {
					this.img_createItem.disabled = false;
					this.btn_createItemBuy.disabled = true;
					// this.btn_createItemBuy.label = '已拥有';
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
					let ui = new view.compart.GuildApplyItem()
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
				let errorcode: EnumData.emGuildDonateErrorCode = cbpkt1.getValue('errorcode');

				switch (errorcode) {
					// 创建成功
					case 0:
						PanelManage.openGuildTeamPanel(dwGuildId);
						break;
					// 创建失败
					default:
						TipsManage.showTips('帮派名称重复');
						this.btn_createItemBuy.disabled = false;
						break;
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
					let ui = new view.compart.GuildApplyItem();
					ui.setData(guildInfo);
					this.vbox_searchResult.addChild(ui);
				}
			})
		}
	}
}
