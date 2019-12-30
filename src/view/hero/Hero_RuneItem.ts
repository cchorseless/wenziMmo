/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_RuneItem extends ui.hero.Hero_RuneItemUI {
		constructor() {
			super();
		}
		public num;//词条位置索引
		public boxNum;//第一个还是第二个
		public type;//符文类型（1身上；0背包）
		public qingYuanItem;
		public setData(data, labels, boxNum, type, qingYuanItem): Hero_RuneItem {
			this.type=type;
			this.qingYuanItem = qingYuanItem;
			this.boxNum = boxNum;
			this.num = data.btNpFrom - 11;
			let label = labels.split('上');
			if (label[1]) {
				this.lbl_name.text = label[0] + ':';

			} else {
				let label1 = labels.split(':');
				this.lbl_name.text = label1[0] + ':';
			}
			this.lbl_des.text = '' + data.dwNpNum;
			this.view_single.selectedIndex = 1;
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_choose.on(Laya.UIEvent.CLICK, this, () => {
				if (this.view_single.selectedIndex == 1) {
					this.qingYuanItem.init_exchangeBtn(this.num, this.boxNum,this.type);
				}
			})
		}
	}
}