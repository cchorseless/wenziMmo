/**Created by the LayaAirIDE*/
module view.zhiNan {
	export class ZhiNan_listmenpaiItem extends ui.zhiNan.ZhiNan_listmenpaiItemUI {
		public itemID: number
		constructor() {
			super();
			this.addEvent();
		}
		public setData(data, index) {
			// this.img_menpaiIcon.skin =data[9];
			this.lab_menpaiName.text = data[0];
			this.itemID = index;
		}
		private addEvent() {
			EventManage.onWithEffect(this.btn_item,Laya.UIEvent.CLICK, this, () => {
				ZhiNan_menpaiPanel.self.onChooseItem(this.itemID)
			})
		}
	}
}