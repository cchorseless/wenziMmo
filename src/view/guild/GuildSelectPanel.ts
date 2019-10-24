/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildSelectPanel extends ui.guild.GuildSelectPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_guild.vScrollBarSkin = '';
			this.vbox_guild['sortItem'] = (items) => { };
			this.img_notFind.visible=false;
			// 是否只显示满足条件帮会
			this.check_01.clickHandler = Laya.Handler.create(this, () => {
				for (let _child of this.vbox_guild._childs) {
					let player = GameApp.MainPlayer;
					if (this.check_01.selected) {
						let canJoin = player.level >= (_child as view.guild.GuildApplyItem).item.dwJoinNeedLvl && player.zslevel >= (_child as view.guild.GuildApplyItem).item.zsLevel;
						_child.scaleY = canJoin ? 1 : 0;
					}
					else {
						_child.scaleY = 1;
					}
				}
			}, null, false);
			// this.updateBpListUI();
			
			this.addEvent();
		}
		public addEvent(): void {
			
			// 查看行会列表翻页
			// this.btn_addPage.on(Laya.UIEvent.CLICK, this, this.changePage, [true]);
			// this.btn_reducePage.on(Laya.UIEvent.CLICK, this, this.changePage, [false]);
			//搜索帮会
			this.btn_search.on(Laya.UIEvent.CLICK, this, this.searchGuild);
			//创建帮会
			this.btn_creat.on(Laya.UIEvent.CLICK,this,()=>{
				new view.guild.GuildSelectCreatDialog().popup()
			})
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
			// 排行榜
			this.btn_paihang.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openRankMainPanel();
			})
			// todo
			// 小说模式
			this.btn_changeMode.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel();
			});

		}


	
		/**
		 * 更新公会列表UI
		 */
		// public updateBpListUI(curpage = 1): void {
		// 	let pkt = new ProtoCmd.stGlobalGuildGetList();
		// 	pkt.setValue('btType', 0);
		// 	pkt.setValue('dwPageNum', curpage);
		// 	lcp.send(pkt, this, (data) => {
		// 		console.log('更新公会列表UI')
		// 		this.vbox_guild.removeChildren();
		// 		let cbpkt = new ProtoCmd.stGlobalGuildGetListRet(data);
		// 		this.lbl_allPage.text = '' + cbpkt.getValue('dwMaxPage');
		// 		this.lbl_curPage.text = '' + curpage;
		// 		for (let guildinfo of cbpkt.stZeroArray) {
		// 			let ui = new view.guild.GuildApplyItem()
		// 			let item = new ProtoCmd.stSingleGuildinfoBase();
		// 			item.clone(guildinfo.data);
		// 			ui.setData(item);
		// 			this.vbox_guild.addChild(ui);
		// 		}
		// 		cbpkt.clear();
		// 		cbpkt = null;
		// 	})

		// }

		/**
		 * 翻页
		 * @param isAdd 
		 */
		// public changePage(isAdd): void {
		// 	if (this.lbl_allPage.text === this.lbl_curPage.text) { return };
		// 	let curpage = 1;
		// 	// 页数增加
		// 	if (isAdd) {
		// 		curpage = parseInt(this.lbl_curPage.text) + 1;
		// 	}
		// 	// 页数减少
		// 	else {
		// 		if (this.lbl_curPage.text == '1') { return }
		// 		curpage = parseInt(this.lbl_curPage.text) - 1;
		// 	}
		// 	this.updateBpListUI(curpage)
		// }

		
	

		/**
		 * 搜索帮会
		 */
		public searchGuild(): void {
			this.img_notFind.visible=false;
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
					this.img_notFind.visible=true;
					return
				}
				else {
					let guildInfo = new ProtoCmd.stSingleGuildinfoBase();
					guildInfo.clone(cbpkt.guildinfo.data);
					let ui = new view.guild.GuildApplyItem();
					ui.setData(guildInfo);
					this.vbox_searchResult.addChild(ui);
				}
			})
		}
	}
}
