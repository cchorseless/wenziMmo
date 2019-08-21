/**Created by the LayaAirIDE*/
module view.compart {
	export class FriendItem extends ui.compart.FriendItemUI {
		constructor() {
			super();
			this.addEvent();
		}
		public friendItem: ProtoCmd.stRelationInfoBase;
		public setData(item: ProtoCmd.stRelationInfoBase): void {	
			
		}
		public addEvent():void{
			this.btn_friend.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.FriendDialog().popup();
			});
				
			
		}
	}
}