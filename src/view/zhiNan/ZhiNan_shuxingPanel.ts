/**Created by the LayaAirIDE*/
module view.zhiNan {
	export class ZhiNan_shuxingPanel extends ui.zhiNan.ZhiNan_shuxingPanelUI {
		private data;
		private tempData = null;
		public static self: ZhiNan_shuxingPanel;
		private checkObjIndex: number = 0
		constructor() {
			super();
			ZhiNan_shuxingPanel.self = this;
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
			this.data = SheetConfig.Introduction_play.getInstance(null).GETDATALIST(5001, 5019);
			this.list_shuxing.vScrollBarSkin = "";
			this.list_shuxing.itemRender = view.zhiNan.ZhiNan_listshuxingItem;
			this.list_shuxing.array = this.data;
			this.list_shuxing.renderHandler = new laya.utils.Handler(this, updataPetItem);
			this.list_shuxing.selectEnable = true;
			function updataPetItem(cell: view.zhiNan.ZhiNan_listshuxingItem, index: number) {
				var data: Object = this.data[index];
				cell.setData(data, index)
				if (cell.itemID == this.checkObjIndex) {
					cell.btn_shuxingIcon.selected = true;
				} else {
					cell.btn_shuxingIcon.selected = false;
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
			this.lab_type.text = data[3];
			this.lab_develop.text = data[4];
			this.lab_name.text = data[0];
			// this.img_icon.skin =data[9];

		}
		public reViewListCells(index) {
			for (let i = 0; i < this.list_shuxing.cells.length - 1; i++) {
				if (this.list_shuxing.cells[i].itemID == index) {
					this.list_shuxing.cells[i].btn_shuxingIcon.selected = true;
				} else {
					this.list_shuxing.cells[i].btn_shuxingIcon.selected = false;
				}
			}
		}
	}
}