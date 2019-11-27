/**Created by the LayaAirIDE*/
module view.compart {
	export class TaskInfoV2Item extends ui.compart.TaskInfoV2ItemUI {
		constructor() {
			super();
		}
		public taskInfo: ProtoCmd.stQuestInfoBase;
		public type;
		public setData(taskInfo, type): TaskInfoV2Item {
			this.taskInfo = taskInfo;
			this.type = type;
			this.panel_reward.hScrollBarSkin = '';
			this.hbox_reward['sortItem'] = (items) => { };
			this.addEvent();
			this.init_tskInfo();
			return this;
		}
		public addEvent(): void {

		}
		public init_tskInfo(): void {
			//任务类型
			switch (this.type) {
				//主线任务
				case 0:
					this.img_taskTypeBg.skin = 'image/main/tab_meiri_01.png';
					this.lbl_taskType.text = '主线';
					this.lbl_taskType.strokeColor = '#be7e16';
					break;
				//每日任务
				case 1:
					this.img_taskTypeBg.skin = 'image/main/tab_meiri_04.png';
					this.lbl_taskType.text = '每日';
					this.lbl_taskType.strokeColor = '#4595b1';
					break;
				//历练||支线任务
				case 2:
					this.img_taskTypeBg.skin = 'image/main/tab_meiri_03.png';
					this.lbl_taskType.text = '支线';
					this.lbl_taskType.strokeColor = '#7e41b6';
					break;
				//剧情任务
				case 4:
					this.img_taskTypeBg.skin = 'image/main/tab_meiri_02.png';
					this.lbl_taskType.text = '剧情';
					this.lbl_taskType.strokeColor = '#b65c41';
					break;
				//威望任务
				// case :
				// 	this.img_taskTypeBg.skin = 'image/main/tab_meiri_05.png';
				// 	this.lbl_taskType.text = '威望';
				// 	this.lbl_taskType.strokeColor = '#4fb145';
				// 	break;
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
					ui_jiangli.scaleX=ui_jiangli.scaleY=0.9;
					itemInfo.dwBaseID = numArr[key];
					itemInfo.dwCount = numArr[key + 1];
					ui_jiangli.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL)
					this.hbox_reward.addChild(ui_jiangli);
				}
			}
			//任务名
			this.lbl_taskName.text = this.taskInfo.questname.split(':')[1];
			//任务介绍
			this.lbl_introduce.text = this.taskInfo.des;
		}
	}
}