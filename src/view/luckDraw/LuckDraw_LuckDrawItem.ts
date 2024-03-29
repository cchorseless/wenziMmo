/**Created by the LayaAirIDE*/
module view.luckDraw {
	export class LuckDraw_LuckDrawItem extends ui.luckDraw.LuckDraw_LuckDrawItemUI {
		public rePlay = 2;
		public curPlay = 0;
		public tempData = null;
		public isTouch = false;
		constructor() {
			super();
			this.setData();
		}
		//抽到的物品索引
		public drawItem;
		//标准奖奖励物品信息
		public TreasureChestInfo;
		//获得标准奖奖励还需要的抽奖次数
		public cnt;
		public setData(): void {
			this.panel_record.vScrollBarSkin = '';
			this.vbox_record['sortItem'] = items => { };
			this.btn_useSelf.selected = GameApp.GameEngine.luckDrawType;
			this.addEvent();
			this.init_ReWardInfo();
			this.ui_item0.ui_item.img_item.visible = false;
			this.ui_item0.ui_item.lbl_count.visible = false;
			this.ui_item0.lbl_itemName.visible = false;
		}
		public addEvent(): void {
			//宝箱预览
			this.img_baoxiang.on(Laya.UIEvent.CLICK, this, () => {
				let type = 1;
				new view.compart.BaoxiangPrizeItem().init_pos(this.img_baoxiang, this.TreasureChestInfo, type)
			})
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
			//自动抽奖
			this.btn_useSelf.on(Laya.UIEvent.CLICK, this, () => {
				this.btn_useSelf.selected = !this.btn_useSelf.selected;
				GameApp.GameEngine.luckDrawType = this.btn_useSelf.selected;
			})
			//领取标准奖励
			this.btn_get.on(Laya.UIEvent.CLICK, this, () => {
				if (this.cnt == 0) {
					this.init_getStandard();
				}
			})
			this.addLcpEvent();
		}
		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.LD_LuckyDrawOpen, this, (jsonData: ProtoCmd.itf_LD_LuckDrawInfo) => {
				this.cnt = jsonData.extab.needcnt;
				if (this.cnt == 0) {
					this.btn_get.disabled = false;
				} else {
					this.btn_get.disabled = true;
				}
				if (this.cnt == -1) {
					this.lbl_condition.text = '标准奖奖励已领完'
				}
				else {
					this.lbl_condition.text = '再抽' + jsonData.extab.needcnt + '次可获得'
				}
				this.drawItem = jsonData.idx;
				this.TreasureChestInfo = jsonData.showtab;
				//活动规则
				this.lbl_rule.text = '' + jsonData.text;
				//幸运抽奖活动倒计时
				this.lbl_time.text = '' + TimeUtils.getFormatBySecond(jsonData.leftsec, 5);
				//可抽奖次数
				this.lbl_num.text = '' + jsonData.extab.leftcnt;
				//是否可抽奖
				if (jsonData.extab.leftcnt == 0) {
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

				//可获得标准奖
				let standardInfo = new ProtoCmd.ItemBase();
				let standardItem = jsonData.extab.exitem
				standardInfo.dwBaseID = standardItem.index;
				standardInfo.dwCount = standardItem.num;
				standardInfo.dwBinding = standardItem.binding;
				this.ui_item11.setData(standardInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL)
				//全服记录
				if (jsonData.extab.logtab != undefined) {
					let records = Object.keys(jsonData.extab.logtab)
					this.vbox_record.removeChildren();
					for (let record of records) {
						let recordData = jsonData.extab.logtab[record]
						this.vbox_record.addChild(new view.luckDraw.LuckDraw_RecordItem().init_LuckDraw(recordData));
					}
				}
			})
		}
		public showResult(id) {
			this.showAniStart(1, id);
		}

		public showAniStart(i, id) {
			let self = this;
			for (let o = 1; o < 11; o++) {
				this["img_circle" + o].visible = false
				if (o == i) {
					this["img_circle" + o].visible = true;
				}
			}
			Laya.Tween.to(this["img_circle" + i], { scaleX: 1 }, 200 + self.curPlay * 80, null,
				Laya.Handler.create(this, () => {
					if (self.curPlay < self.rePlay) {
						if (i < 10) {
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
			for (let o = 1; o < 11; o++) {
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
			GameApp.LListener.offCaller(ProtoCmd.LD_LuckyDrawOpen, this);
			super.destroy(isbool);
		}
		/**
		 * 幸运抽奖面板
		 */
		public init_ReWardInfo(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.LD_LuckyDrawOpen)
			lcp.send(pkt);
		}
		/**
		 * 抽奖&&自动抽奖
		 */
		public init_draw(): void {
			if (GameApp.GameEngine.luckDrawType == true) {
				//自动抽奖
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.LD_LuckyDrawGetAll);
				lcp.send(pkt)
			}
			else {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.LD_LuckyDrawGet)
				lcp.send(pkt);
			}
		}
		/**
		 * 领取奖励
		 */
		public init_getItem(): void {


			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.LD_Lucky_LinQu);
			lcp.send(pkt)

		}
		/**
		 * 领取标准奖
		 */
		public init_getStandard(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.LD_LuckyDrawExGet);
			lcp.send(pkt)
		}
	}
}