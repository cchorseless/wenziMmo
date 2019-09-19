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
			EventManage.onWithEffect(this.btn_shouCe, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openZhiNanPanel()
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

			// 剧情事件
			EventManage.onWithEffect(this.btn_eventPrize, Laya.UIEvent.CLICK, this, () => {
				new view.dialog.JuQingEventDialog().setData().popup();
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
			});
			// 拉取剧情对白数据
			GameApp.LListener.on(ProtoCmd.JQ_GET_JQ_JuQingInfo, this, this.updateJuQingTalkInfo);
		}

		public Dispose(): void {
			GameApp.LListener.offCaller(ProtoCmd.JQ_GET_JQ_readJuQing, this);
			GameApp.LListener.offCaller(ProtoCmd.JQ_GET_JQ_JuQingInfo, this);
			PopUpManager.Dispose(this);
		}
		/**
		 * 添加剧情对白条目
		 * @param _talkInfo 
		 */
		public addJuQingTalkItem(_talkInfo: ProtoCmd.itf_JUQING_TALKINFO): void {
			let npc = _talkInfo.msg.npcid;
			let context = _talkInfo.msg.content;
			let ui_item = null;
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

			console.log("===========>")
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
								this.updateTalkInfo(charpterID);
							}
						}
					};
				});
			lcp.send(pkt1);
		}

		/**
		 * 拉取章节对白
		 * @param charpterID 章节ID
		 */
		public updateTalkInfo(charpterID): void {
			// 拉取章节所有剧情
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JQ_GET_JQ_JuQingInfo, [charpterID]);
			lcp.send(pkt);
		}

		/**
		 * 拉取剧情详细对白
		 * @param data 
		 */
		public updateJuQingTalkInfo(jsonData: { zjid: number, data: any, statetab: any, flag: number }): void {
			if (GameApp.GameEngine.talkInfo[jsonData.zjid]) {
				GameApp.GameEngine.talkInfo[jsonData.zjid].statetab = jsonData.statetab;
				// 合并剧情对白
				Object['assign'](GameApp.GameEngine.talkInfo[jsonData.zjid].data, jsonData.data);
				// 剧情拉完了
				if (jsonData.flag) {
					// 开始的对白ID
					let startTalkId = GameApp.GameEngine.allCharpterInfo[jsonData.zjid].startdbid;
					console.log('======', startTalkId, GameApp.MainPlayer.talkID)
					
					for (let i = startTalkId; i <= 10178; i++) {
						
						let _talkInfo: ProtoCmd.itf_JUQING_TALKINFO = GameApp.GameEngine.talkInfo[jsonData.zjid].data[i];
						console.log(i)
						this.addJuQingTalkItem(_talkInfo)
					}
				}
			}
			else {
				GameApp.GameEngine.talkInfo[jsonData.zjid] = jsonData;
			}
		}
	}
}