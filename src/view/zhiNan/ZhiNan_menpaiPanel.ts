/**Created by the LayaAirIDE*/
module view.zhiNan {
	export class ZhiNan_menpaiPanel extends ui.zhiNan.ZhiNan_menpaiPanelUI {
		private data;
		private tempData = null;
		public static self: ZhiNan_menpaiPanel;
		private checkObjIndex: number = 0
		constructor() {
			super();
			ZhiNan_menpaiPanel.self = this;
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
			this.data = SheetConfig.Introduction_play.getInstance(null).GETDATALIST(2);
			this.list_menpai.vScrollBarSkin = "";
			this.list_menpai.itemRender = view.zhiNan.ZhiNan_listmenpaiItem;
			this.list_menpai.array = this.data;
			this.list_menpai.renderHandler = new laya.utils.Handler(this, updataPetItem);
			this.list_menpai.selectEnable = true;
			function updataPetItem(cell: view.zhiNan.ZhiNan_listmenpaiItem, index: number) {
				var data: Object = this.data[index];
				cell.setData(data, index)
				if (cell.itemID == this.checkObjIndex) {
					cell.btn_menpaiIcon.selected = true;
				} else {
					cell.btn_menpaiIcon.selected = false;
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
			this.lab_Detail.text = data[8];
			this.lab_level.text = data[3];
			this.lab_location.text = data[4];
			this.lab_menpaiName.text = data[0];
			// this.img_skillIcon.skin = data[5];
			// this.btn_menpaiIcon.skin =data[9];

		}
		public reViewListCells(index) {
			for (let i = 0; i < this.list_menpai.cells.length - 1; i++) {
				if (this.list_menpai.cells[i].itemID == index) {
					this.list_menpai.cells[i].btn_menpaiIcon.selected = true;
				} else {
					this.list_menpai.cells[i].btn_menpaiIcon.selected = false;
				}
			}
		}
	}
}