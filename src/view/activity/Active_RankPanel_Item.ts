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
				this["item_" + i].lab_rank.text = i.toString();
				this["item_" + i].lab_name.text = nameData[i].name;
				this["item_" + i].lab_num.text = needData[i].needyuanbao.toString();
				let length = 0
				for (let aa in needData[i].item) {
					length++
				}
				if (length == 1) {
					// 152
					let o = new view.compart.DaoJuItem();
					let item1 = new ProtoCmd.ItemBase()
					item1.dwBaseID = needData[i].item[1].index;
					item1.dwCount = needData[i].item[1].num;
					item1.dwBinding = needData[i].item[1].bind;
					o.x = 152;
					o.y = 10;
					o.setData(item1, EnumData.ItemInfoModel.SHOW_IN_MAIL)
					this["item_" + i].addChild(o);

				} else if (length == 2) {
					// 112/191
					let o1 = new view.compart.DaoJuItem();
					let o2 = new view.compart.DaoJuItem();
					let item1 = new ProtoCmd.ItemBase()
					let item2 = new ProtoCmd.ItemBase()
					item1.dwBaseID = needData[i].item[1].index;
					item1.dwCount = needData[i].item[1].num;
					item1.dwBinding = needData[i].item[1].bind;
					item2.dwBaseID = needData[i].item[2].index;
					item2.dwCount = needData[i].item[2].num;
					item2.dwBinding = needData[i].item[2].bind;
					o1.setData(item1, EnumData.ItemInfoModel.SHOW_IN_MAIL)
					o2.setData(item2, EnumData.ItemInfoModel.SHOW_IN_MAIL)
					o1.x = 112;
					o1.y = 10;
					this["item_" + i].addChild(o1);
					o2.x = 191;
					o2.y = 10;
					this["item_" + i].addChild(o2);
				} else if (length == 3) {
					// 76\152\228    10
					let o1 = new view.compart.DaoJuItem();
					let o2 = new view.compart.DaoJuItem();
					let o3 = new view.compart.DaoJuItem();
					let item1 = new ProtoCmd.ItemBase()
					let item2 = new ProtoCmd.ItemBase()
					let item3 = new ProtoCmd.ItemBase()
					item1.dwBaseID = needData[i].item[1].index;
					item1.dwCount = needData[i].item[1].num;
					item1.dwBinding = needData[i].item[1].bind;
					item2.dwBaseID = needData[i].item[2].index;
					item2.dwCount = needData[i].item[2].num;
					item2.dwBinding = needData[i].item[2].bind;
					item3.dwBaseID = needData[i].item[3].index;
					item3.dwCount = needData[i].item[3].num;
					item3.dwBinding = needData[i].item[3].bind;
					o1.setData(item1, EnumData.ItemInfoModel.SHOW_IN_MAIL)
					o2.setData(item2, EnumData.ItemInfoModel.SHOW_IN_MAIL)
					o3.setData(item3, EnumData.ItemInfoModel.SHOW_IN_MAIL)
					o1.x = 76;
					o1.y = 10;
					this["item_" + i].addChild(o1);
					o2.x = 152;
					o2.y = 10;
					this["item_" + i].addChild(o2);
					o3.x = 228;
					o3.y = 10;
					this["item_" + i].addChild(o2);
				}
			}
		}
		public setTimeShow(data, id) {
			let leftTime = data.leftsec;
			this.lab_rules.text = data.introduce

			if (leftTime > 0) {
				let aa = TimeUtils.getFormatBySecond(leftTime, 6);
				this.html_time.style.align = "center";
				this.html_time.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>剩余时间：</span>" + "<span style='color:#a53232;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + aa + "</span>";
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
				this.html_cost.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>" +str + "</span>" + "<span style='color:#179a0d;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + data.yuanbao + "</span>";
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
						this.html_time.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>剩余时间：</span>" + "<span style='color:#a53232;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + aa + "</span>";
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