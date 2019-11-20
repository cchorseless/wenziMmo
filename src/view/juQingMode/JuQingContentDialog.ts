/**Created by the LayaAirIDE*/
module view.juQingMode {
	export class JuQingContentDialog extends ui.juQingMode.JuQingContentDialogUI {
		constructor() {
			super();
			this.addEvent();
		}
		public addEvent(){
			this.btn_close.on(Laya.UIEvent.CLICK,this,function(){
				this.close();
			})
		}
		public setData(data: string) {
			let o = data.substring(0, 1);
			let id = data.substring(2, data.length);
			let name;
			let contentText;
			switch (o) {
				case "p":                     //地点
					name = SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME(id);
					contentText = SheetConfig.mapRoomSheet.getInstance(null).ROOMDES(id);
					break;
				case "i":                     //道具
					name = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(id);
					contentText = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMDES(id);
					break;
				case "n":                     //NPC
					name = SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME(id);
					contentText = SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_DES1(id);
					break;
				case "m":                     //怪物
					name = SheetConfig.mydb_monster_tbl.getInstance(null).NAME(id);
					contentText = SheetConfig.mydb_monster_tbl.getInstance(null).MONSTERDES(id);
					break;
			}
			this.lab_Name.text = name;
			this.lab_content.text = contentText;
		}
	}
}