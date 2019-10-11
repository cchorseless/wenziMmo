/**Created by the LayaAirIDE*/
module view.juQingMode {
	export class JuQingModePanel extends ui.juQingMode.JuQingModePanelUI {
		constructor() {
			super();
		}

		public setData(): void {
			this.panel_0.vScrollBarSkin = '';
			this.vbox_0['sortItem'] = (items) => { };
			this.vbox_zhangJieLeft['sortItem'] = (items) => { };
			this.vbox_zhangJieRight['sortItem'] = (items) => { };
			this.panel_zhangJie.scaleY = 0;
			this.panel_zhangJie.vScrollBarSkin = '';
			this.lbl_pianZhangName.text = '' + GameApp.MainPlayer.pianZhangName;
			this.box_selectQuestion.scaleY = 0;
			this.box_jiangLi.visible = false;
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
				new view.juQingMode.JuQingPrizeDialog().setData().popup();
			});

			// 剧情事件
			// EventManage.onWithEffect(this.btn_menu, Laya.UIEvent.CLICK, this, () => { PanelManage.openMenuPanel() });

			// 章节信息
			EventManage.onWithEffect(this.box_pianZhang, Laya.UIEvent.CLICK, this, () => {
				this.btn_charpter.selected = !this.btn_charpter.selected;
				let temp = this.btn_charpter.selected ? 1 : 0;
				Laya.Tween.to(this.panel_zhangJie, { scaleY: temp }, 200);
				// 刷新item
				if (this.btn_charpter.selected) {
					for (let _item of this.vbox_zhangJieLeft._childs) {
						_item.updateUI();
					}
					for (let _item of this.vbox_zhangJieRight._childs) {
						_item.updateUI();
					}
				}
			});

