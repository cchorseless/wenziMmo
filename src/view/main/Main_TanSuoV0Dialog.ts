/**Created by the LayaAirIDE*/
module view.main {
	export class Main_TanSuoV0Dialog extends ui.main.Main_TanSuoV0DialogUI {
		constructor() {
			super();
		}
		/**
		 * 
		 * @param data 采集物信息
		 */
		public setData(data: GameObject.Monster): Main_TanSuoV0Dialog {
			this.lbl_name.text = SheetConfig.mydb_monster_tbl.getInstance(null).NAME('' + data.feature.dwCretTypeId);
			this.lbl_level.text = 'LV.' + data.level;
			let icon = SheetConfig.mydb_monster_tbl.getInstance(null).STYLE_DRAWING('' + data.feature.dwCretTypeId);
			this.img_tu.skin = 'image/common/npc/npc_half_' + icon + '.png';
			this.lbl_des.text = SheetConfig.mydb_monster_tbl.getInstance(null).MONSTERDES('' + data.feature.dwCretTypeId);
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close;
			})
		}
	}
}