/**Created by the LayaAirIDE*/
module view.activity {
	export class WelfarePanel extends ui.activity.WelfarePanelUI {
		constructor() {
			super();
			this.setData()
		}

		public setData(): void {
			this.btn_0.on(Laya.UIEvent.CLICK, this, () => {
				this.addItem(0)
			})
			this.btn_1.on(Laya.UIEvent.CLICK, this, () => {
				this.addItem(1)
			})
			this.btn_2.on(Laya.UIEvent.CLICK, this, () => {
				this.addItem(2)
			})
		}

		public addItem(INDEX) {
			let ui = new view.activity.Active_list_tabItem();
			ui.lab_name.text = '' + INDEX;
			this.view_0.addItem(ui);
			this.view_0.selectedIndex=INDEX
			console.log(this.view_0);
		}
	}
}