/**Created by the LayaAirIDE*/
module view.juese {
	export class Task_ChengJiuDialog extends ui.juese.Task_ChengJiuDialogUI {
		constructor() {
			super();
			for (let i = 0; i < 9; i++) {
				this['panel_achieve' + i].vScrollBarSkin = '';
				this['vbox_achieve' + i]['sortItem'] = (items) => { };
			}
			this.panel_tab.hScrollBarSkin = '';
		}
		public stateData = [];
		public taskdata;
		public setData(): Task_ChengJiuDialog {
			// this.panel_achieve.vScrollBarSkin = '';
			// this.vbox_achieve['sortItem'] = (items) => { };
			let data: ProtoCmd.itf_JS_ShengWangInfo = GameApp.MainPlayer.fameInfo;
			//声望名称
			for (let i = 0; data.titletab[i]; i++) {
				if (data.prestigeid == i) {
					this.lbl_prestigeName.text = '' + data.titletab[i].name;
				}
			}
			//我的声望icon
			this.img_prestige.skin = 'image/juese/icon_shengwang' + data.prestigeid + '.png';
			//声望经验值进度条
			this.img_jingyan.width = 180 * data.minexp / data.maxexp;
			//声望经验值
			// this.lbl_jingyan.text = data.minexp + '/' + data.maxexp;

			this.html_jingyan.style.fontFamily = 'STKaiti';
			this.html_jingyan.style.fontSize = 20;
			// this.html_titleName.style.align = 'center'
			if (data.minexp < data.maxexp) {
				this.html_jingyan.innerHTML = "<span style='color:#cd3735;'>" + data.minexp + "</span>"
					+ "<span style='color:#000000;'>/" + data.maxexp + "</span>"
			} else {
				this.html_jingyan.innerHTML = "<span style='color:#000000;'>" + data.minexp + "</span>"
					+ "<span style='color:#000000;'>/" + data.maxexp + "</span>"
			}
			//当前战力
			let battle = GameUtil.parseEffectidToObj(['' + data.effid]).battle[GameApp.MainPlayer.job];
			this.lbl_battle.text = '' + battle;
			//生命上限
			this.lbl_life.text = '' + SheetConfig.mydb_effect_base_tbl.getInstance(null).NONPAREIL_TYPE_MAXHP('' + data.effid);
			//物理攻击
			let min = SheetConfig.mydb_effect_base_tbl.getInstance(null).NONPAREIL_TYPE_MINDC('' + data.effid);
			let max = SheetConfig.mydb_effect_base_tbl.getInstance(null).NONPAREIL_TYPE_MAXDC('' + data.effid);
			this.lbl_phKill.text = min + '-' + max;
			this.VS_show.selectedIndex = 0;
			this.addEvent();
			this.init_getReward();
			this.init_taskInfo();
			this.init_taskState();

			return this;
		}

		public addEvent(): void {
			// this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
			// 	this.close();
			// // })
			// this.tab_showType.selectHandler = Laya.Handler.create(this,function(index){

			// })
			this.btn_shengwang.on(Laya.UIEvent.CLICK, this, function () {
				let o = new Person_shengwangMainDialog();
				o.popup(true);
			})
			this.tab_showType.on(Laya.UIEvent.CLICK, this, function () {
				this.VS_show.selectedIndex = this.tab_showType.selectedIndex;
				this.init_sort(this.VS_show.selectedIndex)
			})
		}
		/**
		 * 成就任务状态
		 */
		public init_taskState(): void {

			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.TASK_achievementPanel, [1], null, this, (jsonData) => {
				this.stateData = jsonData;
				if (this.taskdata != undefined) {
					this.init_sort(this.VS_show.selectedIndex);
				}
			})
			lcp.send(pkt);
		}
		/**
		 * 拉取成就信息
		 */
		public init_taskInfo(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.TASK_achievementDesc, null, null, this, (jsonData) => {
				// let keys = Object.keys(jsonData);
				// let taskArray = [];
				// for (let key of keys) {
				// 	let data = jsonData[key];
				// 	let keys1 = Object.keys(data)
				// 	for (let key1 of keys1) {
				// 		taskArray.push(data[key1]);
				// 	}
				// }
				// this.taskdata = taskArray;
				this.taskdata = jsonData;
				// for (let i in data) {
				// 	let keys = Object.keys(data[i])
				// 	for (let key of keys) {
				// 		this.taskdata.push(data[i][key])
				// 	}
				// }
			})
			lcp.send(pkt);
		}
		/**
		 * 排序
		 */
		// public init_newsort(): void {
		// 	let keys = Object.keys(this.taskdata);
		// 	let taskArray = [];
		// 	for (let key of keys) {
		// 		let data = this.taskdata[key];
		// 		let keys1 = Object.keys(data)
		// 		for (let key1 of keys1) {
		// 			taskArray.push(data[key1]);
		// 		}
		// 	}
		// }
		public typeArr = [[1], [2, 4], [3], [5], [6]]
		public init_sort(id): void {
			let keys = Object.keys(this.taskdata);
			this['vbox_achieve' + id].removeChildren();
			let curType = this.typeArr[id]
			for (let key of keys) {
				let achiveArray = [];
				let data = this.taskdata[(key)];
				let keys1 = Object.keys(data)
				let taskArray = [];
				for (let key1 of keys1) {
					for (let g = 0; g < curType.length; g++) {
						if (data[key1].type.split('-')[0] == curType[g]) {
							taskArray.push(data[key1]);
						}
					}


				}
				//根据成就的类型和id排序
				let array = taskArray.sort(function (a, b) {
					return (a.type * 100 + a.id) - (b.type * 100 + b.id)
				});
				if (this.stateData[(key)]) {
					//根据奖励领取的状态排序
					for (let single of array) {
						if (this.stateData[(key)][single.id].s == 1) {
							achiveArray.push(single);
						}
						if (this.stateData[(key)][single.id].s == 0) {
							achiveArray.push(single);
						}
						if (this.stateData[(key)][single.id].s == 2) {
							achiveArray.push(single);
						}
					}
				}
				//根据同类型的成就取第一个形成数组
				let taskFinal = this.first(achiveArray);
				for (let part of taskFinal) {
					this['vbox_achieve' + id].addChild(new view.compart.TaskInfoV1Item().init_taskAchieve(key, part, this.stateData[(key).toString()][part.id]));
				}
			}
		}
		/**
		 * 
		 * @param array 同类型的成就取第一个
		 */
		public first(array: Array<any>): any {
			let taskArray = [];
			let keys = Object.keys(array)
			for (let key of keys) {
				if (array[(parseInt(key) + 1)]) {
					if (array[key].type == array[(parseInt(key) + 1)].type) {
						array[(parseInt(key) + 1)] = array[key];
					} else {
						taskArray.push(array[key]);
					}
				} else {
					taskArray.push(array[key]);
				}
			}
			return taskArray;
		}
		/**
		 * 领取成就奖励回调
		 */
		public init_getReward(): void {
			GameApp.LListener.on(ProtoCmd.JS_updateAchievement, this, (jsonData) => {
				this.init_taskState();
			})
		}
	}
}