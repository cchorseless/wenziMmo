/**Created by the LayaAirIDE*/
module view.dialog {
	export class TimeDialog extends ui.dialog.TimeDialogUI {
		constructor() {
			super();
		}
		public season;
		public time;
		public setData(season, time): TimeDialog {
			this.season = season;
			this.time = time;
			this.addEvent();
			this.init_time();
			this.init_season();
			return this
		}
		public addEvent(): void {
			this.btn_timeClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
		public init_time(): void {
			let timeData = SheetConfig.Solarterms.getInstance(null).GETDATALIST(2);
			let keys = Object.keys(timeData);
			let data = null;
			let num = null;
			for (let key of keys) {
				if (timeData[key][0] == this.time) {
					data = timeData[key];
					num = key;
					break;
				}
			}
			this.lbl_time.text = data[2];
			this.lbl_timeIntroduce.text = data[3];
			this.img_time.skin = 'image/main/img_time' + num + '.png'
		}
		public init_season(): void {
			let seasonData = SheetConfig.Solarterms.getInstance(null).GETDATALIST(1);
			let keys = Object.keys(seasonData);
			let data = null;
			let num = null;
			for (let key of keys) {
				if (seasonData[key][0] == this.season) {
					data = seasonData[key];
					num = key;
					break;
				}
			}
			this.lbl_seasonIntroduce.text = data[3];
			this.img_season.skin = 'image/main/img_season' + num + '.png'
		}
	}
}