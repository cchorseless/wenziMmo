/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_DailyPanel extends ui.fuBen.FuBen_DailyPanelUI {
		public bossRoomId;
		constructor() {
			super();
		}
		public setData(): void {
			this.tab_0.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_0.selectedIndex = index;
			}, null, false);
			this.panel_boss.hScrollBarSkin = '';
			this.hbox_boss['sortItem'] = (items) => { };
			this.btn_jina.selected = true;
			
			this.addEvent();
		}
		public Dispose() {
			GameApp.LListener.offCaller(ProtoCmd.FB_CaiLiaoFuBen_OneKey, this);
			PopUpManager.Dispose(this)
		}

		public addEvent(): void {
			//返回
			this.btn_back.on(Laya.UIEvent.CLICK, this, function () {
				PopUpManager.checkPanel(this);
			})
			//剧情
			this.btn_juqing.on(Laya.UIEvent.CLICK, this, function () {
				PanelManage.openFuBenMainPanel('main')
			})
			//资源副本
			this.btn_res.on(Laya.UIEvent.CLICK, this, function () {
				PanelManage.openFuBenResPanel()
			})
			//心魔
			this.btn_xinmo.on(Laya.UIEvent.CLICK, this, function () {
				PanelManage.openFuBenXinMoPanel()
			})
			//缉拿
			this.btn_jina.on(Laya.UIEvent.CLICK, this, function () {
				return;
			})
	

			// GameApp.LListener.on(ProtoCmd.FB_CaiLiaoFuBen_OneKey, this, function (data) {
			// 	let o = new FuBen_SaoDang_Reward_Dialog();
			// 	o.setData(data.index, data.beishu);
			// 	o.popup()

			// })
		}
	}
}