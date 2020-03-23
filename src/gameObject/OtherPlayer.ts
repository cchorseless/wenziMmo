/**
* name 
*/
module GameObject {
	export class OtherPlayer extends Creature {
		public feature: ProtoCmd.PlayerFeature;
		constructor() {
			super();
			this.feature = new ProtoCmd.PlayerFeature();
		}
		public get job(): EnumData.JOB_TYPE {
			return this.feature.simpleFeature.job;
		}
		/**
 		 * 性别
 		 */
		public get sex(): EnumData.SEX_TYPE {
			return this.feature.simpleFeature.sex;
		}
		/**
		 * 转生等级
		 */
		public get zslevel(): number {
			return this.feature.zslevel;
		}
		/**
 		 * 等级和
 		 */
		public get lvlCount(): number {
			return this.zslevel * 1000 + this.level
		}
		public viplvl: number = 0;//Vip等级
		public ui_item: view.scene.PlayerInSceneItem;
		public curHero: GameObject.Hero;// 当前的弟子

	}
}