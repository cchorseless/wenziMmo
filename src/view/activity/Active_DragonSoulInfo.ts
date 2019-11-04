/**Created by the LayaAirIDE*/
module view.activity {
	export class Active_DragonSoulInfo extends ui.activity.Active_DragonSoulInfoUI {
		constructor() {
			super();
			this.panel_item.hScrollBarSkin = "";
		}
		public setData(data, rank, items) {
			this.lab_name.text = data.name;
			this.lab_rank.text = rank.toString();
			// this.panel_item.addChild();
			for (let i in items) {
				let p = new view.compart.DaoJuItem();
				let item1 = new ProtoCmd.ItemBase()
				item1.dwBaseID = items[i].index;
				item1.dwCount = items[i].num;
				item1.dwBinding = items[i].bind;
				p.setData(item1, EnumData.ItemInfoModel.SHOW_IN_MAIL)
				let num = parseInt(i)
				p.x = (p.width + 8) * (num - 1)
				this.panel_item.addChild(p);
			}
		}
	}
}