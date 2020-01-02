/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildSelectPanel extends ui.guild.GuildSelectPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_Apprentice.hScrollBarSkin = '';
			this.hbox_Apprentice['sortItem'] = (items) => { };
			this.img_notFind.visible = false;
			this.btn_guild.selected = true;
			// 是否只显示满足条件帮会
			this.addEvent();
			this.init_addGuildList();
		}
		public addEvent(): void {
			//搜索帮会
			this.btn_search.on(Laya.UIEvent.CLICK, this, this.searchGuild);
			//创建帮会
			this.btn_creat.on(Laya.UIEvent.CLICK, this, () => {
				new view.guild.GuildSelectCreatDialog().popup()
			})
			//创建帮会
			this.btn_list.on(Laya.UIEvent.CLICK, this, () => {
				new view.guild.GuildSelectListDialog().popup()
			})
			// 返回
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
				 PanelManage.openMainPanel() });
			// 队伍
			this.btn_team.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTeamPanel();
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
		public init_addGuildList(): void {
			let pkt = new ProtoCmd.stGlobalGuildGetList();
			//0新人查看 1外交界面列表 2系统行会
			pkt.setValue('btType', 2);
			// 页数 从1开始
			pkt.setValue('dwPageNum', 1);
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stGlobalGuildGetListRet(data);
				console.log('====>行会', cbpkt);
				let keys = Object.keys(cbpkt.stZeroArray);
				this.hbox_Apprentice.removeChildren();
				this.list_biguan.array = [];
				this.list_biguan.hScrollBarSkin = '';
				for (let key of keys) {
					this.hbox_Apprentice.addChild(new view.guild.GuildSelectItem().setData(cbpkt.stZeroArray[key], 0));
					this.list_biguan.array.push(cbpkt.stZeroArray[key]);
				}
				this.list_biguan.itemRender = view.guild.GuildSelectItem;
				this.list_biguan.renderHandler = Laya.Handler.create(this, (cell: view.guild.GuildSelectItem, index) => {
					cell.setData(cell.dataSource, 1)
				}, null, false)
			})
		}
		/**
		 * 搜索帮会
		 */
		public searchGuild(): void {
			this.img_notFind.visible = false;
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
					this.img_notFind.visible = true;
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
