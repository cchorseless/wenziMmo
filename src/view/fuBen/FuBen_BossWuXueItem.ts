/**Created by the LayaAirIDE*/
module view.fuBen{
	export class FuBen_BossWuXueItem extends ui.fuBen.FuBen_BossWuXueItemUI{
		constructor(){
			super();
		}
		public setData(skillID){
			let icon = SheetConfig.mydb_magic_tbl.getInstance(null).ICONPATH(skillID);
			let name = SheetConfig.mydb_magic_tbl.getInstance(null).NAME(skillID);
			this.img_icon.skin = 'image/common/skill/skill_icon_' + icon+ '.png';
			this.lab_name.text = name;
		}
	}
}