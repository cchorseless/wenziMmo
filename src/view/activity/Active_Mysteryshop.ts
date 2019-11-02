/**Created by the LayaAirIDE*/
module view.activity {
	export class Active_Mysteryshop extends ui.activity.Active_MysteryshopUI {
		public reFrushNum = 0;
		constructor() {
			super();

			this.addEvent()
		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_UpDate, Laya.UIEvent.CLICK, this, function () {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.ShenMi_ShuaXin, null)
				lcp.send(pkt);
			})
			for (let i = 1; i < 5; i++) {
				EventManage.onWithEffect(this["ui_shopItem" + i].btn_buy, Laya.UIEvent.CLICK, this, function () {
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.ShenMi_Buy, [i])
					lcp.send(pkt);
				})
			}
		}
		public setData(data) {
			this.setTimeShow(data);
			for (let i = 1; i < 5; i++) {
				let o = new view.compart.DaoJuItem();
				let base = new ProtoCmd.ItemBase();
				base.dwBaseID = data.tab[i].index;
				base.dwCount = data.tab[i].num;
				o.setData(base, EnumData.ItemInfoModel.SHOW_IN_MAIL)
				let NameStr = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(data.tab[i].index.toString())
				this["ui_shopItem" + i].lab_name.text = NameStr;
				this["ui_shopItem" + i].box_item.addChild(o);
				if (data.tab[i].flag == 0) {
					this["ui_shopItem" + i].btn_buy.label = "购买";
					this["ui_shopItem" + i].btn_buy.disabled = false;
				} else {
					this.ui_shopItem1.btn_buy.label = "已购买";
					this.ui_shopItem1.btn_buy.disabled = true;
				}
				this["ui_shopItem" + i].lab_lastNum.text = "原：" + data.tab[i].oldprice;
				this["ui_shopItem" + i].lab_curNum.text = data.tab[i].need;
			}
		}
		public setTimeShow(data) {
			this.reFrushNum = data.shuaxinprice;
			if (data.shuaxinprice > 0) {
				this.lab_UpDateText.text = data.shuaxinprice + "元宝刷新";
			}
			else {
				this.lab_UpDateText.text = "免费刷新";
			}
			let leftTime = data.lefttime;
			if (data.introduce) {
				this.lab_rules.text = data.introduce
			} else {
				this.lab_rules.text = "参加活动赢得奖励";
			}
			let refrush = data.nexttime;

			if (leftTime > 0) {
				let aa = TimeUtils.getFormatBySecond(leftTime, 6);
				this.html_time.style.align = "center";
				this.html_time.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>剩余时间：</span>" + "<span style='color:#a53232;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + aa + "</span>";

			}
			if (refrush > 0) {
				let aa = TimeUtils.getFormatBySecond(refrush, 5);
				this.html_reFursh.style.align = "center";
				this.html_reFursh.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>距下次刷新：</span>" + "<span style='color:#a53232;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + aa + "</span>";

			}
			this.onshowTime(leftTime, refrush)
		}
		private onshowTime(leftTime, refrush) {
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
			if (refrush > 0) {
				Laya.timer.frameLoop(60, this, function () {
					refrush--;
					if (refrush > 0) {
						let aa = TimeUtils.getFormatBySecond(refrush, 5)
						this.html_reFursh.style.align = "center";
						this.html_reFursh.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>距下次刷新：</span>" + "<span style='color:#a53232;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + aa + "</span>";
					}
				});
			}

		}
	}
}