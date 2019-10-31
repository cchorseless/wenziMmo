/**Created by the LayaAirIDE*/
module view.scene {
	export class BattleSkillContonlV0Item extends ui.scene.BattleSkillContonlV0ItemUI {
		constructor() {
			super();
			this.setData();
		}

		public setData(): void {

			this.addEvent();
		}


		public addEvent(): void {
			this.btn_show0.on(Laya.UIEvent.CLICK, this, () => {
				this.viw_0.selectedIndex = 1;
			})
			this.btn_show1.on(Laya.UIEvent.CLICK, this, () => {
				this.viw_0.selectedIndex = 0;
			})
		}
	}
}