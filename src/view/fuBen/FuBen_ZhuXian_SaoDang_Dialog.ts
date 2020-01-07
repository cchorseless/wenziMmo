/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_ZhuXian_SaoDang_Dialog extends ui.fuBen.FuBen_ZhuXian_SaoDang_DialogUI {
		public static self:FuBen_ZhuXian_SaoDang_Dialog;
		public pzID;
		constructor() {
			super();
			this.addEvent();
			this.panel_show.vScrollBarSkin = '';
			FuBen_ZhuXian_SaoDang_Dialog.self = this;
		}
		public setData(pzID, StarArr) {

			this.pzID = pzID;

			let dataArr = SheetConfig.Thread_sweep_tbl.getInstance(null).GetPZMsg(pzID);
			let result = [];
			for (var i = 0; i < dataArr.length; i += 3) {
				result.push(dataArr.slice(i, i + 3));
			}
			for (let i = 0; i < result.length; i++) {
				let o = new FuBen_SaoDang_Info();
				let index = i +1 ;
				o.setData(result[i], StarArr,StarArr.starbox[2*i+1],StarArr.starbox[2*i+2])
				o.y = i * (o.height + 10)
				this.panel_show.addChild(o);
			}
			let statNum = 0;
			for (let i in StarArr.startab) {
				statNum += StarArr.startab[i];
			}
			this.lab_curStarNum.text = '' + statNum;
			this.html_times.style.fontFamily = 'STKaiti';
			this.html_times.style.fontSize = 22;
			this.html_times.style.align = 'center';
			this.html_times.innerHTML = "<span style='color:#e78782'>" + FuBen_MainPanel.self.curTimes+ '</span>' 
			+ "<span style='color:#f2f2f2'>/" + FuBen_MainPanel.self.maxTimes + '</span>';
		}
		public addEvent() {
			this.btn_close.on(Laya.UIEvent.CLICK, this, function () {
				this.close();
			})
		}
	}
}