/**Created by the LayaAirIDE*/
module view.main {
	export class Main_JuQingItem extends ui.main.Main_JuQingItemUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_list.vScrollBarSkin = '';
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
			EventManage.onWithEffect(this.btn_guaji, Laya.UIEvent.CLICK, this, () => {
				new view.juQingMode.JuQingPrizeDialog().setData().popup();
			});
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
						btn_Pian.mouseEnabled = false;
					}
					btn_Pian.stateNum = 1;
					btn_Pian.labelSize = 22;
					btn_Pian.x = 0;
					btn_Pian.y = 0;
					let tab_juqing = new Laya.Tab;
					tab_juqing.stateNum = 2;
					tab_juqing.direction = 'vertical';
					tab_juqing.skin = 'image/main/main_zonglan/btn_zhangjie.png';
					tab_juqing.scaleY = 0;
					tab_juqing.y = btn_Pian.height + 10;
					tab_juqing.x = 25;
					tab_juqing.space = 10;
					tab_juqing.labelColors = '#8c6240,#18466b';
					tab_juqing.labelSize = 20;
					tab_juqing.labelFont = btn_Pian.labelFont = 'FZXK';
					let box_juqing = new Laya.Box;
					box_juqing.width = btn_Pian.width = 162;
					box_juqing.height = btn_Pian.height = 41;
					box_juqing.addChildren(btn_Pian, tab_juqing);
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
				let data: ProtoCmd.itf_JUQING_CHARPTERINFO = jsonData.charpterInfo;
				let label;
				let dangqian;
				for (let index in data) {
					let part = jsonData.charpterInfo[index];
					if (label == undefined) {
						label = part.name;
					} else {
						label = label + ',' + part.name;
					}
					if (GameApp.MainPlayer.charpterID == data[index].zjid) {
						dangqian = parseInt(index) - 1;
					}
				}
				let name0 = SheetConfig.juQingPianZhangSheet.getInstance(null).NAME('' + jsonData.pzid);
				for (let child of this.panel_list._childs[0]._childs) {
					if (child._childs[0].label == name0) {
						child._childs[1].scaleY = 1;
						child._childs[1].labels = label;
						child.height = child._childs[0].height + child._childs[1].height;
						//当前章
						if (parseInt(id) == GameApp.MainPlayer.pianZhangID) {
							child._childs[1].selectedIndex = dangqian;
							this.init_chapter(jsonData, (dangqian + 1))
						}
						//切换章节
						child._childs[1].selectHandler = Laya.Handler.create(this, (index) => {
							let tabNum = index + 1;
							this.init_chapter(jsonData, tabNum)
						}, null, false);
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
			this.lbl_zhang.text = '第' + GameUtil.SectionToChinese(index,0) + '章';
			this.lbl_chapterName.text = data.charpterInfo[index].name;
			this.lbl_des.text = data.charpterInfo[index].intro;
			let zhuxianTask = GameApp.GameEngine.taskInfo[EnumData.TaskType.SYSTEM];
			this.div_zhuxiandes.style.color = '#63491a';
			this.div_zhuxiandes.style.fontSize = 22;
			this.div_zhuxiandes.style.font = 'STLiti';
			let juqing = GameApp.GameEngine.taskInfo[EnumData.TaskType.JUQINGEVENT]
			if (juqing) {
				for (let juqingTask of juqing) {
					this.lbl_target.text = '' + juqingTask.target;
				}
			} else {
				this.lbl_target.text = '暂无剧情任务内容';
			}
			for (let i in zhuxianTask) {
				let taskInfo: ProtoCmd.stQuestInfoBase = zhuxianTask[i]
				this.lbl_zhuxianName.text = taskInfo.questname.split(':')[1];
				this.div_zhuxiandes.innerHTML = taskInfo.des;
				if (taskInfo.queststatus < 3) {
					this.lbl_zhuxianState.text = '未完成';
					this.lbl_zhuxianState.color = '#c43939';
				} else {
					this.lbl_zhuxianState.text = '已完成';
					this.lbl_zhuxianState.color = '#39ad32';
				}
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
			for (let item of data.charpterInfo[index].items) {
				switch (item.index) {
					// 金币
					case EnumData.CoinType.COIN_TYPE_GOLD:
						this.lbl_jinbi.text = item.num + '/h';
						break;
					// 玩家经验
					case EnumData.CoinType.COIN_TYPE_PLAYER_EXP:
						this.lbl_exp.text = item.num + '/h';
						break;
					// 英雄经验
					case EnumData.CoinType.COIN_TYPE_HERO_EXP:
						break;
				}
			}
		}
	}
}