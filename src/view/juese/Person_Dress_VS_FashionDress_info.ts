/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_Dress_VS_FashionDress_info extends ui.juese.Person_Dress_VS_FashionDress_infoUI {
		public itemID;
		public itemType;//0:时装  1:罡气
		constructor() {
			super();
		}
		public setData(data, i, status, dressID, type) {
			// this.img_icon.skin ='';
			this.itemType = type;
			this.itemID = i;
			if(this.itemID == 0){
				this.img_circle.visible = true;
			}else{
				this.img_circle.visible = false;
			}
			this.lab_name.text = data[0];
			let isUnLock;
			let hasWear;
			if (this.itemType == 0) {
				Person_Dress_VS_FashionDressItem.self.setView_get(data[4]);
			} else if (this.itemType == 1) {
				Person_Dress_VS_GangQiItem.self.setView_get(data[4]);
			}

			if (status == 0) {
				this.img_mask.visible = true;
				this.img_mask.alpha = 0.3
				isUnLock = true;
				this.lab_hasGet.text = '未获得'
				this.lab_hasGet.color = '#a53232'
			} else {
				this.img_mask.visible = false;
				isUnLock = false;
				this.lab_hasGet.text = '已拥有'
				this.lab_hasGet.color = '#179a0d'
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
		// public selectedItem(id) {
		// 	if (id == this.itemID) {
		// 		this.img_circle.visible = true;
		// 	} else {
		// 		this.img_circle.visible = false;
		// 	}
		// }
	}
}