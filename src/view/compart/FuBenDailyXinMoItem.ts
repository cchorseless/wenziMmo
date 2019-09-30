/**Created by the LayaAirIDE*/
module view.compart {
	export class FuBenDailyXinMoItem extends ui.compart.FuBenDailyXinMoItemUI {
		constructor() {
			super();
		}
		public item: ProtoCmd.itf_FB_XinMoInfo;
		public setData(data: ProtoCmd.itf_FB_XinMoInfo): FuBenDailyXinMoItem {
			this.item = data;
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