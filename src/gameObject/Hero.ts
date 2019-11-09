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

		public hasInit = false;

		public zslevel = 0;

		// 复活倒计时
		public rebornLeftTime = 0;

		// 是否出战
		public get isOnBattle(): boolean {
			return GameApp.MainPlayer.curHero.feature.simpleFeature.job == this.feature.simpleFeature.job;
		}
		// 锁定状态 0未激活1可激活2已激活
		public lockState;

	}
}