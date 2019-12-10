/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_DressInfoItem extends ui.juese.Person_DressInfoItemUI {
		public touchID = 0;
		public curItemId;
		public curBox;
		public isWear = 0;
		public base = [[1], [4], [3]]
		public static self: Person_DressInfoItem;
		constructor() {
			super();
			this.addEvent();
			this.setData()
			Person_DressInfoItem.self = this;
		}
		public setData() {
			for (let i = 0; i < 3; i++) {
				let box = new Laya.Box();
				box.top = box.bottom = box.right = box.left = 0;
				this.V_Show.addItem(box);
			}
			this.showView_Stack(this.touchID);
		}
		public addEvent() {


			//  GameApp.LListener.event(ProtoCmd.UP_DATE_DRESS); 
			GameApp.LListener.on(ProtoCmd.UP_DATE_DRESS, this, function () {
				this.upDateView();
			})


			EventManage.onWithEffect(this.btn_fashion, Laya.UIEvent.CLICK, this, function () {
				this.touchID = 0;
				this.showView_Stack(this.touchID);
			})
			EventManage.onWithEffect(this.btn_gangqi, Laya.UIEvent.CLICK, this, function () {
				this.touchID = 1;
				this.showView_Stack(this.touchID);
			})
			EventManage.onWithEffect(this.btn_Designation, Laya.UIEvent.CLICK, this, function () {
				this.touchID = 2;
				this.showView_Stack(this.touchID);
			})
			EventManage.onWithEffect(this.btn_wear, Laya.UIEvent.CLICK, this, function () {
				let sendData = [this.base[this.touchID][0], this.curItemId, this.isWear]
				let pkt0 = new ProtoCmd.QuestClientData().setString(ProtoCmd.dressWearAndTakeoff, sendData)
				lcp.send(pkt0);
			})
		}
		public showView_Stack(type) {
			let self = this;
			if (type == 0) {
				this.btn_fashion.selected = true;
				this.btn_gangqi.selected = false;
				this.btn_Designation.selected = false;
			} else if (type == 1) {
				this.btn_fashion.selected = false;
				this.btn_gangqi.selected = true;
				this.btn_Designation.selected = false;
			} else if (type == 2) {
				this.btn_fashion.selected = false;
				this.btn_gangqi.selected = false;
				this.btn_Designation.selected = true;
			}
			this.curBox = this.V_Show.getChildAt(type);
			if (this.curBox.numChildren <= 0) {
				GameApp.LListener.on(ProtoCmd.dressPanel, self, (data) => {
					this.curBox.removeChildren();
					console.log("{{{{{{{{{{{{{{{{{", this.touchID)
					switch (this.touchID) {
						case 0:
							let o = new Person_Dress_VS_FashionDressItem();
							o.setData(data);
							o.x = 22
							this.curBox.addChild(o);
							GameApp.LListener.offCaller(ProtoCmd.dressPanel, self)
							break;
						case 1:
							let p = new Person_Dress_VS_GangQiItem();
							p.setData(data);
							p.x = 22
							this.curBox.addChild(p);
							GameApp.LListener.offCaller(ProtoCmd.dressPanel, self)
							break;
						case 2:
							let q = new Person_Dress_VS_DesignationItem();
							q.setData(data);
							q.x = 22
							this.curBox.addChild(q);
							GameApp.LListener.offCaller(ProtoCmd.dressPanel, self)
							break;
					}
				})
				let pkt0 = new ProtoCmd.QuestClientData().setString(ProtoCmd.dressPanel, this.base[type])
				lcp.send(pkt0);
			}
			this.V_Show.selectedIndex = type;


		}
		/**
		 * 穿戴按钮状态
		 * @param isUnLock boolean 
		 * @param hasWear boolean
		 */
		public setView_get(isUnLock: boolean, hasWear: boolean, itemID) {
			// this.btn_wear.label = 
			this.curItemId = itemID
			// isUnLock = true;
			if (isUnLock) {
				this.btn_wear.gray = false;
				if (hasWear) {
					this.btn_wear.label = '卸下'
					this.isWear = 1;
				} else {
					this.btn_wear.label = '穿戴'
					this.isWear = 0;
				}
			} else {
				this.btn_wear.gray = true;
				this.btn_wear.label = '未拥有'
			}
		}
		public upDateView() {
			let box = this.V_Show.getChildAt(this.touchID);
			box.removeChildren();
			this.showView_Stack(this.touchID)
		}
	}
}