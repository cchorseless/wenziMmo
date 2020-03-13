/**Created by the LayaAirIDE*/
module view.scene {
	export class BattleFuBenInfoV4Item extends ui.scene.BattleFuBenInfoV4ItemUI {
		constructor() {
			super();
			this.addEvent();
		}
		public isAuto = false;
		public setData() {

		}
		public addEvent() {
			//出牌监听
			GameApp.LListener.on(ProtoCmd.argueAttack, this, function (res) {
				console.log(res)
				res;
			})
			for (let i = 1; i < 4; i++) {
				this.ui_skill1.btn_choose
				this['ui_skill' + i].btn_choose.on(Laya.UIEvent.CLICK, this, function () {
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.argueAttack, [i]);
					lcp.send(pkt)
				})
			}
			this.btn_exit.on(Laya.UIEvent.CLICK, this, function () {
				main.Main_tanSuoItem.self.leaveFuBen();
			})
			this.btn_Auto.on(Laya.UIEvent.CLICK, this, function () {
				this.isAuto = !this.isAuto;
				if (this.isAuto) {
					this.btn_auto.label = '手动';

				} else {
					this.btn_auto.label = '自动';
				}
				this.autoFight();
			})


		}

		public autoFight() {
			let self = this;
			// let costMPArr = {};
			Laya.timer.loop(1000, self, fight)
			function fight() {
				if (self.isAuto) {
					self.doFight();
				} else {
					Laya.timer.clear(self, fight)
				}
			}
		}
		public doFight() {
			let cost = GameUtil.numberRandInt(1, 3);
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.argueAttack, [cost]);
			pkt.send();
		}
	}
}