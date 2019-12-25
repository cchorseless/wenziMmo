/**Created by the LayaAirIDE*/
module view.zhaiYuan {
	export class ZhaiYuan_HeHuaChi_Info extends ui.zhaiYuan.ZhaiYuan_HeHuaChi_InfoUI {
		public configID;
		public titleText = ['', '荷花池', '炼丹炉', '农田', '磨石']
		public makeStatus;
		constructor() {
			super();
		}
		public setData(configID: number, makeStatus,speed) {
			this.makeStatus = makeStatus;
			this.configID = configID
			let lv = this.configID % 1000;
			let type = Math.floor(this.configID / 1000);
			this.lab_title.text = this.titleText[type] + lv + '级解锁';
			let costItem = SheetConfig.zhaiyuan_upgrade.getInstance(null).PRODUCE_MATERIAL(this.configID);
			let costTime: any = SheetConfig.zhaiyuan_upgrade.getInstance(null).NEED_TIME(this.configID);
			let getItem = SheetConfig.zhaiyuan_upgrade.getInstance(null).ITEMTAB(this.configID);

			let infoNum = SheetConfig.zhaiyuan_upgrade.getInstance(null).PRODUCIBLE_QUANTITY(this.configID)
			if (infoNum > 1) {
				costItem = costItem.split('_')
				costTime = costTime.split('_')
				getItem = getItem.split('|')
				for (let i = 0; i < infoNum; i++) {
					let o = new ZhaiYuan_HeHuaChi_Info_Vboxinfo();
					o.setData(costItem[i], costTime[i], getItem[i], this.makeStatus[i + 1], i + 1, this.configID,speed)
					o.y = i * (o.height + 15);
					this.vbox_show.addChild(o);
				}
			} else {
				let o = new ZhaiYuan_HeHuaChi_Info_Vboxinfo();
				o.setData(costItem, costTime, getItem, this.makeStatus, 1, this.configID,speed)
				this.vbox_show.addChild(o);
			}

			this.reSizeInfo()
		}
		public reSizeInfo() {
			this.height = this.vbox_show.y + this.vbox_show.height;
		}
	}
}