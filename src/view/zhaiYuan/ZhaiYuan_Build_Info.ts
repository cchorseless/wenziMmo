/**Created by the LayaAirIDE*/
module view.zhaiYuan {
	export class ZhaiYuan_Build_Info extends ui.zhaiYuan.ZhaiYuan_Build_InfoUI {
		public isBuild: boolean = false;
		constructor() {
			super();
		}
		public setData(skin: string, name: string, need: string, lv: number, increase: number) {
			this.img_icon.skin = "image/zhaiYuan/" + skin + ".png";
			this.lab_name.text = name;
			this.lab_need.text = need;
			this.lab_lv.text = '' + lv;
			this.lab_time.text = increase + '%';
			if (lv <= 0) {
				this.btn_upLv.label = "建造";
				this.btn_upLv.skin = 'image/common/button_qianwang_yellow.png'
				this.isBuild = true;
			} else {
				this.btn_upLv.label = "升级";
				this.btn_upLv.skin = 'image/common/button_qianwang_red.png'
				this.isBuild = false;
			}
			this.addEvent();
		}
		public addEvent() {
			this.btn_upLv.on(Laya.UIEvent.CLICK, this, function () {
				//升级、建造  isBuild
				if (this.isBuild) {

				} else {

				}
			})

		}
	}
}