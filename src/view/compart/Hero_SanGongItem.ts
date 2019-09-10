/**Created by the LayaAirIDE*/
module view.compart {
	export class Hero_SanGongItem extends ui.compart.Hero_SanGongItemUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			
			this.addEvent();
		}
		public addEvent(): void {
			//转生突破
			this.btn_zhuanSheng.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.HeroZhuanShengDialog().popup(true);
			})
			
		}
	}
}