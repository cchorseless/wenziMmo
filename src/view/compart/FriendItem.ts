/**Created by the LayaAirIDE*/
module view.compart {
	export class FriendItem extends ui.compart.FriendItemUI {
		constructor() {
			super();
		}
		public friendItem: ProtoCmd.stRelationInfoBase;
		public setData(item: ProtoCmd.stRelationInfoBase): FriendItem {
			return this;	
		}
		public addEvent():void{
			// 	this.box_fujinPerson.clickHandler = Laya.Handler.create(this, () => {
			// 	if (this.box_fujinPerson.mouseEnabled) {
			// 		Laya.Tween.to(this.img_tween, { x: 0 }, 500, Laya.Ease.bounceOut);		
			// 	}
			// 	else {
			// 		this.img_tween.visible = true;
			// 		Laya.Tween.to(this.img_tween, { x: 110 }, 500, Laya.Ease.bounceOut);
			// 	}
			// }, null, false);
			
		}
	}
}