/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_IntensifyContentDialog extends ui.juese.Person_IntensifyContentDialogUI {
		public curEquipLv: number = 3;
		public allData = null;
		constructor() {
			super();
		}
		public setData() {
			let arr = ["头盔", "项链", "衣服", "武器", "手镯", "手镯", "戒指", "戒指", "鞋", "腰带"]
			this.allData = GameApp.GameEngine.mainPlayer.playerEquipIntensify;

			this.lab_intensifyNum.text = "+" + this.curEquipLv;
			for (let i = 0; i < 10; i++) {
				this["lab_equip" + i].text = arr[i]
				this["lab_equip" + i].color = "#000000";
			}
			this.lab_result_intensify.text = "所有装备位强化:  " + "(" + this.onShowIntensifyNum() + "/10)";
			this.lab_effect0.text = "∞";
			this.lab_effect1.text = "∞";
			this.lab_effect2.text = "∞";
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
					this["lab_equip" + i].color = "#6dd041";
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