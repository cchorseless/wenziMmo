/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildWaiJiaoPanel extends ui.guild.GuildWaiJiaoPanelUI {
		constructor() {
			super();
		}

		public setData(): void {
			this.panel_didui.vScrollBarSkin = '';
			this.panel_find.vScrollBarSkin = '';
			this.panel_jieMeng.vScrollBarSkin = '';
			this.panel_liuYan.vScrollBarSkin = '';
			this.panel_rank.vScrollBarSkin = '';
			this.vbox_didui['sortItem'] = (items) => { };
			this.vbox_find['sortItem'] = (items) => { };
			this.vbox_jieMeng['sortItem'] = (items) => { };
			this.vbox_liuYan['sortItem'] = (items) => { };
			this.vbox_rank['sortItem'] = (items) => { };
			// 底部切页
			this.tab_0.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_0.selectedIndex = index;
			}, null, false);
			// 帮派列表切页
			// this.tab_list.selectHandler = Laya.Handler.create(this, (index) => {
			// 	this.viw_list.selectedIndex = index;
			// }, null, false);
			// 帮派关系
			this.tab_guanXi.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_guanxi.selectedIndex = index;
			}, null, false);
			this.initUI();
			this.addEvent();
		}


		public addEvent(): void {
			// 关闭
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => { PopUpManager.checkPanel(this) });
			// 搜索帮会
			this.btn_search.on(Laya.UIEvent.CLICK, this, this.searchGuild);
			// 查看行会列表翻页
			this.btn_addPage.on(Laya.UIEvent.CLICK, this, this.changePage, [true]);
			this.btn_reducePage.on(Laya.UIEvent.CLICK, this, this.changePage, [false]);
		}


		public initUI(): void {
			
		}


		/**
		 * 更新公会外交列表 // 0关注行会 1行会联盟 2敌对行会 3宣战行会（1 3有用，其他不用）
		 */
		public updateWaiJiaoList(index = 1): void {
			let pkt = new ProtoCmd.stGlobalGuildGetDiplomacyList();
			pkt.setValue('btType', index);
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stGlobalGuildGetDiplomacyListRet(data);
				for (let _item of cbpkt.stZeroArray) {
					let ui_item = new view.guild.GuildInfoItem();
					let data_item = new ProtoCmd.DiplomacyGuildBase();
					data_item.clone(_item.data);
					// ui_item.setData(data_item);
				}
			})
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
				this.vbox_rank.removeChildren();
				let cbpkt = new ProtoCmd.stGlobalGuildGetListRet(data);
				this.lbl_maxPage.text = '' + cbpkt.getValue('dwMaxPage');
				this.lbl_curPage.text = '' + curpage;
				for (let guildinfo of cbpkt.stZeroArray) {
					let ui_item = new view.guild.GuildInfoItem()
					let item = new ProtoCmd.stSingleGuildinfoBase();
					item.clone(guildinfo.data);
					ui_item.setData(item);
					this.vbox_rank.addChild(ui_item);
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
			if (this.lbl_maxPage.text === this.lbl_curPage.text) { return };
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
			this.updateBpListUI(curpage);
		}


		/**
		 * 搜索帮会
		 */
		public searchGuild(): void {
			if (!this.input_find.text) {
				TipsManage.showTips('请输入搜索的帮会名称')
				return
			}
			this.vbox_find.removeChildren();
			let pkt = new ProtoCmd.stGlobalClientSearchGuild();
			pkt.setValue('szName', this.input_find.text);
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
					let ui_item = new view.guild.GuildInfoItem();
					ui_item.setData(guildInfo);
					this.vbox_find.addChild(ui_item);
				}
			});
		}
	}
}