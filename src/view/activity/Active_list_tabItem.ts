/**Created by the LayaAirIDE*/
module view.activity {
	export class Active_list_tabItem extends ui.activity.Active_list_tabItemUI {
		public item;
		constructor() {
			super();
		}
		public setData(data: ProtoCmd.itf_ACT_JingCaiSendShow) {
			this.item = data;
			this.lab_name.text = data.name;
			this.img_icon.skin = "image/activity/active_icon" + data.id + ".png"
			this.changeUSEfontColor(false);
			this.addEvent();
		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_icon, Laya.UIEvent.CLICK, this, () => {
				PanelManage.Activity.onChooseTabItem(this.item);
			})
		}
		public changeUSEfontColor(boo: boolean) {
			if (boo) {
				this.lab_name.color = "#ffeeb1";
				this.lab_name.strokeColor = "#4e2a2a";
			} else {
				this.lab_name.color = "#f2f2f2";
				this.lab_name.strokeColor = "#765f42";
			}
		}
	}
}