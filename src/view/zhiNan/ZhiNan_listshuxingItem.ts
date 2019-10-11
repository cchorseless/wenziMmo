/**Created by the LayaAirIDE*/
module view.zhiNan {
	export class ZhiNan_listshuxingItem extends ui.zhiNan.ZhiNan_listshuxingItemUI {
		public itemID;
		constructor() {
			super();
			this.addEvent();
		}
		public setData(data, index) {
			// this.img_shuxingIcon.skin =data[9];
			this.lab_shuxingName.text = data[0];
			this.itemID = index;
		}
		private addEvent() {
			EventManage.onWithEffect(this.btn_shuxingIcon, Laya.UIEvent.CLICK, this, () => {
				ZhiNan_shuxingPanel.self.onChooseItem(this.itemID);
			})
		}
	}
}