/**Created by the LayaAirIDE*/
module view.compart{
	export class Person_ShengWangItem extends ui.compart.Person_ShengWangItemUI{
		constructor(){
			super();
			this.setData();
		}
			public setData(): void {
			this.panel_shengWang.hScrollBarSkin = '';
			this.hbox_shengWang['sortItem'] = (items) => { };

		}

	}
}