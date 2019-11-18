/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_RuneItem extends ui.hero.Hero_RuneItemUI {
		constructor() {
			super();
		}
		public num;
		public boxNum;
		public heroDialog;
		public setData(data, labels, index,boxNum,heroDialog): Hero_RuneItem {
			this.heroDialog=heroDialog;
			this.boxNum=boxNum;
			this.num = data.btNpFrom - 11;
			let label = labels.split('上');
			if (label[1]) {
				this.lbl_name.text = label[0] + ':';

			} else {
				let label1 = labels.split(':');
				this.lbl_name.text = label1[0] + ':';
			}
			this.lbl_des.text = '' + data.dwNpNum;
			if (index == 1) {
				this.btn_choose.visible = false;
			}
			if (index == 2) {
				this.btn_choose.visible = true;
			}
			this.view_single.selectedIndex = 1;
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_choose.on(Laya.UIEvent.CLICK, this, () => {
				this.btn_choose.selected = true;
				if (this.btn_choose.selected) {
					this.heroDialog.init_exchangeBtn(this.num,this.boxNum);
				}
			})
		}
	}
}