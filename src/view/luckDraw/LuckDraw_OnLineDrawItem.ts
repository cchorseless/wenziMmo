/**Created by the LayaAirIDE*/
module view.luckDraw {
	export class LuckDraw_OnLineDrawItem extends ui.luckDraw.LuckDraw_OnLineDrawItemUI {
		public rePlay = 2;
		public curPlay = 0;
		public tempData = null;
		public isTouch = false;
		constructor() {
			super();
			this.setData();
			this.addEvent();
		}
		public drawItem;
		public baoxiangInfo;
		public setData(): void {
			this.panel_record.vScrollBarSkin = '';
			this.vbox_record['sortItem'] = items => { };
			this.init_luckDrawPanel();
			this.ui_item0.ui_item.img_item.visible = false;
			this.ui_item0.ui_item.lbl_count.visible = false;
			this.ui_item0.lbl_itemName.visible = false;
		}
		public addEvent(): void {
			//抽奖
			this.btn_luckDraw.on(Laya.UIEvent.CLICK, this, () => {
				this.init_draw();
				this.isTouch = true;
			})
			//领取奖励
			this.ui_item0.on(Laya.UIEvent.CLICK, this, () => {
				if (this.drawItem > 0) {
					this.init_getItem();
					this.isTouch = false;
				}
			})
			//领取宝箱
			for (let i = 1; i < 4; i++) {
				this['btn_item0' + i].on(Laya.UIEvent.CLICK, this, () => {
					// this['btn_item0' + i].selected = !this['btn_item0' + i].selected;
					this.init_baoxiang(i, this['btn_item0' + i].selected);
				})
			}
			this.addLcpEvent();
		}
		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.LD_ZXCJ_Plane, this, (jsonData: ProtoCmd.itf_LD_OnLineDrawInfo) => {
				this.drawItem = jsonData.idx;
				this.baoxiangInfo = jsonData.exitem;
				//在线转盘规则
				this.lbl_rule.text = '' + jsonData.introduce + '\n' + jsonData.introduce2;
				//在线转盘活动倒计时
				this.lbl_activeTime.text = '' + TimeUtils.getFormatBySecond(jsonData.lefttime, 5);
				//在线时长
				this.lbl_onlineTiem.text = '' + TimeUtils.getFormatBySecond(jsonData.zaixiantime, 5);
				//可抽奖次数
				this.lbl_kechou.text = '' + jsonData.cnt;
				//已抽奖次数
				this.lbl_num.text = '' + jsonData.used;
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
						let drawInfo = new ProtoCmd.ItemBase();
						drawInfo.dwBaseID = data.index;
						drawInfo.dwCount = data.num;
						this.ui_item0.setData(drawInfo, EnumData.ItemInfoModel.SHOW_NONE);
					}
				} else {
					this.ui_item0.ui_item.img_item.visible = false;
					this.ui_item0.ui_item.lbl_count.visible = false;
					this.ui_item0.lbl_itemName.visible = false;
				}
				//宝箱信息
				for (let i = 1; i < 4; i++) {
					switch (jsonData.exitem[i].flag) {
						case 0:
							this['btn_item0' + i].skin = 'image/common/icon_baoxiang3_close.png'
							break;
						case 1:
							this['btn_item0' + i].skin = 'image/common/icon_baoxiang3_light.png'
							break;
						case 2:
							this['btn_item0' + i].skin = 'image/common/icon_baoxiang3_open.png'
							break;
					}
					this['btn_item0' + i].label = '累计' + jsonData.exitem[i].need + '次';
				}
				//可抽到物品
				let keys = Object.keys(jsonData.item)
				for (let key of keys) {
					let data = jsonData.item[key]
					let itemInfo = new ProtoCmd.ItemBase();
					itemInfo.dwBaseID = data.index;
					itemInfo.dwCount = data.num;
					itemInfo.dwBinding = data.bind;
					this['ui_item' + key].setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				}
			})
			/**
		 * 全服记录
		 */
			GameApp.LListener.on(ProtoCmd.LD_ZXCJ_list, this, (jsonData) => {
				let data = jsonData.record.split('+')
				let keys = Object.keys(data);
				let num = (keys.length - 1) / 3;
				this.vbox_record.removeChildren();
				for (let i = 0; i < num; i++) {
					let a = i * 3;
					let b = a + 1;
					let c = a + 2;
					this.vbox_record.addChild(new view.luckDraw.LuckDraw_RecordItem().init_onLineDraw(data[a], data[b], data[c]));
				}
			});
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
			let drawInfo = new ProtoCmd.ItemBase();
			drawInfo.dwBaseID = data.index;
			drawInfo.dwCount = data.num;
			this.ui_item0.setData(drawInfo, EnumData.ItemInfoModel.SHOW_NONE);
		}
		public destroy(isbool): void {
			GameApp.LListener.offCaller(ProtoCmd.LD_ZXCJ_Plane, this);
			GameApp.LListener.offCaller(ProtoCmd.LD_ZXCJ_list, this);
			super.destroy(isbool);
		}
		/**
		 * 拉取面板信息
		 */
		public init_luckDrawPanel(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.LD_ZXCJ_Plane);
			lcp.send(pkt)
		}
		/**
		 * 抽奖
		 */
		public init_draw(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.LD_ZXCJ_Start, null, null, this, (jsonData) => {
			});
			lcp.send(pkt);
		}
		/**
		 * 领取奖励
		 */
		public init_getItem(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.LD_ZXCJ_LingQu);
			lcp.send(pkt)
		}
		/**
	  * 领取宝箱
	  */
		public init_getBaoxiang(i): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.LD_ZXCJ_LingQu2, [i]);
			lcp.send(pkt)
		}
		public init_baoxiang(i, selected): void {
			switch (this.baoxiangInfo[i].flag) {
				case 0:
					this.addChild(new view.compart.BaoxiangPrizeItem().init_pos(this['btn_item0' + i], this.baoxiangInfo[i]));
					break;
				case 1:
					this.init_getBaoxiang(i);
					break;
				case 2:
					TipsManage.showTips('该宝箱已领取')
					break;
			}

		}
	}
}