/**Created by the LayaAirIDE*/
module view.juese{
	export class Person_ShengWangQiZiItem extends ui.juese.Person_ShengWangQiZiItemUI{
		constructor(){
			super();
		}
		public setData(data):Person_ShengWangQiZiItem{
			this.lbl_title.text=''+data.name;
			return this;
		}
	}
}