/**Created by the LayaAirIDE*/
module view.main {
	export class Main_BattleExit_Dialog extends ui.main.Main_BattleExit_DialogUI {
		constructor() {
			super();
			this.addEvent();
			this.setData();
		}
		public static CloseConfirm = 'CloseConfirm'
		public setData() {
			this.html_second.style.fontFamily = 'STKaiti';
			this.html_second.style.fontSize = 26;
			this.html_second.style.align = 'center';
			this.btn_confirm.disabled = true;
			let sec = 10;
			let s = TimeUtils.getFormatBySecond(sec, 3);
			this.html_second.innerHTML = "<span>撤退倒计时：</span>"
				+ "<span>" + s + "</span>";
			Laya.timer.loop(1000, this, round)
			function round() {
				sec--;
				if (sec >= 0) {
					let str = TimeUtils.getFormatBySecond(sec, 3);
					// + "<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>"
					this.html_second.innerHTML = "<span>撤退倒计时：</span>"
						+ "<span>" + str + "</span>";
				} else {
					this.btn_confirm.disabled = false;
					Laya.timer.clear(this, round);
				}

			}
		}
		public addEvent() {
			GameApp.LListener.on(Main_BattleExit_Dialog.CloseConfirm, this, function () {
				this.onclose();

			})
			this.btn_confirm.on(Laya.UIEvent.CLICK, this, function () {
				if (GameApp.MainPlayer.curFuBenID > 0) {
					main.Main_tanSuoItem.self.leaveFuBen();

				}
				this.onclose();
				PanelManage.Main.changeMode(0);
			})
			this.btn_close.on(Laya.UIEvent.CLICK, this, function () {
				this.onclose();


			})
		}
		public onclose() {
			this.close();
			GameApp.LListener.offCaller(Main_BattleExit_Dialog.CloseConfirm, this)
		}
	}
}