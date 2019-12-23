/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_Dress_VS_GangQiItem extends ui.juese.Person_Dress_VS_GangQiItemUI {
		public static self: Person_Dress_VS_GangQiItem;
		constructor() {
			super();
			this.panel_show.vScrollBarSkin = '';
			Person_Dress_VS_GangQiItem.self = this;
		}
		public setData(data) {
			for (let i in data) {
				let baseData = SheetConfig.zhuanban_Dress.getInstance(null).GETDATABYID(data[i].id + '')
				// if (baseData) {
				let o = new Person_Dress_VS_FashionDress_info()
				let p = parseInt(i) - 1;
				let status = data[i].status;
				o.setData(baseData, p, status, data[i].id, 1);
				o.y = Math.floor(p / 2) * (o.height + 6);
				o.x = p % 2 * (o.width + 10)
				this.panel_show.addChild(o);
				// }

			}
			this.addEvent();
			let e: any = this.panel_show.getChildAt(0)
			// e.selectedItem(0);
		}
		public addEvent() {
			for (let i = 0; i < this.panel_show.numChildren; i++) {
				this.panel_show.getChildAt(i).on(Laya.UIEvent.CLICK, this, function () {
					for (let o = 0; o < this.panel_show.numChildren; o++) {
						if (this.panel_show.getChildAt(o).itemID == i) {
							this.setView_get(this.panel_show.getChildAt(o).itemStr)
							Person_DressInfoItem.self.changeMySelfDress(1,this.panel_show.getChildAt(o).iconID)
							Person_DressInfoItem.self.setView_get(this.panel_show.getChildAt(o).isUnLock, this.panel_show.getChildAt(o).hasWear, this.panel_show.getChildAt(o).dressID)
							this.panel_show.getChildAt(o).img_circle.visible = true;
						} else {
							this.panel_show.getChildAt(o).img_circle.visible = false;
						}
					}
				})
			}
		}
		public setView_get(str: string) {
			this.lab_get.style.fontFamily = 'STKaiti';
			this.lab_get.style.align = 'center';
			this.lab_get.style.fontSize = 24;
			this.lab_get.innerHTML = "<span style='color:#000000'>获得途径：</span>"
				+ "<span style='color:#63491a'>" + str + "</span>";
		}
	}
}