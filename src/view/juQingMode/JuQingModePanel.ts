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
				console.log('阅读剧情')
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.JQ_GET_JQ_readJuQing, null, null, this, (jsonData) => {
					let allKeys = Object.keys(jsonData);
					if (allKeys.length > 0) {
						let charpterData = GameApp.GameEngine.talkInfo[GameApp.MainPlayer.charpterID];
						if (charpterData) {
							let _talkInfo: ProtoCmd.itf_JUQING_TALKINFO = charpterData.data[GameApp.MainPlayer.talkID];
							this.addJuQingTalkItem(_talkInfo);
						}
					}
				});
				lcp.send(pkt);
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

		/**
		 * 添加剧情对白条目
		 * @param _talkInfo 
		 */
		public addJuQingTalkItem(_talkInfo: ProtoCmd.itf_JUQING_TALKINFO): void {
			let npc = _talkInfo.msg.npcid;
			let context = _talkInfo.msg.content;
			let ui_item;
			switch (npc) {
				case 0:
					ui_item = new view.compart.JuQingContentV0Item();
					ui_item.setData(context);
					break;
				case 1:
					ui_item = new view.compart.JuQingContentV1Item();
					ui_item.setData(context);
					break
				default:
					ui_item = new view.compart.JuQingContentV2Item();
					ui_item.setData(npc, context);
					break;
			}
			this.vbox_0.addChild(ui_item);
			this.panel_0.scrollTo(0, this.vbox_0.height);
		}

		public initUI(): void {
			// 拉取章节信息
			let pkt1 = new ProtoCmd.QuestClientData();
			pkt1.setString(ProtoCmd.JQ_GET_JQ_ZHANGJIE, [GameApp.MainPlayer.pianZhangID], null, this,
				(jsonData: { pzid: number, charpterInfo: number }) => {
					if (jsonData.pzid == GameApp.MainPlayer.pianZhangID) {
						let keys = Object.keys(jsonData.charpterInfo);
						for (let key of keys) {
							let charpterInfo: ProtoCmd.itf_JUQING_CHARPTERINFO = jsonData.charpterInfo[key];
							let charpterID = GameApp.MainPlayer.charpterID;
							// 找到自己的章节ID，拿到开始对白ID和结束对白ID
							if (charpterInfo.zjid == charpterID) {
								// 开始的章节ID
								let startTalkId = charpterInfo.startdbid;
								// 当前ID
								let nowTalkId = GameApp.MainPlayer.talkID;
								// 拉取章节所有剧情
								let pkt = new ProtoCmd.QuestClientData();
								pkt.setString(ProtoCmd.JQ_GET_JQ_JuQingInfo, [charpterID], null, this,
									(jsonData) => {
										GameApp.GameEngine.talkInfo[charpterID] = jsonData;
										for (let i = startTalkId; i <= nowTalkId; i++) {
											let _talkInfo: ProtoCmd.itf_JUQING_TALKINFO = jsonData.data[i];
											this.addJuQingTalkItem(_talkInfo)
										}
									});
								lcp.send(pkt);
								break
							}
						}

					}
				});
			lcp.send(pkt1);
		}


	}
}