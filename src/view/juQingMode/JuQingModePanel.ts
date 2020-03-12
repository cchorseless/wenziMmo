/**Created by the LayaAirIDE*/
module view.juQingMode {
	export class JuQingModePanel extends ui.juQingMode.JuQingModePanelUI {
		public static self: JuQingModePanel;

		public muluShow = false;

		public muluItem: JuQing_MuLu;// 剧情目录

		public touchBeginX = 0;
		public isTouch = false;

		public curPzid;// 阅读的当前篇章ID
		public curCharpterid;// 阅读的当前章节ID
		public curpageID;// 阅读当前的页面ID

		constructor() {
			super();
			JuQingModePanel.self = this;
		}

		/**
		 * 单页显示对白条目数
		 */
		public get maxInfoNum(): number {
			return PanelManage.getAspectRatio() ? 8 : 7;
		}

		/**
		 * 是否有剧情事件
		 */
		public get isJuQing(): boolean {
			let taskInfo = GameApp.GameEngine.taskInfo[EnumData.TaskType.JUQINGEVENT];
			if (taskInfo) {
				return Boolean(Object.keys(taskInfo).length)
			}
			return false
		}

		/**
		 * 上一页
		 */
		public get lastReadInfo(): JuQing_ReadInfo {
			return this.box3.getChildAt(0) as JuQing_ReadInfo;
		};
		/**
		 * 当前页
		 */
		public get curReadInfo(): JuQing_ReadInfo {
			return this.box2.getChildAt(0) as JuQing_ReadInfo;
		}

		/**
		 * 下一页
		 */
		public get nextReadInfo(): JuQing_ReadInfo {
			return this.box1.getChildAt(0) as JuQing_ReadInfo;
		}



		public setData(): void {
			this.box_jiangLi.visible = false;
			this.getMuluData()
			this.initUI();
			this.addEvent();
		}


		/**
		 * 拉取目录
		 */
		public getMuluData() {
			if (GameApp.MainPlayer.allPianZhangInfo) {
				this.setMuLuMsg()
			}
			else {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.JQ_GET_JQ_PIANZHANG, null, null, this, (jsonData) => {
					this.setMuLuMsg()
				})
				lcp.send(pkt);
			}
		}

		/**
		 * 设置目录数据
		 */
		public setMuLuMsg() {
			this.muluItem = new JuQing_MuLu();
			this.muluItem.setData()
			this.muluItem.top = 0;
			this.muluItem.bottom = 0;
			this.muluItem.width = Laya.stage.width;
			this.muluItem.x = -1 * this.muluItem.width;
			this.addChild(this.muluItem);
			this.muluItem.visible = false;
		}


		public addEvent(): void {
			// 事件或奖励
			EventManage.onWithEffect(this.btn_next, Laya.UIEvent.CLICK, this, () => {
				if (this.isJuQing) {
					this.showJuQingEvent();
				} else {
					new view.juQingMode.JuQingPrizeDialog().setData().popup();
				}
			});
			// 滑动翻页事件
			this.BoxEventListener();

			// 场景模式
			EventManage.onWithEffect(this.btn_changeMode, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});
			// 天鉴界面
			EventManage.onWithEffect(this.btn_tianjian, Laya.Event.CLICK, this, function () {
				let pkt1 = new ProtoCmd.QuestClientData();
				pkt1.setString(ProtoCmd.SpecialRingPanel, null, 0, this, function (data) {
					let o = new tianJian.TianJianPanel();
					o.setData(data);
					o.popup();
				})
				pkt1.send();
			})

			// 目录界面
			EventManage.onWithEffect(this.btn_prize, Laya.UIEvent.CLICK, this, () => {
				this.muluShow = !this.muluShow;
				if (this.muluShow) {
					this.muluItem.visible = this.muluShow;
					Laya.Tween.to(this.muluItem, { x: 0 }, 300)
				} else {
					Laya.Tween.to(this.muluItem, { x: -1 * this.muluItem.width }, 300, null, Laya.Handler.create(this, () => {
						this.muluItem.visible = this.muluShow;
					}))
				}
			});

