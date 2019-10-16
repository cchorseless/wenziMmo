/**Created by the LayaAirIDE*/
module view.zhiNan {
	export class ZhiNan_listwanfaItem extends ui.zhiNan.ZhiNan_listwanfaItemUI {
		public itemID: number
		private islock: boolean = false;
		constructor() {
			super();
			this.addEvent();
		}
		public setData(data, index) {
			// this.btn_itemIcon.skin = data[9];
			this.lab_itemName.text = data[0];
			this.lab_itemDemand.text = data[2];
			this.itemID = index;
			let p = serverData[this.itemID + 1];
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
		//自身点击后调用panel的对应方法
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