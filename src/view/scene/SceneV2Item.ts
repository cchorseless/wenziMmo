/**Created by the LayaAirIDE*/
module view.scene {
	export class SceneV2Item extends ui.scene.SceneV2ItemUI implements itf.SceneItem{
		constructor() {
			super();
		}



		public initUI(): void {

		}


		public addPlayer(obj): void {

		}
		/**
		 * 清除所有玩家
		 */
		public clearPlayer(): void {
			this.hbox_0.removeChildren();
		}

		public addMonster(obj): void {

		}
		public clearMonster(): void {

		}

	}
}