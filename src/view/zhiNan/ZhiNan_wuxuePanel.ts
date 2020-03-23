/**Created by the LayaAirIDE*/
module view.zhiNan {
	export class ZhiNan_wuxuePanel extends ui.zhiNan.ZhiNan_wuxuePanelUI {
		private data;
		private tempData = null;
		public static self: ZhiNan_wuxuePanel;
		private gongFaState: boolean = true;
		private checkObjIndex: number = 0
		constructor() {
			super();
			// this.btn_waigong.selected
			ZhiNan_wuxuePanel.self = this;
			this.upDataGongFaListView(this.gongFaState)
			this.changeButtonState(this.gongFaState);
			this.addEvent();
		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_close, Laya.UIEvent.CLICK, this, () => {
				this.data = null;
				this.tempData = null;
				PopUpManager.checkPanel(this);
			});
			EventManage.onWithEffect(this.btn_waigong, Laya.UIEvent.CLICK, this, () => {
				this.gongFaState = true;
				this.changeButtonState(this.gongFaState);
				this.upDataGongFaListView(this.gongFaState);
				this.setData()
				this.list_wuxue.scrollTo(1);
			});
			EventManage.onWithEffect(this.btn_neigong, Laya.UIEvent.CLICK, this, () => {
				this.gongFaState = false;
				this.changeButtonState(this.gongFaState);
				this.upDataGongFaListView(this.gongFaState);
				this.setData()
				this.list_wuxue.scrollTo(1);
			});
		}
		//更改按钮状态
		private changeButtonState(boo: boolean) {
			if (boo) {
				this.btn_waigong.selected = true;
				this.lab_waigong.color = "#781b0c";
				this.btn_neigong.selected = false;
				this.lab_neigong.color = "#404040";
			}
			else {
				this.btn_waigong.selected = false;
				this.lab_waigong.color = "#404040";
				this.btn_neigong.selected = true;
				this.lab_neigong.color = "#781b0c";
			}
		}
		public setData() {
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
		//更新显示
		public upDataView(data, index: number) {
			// this.img_skillIcon.skin = data[5];
			this.lab_creater.text = data[3];
			this.lab_get.text = data[4];
			this.lab_skillName.text = data[0];
			this.lab_detail.text = data[8];

		}
		//更新功法的说明
		public upDataGongFaListView(boo: boolean) {
			if (boo) {
				this.data = GameConfigFunc.GETDATALIST(3);
			} else {
				this.data = GameConfigFunc.GETDATALIST(4); //后续根据配表修改3051-3100 ？
			}
			this.list_wuxue.vScrollBarSkin = "";
			this.list_wuxue.itemRender = view.zhiNan.ZhiNan_listwuxueItem;
			this.list_wuxue.array = this.data;
			this.list_wuxue.renderHandler = new laya.utils.Handler(this, updataPetItem);
			this.list_wuxue.selectEnable = true;
			function updataPetItem(cell: view.zhiNan.ZhiNan_listwuxueItem, index: number) {
				var data: Object = this.data[index];
				cell.setData(data, index);
				if (cell.itemID == this.checkObjIndex) {
					cell.btn_skillIcon.selected = true;
				} else {
					cell.btn_skillIcon.selected = false;
				}
			}
		}
		//重置list中子项显示
		public reViewListCells(index) {
			for (let i = 0; i < this.list_wuxue.cells.length - 1; i++) {
				if (this.list_wuxue.cells[i].itemID == index) {
					this.list_wuxue.cells[i].btn_skillIcon.selected = true;
				} else {
					this.list_wuxue.cells[i].btn_skillIcon.selected = false;
				}
			}
		}
	}
}