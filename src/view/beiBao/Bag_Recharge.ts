/**Created by the LayaAirIDE*/
module view.beiBao {
	export class Bag_Recharge extends ui.beiBao.Bag_RechargeUI {
		private needNum = 60;
		private curNum = 50;
		private data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
		constructor() {
			super();
			this.list_recharge.vScrollBarSkin = "";
			this.list_recharge.itemRender = view.compart.RechargeListInfo;
			this.setData();
			this.addEvent();


		}
		public setData() {
			let html;
			let aa = 60;
			html = "<span style='color:#000000;font-family:KaiTi;fontSize:24;stroke:2;strokeColor:#000000'>再充值</span>";
			html += "<span style='color:#FFFFFF;font-family:KaiTi;fontSize:26;stroke:2;strokeColor:#000000'>" + aa + "</span>";
			html += "<span style='color:#000000;font-family:KaiTi;fontSize:24;stroke:2;strokeColor:#000000'>元宝即可成为</span>";
			html += "<span style='color:#f5dd7b;font-family:KaiTi;fontSize:30;stroke:2;strokeColor:#000000'>VIP12</span>";
			this.textFlow.style.align = "center";
			this.textFlow.innerHTML = html;
			this.img_progressBar.width = 360 * (this.curNum / this.needNum);
			let span = Math.floor(this.curNum / 10);
			for (let i = 0; i < 6; i++) {
				this["ui_reward" + i].btn_icon.gray = false;
				if (i >= span) {
					this["ui_reward" + i].btn_icon.gray = true;
				}
			}
			this.list_recharge.array = this.data;
			this.list_recharge.renderHandler = new laya.utils.Handler(this, updataPetItem);
			this.list_recharge.selectEnable = true;
			function updataPetItem(cell: view.compart.RechargeListInfo, index: number) {
				var data: Object = this.data[index];
				cell.setData(data, index)
				if (cell.itemID == this.checkObjIndex) {
					cell.btn_pay.selected = true;
				} else {
					cell.btn_pay.selected = false;
				}
			}

		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_close,Laya.UIEvent.CLICK,this,()=>{
				this.close();
			})
		}
	}
}