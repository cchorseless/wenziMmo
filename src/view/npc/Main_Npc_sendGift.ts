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
		public setData(npcid, uiParent, ) {
			this.npcID = npcid;
			this.parentUI = uiParent;
			this.lbl_tili.text = GameApp.MainPlayer.nTili + '';
			this.showGiftItem();
		}
		public showGiftItem() {
			let itemMsg = SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_LOVE(this.npcID);
			let itemlist = itemMsg.split('|');
			for (let i = 0; i < 10; i++) {
				this['ui_gift' + i].initView();
			}
			for (let i = 0; i < itemlist.length; i++) {
				let num = GameUtil.findItemInBag(parseInt(itemlist[i]),GameApp.GameEngine.bagItemDB)
				this['ui_gift' + i].setData(itemlist[i], num, 3, i);
			}
		}
		public addEvent() {
			this.btn_leave.on(Laya.UIEvent.CLICK, this, function () {
				this.parentUI.view_npc.selectedIndex = 0;
			})
			for (let i = 0; i < 10; i++) {
				this['ui_gift' + i].on(Laya.UIEvent.CLICK, this, function () {
					this.touchID = i;
				})
			}
			this.btn_send.on(Laya.UIEvent.CLICK, this, function () {
				//偷窃
				if (this.touchID < 0) {
					TipsManage.showTips('未选择送礼目标')
					return;
				}
				let itemID = parseInt(this['ui_gift' + this.touchID].itemID);
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.giveGiftToNpc, [this.npcID, itemID], 0, this
					, function (res) {
						console.log('送礼回调' + res)
						this.parentUI.view_npc.selectedIndex = 0;
						let itemName = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(res.itemid)
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