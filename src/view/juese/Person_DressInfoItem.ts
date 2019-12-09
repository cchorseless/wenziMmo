/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_DressInfoItem extends ui.juese.Person_DressInfoItemUI {
		public touchID = 0;
		public base = [[1], [4], [3]]
		public static self: Person_DressInfoItem;
		constructor() {
			super();
			this.addEvent();
			this.setData()
			Person_DressInfoItem.self = this;
		}
		public setData() {
			// let pkt = new ProtoCmd.QuestClientData();
			// pkt.setString(ProtoCmd.dressPanel, [1], null, this, (jsonData) => {
			// 	let data = jsonData;
			// })
			// lcp.send(pkt);
			for (let i = 0; i < 3; i++) {
				let box = new Laya.Box();
				box.top = box.bottom = box.right = box.left = 0;
				this.V_Show.addItem(box);
			}
			this.showView_Stack(this.touchID);
		}
		public addEvent() {
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
		}
		public showView_Stack(type) {
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
			let box = this.V_Show.getChildAt(type);
			if (box.numChildren <= 0) {
				GameApp.LListener.on(ProtoCmd.dressPanel, this, (data) => {
					box.removeChildren();
					switch (this.touchID) {
						case 0:
							let o = new Person_Dress_VS_FashionDressItem();
							o.setData(data);
							o.x = 22
							box.addChild(o);
							break;
						case 1:
							let p = new Person_Dress_VS_GangQiItem();
							p.setData(data);
							p.x = 22
							box.addChild(p);
							break;
						case 2:
							// let q = new Person_Dress_VS_DesignationItem();
							// q.setData(data);
							// q.x = 22
							// box.addChild(q);
							break;
					}
				})
				let pkt0 = new ProtoCmd.QuestClientData().setString(ProtoCmd.dressPanel, this.base[type])
				lcp.send(pkt0);
			}
		}
		/**
		 * 穿戴按钮状态
		 * @param isUnLock boolean 
		 * @param hasWear boolean
		 */
		public setView_get(isUnLock: boolean, hasWear: boolean) {
			// this.btn_wear.label = 
			if (isUnLock) {
				this.btn_wear.gray = false;
				if (hasWear) {
					this.btn_wear.label = '卸下'
				} else {
					this.btn_wear.label = '穿戴'
				}
			} else {
				this.btn_wear.gray = true;
				this.btn_wear.label = '未拥有'
			}
		}
		public destory(e = true) {
			GameApp.LListener.offCaller(ProtoCmd.dressPanel, this)
			super.destroy(e)
		}
	}
}