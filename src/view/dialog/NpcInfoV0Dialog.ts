/**Created by the LayaAirIDE*/
module view.dialog {
	export class NpcInfoV0Dialog extends ui.dialog.NpcInfoV0DialogUI {
		constructor() {
			super();
		}

		public setData(configId): NpcInfoV0Dialog {
			if (configId == null) { return }
			this.img_npcPic.skin = 'image/common/npc/npc_half_' + configId + '.png';
			this.lbl_npcDes0.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_DES1(configId);
			this.lbl_npcDes1.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_DES2(configId);
			let nickName = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_NICKNAME(configId);
			let commonName = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME(configId);
			this.lbl_npcName.text = commonName;
			if (nickName) { this.lbl_nickname.text = '(' + nickName + ')'; }
			this.addEvent();
			return this
		}
		public addEvent(): void {
			EventManage.onWithEffect(this.btn_close, Laya.UIEvent.CLICK, this, ()=>{this.close()})
		}
	}
}