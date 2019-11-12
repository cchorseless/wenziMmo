/**Created by the LayaAirIDE*/
module view.task {
	export class Task_MainPanel extends ui.task.Task_MainPanelUI {
		constructor() {
			super();
		}
		public zhuxianTask = null;
		public juqingTask = null;
		public taskEvent = null;
		public setData(): void {
			this.btn_juQingTask.selected = true;
			this.panel_zhiXian.vScrollBarSkin = '';
			this.vbox_zhiXian['sortItem'] = (items) => { };
			this.panel_jiangli.hScrollBarSkin = '';
			this.hbox_jiangli['sortItem'] = (items) => { };
			this.panel_juqing.hScrollBarSkin = '';
			this.hbox_juqing['sortItem'] = (items) => { };
			this.tab_0.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_0.selectedIndex = index;
			}, null, false);
			for (let i = 0; i < 3; i++) {
				this.vbox_zhiXian.addChild(new view.compart.TaskInfoItem())
			}

			this.initUI();
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel()
			});

			this.btn_changeMode.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});

			this.btn_achieveTask.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTask_ChengJiuPanel()
			});

			this.btn_dailyTask.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTask_DailyPanel()
			});

			this.btn_liLianTask.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTask_LiLianPanel()
			});

			this.btn_juQingTask.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTask_MainPanel()
			});
			//主线任务领取奖励
			this.btn_qianWang.on(Laya.UIEvent.CLICK, this, () => {
				this.taskEvent = this.zhuxianTask;
				this.init_zhuxianEvent();
			});
			//剧情任务领取奖励
			this.btn_get.on(Laya.UIEvent.CLICK, this, () => {
				this.taskEvent = this.juqingTask;
				this.init_juqingEvent();
			});

		}
		/**
		 * 主线任务信息&&剧情事件信息
		 */
		public initUI(): void {
			let zhuXianInfo = GameApp.GameEngine.taskInfo[EnumData.TaskType.SYSTEM];
			if (!zhuXianInfo) {
				throw new Error('没有拉取到主线任务');
			}
			else {
				// 任务信息
				let taskInfo: ProtoCmd.stQuestInfoBase = zhuXianInfo[Object.keys(zhuXianInfo)[0]];
				this.zhuxianTask = taskInfo;
				// 任务章节
				this.lbl_taskCharpter.text = '' + taskInfo.questname;
				//任务进度
				this.div_progress.style.fontSize = 22;
				this.btn_qianWang.gray = false;
				this.btn_qianWang.mouseEnabled = true;
				if (taskInfo.queststatus == 2) {
					this.div_progress.innerHTML = '已完成';
					this.btn_qianWang.label = '领取';
				} else {
					this.div_progress.innerHTML = '' + taskInfo.taskJinDu;
					this.btn_qianWang.label = '前往';
				}
				//任务奖励
				let str = taskInfo.jiangli;
				let numArr = str.match(/\d+/g);
				let keys = Object.keys(numArr);
				this.hbox_jiangli.removeChildren();
				for (let key of keys) {
					if (parseInt(key) % 2 == 0) {
						let itemInfo = new ProtoCmd.ItemBase();
						let ui_jiangli = new view.compart.DaoJuWithNameItem;
						itemInfo.dwBaseID = numArr[key];
						itemInfo.dwCount = numArr[key + 1];
						ui_jiangli.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL)
						this.hbox_jiangli.addChild(ui_jiangli);
					}
				}
			}
			//剧情任务
			let juQingInfo = GameApp.GameEngine.taskInfo[EnumData.TaskType.JUQINGEVENT];
			if (juQingInfo == undefined) {
				this.box_null.visible = true;
				this.box_juqing.visible = false;
			} else {
				this.box_null.visible = false;
				this.box_juqing.visible = true;
				let juqingTaskInfo: ProtoCmd.stQuestInfoBase = juQingInfo[Object.keys(juQingInfo)[0]];
				if (juqingTaskInfo !== undefined) {
					this.juqingTask = juqingTaskInfo;
					// 结束任务NPC
					if (juqingTaskInfo.endnpcname == "") {
						this.lbl_finishNpc.text = '无';
					}
					else {
						this.lbl_finishNpc.text = '' + juqingTaskInfo.endnpcname;
					}
					// 任务说明
					this.lbl_des.text = juqingTaskInfo.des;
					// 任务目标
					this.div_target.style.fontSize = 22;
					this.div_target.innerHTML = '' + juqingTaskInfo.targetdes;
					// 任务进度
					this.div_taskJindu.style.fontSize = 22;
					this.btn_get.gray = false;
					this.btn_get.mouseEnabled = true;
					if (juqingTaskInfo.queststatus == 2) {
						this.div_taskJindu.innerHTML = '已完成';
						this.btn_get.label = '领取';
					} else {
						if (juqingTaskInfo.taskJinDu == undefined) {
							this.div_taskJindu.innerHTML = '进行中'
						}
						else {
							this.div_taskJindu.innerHTML = '' + juqingTaskInfo.taskJinDu;
						}
						this.btn_get.label = '前往';
					}
					//剧情任务奖励
					let jiangli = juqingTaskInfo.jiangli;
					let juqingArr = jiangli.match(/\d+/g);
					let keys = Object.keys(juqingArr);
					this.hbox_juqing.removeChildren();
					for (let key of keys) {
						if (parseInt(key) % 2 == 0) {
							let itemInfo = new ProtoCmd.ItemBase();
							let ui_jiangli = new view.compart.DaoJuWithNameItem;
							itemInfo.dwBaseID = juqingArr[key];
							itemInfo.dwCount = juqingArr[key + 1];
							ui_jiangli.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL)
							this.hbox_juqing.addChild(ui_jiangli);
						}
					}

				}
			}
		}
		/**
		 * 主线任务领取
		 */
		public init_zhuxianEvent(): void {
			if (this.zhuxianTask !== null) {
				switch (this.zhuxianTask.queststatus) {
					// 完成
					case EnumData.QUESTSTATUS.QUESTCOMPLETED:
					case EnumData.QUESTSTATUS.QUESTMALLCOMPLETED:
						let pkt = new ProtoCmd.SelectTalkOptionEncoder();
						pkt.questType = this.zhuxianTask.questtype;
						pkt.showone = true;
						pkt.funcname = 'questfinish~' + this.zhuxianTask.taskid;
						lcp.send(pkt)
						break;
					// 进行中
					// case EnumData.QUESTSTATUS.QUESTDOING:
					// 	for (let _ele of this.div_target._childs) {
					// 		if (_ele.href) {
					// 			this.div_target.event(Laya.Event.LINK, _ele.href)
					// 		}
					// 	}
					// 	break;
				}
				this.btn_qianWang.gray = true;
				this.btn_qianWang.mouseEnabled = false;
			}
			this.initUI();
		}
		/**
	  * 剧情任务领取
	  */
		public init_juqingEvent(): void {
			if (this.juqingTask !== null) {
				switch (this.juqingTask.queststatus) {
					// 完成
					case EnumData.QUESTSTATUS.QUESTCOMPLETED:
					case EnumData.QUESTSTATUS.QUESTMALLCOMPLETED:
						let pkt = new ProtoCmd.SelectTalkOptionEncoder();
						pkt.questType = this.juqingTask.questtype;
						pkt.showone = true;
						pkt.funcname = 'questfinish~' + this.juqingTask.taskid;
						lcp.send(pkt)
						break;
					// 进行中
					// case EnumData.QUESTSTATUS.QUESTDOING:
					// 	break;
				}
				this.btn_get.gray = true;
				this.btn_get.mouseEnabled = false;
			}
			this.initUI();
		}
		
	}
}