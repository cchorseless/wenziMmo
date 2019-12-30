/**Created by the LayaAirIDE*/
module view.tianJian {
	export class TianJian_DIalog extends ui.tianJian.TianJian_DIalogUI {
		constructor() {
			super();
			this.addEvent();
		}
		public setData(index) {
			let nameStr:string = SheetConfig.mydb_magic_tbl.getInstance(null).NAME(index);
			let indexOf = nameStr.indexOf('_');
			nameStr = nameStr.slice(0, indexOf);
			this.lab_Name.text = nameStr;
			this.lab_detail.text = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_DESCRIPTION(index);
		}
		public addEvent() {
			this.btn_close.on(Laya.UIEvent.CLICK, this, function () {
				this.close();
			})
		}
	}
}