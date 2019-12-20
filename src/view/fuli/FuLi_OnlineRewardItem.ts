/**Created by the LayaAirIDE*/
module view.fuli {
	export class FuLi_OnlineRewardItem extends ui.fuli.FuLi_OnlineRewardItemUI {
		constructor() {
			super();
			this.setData();
		}
		//所发参数
		public num;
		//宝箱相关信息
		public treasureBoxInfo;
		public setData(): void {
			//开服效率
			let day = TimeUtils.getFormatBySecond(GameApp.GameEngine.openDay / 1000, 5).split('天')[0];
			let week = Math.ceil(parseInt(day) / 7);
			if (week == 1) {
				this.lbl_xiaolu.text = '60/h';
			}
			if (week == 2) {
				this.lbl_xiaolu.text = '80/h';
			}
			if (week >= 3) {
				this.lbl_xiaolu.text = '100/h';
			}
			this.num = 0;
			for (let i = 1; i < 5; i++) {
				this['div_time' + i].visible = false;
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
					this.addChild(new view.compart.BaoxiangPrizeItem().init_pos(this['img_treasureBox' + i], this.treasureBoxInfo[i].itemtab));
				})
			}
			//城主特权
			this.btn_detail.on(Laya.UIEvent.CLICK, this, () => {
				this.btn_detail.selected = !this.btn_detail.selected
				this.init_dialogEvent(this.btn_detail.selected);
			})
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
							this['img_treasureBox' + key].skin = 'image/common/icon_bigbaoxiang_'+key+'close.png'
							this['btn_get' + key].visible = false;
							this['div_time' + key].visible = true;
							GameUtil.timeCountDown(data.times, this['div_time' + key])
							this['div_time' + key].style.color = '#a53232';
							this['div_time' + key].style.fontSize = 22;
							break;
						case 1:
							this['img_treasureBox' + key].skin = 'image/common/icon_baoxiang'+key+'_light.png';
							this['btn_get' + key].visible = true;
							this['btn_get' + key].disabled = false;
							break;
						case 2:
							this['img_treasureBox' + key].skin = 'image/common/icon_bigbaoxiang_'+key+'open.png'
							this['btn_get' + key].visible = true;
							this['btn_get' + key].label = '已领取';
							this['btn_get' + key].visible = true;
							this['btn_get' + key].disabled = true;
							break;
					}
					//上周在线时间累计获得礼券
					this.lbl_lastweek.text = '' + jsonData.shangzhouyuanbao;
					//本周在线时间累计获得礼券
					this.lbl_thisweek.text = '' + jsonData.benzhouyuanbao;
					//今日在线时长
					this.div_onLineTime.style.fontSize = 22;
					this.div_onLineTime.style.color = '#a53232'
					this.div_onLineTime.innerHTML = '' + TimeUtils.getFormatBySecond(jsonData.zaixianshijian, 5);
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
		/**
	  * 
	  * @param type 规则按钮是否被选中
	  */
		public init_dialogEvent(type: boolean): void {
			if (type) {
				Laya.Tween.to(this.img_rule, { scaleX: 1, scaleY: 1 }, 200);
			}
			else {
				Laya.Tween.to(this.img_rule, { scaleX: 0, scaleY: 0 }, 200);
			}
		}
	}
}