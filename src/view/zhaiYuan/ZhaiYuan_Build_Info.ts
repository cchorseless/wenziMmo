/**Created by the LayaAirIDE*/
module view.zhaiYuan {
	export class ZhaiYuan_Build_Info extends ui.zhaiYuan.ZhaiYuan_Build_InfoUI {
		public isBuild: boolean = false;
		public configID;
		constructor() {
			super();
		}
		public setData(skin: string, name: string, need: string, lv: number, increase: number, configID: number) {
			this.configID = configID;
			this.img_icon.skin = "image/zhaiYuan/" + skin + ".png";
			this.lab_name.text = name;
			this.lab_need.text = need;
			this.lab_lv.text = '' + lv;
			this.lab_time.text = increase + '%';
			if (lv <= 0) {
				this.btn_upLv.label = "建造";
				this.btn_upLv.skin = 'image/common/button_qianwang_yellow.png'
				this.isBuild = true;
				this.btn_upLv.disabled = false;
			} else if (lv < 10 && lv > 0) {
				this.btn_upLv.label = "升级";
				this.btn_upLv.skin = 'image/common/button_qianwang_red.png'
				this.isBuild = false;
				this.btn_upLv.disabled = false;
			}else{
				this.btn_upLv.label = "已满级";
				this.btn_upLv.disabled = true;
			}
			this.addEvent();
		}
		public addEvent() {
			this.btn_upLv.on(Laya.UIEvent.CLICK, this, function () {
				//升级、建造  isBuild
				let o = new ZhaiYuan_Build_ContentDialog();
				o.setData(this.configID, this.isBuild,0);
				o.show()
			})

		}
	}
}