/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_RuneItem extends ui.hero.Hero_RuneItemUI {
		constructor() {
			super();
		}
		public num;
		public boxNum;
		public type;
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