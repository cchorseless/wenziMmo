/**Created by the LayaAirIDE*/
module view.activity {
	export class Active_list_tabItem extends ui.activity.Active_list_tabItemUI {
		public itemID;
		constructor() {
			super();
			this.addEvent();
		}
		public setData(data, index) {
			this.itemID = index;
			this.lab_name.text = data.name;
			this.btn_icon;
		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_icon, Laya.UIEvent.CLICK, this, () => {
				ActivityPanel.self.onChooseTabItem(this.itemID);
			})
		}
	}
}