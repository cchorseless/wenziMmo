/**
* name 
*/
module GameObject {
	export class Hero extends Creature {

		public static NowExp: number = 0;
		public static MaxExp: number = 0;
		public static zslevel = 0;
		public static level = 0;
		public feature: ProtoCmd.AnimalFeature;
		public ui_item;
		constructor() {
			super();
			this.feature = new ProtoCmd.AnimalFeature();
		}

		// 复活倒计时
		public rebornLeftTime = 0;

		// 是否出战
		public get isOnBattle(): boolean {
			return GameApp.MainPlayer.curHero.feature.simpleFeature.job == this.feature.simpleFeature.job;
		}
		// 锁定状态 0未激活1可激活2已激活
		public lockState = 0;

	}
}