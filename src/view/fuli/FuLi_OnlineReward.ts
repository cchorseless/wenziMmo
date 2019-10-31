/**Created by the LayaAirIDE*/
module view.fuli {
	export class FuLi_OnlineReward extends ui.fuli.FuLi_OnlineRewardUI {
		constructor() {
			super();
			this.setData();
		}
		//所发参数
		public num;
		//宝箱相关信息
		public treasureBoxInfo;
		public setData(): void {
			this.num = 0;
			for (let i = 1; i < 5; i++) {
				this['lbl_time' + i].visible = false;
				this['btn_get' + i].visible = false;
			}
			this.addEvent();
			this.init_ReWardInfo();
		}
		public addEvent(): void {
			//领取宝箱奖励
			for (let i = 1; i < 6; i++) {
				this['btn_get' + i].on(Laya.UIEvent.CLICK, this, () => {
					this.init_GetReward(i);
				})
			}
			//预览宝箱奖励
			for (let i = 1; i < 5; i++) {
				this['img_treasureBox' + i].on(Laya.UIEvent.CLICK, this, () => {
					new view.dialog.BaoXiangPrizeDialog().setData(this.treasureBoxInfo[i].itemtab).popup()
				})
			}
		}
		/**
		 * 拉取在线奖励面板
		 */
		public init_ReWardInfo(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FuLi_zaixiangjiangli_minbandakai, [this.num], null, this, (jsonData: ProtoCmd.itf_Fuli_OnLineRewardInfo) => {
				this.treasureBoxInfo = jsonData.itemtab;
				let keys = Object.keys(jsonData.itemtab)
				for (let key of keys) {
					let data = jsonData.itemtab[key];
					//宝箱状态
					switch (data.btnStatus) {
						case 0:
							this['img_treasureBox' + key].skin = 'image/common/icon_bigbaoxiang_1close.png'
							this['lbl_time' + key].visible = true;
							this['lbl_time' + key].text = TimeUtils.getFormatBySecond(data.times, 5);
							break;
						case 1:
							this['img_treasureBox' + key].skin = 'image/common/icon_baoxiang1_light.png'
							this['btn_get' + key].visible = true;
							break;
						case 2:
							this['img_treasureBox' + key].skin = 'image/common/icon_bigbaoxiang_1open.png'
							this['btn_get' + key].visible = true;
							this['btn_get' + key].label = '已领取';
							this['btn_get' + key].gray = true;
							this['btn_get' + key].mouseEnabled = false;
							break;
					}
					//上周在线时间累计获得礼券
					this.lbl_lastweek.text = '' + jsonData.shangzhouyuanbao;
					//本周在线时间累计获得礼券
					this.lbl_thisweek.text = '' + jsonData.benzhouyuanbao;
					//今日在线时长
					this.lbl_onLineTime.text = '' + TimeUtils.getFormatBySecond(jsonData.zaixianshijian, 5);
				}
			})
			lcp.send(pkt);
		}
		/**
		 * 领取奖励
		 * @param index 
		 */
		public init_GetReward(index): void {
			//在线奖励所发参数
			switch (index) {
				case 1:
					this.num = 1;
					break;
				case 2:
					this.num = 2;
					break;
				case 3:
					this.num = 3;
					break;
				case 4:
					this.num = 4;
					break;
				case 5:
					this.num = 5;
					break;
			}
			this.init_ReWardInfo();
		}
	}
}