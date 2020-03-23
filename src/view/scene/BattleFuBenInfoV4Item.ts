/**Created by the LayaAirIDE*/
module view.scene {
	export class BattleFuBenInfoV4Item extends ui.scene.BattleFuBenInfoV4ItemUI {
		constructor() {
			super();
			this.addEvent();
		}
		public myhp;
		public npchp;
		public isAuto = false;
		public setData() {
			for (let i = 1; i < 4; i++) {
				this['ui_skill' + i].setData(i);
				// this.ui_skill1.setData
			}
			// GameApp.LListener.event(view.scene.PlayerInSceneItem.HP, 100);
			this.myhp = 100;
			GameApp.LListener.event(view.npc.NpcIconItem.HP, 100);
			this.npchp = 100;
		}
		public addEvent() {
			//出牌监听
			// GameApp.LListener.on(ProtoCmd.argueAttack, this, function (res) {
			// 	console.log(res)
			// 	//myhp   myidx我出牌的ID   npchp  npcidx  NPC出牌的ID
			// 	res;
			// 	if (GameApp.MainPlayer.curFuBenID == 400) {
			// 		view.main.Main_tanSuoItem.self.ui_showPai.visible = true;
			// 	} else {
			// 		view.main.Main_tanSuoItem.self.ui_showPai.visible = false;
			// 	}

			// 	let mySpan = this.myhp - res.myhp;
			// 	let npcSpan = this.npchp - res.npchp;
			// 	this.myhp = res.myhp;
			// 	this.npchp = res.npchp;
			// 	let sendData: string = [res.myidx, res.npcidx, mySpan, npcSpan].join(',')

			// 	GameApp.LListener.event(view.main.Main_tanSuoItem.UpDateDes, sendData);

			// 	view.main.Main_tanSuoItem.self.ui_showPai.setData(res.myidx, res.npcidx)
			// 	GameApp.LListener.event(view.scene.PlayerInSceneItem.HP, res.myhp);
			// 	GameApp.LListener.event(view.npc.NpcIconItem.HP, res.npchp);


			// })
			for (let i = 1; i < 4; i++) {
				this.ui_skill1.btn_choose
				this['ui_skill' + i].btn_choose.on(Laya.UIEvent.CLICK, this, function () {
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.argueAttack, [i]);
					lcp.send(pkt)
					for (let i = 1; i < 4; i++) {
						this['ui_skill' + i].showCD();
						// this.ui_skill1.showCD
					}
				})
			}
			this.btn_exit.on(Laya.UIEvent.CLICK, this, function () {
				// main.Main_tanSuoItem.self.leaveFuBen();
				let o = new main.Main_BattleExit_Dialog();
				o.popup();
			})
			this.btn_Auto.on(Laya.UIEvent.CLICK, this, function () {
				this.isAuto = !this.isAuto;
				if (this.isAuto) {
					this.btn_Auto.label = '手动';

				} else {
					this.btn_Auto.label = '自动';
				}
				this.autoFight();
			})


		}
		public stopAuto() {
			this.isAuto = false;
			if (this.isAuto) {
				this.btn_Auto.label = '手动';

			} else {
				this.btn_Auto.label = '自动';
			}
			this.autoFight();
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
			for (let i = 1; i < 4; i++) {
				this['ui_skill' + i].showCD();
				// this.ui_skill1.showCD
			}

		}
	}
}