			// 选项AB
			EventManage.onWithEffect(this.btn_selectA, Laya.UIEvent.CLICK, this, () => {
				this.btn_next.disabled = false;
				this.SELECT_MODE = true;
				Laya.Tween.to(this.box_selectQuestion, { scaleY: 0 }, 200);
				this.btn_next.event(Laya.UIEvent.MOUSE_UP, true);
			});
			EventManage.onWithEffect(this.btn_selectB, Laya.UIEvent.CLICK, this, () => {
				this.btn_next.disabled = false;
				this.SELECT_MODE = false;
				Laya.Tween.to(this.box_selectQuestion, { scaleY: 0 }, 200);
				this.btn_next.event(Laya.UIEvent.MOUSE_UP, true);
			});
			// 添加本地事件
			this.addLcpEvent()
		}

		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.JQ_GET_JQ_readJuQing, this, (jsonData: ProtoCmd.itf_JUQING_READBACK) => {
				console.log(jsonData);
				let allKeys = Object.keys(jsonData);
				if (allKeys.length > 0) {
					let charpterData = GameApp.GameEngine.talkInfo[GameApp.MainPlayer.charpterID];
					if (charpterData) {
						// 激活了任务
						if (jsonData.mainquestid) {
							this.btn_next.label = 'new 剧情事件!!!!';
							// 更新主线任务
							PanelManage.Main.updateTaskInfo();
						}
						else {
							this.btn_next.label = '继 续';
						}
						let _talkInfo: ProtoCmd.itf_JUQING_TALKINFO = charpterData.data[GameApp.MainPlayer.talkID];
						// 处理选项对白
						this.showSelectQuestion(_talkInfo);
						this.addJuQingTalkItem(_talkInfo);
						// 奖励
						this.box_jiangLi.visible = true;
						Laya.Tween.to(this.box_jiangLi, { x: this.btn_prize.x, y: this.btn_prize.y, scaleX: 0.3, scaleY: 0.3 }, 600, null,
							Laya.Handler.create(this, () => {
								this.box_jiangLi.visible = false;
								this.box_jiangLi.pos(this.btn_next.x, this.btn_next.y);
								this.box_jiangLi.scale(1, 1);
							})
						)
						// 图鉴
					}
				}
				else {
					TipsManage.showTips('章节已经读完');
					this.btn_next.label = '本章结束，切换下一章';
					this.panel_0.scrollTo(0, this.vbox_0.height);
					this.box_pianZhang.event(Laya.UIEvent.MOUSE_UP, [true]);
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
		 * @param needScroll  是否需要滚动
		 */
		public addJuQingTalkItem(_talkInfo: ProtoCmd.itf_JUQING_TALKINFO, needScroll: boolean = true): void {
			console.log(_talkInfo.msg);
			// 选项模式决定选哪个对白
			if (_talkInfo.msg.eventBn.length == 0) {
				this.SELECT_MODE = true;
			}
			let context = this.SELECT_MODE ? _talkInfo.msg.content : _talkInfo.msg.eventBn;
			let ui_item = null;
			let npc = _talkInfo.msg.npcid;
			switch (npc) {
				case 0:
					ui_item = new view.juQingMode.JuQingContentV0Item();
					ui_item.setData(context);
					break;
				case 1:
					ui_item = new view.juQingMode.JuQingContentV1Item();
					ui_item.setData(context);
					break
				default:
					ui_item = new view.juQingMode.JuQingContentV2Item();
					ui_item.setData(npc, context);
					break;
			}
			this.vbox_0.addChild(ui_item);
			if (needScroll) {
				// 延时两帧滚动
				Laya.timer.frameOnce(2, this, () => { this.panel_0.scrollTo(0, this.vbox_0.height) });
			}

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
							if (this.vbox_zhangJieLeft.numChildren > this.vbox_zhangJieRight.numChildren) {
								this.vbox_zhangJieRight.addChild(charpterInfo_ui);
							}
							else {
								this.vbox_zhangJieLeft.addChild(charpterInfo_ui);
							}
							// 找到自己的章节ID，拿到开始对白ID和结束对白ID
							if (charpterInfo.zjid == charpterID) {
								this.updateTalkInfo(charpterID);
							}
						}
					};
				});
			lcp.send(pkt1);
			// 判定是否有触发了剧情事件
			let taskInfo = GameApp.GameEngine.taskInfo[EnumData.TaskType.JUQINGEVENT];
			if (taskInfo) {
				this.btn_next.label = 'new 剧情事件!!!!';
			}
			else {
				this.btn_next.label = '继 续';
			}
		}

		/**
		 * 拉取章节对白
		 * @param charpterID 章节ID
		 */
		public updateTalkInfo(charpterID): void {
			// 有对白ID
			if (GameApp.GameEngine.talkInfo[charpterID]) {
				let startTalkId = GameApp.GameEngine.allCharpterInfo[charpterID].startdbid;
				let endTalkId = Math.min(GameApp.MainPlayer.talkID, GameApp.GameEngine.allCharpterInfo[charpterID].enddbid);
				console.log(startTalkId, endTalkId);
				for (let i = startTalkId; i <= endTalkId; i++) {
					let _talkInfo: ProtoCmd.itf_JUQING_TALKINFO = GameApp.GameEngine.talkInfo[charpterID].data[i];
					this.addJuQingTalkItem(_talkInfo, false)
				}
				return
			};
			// 清空数据
			this.vbox_0.removeChildren();
			let charpterInfo = GameApp.GameEngine.allCharpterInfo[charpterID];
			// 章节编号
			this.lbl_charpterTile.text = '第' + charpterInfo.index + '章';
			// 章节名字
			this.lbl_charpterName.text = charpterInfo.name;
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
					let endTalkId = Math.min(GameApp.MainPlayer.talkID, GameApp.GameEngine.allCharpterInfo[jsonData.zjid].enddbid)
					for (let i = startTalkId; i <= endTalkId; i++) {
						let _talkInfo: ProtoCmd.itf_JUQING_TALKINFO = GameApp.GameEngine.talkInfo[jsonData.zjid].data[i];
						this.addJuQingTalkItem(_talkInfo, false)
					}
				}
			}
			else {
				GameApp.GameEngine.talkInfo[jsonData.zjid] = jsonData;
			}
		}

		// 选项类型
		public SELECT_MODE: boolean = true;
		/**
		 * 展示对白选项
		 */
		public showSelectQuestion(_talkInfo: ProtoCmd.itf_JUQING_TALKINFO): void {
			// 处理对白选项
			if (_talkInfo.msg.question && _talkInfo.msg.eventA && _talkInfo.msg.eventB) {
				this.btn_next.disabled = true;
				this.lbl_selestQuestion.text = '' + _talkInfo.msg.question;
				this.btn_selectA.label = '' + _talkInfo.msg.eventA;
				this.btn_selectB.label = '' + _talkInfo.msg.eventB;
				Laya.Tween.to(this.box_selectQuestion, { scaleY: 1 }, 300, null, Laya.Handler.create(this, () => {
					this.btn_next.disabled = false;
				}));
			}

		}

		/**
		 * 展示剧情事件
		 */
		public showJuQingEvent(): void {
			let taskInfo = GameApp.GameEngine.taskInfo[EnumData.TaskType.JUQINGEVENT];
			if (taskInfo) {
				let _task = taskInfo[Object.keys(taskInfo)[0]];
				new view.juQingMode.JuQingEventDialog().setData(_task).popup();
			}
		}

		/**
		 * 更改章节
		 * @param item 
		 */
		public changeCharpter(item: view.juQingMode.JuQingCharpterItem): void {
			// 关闭界面
			this.box_pianZhang.event(Laya.UIEvent.MOUSE_UP, [true]);
			// 拉取剧情
			this.updateTalkInfo(item.charpterInfo.zjid);
		}
	}
}