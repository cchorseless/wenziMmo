/**Created by the LayaAirIDE*/
module view.main {
	export class Main_JuQingItem extends ui.main.Main_JuQingItemUI {
		constructor() {
			super();
		}
		public setData(): Main_JuQingItem {
			this.panel_list.vScrollBarSkin = '';
			this.addEvent();
			this.get_novelPian();
			return this;
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
			//奖励
			EventManage.onWithEffect(this.btn_guaji, Laya.UIEvent.CLICK, this, () => {
					new view.juQingMode.JuQingPrizeDialog().setData().popup();
			});
			//任务
			EventManage.onWithEffect(this.btn_task, Laya.UIEvent.CLICK, this, function () {
				new view.dialog.TaskDialog().popup();
			})
			// 模式切换
			EventManage.onWithEffect(this.btn_changeMode, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel();
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
						// btn_Pian.mouseEnabled = false;
					}
					btn_Pian.labelFont = 'FZXK'
					btn_Pian.stateNum = 1;
					btn_Pian.labelSize = 22;
					btn_Pian.x = 0;
					btn_Pian.y = 0;
					let box_juqingdown = new Laya.Box;
					box_juqingdown['sortItem'] = (items) => { };
					box_juqingdown.scaleY = 0;
					box_juqingdown.y = btn_Pian.height + 10;
					box_juqingdown.x = 25;
					let box_juqing = new Laya.Box;
					box_juqing.width = btn_Pian.width = 162;
					box_juqing.height = btn_Pian.height = 41;
					box_juqing.addChildren(btn_Pian, box_juqingdown);
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
				let btnNum;
				for (let child of this.panel_list._childs[0]._childs) {
					if (child._childs[0].label == name0) {
						child._childs[1].scaleY = 1;
						let num = 0;
						child._childs[1].removeChildren();
						for (let charpter in jsonData.charpterInfo) {
							let data: ProtoCmd.itf_JUQING_CHARPTERINFO = jsonData.charpterInfo[charpter];
							let btn_juqing = new Laya.Button;
							btn_juqing.stateNum = 2;
							if (data.zjid == GameApp.MainPlayer.charpterID) {
								btn_juqing.selected = true;
								btnNum = (num + 1);
							} else {
								btn_juqing.selected = false;
							}
							if (data.zjid <= GameApp.MainPlayer.charpterID) {
								btn_juqing.skin = 'image/main/main_zonglan/btn_zhangjie.png';
								btn_juqing.mouseEnabled = true;
							} else {
								btn_juqing.skin = 'image/main/main_zonglan/btn_zhangjie.png';
								// btn_juqing.mouseEnabled = false;
							}
							btn_juqing.labelColors = '#8c6240,#18466b';
							btn_juqing.labelSize = 20;
							btn_juqing.labelFont = 'FZXK';
							btn_juqing.label = data.name;
							btn_juqing.y = (btn_juqing.height + 10) * num;
							child._childs[1].addChild(btn_juqing);
							num += 1;
						}
						child.height = child._childs[0].height + child._childs[1].height;
						//当前章
						if (parseInt(id) == GameApp.MainPlayer.pianZhangID) {
							this.init_chapter(jsonData, btnNum);
						}
						//切换章节
						for (let index in child._childs[1]._childs) {
							child._childs[1]._childs[index].on(Laya.UIEvent.CLICK, this, () => {
								let btn = child._childs[1]._childs[index];
								for (let btns of child._childs[1]._childs) {
									btns.selected = false;
								}
								btn.selected = true;
								this.init_chapter(jsonData, (parseInt(index) + 1));
							})
						}

						break;
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

			}
			//章序
			this.lbl_zhang.text = '第' + GameUtil.SectionToChinese(index, 0) + '章';
			this.lbl_chapterName.x = this.lbl_zhang.x + this.lbl_zhang.width
			this.lbl_chapterName.text = data.charpterInfo[index].name;
			//章节描述
			this.lbl_des.text = data.charpterInfo[index].intro;
			if (this.lbl_des.height > 116) {
				this.lbl_mubiao.y = this.lbl_des.y + this.lbl_des.height + 10;
			} else {
				this.lbl_mubiao.y = 324;
			}
			let juqing = GameApp.GameEngine.taskInfo[EnumData.TaskType.JUQINGEVENT]
			this.div_target.style.color = '#63491a';
			this.div_target.style.fontSize = 22;
			this.div_target.style.font = 'STLiti';
			//剧情目标
			if (juqing) {
				for (let part in juqing) {
					let juqingItem = juqing[part];
					this.div_target.innerHTML = '' + juqing[part].target;
				}
			} else {
				this.div_target.innerHTML = '暂无剧情任务内容';
			}
			//主线任务
			let zhuxianTask = GameApp.GameEngine.taskInfo[EnumData.TaskType.SYSTEM];
			this.div_zhuxiandes.style.color = '#63491a';
			this.div_zhuxiandes.style.fontSize = 22;
			this.div_zhuxiandes.style.font = 'STLiti';
			if (zhuxianTask) {
				for (let i in zhuxianTask) {
					let taskInfo: ProtoCmd.stQuestInfoBase = zhuxianTask[i]
					this.lbl_zhuxianName.text = taskInfo.questname;
					this.div_zhuxiandes.innerHTML = taskInfo.des;
					this.lbl_state1.visible = true;
					this.lbl_state1.x = this.lbl_zhuxianName.x + this.lbl_zhuxianName.width;
					if (taskInfo.queststatus < 3) {
						this.lbl_zhuxianState.text = '未完成';
						this.lbl_zhuxianState.color = '#c43939';
					} else {
						this.lbl_zhuxianState.text = '已完成';
						this.lbl_zhuxianState.color = '#39ad32';
					}
				}
			} else {
				this.lbl_zhuxianName.text = '暂无主线任务';
				this.lbl_state1.visible = false;
				this.div_zhuxiandes.innerHTML = '';
			}
			//支线任务
			let zhixianTask = GameApp.GameEngine.taskInfo[EnumData.TaskType.LIFEEXP];
			this.div_zhixiandes.style.color = '#63491a';
			this.div_zhixiandes.style.fontSize = 22;
			this.div_zhixiandes.style.font = 'STLiti';
			function compare(property) {
				return function (a, b) {
					var value1 = a[property];
					var value2 = b[property];
					return value2 - value1;
				}
			}
			let zhixian = [];
			for (let j in zhixianTask) {
				zhixian.push(zhixianTask[j]);
			}
			zhixian = zhixian.sort(compare('queststatus'));
			if (zhixian[0]) {
				let zhiTaskInfo: ProtoCmd.stQuestInfoBase = zhixian[0]
				this.lbl_zhixianName.text = zhiTaskInfo.questname;
				this.div_zhixiandes.innerHTML = zhiTaskInfo.des;
				this.lbl_state2.visible = true;
				this.lbl_state2.x = this.lbl_zhixianName.x + this.lbl_zhixianName.width;
				if (zhiTaskInfo.queststatus < 3) {
					this.lbl_zhixianState.text = '未完成';
					this.lbl_zhixianState.color = '#c43939';
				} else {
					this.lbl_zhixianState.text = '已完成';
					this.lbl_zhixianState.color = '#39ad32';
				}

			} else {
				this.lbl_zhixianName.text = '暂无支线任务';
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
			//挂机效率
			for (let item in data.charpterInfo[index].items) {
				let single = data.charpterInfo[index].items[item]
				switch (single.index) {
					// 金币
					case 20015:
						this.lbl_jinbi.text = single.num + '/h';
						break;
					// 玩家经验
					case EnumData.CoinType.COIN_TYPE_PLAYER_EXP:
						this.lbl_exp.text = single.num + '/h';
						break;
					// 英雄经验
					case EnumData.CoinType.COIN_TYPE_HERO_EXP:
						break;
				}
			}
		}
	}
}