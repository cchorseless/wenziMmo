/**Created by the LayaAirIDE*/
module view.menu {
	export class MenuQiandaoItem extends ui.menu.MenuQiandaoItemUI {
		constructor() {
			super();
		}
		//签到Item索引
		public data;
		//历史记录数组
		public day;
		//当前日期
		public num;
		public setData(data, day: Array<string>, num): void {
			this.data = data;
			this.day = day;
			this.num = num;
			this.lbl_date.text = data + '天';
			this.img_qiandao.visible = false;
			if (day.indexOf('' + data) > -1) {
				this.img_qiandao.visible = true;
				this.img_qiandao.skin = 'image/menu/zi_yiqiandao.png'
			}
			else {
				if (data < num) {
					this.img_qiandao.visible = true;
					this.img_qiandao.skin = 'image/menu/zi_yiqiandao.png'
				}
			}
			this.addEvent();
		}
		public addEvent(): void {
			this.on(Laya.UIEvent.CLICK, this, () => {
				if (this.data == this.num) {
					if (this.img_qiandao.visible == false) {
						this.init_sign();
					}
				}
			})
		}
		public init_sign(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Menu_QianDao_ZengJia)
			lcp.send(pkt);
		}
	}
}