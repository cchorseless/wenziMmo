/**
* name 
*/
module GameObject {
	export class OtherPlayer extends Creature {
		constructor() {
			super();
			this.feature = new ProtoCmd.PlayerFeature();
		}
	}
}