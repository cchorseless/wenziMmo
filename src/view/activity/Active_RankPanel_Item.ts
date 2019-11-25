/**Created by the LayaAirIDE*/
module view.activity {
	// view.activity.Active_RankPanel_Item
	export class Active_RankPanel_Item extends ui.activity.Active_RankPanel_ItemUI {
		constructor() {
			super();
		}
		public setData(data, id) {
			let nameData = data.rank;
			let needData = data.item;
			this.setTimeShow(data, id);
			for (let i = 1; i < 6; i++) {
				// this.item_1.lab_rank.text
				if (i == 1 || i == 2 || i == 3) {
					this["item_" + i].img_rank.skin = "image/menu/icon_rank" + i + ".png"
					this["item_" + i].img_rank.visible = true;
				}else{
					this["item_" + i].img_rank.visible = false;
				}
				this["item_" + i].lab_rank.text = i.toString();
				this["item_" + i].lab_name.text = nameData[i].name;
				this["item_" + i].lab_num.text = needData[i].needyuanbao.toString();
				let length = 0
				for (let p in needData[i].item) {
					let o = new view.compart.DaoJuItem();
					let item1 = new ProtoCmd.ItemBase()
					item1.dwBaseID = needData[i].item[p].index;
					item1.dwCount = needData[i].item[p].num;
					item1.dwBinding = needData[i].item[p].bind;
					o.x = (parseInt(p) - 1) * (o.width + 10);
					o.setData(item1, EnumData.ItemInfoModel.SHOW_IN_MAIL)
					this["item_" + i].panel_reward.addChild(o);
				}

			}
		}
		public setTimeShow(data, id) {
			let leftTime = data.leftsec;
			this.lab_rules.text = data.introduce

			if (leftTime > 0) {
				let aa = TimeUtils.getFormatBySecond(leftTime, 6);
				this.html_time.style.align = "center";
				this.html_time.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>剩余时间：</span>"
				 + "<span style='color:#a53232;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>" + aa + "</span>";
				this.onshowTime(leftTime)
			} else {
				this.timerEnd();
			}
			if (data.yuanbao != null) {
				this.html_cost.style.align = "center";
				let str: string;
				if (id == 4) {
					str = "当前消费："
				}
				else {
					str = "当前充值："
				}
				this.html_cost.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>" 
				+ str + "</span>" + "<span style='color:#179a0d;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>"
				+ data.yuanbao + "</span>";
			}
			else {
				this.html_cost.innerHTML = "";
			}
		}
		private onshowTime(leftTime) {
			if (leftTime > 0) {
				Laya.timer.frameLoop(3600, this, function () {
					leftTime -= 60;
					if (leftTime > 0) {
						let aa = TimeUtils.getFormatBySecond(leftTime, 6)
						this.html_time.style.align = "center";
						this.html_time.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>剩余时间：</span>"
						 + "<span style='color:#a53232;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>" + aa + "</span>";
					}
					else {
						this.timerEnd()
					}
				});
			} else {
				this.timerEnd();
			}

		}
		private timerEnd() {
			Laya.timer.clearAll(this)
			TipsManage.showTips("活动已结束")
			// PopUpManager.checkPanel(this);
		}
	}
}