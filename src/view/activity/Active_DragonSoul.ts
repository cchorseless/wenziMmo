/**Created by the LayaAirIDE*/
module view.activity {
	export class Active_DragonSoul extends ui.activity.Active_DragonSoulUI {
		public data;
		constructor() {
			super();
		}
		public setData(data) {
			this.data = data;
			let nameData = data.rank;
			let needData = data.item;
			this.setTimeShow(data);
			for (let i = 1; i < 6; i++) {
				let o = new Active_DragonSoulInfo()
				o.setData(nameData[i], i, needData.item[i])
				o.y = (o.height + 20) * (i - 1)
				this.panel_info.addChild(o);
			}
		}
		public setTimeShow(data) {
			let leftTime = data.leftsec;
			this.lab_detail.text = data.introduce

			if (leftTime > 0) {
				let aa = TimeUtils.getFormatBySecond(leftTime, 6);
				this.html_time.style.align = "center";
				this.html_time.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>剩余时间：</span>" + "<span style='color:#a53232;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + aa + "</span>";
				this.onshowTime(leftTime)
			}
			if (data.achieve != null) {
				this.html_cost.style.align = "center";
				let str: string = "当前消费："
				this.html_cost.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>" + str + "</span>" + "<span style='color:#179a0d;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + data.achieve + "</span>";
			}
			else {
				this.html_cost.innerHTML = "";
			}
			this.html_progress.style.align = "center";
			this.html_progress.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>当前进度：</span>" + "<span style='color:#179a0d;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + data.achieve + "/" + "</span>"
				+ "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>" + data.item.need + "</span>"
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


	}
}