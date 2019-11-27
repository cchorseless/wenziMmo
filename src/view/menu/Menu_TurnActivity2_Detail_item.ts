/**Created by the LayaAirIDE*/
module view.menu {
	export class Menu_TurnActivity2_Detail_item extends ui.menu.Menu_TurnActivity2_Detail_itemUI {
		constructor() {
			super();
			this.panel_item.hScrollBarSkin = '';
			this.hbox_item['sortItem'] = (items) => { };
		}
		public setData(data) {
			data;
			this.lab_detail.text = data.introduce;
			this.lab_level.text = data.levelDesc;
			this.lab_name.text = data.name;
			this.lab_time.text = data.time;
			for (let i in data.award) {
				let o = new compart.DaoJuItem();
				let item = new ProtoCmd.ItemBase();
				item.dwBaseID = data.award[i];
				o.setData(item, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				o.scaleX = o.scaleY = 0.9;
				this.hbox_item.addChild(o)
			}
		}
	}
}