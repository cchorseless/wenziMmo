/**Created by the LayaAirIDE*/
module view.recharge_vip {
	export class Recharge_VIPMonthCard extends ui.recharge_vip.Recharge_VIPMonthCardUI {
		public data;
		// data.state  -1 体验  1花钱
		// data.flag  0 未领取  1领取  2已领取 并显示倒计时
		public second = 0;
		constructor() {
			super();
			this.addEvent();
		}
		public setData(data) {
			this.data = data;
			this.second = data.sec;
			this.upDataView();
			this.showLeftTime();

		}
		public upDataView() {
			if (this.data.yuanbao >0) {
				
				this.box_isTiyan.visible = true;
			} else {
				this.box_isTiyan.visible = false;
			}
			if (this.second > 0) {

				this.box_ActiveNeed.visible = false;
				this.lab_leftTime.visible = true;
			} else if (this.data.yuanbao > 0 && this.second <= 0) {
				this.box_ActiveNeed.visible = true;
				this.lab_needNum.text = this.data.yuanbao + "";
				this.lab_leftTime.visible = false;
			}
			if (this.data.flag == 0) {
				this.btn_active.label = "激活"
				this.btn_active.disabled = false;

			} else if (this.data.flag == 1) {
				this.btn_active.label = "领取"
				this.btn_active.disabled = false;
			} else if (this.data.flag == 2) {
				this.btn_active.label = "已领取"
				this.btn_active.disabled = true;
			}
			for (let i in this.data.itemtab) {
				let o = new view.compart.DaoJuItem();
				let itemBase = new ProtoCmd.ItemBase()
				itemBase.dwBaseID = parseInt(this.data.itemtab[i].index);
				itemBase.dwCount = this.data.itemtab[i].num;
				itemBase.dwBinding = this.data.itemtab[i].bind;
				o.setData(itemBase, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				let p = parseInt(i);
				o.x = (o.width + 12) * (p - 1)
				this.panel_item.addChild(o)
			}


		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_active, Laya.UIEvent.CLICK, this, () => {
				if (this.data.flag == 0) {
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.ZGTQ_Buy, null)
					lcp.send(pkt);
				} else if (this.data.flag == 1) {
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.ZGTQ_LingQu, null)
					lcp.send(pkt);
				}
			})
		}
		public showLeftTime() {
			if (this.second > 0) {
				Laya.timer.frameLoop(60, this, function () {
					this.second--;
					if (this.second > 0) {
						let aa = TimeUtils.getFormatBySecond(this.second, 5)
						this.lab_leftTime.text = aa;
					}
				})
			}

		}
	}
}