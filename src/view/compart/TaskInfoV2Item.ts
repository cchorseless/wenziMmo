/**Created by the LayaAirIDE*/
module view.compart {
	export class TaskInfoV2Item extends ui.compart.TaskInfoV2ItemUI {
		constructor() {
			super();
		}
		public taskInfo: ProtoCmd.stQuestInfoBase;
		public type;
		public achieveInfo;
		public setData(): void {
		}
		/**
		 * 任务列表
		 * @param taskInfo 
		 * @param type 
		 */
		public init_taskList(taskInfo, type): TaskInfoV2Item {
			this.taskInfo = taskInfo;
			this.type = type;
			this.panel_reward.hScrollBarSkin = '';
			this.hbox_reward['sortItem'] = (items) => { };
			this.addEvent(0);
			this.init_taskInfo();
			return this;
		}
		//type0为任务列表1为成就零件
		public addEvent(type): void {
			this.btn_go.on(Laya.UIEvent.CLICK, this, () => {
				if (type == 1) {
					this.init_getReward();
				}
				if (type == 0) {
					this.init_taskListReward();
				}
			})
		}
		public init_taskInfo(): void {
			// this.img_taskTypeBg.width = 80;
			//任务类型
			this.img_taskTypeBg.skin = 'image/task/frame_'+this.type+'.png.png';
			switch (this.type) {
				//主线任务
				case 0:
					this.lbl_taskType.text = '主线';
					this.lbl_taskType.strokeColor = '#a;81a1a'
					break;
				//每日任务
				case 1:
					this.lbl_taskType.text = '每日';
					this.lbl_taskType.strokeColor = '#9a2459';
					break;
				//历练||支线任务
				case 2:
					this.lbl_taskType.text = '支线';
					this.lbl_taskType.strokeColor = '#c55031';
					break;
				//剧情任务
				case 4:
					this.lbl_taskType.text = '剧情';
					this.lbl_taskType.strokeColor = '#b37a1e';
					break;
				//威望任务
				// case 5:
				// 	this.lbl_taskType.text = '威望';
				// 	this.lbl_taskType.strokeColor = '#4fb145';
				// 	break;(遇到颜色和字对不上的就是威望任务)
			}
			//任务奖励
			let str = this.taskInfo.jiangli;
			let numArr = str.match(/\d+/g);
			let keys = Object.keys(numArr);
			this.hbox_reward.removeChildren();
			for (let key of keys) {
				if (parseInt(key) % 2 == 0) {
					let itemInfo = new ProtoCmd.ItemBase();
					let ui_jiangli = new view.compart.DaoJuWithNameItem;
					ui_jiangli.scaleX = ui_jiangli.scaleY = 0.8;
					itemInfo.dwBaseID = numArr[key];
					itemInfo.dwCount = numArr[key + 1];
					ui_jiangli.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL)
					this.hbox_reward.addChild(ui_jiangli);
				}
			}
			switch (this.taskInfo.queststatus) {
				case -1:
					this.btn_go.label = '接受'
					break;
				case 0: case 1:
					this.btn_go.label = '前往'
					break;
				case 2:
					this.btn_go.skin = 'image/common/button_qianwang_red.png'
					this.btn_go.label = '领取'
					break;
				case 3:
					this.btn_go.label = '已完成'
					break;
			}
			//任务名
			this.lbl_taskName.x = 87;
			this.lbl_taskName.text = this.taskInfo.questname;
			//任务介绍
			this.lbl_introduce.text = this.taskInfo.des;
		}
		/**
		 * 领取奖励（交付任务）
		 */
		public init_taskListReward(): void {
			if (this.taskInfo.queststatus == 2) {
				let pkt = new ProtoCmd.SelectTalkOptionEncoder();
				pkt.questType = this.taskInfo.questtype;
				pkt.showone = true;
				pkt.funcname = 'questfinish~' + this.taskInfo.taskid;
				lcp.send(pkt)
			}
		}

