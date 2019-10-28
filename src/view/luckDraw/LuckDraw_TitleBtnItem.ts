/**Created by the LayaAirIDE*/
module view.luckDraw {
	export class LuckDraw_TitleBtnItem extends ui.luckDraw.LuckDraw_TitleBtnItemUI {
		constructor() {
			super();
		}
		public setData(data: ProtoCmd.itf_LD_Info): LuckDraw_TitleBtnItem {
			this.btn_luckDraw.label = '' + data.name;
			this.addEvent(data.id);
			return this;
		}
		public addEvent(id): void {
			this.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.LuckDraw.box_item.removeChildren();
				if (id == 0) {
					PanelManage.LuckDraw.box_item.addChild(new view.luckDraw.LuckDraw_CangBaoItem())
				}
			})
		}
	}
}