/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_Dress_VS_DesignationItem extends ui.juese.Person_Dress_VS_DesignationItemUI {
		public static self: Person_Dress_VS_DesignationItem;
		public curType = 0;
		public curTouchID = 0;
		public dataArr = [];
		public statusArr = [];
		public serverData;
		constructor() {
			super();
			this.panel_show.vScrollBarSkin = '';
			this.panel_eff.hScrollBarSkin = '';
			this.hbox_effect['sortItem'] = (items) => { };
			Person_Dress_VS_DesignationItem.self = this
		}
		public setData(data) {
			this.serverData = data;
			for (let i in data) {
				let baseData = GameConfigFunc.GETDATABYID(data[i].id + '');
				if (baseData) {
					this.dataArr.push([baseData, [data[i].status, data[i].id]]);
				}

			}

			this.showView(this.curType)
		}
		public showView(type) {
			this.panel_show.removeChildren();
			let dataType = type + 1;
			let curArr = [];
			for (let i = 0; i < this.dataArr.length; i++) {
				if (this.dataArr[i][0][3] == dataType) {
					curArr.push(this.dataArr[i])
				}
			}
			for (let i = 0; i < curArr.length; i++) {
				let o = new Person_Dress_VS_Designation_info()
				o.setData(curArr[i][0], i, curArr[i][1][0], curArr[i][1][1]);
				o.y = Math.floor(i / 2) * (o.height + 6);
				o.x = i % 2 * (o.width + 10)
				this.panel_show.addChild(o);
			}
			this.addEvent();

		}
		public addEvent() {
			for (let i = 0; i < this.panel_show.numChildren; i++) {
				this.panel_show.getChildAt(i).on(Laya.UIEvent.CLICK, this, function () {
					for (let o = 0; o < this.panel_show.numChildren; o++) {
						if (this.panel_show.getChildAt(o).itemID == i) {
							this.setView_get(this.panel_show.getChildAt(o).itemStr)
							this.setEffectShow(this.panel_show.getChildAt(o).effectID)
							Person_DressInfoItem.self.changeMySelfDress(0,this.panel_show.getChildAt(o).iconID)
							Person_DressInfoItem.self.setView_get(this.panel_show.getChildAt(o).isUnLock, this.panel_show.getChildAt(o).hasWear, this.panel_show.getChildAt(o).dressID)
							this.panel_show.getChildAt(o).img_circle.visible = true;
						} else {
							this.panel_show.getChildAt(o).img_circle.visible = false;
						}
					}
				})
			}
			this.tab_show.selectHandler = Laya.Handler.create(this, (index) => {
				this.curType = index;
				this.showView(this.curType)
			}, null, false)

		}
		public setView_get(str: string) {
			this.html_get.style.fontFamily = 'STKaiti';
			this.html_get.style.align = 'center';
			this.html_get.style.fontSize = 24;
			this.html_get.innerHTML = "<span style='color:#000000'>获得途径：</span>"
				+ "<span style='color:#63491a'>" + str + "</span>";
		}

		public setEffectShow(effid) {
			// effid.replace(/|/g,',' );
			effid = effid.split('|');
			for (let i = 0; i < effid.length; i++) {
				let useEffid = effid[i];
				let effData = GameUtil.parseEffectidToObj([useEffid])
				if (effData.des.length > 0) {
					for (let i = 0; i < effData.des.length; i++) {
						this.hbox_effect.addChild(new view.compart.SinglePropsItem().setData(effData.des[i]));
					}
				}
			}
		}
	}
}