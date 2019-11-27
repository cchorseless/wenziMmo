/**Created by the LayaAirIDE*/
module view.menu {
	export class Menu_TurnActivity3 extends ui.menu.Menu_TurnActivity3UI {
		public nameList = [
			{ id: 24, name: "官印豪礼" },
			{ id: 25, name: "龙魂豪礼" },
			{ id: 26, name: "勋章豪礼" },
			{ id: 27, name: "光翼豪礼" },
			{ id: 28, name: "转生豪礼" }
		]
		public actID;
		constructor() {
			super();
		}
		public addEvent() {
			let protoCmdString = ProtoCmd["Active" + this.actID];
			this.btn_close.on(Laya.UIEvent.CLICK, this, function () {
				GameApp.LListener.offCaller(protoCmdString,this)
				this.close();
			})

			GameApp.LListener.on(protoCmdString, this, (data) => {
				this.setData(data)
			})
		}
		public getData(id) {
			this.actID = id;
			this.addEvent();
			let protoCmdString = ProtoCmd["Active" + this.actID];
			let pkt12 = new ProtoCmd.QuestClientData().setString(protoCmdString, null)
			lcp.send(pkt12);
		}
		public setData(data) {
			this.panel_show.removeChildren()
			let o = new activity.Active_DragonSoul()
			o.setData(data)
			this.panel_show.addChild(o);
			for (let i in this.nameList) {
				if (this.nameList[i].id == this.actID) {
					this.lab_title.text = this.nameList[i].name;
				}
			}

		}
	}
}