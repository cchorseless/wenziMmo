/**Created by the LayaAirIDE*/
module view.npc {
	export class Main_Npc_Marry extends ui.npc.Main_Npc_MarryUI {
		public npcID
		constructor() {
			super();
		}
		public setData(npcid) {
			this.npcID - npcid;
			if (GameApp.MainPlayer.sex == 1) {
				this.lab_name1.text = GameApp.MainPlayer.objName;
				this.lab_name0.text = SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME(npcid);
				let icon = SheetConfig.mydb_npcgen_tbl.getInstance(null).ICON_ICON_NUMBER(this.npcID);
				this.img_pic0.skin = 'image/common/npc/npc_icon_' + icon + '.png';
				this.img_pic1.skin = LangConfig.getPlayerIconSkin();
			} else if (GameApp.MainPlayer.sex == 2) {
				this.lab_name0.text = GameApp.MainPlayer.objName;
				this.lab_name1.text = SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME(npcid);
				let icon = SheetConfig.mydb_npcgen_tbl.getInstance(null).ICON_ICON_NUMBER(this.npcID);
				this.img_pic1.skin = 'image/common/npc/npc_icon_' + icon + '.png';
				this.img_pic0.skin = LangConfig.getPlayerIconSkin();
			}
			this.lab_detail.text = GameApp.MainPlayer.objName+'和'+SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME(npcid)+'结为夫妻';
		}
	}
}