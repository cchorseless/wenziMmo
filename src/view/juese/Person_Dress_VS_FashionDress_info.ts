/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_Dress_VS_FashionDress_info extends ui.juese.Person_Dress_VS_FashionDress_infoUI {
		public itemID;   //在panel中的标记
		public itemType;//0:时装  1:罡气
		public itemStr;   //获取条件
		public isUnLock;  //是否解锁
		public hasWear;  //是否穿戴
		public dressID;   //物品ID
		constructor() {
			super();
		}
		public setData(data, id, status, dressID, type) {
			// this.img_icon.skin ='';
			this.dressID = dressID;
			this.itemType = type;
			this.itemID = id;
			if (this.itemID == 0) {
				this.img_circle.visible = true;
			} else {
				this.img_circle.visible = false;
			}
			this.lab_name.text = data[0];
			this.itemStr = data[4]
			let curDressID;
			if (status == 0) {
				this.img_mask.visible = true;
				this.img_mask.alpha = 0.3
				this.isUnLock = false;
				this.lab_hasGet.text = '未获得'
				this.lab_hasGet.color = '#a53232'
			} else {
				this.img_mask.visible = false;
				this.isUnLock = true;
				this.lab_hasGet.text = '已拥有'
				this.lab_hasGet.color = '#179a0d'
			}
			if (this.itemType == 0) {
				curDressID = GameApp.GameEngine.mainPlayer.feature.simpleFeature.dress;
			} else if (this.itemType == 1) {
				curDressID = GameApp.GameEngine.mainPlayer.feature.dwWingId;
			}
			if (dressID == curDressID) {
				this.img_isDress.visible = true;
				this.hasWear = true;
			} else {
				this.img_isDress.visible = false;
				this.hasWear = false;
			}
			if (id == 0) {
				if (this.itemType == 0) {
					Person_Dress_VS_FashionDressItem.self.setView_get(this.itemStr);
				} else if (this.itemType == 1) {
					Person_Dress_VS_GangQiItem.self.setView_get(this.itemStr);
				}
				Person_DressInfoItem.self.setView_get(this.isUnLock, this.hasWear, dressID)
			}



		}
	}
}