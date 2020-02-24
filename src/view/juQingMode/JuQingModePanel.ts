/**Created by the LayaAirIDE*/
module view.juQingMode {
	export class JuQingModePanel extends ui.juQingMode.JuQingModePanelUI {
		public static self: JuQingModePanel
		public curReadInfo: JuQing_ReadInfo;
		public lastReadInfo: JuQing_ReadInfo;
		public nextReadInfo: JuQing_ReadInfo;
		public handler: Laya.Handler = null;
		public muluShow = false;

		public isJuQing = false;  //当前页是否有剧情

		public muluItem: JuQing_MuLu;

		public onlyGet = false;
		public isGetNew = false;

		public maxInfoNum = 7;
		public cantLastPage = false;



		public touchBeginX = 0;
		public touchEndX = 0;
		public maxTurnNum = 0;
		public isTouch = false;

		public volumeArr;


		public pageID;
		public juQingPageID;
		public lastTalkID;
		public hasLookBack = 0;
		constructor() {
			super();
			JuQingModePanel.self = this;
		}

		public setData(): void {
			let boo = PanelManage.getAspectRatio()
			if (boo) {
				this.maxInfoNum = 8
			} else {
				this.maxInfoNum = 7
			}
			// PanelManage.Main.box_mainBottom.visible = false;
			// this.panel_0.vScrollBarSkin = '';
			// this.vbox_zhangJieLeft['sortItem'] = (items) => { };
			// this.vbox_zhangJieRight['sortItem'] = (items) => { };
			// this.panel_zhangJie.scaleY = 0;
			// this.panel_zhangJie.vScrollBarSkin = '';
			// this.lbl_pianZhangName.text = '' + GameApp.MainPlayer.pianZhangName;
			this.box_selectQuestion.scaleY = 0;
			this.box_jiangLi.visible = false;
			// if (GameApp.GameEngine.mainPlayer.viplvl >= 5) {
			// 	this.btn_VIPskip.skin = "image/juQingMode/icon_tiaoguoduibai_03.png"
			// 	this.btn_VIPskip.stateNum = 2;
			// } else {
			// 	this.btn_VIPskip.skin = "image/juQingMode/icon_tiaoguoduibai_03_0.png"
			// 	this.btn_VIPskip.stateNum = 1;
			// }
			this.getAllData()
			this.initUI();
			this.addEvent();

		}
		public getAllData() {
			let self = this;
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JQ_GET_JQ_PIANZHANG, null, null, this, (jsonData) => {
				let keys = Object.keys(jsonData);
				this.volumeArr = jsonData;
				this.setMuLuMsg()
			})
			lcp.send(pkt);
		}
		public setMuLuMsg() {
			this.muluItem = new JuQing_MuLu();
			this.muluItem.setData(this.volumeArr)
			this.muluItem.top = 0;
			this.muluItem.bottom = 0;
			this.muluItem.width = Laya.stage.width;
			this.muluItem.x = -1 * this.muluItem.width;
			this.addChild(this.muluItem);
			this.muluItem.visible = false;
		}
		//奖励或事件显示
		public nextPageEvent() {
			if (this.btn_next.skin == 'image/juQingMode/icon_shijian.png') {
				this.showJuQingEvent();
			} else {
				new view.juQingMode.JuQingPrizeDialog().setData().popup();
			}
		}

		public addEvent(): void {

			// 事件或奖励
			EventManage.onWithEffect(this.btn_next, Laya.UIEvent.CLICK, this, () => {
				this.nextPageEvent()
			});
			this.BoxEventListener();

			// 场景模式
			EventManage.onWithEffect(this.btn_changeMode, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});
			EventManage.onWithEffect(this.btn_tianjian, Laya.Event.CLICK, this, function () {
				let pkt1 = new ProtoCmd.QuestClientData();
				pkt1.setString(ProtoCmd.SpecialRingPanel, null, 0, this, function (data) {
					let o = new tianJian.TianJianPanel();
					o.setData(data);
					o.popup();
				})
				pkt1.send();
			})

