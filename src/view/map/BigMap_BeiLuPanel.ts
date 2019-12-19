/**Created by the LayaAirIDE*/
module view.map {
	export class BigMap_BeiLuPanel extends ui.map.BigMap_BeiLuPanelUI {
		constructor() {
			super();
		}

		public setData(): void {
			this.panel_0.hScrollBarSkin = '';
			this.panel_0.vScrollBarSkin = '';
			Laya.timer.frameOnce(2, this, () => { this.panel_0.scrollTo(100); })
			this.initUI();
			this.addEvent()
		}
		public initUI(): void {
			let getScaleY = PanelManage.getScaleY();
			this.img_bg.scaleY = getScaleY;
		}
		public addEvent(): void {
			EventManage.onWithEffect(this.btn_close, Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			})
			EventManage.onWithEffect(this.btn_world, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWorldMapPanel();
			})
			//衡山
			EventManage.onWithEffect(this.img_hengshan, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.MAP_MOVE, [23001, 0]);
				lcp.send(pkt);
			})
			//福州
			EventManage.onWithEffect(this.img_fuzhou, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.MAP_MOVE, [10001, 0]);
				lcp.send(pkt);
			})
			//华山
			EventManage.onWithEffect(this.img_huashan, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.MAP_MOVE, [11001, 0]);
				lcp.send(pkt);
			})
			//玉壶
			EventManage.onWithEffect(this.img_yuhu, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.MAP_MOVE, [12001, 0]);
				lcp.send(pkt);
			})
			//药王庄
			EventManage.onWithEffect(this.img_yaowang, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.MAP_MOVE, [13001, 0]);
				lcp.send(pkt);
			})
		}
	}
}