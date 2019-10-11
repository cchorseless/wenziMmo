/**Created by the LayaAirIDE*/
var serverData = {};//key从1开始,所以在使用的时候，传的参数需要+1
var lockState = [1, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
module view.zhiNan {
	export class ZhiNan_wanfaPanel extends ui.zhiNan.ZhiNan_wanfaPanelUI {
		private data;
		private tempData = null;
		public static self: ZhiNan_wanfaPanel;
		private getRewardID = null;
		private checkObjIndex: number = 0
		constructor() {
			super();
			ZhiNan_wanfaPanel.self = this;
			this.addEvent();
		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_close, Laya.UIEvent.CLICK, this, () => {
				this.data = null;
				this.tempData = null;
				PopUpManager.checkPanel(this);
			});

		}
		public setData(): void {
			this.data = SheetConfig.Introduction_play.getInstance(null).GETDATALIST(1001, 1054);
			this.list_wanfa.vScrollBarSkin = "";
			this.list_wanfa.itemRender = view.zhiNan.ZhiNan_listwanfaItem;
			this.list_wanfa.array = this.data;
			this.list_wanfa.renderHandler = new laya.utils.Handler(this, updataPetItem);
			this.list_wanfa.selectEnable = true;
			function updataPetItem(cell: view.zhiNan.ZhiNan_listwanfaItem, index: number) {
				var data: Object = this.data[index];
				cell.setData(data, index)
				if (cell.itemID == this.checkObjIndex) {
					cell.btn_itemIcon.selected = true;
				} else {
					cell.btn_itemIcon.selected = false;
				}
			}
			this.tempData = this.data[0];
			console.log("&&&&&&&&&&&")
			this.upDataView(this.tempData, lockState[0]);  //正式使用的时候需要用 serverData  替换
			this.checkObjIndex = 0;
			this.reViewListCells(0);
		}
		public onChooseItem(index) {
			this.tempData = this.data[index];
			this.upDataView(this.tempData, lockState[index]);  //正式使用的时候需要用 serverData  替换
			this.checkObjIndex = index;
			this.reViewListCells(index);
		}
		public upDataView(data, islock: number) {
			this.lab_unLock.text = data[2].toString();
			this.lab_location.text = data[4];
			this.lab_available.text = data[5];
			// this.lab_hasGet.text = "";
			this.lab_Name.text = data[0];
			this.lab_Detail.text = data[8];

			this.item_reward.img_item.skin = 'image/common/daoju/itemicon_' + data[6] + '.png';
			this.item_reward.lbl_count.text = data[7].toString()
			this.item_reward.img_lock.visible = false;
			if (islock == 1) {
				this.lab_hasGet.text = "可领取";
				this.lab_hasGet.color = "#a53232";
				this.item_reward.on(Laya.UIEvent.CLICK, this, () => {
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.getIntroductionReward, [1], 0, this,
						(data) => {
							console.log("领取结果：", data)
						});
					lcp.send(pkt);
				})
			}
			else if (islock == 2) {
				this.lab_hasGet.text = "已领取";
				this.lab_hasGet.color = "#179a0d";
			}
			this.item_reward.on(Laya.UIEvent.CLICK, this, () => {

			})
		}
		public reViewListCells(index) {
			for (let i = 0; i < this.list_wanfa.cells.length - 1; i++) {
				if (this.list_wanfa.cells[i].itemID == index) {
					this.list_wanfa.cells[i].btn_itemIcon.selected = true;
				} else {
					this.list_wanfa.cells[i].btn_itemIcon.selected = false;
				}
			}
		}

	}
}