			// 奖励
			EventManage.onWithEffect(this.btn_prize, Laya.UIEvent.CLICK, this, () => {
				// new view.juQingMode.JuQingPrizeDialog().setData().popup();
				this.muluShow = !this.muluShow;
				// this.muluItem.visible = !this.muluItem.visible;
				if (this.muluShow) {
					this.muluItem.visible = this.muluShow;
					Laya.Tween.to(this.muluItem, { x: 0 }, 300)
				} else {
					Laya.Tween.to(this.muluItem, { x: -1 * this.muluItem.width }, 300, null, Laya.Handler.create(this, () => {
						this.muluItem.visible = this.muluShow;
					}))
				}
			});
			EventManage.onWithEffect(this.btn_zhiNan, Laya.UIEvent.CLICK, this, () => {
				// // new view.juQingMode.JuQingPrizeDialog().setData().popup();
				// this.muluShow = !this.muluShow;
				// // this.muluItem.visible = !this.muluItem.visible;
				// if (this.muluShow) {
				// 	this.muluItem.visible = this.muluShow;
				// 	Laya.Tween.to(this.muluItem, { x: 0 }, 300)
				// } else {
				// 	Laya.Tween.to(this.muluItem, { x: -1 * this.muluItem.width }, 300, null, Laya.Handler.create(this, () => {
				// 		this.muluItem.visible = this.muluShow;
				// 	}))
				// }
				PanelManage.openZhiNanPanel()
			});

			// // 章节信息
			// EventManage.onWithEffect(this.box_pianZhang, Laya.UIEvent.CLICK, this, () => {
			// 	this.btn_charpter.selected = !this.btn_charpter.selected;
			// 	let temp = this.btn_charpter.selected ? 1 : 0;
			// 	if (temp == 1) {
			// 		this.img_panel.visible = true
			// 	} else {
			// 		this.img_panel.visible = false
			// 	}
			// 	Laya.Tween.to(this.panel_zhangJie, { scaleY: temp }, 200, );

