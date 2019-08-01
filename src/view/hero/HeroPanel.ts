/**Created by the LayaAirIDE*/
module view.hero {
	export class HeroPanel extends ui.hero.HeroPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.tab_left.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_left.selectedIndex = index;
			}, null, false);
			this.addEvent();
		}
		public addEvent(): void {
			this.box_change.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			})
		}
	}
}