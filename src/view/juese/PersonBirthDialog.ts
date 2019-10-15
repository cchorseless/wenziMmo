/**Created by the LayaAirIDE*/
module view.juese {
	export class PersonBirthDialog extends ui.juese.PersonBirthDialogUI {
		private tempData = null;
		private createHourArr = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
		private jieqiArr = ["立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至", "小寒", "大寒"
		]
		constructor() {
			super();
			this.tempData = GameApp.GameEngine.playerBirthData;
			this.panel_birth.vScrollBarSkin = "";
			this.setData();
			this.addEvent();
		}
		public setData(): void {
			this.upDateView();
		}
		private addEvent() {
			EventManage.onWithEffect(this.btn_birthClose, Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
		private upDateView() {
			//开服时间
			let openServer = TimeUtils.timestampToTime(this.tempData.openday, 0);
			this.lab_openDay.text = openServer;
			// GameApp.GameEngine.mainPlayer.createTime    创建角色时间

			let span = GameApp.GameEngine.mainPlayer.createTime - this.tempData.openday;
			let span_day = span / 86400;
			let createYear = Math.floor(span_day / 24); //出生年
			let jieqi_ID = Math.floor(span_day % 24);   //节气
			let create_HourID = Math.floor(Number(TimeUtils.timestampToTime(GameApp.GameEngine.mainPlayer.createTime, 1)) / 2)

			let arr1 = this.tempData.birthdate_one[1];
			let arr2 = this.tempData.birthdate_two[1];
			// this.lab_BD1_1


			this.lab_hour.text = this.createHourArr[create_HourID] + "时";
			this.lab_jieqi.text = this.jieqiArr[jieqi_ID];
			this.lab_jianghuli.text = "江湖" + createYear + "年";
			let str = SheetConfig.troduce.getInstance(null).INTRODUCE(this.tempData.descID);
			str = str.replace(/_/g,GameApp.GameEngine.mainPlayer.objName);
			this.lab_detail.text = str;
			
			for (let i in arr1) {
				this["lab_BD1_" + i].text = SheetConfig.characters.getInstance(null).TYPE(arr1[i].id);
			}
			for (let i in arr2){
				this["lab_BD2_" + i].text = SheetConfig.characters.getInstance(null).TYPE(arr2[i].id);
			}

		}
	}
}