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
			//洛阳
			EventManage.onWithEffect(this.img_luoyang, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.MAP_MOVE, [14001, 0]);
				lcp.send(pkt);
			})
			//良人鎮
			EventManage.onWithEffect(this.img_liangren, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.MAP_MOVE, [15001, 0]);
				lcp.send(pkt);
			})
			//塔楼
			EventManage.onWithEffect(this.img_talou, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.MAP_MOVE, [16001, 0]);
				lcp.send(pkt);
			})
			//玉笔峰
			EventManage.onWithEffect(this.img_yubi, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.MAP_MOVE, [17001, 0]);
				lcp.send(pkt);
			})
			//嵩山
			EventManage.onWithEffect(this.img_songshan, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.MAP_MOVE, [20001, 0]);
				lcp.send(pkt);
			})
			//全真
			EventManage.onWithEffect(this.img_quanzhen, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.MAP_MOVE, [21001, 0]);
				lcp.send(pkt);
			})
			//衡山
			EventManage.onWithEffect(this.img_hengshan, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.MAP_MOVE, [23001, 0]);
				lcp.send(pkt);
			})
			//泰山
			EventManage.onWithEffect(this.img_taishan, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.MAP_MOVE, [24001, 0]);
				lcp.send(pkt);
			})
			//恒山
			// EventManage.onWithEffect(this.xxx, Laya.UIEvent.CLICK, this, () => {
			// 	let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.MAP_MOVE, [25001, 0]);
			// 	lcp.send(pkt);
			// })
		}
	}
}