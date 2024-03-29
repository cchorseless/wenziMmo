/**Created by the LayaAirIDE*/
module view.dialog {
	export class ServerListDialog extends ui.dialog.ServerListDialogUI {
		constructor() {
			super();

		}
		public account;
		public setData(account, index = 0): ServerListDialog {
			// this.tab_left.labels = '0-100,101-200,201-300,301-400,401-500,501-600';
			this.tab_left.selectedIndex = index;
			this.account = account;
			this.tab_left.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_left.selectedIndex = index;
				this.readServerList();
			}, null, false);
			this.panel_0.vScrollBarSkin = '';
			this.vbox_0['sortItem'] = (items) => { };
			this.panel_1.vScrollBarSkin = '';
			this.vbox_1['sortItem'] = (items) => { };
			this.panel_2.vScrollBarSkin = '';
			this.vbox_2['sortItem'] = (items) => { };
			this.panel_3.vScrollBarSkin = '';
			this.vbox_3['sortItem'] = (items) => { };
			this.panel_4.vScrollBarSkin = '';
			this.vbox_4['sortItem'] = (items) => { };
			this.panel_5.vScrollBarSkin = '';
			this.vbox_5['sortItem'] = (items) => { };
			let totalstr = 'name=zoneCount';
			//拉取服务器数量
			GameApp.HttpManager.get(totalstr, (res) => {
				let resData = JSON.parse(res);
				//服务器数量
				let length = resData[0].count;
				//页签数量
				let labelNum = Math.ceil(length / 100);
				let i;
				if (labelNum > 1) {
					for (i = 1; i < labelNum; i++) {
						let labelmax = i + 1;
						this.tab_left.labels = this.tab_left.labels + ',' + i + '01-' + labelmax + '00';
					}
				}
				this.readServerList();
			})
			this.addEvent();

			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			});
		}
		/**
		 * 拉取所有服务器
		 */
		public readServerList(): void {
			let str;
			let vbox;
			let str0 = 'name=zoneList&minId=0&maxId=100';
			let str1 = 'name=zoneList&tradeId=1&minId=101&maxId=200';
			let str2 = 'name=zoneList&tradeId=1&minId=201&maxId=300';
			let str3 = 'name=zoneList&tradeId=1&minId=301&maxId=400';
			let str4 = 'name=zoneList&tradeId=1&minId=401&maxId=500';
			let str5 = 'name=zoneList&tradeId=1&minId=501&maxId=600';
			switch (this.tab_left.selectedIndex) {
				case 0:
					str = str0;
					vbox = this.vbox_0;
					break;
				case 1:
					str = str1;
					vbox = this.vbox_1;
					break;
				case 2:
					str = str2;
					vbox = this.vbox_2;
					break;
				case 3:
					str = str3;
					vbox = this.vbox_3;
					break;
				case 4:
					str = str4;
					vbox = this.vbox_4;
					break;
				case 5:
					str = str5;
					vbox = this.vbox_5;
					break;
			}
			GameApp.HttpManager.get(str, (res) => {
				let resData = JSON.parse(res);
				vbox.removeChildren();
				let ui_server = null;
				for (let id of resData) {
					if (ui_server == null) {
						ui_server = new view.compart.ServerListItem()
						vbox.addChild(ui_server);
						ui_server.setData(id);
					} else {
						ui_server.setData(id, false);
						ui_server = null;
					}
				}
				this.init_recentlyServer();
			});
		}
		/**
		 * 拉取近期登陆服务器
		 */
		public init_recentlyServer(): void {
			let h = 'name=historyZoneList&tradeId=1&account=' + this.account;
			GameApp.HttpManager.get(h, (res) => {
				let resData = JSON.parse(res);
				//根据resData.list对历史纪录服务器排序
				let recentArray = [];
				let recently = Object.keys(resData.order);
				for (let recent of recently) {
					let trueZoneId = resData.order[recent].trueZoneId
					for (let list of resData.list) {
						let ListTrueZoneId = list.trueZoneId;
						if (trueZoneId == ListTrueZoneId) {
							recentArray.push(list);
						}
					}
				}
				this.vbox_recently.removeChildren();
				let ui_server = null;
				for (let id of recentArray) {
					if (ui_server == null) {
						ui_server = new view.compart.ServerListItem()
						this.vbox_recently.addChild(ui_server);
						ui_server.setData(id);
					} else {
						ui_server.setData(id, false);
						ui_server = null;
					}
				}
			})
		}
	}
}