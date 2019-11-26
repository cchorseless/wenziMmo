/**Created by the LayaAirIDE*/
module view.menu {
	export class MenuQiandaoItem extends ui.menu.MenuQiandaoItemUI {
		constructor() {
			super();
			this.addEvent();
		}
		//签到Item索引
		public data;
		//历史记录数组
		public day;
		//当前日期
		public num;
		public buqianNum;
		public setData(data, day: Array<string>, num, buqianNum: number,item:any): void {
			//每次签到得到的物品奖励
			let itemInfo=new ProtoCmd.ItemBase();
			itemInfo.dwBaseID=item.index;
			itemInfo.dwBinding=item.binding;
			itemInfo.dwCount=item.num;
			this.ui_qiandao.setData(itemInfo);
			this.data = data;
			this.day = day;
			this.num = num;
			this.buqianNum = buqianNum;
			this.lbl_date.text = data + '天';
			this.img_qiandao.visible = false;
			if (day.indexOf('' + data) > -1) {
				this.img_qiandao.visible = true;
				this.img_qiandao.skin = 'image/menu/zi_yiqiandao.png'
			}
			else {
				if (data < num) {
					this.img_qiandao.visible = true;
				}
			}
		}
		public addEvent(): void {
			this.on(Laya.UIEvent.CLICK, this, () => {
				if (this.data == this.num) {
					if (this.img_qiandao.visible == false) {
						this.init_sign();
					}
				}
				if (this.day.indexOf('' + this.data) == -1 && this.data < this.num) {
					if (this.buqianNum > 0) {
						this.init_buqian();
					}else{
						TipsManage.showTips('补签次数不足')
					}
				}
			})
		}
		/**
		 * 签到
		 */
		public init_sign(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Menu_QianDao_ZengJia)
			lcp.send(pkt);
		}
		/**
	  * 补签
	  */
		public init_buqian(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Menu_qiandao_buqian, [this.data]);
			lcp.send(pkt);
		}
	}
}