		/**
		 * 
		 * @param data 成就任务(l:任务当前进度，s:任务奖励状态，r:任务最大进度)
		 */
		public init_taskAchieve(index, data: { desc: string, id: number, items: any, type: number }, state: { l: number, s: number, r: number }): TaskInfoV2Item {
			this.achieveInfo = [index, data];
			//成就类型
			this.img_taskTypeBg.width = 140;
			// this.img_taskTypeBg.skin = 'image/task/frame_'+this.type+'.png.png';
			switch (parseInt(index)) {
				//传奇生涯
				case 1:
					this.img_taskTypeBg.skin = 'image/main/img_task01.png';
					this.lbl_taskType.text = '传奇生涯';
					this.lbl_taskType.strokeColor = '#be7e16';
					break;
				//累计登录
				case 2:
					this.img_taskTypeBg.skin = 'image/main/img_task04.png';
					this.lbl_taskType.text = '累计登录';
					this.lbl_taskType.strokeColor = '#4595b1';
					break;
				//角色成长
				case 3:
					this.img_taskTypeBg.skin = 'image/main/img_task03.png';
					this.lbl_taskType.text = '角色成长';
					this.lbl_taskType.strokeColor = '#7e41b6';
					break;
				//降妖除魔
				case 4:
					this.img_taskTypeBg.skin = 'image/main/img_task02.png';
					this.lbl_taskType.text = '降妖除魔';
					this.lbl_taskType.strokeColor = '#b65c41';
					break;
				//强化装备
				case 5:
					this.img_taskTypeBg.skin = 'image/main/img_task05.png';
					this.lbl_taskType.text = '强化装备';
					this.lbl_taskType.strokeColor = '#4fb145';
					break;
				//魂石天赋
				case 6:
					this.img_taskTypeBg.skin = 'image/main/img_task01.png';
					this.lbl_taskType.text = '魂石天赋';
					this.lbl_taskType.strokeColor = '#be7e16';
					break;
				//罡气护体
				case 7:
					this.img_taskTypeBg.skin = 'image/main/img_task04.png';
					this.lbl_taskType.text = '罡气护体';
					this.lbl_taskType.strokeColor = '#4595b1';
					break;
				//龙魂血盾
				case 8:
					this.img_taskTypeBg.skin = 'image/main/img_task03.png';
					this.lbl_taskType.text = '龙魂血盾';
					this.lbl_taskType.strokeColor = '#7e41b6';
					break;
				//隐藏成就
				case 9:
					this.img_taskTypeBg.skin = 'image/main/img_task04.png';
					this.lbl_taskType.text = '隐藏成就';
					this.lbl_taskType.strokeColor = '#4595b1';
					break;
			}
			//成就名
			this.lbl_taskName.x = 140;
			this.lbl_taskName.text = data.desc;
			let keys = Object.keys(data.items)
			this.hbox_reward.removeChildren();
			for (let key of keys) {
				let item = new view.compart.DaoJuItem();
				let itemInfo = new ProtoCmd.ItemBase();
				itemInfo.dwBaseID = data.items[key].i;
				itemInfo.dwCount = data.items[key].n;
				itemInfo.dwBinding = data.items[key].b;
				item.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL)
				this.hbox_reward.addChild(item);
			}
			//成就名称
			this.lbl_introduce.visible = false;
			//完成度
			this.box_chengjiu.visible = true;
			if (state.l > state.r) {
				this.lbl_progress.text = state.r + '/' + state.r;
				this.img_progress.width = 255;
			} else {
				this.lbl_progress.text = state.l + '/' + state.r;
				this.img_progress.width = 255 * state.l / state.r;
			}
			switch (state.s) {
				//奖励领取状态0不可领1可领2已领
				case 0:
					this.btn_go.label = '未达成';
					this.btn_go.labelSize = 22;
					this.btn_go.disabled = true;
					break;
				case 1:
					this.btn_go.label = '领取';
					this.btn_go.labelSize = 28;
					this.btn_go.disabled = false;
					break;
				case 2:
					this.btn_go.label = '已领取';
					this.btn_go.labelSize = 22;
					this.btn_go.disabled = true;
					break;
			}
			this.addEvent(1);
			return this;
		}
		/**
		 * 领取成就奖励
		 */
		public init_getReward(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JS_getAchievementReward, [this.achieveInfo[0], this.achieveInfo[1].id], null, this, (jsonData) => {
				console.log('====>成就奖励', jsonData)
			})
			lcp.send(pkt);
		}
	}
}