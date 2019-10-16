/**Created by the LayaAirIDE*/
module view.zhiNan {
	export class ZhiNan_listwuxueItem extends ui.zhiNan.ZhiNan_listwuxueItemUI {
		public itemID;
		constructor() {
			super();
			this.addEvent();
		}
		public setData(data, index) {
			// this.img_skillIcon.skin =data[9];
			this.lab_SkillName.text = data[0];
			this.itemID = index;
		}
		//自身点击后调用panel的对应方法
		private addEvent() {
			EventManage.onWithEffect(this.btn_item, Laya.UIEvent.CLICK, this, () => {
				ZhiNan_wuxuePanel.self.onChooseItem(this.itemID);
			})
		}
	}
}