/**Created by the LayaAirIDE*/
module view.luckDraw {
	export class LuckDraw_TurntableItem extends ui.luckDraw.LuckDraw_TurntableItemUI {
		public rePlay = 2;
		public curPlay = 0;
		public tempData = null;
		public isTouch = false;
		constructor() {
			super();
			this.setData();
		}
		public drawItem;
		public setData(): void {
			this.addEvent();
			this.init_turnTablePanel();
			this.ui_item0.ui_item.img_item.visible = false;
			this.ui_item0.ui_item.lbl_count.visible = false;
			this.ui_item0.lbl_itemName.visible = false;
		}
		public addEvent(): void {
			//返回菜单界面
			this.btn_return.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(PanelManage.LuckDraw, true);
			})
			this.ui_item0.on(Laya.UIEvent.CLICK, this, () => {
				if (this.drawItem > 0) {
					this.init_getItem();
					this.isTouch = false;
				}
			})
			//抽奖
			this.btn_luckDraw.on(Laya.UIEvent.CLICK, this, () => {
				this.init_draw();
				this.isTouch = true;
			})
			this.addLcpEvent();
		}
		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.LD_FLZP_Plane, this, (jsonData: ProtoCmd.itf_LD_fuliTurnTableInfo) => {
				this.drawItem = jsonData.idx;
				this.lbl_rule.text = '' + jsonData.desc;
				//福利转盘活动倒计时
				this.lbl_time.text = '' + TimeUtils.getFormatBySecond(jsonData.lefttime, 5);
				//可抽奖次数
				this.lbl_kechou.text = '' + jsonData.cnt;
				//已抽奖次数
				this.lbl_num.text = '' + (jsonData.max - jsonData.cnt);
				//最大抽奖次数
				this.lbl_maxnum.text = '/' + jsonData.max;
				//是否可抽奖
				if (jsonData.cnt == 0) {
					this.btn_luckDraw.gray = true;
					this.btn_luckDraw.mouseEnabled = false;
				} else {
					this.btn_luckDraw.gray = false;
					this.btn_luckDraw.mouseEnabled = true;
				}
				// 初始化抽奖所抽到的物品
				if (jsonData.idx > 0) {
					if (this.isTouch) {
						this.tempData = jsonData;
						this.showResult(jsonData.idx)
					} else {
						this.ui_item0.ui_item.img_item.visible = true;
						this.ui_item0.ui_item.lbl_count.visible = true;
						this.ui_item0.lbl_itemName.visible = true;
						let data = jsonData.item[jsonData.idx]
						let drawInfo = new ProtoCmd.ItemBase;
						drawInfo.dwBaseID = data.index;
						drawInfo.dwCount = data.num;
						this.ui_item0.setData(drawInfo, EnumData.ItemInfoModel.SHOW_NONE);
					}
				} else {
					this.ui_item0.ui_item.img_item.visible = false;
					this.ui_item0.ui_item.lbl_count.visible = false;
					this.ui_item0.lbl_itemName.visible = false;
				}
				//可抽到物品
				let keys = Object.keys(jsonData.item)
				for (let key of keys) {
					let data = jsonData.item[key]
					let itemInfo = new ProtoCmd.ItemBase;
					itemInfo.dwBaseID = data.index;
					itemInfo.dwCount = data.num;
					itemInfo.dwBinding = data.bind;
					this['ui_item' + key].setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				}
			})
		}
		public showResult(id) {
			this.showAniStart(1, id);
		}

		public showAniStart(i, id) {
			let self = this;
			for (let o = 1; o < 9; o++) {
				this["img_circle" + o].visible = false
				if (o == i) {
					this["img_circle" + o].visible = true;
				}
			}
			Laya.Tween.to(this["img_circle" + i], { scaleX: 1 }, 200 + self.curPlay * 80, null,
				Laya.Handler.create(this, () => {
					if (self.curPlay < self.rePlay) {
						if (i < 8) {
							i++;
							self.showAniStart(i, id)
						} else {
							self.curPlay++;
							self.showAniStart(1, id)
						}
					} else {
						self.showAniEnd(1, id)
					}
				}));
		}
		public showAniEnd(i, id) {
			let self = this;
			for (let o = 1; o < 9; o++) {
				this["img_circle" + o].visible = false
				if (o == i) {
					this["img_circle" + o].visible = true;
				}
			}
			Laya.Tween.to(this["img_circle" + i], { scaleX: 1 }, 300 + self.curPlay * 50, null,
				Laya.Handler.create(this, () => {
					if (i < id) {
						i++;
						self.showAniEnd(i, id)
					} else {
						self.curPlay = 0;
						self.showItem0(id)
					}
				}));
		}
		public showItem0(id) {
			this.ui_item0.ui_item.img_item.visible = true;
			this.ui_item0.ui_item.lbl_count.visible = true;
			this.ui_item0.lbl_itemName.visible = true;
			let data = this.tempData.item[this.tempData.idx]
			let drawInfo = new ProtoCmd.ItemBase;
			drawInfo.dwBaseID = data.index;
			drawInfo.dwCount = data.num;
			this.ui_item0.setData(drawInfo, EnumData.ItemInfoModel.SHOW_NONE);
		}
		public destroy(isbool): void {
			GameApp.LListener.offCaller(ProtoCmd.LD_FLZP_Plane, this);
			super.destroy(isbool);
		}
		/**
		 * 福利转盘面板
		 */
		public init_turnTablePanel(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.LD_FLZP_Plane);
			lcp.send(pkt)
		}
		/**
		 * 抽奖
		 */
		public init_draw(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.LD_FLZP_Start, null, null, this, (jsonData) => {
				console.log(jsonData);
			});
			lcp.send(pkt);
		}
		/**
	  * 领取奖励
	  */
		public init_getItem(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.LD_FLZP_LinQu);
			lcp.send(pkt)
			this.drawItem = 0;
		}
	}
}