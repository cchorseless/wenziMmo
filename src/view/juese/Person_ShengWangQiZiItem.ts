/**Created by the LayaAirIDE*/
module view.juese{
	export class Person_ShengWangQiZiItem extends ui.juese.Person_ShengWangQiZiItemUI{
		constructor(){
			super();
		}
		public setData(data,i):Person_ShengWangQiZiItem{
			this.img_shengwang.skin='image/common/img_qizi'+(i+1)+'.png'
			this.lbl_title.text=''+data.name;
			return this;
		}
	}
}