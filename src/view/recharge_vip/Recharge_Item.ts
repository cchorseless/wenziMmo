/**Created by the LayaAirIDE*/
module view.recharge_vip {
	export class Recharge_Item extends ui.recharge_vip.Recharge_ItemUI {
		private needNum = 60;
		private curNum = 50;
		private data = null;
		private giftData = null;
		public vipLv;
		constructor() {
			super();
			this.list_recharge.vScrollBarSkin = "";
			this.list_recharge.itemRender = view.compart.RechargeListInfo;
			this.addEvent();
			this.panel_item.hScrollBarSkin = "";
		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_get, Laya.UIEvent.CLICK, this, function () {
				if (this.giftData.status == 1) {
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.VIP_LingQu, [this.giftData.page])
					lcp.send(pkt);
				}
			})
		}
		public setData(data: any) {
			this.data = data.cashtab
			if (data) {
				GameApp.LListener.on(ProtoCmd.VIP_OpenPlane, this, (data) => {
					this.giftData = data;
					this.upDataView()
				})
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.VIP_OpenPlane, null)
				lcp.send(pkt);
			}
		}
		public upDataView() {
			this.lab_progressText.text = this.giftData.curcash + "/" + this.giftData.nextcash;
			this.vipLv = this.giftData.viplv
			let spanExp = this.giftData.nextcash - this.giftData.curcash;
			if (this.vipLv != 12) {
				this.textFlow.style.align = "center"
				this.textFlow.innerHTML = "<span style='color:#000000;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>再充值</span>"
					+ "<span style='color:#ffffff;font-family:FZHuaLi-M14S;fontSize:28;stroke:4;strokeColor:#000000'>" + spanExp + "</span>"
					+ "<span style='color:#000000;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>元宝</span>"
					+ "<span style='color:#000000;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>即可成为</span>"
					+ "<span style='color:#f5dd7b;font-family:FZHuaLi-M14S;fontSize:30;stroke:4;strokeColor:#000000'>" + "VIP" + (this.vipLv + 1) + "</span>";
			}
			else {
				this.textFlow.style.align = "center"
				this.textFlow.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:30;stroke:0.5;strokeColor:#000000'>已满级</span>";
			}
			let span = Math.floor((this.giftData.curcash / this.giftData.nextcash) * 360)
			this.img_progressBar.width = span;
			for (let i in this.giftData.subtab) {
				let o = new view.compart.DaoJuItem();
				let itemBase = new ProtoCmd.ItemBase()
				itemBase.dwBaseID = parseInt(this.giftData.subtab[i].index);
				itemBase.dwCount = this.giftData.subtab[i].num;
				itemBase.dwBinding = this.giftData.subtab[i].bind;
				o.setData(itemBase, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				let p = parseInt(i);
				o.x = (o.width + 12) * (p - 1)
				this.panel_item.addChild(o)
			}
			if (this.giftData.status == 1) {
				this.btn_get.label = "领取"
			} else if (this.giftData.status == 2) {
				this.btn_get.label = "已领取"
				this.btn_get.disabled = true;
			}
			else if (this.giftData.status == 0) {
				this.btn_get.label = "不可领取"
				this.btn_get.disabled = true;
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
			for (let i = 0; i < valueArr.length; i++) {
				let j = this.data[valueArr[i][1]].rmb
				let k = this.data[valueArr[i][1]].retrmb
				let l = this.data[valueArr[i][1]].retrmb
				tempData.push([j, k, l])
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