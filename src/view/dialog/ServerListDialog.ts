/**Created by the LayaAirIDE*/
module view.dialog {
	export class ServerListDialog extends ui.dialog.ServerListDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
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
			this.addEvent();
			this.readServerList();
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			});
		}
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
			let h = 'name=historyZoneList&tradeId=1&account=1';

			GameApp.HttpManager.get(str, (res) => {
				let resData = JSON.parse(res);
				vbox.removeChildren();
				let ui_server = null;
				for (let id of resData) {
					let value = id.trueZoneId % 2;
					if (value == 1) {
						ui_server = new view.compart.ServerListItem()
						vbox.addChild(ui_server);
					}
					ui_server.setData(id);
				}
			});

		}
	}
}