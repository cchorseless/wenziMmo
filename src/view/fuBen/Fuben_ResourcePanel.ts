/**Created by the LayaAirIDE*/
module view.fuBen {
	export class Fuben_ResourcePanel extends ui.fuBen.Fuben_ResourcePanelUI {
		constructor() {
			super();
		}
		public data;
		public setData(): void {
			this.vbox_resource['sortItem'] = (items) => { };
			this.tab_resource.selectHandler = Laya.Handler.create(this, (index) => {
				this.init_changefubenType(index);
			}, null, false);
			this.init_res();
			this.init_isOpenRes();
			this.addEvent();
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
				return;
			})
			//心魔
			this.btn_xinmo.on(Laya.UIEvent.CLICK, this, function () {
				PanelManage.openFuBenXinMoPanel()
			})
			//日常
			this.btn_jina.on(Laya.UIEvent.CLICK, this, function () {
				PanelManage.openFuBenDailyPanel()
			})
			this.addLcpEvent();
		}
		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.FB_CLFubenStatus, this, function (jsonData) {
				this.data = jsonData

			})
		}
		/**
	  * 资源界面
	  */
		public init_res(): void {
			let pkt = new ProtoCmd.QuestClientData();
			//拉取副本索引
			pkt.setString(ProtoCmd.FB_CLFubenStatus, null)
			lcp.send(pkt);
		}
		public init_changefubenType(index): void {
			let resFubenInfo = GameApp.GameEngine.fuBenResinfo
			if (resFubenInfo) {
				let num = index + 1;;
				let resData: ProtoCmd.itf_FB_ZiYuanInfo = this.data[num];
				if (this.data) {
					this.vbox_resource.removeChildren();
					for (let i = 1; i <= 5; i++) {
						this.vbox_resource.addChild(new view.fuBen.FuBenDailySourceItem().setData(resData, resFubenInfo, num, i))
					}
				}
				let name;
				switch (num) {
					case 1:
						name = '金钱庄副本挑战次数：'
						break;
					case 2:
						name = '矿坑副本挑战次数：'
						break;
					case 3:
						name = '龙魂副本挑战次数：'
						break;
					case 4:
						name = '魂石副本挑战次数：'
						break;
				}
				//剩余副本次数
				let cout = resData.leftcnt - resData.caninto
				this.lbl_fuben.text = name + cout;
			}
		}
		public init_isOpenRes(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FB_OpenNpc_CLFuben, null, null, this, (jsonData: { [index: number]: ProtoCmd.itf_FB_ZiYuanOneInfo }) => {
				GameApp.GameEngine.fuBenResinfo = jsonData;
				this.init_changefubenType(0);
			})
			lcp.send(pkt);
		}
		public Dispose() {
			GameApp.LListener.offCaller(ProtoCmd.FB_CLFubenStatus, this);
			PopUpManager.Dispose(this)
		}
	}
}