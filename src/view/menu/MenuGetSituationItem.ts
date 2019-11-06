/**Created by the LayaAirIDE*/
module view.menu {
	export class MenuGetSituationItem extends ui.menu.MenuGetSituationItemUI {
		constructor() {
			super();
		}
		public setData(data): MenuGetSituationItem {
			//获奖人名字
			this.lbl_name.text=''+data.name;
			//获奖人竞猜数字
			this.lbl_num.text=''+data.num
			return this;
		}
	}
}