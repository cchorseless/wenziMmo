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
			this.on(Laya.UIEvent.CLICK, this, function () {
				Menu_TurnActivity2.self.chooseInfo(this.itemID)
			})
			this.btn_join.on(Laya.UIEvent.CLICK, this, function () {

			})
		}
		public setData(data, id, times) {
			this.itemID = id;
			this.activityID = data.id;
			this.curTiem = times
			this.lab_level.text = "" + data.lv;
			this.lab_time.text = data.starttime;
			this.lab_name.text = data.name;
			let time = TimeUtils.getFormatBySecond8(times)
			if (data.id == 7) {
				this.timeEvent(data.time, time)
			} else {
				this.timeEvent(data.time, time)
			}

		}
		public timeEvent(actTime, time): void {
			let starHour;
			let starMin;
			let endHour;
			let endMin;

			let time1 = actTime.split(',')
			for (let j = 0; j < time1.length; j++) {
				let time2 = time1[j].split('-');
				//开始时间的小时
				starHour = parseInt(time2[0].split(':')[0]);
				//开始时间的分钟
				starMin = parseInt(time2[0].split(':')[1]);
				//结束时间的小时
				endHour = parseInt(time2[1].split(':')[0]);
				//结束时间的分钟
				endMin = parseInt(time2[1].split(':')[1]);
				if (starHour == endHour) {
					if (time.hour < starHour) {
						this.notOpen()
					} else if (time.hour == starHour) {
						if (time.min < starMin) {
							this.notOpen()
						} else if (time.min == starMin) {
							this.opening()
							return;
						} else if (time.min > starMin && time.min <= endMin) {
							this.opening()
							return;
						} else if (time.min > endMin) {
							this.close()
						}
					} else if (time.hour > starHour) {
						this.close()
					}
				} else if (starHour < endHour) {
					if (time.hour < starHour) {
						this.notOpen()
					} else if (time.hour == starHour) {
						if (time.min < starMin) {
							this.notOpen()
						} else {
							this.opening()
							return;
						}
					} else if (time.hour > starHour && time.hour < endHour) {
						this.opening()
						return;
					} else if (time.hour == endHour) {
						if (time.min <= endMin) {
							this.opening()
							return;
						} else {
							this.close()
						}
					} else if (time.hour > endHour) {
						this.close()
					}
				}
			}
		}
		public notOpen() {
			this.lab_isOpen.text = '未开启';
			this.lab_isOpen.color = "#a53232"
			this.btn_join.visible = false
			this.gray = false;
		}
		public opening() {
			this.lab_isOpen.text = '已开启';
			this.btn_join.visible = true;
			this.gray = false;
		}
		public close() {
			this.lab_isOpen.text = '已结束';
			this.lab_isOpen.color = "#393939"
			this.btn_join.visible = false
			this.img_bg.gray = true;
		}
	}
}