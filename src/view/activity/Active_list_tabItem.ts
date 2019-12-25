/**Created by the LayaAirIDE*/
module view.activity {
	export class Active_list_tabItem extends ui.activity.Active_list_tabItemUI {
		public item;
		public itemid;
		constructor() {
			super();
		}
		public setData(data, id) {
			this.item = data;
			this.itemid = id
			this.btn_icon.label = data.name;
			// this.img_icon.skin = "image/activity/active_icon" + data.id + ".png"
			this.changeUSEfontColor(false);
			this.addEvent();
		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_icon, Laya.UIEvent.CLICK, this, () => {
				PanelManage.Activity.onChooseTabItem(this.item, this.itemid);
			})
		}
		public changeUSEfontColor(boo: boolean) {
			this.btn_icon.selected = boo;
			// if (boo) {
			// 	this.btn_icon.selected = true;
			// } else {
			// 	this.lab_name.color = "#f2f2f2";
			// 	this.lab_name.strokeColor = "#765f42";
			// }
		}
	}
}