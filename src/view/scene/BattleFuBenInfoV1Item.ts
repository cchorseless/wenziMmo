/**Created by the LayaAirIDE*/
module view.scene {
	export class BattleFuBenInfoV1Item extends ui.scene.BattleFuBenInfoV1ItemUI {
		public type = 0
		constructor() {
			super();
			this.addEvent();
			this.panel_prize.vScrollBarSkin = '';
		}


		public setData(jsonData, type) {
			this.hbox_prize.removeChildren();
			for (let i in jsonData.item) {
				let itemBase = new ProtoCmd.ItemBase();
				itemBase.dwBaseID = jsonData.item[i].index;
				itemBase.dwCount = jsonData.item[i].num;
				itemBase.dwBinding = jsonData.item[i].bind;
				let new_ui = new view.compart.DaoJuWithNameItem();
				new_ui.setData(itemBase);
				this.hbox_prize.addChild(new_ui);
			}
			this.type = type;
			this.showNeed(jsonData);
		}

		public addEvent(): void {
			this.btn_exit.on(Laya.UIEvent.CLICK, this, () => {
				this.leaveFuBen();
			});
			this.addLcpEvent();
		}
		public addLcpEvent() {

		}
		public leaveFuBen() {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FB_GeRenBoss_Leave);
			lcp.send(pkt);
		}
		public showNeed(data) {
			this.html_tongGuanTiaoJian.style.fontFamily = 'SimHei';
			this.html_tongGuanTiaoJian.style.fontSize = 22;
			this.html_tongGuanTiaoJian.style.stroke = 1;
			this.html_tongGuanTiaoJian.style.strokeColor = '#000000';
			this.html_tongGuanTiaoJian.innerHTML = "<span style='color:#ffed8f'>击杀怪物</span>"
				+ "<span style='color:#ffffff'>(" + this.type + "/1)</span>";
		}


	}
}