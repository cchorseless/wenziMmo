/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_Dress_VS_Designation_info extends ui.juese.Person_Dress_VS_Designation_infoUI {
		public itemID;    //在panel中的标记
		public itemStr;   //获取条件
		public effectID;  //效果ID
		public isUnLock;  //是否解锁
		public hasWear;  //是否穿戴
		public dressID;   //物品ID
		constructor() {
			super();
		}
		public setData(data, id, status, dressID) {
			this.img_chenghao.skin ='image/juese/chenghao/'+ data[5] + '.png'
			this.dressID = dressID;
			this.itemID = id;
			if (this.itemID == 0) {
				this.img_circle.visible = true;
			} else {
				this.img_circle.visible = false;
			}
			this.itemStr = data[4]
			this.effectID = data[1];
			if (status == 0) {
				this.img_mask.visible = true;
				this.img_mask.alpha = 0.3
				this.isUnLock = false;
			} else {
				this.img_mask.visible = false;
				this.isUnLock = true;
			}
			let curDressID = GameApp.GameEngine.mainPlayer.feature.nTitleId;
			if (dressID == curDressID) {
				this.img_isDress.visible = true;
				this.hasWear = true;
			} else {
				this.img_isDress.visible = false;
				this.hasWear = false;
			}
			if (id == 0) {
				Person_Dress_VS_DesignationItem.self.setView_get(this.itemStr);
				Person_Dress_VS_DesignationItem.self.setEffectShow(this.effectID);
				
				Person_DressInfoItem.self.setView_get(this.isUnLock, this.hasWear, dressID)
			}




		}
	}
}