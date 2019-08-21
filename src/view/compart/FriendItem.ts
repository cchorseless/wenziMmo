/**Created by the LayaAirIDE*/
module view.compart {
	export class FriendItem extends ui.compart.FriendItemUI {
		constructor() {
			super();
			this.addEvent();
		}
		public friendItem: ProtoCmd.stRelationInfoBase;
		public setData(item: ProtoCmd.stRelationInfoBase): FriendItem {
			return this;	
			
		}
		public addEvent():void{
			
				
			
		}
	}
}