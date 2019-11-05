/**Created by the LayaAirIDE*/
module view.newServer {
	export class NewServer_MainPanel extends ui.newServer.NewServer_MainPanelUI {
		constructor() {
			super();
		}
		public data = null;
		public index = 1;
		public setData(): void {
			this.panel_newServer.hScrollBarSkin = '';
			this.tab_top.selectHandler = Laya.Handler.create(this, (index) => {
				this.index = index + 1;
				this.init_addBox();
			}, null, false);
			this.addEvent();
			this.init_newServer();

		}
		public addEvent(): void {
			this.btn_return.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			})
		}
		public init_newServer(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.NS_XinFuClientOpen, null, null, this, (jsonData) => {
				// jsonData.General:
				// 1: {id: 10, name: "新服竞技", state: 1}
				// 2: {id: 1, name: "特惠礼包", state: 1}
				// 3: {id: 2, name: "全民BOSS", state: 1}
				// 4: {id: 3, name: "龙城争霸", state: 1}
				// 5: {id: 4, name: "等级竞技", state: 0}
				// 6: {id: 5, name: "英雄竞技", state: 0}
				// 7: {id: 6, name: "光翼竞技", state: 0}
				// 8: {id: 7, name: "龙魂竞技", state: 0}
				// 9: {id: 8, name: "官职竞技", state: 0}
				// 10: {id: 9, name: "魂石竞技", state: 0}
				// 11: {id: 11, name: "消费排行", state: 1}
				// 12: {state: 0, id: 12}
				console.log('====>新服活动', jsonData)
				this.data = jsonData.General;
				let keys = Object.keys(jsonData.General)
				let name = [];
				for (let key of keys) {
					//活动名称不为零&&活动状态为1时显示
					if (jsonData.General[key].name !== undefined && jsonData.General[key].state == 1) {
						name.push(jsonData.General[key].name)
					}
				}
				this.tab_top.labels = '' + name;
			})
			lcp.send(pkt);
			this.init_addBox();
		}
		public init_addBox(): void {
			this.box_time.visible = false
			this.box_newServer.removeChildren();
			if (this.data !== null) {
				switch (this.data[this.index].id) {
					case 10:
						this.box_newServer.addChild(new view.newServer.NewServer_sportsItem())
						break;
					case 2:
						this.box_newServer.addChild(new view.newServer.NewServer_allBossItem())
						break;
					case 3:
						this.box_newServer.addChild(new view.newServer.NewServer_DragonItem())
						break;
				}
			}
			else {
				this.box_newServer.addChild(new view.newServer.NewServer_sportsItem())
			}

		}
		public init_time(time:string): void {
				this.box_time.visible = true;
				this.lbl_time.text = time;
		}
	}
}