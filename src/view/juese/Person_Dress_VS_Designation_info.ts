/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_Dress_VS_Designation_info extends ui.juese.Person_Dress_VS_Designation_infoUI {
		public itemID;
		public itemStr;
		constructor() {
			super();
		}
		public setData(data, id, status, dressID) {
			// this.img_icon.skin ='';

			this.itemID = id;
			if (this.itemID == 0) {
				this.img_circle.visible = true;
			} else {
				this.img_circle.visible = false;
			}
			let isUnLock;
			let hasWear;
			this.itemStr = data[4]
			Person_Dress_VS_DesignationItem.self.setView_get(this.itemStr);
			if (status == 0) {
				this.img_mask.visible = true;
				this.img_mask.alpha = 0.3
				isUnLock = true;
			} else {
				this.img_mask.visible = false;
				isUnLock = false;
			}
			let curDressID = GameApp.GameEngine.mainPlayer.feature.simpleFeature.dress;
			if (dressID == curDressID) {
				this.img_isDress.visible = true;
				hasWear = true;
			} else {
				this.img_isDress.visible = false;
				hasWear = false;
			}
			Person_DressInfoItem.self.setView_get(isUnLock, hasWear)

		}
	}
}