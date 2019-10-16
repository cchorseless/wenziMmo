/**Created by the LayaAirIDE*/
module view.zhiNan {
	export class ZhiNan_listmenpaiItem extends ui.zhiNan.ZhiNan_listmenpaiItemUI {
		public itemID: number
		constructor() {
			super();
			this.addEvent();
		}
		//根据数据显示门派信息
		public setData(data, index) {
			// this.img_menpaiIcon.skin =data[9];
			this.lab_menpaiName.text = data[0];
			this.itemID = index;
		}
		//自身点击后调用panel的对应方法
		private addEvent() {
			EventManage.onWithEffect(this.btn_item,Laya.UIEvent.CLICK, this, () => {
				ZhiNan_menpaiPanel.self.onChooseItem(this.itemID)
			})
		}
	}
}