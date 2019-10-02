/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_LiLianPanel extends ui.fuBen.FuBen_LiLianPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.tab_top.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_top.selectedIndex = index;
			}, null, false);
			this.panel_0.vScrollBarSkin = '';
			this.vbox_0['sortItem'] = (items) => { };
			this.panel_1.vScrollBarSkin = '';
			this.vbox_1['sortItem'] = (items) => { };
			this.addEvent();
			this.init_bossHome();
		}
		public addEvent(): void {
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, () => {
				PopUpManager.showPanel(PanelManage.JuQingMode);
			});
			EventManage.onWithEffect(this.btn_changeMode, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});
			EventManage.onWithEffect(this.btn_daily, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenDailyPanel();
			});
			EventManage.onWithEffect(this.btn_juQing, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenMainPanel();
			});
			EventManage.onWithEffect(this.btn_liLian, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenLiLianPanel();
			});
			EventManage.onWithEffect(this.btn_xianShi, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenXianShiPanel();
			});
		}
		/**
		  * 天山血狱界面（boss之家）
		  */
		public init_bossHome(): void {
			// let pkt = new ProtoCmd.QuestClientData();
			// pkt.setString(ProtoCmd.FB_WorldBoss_Open, null, null, this, (jsonData: { any }) => {
			// 	let keys = Object.keys(jsonData);
			// 	for (let key of keys) {
			// 		let data: ProtoCmd.itf_FB_XueYuInfo = jsonData[key];
			// 		this.vbox_1.addChild(new view.compart.FuBenLiLianV1Item().setData(key,data));
					
			// 	}
			
			// })
			// lcp.send(pkt);
		}
		/**
			 * 诛杀邪帝界面(世界BOSS)
			 */
		public init_killXieDi(): void {
			// let pkt = new ProtoCmd.QuestClientData();
			// pkt.setString(ProtoCmd.FB_YeWaiBoss_Open, null, null, this, (jsonData: { any }) => {
			// 	console.log('============>邪帝邪帝', jsonData)
			// })
			// lcp.send(pkt);
		}
	}
}