			// 	// 刷新item
			// 	if (this.btn_charpter.selected) {
			// 		for (let _item of this.vbox_zhangJieLeft._childs) {
			// 			_item.updateUI();
			// 		}
			// 		// for (let _item of this.vbox_zhangJieRight._childs) {
			// 		// 	_item.updateUI();
			// 		// }
			// 	}
			// });

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
			let self = this;
			GameApp.LListener.on(ProtoCmd.JQ_GET_JQ_readJuQing, this, (jsonData) => {
				console.log(jsonData);
				if (this.lastTalkID >= jsonData.dbid) {
					if (jsonData.dbid == GameApp.MainPlayer.allCharpterInfo[GameApp.MainPlayer.charpterID].enddbid) {
						// TipsManage.showTips('已读完本章');
						let nextID = this.getNextCharpterID(GameApp.MainPlayer.charpterID)
						if (GameApp.MainPlayer.pianZhangID != nextID.pzid) {
							GameApp.MainPlayer.pianZhangID = nextID.pzid;
							self.getPZMsg(nextID.pzid)
						}
						GameApp.MainPlayer.talkID = GameApp.MainPlayer.allCharpterInfo[nextID.zjid].startdbid;
						PanelManage.Main.view_scene._childs[0].init_noChange;
						GameApp.MainPlayer.charpterID = nextID.zjid;
						this.juQingPageID = Math.ceil((GameApp.MainPlayer.talkID - GameApp.MainPlayer.allCharpterInfo[GameApp.GameEngine.mainPlayer.charpterID].startdbid + 1) / this.maxInfoNum)
						this.isGetNew = true;
						this.updateTalkInfo(nextID.zjid);
					} else {
						
						TipsManage.showTips('当前任务未完成');
					}
					PanelManage.Main.updateTaskInfo();
				} else {
					this.lastTalkID = jsonData.dbid
					this.juQingPageID = Math.ceil((GameApp.MainPlayer.talkID - GameApp.MainPlayer.allCharpterInfo[GameApp.GameEngine.mainPlayer.charpterID].startdbid + 1) / this.maxInfoNum)

					if (this.hasLookBack < 0) {
						this.showPageMsg(1);
						this.hasLookBack++;
					} else {
						Laya.Tween.to(self.box2, { x: -640 }, 250, null,
							Laya.Handler.create(this, () => {
								self.initBox();
								this.showPageMsg(this.pageID + 1);
							}))

					}
					this.box_jiangLi.visible = true;
					Laya.Tween.to(this.box_jiangLi, { x: Laya.stage.width / 2, y: Laya.stage.height * 0.8, scaleX: 0.3, scaleY: 0.3 }, 600, null,
						Laya.Handler.create(this, () => {
							this.box_jiangLi.visible = false;
							this.box_jiangLi.pos(this.panel_read.width / 2, this.panel_read.height / 2);
							this.box_jiangLi.scale(1, 1);
						})
					)

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
		 * @param _talkInfo 7条剧情
		 * @param isFirst  是否是章节首页
		 * @param index  -1前一页lastReadInfo     0当前页curReadInfo       1后一页nextReadInfo
		 * @param page    当前页数
		 * @param totalPage  总页数
		 * @param volue     篇ID
		 * @param chapter 章节ID
		 */
		public addJuQingTalkItem(_talkInfo = [], isFirst: boolean, index: number, page: number, totalPage, volue, chapter): void {
			let num = _talkInfo.length;
			console.log('tallinfo数量' + num);
			this.panel_read.numChildren
			if (index == -1) {
				this.lastReadInfo = null;
				this.lastReadInfo = new JuQing_ReadInfo();
				PanelManage.Main.view_scene._childs[0].init_noChange();
				if (isFirst) {
					this.lastReadInfo.setData(isFirst, page, totalPage, volue, chapter, _talkInfo, this.panel_read.width, this.panel_read.height)
				} else {
					this.lastReadInfo.setData(isFirst, page, totalPage, volue, chapter, _talkInfo, this.panel_read.width, this.panel_read.height)
				}
				this.lastReadInfo.x = 0;
				this.box3.addChild(this.lastReadInfo)

			} else if (index == 0) {
				this.curReadInfo = null;
				this.curReadInfo = new JuQing_ReadInfo();
				if (isFirst) {
					this.curReadInfo.setData(isFirst, page, totalPage, volue, chapter, _talkInfo, this.panel_read.width, this.panel_read.height)
				} else {
					this.curReadInfo.setData(isFirst, page, totalPage, volue, chapter, _talkInfo, this.panel_read.width, this.panel_read.height)
					this.isJuQing = false;
					for (let i in _talkInfo) {
						if (_talkInfo[i] && _talkInfo[i].mainquestid > 0) {
							let taskInfo = {};
							taskInfo = GameApp.GameEngine.taskInfo[EnumData.TaskType.JUQINGEVENT];
							if (taskInfo != {}) {
								for (let o in taskInfo) {
									if (_talkInfo[i].mainquestid == parseInt(o)) {
										this.isJuQing = true;
									}
								}
							}
						}
					}
					if (this.isJuQing) {
						this.btn_next.skin = 'image/juQingMode/icon_shijian.png'
						this.btn_next.label = '事件'
					} else {
						this.btn_next.skin = 'image/common/icon_baoxiang3_close.png'
						this.btn_next.label = '挂机'
					}
				}
				this.curReadInfo.x = 0
				this.box2.addChild(this.curReadInfo)
			} else if (index == 1) {
				this.nextReadInfo = null;
				this.nextReadInfo = new JuQing_ReadInfo();
				if (isFirst) {
					this.nextReadInfo.setData(isFirst, page, totalPage, volue, chapter, _talkInfo, this.panel_read.width, this.panel_read.height)
				} else {
					this.nextReadInfo.setData(isFirst, page, totalPage, volue, chapter, _talkInfo, this.panel_read.width, this.panel_read.height)
				}
				this.nextReadInfo.x = 0;
				this.box1.addChild(this.nextReadInfo)
			}
		}
		public getPZMsg(pzid) {
			let pkt1 = new ProtoCmd.QuestClientData();
			pkt1.setString(ProtoCmd.JQ_GET_JQ_ZHANGJIE, [pzid], null, this,
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
							GameApp.MainPlayer.allCharpterInfo[charpterInfo.zjid] = charpterInfo;
							// // 章节ui
							// this.lastTalkID = GameApp.MainPlayer.talkID;
						}
					}
				});
			lcp.send(pkt1);
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
							GameApp.MainPlayer.allCharpterInfo[charpterInfo.zjid] = charpterInfo;

							// 章节ui
							// this.lastTalkID = GameApp.MainPlayer.talkID;
							// let charpterInfo_ui = new view.juQingMode.JuQingCharpterItem();
							// charpterInfo_ui.setData(charpterInfo);
							// this.vbox_zhangJieLeft.addChild(charpterInfo_ui);

							if (charpterInfo.zjid < charpterID) {
								this.updateTalkInfo(charpterID);
							} else if (charpterInfo.zjid == charpterID) {
								this.juQingPageID = Math.ceil((GameApp.MainPlayer.talkID - GameApp.MainPlayer.allCharpterInfo[GameApp.GameEngine.mainPlayer.charpterID].startdbid + 1) / this.maxInfoNum)
								this.updateTalkInfo(charpterID);
							}

						}
					}
				});
			lcp.send(pkt1);
			// 判定是否有触发了剧情事件
			let taskInfo = GameApp.GameEngine.taskInfo[EnumData.TaskType.JUQINGEVENT];

			if (taskInfo) {
				// this.btn_next.label = 'new 剧情事件!!!!';
				this.btn_next.skin = 'image/juQingMode/icon_shijian.png'
				this.btn_next.label = '事件'
			}
			else {
				// this.btn_next.label = '奖励';
				this.btn_next.skin = 'image/common/icon_baoxiang3_close.png'
				this.btn_next.label = '挂机'
			}
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
			PanelManage.Main.view_scene._childs[0].setData();
			console.log(jsonData);
			if (GameApp.MainPlayer.talkInfo[jsonData.zjid]) {
				GameApp.MainPlayer.talkInfo[jsonData.zjid].statetab = jsonData.statetab;
				// 合并剧情对白
				Object['assign'](GameApp.MainPlayer.talkInfo[jsonData.zjid].data, jsonData.data);
				// 剧情拉完了
				if (jsonData.flag) {
					if (!this.onlyGet) {
						if (this.isGetNew) {
							this.showPageMsg(1);
							this.isGetNew = false;
						} else {
							this.showPageMsg();
						}

					} else {
						this.onlyGet = false;
					}
				}
			}
			else {
				GameApp.MainPlayer.talkInfo[jsonData.zjid] = jsonData;
			}
		}
		public showPageMsg(page = Math.ceil((GameApp.MainPlayer.talkID - GameApp.MainPlayer.allCharpterInfo[GameApp.GameEngine.mainPlayer.charpterID].startdbid + 1) / this.maxInfoNum) + 1) {
			//刷新剧情界面读小说页数进度
			PanelManage.Main.view_scene._childs[0].lbl_dangqian.text = '' + page;
			this.box1.removeChildren();
			this.box2.removeChildren();
			this.box3.removeChildren();
			let zjid = GameApp.MainPlayer.charpterID
			let startTalkId = GameApp.MainPlayer.allCharpterInfo[zjid].startdbid;
			let endTalkId = GameApp.MainPlayer.allCharpterInfo[zjid].enddbid;
			let curTalkinfoArr = [];
			let lastTalkinfoArr = [];
			let nextTalkinfoArr = [];
			//总页数
			// let totalPage1 = Math.ceil((GameApp.MainPlayer.allCharpterInfo[GameApp.MainPlayer.charpterID].enddbid - GameApp.MainPlayer.allCharpterInfo[GameApp.MainPlayer.charpterID].startdbid  + 1) / this.maxInfoNum);
			let totalPage = Math.ceil((GameApp.MainPlayer.allCharpterInfo[zjid].enddbid - startTalkId + 1) / this.maxInfoNum);
			this.juQingPageID = totalPage;
			let jsonArr = [];   //把该篇中所有的章节转换成 每页7、8个的 数组
			this.pageID = page;
			let curPageID = page; //当前页数对应jsonArr下标
			for (let i = 0; i < totalPage; i++) {
				let info = [];
				for (let p = i * this.maxInfoNum; p < this.maxInfoNum * (i + 1); p++) {
					info.push(GameApp.MainPlayer.talkInfo[zjid].data[startTalkId + p])
				}
				jsonArr.push(info);
			}
			let boo = this.isFirstCharpter()
			this.lab_qingyi.text = " " + GameApp.MainPlayer.allCharpterInfo[zjid].items[1].num + '/时';
			this.lab_yueli.text = " " + GameApp.MainPlayer.allCharpterInfo[zjid].items[2].num + '/时';
			if (boo) {
				if (this.pageID == 1) {
					this.cantLastPage = true;
					this.addJuQingTalkItem(lastTalkinfoArr, true, -1, page, totalPage, GameApp.MainPlayer.pianZhangID, zjid)
					this.addJuQingTalkItem(curTalkinfoArr, true, 0, page, totalPage, GameApp.MainPlayer.pianZhangID, zjid)
					nextTalkinfoArr = jsonArr[page - 1]
					this.addJuQingTalkItem(nextTalkinfoArr, false, 1, page, totalPage, GameApp.MainPlayer.pianZhangID, zjid)
				}
			} else {

				let lastID0 = this.getLastCharpterID(zjid);
				if (lastID0.zjid > 0) {
					this.onlyGet = true;
					this.updateTalkInfo(lastID0.zjid)
				}
				if (this.pageID == 1) {
					this.cantLastPage = false;
					let lastID = this.getLastCharpterID(zjid);
					let startTalkId1 = GameApp.MainPlayer.allCharpterInfo[lastID.zjid].startdbid;
					let endTalkId1 = GameApp.MainPlayer.allCharpterInfo[lastID.zjid].enddbid;
					let totalPage1 = Math.ceil((endTalkId1 - startTalkId1 + 1) / this.maxInfoNum);
					let json1 = [];
					for (let i = 0; i < totalPage1; i++) {
						let info = [];
						for (let p = i * this.maxInfoNum; p < this.maxInfoNum * (i + 1); p++) {
							info.push(GameApp.MainPlayer.talkInfo[lastID.zjid].data[startTalkId1 + p])
						}
						json1.push(info);
						// }
						// this.updateTalkInfo(lastID.zjid)
					}
					lastTalkinfoArr = json1[totalPage1 - 1]
					// this.onlyGet = false;
					this.addJuQingTalkItem(lastTalkinfoArr, false, -1, totalPage1, totalPage1, lastID.pzid, lastID.zjid)
					this.addJuQingTalkItem(curTalkinfoArr, true, 0, page, totalPage, GameApp.MainPlayer.pianZhangID, zjid)
					nextTalkinfoArr = jsonArr[page - 1]
					this.addJuQingTalkItem(nextTalkinfoArr, false, 1, page, totalPage, GameApp.MainPlayer.pianZhangID, zjid)
				}
			}
			if (this.pageID == 2) {
				this.cantLastPage = false;
				this.addJuQingTalkItem(lastTalkinfoArr, true, -1, page, totalPage, GameApp.MainPlayer.pianZhangID, zjid)
				curTalkinfoArr = jsonArr[page - 2]
				this.addJuQingTalkItem(curTalkinfoArr, false, 0, page - 1, totalPage, GameApp.MainPlayer.pianZhangID, zjid)
				nextTalkinfoArr = jsonArr[page - 1]
				this.addJuQingTalkItem(nextTalkinfoArr, false, 1, page, totalPage, GameApp.MainPlayer.pianZhangID, zjid)
			} else if (this.pageID > 2 && this.pageID <= totalPage) {
				this.cantLastPage = false;
				lastTalkinfoArr = jsonArr[page - 3]
				this.addJuQingTalkItem(lastTalkinfoArr, false, -1, page - 2, totalPage, GameApp.MainPlayer.pianZhangID, zjid)
				curTalkinfoArr = jsonArr[page - 2]
				this.addJuQingTalkItem(curTalkinfoArr, false, 0, page - 1, totalPage, GameApp.MainPlayer.pianZhangID, zjid)
				nextTalkinfoArr = jsonArr[page - 1]
				this.addJuQingTalkItem(nextTalkinfoArr, false, 1, page, totalPage, GameApp.MainPlayer.pianZhangID, zjid)
			}
			else if (this.pageID == totalPage + 1) {
				this.cantLastPage = false;
				lastTalkinfoArr = jsonArr[this.pageID - 3]
				this.addJuQingTalkItem(lastTalkinfoArr, false, -1, this.pageID - 2, totalPage, GameApp.MainPlayer.pianZhangID, zjid)
				curTalkinfoArr = jsonArr[this.pageID - 2]
				this.addJuQingTalkItem(curTalkinfoArr, false, 0, this.pageID - 1, totalPage, GameApp.MainPlayer.pianZhangID, zjid)
				let next = this.getNextCharpterID(zjid);
				this.addJuQingTalkItem(nextTalkinfoArr, true, 1, page, totalPage, next.pzid, next.zjid)
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
			// this.box_pianZhang.event(Laya.UIEvent.MOUSE_UP, [true]);
			// 拉取剧情
			this.updateTalkInfo(item.charpterInfo.zjid);
		}



		//是否是第一篇的第一章
		public isFirstCharpter() {
			let zjid = GameApp.MainPlayer.charpterID;
			if (zjid > 10001) {
				return false;
			} else {
				return true;
			}

		}
		//获取下一个章节ID
		public getNextCharpterID(curCharpterID) {
			let pidArr = []
			for (let i in this.volumeArr) {
				pidArr.push(this.volumeArr[i].cnt)
			}
			let next = curCharpterID - 10001 + 10002;
			let pid;
			for (let i = 0; i < pidArr.length; i++) {
				let span = next - 10001
				if (span >= pidArr[0]) {
					if (span < pidArr[i] + pid[i - 1]) {
						pid = i + 1
					}
				} else {
					pid = 1
				}
			}
			let volumeID = this.volumeArr[pid].id;
			return { pzid: volumeID, zjid: next }
		}
		//获取上一个章节ID
		public getLastCharpterID(curCharpterID) {
			let pidArr = []
			for (let i in this.volumeArr) {
				pidArr.push(this.volumeArr[i].cnt)
			}
			let next = curCharpterID - 10001
			let pid;
			if (next <= 0) {
				return { pzid: 1001, zjid: -1 }
			} else {
				next += 10000
			}
			for (let i = 0; i < pidArr.length; i++) {
				let span = next - 10001
				if (span >= pidArr[0]) {
					if (span < pidArr[i] + pid[i - 1]) {
						pid = i + 1
					}
				} else {
					pid = 1
				}
			}
			let volumeID = this.volumeArr[pid].id;
			return { pzid: volumeID, zjid: next }
		}
		public boxStartX;
		public BoxEventListener() {
			let self = this;
			this.panel_read.on(Laya.Event.MOUSE_DOWN, this, function (ev) {
				self.boxStartX = self.getPosX(ev);
				self.touchBeginX = self.getPosX(ev)
				self.isTouch = true;
			})
			this.panel_read.on(Laya.Event.MOUSE_MOVE, this, function (ev) {
				// console.log('鼠标正在移动0')
				if (self.isTouch) {
					// console.log('鼠标正在移动1')
					let curX = self.getPosX(ev);
					let span = curX - self.boxStartX;
					let span1 = curX - self.touchBeginX;
					if (span1 == 0) {
						self.initBox();
					}
					console.log('span' + span + 'span1' + span1)
					if (span > 0) {
						if (this.cantLastPage) {
							self.initBox();
							return;
						}
						self.box3.x += span;
						self.boxStartX = curX;
						// console.log('鼠标正在移动box3X' + self.box3.x)
					}
					else if (span == 0) {
						self.initBox();
					}
					else if (span < 0) {
						self.box2.x += span;
						self.boxStartX = curX;
					}
				}

			})
			this.panel_read.on(Laya.Event.MOUSE_UP, this, function (ev) {
				// console.log('鼠标抬起')
				if (self.isTouch) {
					self.isTouch = false;
					self.dealEventMouse(ev)
				}
			})
			this.panel_read.on(Laya.Event.MOUSE_OUT, this, function (ev) {
				// console.log('鼠标失去')
				if (self.isTouch) {
					self.isTouch = false;
					self.dealEventMouse(ev)
				}

			})
		}
		public dealEventMouse(ev) {
			let self = this;
			let curX = self.getPosX(ev);
			let span = curX - self.touchBeginX;
			if (span > 0) {
				if (span >= Laya.stage.width / 3) {
					let basePage = this.pageID;
					basePage -= 1;
					if (basePage <= 0) {
						let boo = this.isFirstCharpter()
						if (boo) {
							TipsManage.showTips('已经是第一章了')
							this.initBox();
							return;
						}
						this.isTouch = false;
						this.touchEndX = 0;
						let lastID = this.getLastCharpterID(GameApp.MainPlayer.charpterID)
						if (GameApp.MainPlayer.pianZhangID != lastID.pzid) {
							GameApp.MainPlayer.pianZhangID = lastID.pzid;
							self.getPZMsg(lastID.pzid)
						}
						GameApp.MainPlayer.talkID = GameApp.MainPlayer.allCharpterInfo[lastID.zjid].enddbid;
						PanelManage.Main.view_scene._childs[0].init_noChange();
						GameApp.MainPlayer.charpterID = lastID.zjid;
						this.juQingPageID = Math.ceil((GameApp.MainPlayer.talkID - GameApp.MainPlayer.allCharpterInfo[GameApp.GameEngine.mainPlayer.charpterID].startdbid + 1) / this.maxInfoNum)
						if (lastID.zjid) {
							Laya.Tween.to(self.box3, { x: 0 }, 250, null, Laya.Handler.create(self, () => {
								self.initBox();
								this.updateTalkInfo(lastID.zjid);
								this.hasLookBack--;
							}))
						} else {
							return;
						}

						return;
					}
					else {
						Laya.Tween.to(self.box3, { x: 0 }, 250, null, Laya.Handler.create(self, () => {
							self.initBox();
							self.showPageMsg(self.pageID - 1)
						}))
					}
				} else {
					Laya.Tween.to(self.box3, { x: -640 }, 250);
				}
			} else if (span == 0) {
				self.initBox();
			}
			else if (span < 0) {
				console.log('该剧情最大页数' + this.juQingPageID)
				if (Math.abs(span) >= Laya.stage.width / 3) {
					if (this.pageID > this.juQingPageID) {
						let next = this.getNextCharpterID(GameApp.MainPlayer.charpterID)
						let zjidInTalkInfoArr = Object.keys(GameApp.MainPlayer.talkInfo);
						if (next.zjid <= parseInt(zjidInTalkInfoArr[zjidInTalkInfoArr.length - 1])) {
							Laya.Tween.to(self.box2, { x: -640 }, 250, null, Laya.Handler.create(self, () => {
								GameApp.MainPlayer.charpterID = next.zjid;
								self.initBox();
								this.hasLookBack++;
								self.showPageMsg(1)
								// let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.JQ_GET_JQ_vipSkipJuQing, [GameApp.MainPlayer.charpterID])
								// lcp.send(pkt);
							}))
						} else {
							// if (GameApp.MainPlayer.curCharpterHasPass) {
								let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.JQ_GET_JQ_vipSkipJuQing, [this.maxInfoNum])
								lcp.send(pkt);
							// } else {
							// 	TipsManage.showTips('尚未通关当前章节所有主线副本')
							// 	self.initBox();
							// 	return;
							// }

						}
					} else {
						if (this.hasLookBack < 0) {
							Laya.Tween.to(self.box2, { x: -640 }, 250, null, Laya.Handler.create(self, () => {
								this.showPageMsg(this.pageID + 1);
							}))
						} else if (this.hasLookBack == 0) {
							let startID = GameApp.MainPlayer.allCharpterInfo[GameApp.MainPlayer.charpterID].startdbid
							let nowPageTalkID = this.curReadInfo.pageID * this.maxInfoNum + startID - 1
							if (nowPageTalkID < GameApp.MainPlayer.talkID) {
								Laya.Tween.to(self.box2, { x: -640 }, 250, null, Laya.Handler.create(self, () => {
									this.showPageMsg(this.pageID + 1);
								}))
							} else {
								// if (this.isJuQing) {
								// 	TipsManage.showTips('剧情任务未完成')
								// 	this.initBox();
								// } else {
									let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.JQ_GET_JQ_vipSkipJuQing, [this.maxInfoNum], )
									lcp.send(pkt);
								// }

							}
						}






					}
				} else if (Math.abs(span) < Laya.stage.width / 2) {
					Laya.Tween.to(self.box2, { x: 0 }, 250);
				}

			}
		}

		//获得当前鼠标坐标
		public getPosX(ev) {
			let x = ev.stageX;
			return x;
		}
		public moveBox(out_X: number) {
			let span = out_X - this.touchBeginX;

		}
		public initBox() {
			this.box2.x = this.box1.x = this.box2.y = this.box1.y = this.box3.y = 0;
			this.box3.x = -640;
		}
	}
}