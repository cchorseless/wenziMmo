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
				//物品品质
				let quality = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMQUALITY(itemlist[i]);
				let lv = GameApp.MainPlayer.skillInfo['400002'].subLevel;//偷窃技能等级
				let haoganExp = Main_TanSuoV1Dialog.self.curExp;//好感度
				let k = (0.5 + 0.05 * lv + - 0.01 * quality - 0.01 * quality) * 100;
				this['ui_steal' + i].setData(itemlist[i], k, 0, i);
			}
		}
		public showLight() {
			for (let i = 0; i < 9; i++) {
				this['ui_steal' + i].setLight(false);
			}
			this['ui_steal' + this.touchID].setLight(true);
		}
		public addEvent() {
			this.btn_leave.on(Laya.UIEvent.CLICK, this, function () {
				this.parentUI.view_npc.selectedIndex = 0;
			})
			for (let i = 0; i < 10; i++) {
				this['ui_steal' + i].on(Laya.UIEvent.CLICK, this, function () {
					this.touchID = i;
					this.showLight();
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
						this.parentUI.curExp = res.likeValue;
						this.parentUI.lvl = res.lvl;
						this.parentUI.updataHaoGan();
						this.parentUI.view_npc.selectedIndex = 0;
						let itemName = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(res.itemid)
						let str = '';
						let npcName = SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME(this.npcID)
						if (res.ret == 0) {
							str = npcName + '说道：“你一来，我就发现少了件东西”' +
								'\n偷窃成功，NPC好感度降低50点，你获得' + itemName + '，窃术熟练度上升100点。';

						} else {
							str = npcName + '说道：“这是怎么一回事，为何拿我的东西”' +
								'\n偷窃失败，NPC好感度降低500点，你的名誉降低5点。';
						}
						GameApp.LListener.event(Main_TanSuoV1Dialog.UPDATE_DETAIL, str)
					})
				lcp.send(pkt);

			})
		}
	}
}