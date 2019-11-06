/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_XianShiItem extends ui.fuBen.FuBen_XianShiItemUI {
		constructor() {
			super();
		}
		public setData(id, times): FuBen_XianShiItem {
			this.panel_jiangli.hScrollBarSkin = '';
			this.hbox_jiangli['sortItem'] = (items) => { };
				//当前时间
			let time = TimeUtils.getFormatBySecond8(times)
			this.init_xianshiDetail(id, time);
			return this;
		}
		public init_xianshiDetail(id, time): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FB_LimitActivitiesCfg, null, null, this, (jsonData: ProtoCmd.itf_FB_XianshiDetailInfo) => {
				for (let i = 1; jsonData[i]; i++) {
					if (id == jsonData[i].id) {
						//限时活动名称
						this.lbl_name.text = jsonData[i].name;
						//限时活动描述
						this.lbl_detail.text = jsonData[i].introduce;
						//限时活动开放时间
						this.lbl_time.text = jsonData[i].time;
						//限时活动所需等级
						this.lbl_lvl.text = jsonData[i].levelDesc;
						//活动奖励
						this.hbox_jiangli.removeChildren();
						for (let g = 1; jsonData[i].award[g]; g++) {
							let _itemUI = new view.compart.DaoJuWithNameItem();
							let itemInfo = new ProtoCmd.ItemBase();
							itemInfo.dwBaseID = jsonData[i].award[g];
							_itemUI.setData(itemInfo,EnumData.ItemInfoModel.SHOW_IN_MAIL);
							this.hbox_jiangli.addChild(_itemUI);
						}
						this.timeEvent(jsonData[i].time, time)
					}
				}
			})
			lcp.send(pkt);
		}
		public timeEvent(actTime, time): void {
			let starHour;
			let starMin;
			let endHour;
			let endMin;
			let time1 = actTime.split(',')
			for (let j = 0; time1[j]; j++) {
				let time2 = time1[j].split('-');
				//开始时间的小时
				starHour = parseInt(time2[0].split(':')[0]);
				//开始时间的分钟
				starMin = parseInt(time2[0].split(':')[1]);
				//结束时间的小时
				endHour = parseInt(time2[1].split(':')[0]);
				//结束时间的分钟
				endMin = parseInt(time2[1].split(':')[1]);
			}
			//当前小时大于活动开始小时，小于活动结束小时
			if (time.hour > starHour) {
				if (time.hour < endHour) {
					this.lbl_state.text = '已开启';
				}
			}
			//当前小时大于活动开始小时，等于活动结束小时，当前分钟小于活动结束分钟
			if (time.hour > starHour) {
				if (time.hour == endHour) {
					if (time.min <= endMin) {
						this.lbl_state.text = '已开启';
					}
				}
			}
			//当前小时等于活动开始小时，当前分钟大于等于活动开始分钟，当前小时小于活动结束小时
			if (time.hour == starHour) {
				if (time.min >= starMin) {
					if (time.hour < endHour) {
						this.lbl_state.text = '已开启';
					}
				}
			}
			//当前小时等于活动开始小时，当前分钟大于等于活动开始分钟，当前等于活动结束小时，当前分钟小于结束分钟
			if (time.hour == starHour) {
				if (time.min >= starMin) {
					if (time.hour == endHour) {
						if (time.min <= endMin) {
							this.lbl_state.text = '已开启';
						}
					}
				}
			}
		}
	}
}