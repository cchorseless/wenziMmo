/**Created by the LayaAirIDE*/
module view.scene {
	export class Skill_DesDialog extends ui.scene.Skill_DesDialogUI {
		public nameColorArr = ['', '4b674b', '4f5575', '6e4b70', '9f6b39', '8f3535']
		constructor() {
			super();
		}
		public setData(configID) {
			let name = SheetConfig.mydb_magic_tbl.getInstance(null).NAME(configID);
			let quality = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLQUALITY(configID);
			let color = this.nameColorArr[quality];
			this.lab_name.color = color;
			this.lab_name.text = name;
			let des = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLEFFECT(configID);
			this.lab_des.color = '#ffffff';
			this.lab_des.text = des;
			this.reSize()
		}
		public reSize() {
			this.img_bg.height =this.height = this.lab_des.y + this.lab_des.height;

		}
	}
}