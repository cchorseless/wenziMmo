/**Created by the LayaAirIDE*/
module view.recharge_vip{
	export class Recharge_Item extends ui.recharge_vip.Recharge_ItemUI{
		private needNum = 60;
		private curNum = 50;
		private data = null
		constructor() {
			super();
			this.list_recharge.vScrollBarSkin = "";
			this.list_recharge.itemRender = view.compart.RechargeListInfo;
		}

		public setData(data: any) {
			let html;
			this.data = data.cashtab
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
			let keyArr = [];
			let valueArr = [];
			for (let key in this.data) {
				// keyArr.push(key);
				let m = this.data[key].id
				valueArr.push([m, key])
				keyArr.push(m)
			}
			valueArr.sort(function (a, b) {
				return a[0] - b[0];
			})
			let tempData = [];       //tempData[i][0]  0是rmb  1是retrmb  2是status
			for(let i =0;i <valueArr.length;i++){
				let j = this.data[valueArr[i][1]].rmb
				let k = this.data[valueArr[i][1]].retrmb
				let l = this.data[valueArr[i][1]].retrmb
				tempData.push([j,k,l])
			}
			this.list_recharge.array = keyArr;
			this.list_recharge.renderHandler = new laya.utils.Handler(this, updataPetItem);
			this.list_recharge.selectEnable = true;
			function updataPetItem(cell: view.compart.RechargeListInfo, index: number) {
				var baseData = tempData[index];
				cell.setData(baseData, index)
			}

		}
	}
}