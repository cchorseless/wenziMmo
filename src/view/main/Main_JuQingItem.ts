/**Created by the LayaAirIDE*/
module view.main {
	export class Main_JuQingItem extends ui.main.Main_JuQingItemUI {
		public static self: Main_JuQingItem;
		constructor() {
			super();
			Main_JuQingItem.self = this;
		}
		public nowZJid;
		public data;
		public index;
		//5002福州5003华山50041玉壶瀑布5005药王庄5006洛阳城5007良人镇5012嵩山派
		public mapArray = [5002, 5003, 5004, 5005, 5006, 5007, 5012,5013,5015]
		public setData(): void {
			this.panel_list.vScrollBarSkin = '';
			this.panel_map.hScrollBarSkin = '';
			//当前所在地名称
			if (GameApp.SceneManager.chenkPlayerInFuBen()) {
				this.lbl_nowPlace.text = GameApp.MainPlayer.mapName
			} else {
				let roomName = SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + GameApp.MainPlayer.roomId);
				this.lbl_nowPlace.text = GameApp.MainPlayer.mapName + roomName;
			}
			//当前所在地图位置
			let locationmapid = GameApp.MainPlayer.location.mapid;
			let mapBtn: Laya.Button = this['btn_' + locationmapid];
			if (mapBtn) {
				this.img_pos.x = mapBtn.x;
				this.img_pos.y = mapBtn.y;
				mapBtn.filters = [new Laya.GlowFilter('#ffc871', 50)];
			}
			this.addEvent();
			this.get_novelPian();

		}
		public addEvent(): void {
			for (let mapid of this.mapArray) {
				EventManage.onWithEffect(this['btn_' + mapid], Laya.UIEvent.CLICK, this, () => {
						new view.main.Main_PlaceDialog().setData(mapid).popup();
				})
			}
			EventManage.onWithEffect(this.btn_guaji, Laya.UIEvent.CLICK, this, () => {
				new view.juQingMode.JuQingPrizeDialog().setData().popup();
			});
			//任务
			EventManage.onWithEffect(this.btn_task, Laya.UIEvent.CLICK, this, function () {
				new view.dialog.TaskDialog().setData().popup();
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
				for (let mapid of this.mapArray) {
					this['btn_' + mapid].filters = null;
				}
				//当前所在地名称
				if (GameApp.SceneManager.chenkPlayerInFuBen()) {
					this.lbl_nowPlace.text = GameApp.MainPlayer.mapName;
				} else {
					let roomName = SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + GameApp.MainPlayer.roomId);
					this.lbl_nowPlace.text = GameApp.MainPlayer.mapName + roomName;
				}
				//当前所在地图位置
				let locationmapid = GameApp.MainPlayer.location.mapid;
				let mapBtn: Laya.Button = this['btn_' + locationmapid];
				if (mapBtn) {
					this.img_pos.x = mapBtn.x;
					this.img_pos.y = mapBtn.y;
					mapBtn.filters = [new Laya.GlowFilter('#ffc871', 50)];
				}
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
					if (GameApp.MainPlayer.pianZhangID >= parseInt(pianzhang[pian][0])) {
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
							btn_juqingDown.selected = false;
							//当前章
							if (data.zjid <= GameApp.MainPlayer.charpterID) {
								btn_juqingDown.skin = 'image/main/main_zonglan/btn_zhangjie.png';
								btn_juqingDown.labelColors = '#8c6240,#18466b';
								btn_juqingDown.x = 0;
								if (data.zjid == GameApp.MainPlayer.charpterID) {
									btn_juqingDown.selected = true;
									this.init_chapter(jsonData, parseInt(key));
								}
							} else {
								btn_juqingDown.x = 5;
								btn_juqingDown.skin = 'image/main/main_zonglan/btn_suoding.png';
								btn_juqingDown.labelColors = '#8a7e74,#5a7285';
							}
							btn_juqingDown.labelSize = 20;
							btn_juqingDown.labelFont = 'FZXK';
							btn_juqingDown.label = data.name;
							btn_juqingDown.y = (btn_juqingDown.height + 8) * (parseInt(key) - 1)
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
					else {
						child._childs[0].selected = false;
						child.height = child._childs[0].height;
						child._childs[1].scaleY = 0;
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
			this.index = index;
			this.data = data;
			this.nowZJid = data.charpterInfo[index].zjid
			if (data.charpterInfo[index].zjid == GameApp.MainPlayer.charpterID) {
				GameApp.MainPlayer.allCharpterInfo[GameApp.MainPlayer.charpterID] = data.charpterInfo[index];
				GameApp.MainPlayer.allCharpterInfo[GameApp.MainPlayer.charpterID].index = index;
				//当前挂机效率
				for (let part in data.charpterInfo[index].items) {
					let item = data.charpterInfo[index].items
					switch (item[part].index) {
						// 金币
						case 20015:
							this.lbl_jinbi.text = item[part].num + '/时';
							break;
						// 玩家经验
						case EnumData.CoinType.COIN_TYPE_PLAYER_EXP:
							this.lbl_exp.text = item[part].num + '/时';
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
			let str = data.charpterInfo[index].intro;
			let des = str.replace(/_/g, "");
			this.lbl_des.text = '' + des;
			this.init_noChange();
		}
		/**
		 * 刷新任務信息
		 */
		public init_noChange(): void {
			//剧情任务
			this.img_juqing.visible = true;
			this.box_juqing.visible = false;
			this.div_target.style.fontFamily = 'STLiti';
			if (this.nowZJid > GameApp.MainPlayer.charpterID) {
				this.lbl_dangqian.visible = false;
				this.lbl_all.text = '未解锁';
				this.lbl_all.color = '#c43939'
				this.lbl_all.x = 496;
				this.lbl_juqing.text = '';
				this.img_juqing.skin = 'image/main/main_zonglan/font_shanyu.png';
			}
			if (this.nowZJid < GameApp.MainPlayer.charpterID) {
				this.lbl_dangqian.visible = false;
				this.lbl_all.text = '已完成';
				this.lbl_all.color = '#38ad32'
				this.lbl_all.x = 496;
				this.lbl_juqing.text = '';
				this.img_juqing.skin = 'image/main/main_zonglan/font_yiwancheng.png';
			}

			this.div_target.style.fontSize = 22;
			if (this.nowZJid == GameApp.MainPlayer.charpterID) {
				//页数
				let maxInfoNum;
				let boo = PanelManage.getAspectRatio()
				if (boo) {
					maxInfoNum = 8
				} else {
					maxInfoNum = 7
				}
				let total = Math.ceil((this.data.charpterInfo[this.index].enddbid - this.data.charpterInfo[this.index].startdbid + 1) / maxInfoNum);
				let now = Math.ceil((GameApp.MainPlayer.talkID - this.data.charpterInfo[this.index].startdbid + 1) / maxInfoNum);
				if (now > 0) {
					this.lbl_dangqian.visible = true;
					this.lbl_dangqian.text = '' + now;
					this.lbl_all.text = '/' + total + '页';
					this.lbl_all.color = '#2c2d27'
					this.lbl_all.x = this.lbl_dangqian.x + this.lbl_dangqian.width;
				}
				//剧情事件
				let juqing = GameApp.GameEngine.taskInfo[EnumData.TaskType.JUQINGEVENT]
				if (juqing) {
					for (let part in juqing) {
						this.box_juqing.visible = true;
						this.img_juqing.visible = false;
						this.div_target.innerHTML = '' + juqing[part].target;
						this.lbl_juqing.text = '欲知后事如何，请完成剧情目标';
					}
				} else {
					this.lbl_juqing.text = '';
					this.img_juqing.skin = 'image/main/main_zonglan/font_qingyudu.png'
				}
			}
			let zhuxianTask = GameApp.GameEngine.taskInfo[EnumData.TaskType.SYSTEM];
			let zhixianTask = GameApp.GameEngine.taskInfo[EnumData.TaskType.LIFEEXP];
			this.div_zhuxiandes.style.color = this.div_zhixiandes.style.color = '#63491a';
			this.div_zhuxiandes.style.fontSize = this.div_zhixiandes.style.fontSize = 22;
			//主线任务
			if (zhuxianTask) {
				this.lbl_zhuxianState.visible = true;
				for (let i in zhuxianTask) {
					let taskInfo: ProtoCmd.stQuestInfoBase = zhuxianTask[i]
					this.lbl_zhuxianName.text = taskInfo.questname;
					this.div_zhuxiandes.innerHTML = taskInfo.des;
					if (taskInfo.queststatus >= 2) {
						this.lbl_zhuxianState.color = '#39ad32';
						this.lbl_zhuxianState.text = '已完成';
					} else {
						this.lbl_zhuxianState.color = '#ca3939';
						this.lbl_zhuxianState.text = '未完成';
					}
					this.lbl_zhuxianState.x = this.lbl_zhuxianName.x + this.lbl_zhuxianName.width + 10;
				}
			} else {
				this.lbl_zhuxianState.visible = false;
				this.lbl_zhuxianName.text = '暂无';
				this.div_zhuxiandes.innerHTML = '';
				this.lbl_zhuxianState.text = '';
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
				this.lbl_zhixianState.visible = true;
				this.lbl_zhixianName.text = zhixian[0].questname;
				this.lbl_zhixianState.x = this.lbl_zhixianName.x + this.lbl_zhixianName.width + 10;
				this.div_zhixiandes.innerHTML = zhixian[0].des;
				if (zhixian[0].queststatus >= 2) {
					this.lbl_zhixianState.color = '#39ad32';
					this.lbl_zhixianState.text = '已完成';
				} else {
					this.lbl_zhixianState.color = '#ca3939';
					this.lbl_zhixianState.text = '未完成';
				}
			} else {
				this.lbl_zhixianState.visible = false;
				this.lbl_zhixianState.visible = false;
				this.lbl_zhixianName.text = '暂无';
				this.div_zhixiandes.innerHTML = '';
				this.lbl_zhixianState.text = '';
			}
			this.div_zhuxiandes.style.font = this.div_zhixiandes.style.font = 'STLiti';
		}
	}
}