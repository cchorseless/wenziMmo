/**Created by the LayaAirIDE*/
module view.zhiNan {
	export class ZhiNan_listwanfaItem extends ui.zhiNan.ZhiNan_listwanfaItemUI {
		public itemID: number
		private islock: boolean = false;
		constructor() {
			super();
			this.addEvent();
			// this.btn_item.anchorX = this.btn_item.anchorY = 0.5;

		}
		public setData(data, index) {
			// this.btn_itemIcon.skin = data[9];
			this.lab_itemName.text = data[0];
			this.lab_itemDemand.text = data[2];
			this.itemID = index;
			let p = lockState[index];
			if (p > 0){
				this.islock = true;
				this.lock.visible = false;
				this.btn_item.gray = false;
			}else{
				this.islock = false;
				this.btn_item.gray = true;
				this.lock.visible = true;
			}
				
		}
		private addEvent() {
			EventManage.onWithEffect(this.btn_item, Laya.UIEvent.CLICK, this, () => {
				if (!this.islock) {
					// TipsManage.showTxt('功能暂未解锁');
					TipsManage.showTips('功能暂未解锁');
					return;
				} else {
					ZhiNan_wanfaPanel.self.onChooseItem(this.itemID)
				}

			})
		}
	}
}