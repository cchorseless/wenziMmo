/**Created by the LayaAirIDE*/
module view.compart {
	export class TaskInfoItem extends ui.compart.TaskInfoItemUI {
		constructor() {
			super();

		}
		public status;
		public setData(item: ProtoCmd.itf_Task_PrestigeInfo): TaskInfoItem {
			this.status = item.status;
			this.panel_task.hScrollBarSkin='';
			this.img_taskInfoMore.scaleY = 0;
			this.height = this.img_taskInfo.height;
			//任务名称
			this.lbl_taskName.text = '' + item.questdbname;
			this.addEvent();
			this.statusInfo();
			this.getId(item.szquestrewards)
			return this
		}
		public addEvent(): void {
			this.img_taskInfo.on(Laya.UIEvent.CLICK, this, () => {
				this.btn_selected.selected = !this.btn_selected.selected;
				//不是未接状态打开任务详细面板
				if (this.status !== -1) {
					this.showMore(this.btn_selected.selected);
				}
			})
		}

		public showMore(v: boolean): void {
			if (v) {
				Laya.Tween.to(this.img_taskInfoMore, { scaleY: 1 }, 500);
				Laya.Tween.to(this, { height: this.img_taskInfo.height + this.img_taskInfoMore.height }, 500);
			}
			else {
				Laya.Tween.to(this.img_taskInfoMore, { scaleY: 0 }, 500);
				Laya.Tween.to(this, { height: this.img_taskInfo.height }, 500)
			}
		}
			/**
			 * 威望任务状态判定
			 */
		public statusInfo(): void {
			switch (this.status) {
				case -1:
					this.lbl_status.text = '未接';
					break;
				case 0:
					this.lbl_status.text = '已接';
					break;
				case 1:
					this.lbl_status.text = '进行中';
					break;
				case 2:
					this.lbl_status.text = '已完成';
					break;
				case 3:
					this.lbl_status.text = '已结束';
					break;
				case 4:
					this.lbl_status.text = '放弃';
					break;
			}
		}
			/**
			 * 威望任务奖励
			 */
		public getId(str): void {
			let idArr = str.match(/id=\'\d+\'/g)
			let id = idArr.map(item => {
				return parseInt(item.split("='")[1])	
			})
			let numArr = str.match(/co=\'\d+\'/g)
			let num = numArr.map(item => {
				return parseInt(item.split("='")[1])	
			})
			console.log('======>奖励id数量',id,num)
			this.hbox_task.removeChildren();
			for (let i = 0; id[i]; i++) {
				let _itemUI = new view.compart.DaoJuWithNameItem();
				let itemInfo = new ProtoCmd.ItemBase();
				itemInfo.dwBaseID = id[i];
				itemInfo.dwCount = num[i];
				_itemUI.setData(itemInfo,EnumData.ItemInfoModel.SHOW_IN_MAIL);
				this.hbox_task.addChild(_itemUI)
			}
		}
	}
}