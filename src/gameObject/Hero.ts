/**
* name 
*/
module GameObject {
	export class Hero extends Creature {
		public feature: ProtoCmd.AnimalFeature;
		public ui_item: view.scene.HeroInSceneItem;
		constructor() {
			super();
			this.feature = new ProtoCmd.AnimalFeature();
		}

	}
}