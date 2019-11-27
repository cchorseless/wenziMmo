/**Created by the LayaAirIDE*/
module view.menu {
	export class Menu_TurnActivity2_listInfo_item extends ui.menu.Menu_TurnActivity2_listInfo_itemUI {
		public itemID;
		public activityID;
		public curTiem;
		constructor() {
			super();
			this.addEvent()
		}
		public addEvent() {
			this.on(Laya.UIEvent.CLICK,this,function(){
				Menu_TurnActivity2.self.chooseInfo(this.itemID)
			})
			this.btn_join.on(Laya.UIEvent.CLICK,this,function(){
				
			})
		}
		public setData(data, id, time) {
			this.itemID = id;
			this.activityID = data.id;
			this.curTiem = time
			this.lab_level.text = "" + data.lv;
			this.lab_time.text = data.starttime;
			this.lab_name.text = data.name;
			this.timeEvent(data.time, time)
		}
		public timeEvent(actTime, time): void {
			let starHour;
			let starMin;
			let endHour;
			let endMin;
			let time1 = actTime.split(',')
			for (let j = 0; time1[j]; j++) {
				let time2 = time1[j].split('-');
				//开始时间的小时
				starHour = parseInt(time2[0].split(':')[0]);
				//开始时间的分钟
				starMin = parseInt(time2[0].split(':')[1]);
				//结束时间的小时
				endHour = parseInt(time2[1].split(':')[0]);
				//结束时间的分钟
				endMin = parseInt(time2[1].split(':')[1]);
			}
			//当前小时大于活动开始小时，小于活动结束小时
			if (time.hour > starHour) {
				if (time.hour < endHour) {
					this.lab_isOpen.text = '已开启';
					this.btn_join.visible = true;
					this.gray = false;
				} else {
					this.lab_isOpen.text = '已结束';
					this.lab_isOpen.color = "#393939"
					this.btn_join.visible = false
					this.gray = true;
				}
			} else {
				this.lab_isOpen.text = '未开启';
				this.lab_isOpen.color = "#a53232"
				this.btn_join.visible = false
				this.gray = false;
			}
			//当前小时大于活动开始小时，等于活动结束小时，当前分钟小于活动结束分钟
			if (time.hour > starHour) {
				if (time.hour == endHour) {
					if (time.min <= endMin) {
						this.lab_isOpen.text = '已开启';
						this.btn_join.visible = true;
						this.gray = false;
					} else {
						this.lab_isOpen.text = '已结束';
						this.lab_isOpen.color = "#393939"
						this.btn_join.visible = false
						this.gray = true;
						
					}

				}
			} else {
				this.lab_isOpen.text = '未开启';
				this.lab_isOpen.color = "#a53232"
				this.btn_join.visible = false
				this.gray = false;
			}
			//当前小时等于活动开始小时，当前分钟大于等于活动开始分钟，当前小时小于活动结束小时
			if (time.hour == starHour) {
				if (time.min >= starMin) {
					if (time.hour < endHour) {
						this.lab_isOpen.text = '已开启';
						this.btn_join.visible = true;
						this.gray = false;
					} else {
						this.lab_isOpen.text = '已结束';
						this.lab_isOpen.color = "#393939"
						this.btn_join.visible = false
						this.gray = true;
					}
				} else {
					this.lab_isOpen.text = '未开启';
					this.lab_isOpen.color = "#a53232"
					this.btn_join.visible = false
					this.gray = false;
				}
			}
			//当前小时等于活动开始小时，当前分钟大于等于活动开始分钟，当前等于活动结束小时，当前分钟小于结束分钟
			if (time.hour == starHour) {
				if (time.min >= starMin) {
					if (time.hour == endHour) {
						if (time.min <= endMin) {
							this.lab_isOpen.text = '已开启';
							this.btn_join.visible = true;
							this.gray = false;
						} else {
							this.lab_isOpen.text = '已结束';
							this.lab_isOpen.color = "#393939"
							this.btn_join.visible = false
							this.gray = true;
						}
					}
				} else {
					this.lab_isOpen.text = '未开启';
					this.lab_isOpen.color = "#a53232"
					this.btn_join.visible = false
					this.gray = false;
				}
			}
		}
	}
}