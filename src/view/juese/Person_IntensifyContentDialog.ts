/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_IntensifyContentDialog extends ui.juese.Person_IntensifyContentDialogUI {
		public curEquipLv: number = 3;
		public allData = null;
		public lvNum = 3;
		constructor() {
			super();
		}
		public setData() {
			let arr = ["头盔", "项链", "衣服", "武器", "手镯", "手镯", "戒指", "戒指", "鞋", "腰带"]
			this.allData = GameApp.GameEngine.mainPlayer.playerEquipIntensify;
			let lv = this.onLvIntensify();
			for (let i = 0; i < 10; i++) {
				this['btn_equip' + i].label = arr[i];
				this['btn_equip' + i].selected = false;
			}
			this.lab_result_intensify.text = "所有装备位强化:" + this.curEquipLv + "(" + this.onShowIntensifyNum() + "/10)";
			let effid: number;
			for (let i in this.allData.sooulchaintab) {
				if (lv >= this.allData.sooulchaintab[i].minlvl && lv >= this.allData.sooulchaintab[i].maxlvl) {
					effid = this.allData.sooulchaintab[i].effid
				}
			}
			let effData = GameUtil.parseEffectidToString(effid + "")
			for (let i = 0; i < effData.des.length; i++) {
				let str = effData.des[i];
				let loc = str.indexOf(":")
				let str1 = str.substring(0, loc + 1);
				let str2 = str.substring(loc + 1, str.length)
				this["lab_name" + i].text = str1
				this["lab_effect" + i].text = str2
			}
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
		private onLvIntensify(): number {

			let type = GameApp.GameEngine.mainPlayer.playerORHero;
			let aa;
			let lv3 = 0;
			let lv5 = 0;
			let lv7 = 0;
			let lv9 = 0;
			let lv11 = 0;
			let lv13 = 0;
			let lv15 = 0;
			if (type == 1) {
				aa = this.allData.herojson;
			}
			else {
				aa = this.allData.playerjson;
			}
			for (let i in aa) {
				if (aa[i] >= 3) {
					lv3++;
					if (aa[i] >= 5) {
						lv5++;
						if (aa[i] >= 7) {
							lv7++;
							if (aa[i] >= 9) {
								lv9++;
								if (aa[i] >= 11) {
									lv11++;
									if (aa[i] >= 13) {
										lv13++;
										if (aa[i] >= 15) {
											lv15++;
										}
									}
								}
							}
						}
					}


				}
			}
			if (lv15 >= 10 && lv13 >= 10) {
				this.lvNum = 15;
				return lv15;
			}
			else if (lv13 <= 10 && lv11 >= 10) {
				this.lvNum = 13;
				return lv13;
			}
			else if (lv11 <= 10 && lv9 >= 10) {
				this.lvNum = 11;
				return lv11;
			}
			else if (lv9 <= 10 && lv7 >= 10) {
				this.lvNum = 9;
				return lv9;
			}
			else if (lv7 <= 10 && lv5 >= 10) {
				this.lvNum = 7;
				return lv7;
			}
			else if (lv5 <= 10 && lv3 >= 10) {
				this.lvNum = 5;
				return lv5;
			}
			else if (lv3 <= 10) {
				this.lvNum = 3;
				return lv3;
			}
		}
		private onShowIntensifyNum(): number {
			let type = GameApp.GameEngine.mainPlayer.playerORHero;
			let aa;
			let lv3 = 0;
			let lv5 = 0;
			if (type == 0) {
				aa = this.allData.playerjson;
			}
			else if (type > 0) {
				aa = this.allData.herojson;
			}

			for (let i in aa) {
				if (aa[i] >= 3) {
					// this["btn_equip" + i].selected = true;
					lv3++;
					if (aa[i] >= 5) {
						lv5++
					}
				}
			}
			if (lv5 == 10) {
				this.curEquipLv = 5;
				return lv5;
			}
			else {
				this.curEquipLv = 3;
				return lv3;
			}
		}
	}
}