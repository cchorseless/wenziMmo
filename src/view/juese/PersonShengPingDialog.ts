/**Created by the LayaAirIDE*/
module view.juese {
	export class PersonShengPingDialog extends ui.juese.PersonShengPingDialogUI {
		private myDailyLog = null;
		private dateArray = null;
		private descArray = null;
		private typecArray = null;
		private idcArray = null;
		constructor() {
			super();
			this.addEvent();
		}
		public setData(fromSdata: any): void {
			fromSdata = fromSdata.sort(function (a, b) {
				return (a.getValue('time')) < (b.getValue('time')) ? 1 : -1;
			});
			this.myDailyLog = fromSdata;
			this.setView()

		}
		public addEvent(): void {
			this.panel_shengping.vScrollBarSkin = '';

			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
		public setView() {
			for (let i = 0; i < this.myDailyLog.length; i++) {
				let dailyInfo = new view.juese.PersonShengPingItem();
				let time = this.myDailyLog[i].getValue('time');
				let id = this.myDailyLog[i].getValue('id');
				let desc = this.myDailyLog[i].getValue('desc');
				let type = this.myDailyLog[i].getValue('type');
				dailyInfo.setData(time, id, desc, type)
				this.vbox_shengping.addChild(dailyInfo)
			}
		}
	}
}