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
			this.tempData = [];
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
				this.box_empty.visible = true;
				return;
			}
			let map = {};
			let dest = [];
			for (let i = 0; i < this.tempData.length; i++) {
				let array = [this.tempData[i].dwBaseID,this.tempData[i].dwCount]
				let ai = this.tempData[i];
				if (!map[ai.dwBaseID]) {
					dest.push(ai);
					map[ai.dwBaseID] = ai;
				} else {
					for (let j = 0; j < dest.length; j++) {
						let dj = dest[j];
						if (dj.dwBaseID == ai.dwBaseID) {
							dj.dwCount = (parseFloat(dj.dwCount) + parseFloat(ai.dwCount)).toString();
							break;
						}
					}
				}
			};
			console.log('????????', dest)
			this.box_empty.visible = false;
			for (let i = 0; i < dest.length; i++) {
				let o = new WuXue_MiJi_VS_Info_Item();
				o.setData(dest[i]);
				this.vbox_show.addChild(o);
			}
		}
		public addEvent() {

		}
	}
}