/**Created by the LayaAirIDE*/
module view.zhiNan {
	export class ZhiNan_listdiyuItem extends ui.zhiNan.ZhiNan_listdiyuItemUI {
		public itemID;
		constructor() {
			super();
			this.addEvent();
		}
		public setData(data, index) {
			// this.img_icon.skin =data[9];
			this.lab_name.text = data[0];
			this.itemID = index;
		}
		private addEvent() {
			EventManage.onWithEffect(this.btn_item, Laya.UIEvent.CLICK, this, () => {
				ZhiNan_diyuPanel.self.onChooseItem(this.itemID);
			})
		}
	}
}