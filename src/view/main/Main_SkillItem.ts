/**Created by the LayaAirIDE*/
module view.main{
	export class Main_SkillItem extends ui.main.Main_SkillItemUI{
		constructor(){
			super();
		}
		public setData(configID){
			let cost = SheetConfig.mydb_magic_tbl.getInstance(null).CONSUMPTION_MANA(configID);
			this.lab_needMP.text = 'X'+cost;
			this.ui_show.setData(configID);
		}
	}
}