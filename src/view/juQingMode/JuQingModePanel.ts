/**Created by the LayaAirIDE*/
module view.juQingMode {
	export class JuQingModePanel extends ui.juQingMode.JuQingModePanelUI {
		constructor() {
			super();
		}

		public setData(): void {
			this.panel_0.vScrollBarSkin = '';
			this.vbox_0['sortItem'] = (items) => { };
			this.initUI();
			this.addEvent();
		}
		public addEvent(): void {

			// 添加剧情对白
			this.vbox_0.on(Laya.UIEvent.CLICK, this, () => {
				let juqingId = parseInt(this.juqingId) + 1;
				if (juqingId > 10030) return;
				this.addJuQingTalkItem('' + juqingId);
				this.panel_0.scrollTo(0, this.vbox_0.height);
			});

			// 剧情进度
			EventManage.onWithEffect(this.btn_juQing, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingInfoPanel()
			});

			// 副本
			EventManage.onWithEffect(this.btn_fuBen, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenPanel()
			});

			// 图谱
			EventManage.onWithEffect(this.btn_tuJian, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTuJianJuesePanel()
			});

			// 任务
			EventManage.onWithEffect(this.btn_task, Laya.UIEvent.CLICK, this, () => { PanelManage.openTask_MainPanel(); });

			// 天鉴
			EventManage.onWithEffect(this.btn_tianJian, Laya.UIEvent.CLICK, this, () => { PanelManage.openTianJianPanel(); });

			// 场景模式
			EventManage.onWithEffect(this.btn_changeMode, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});
			// 奖励
			EventManage.onWithEffect(this.btn_prize, Laya.UIEvent.CLICK, this, () => {
				new view.dialog.JuQingPrizeDialog().setData().popup();
			});
		}

		public juqingId: string;// 剧情对白ID
		public addJuQingTalkItem(juqingId: string): void {
			this.juqingId = juqingId;
			let npc = SheetConfig.juQingTxtSheet.getInstance(null).NPCID(juqingId);
			let context = SheetConfig.juQingTxtSheet.getInstance(null).TXTCONTENT(juqingId);
			let ui_item;
			switch (npc) {
				case '0':
					ui_item = new view.compart.JuQingContentV0Item();
					ui_item.setData(context);
					break;
				case '1':
					ui_item = new view.compart.JuQingContentV1Item();
					ui_item.setData(context);
					break
				default:
					ui_item = new view.compart.JuQingContentV2Item();
					ui_item.setData(npc, context);
					break;
			}
			this.vbox_0.addChild(ui_item);
		}

		public initUI(): void {
			// 拉取章节所有剧情
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JQ_GET_JQ_JuQingInfo, [GameApp.MainPlayer.charpterID], null, this, (jsonData) => {
				console.log('拉取了章节数据')
				console.log(jsonData);
			});
			lcp.send(pkt);
		}

	}
}