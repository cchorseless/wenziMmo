/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_ZhuXian_SaoDang_Dialog extends ui.fuBen.FuBen_ZhuXian_SaoDang_DialogUI {
		constructor() {
			super();
			this.addEvent();
			this.panel_show.vScrollBarSkin = '';
		}
		public setData(pzID, StarArr) {
			this.html_Name.style.fontFamily = 'STXingkai';
			this.html_Name.style.fontSize = 28;
			this.html_Name.style.align = 'center';
			this.html_Name.style.color = '#000000';
			this.html_Name.innerHTML = "<span>星级扫荡</span>";


			let dataArr = SheetConfig.Thread_sweep_tbl.getInstance(null).GetPZMsg(pzID);
			let result = [];
			for (var i = 0; i < dataArr.length; i += 3) {
				result.push(dataArr.slice(i, i + 3));
			}
			for (let i = 0; i < result.length; i++) {
				let o = new FuBen_SaoDang_Info();
				o.setData(result[i], StarArr)
				o.y = i * (o.height + 10)
				this.panel_show.addChild(o);
			}
			let statNum = 0;
			for (let i in StarArr) {
				statNum += StarArr[i];
			}
			this.lab_curStarNum.text = '累计总星数：' + statNum;
			this.html_times.style.fontFamily = 'STKaiti';
			this.html_times.style.fontSize = 22;
			this.html_times.style.align = 'center';
			this.html_times.innerHTML = "<span style='color:#000000'>剩余次数：</span>"
			+"<span style='color:#ff8b8b'>" + FuBen_MainPanel.self.curTimes+ '</span>' 
			+ "<span style='color:#000000'>/" + FuBen_MainPanel.self.maxTimes + '</span>';
		}
		public addEvent() {
			this.btn_close.on(Laya.UIEvent.CLICK, this, function () {
				this.close();
			})
		}
	}
}