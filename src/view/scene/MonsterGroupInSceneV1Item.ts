/**Created by the LayaAirIDE*/
module view.scene {
	export class MonsterGroupInSceneV1Item extends ui.scene.MonsterGroupInSceneV1ItemUI {
		constructor() {
			super();
		}


		public addItem(itemUI: view.compart.DaoJuWithNameItem) {
			for (let i = 0; i < 12; i++) {
				let box: Laya.Box = this['box_' + i];
				if (box.numChildren == 0) {
					box.addChild(itemUI);

					return true
				}
			}
		}



		public addMonster(monster): boolean {
			for (let i = 0; i < 12; i++) {
				let box: Laya.Box = this['box_' + i];
				if (box.numChildren == 0) {
					box.addChild(monster);
					return true
				}
			}
		}

		public clearAllMonster(): void {
			for (let i = 0; i < 12; i++) {
				(this['box_' + i] as Laya.Box).removeChildren();
			}
		}
	}
}