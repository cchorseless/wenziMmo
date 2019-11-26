/**Created by the LayaAirIDE*/
module view.luckDraw {
	export class LuckDraw_CangBaoItem extends ui.luckDraw.LuckDraw_CangBaoItemUI {
		public static self: LuckDraw_CangBaoItem;
		public touchID = 1;
		constructor() {
			super();
			LuckDraw_CangBaoItem.self = this;
			this.setData();
		}
		public storeData;
		public num = 0;
		public setData(): void {
			this.panel_box1.vScrollBarSkin = "";
			this.panel_box2.vScrollBarSkin = '';
			this.panel_myRecord.vScrollBarSkin = '';
			this.vbox_myRecord['sortItem'] = items => { };
			this.panel_allRecord.vScrollBarSkin = '';
			this.vbox_allRecord['sortItem'] = items => { };
			this.addEvent();
			this.init_CangBaoGeData();
			this.init_Record(0);
		}
		public addEvent(): void {
			//返回菜单界面
			this.btn_return.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(PanelManage.LuckDraw, true);
			})
			//积分兑换
			this.btn_exchange.on(Laya.UIEvent.CLICK, this, () => {
				new view.luckDraw.LuckDraw_IntegralDialog().setData(this.lbl_score.text).show()
			})
			//宝藏仓库
			this.btn_store.on(Laya.UIEvent.CLICK, this, () => {
				new view.luckDraw.LuckDraw_StoreDialog().setData(this.storeData).show();
			})
			for (let i = 1; i < 4; i++) {
				this['btn_tanBao' + i].on(Laya.UIEvent.CLICK, this, () => {
					this.init_bless(i);
					this.touchID = i;
				})
			}
			this.ui_CangBaoItem.on(Laya.UIEvent.CLICK, this, function () {
				let o = new LuckDraw_ShowResultDialog();
				o.setData(0);
				o.popup(true);
			})
			this.addLcpEvent();
		}
		public init_CangBaoGeData(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.LD_cangbaogeopen, null, null, this, (jsonData: ProtoCmd.itf_LD_CangBaoGeInfo) => {
				this.vbox_myRecord.removeChildren();
				//中央宝物
				let itemsInfo = new ProtoCmd.ItemBase();
				itemsInfo.dwBaseID = jsonData.middleItem.index;
				itemsInfo.dwCount = jsonData.middleItem.num;
				this.ui_CangBaoItem.setData(itemsInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				//12个宝物
				let keys = Object.keys(jsonData.sideItem)
				for (let i = 1; i < 10; i++) {
					this['box_' + i].removeChildren();
				}
				for (let key of keys) {
					let data = jsonData.sideItem[key]
					let ui_cangbao = new view.compart.DaoJuItem;
					let itemInfo = new ProtoCmd.ItemBase();
					itemInfo.dwBaseID = jsonData.sideItem[key];
					ui_cangbao.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL);
					this['box_' + key].addChild(ui_cangbao)
				}
				//宝藏信息
				let tips = Object.keys(jsonData.tips)
				for (let tip of tips) {
					let tipInfo = jsonData.tips[tip];
					this['lbl_yuanbao' + tip].text = '' + tipInfo.need;
					this['lbl_tips' + tip].text = '积分 +' + tipInfo.addjifen;
					this['lbl_quan' + tip].text = '' + tipInfo.cnt;
				}
				//宝藏积分
				this.lbl_score.text = '' + jsonData.score;
			})
			lcp.send(pkt);
		}

		/**
		 * 我的奖励记录
		 */
		public init_Record(type: number): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.LD_cangbaoge_getrecord, null, null, this, (jsonData) => {
				//全服奖励记录
				if (jsonData.record != "") {
					let single = jsonData.record.split('+')
					console.log(jsonData.record)
					let singleKeys = Object.keys(single)
					this.vbox_allRecord.removeChildren();
					for (let key of singleKeys) {
						this.vbox_allRecord.addChild(new view.luckDraw.LuckDraw_RecordItem().init_allRecord(single[key]))
					}
					Laya.timer.frameOnce(1, this, () => {
						this.panel_allRecord.scrollTo(0, this.vbox_allRecord.height);
					})
				}
				//我的奖励记录
				if (jsonData.myrecord != {}) {
					let keys = Object.keys(jsonData.myrecord);
					this.vbox_myRecord.removeChildren();
					for (let key of keys) {
						this.vbox_myRecord.addChild(new view.luckDraw.LuckDraw_RecordItem().init_myRecord(jsonData.myrecord[key]))
					}
					Laya.timer.frameOnce(1, this, () => {
						this.panel_myRecord.scrollTo(0, this.vbox_myRecord.height);
					})
					if (type == 1) {
						let self = LuckDraw_CangBaoItem.self
						let data = self.getShowData(jsonData.myrecord, self.touchID);
						let o = new LuckDraw_ShowResultDialog();
						o.setData(data);
						o.popup(true);
					}


				}
			})
			lcp.send(pkt);
		}
		/**
		 * 从记录里取出该次藏宝阁抽奖结果并返回数据
		 */
		public getShowData(data, index): any {
			let resData = [];
			let arr = []
			let num = [0, 1, 10, 50][index];
			for (let i in data) {
				arr.push(data[i])
			}
			for (let i = 0; i < num; i++) {
				resData.push(arr[arr.length - (i + 1)])
			}
			return resData
		}
		/**
		 * 
		 * @param i 藏宝阁抽奖发协议
		 */
		public init_bless(i): void {
			let num = GameUtil.findItemInBag(353, GameApp.GameEngine.bagItemDB)
			let baseNum = [0, 1, 10, 50][i]
			let span = baseNum - num;
			if (span <= 0) {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.cbg_choujiang, [i]);
				lcp.send(pkt);
			} else {
				let confirm = Laya.Handler.create(this, () => {
					let pkt = new ProtoCmd.QuestClientData();
					pkt.setString(ProtoCmd.LD_CangbaotuBuy, [i], null, this, function () {
						LuckDraw_MainPanel.self.upDataCangBaoMap()
					});
					lcp.send(pkt);
				});
				let s = new dialog.SureOrCanelDialog();
				s.setData("是否购买藏宝图*" + baseNum + "？", confirm)
				s.popup(true);
			}


		}
		/**
	  * 藏宝阁抽奖
	  */
		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.cbg_choujiang, this, (jsonData) => {
				this.lbl_score.text = '' + jsonData.score;
				this.storeData = jsonData.item;
				this.num += 1;
				if (this.num > 1) {
					this.init_Record(1);
					
				}
				GameApp.LListener.event(ProtoCmd.LD_storeRefresh, this.storeData);
				LuckDraw_MainPanel.self.upDataCangBaoMap()
			})
		}
		public destroy(isbool): void {
			GameApp.LListener.offCaller(ProtoCmd.LD_CangbaotuBuy, this);
			GameApp.LListener.offCaller(ProtoCmd.cbg_choujiang, this);
			super.destroy(isbool);
		}
	}
}