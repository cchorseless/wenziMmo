/**Created by the LayaAirIDE*/
module view.scene {
	export class BattleFuBenInfoV2Item extends ui.scene.BattleFuBenInfoV2ItemUI {
		constructor() {
			super();
			this.addEvent();
			this.panel_prize.vScrollBarSkin = '';
		}


		public setData(jsonData) {
			this.hbox_prize.removeChildren();
			for (let i in jsonData.JiangLi) {
				// jsonData.item[i];
				let itemBase = new ProtoCmd.ItemBase();
				itemBase.dwBaseID = jsonData.JiangLi[i].index;
				itemBase.dwCount = jsonData.JiangLi[i].num;
				let new_ui = new view.compart.DaoJuWithNameItem();
				new_ui.setData(itemBase);
				this.hbox_prize.addChild(new_ui);
			}
			this.showNeed(jsonData);
		}

		public addEvent(): void {
			this.btn_exit.on(Laya.UIEvent.CLICK, this, () => {
				this.leaveFuBen()
			});
		}
		public leaveFuBen() {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FB_CaiLiaoFuBenLikai);
			lcp.send(pkt);
		}
		public showNeed(data) {
			this.html_tongGuanTiaoJian.style.fontFamily = 'SimHei';
			this.html_tongGuanTiaoJian.style.fontSize = 22;
			this.html_tongGuanTiaoJian.style.stroke = 1;
			this.html_tongGuanTiaoJian.style.strokeColor = '#000000';
			this.html_tongGuanTiaoJian.innerHTML = "<span style='color:#ffed8f'>击杀怪物</span>"
				+ "<span style='color:#ffffff'>(" + data.KILLCNT + "/" + data.MAXCNT + ")</span>";
		}

		public destroy() {
			GameApp.LListener.offCaller(ProtoCmd.map_CaiLiaoFubenPlane2, this);
			super.destroy(true)
		}
	}
}