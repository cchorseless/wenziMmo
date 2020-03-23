/**Created by the LayaAirIDE*/
module view.compart {
	export class TaskInfoV1Item extends ui.compart.TaskInfoV1ItemUI {
		constructor() {
			super();
		}
		public taskInfo: ProtoCmd.stQuestInfoBase;
		public type;
		public achieveInfo;
		public addEvent(): void {
			this.btn_go.on(Laya.UIEvent.CLICK, this, () => {
				this.init_getReward();
			})
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
		/**
		 * 
		 * @param data 成就任务(l:任务当前进度，s:任务奖励状态，r:任务最大进度)
		 */
		public init_taskAchieve(index, data: { desc: string, id: number, items: any, type: number }, state: { l: number, s: number, r: number }): TaskInfoV1Item {
			this.achieveInfo = [index, data];
			//成就类型
			// this.img_taskTypeBg.width = 140;
			// this.img_taskTypeBg.skin = 'image/task/frame_'+this.type+'.png.png';
			switch (index) {
				//传奇生涯
				case 1:
					// this.img_taskTypeBg.skin = 'image/main/img_task01.png';
					// this.lbl_taskType.text = '传奇生涯';
					// this.lbl_taskType.strokeColor = '#be7e16';
					break;
				//累计登录
				case 2:
					// this.img_taskTypeBg.skin = 'image/main/img_task04.png';
					// this.lbl_taskType.text = '累计登录';
					// this.lbl_taskType.strokeColor = '#4595b1';
					break;
				//角色成长
				case 3:
					// this.img_taskTypeBg.skin = 'image/main/img_task03.png';
					// this.lbl_taskType.text = '角色成长';
					// this.lbl_taskType.strokeColor = '#7e41b6';
					break;
				//降妖除魔
				case 4:
					// this.img_taskTypeBg.skin = 'image/main/img_task02.png';
					// this.lbl_taskType.text = '降妖除魔';
					// this.lbl_taskType.strokeColor = '#b65c41';
					break;
				//强化装备
				case 5:
					// this.img_taskTypeBg.skin = 'image/main/img_task05.png';
					// this.lbl_taskType.text = '强化装备';
					// this.lbl_taskType.strokeColor = '#4fb145';
					break;
				//魂石天赋
				case 6:
					// this.img_taskTypeBg.skin = 'image/main/img_task01.png';
					// this.lbl_taskType.text = '魂石天赋';
					// this.lbl_taskType.strokeColor = '#be7e16';
					break;
				//罡气护体
				case 7:
					// this.img_taskTypeBg.skin = 'image/main/img_task04.png';
					// this.lbl_taskType.text = '罡气护体';
					// this.lbl_taskType.strokeColor = '#4595b1';
					break;
				//龙魂血盾
				case 8:
					// this.img_taskTypeBg.skin = 'image/main/img_task03.png';
					// this.lbl_taskType.text = '龙魂血盾';
					// this.lbl_taskType.strokeColor = '#7e41b6';
					break;
				//隐藏成就
				case 9:
					// this.img_taskTypeBg.skin = 'image/main/img_task04.png';
					// this.lbl_taskType.text = '隐藏成就';
					// this.lbl_taskType.strokeColor = '#4595b1';
					break;
			}
			//成就名
			// this.lbl_taskName.x = 140;
			this.lbl_taskName.text = data.desc.split('^')[0];
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
			this.html_progress.style.fontFamily = 'STKaiti';
			this.html_progress.style.fontSize = 18;
			if (state.l > state.r) {
				// this.lbl_progress.text = state.r + '/' + state.r;
				this.html_progress.innerHTML = "<span style='color:#000000;'>" + state.r + "</span>"
					+ "<span style='color:#000000;'>/" + state.r + "</span>"
				this.img_progress.width = 200;
			} else {
				this.html_progress.innerHTML = "<span style='color:#cd3735;'>" + state.l + "</span>"
					+ "<span style='color:#000000;'>/" + state.r + "</span>"
				this.img_progress.width = 200 * state.l / state.r;
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
			this.addEvent();
			return this;
		}
	}
}