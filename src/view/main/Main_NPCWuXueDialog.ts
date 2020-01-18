/**Created by the LayaAirIDE*/
module view.npc {
	export class Main_NPCWuXueDialog extends ui.npc.Main_NPCWuXueDialogUI {
		constructor() {
			super();
		}
		//npc信息
		public item: GameObject.Npc;
		public setData(obj: GameObject.Npc): Main_NPCWuXueDialog {
			this.item = obj;
			this.hbox_skill['sortItem'] = (items) => { };
			//NPC姓名
			this.lbl_name.text = SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME('' + obj.feature.dwCretTypeId);
			//造型图
			let icon = SheetConfig.mydb_npcgen_tbl.getInstance(null).ICON_NUMBER('' + obj.feature.dwCretTypeId);
			this.img_npc.skin = 'image/common/npc/npc_half_' + icon + '.png';
			//NPC技能
			// let skillArray = SheetConfig.mydb_npcgen_tbl.getInstance(null).SKILLS_UP_ITEM('' + obj.feature.dwCretTypeId).split('|');
			// this.hbox_skill.removeChildren();
			// for (let i in skillArray) {
			// 	let ui_item=new view.wuXue.WuXue_logoWithNameItem()
			// 	this.hbox_skill.addChild(ui_item.setData(parseInt(skillArray[i])));
			// }
			return this;
		}
	}
}