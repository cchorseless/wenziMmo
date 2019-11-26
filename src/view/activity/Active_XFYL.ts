/**Created by the LayaAirIDE*/
module view.activity {
	export class Active_XFYL extends ui.activity.Active_XFYLUI {
		public addReward = [];
		public curCanGetNum;
		constructor() {
			super();
			this.addEvent();
		}
		public setData(data) {
			this.curCanGetNum = data.cancnt;
			if (this.curCanGetNum > 0) {
				this.btn_get.disabled = false;
			} else {
				this.btn_get.disabled = true;
			}
			for (let i in data.jichutab) {
				let o = new view.compart.DaoJuWithNameItem();
				let itemBase = new ProtoCmd.ItemBase()
				itemBase.dwBaseID = parseInt(data.jichutab[i].index);
				itemBase.dwCount = data.jichutab[i].num;
				itemBase.dwBinding = data.jichutab[i].binding;
				o.setData(itemBase, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				o.x = (o.width + 40) * ((parseInt(i) - 1) % 2)
				o.y = (o.height + 40) * Math.floor((parseInt(i) - 1) / 2)
				this.panel_item.addChild(o)
			}

			for (let i in data.leijitab) {
				if (data.leijitab[i]) {
					this.addReward.push(data.leijitab[i])
					this["lab_addNum" + i].text = "累计" + data.leijitab[i].needcnt + "次";
					if (data.leijitab[i].state == 0) {
						this["btn_reward" + i].skin = "image/common/icon_baoxiang4_close.png"
					} else if (data.leijitab[i].state == 1) {
						this["btn_reward" + i].skin = "image/common/icon_baoxiang4_light.png"
					} else if (data.leijitab[i].state == 2) {
						this["btn_reward" + i].skin = "image/common/icon_baoxiang4_open.png"
					}
				}
			}
			for (let i = 0; i < this.addReward.length; i++) {
				let baseNum = this.addReward[i].needcnt;
				if (i == 0) {
					if (data.usecnt <= baseNum) {
						this.img_progressBase2.width = data.usecnt * (80 / baseNum);
					}
				} else {
					let lastNum = this.addReward[i - 1].needcnt;
					let spanCnt = data.usecnt - lastNum;
					let spanNum = baseNum - lastNum
					if (data.usecnt <= baseNum && data.usecnt > lastNum) {
						this.img_progressBase2.width = this["btn_reward" + i].x + spanCnt * (80 / spanNum);
					}
				}
			}

			this.lab_yuanbao.text = data.consume + ""
			GameUtil.timeCountDown(data.lefttime, this.html_time);
			this.lab_detail.text = "再消费" + data.needyuanbao + "元宝可领取一次奖励";
			this.lab_progress.text = data.nowcnt + "/" + data.yuanbao;
			this.html_getNum.style.align = "center";
			this.html_totalGet.style.align = "center";
			this.img_progressBase1.width = (data.nowcnt / data.yuanbao) * this.img_progressBG1.width;
			this.html_getNum.innerHTML = "<span style='color:#000000;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>可领取奖励</span>"
				+ "<span style='color:#a53232;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>" + data.cancnt + "</span>"
				+ "<span style='color:#000000;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>次</span>";
			this.html_totalGet.innerHTML = "<span style='color:#55453e;font-family:STLiti;fontSize:24'>累计领取次数:</span>"
				+ "<span style='color:#ffffff;font-family:STLiti;fontSize:24;stroke:3;strokeColor:#000000'>" + data.usecnt + "</span>"

		}
		public addEvent() {
			this.btn_get.on(Laya.UIEvent.CLICK, this, function () {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.GetXFYLJiChuAward, null)
				lcp.send(pkt);
			})
			for (let i = 1; i < 7; i++) {
				this["btn_reward" + i].on(Laya.UIEvent.CLICK, this, function () {
					let index = this.addReward[i - 1].order;
					if (this.addReward[i - 1].state == 0 || this.addReward[i - 1].state == 2) {
						let o = new Active_Luck_Gift_Dialog()
						o.setData(this.addReward[i - 1].itemtab, "累计奖励" + index);
						o.popup();
					} else if (this.addReward[i - 1].state == 1) {
						let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.GetXFYLAward, [index])
						lcp.send(pkt);
					}
				})
			}
		}
	}
}