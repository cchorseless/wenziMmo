/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_ShengWang_PreviewInfo extends ui.juese.Person_ShengWang_PreviewInfoUI {
		constructor() {
			super();
		}
		public setData(data, id) {
			this.img_type.skin = 'image/juese/icon_shengwang' + id + '.png';
			this.lab_name.text = data.name;
			this.lab_detail.text = data.fame + '威望值';
		}
	}
}