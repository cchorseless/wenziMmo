/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_MiJi_VS_Info extends ui.wuXue.WuXue_MiJi_VS_InfoUI {
		public itemTypeId;
		public tempData = [];
		constructor() {
			super();
			this.panel_show.vScrollBarSkin = '';
			this.vbox_show['sortItem'] = (items) => { };
			this.addEvent();
		}
		public setData(id) {
			this.itemTypeId = 7;
			let stage = id + 1
			for (let i in GameApp.GameEngine.bagItemDB) {
				let o = GameApp.GameEngine.bagItemDB[i];
				let type = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMTYPE(o.dwBaseID);
				let taolu = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMJIESHU(o.dwBaseID);
				if (type == this.itemTypeId) {
					if (taolu == stage) {
						this.tempData.push(o)
					}

				}
			}
			this.setPanelShow()
		}
		public setPanelShow() {
			if (this.tempData.length < 1) {
				return;
			}
			for (let i = 0; i < this.tempData.length; i++) {
				let o = new WuXue_MiJi_VS_Info_Item();
				o.setData(this.tempData[i]);
				this.vbox_show.addChild(o);
			}
		}
		public addEvent() {

		}
	}
}