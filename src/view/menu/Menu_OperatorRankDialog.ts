/**Created by the LayaAirIDE*/
module view.menu {
	export class Menu_OperatorRankDialog extends ui.menu.Menu_OperatorRankDialogUI {

		constructor() {
			super();
			this.addEvent();
			this.setData();
		}
		public setData() {
			this.tab_name.labels = "消费排行,充值排行,官印豪礼"
			for (let i = 0; i < 3; i++) {
				let box = new Laya.Box();
				box.top = box.bottom = box.right = box.left = 0;
				this.viewS_Main.addItem(box);
			}
			this.setView(0)
		}

		public addEvent() {
			this.tab_name.selectHandler = Laya.Handler.create(this, (index) => {
				this.tab_name.selectedIndex = index;
				this.setView(index);
			}, null, false);
			this.btn_close.on(Laya.UIEvent.CLICK, this, function () {
				GameApp.LListener.offCaller(ProtoCmd.Active4, this)
				GameApp.LListener.offCaller(ProtoCmd.Active7, this)
				GameApp.LListener.offCaller(ProtoCmd.Active24, this)
				this.close();
			})
		}
		public setView(ID) {
			let box = this.viewS_Main.getChildAt(ID);
			let pcmdString;
			if (box.numChildren == 0) {
				if (ID == 0) {
					pcmdString = ProtoCmd["Active" + 4];
					GameApp.LListener.on(pcmdString, this, function (data) {
						box.removeChildren()
						let o = new activity.Active_RankPanel_Item()
						o.setData(data, 4)
						box.addChild(o);
					})
					let pkt4 = new ProtoCmd.QuestClientData().setString(pcmdString, null)
					lcp.send(pkt4);
				} else if (ID == 1) {
					pcmdString = ProtoCmd["Active" + 7];
					GameApp.LListener.on(pcmdString, this, function (data) {
						box.removeChildren()
						let o = new activity.Active_RankPanel_Item()
						o.setData(data, 7)
						box.addChild(o);
					})
					let pkt7 = new ProtoCmd.QuestClientData().setString(pcmdString, null)
					lcp.send(pkt7);
				} else if (ID == 2) {
					pcmdString = ProtoCmd["Active" + 24];
					GameApp.LListener.on(pcmdString, this, (data) => {
						box.removeChildren()
						let o = new activity.Active_DragonSoul()
						o.setData(data)
						box.addChild(o);
					})
					let pkt24 = new ProtoCmd.QuestClientData().setString(pcmdString, null)
					lcp.send(pkt24);
				}
			}
			this.viewS_Main.selectedIndex = ID;
		}
	}
}