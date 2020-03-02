/**Created by the LayaAirIDE*/
module view.npc {
	export class Main_Npc_JieBai extends ui.npc.Main_Npc_JieBaiUI {
		public npcID;
		constructor() {
			super();
		}
		public setData(npcID) {
			this.npcID = npcID;
			if (GameApp.MainPlayer.sex == 1) {
				this.lab_name1.text = GameApp.MainPlayer.objName;
				this.lab_name0.text = SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME(npcID);
				let icon = SheetConfig.mydb_npcgen_tbl.getInstance(null).ICON_ICON_NUMBER(this.npcID);
				this.img_icon0.skin = 'image/common/npc/npc_icon_' + icon + '.png';
				this.img_icon1.skin = LangConfig.getPlayerIconSkin();
			} else if (GameApp.MainPlayer.sex == 2) {
				this.lab_name0.text = GameApp.MainPlayer.objName;
				this.lab_name1.text = SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME(npcID);
				let icon = SheetConfig.mydb_npcgen_tbl.getInstance(null).ICON_ICON_NUMBER(this.npcID);
				this.img_icon1.skin = 'image/common/npc/npc_icon_' + icon + '.png';
				this.img_icon0.skin = LangConfig.getPlayerIconSkin();
			}
			this.lab_des.text = GameApp.MainPlayer.objName+'和'+SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME(npcID)+'义结金兰';
		}
	}
}