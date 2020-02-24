/**Created by the LayaAirIDE*/
module view.npc {
	export class Main_Npc_stealitem extends ui.npc.Main_Npc_stealitemUI {
		public static self: Main_Npc_stealitem;
		public npcID;
		public parentUI;
		public touchID;
		constructor() {
			super();
			Main_Npc_stealitem.self = this;
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
			this.showStealItem();
		}
		public showStealItem() {
			let itemMsg = SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_BAOWU(this.npcID);
			let itemlist = itemMsg.split('|');
			for (let i = 0; i < 10; i++) {
				this['ui_steal' + i].initView();
			}
			for (let i = 0; i < itemlist.length; i++) {
				this['ui_steal' + i].setData(itemlist[i], 0, 0, i);
			}
		}
		public addEvent() {
			this.btn_leave.on(Laya.UIEvent.CLICK, this, function () {
				this.parentUI.view_npc.selectedIndex = 0;
			})
			for (let i = 0; i < 10; i++) {
				this['ui_steal' + i].on(Laya.UIEvent.CLICK, this, function () {
					this.touchID = i;
				})
			}
			this.btn_steal.on(Laya.UIEvent.CLICK, this, function () {
				//偷窃
				if (this.touchID < 0) {
					TipsManage.showTips('未选择偷窃目标')
					return;
				}
				let itemID = parseInt(this['ui_steal' + this.touchID].itemID);
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.stealNpcItem, [this.npcID, itemID], 0, this
					, function (res) {
						console.log('偷窃回调' + res)
						this.parentUI.view_npc.selectedIndex = 0;
						let itemName = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(res.itemid)
						let str = '';
						if (res.ret == 0) {
							str = '偷窃成功！'
						}else{
							str = '偷窃失败!'
						}
						GameApp.LListener.event(Main_TanSuoV1Dialog.UPDATE_DETAIL, str)
					})
				lcp.send(pkt);

			})
		}
	}
}