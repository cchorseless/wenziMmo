/**Created by the LayaAirIDE*/
module view.zhiNan {
	export class ZhiNan_diyuPanel extends ui.zhiNan.ZhiNan_diyuPanelUI {
		private data;
		private tempData = null;
		public static self: ZhiNan_diyuPanel;
		private checkObjIndex: number = 0
		constructor() {
			super();
			ZhiNan_diyuPanel.self = this;
			this.addEvent();
		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_close, Laya.UIEvent.CLICK, this, () => {
				this.data = null;
				this.tempData = null;
				PopUpManager.checkPanel(this);
			});
		}
		public setData() {
			this.data = SheetConfig.Introduction_play.getInstance(null).GETDATALIST(4001, 4050);
			this.list_diyu.vScrollBarSkin = "";
			this.list_diyu.itemRender = view.zhiNan.ZhiNan_listdiyuItem;
			this.list_diyu.array = this.data;
			this.list_diyu.renderHandler = new laya.utils.Handler(this, updataPetItem);
			this.list_diyu.selectEnable = true;
			function updataPetItem(cell: view.zhiNan.ZhiNan_listdiyuItem, index: number) {
				var data: Object = this.data[index];
				cell.setData(data, index)
				if (cell.itemID == this.checkObjIndex) {
					cell.btn_item.selected = true;
				} else {
					cell.btn_item.selected = false;
				}
			}
			this.tempData = this.data[0];
			this.upDataView(this.tempData, 0)
			this.checkObjIndex = 0;
			this.reViewListCells(0);
		}
		public onChooseItem(index) {
			this.tempData = this.data[index];
			this.upDataView(this.tempData, index)
			this.checkObjIndex = index;
			this.reViewListCells(index);
		}

		public upDataView(data, index: number) {
			this.lab_detail.text = data[8];
			this.lab_level.text = data[3];
			this.lab_location.text = data[4];
			this.lab_name.text = data[0];
			// this.img_icon.skin =data[9];

		}
		public reViewListCells(index) {
			for (let i = 0; i < this.list_diyu.cells.length - 1; i++) {
				if (this.list_diyu.cells[i].itemID == index) {
					this.list_diyu.cells[i].btn_item.selected = true;
				} else {
					this.list_diyu.cells[i].btn_item.selected = false;
				}
			}
		}

	}
}