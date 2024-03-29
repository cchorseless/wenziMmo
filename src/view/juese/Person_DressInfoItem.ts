/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_DressInfoItem extends ui.juese.Person_DressInfoItemUI {
		public touchID = 2;
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
			this.V_Show.removeChildren();
			this.upDataMyselfDress()
			for (let i = 0; i < 3; i++) {
				let box = new Laya.Box();
				box.top = box.bottom = box.right = box.left = 0;
				this.V_Show.addItem(box);
			}
			this.showView_Stack(this.touchID);
		}
		public upDataMyselfDress() {
			// this.ui_show2 = new Person_showJuese();
			let ch = GameApp.GameEngine.mainPlayer.feature.nTitleId;
			if (ch != 0) {
				let ch_Skin = SheetConfig.zhuanban_Dress.getInstance(null).RESOURCES(ch + '')
				this.ui_show2.img_ch.skin = 'image/juese/chenghao/' + ch_Skin + '.png'
			} else {
				this.ui_show2.img_ch.skin = ''
			}
			let gangqi = GameApp.GameEngine.mainPlayer.feature.dwWingId;
			if (gangqi != 0) {
				let gangqi_Skin = SheetConfig.zhuanban_Dress.getInstance(null).RESOURCES(gangqi + '')
				this.ui_show2.img_gangqi.skin = 'image/juese/' + gangqi_Skin + '.png'
			} else {
				this.ui_show2.img_gangqi.skin = ''
			}
		}
		/**
		 * 
		 * @param type   0称号  1罡气
		 * @param id     skinID
		 */
		public changeMySelfDress(type, id) {
			if (type == 0) {
				this.ui_show2.img_ch.skin = 'image/juese/chenghao/' + id + '.png'
			}
			else {
				this.ui_show2.img_gangqi.skin = 'image/juese/gangqi/' + id + '.png'
			}
		}
		public addEvent() {
			GameApp.LListener.on(ProtoCmd.UP_DATE_DRESS, this,  ()=> {
				this.upDateView();
				this.upDataMyselfDress()
			})
			EventManage.onWithEffect(this.btn_fashion, Laya.UIEvent.CLICK, this,  ()=> {
				this.touchID = 0;
				this.showView_Stack(this.touchID);
			})
			EventManage.onWithEffect(this.btn_gangqi, Laya.UIEvent.CLICK, this,  ()=> {
				this.touchID = 1;
				this.showView_Stack(this.touchID);
			})
			EventManage.onWithEffect(this.btn_Designation, Laya.UIEvent.CLICK, this,  ()=> {
				this.touchID = 2;
				this.showView_Stack(this.touchID);
			})
			EventManage.onWithEffect(this.btn_wear, Laya.UIEvent.CLICK, this,  ()=> {
				let sendData = [this.base[this.touchID][0], this.curItemId, this.isWear]
				let pkt0 = new ProtoCmd.QuestClientData().setString(ProtoCmd.dressWearAndTakeoff, sendData)
				lcp.send(pkt0);
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
			this.curBox = this.V_Show.getChildByName('item' + type);
			if (this.curBox.numChildren <= 0) {
				GameApp.LListener.on(ProtoCmd.dressPanel, this, (data) => {
					this.curBox.removeChildren();
					//   status--永久：-1，未激活：0,期限-到期时间截: > 0
					console.log("{{{{{{{{{{{{{{{{{", this.touchID)
					switch (this.touchID) {
						case 0:
							let o = new Person_Dress_VS_FashionDressItem();
							o.setData(data);
							o.x = 22
							this.curBox.addChild(o);
							GameApp.LListener.offCaller(ProtoCmd.dressPanel, this)
							break;
						case 1:
							let p = new Person_Dress_VS_GangQiItem();
							p.setData(data);
							p.x = 22
							this.curBox.addChild(p);
							GameApp.LListener.offCaller(ProtoCmd.dressPanel, this)
							break;
						case 2:
							let q = new Person_Dress_VS_DesignationItem();
							q.setData(data);
							q.x = 22
							this.curBox.addChild(q);
							GameApp.LListener.offCaller(ProtoCmd.dressPanel, this)
							break;
					}
				})
				let pkt0 = new ProtoCmd.QuestClientData().setString(ProtoCmd.dressPanel, this.base[type])
				lcp.send(pkt0);
			} else {
				let item = this.curBox.getChildAt(0).panel_show.getChildAt(0)
				this.setView_get(item.isUnLock, item.hasWear, item.dressID)
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
			this.curBox.removeChildren();
			this.upDateiew(this.curBox, this.V_Show.selectedIndex)
			// }
		}
		public upDateiew(box: Laya.Box, selectedID) {
			if (box.numChildren <= 0) {
				GameApp.LListener.on(ProtoCmd.dressPanel, this, (data) => {
					//   status--永久：-1，未激活：0,期限-到期时间截: > 0
					console.log("{{{{{{{{{{{{{{{{{", this.touchID)
					switch (this.touchID) {
						case 0:
							let o = new Person_Dress_VS_FashionDressItem();
							o.setData(data);
							o.x = 22
							this.curBox.addChild(o);
							GameApp.LListener.offCaller(ProtoCmd.dressPanel, this)
							break;
						case 1:
							let p = new Person_Dress_VS_GangQiItem();
							p.setData(data);
							p.x = 22
							this.curBox.addChild(p);
							GameApp.LListener.offCaller(ProtoCmd.dressPanel, this)
							break;
						case 2:
							let q = new Person_Dress_VS_DesignationItem();
							q.setData(data);
							q.x = 22
							this.curBox.addChild(q);
							GameApp.LListener.offCaller(ProtoCmd.dressPanel, this)
							break;
					}
				})
				let pkt0 = new ProtoCmd.QuestClientData().setString(ProtoCmd.dressPanel, this.base[selectedID])
				lcp.send(pkt0);
			}
			this.V_Show.selectedIndex = selectedID;
		}
	}
}