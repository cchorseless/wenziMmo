/**Created by the LayaAirIDE*/
module view.promotion {
	export class Promotion_WorthGift_Item extends ui.promotion.Promotion_WorthGift_ItemUI {
		public data;
		public bj;    //0购买   1  领取
		public cnt;  //剩余购买次数
		constructor() {
			super();
			this.addEvent();
		}

		public setData(data) {
			this.data = data;
			this.bj = data.bj;
			this.cnt = data.cnt;
			this.setTimeShow(data);
			for (let i = 1; i < 7; i++) {
				let base = data.item;
				let o = new view.compart.DaoJuItem();
				let itemBase = new ProtoCmd.ItemBase()
				itemBase.dwBaseID = parseInt(base.item[i].index);
				itemBase.dwCount = base.item[i].num;
				itemBase.dwBinding = base.item[i].bind;
				o.setData(itemBase, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				this["box_" + i].addChild(o);
				let name = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(itemBase.dwBaseID.toString());
				this["lab_name" + i].text = name;
			}
			this.showBtnState();
		}
		public showBtnState() {
			if (this.cnt > 0) {
				this.btn_buy.disabled = false;
				if (this.bj == 0) {
					this.btn_buy.label = "购买";
				} else if (this.bj == 1) {
					this.btn_buy.label = "领取";
				}
			}
			else {
				this.btn_buy.disabled = true;
				this.btn_buy.label = "已售罄";
			}
		}
		public setTimeShow(data) {
			this.lab_LastPrice.text = "原价" + data.item.oldprice + "元";
			//现价
			this.clip_nowPrice.value = '' + data.item.newprice;

			this.html_buyTimes.style.align = "center";
			this.html_buyTimes.innerHTML = "<span style='color:#000000;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>限购次数：</span>"
				+ "<span style='color:#a53232;font-family:FZHuaLi-M14S;fontSize:24'>" + data.cnt + "</span>"
				+ "<span style='color:#000000;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>次</span>"


			let leftTime = data.leftsec;
			if (leftTime > 0) {
				let aa = TimeUtils.getFormatBySecond(leftTime, 6);
				this.html_time.style.align = "center";
				this.html_time.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>剩余时间：</span>"
					+ "<span style='color:#a53232;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + aa + "</span>";

				this.onshowTime(leftTime)
			}
			// this.html_CurPrice
			// this.html_buyTimes
		}
		private onshowTime(leftTime) {
			if (leftTime > 0) {
				Laya.timer.frameLoop(3600, this, function () {
					leftTime -= 60;
					if (leftTime > 0) {
						let aa = TimeUtils.getFormatBySecond(leftTime, 6)
						this.html_time.style.align = "center";
						this.html_time.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>剩余时间：</span>" + "<span style='color:#a53232;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + aa + "</span>";
					}
				});
			}

		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_buy, Laya.UIEvent.CLICK, this, () => {
				if (this.bj == 0) {
					let o = new view.recharge_vip.Recharge_VipDialog();
					o.setData(0);
					o.popup(true);
				} else if (this.bj == 1) {
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.ChaoZhiBuy, null)
					lcp.send(pkt);
				}

			})

		}

	}
}