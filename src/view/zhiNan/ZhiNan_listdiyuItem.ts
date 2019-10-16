/**Created by the LayaAirIDE*/
module view.zhiNan {
	export class ZhiNan_listdiyuItem extends ui.zhiNan.ZhiNan_listdiyuItemUI {
		public itemID;  
		constructor() {
			super();
			this.addEvent();
		}
		//根据数据显示地域信息
		public setData(data, index) {
			// this.img_icon.skin =data[9];
			this.lab_name.text = data[0];
			this.itemID = index;
		}
		//自身点击后调用panel的对应方法
		private addEvent() {
			EventManage.onWithEffect(this.btn_item, Laya.UIEvent.CLICK, this, () => {
				ZhiNan_diyuPanel.self.onChooseItem(this.itemID);
			})
		}
	}
}