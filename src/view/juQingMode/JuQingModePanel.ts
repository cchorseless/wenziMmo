/**Created by the LayaAirIDE*/
module view.juQingMode {
	export class JuQingModePanel extends ui.juQingMode.JuQingModePanelUI {
		constructor() {
			super();
		}

		public setData(): void {
			this.panel_0.vScrollBarSkin = '';
			this.vbox_0['sortItem'] = (items) => { };
			this.vbox_zhangJieInfo['sortItem'] = (items) => { };
			this.vbox_zhangJieInfo.scaleY = 0;
			this.lbl_pianZhangName.text = '' + GameApp.MainPlayer.pianZhangName;
			this.initUI();
			this.addEvent();
		}
		public addEvent(): void {
			// 添加剧情对白
			EventManage.onWithEffect(this.btn_next, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.JQ_GET_JQ_readJuQing)
				lcp.send(pkt);
			});

			// 剧情进度
			EventManage.onWithEffect(this.btn_juQing, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingInfoPanel()
			});

			// 副本
			EventManage.onWithEffect(this.btn_fuBen, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenMainPanel()
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

			// 章节信息
			EventManage.onWithEffect(this.box_pianZhang, Laya.UIEvent.CLICK, this, () => {
				this.btn_charpter.selected = !this.btn_charpter.selected;
				let temp = this.btn_charpter.selected ? 1 : 0;
				Laya.Tween.to(this.vbox_zhangJieInfo, { scaleY: temp }, 200)
			});
			// 添加本地事件
			this.addLcpEvent()
		}


		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.JQ_GET_JQ_readJuQing, this, (jsonData) => {
				let allKeys = Object.keys(jsonData);
				if (allKeys.length > 0) {
					let charpterData = GameApp.GameEngine.talkInfo[GameApp.MainPlayer.charpterID];
					if (charpterData) {
						let _talkInfo: ProtoCmd.itf_JUQING_TALKINFO = charpterData.data[GameApp.MainPlayer.talkID];
						this.addJuQingTalkItem(_talkInfo);
					}
					// 奖励
					// 图鉴
				}
				else {
					TipsManage.showTips('章节已经读完');
					this.btn_next.label = '本章结束，切换下一章';
					this.panel_0.scrollTo(0, this.vbox_0.height);
					this.box_pianZhang.event(Laya.UIEvent.MOUSE_UP);
				}
			})

		}

		public Dispose(): void {
			GameApp.LListener.offCaller(ProtoCmd.JQ_GET_JQ_readJuQing, this);
			PopUpManager.Dispose(this);
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
				(jsonData: { pzid: number, pzname: string, charpterInfo: number }) => {
					// 拉取对白
					if (jsonData.pzid == GameApp.MainPlayer.pianZhangID) {
						let keys = Object.keys(jsonData.charpterInfo);
						for (let key of keys) {
							let charpterInfo: ProtoCmd.itf_JUQING_CHARPTERINFO = jsonData.charpterInfo[key];
							let charpterID = GameApp.MainPlayer.charpterID;
							// 处理索引
							charpterInfo.index = key;
							// 处理挂机效率掉落
							GameApp.GameEngine.allCharpterInfo[charpterInfo.zjid] = charpterInfo;
							// 章节ui
							let charpterInfo_ui = new view.juQingMode.JuQingCharpterItem();
							charpterInfo_ui.setData(charpterInfo);
							this.vbox_zhangJieInfo.addChild(charpterInfo_ui);
							// 找到自己的章节ID，拿到开始对白ID和结束对白ID
							if (charpterInfo.zjid == charpterID) {
								// 章节编号
								this.lbl_charpterTile.text = '第' + key + '章';
								// 章节名字
								this.lbl_charpterName.text = charpterInfo.name;
								// 开始的章节ID
								let startTalkId = charpterInfo.startdbid;
								// 当前ID
								let nowTalkId = GameApp.MainPlayer.talkID;
								this.updateTalkInfo(charpterID, startTalkId, nowTalkId);
							}
						}
					};
				});
			lcp.send(pkt1);
		}

		/**
		 * 拉取章节对白
		 * @param charpterID 章节ID
		 * @param startTalkId 开始对白ID
		 * @param nowTalkId 当前进度对白ID
		 */
		public updateTalkInfo(charpterID, startTalkId, nowTalkId): void {
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
		}
	}
}