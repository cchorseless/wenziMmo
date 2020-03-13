/**
* name 
*/
module view.npc {
	export class Main_Npc_Argue_item extends ui.npc.Main_Npc_Argue_itemUI {
		public npcID;
		public parentUI;
		constructor() {
			super();
			this.addEvent();
		}
		public setData(npcid, uiParent) {
			this.npcID = npcid;
			this.parentUI = uiParent;
			this.showArgue()
		}
		public showArgue() {
			let lv = GameApp.MainPlayer.skillInfo['400002'].subLevel;//偷窃技能等级
			let npcKouCai = SheetConfig.mydb_npcgen_tbl.getInstance(null).ELOQUENCE(this.npcID);
			this.lab_mykoucai.text = '口才：'+ lv;
			this.lab_npckoucai.text = '口才：'+npcKouCai;
			this.img_my.skin = LangConfig.getPlayerIconSkin();
			let icon = SheetConfig.mydb_npcgen_tbl.getInstance(null).ICON_ICON_NUMBER(this.npcID);
			this.img_npc.skin = 'image/common/npc/npc_icon_' + icon + '.png';
		}
		public addEvent() {
			this.btn_leave.on(Laya.UIEvent.CLICK, this, function () {
				this.parentUI.view_npc.selectedIndex = 0;
			})
			this.btn_Argue.on(Laya.UIEvent.CLICK, this, function () {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.argueWithNpc, [this.npcID], 0, this
					, function (res) {
						console.log('辩论回调' + res)
						this.parentUI.view_npc.selectedIndex = 0;
						this.parentUI.close();
						// GameApp.LListener.event(Main_TanSuoV1Dialog.UPDATE_DETAIL, str)
						//打开辩论界面
					})
				lcp.send(pkt);
				// this.uiParent.close();
			})
		}
	}
}