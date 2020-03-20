/**Created by the LayaAirIDE*/
module view.npc {
	export class Main_Npc_sendGift extends ui.npc.Main_Npc_sendGiftUI {
		public static self: Main_Npc_sendGift;
		public npcID;
		public parentUI;
		public touchID;
		constructor() {
			super();
			Main_Npc_sendGift.self = this;
			this.touchID = -1;
			this.addEvent();
		}
		/**
         * 
         * @param npcid  npc 的id
         * @param parent 父载体
         */
		public setData(npcid, uiParent) {
			this.npcID = npcid;
			this.parentUI = uiParent;
			this.lbl_tili.text = GameApp.MainPlayer.nTili + '';
			this.showGiftItem();
		}
		public showGiftItem() {
			let itemMsg = SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_LOVE(this.npcID);
			let itemlist = itemMsg.split('|');
			// let itemlist = [1000,1001,1002,1003,1004,1005,1006,1007,1008,1009]
			// for (let i = 0; i < 10; i++) {
			// 	this['ui_gift' + i].initView();
			// }
			if (itemlist.length == 1) {
				let likeValue = SheetConfig.mydb_item_base_tbl.getInstance(null).LIKEVALUE(itemlist[0]);
				// this.lab_haogan
				this['lab_haogan' + 1].text = '+' + likeValue;
				let item = new ProtoCmd.ItemBase();
				item.dwBaseID = parseInt(itemlist[0])
				let num: number = GameUtil.findItemInBag(item.dwBaseID)
				item.dwCount = num;
				item.dwBinding = 1;
				// this.ui_daoju0.setData(item)
				this['ui_daoju' + 1].setData(item)
				this.ui_daoju0.visible = this.ui_daoju2.visible = false;
				this.box_value0.visible = this.box_value2.visible = false;
			} else {
				this.ui_daoju0.visible = this.ui_daoju2.visible = true;
				this.box_value0.visible = this.box_value2.visible = true;
				for (let i = 0; i < itemlist.length; i++) {
					let likeValue = SheetConfig.mydb_item_base_tbl.getInstance(null).LIKEVALUE(itemlist[i]);
					// this.lab_haogan
					this['lab_haogan' + i].text = '+' + likeValue;
					let item = new ProtoCmd.ItemBase();
					item.dwBaseID = parseInt(itemlist[i])
					let num: number = GameUtil.findItemInBag(item.dwBaseID)
					item.dwCount = num;
					item.dwBinding = 1;
					// this.ui_daoju0.setData(item)
					this['ui_daoju' + i].setData(item)
				}
			}

		}
		public showLight() {
			for (let i = 0; i < 3; i++) {
				this['img_light' + i].visible = false;
			}
			this['img_light' + this.touchID].visible = true;
		}
		public dealTouch() {
			let span = this.endTime - this.startTime;
			if (span < 1000) {
				this.showLight();
			} else {
				this['ui_daoju' + this.touchID].ui_item.clickEvent();
				this.showLight();
			}
			this.isTouch = false;
		}
		public startTime;
		public isTouch = false;
		public endTime;
		public addEvent() {
			// this.ui_daoju0.ui_item.clickEvent();
			this.btn_leave.on(Laya.UIEvent.CLICK, this, function () {
				this.parentUI.view_npc.selectedIndex = 0;
			})
			for (let i = 0; i < 3; i++) {
				this['box' + i].on(Laya.UIEvent.MOUSE_DOWN, this, function () {
					this.touchID = i;
					this.isTouch = true;
					this.startTime = Date.now();
				})
				this['box' + i].on(Laya.UIEvent.MOUSE_UP, this, function () {
					if (this.isTouch) {
						this.endTime = Date.now();
						this.dealTouch();
					}
				})
				this['box' + i].on(Laya.UIEvent.MOUSE_OUT, this, function () {
					if (this.isTouch) {
						this.endTime = Date.now();
						this.dealTouch();
					}
				})
			}
			this.btn_send.on(Laya.UIEvent.CLICK, this, function () {
				//偷窃
				if (this.touchID < 0) {
					TipsManage.showTips('未选择送礼目标')
					return;
				}
				let itemID = this['ui_daoju' + this.touchID].itemID;
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.giveGiftToNpc, [this.npcID, itemID], 0, this
					, function (res) {
						console.log('送礼回调' + res)
						this.parentUI.curExp = res.likeValue;
						this.parentUI.lvl = res.lvl;
						this.parentUI.updataHaoGan();
						this.parentUI.view_npc.selectedIndex = 0;
						let itemName = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(itemID)
						let str = '';
						if (res.ret == 0) {
							str = '送礼成功！'
						} else {
							str = '送礼失败!'
						}
						GameApp.LListener.event(Main_TanSuoV1Dialog.UPDATE_DETAIL, str)
					})
				lcp.send(pkt);

			})
		}
	}
}