/**Created by the LayaAirIDE*/
module view.menu {
	export class Menu_PlayWayItem extends ui.menu.Menu_PlayWayItemUI {
		constructor() {
			super();
		}
		public setData(data): Menu_PlayWayItem {
			//玩法名称
			this.lbl_name.text=''+data[0];
			//玩法说明
			this.lbl_introduce.text=''+data[2];
			return this;
		}
	}
}