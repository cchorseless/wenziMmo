/**Created by the LayaAirIDE*/
module view.compart {
	export class ChatInfo extends ui.compart.ChatInfoUI {
		public maxLength = 390;
		public minLength = 100;
		constructor() {
			super();
			this.addEvent();
		}
		public setData(content, name, type, vip_LV, lv, zhuansheng, headPic) {
			console.log("我是谁谁谁", content)
			this.lab_chatContent.text = content;
			this.img_tabType.skin = "image/main/tab_diangqian_0" + type + ".png";
			switch (type) {
				case 1:
					this.lab_tabType.strokeColor = "#b65c41"
					this.lab_tabType.text = "系统"
					break;
				case 2:
					this.lab_tabType.strokeColor = "#7e41b6"
					this.lab_tabType.text = "世界"
					break;
				case 3:
					this.lab_tabType.strokeColor = "#4595b1"
					this.lab_tabType.text = "帮派"
					break;
				case 4:
					this.lab_tabType.strokeColor = "#4fb145"
					this.lab_tabType.text = "队伍"
					break;
				case 5:
					this.lab_tabType.strokeColor = "#717171"
					this.lab_tabType.text = "当前"
					break;
			}
			this.lab_LV.text = lv+"级";
			this.lab_zhuanshengLV.text = zhuansheng+"转";
			this.lab_name.text = name;
			this.lab_vipLV.text = "" + vip_LV;
			this.img_head.skin = "image/common/" + headPic + ".png"
		}
		public addEvent() {
			this.img_head.on(Laya.UIEvent.CLICK, this, function () {

			})
		}
	}
}