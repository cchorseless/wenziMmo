/**Created by the LayaAirIDE*/
module view.recharge_vip {
	export class Recharge_VipWelfare extends ui.recharge_vip.Recharge_VipWelfareUI {
		public curPage = 1;
		public maxPage = 12;

		public vipExpBuff = 0;
		public data;
		public curCash = 0;
		public nextCash = 0;
		public vipCash = 60;

		public vipLv = 0;

		public items;

		public status = 0;
		constructor() {
			super();
			this.panel_content.vScrollBarSkin = "";
			this.panel_item.hScrollBarSkin = "";
			this.addEvent();
		}
		public setData(data) {
			this.data = data;
			this.curCash = data.curcash;
			this.nextCash = data.nextcash;
			this.vipCash = data.vipcash;
			this.curPage = data.page;
			this.status = data.status;
			this.items = data.subtab;
			this.vipLv = data.viplv
			this.upDataView();

		}
		private upDataView() {
			this.lab_progressText.text = this.curCash + "/" + this.nextCash;
			if (this.vipLv != 12) {
				this.html_text1.style.align = "center"
				this.html_text2.style.align = "center"
				let spanExp = this.nextCash - this.curCash;
				this.html_text1.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>再充值</span>" + "<span style='color:#ffffff;font-family:FZHuaLi-M14S;fontSize:28;stroke:2;strokeColor:#000000'>" + spanExp + "</span>"
					+ "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>元宝</span>";
				this.html_text2.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>即可成为</span>" + "<span style='color:#efe4a0;font-family:FZHuaLi-M14S;fontSize:30;stroke:2;strokeColor:#000000'>" + "VIP" + (this.vipLv + 1) + "</span>";
			}
			else{
				this.html_text2.style.align = "center"
				this.html_text2.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:30;stroke:0.5;strokeColor:#000000'>已满级</span>";
			}
			let span = Math.floor((this.curCash / this.nextCash) * 360)
			this.img_progressBar.width = span;

			for (let i = 0; i < 15; i++) {
				let str = SheetConfig.VIP_Content.getInstance(null)["PRIVILEGE" + i]((this.curPage - 1).toString());
				console.log(str + "|||||" + i)
				if (str != "0") {
					let o = new Recharge_VIP_WelfareItem;
					o.lab_VIPName.text = str;
					o.y = i * (o.height + 8)
					this.panel_content.addChild(o)
				} else {
					continue;
				}
			}
			for (let i in this.items) {
				let o = new view.compart.DaoJuItem();
				let itemBase = new ProtoCmd.ItemBase()
				itemBase.dwBaseID = parseInt(this.items[i].index);
				itemBase.dwCount = this.items[i].num;
				itemBase.dwBinding = this.items[i].bind;
				o.setData(itemBase, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				let p = parseInt(i);
				o.x = (o.width + 12) * (p - 1)
				this.panel_item.addChild(o)
			}
			if (this.status == 1) {
				this.btn_get.label = "可领取"
			} else if (this.status == 2) {
				this.btn_get.label = "已领取"
				this.btn_get.disabled = true;
			}
			else if (this.status == 0) {
				this.btn_get.label = "不可领取"
				this.btn_get.disabled = true;
			}
			this.lab_pageNum.text = this.curPage + "/" + this.maxPage;
		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_reFrush, Laya.UIEvent.CLICK, this, function () {
				// let o = new view.recharge_vip.Recharge_VipDialog();
				// o.setData(1);
				// o.popup(true);
				Recharge_VipDialog.self.changeTab();
			})
			EventManage.onWithEffect(this.btn_get, Laya.UIEvent.CLICK, this, function () {
				if (this.status == 1) {
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.VIP_LingQu, [this.curPage])
					lcp.send(pkt);
				}
			})
			this.btn_next.on(Laya.UIEvent.CLICK, this, function () {
				if (this.curPage >= 12) {
					TipsManage.showTips("已经是最后一页了");
					return;
				}
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.VIP_ChangePlane, [(this.curPage + 1)])
				lcp.send(pkt);
			})
			this.btn_last.on(Laya.UIEvent.CLICK, this, function () {
				if (this.curPage <= 1) {
					TipsManage.showTips("已经是第一页了");
					return;
				}
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.VIP_ChangePlane, [(this.curPage - 1)])
				lcp.send(pkt);
			})
		}
	}
}