			// 指南界面
			EventManage.onWithEffect(this.btn_zhiNan, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openZhiNanPanel()
			});

			// 添加本地事件
			this.addLcpEvent()
		}

		/**
		 * 滑动监听
		 */
		public BoxEventListener() {
			this.box2.on(Laya.Event.MOUSE_DOWN, this, (ev) => {
				// this.boxStartX = this.getPosX(ev);
				this.touchBeginX = this.getPosX(ev)
				this.isTouch = true;
			})

			this.box2.on(Laya.Event.MOUSE_MOVE, this, (ev) => {
				if (this.isTouch) {
					let curX = this.getPosX(ev);
					// 考虑边际
					if (curX > 600 || curX < 40) {
						this.isTouch = false;
						this.dealEventMouse(ev);
						return
					}
					// 移动距离
					let span = curX - this.touchBeginX;
					// 向右滑动
					if (span >= 0) {
						// 首章首页不滑动
						if (!this.isFirstCharpterFirstPage()) {
							this.lastReadInfo.x = span;
						}
					}
					// 向左移动
					else {
						this.curReadInfo.x = span;
					}
				}
			})

			this.box2.on(Laya.Event.MOUSE_UP, this, (ev) => {
				// console.log('鼠标抬起')
				if (this.isTouch) {
					this.isTouch = false;
					this.dealEventMouse(ev)
				}
			})
		}

		public addLcpEvent(): void {
			// 翻页获取奖励
			GameApp.LListener.on(ProtoCmd.JQ_GET_JQ_readJuQing, this, (jsonData) => {
				// console.log(ProtoCmd.JQ_GET_JQ_readJuQing, jsonData);
				// 奖励动画
				this.box_jiangLi.visible = true;
				Laya.Tween.to(this.box_jiangLi, { x: 334, y: 1100, scaleX: 0.3, scaleY: 0.3 }, 600, null,
					Laya.Handler.create(this, () => {
						this.box_jiangLi.visible = false;
						this.box_jiangLi.pos(334, 914);
						this.box_jiangLi.scale(1, 1);
					})
				);
				// 翻页动画
				// 下一页移动到位
				Laya.Tween.to(this.curReadInfo, { x: -640 }, 250, null, Laya.Handler.create(this, () => {
					this.box1.addChild(this.lastReadInfo);
					this.box3.addChild(this.curReadInfo);
					this.box2.addChild(this.nextReadInfo);
					this.lastReadInfo.x = 0;
					this.curReadInfo.x = 0;
					this.nextReadInfo.x = 0;
					// 更新下一页的信息
					this.dealPageMsg(this.curReadInfo.chapterID, this.curReadInfo.pageID, 1);
				}))
			});
			// 拉取剧情对白数据
			GameApp.LListener.on(ProtoCmd.JQ_GET_JQ_JuQingInfo, this, this.updateJuQingTalkInfo);
		}

		public Dispose(): void {
			GameApp.LListener.offCaller(ProtoCmd.JQ_GET_JQ_readJuQing, this);
			GameApp.LListener.offCaller(ProtoCmd.JQ_GET_JQ_JuQingInfo, this);
			PopUpManager.Dispose(this);
		}




		public initUI(): void {
			let tmp1 = new JuQing_ReadInfo();
			let tmp2 = new JuQing_ReadInfo();
			let tmp3 = new JuQing_ReadInfo();
			tmp1.top = tmp1.bottom = tmp2.top = tmp2.bottom = tmp3.top = tmp3.bottom = 0;
			this.box3.addChild(tmp3);
			this.box1.addChild(tmp1);
			this.box2.addChild(tmp2);
			let charpterID = GameApp.MainPlayer.charpterID;
			this.updateTalkInfo(charpterID);
			// 判定是否有触发了剧情事件
			if (this.isJuQing) {
				this.btn_next.skin = 'image/juQingMode/icon_shijian.png'
				this.btn_next.label = '事件'
			}
			else {
				this.btn_next.skin = 'image/common/icon_baoxiang3_close.png'
				this.btn_next.label = '挂机'
			}
		}



		/**
		 * 拉取章节对白
		 * @param charpterID 章节ID
		 */
		public updateTalkInfo(charpterID): void {
			// 有剧情就return
			if (GameApp.MainPlayer.talkInfo[charpterID]) return;
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
			// console.log(jsonData, 'updateJuQingTalkInfo');
			// PanelManage.Main.view_scene._childs[0].setData();
			if (GameApp.MainPlayer.talkInfo[jsonData.zjid]) {
				GameApp.MainPlayer.talkInfo[jsonData.zjid].statetab = jsonData.statetab;
				// console.log(jsonData.data,GameApp.MainPlayer.talkInfo[jsonData.zjid].data)
				// 合并剧情对白
				Object['assign'](GameApp.MainPlayer.talkInfo[jsonData.zjid].data, jsonData.data);
				// 剧情拉完了,剧情分组存储
				if (jsonData.flag) {
					// console.log(111111111, '剧情拉完了');
					// 初始化工程
					if (this.curCharpterid == null) {
						// 章节进度
						let zjid = GameApp.MainPlayer.charpterID;
						let pageID = this.countPage();
						// console.log('===========', pageID);
						// 渲染界面
						this.dealPageMsg(zjid, pageID, -1);
						this.dealPageMsg(zjid, pageID, 0);
						this.dealPageMsg(zjid, pageID, 1);
					}

				}
			}
			else {
				GameApp.MainPlayer.talkInfo[jsonData.zjid] = jsonData;
			}
		}


		/**
		 * 计算当前页数
		 */
		public countPage(): number {
			// 对白进度
			let curtalkID = GameApp.MainPlayer.talkID;
			// 章节进度
			let zjid = GameApp.MainPlayer.charpterID;
			// 篇章进度
			let pzid = GameApp.MainPlayer.pianZhangID;
			// 当前章节信息
			let curCharpterInfo = GameApp.MainPlayer.allCharpterInfo[zjid];
			// 对白开始ID
			let startTalkId = curCharpterInfo.startdbid;
			// 对白结束ID
			let endTalkId = curCharpterInfo.enddbid;
			return Math.ceil((curtalkID - startTalkId) / this.maxInfoNum)
		}





		/**
		 * 获取页内容
		 * @param charpterID 
		 * @param pageID 
		 */
		public getPageMsg(charpterID, pageID) {
			let charpterDATA = GameApp.MainPlayer.allCharpterInfo[charpterID];
			let allData = GameApp.MainPlayer.talkInfo[charpterID];
			if (allData && charpterDATA) {
				// 开始对白ID
				let startTalkId = charpterDATA.startdbid;
				// 首页
				if (pageID == 0) {
					return charpterDATA
				}
				// 内容
				else {
					let result = [];
					let maxLineCount = this.maxInfoNum;
					for (let i = 0; i < maxLineCount; i++) {
						let lineID = startTalkId + (pageID - 1) * maxLineCount + i;
						result.push(allData.data[lineID]);
					}
					return result
				}
			}
		}

		/**
		 * 处理页面显示
		 * @param charpterID 
		 * @param pageID 
		 * @param index -1上一页，0当前，1下一页
		 */
		public dealPageMsg(charpterID, pageID, index) {
			let charpterInfo = GameApp.MainPlayer.allCharpterInfo[charpterID];
			// 对白开始ID
			let startTalkId = charpterInfo.startdbid;
			// 对白结束ID
			let endTalkId = charpterInfo.enddbid;
			// 篇章ID
			let pzid = charpterInfo.pzid;
			// 总页数
			let totalPage = charpterInfo.maxPage;
			// 当前章节
			this.curCharpterid = charpterID;
			// 当前页数
			this.curpageID = pageID;
			// 最后一页触发拉取下一章新剧情
			// console.log(pageID);
			if (pageID == -1) {
				// 拉取下一章剧情
				let nextCharpterID = this.getNextCharpterID(charpterID);
				// 保证 没有拉过
				if (nextCharpterID && GameApp.MainPlayer.talkInfo[nextCharpterID] == null) {
					this.updateTalkInfo(nextCharpterID);
				}

			}
			// 第一页触发拉取上一章剧情
			if (pageID == 1) {
				// 拉取上一章剧情
				let lastCharpterID = this.getLastCharpterID(charpterID);
				// 保证 没有拉过
				if (lastCharpterID && GameApp.MainPlayer.talkInfo[lastCharpterID] == null) {
					this.updateTalkInfo(lastCharpterID);
				}
			}

			let nextdata;
			let lastdata;
			if (index == 0) {
				// 当前页面数据
				let curdata = this.getPageMsg(charpterID, pageID);
				// 渲染当前页
				this.curReadInfo.setData(curdata, pageID, charpterID);
				return
			}
			// 首页
			if (pageID == 0) {
				// 下一页
				if (index == 1) {
					nextdata = this.getPageMsg(charpterID, pageID + 1);
					this.nextReadInfo.setData(nextdata, pageID + 1, charpterID);
					return
				}
				if (index == -1) {
					let lastCharpterID = this.getLastCharpterID(charpterID);
					// 上一章节
					if (lastCharpterID) {
						// 获取上一章节结束页
						this.lastReadInfo.setData(null, -1, lastCharpterID);
						return
					}

				}
			}
			// 内容最后一页
			else if (pageID == totalPage) {
				// 上一页
				if (index == -1) {
					lastdata = this.getPageMsg(charpterID, pageID - 1);
					this.lastReadInfo.setData(lastdata, pageID - 1, charpterID);
					return
				}
				// 下一页 章节结束页
				if (index == 1) {
					this.nextReadInfo.setData(nextdata, -1, charpterID);
					return
				}
			}
			// 章节最后一页
			else if (pageID == -1) {
				// 上一页
				if (index == -1) {
					lastdata = this.getPageMsg(charpterID, totalPage);
					this.lastReadInfo.setData(lastdata, totalPage, charpterID);
					return
				}
				// 下一页 
				if (index == 1) {
					let nextCharpterID = this.getNextCharpterID(charpterID);
					if (nextCharpterID) {
						// 下一章第0页
						nextdata = this.getPageMsg(nextCharpterID, 0);
						this.nextReadInfo.setData(nextdata, 0, nextCharpterID);
						return
					}

				}
			}

			// 中间
			else {
				// 上一页
				if (index == -1) {
					lastdata = this.getPageMsg(charpterID, pageID - 1);
					this.lastReadInfo.setData(lastdata, pageID - 1, charpterID);
					return
				}
				// 下一页
				if (index == 1) {
					nextdata = this.getPageMsg(charpterID, pageID + 1);
					this.nextReadInfo.setData(nextdata, pageID + 1, charpterID);
					return
				}
			}
		}



		/**
		 * 刷新主界面剧情进度信息
		 */
		public updateMainInfo(page) {
			//刷新剧情界面读小说页数进度
			PanelManage.Main.view_scene._childs[0].lbl_dangqian.text = '' + page;
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



		//获取下一个章节ID
		public getNextCharpterID(curCharpterID) {
			let curpzid = GameApp.MainPlayer.allCharpterInfo[curCharpterID].pzid;
			let volumeArr = GameApp.MainPlayer.allPianZhangInfo;
			for (let i = 1; volumeArr[i]; i++) {
				if (volumeArr[i].pzid == curpzid) {
					let charpterInfo = volumeArr[i].charpterInfo;
					for (let j = 1; charpterInfo[j]; j++) {
						let curcharpterInfo = charpterInfo[j];
						// 找到自己篇章
						if (curcharpterInfo.zjid == curCharpterID) {
							let nextcharpterInfo = charpterInfo[j + 1];
							// 本篇
							if (nextcharpterInfo) {
								return nextcharpterInfo.zjid
							}
							// 下一篇第一章
							else {
								if (volumeArr[i + 1]) {
									return volumeArr[i + 1].charpterInfo[1].zjid
								}
							}
						}
					}
					break
				}
			}
		}


		//获取上一个章节ID
		public getLastCharpterID(curCharpterID) {
			let curpzid = GameApp.MainPlayer.allCharpterInfo[curCharpterID].pzid;
			let volumeArr = GameApp.MainPlayer.allPianZhangInfo;
			for (let i = 1; volumeArr[i]; i++) {
				if (volumeArr[i].pzid == curpzid) {
					let charpterInfo = volumeArr[i].charpterInfo;
					for (let j = 1; charpterInfo[j]; j++) {
						let curcharpterInfo = charpterInfo[j];
						// 找到自己篇章
						if (curcharpterInfo.zjid == curCharpterID) {
							let lastcharpterInfo = charpterInfo[j - 1];
							// 本篇
							if (lastcharpterInfo) {
								return lastcharpterInfo.zjid
							}
							// 上一篇最后章
							else {
								if (volumeArr[i - 1]) {
									lastcharpterInfo = volumeArr[i - 1].charpterInfo
									let key = Object.keys(lastcharpterInfo).length;
									return volumeArr[i - 1].charpterInfo[key - 1].zjid
								}
							}
						}
					}
					break
				}
			}
		}

		/**
		 * 判断是否是第一章节第一页
		 */
		public isFirstCharpterFirstPage() {
			return this.curCharpterid == 10001 && this.curpageID == 0
		}

		/**
		 * 处理移动
		 * @param ev 
		 */
		public dealEventMouse(ev) {
			let curX = this.getPosX(ev);
			let span = curX - this.touchBeginX;
			let checkDIS = 200;
			// 向右，上一页
			if (span >= 0) {
				// 判断是否是首章首页
				if (this.isFirstCharpterFirstPage()) {
					Laya.Tween.to(this.lastReadInfo, { x: 0 }, 250)
					return
				}
				// 有效
				if (span >= checkDIS) {
					// 上一页移动到位
					Laya.Tween.to(this.lastReadInfo, { x: 640 }, 250, null, Laya.Handler.create(this, () => {
						this.box3.addChild(this.nextReadInfo);
						this.box1.addChild(this.curReadInfo);
						this.box2.addChild(this.lastReadInfo);
						this.lastReadInfo.x = 0;
						this.curReadInfo.x = 0;
						this.nextReadInfo.x = 0;
						// 更新上一页的信息
						this.dealPageMsg(this.curReadInfo.chapterID, this.curReadInfo.pageID, -1);
					}))

				}
				// 无效
				else {
					Laya.Tween.to(this.lastReadInfo, { x: 0 }, 250, null, Laya.Handler.create(this, () => {
					}))
				}
			}
			// 向左，下一页
			else {
				// 有效
				if (span <= -checkDIS) {
					// console.log(this.curpageID, this.countPage())
					// 判断是否有任务
					if (this.curCharpterid == GameApp.MainPlayer.charpterID && this.curpageID >= this.countPage()) {
						// 有剧情任务
						if (this.isJuQing) {
							Laya.Tween.to(this.curReadInfo, { x: 0 }, 250);
							this.showJuQingEvent();
							return
						}
						// 无剧情
						else {
							// 请求奖励
							// 要考虑任务中断的情况
							// 当前的ID
							let startTalkID = GameApp.MainPlayer.allCharpterInfo[GameApp.MainPlayer.charpterID].startdbid;
							let curTalkID = GameApp.MainPlayer.talkID - startTalkID;
							let infoCount = this.maxInfoNum * (this.curpageID + 1) - curTalkID;
							// console.log(infoCount, 'infoCount');
							let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.JQ_GET_JQ_vipSkipJuQing, [infoCount])
							lcp.send(pkt);
						}
					}
					else {
						// 下一页移动到位
						Laya.Tween.to(this.curReadInfo, { x: -640 }, 250, null, Laya.Handler.create(this, () => {
							this.box1.addChild(this.lastReadInfo);
							this.box3.addChild(this.curReadInfo);
							this.box2.addChild(this.nextReadInfo);
							this.lastReadInfo.x = 0;
							this.curReadInfo.x = 0;
							this.nextReadInfo.x = 0;
							// 更新下一页的信息
							this.dealPageMsg(this.curReadInfo.chapterID, this.curReadInfo.pageID, 1);
						}))
					}

				}
				// 无效
				else {
					Laya.Tween.to(this.curReadInfo, { x: 0 }, 250, null, Laya.Handler.create(this, () => {
					}))
				}
			}
		}


		public changeCharpter(v) {

		}


		//获得当前鼠标坐标
		public getPosX(ev) {
			let x = ev.stageX;
			return x;
		}
	}
}