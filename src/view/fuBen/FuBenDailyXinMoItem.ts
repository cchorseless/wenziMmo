/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBenDailyXinMoItem extends ui.fuBen.FuBenDailyXinMoItemUI {
		constructor() {
			super();
		}
		public item: ProtoCmd.itf_FB_XinMoInfo;
		public setData(data: ProtoCmd.itf_FB_XinMoInfo): FuBenDailyXinMoItem {
			this.item = data;
			let name = SheetConfig.mydb_monster_tbl.getInstance(null).NAME('' + data.monsterid).split("_");
			this.btn_xinmo.label=''+name[0]
			this.addEvent();
			return this;
			
		}
		public addEvent(): void {
			this.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.FuBenDaily.update_XinMo(this.item);
			})
		}

	}
}