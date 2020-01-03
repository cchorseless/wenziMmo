/**Created by the LayaAirIDE*/
module view.main {
	export class Main_JuQingItem extends ui.main.Main_JuQingItemUI {
		public static self: Main_JuQingItem;
		constructor() {
			super();
			Main_JuQingItem.self = this;
		}

		public setData(): void {
			this.panel_list.vScrollBarSkin = '';
			this.panel_map.hScrollBarSkin = '';
			this.addEvent();
			this.get_novelPian();
		}
		public addEvent(): void {
			//福州
			EventManage.onWithEffect(this.btn_fuzhou, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.MAP_MOVE, [10001, 0]);
				lcp.send(pkt);
			})
			//洛阳
			EventManage.onWithEffect(this.btn_luoyang, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.MAP_MOVE, [14001, 0]);
				lcp.send(pkt);
			})
			//华山
			EventManage.onWithEffect(this.btn_huashan, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.MAP_MOVE, [11001, 0]);
				lcp.send(pkt);
			})
			//嵩山
			EventManage.onWithEffect(this.btn_songshan, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.MAP_MOVE, [20001, 0]);
				lcp.send(pkt);
			})
				//良人鎮
			EventManage.onWithEffect(this.btn_liangren, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.MAP_MOVE, [15001, 0]);
				lcp.send(pkt);
			})
			//玉壶瀑布
			EventManage.onWithEffect(this.btn_yuhu, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.MAP_MOVE, [12001, 0]);
				lcp.send(pkt);
			})
			//药王庄
			EventManage.onWithEffect(this.btn_yaowang, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.MAP_MOVE, [13001, 0]);
				lcp.send(pkt);
			})
			EventManage.onWithEffect(this.btn_guaji, Laya.UIEvent.CLICK, this, () => {
				new view.juQingMode.JuQingPrizeDialog().setData().popup();
			});
			EventManage.onWithEffect(this.btn_task, Laya.UIEvent.CLICK, this, function () {
				new view.dialog.TaskDialog().popup();
			})

			// 宅院界面
			EventManage.onWithEffect(this.btn_zhaiYuan, Laya.UIEvent.CLICK, this, function () {
				PanelManage.openZhaiYuanPanel()
			})
			// 阅读小说
			EventManage.onWithEffect(this.btn_changeMode, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel();
			})
			// 探索
			EventManage.onWithEffect(this.btn_gotoTanSuo, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTanSuoPanel();
			})
			this.addLcpEvent();
		}


		public addLcpEvent(): void {
			// 监听位置改变刷新界面
			GameApp.LListener.on(LcpEvent.UPDATE_UI_PLACE_DES, this, () => {
				this.lbl_nowPlace.text = '当前位置:' + '地图ID' + GameApp.MainPlayer.location.mapid + '房间ID' + GameApp.MainPlayer.roomId;
			})
		}
		/**
	  * 剧情信息
	  */
		public get_novelPian(): void {
			if (GameApp.MainPlayer.pianZhangID) {
				let pianzhang = SheetConfig.juQingPianZhangSheet.getInstance(null).data;
				let i = 0;
				this.panel_list.removeChildren();
				for (let pian in pianzhang) {
					let btn_Pian = new Laya.Button;
					btn_Pian.label = pianzhang[pian][1];
					if (GameApp.MainPlayer.pianZhangID == parseInt(pianzhang[pian][0])) {
						btn_Pian.skin = 'image/main/main_zonglan/img_juanzhou.png';
						btn_Pian.labelColors = '#0f0225';
						btn_Pian.mouseEnabled = true;
					} else {
						btn_Pian.skin = 'image/main/main_zonglan/img_juanzhou_lock.png';
						btn_Pian.labelColors = '#ffffff';
						btn_Pian.mouseEnabled = false;
					}
					btn_Pian.stateNum = 1;
					btn_Pian.labelSize = 22;
					btn_Pian.x = 0;
					btn_Pian.y = 0;
					btn_Pian.labelFont = 'FZXK'
					let box_juqingDown = new Laya.Box;
					box_juqingDown.scaleY = 0;
					box_juqingDown.y = btn_Pian.height + 10;
					box_juqingDown.x = 25;
					let box_juqing = new Laya.Box;
					box_juqing.width = btn_Pian.width = 162;
					box_juqing.height = btn_Pian.height = 41;
					box_juqing.addChildren(btn_Pian, box_juqingDown);
					box_juqing.y = (box_juqing.height + 10) * i;
					this.panel_list.addChild(box_juqing);
					if (parseInt(pianzhang[pian][0]) == GameApp.MainPlayer.pianZhangID) {
						btn_Pian.selected = !btn_Pian.selected;
						this.getPanelMsg(btn_Pian.selected, GameApp.MainPlayer.pianZhangID.toString());
					}
					btn_Pian.on(Laya.UIEvent.CLICK, this, () => {
						if (btn_Pian.mouseEnabled) {
							btn_Pian.selected = !btn_Pian.selected;
							this.getPanelMsg(btn_Pian.selected, pianzhang[pian][0]);
						}
					})
					i += 1;
				}
			}
		}
		/**
		 * 篇章信息发包
		 * @param isopen 打开或关闭
		 * @param id 
		 */
		public getPanelMsg(isopen, id) {
			if (isopen) {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.JQ_GET_JQ_ZHANGJIE, [id], null, this, (jsonData) => {
					this.init_novelPian(jsonData, id);
				})
				lcp.send(pkt);
			} else {
				this.init_novelPian(undefined, id);
			}
		}
		/**
		 * 打开或关闭篇章信息
		 * @param jsonData 
		 * @param id 篇章id
		 */
		public init_novelPian(jsonData, id): void {
			//打开篇章
			if (jsonData) {
				let name0 = SheetConfig.juQingPianZhangSheet.getInstance(null).NAME('' + jsonData.pzid);
				for (let child of this.panel_list._childs[0]._childs) {
					if (child._childs[0].label == name0) {
						child._childs[1].scaleY = 1;
						child._childs[1].removeChildren();
						for (let key in jsonData.charpterInfo) {
							let data: ProtoCmd.itf_JUQING_CHARPTERINFO = jsonData.charpterInfo[key];
							let btn_juqingDown = new Laya.Button;
							btn_juqingDown.stateNum = 2;
							//当前章
							if (data.zjid == GameApp.MainPlayer.charpterID) {
								btn_juqingDown.selected = true;
								btn_juqingDown.skin = 'image/main/main_zonglan/btn_zhangjie.png';
								btn_juqingDown.mouseEnabled = true;
								this.init_chapter(jsonData, parseInt(key))
							} else {
								btn_juqingDown.selected = false;
								btn_juqingDown.skin = 'image/main/main_zonglan/btn_zhangjie.png';
								btn_juqingDown.mouseEnabled = false;
							}
							btn_juqingDown.labelColors = '#8c6240,#18466b';
							btn_juqingDown.labelSize = 20;
							btn_juqingDown.labelFont = 'FZXK';
							btn_juqingDown.label = data.name;
							btn_juqingDown.y = (btn_juqingDown.height + 10) * (parseInt(key) - 1)
							child._childs[1].addChild(btn_juqingDown);
						}
						child.height = child._childs[0].height + child._childs[1].height;
						//切换章节
						for (let i in child._childs[1]._childs) {
							child._childs[1]._childs[i].on(Laya.UIEvent.CLICK, this, () => {
								for (let btn of child._childs[1]._childs) {
									btn.selected = false;
								}
								child._childs[1]._childs[i].selected = true;
								this.init_chapter(jsonData, parseInt(i) + 1);
							})
						}
					}
				}

			}
			//关闭篇章 
			else {
				let name1 = SheetConfig.juQingPianZhangSheet.getInstance(null).NAME('' + id);
				for (let box_juqing of this.panel_list._childs[0]._childs) {
					if (box_juqing._childs[0].label == name1) {
						box_juqing._childs[1].scaleY = 0;
						box_juqing.width = 162;
						box_juqing.height = 41;
						break;
					}
				}
			}
			//目录位置重排
			for (let key in this.panel_list._childs[0]._childs) {
				let item = this.panel_list._childs[0]._childs[key];
				let item1 = this.panel_list._childs[0]._childs[parseInt(key) - 1];
				if (item1) {
					item.y = (item1.y + item1.height + 10);
				} else {
					item.y = 0;
				}
			}
		}
		/**
		 * 当前剧情信息
		 * @param data 
		 * @param index 所选章节
		 */
		public init_chapter(data, index): void {
			if (data.charpterInfo[index].zjid == GameApp.MainPlayer.charpterID) {
				GameApp.MainPlayer.allCharpterInfo[GameApp.MainPlayer.charpterID] = data.charpterInfo[index];
				GameApp.MainPlayer.allCharpterInfo[GameApp.MainPlayer.charpterID].index = index;
				//当前挂机效率
				for (let part in data.charpterInfo[index].items) {
					let item = data.charpterInfo[index].items
					switch (item[part].index) {
						// 金币
						case 200015:
							this.lbl_jinbi.text = item[part].num + '/h';
							break;
						// 玩家经验
						case EnumData.CoinType.COIN_TYPE_PLAYER_EXP:
							this.lbl_exp.text = item[part].num + '/h';
							break;
						// 英雄经验
						case EnumData.CoinType.COIN_TYPE_HERO_EXP:
							break;
					}
				}
			}
			this.lbl_zhang.text = '第' + GameUtil.SectionToChinese(index, 0) + '章';
			//章节名
			this.lbl_chapterName.x = this.lbl_zhang.x + this.lbl_zhang.width + 15;
			this.lbl_chapterName.text = data.charpterInfo[index].name;
			this.lbl_des.text = data.charpterInfo[index].intro;
			if (this.lbl_des.height > 115) {
				this.lbl_target.y = this.lbl_des.y + this.lbl_des.height + 35;
			} else {
				this.lbl_target.y = 356;
			}
			let juqing = GameApp.GameEngine.taskInfo[EnumData.TaskType.JUQINGEVENT]
			if (juqing) {
				for (let juqingTask of juqing) {
					this.lbl_target.text = '' + juqingTask.target;
				}
			} else {
				this.lbl_target.text = '暂无剧情任务内容';
			}
			let zhuxianTask = GameApp.GameEngine.taskInfo[EnumData.TaskType.SYSTEM];
			let zhixianTask = GameApp.GameEngine.taskInfo[EnumData.TaskType.LIFEEXP];
			this.div_zhuxiandes.style.color = this.div_zhixiandes.style.color = '#63491a';
			this.div_zhuxiandes.style.fontSize = this.div_zhixiandes.style.fontSize = 22;
			this.div_zhuxiandes.style.font = this.div_zhixiandes.style.font = 'STLiti';
			//主线任务
			if (zhuxianTask) {
				for (let i in zhuxianTask) {
					let taskInfo: ProtoCmd.stQuestInfoBase = zhuxianTask[i]
					this.lbl_zhuxianName.text = taskInfo.questname;
					this.div_zhuxiandes.innerHTML = taskInfo.des;
					if (taskInfo.queststatus < 3) {
						this.lbl_zhuxianState.text = '未完成';
						this.lbl_zhuxianState.color = '#c43939';
					} else {
						this.lbl_zhuxianState.text = '已完成';
						this.lbl_zhuxianState.color = '#39ad32';
					}
					this.lbl_state1.visible = true;
					this.lbl_state1.x = this.lbl_zhuxianName.x + this.lbl_zhuxianName.width;
				}
			} else {
				this.lbl_zhuxianName.text = '暂无';
				this.lbl_state1.visible = false;
				this.div_zhuxiandes.innerHTML = '';
			}
			//支线任务
			let zhixian = [];
			//根據位置排序
			function compare(property) {
				return function (a, b) {
					var value1 = a[property];
					var value2 = b[property];
					return value2 - value1;
				}
			}
			for (let i in zhixianTask) {
				zhixian.push(zhixianTask[i]);
			}
			zhixian = zhixian.sort(compare('queststatus'))
			if (zhixian[0]) {
				this.lbl_zhixianName.text = zhixian[0].questname;
				this.div_zhixiandes.innerHTML = zhixian[0].des;
				if (zhixian[0].queststatus < 3) {
					this.lbl_zhixianState.text = '未完成';
					this.lbl_zhixianState.color = '#c43939';
				} else {
					this.lbl_zhixianState.text = '已完成';
					this.lbl_zhixianState.color = '#39ad32';
				}
				this.lbl_state2.visible = true;
				this.lbl_state2.x = this.lbl_zhixianName.x + this.lbl_zhixianName.width;
			} else {
				this.lbl_zhixianName.text = '暂无';
				this.lbl_state2.visible = false;
				this.div_zhixiandes.innerHTML = '';
			}
			//页数
			let maxInfoNum;
			let boo = PanelManage.getAspectRatio()
			if (boo) {
				maxInfoNum = 8
			} else {
				maxInfoNum = 7
			}
			let total = Math.ceil((data.charpterInfo[index].enddbid - data.charpterInfo[index].startdbid + 1) / maxInfoNum);
			let now = Math.ceil((GameApp.MainPlayer.talkID - data.charpterInfo[index].startdbid + 1) / maxInfoNum);
			if (now > 0) {
				this.lbl_dangqian.visible = true;
				this.lbl_dangqian.text = '' + now;
				this.lbl_all.text = '/' + total + '页';
				this.lbl_all.x = 519;
			} else {
				this.lbl_dangqian.visible = false;
				this.lbl_all.text = '未解锁';
				this.lbl_all.x = 496;
			}

		}
	}
}