/**Created by the LayaAirIDE*/
module view.luckDraw {
	export class LuckDraw_CangBaoItem extends ui.luckDraw.LuckDraw_CangBaoItemUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.panel_myRecord.vScrollBarSkin = '';
			this.vbox_myRecord['sortItem'] = items => { };
			this.addEvent();
			this.init_CangBaoGeData();
			this.init_Record();
		}
		public addEvent(): void {
			//返回菜单界面
			this.btn_return.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(PanelManage.LuckDraw, true, 4);
			})
			//积分兑换
			this.btn_exchange.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.LuckDraw.box_item.addChild(new view.luckDraw.LuckDraw_IntegralItem())
			})
			for (let i = 1; i < 4; i++) {
				this['btn_tanBao' + i].on(Laya.UIEvent.CLICK, this, () => {
					this.init_bless(i);
					this.addLcpEvent();
				})
			}

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
				// this.ui_CangBaoItem.img_bg.skin = 'image/common/daoju/quality_3.png';
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
					// ui_cangbao.img_bg.skin = 'image/common/daoju/quality_2.png';
					this['box_' + key].addChild(ui_cangbao)
				}
				//宝藏信息
				let tips = Object.keys(jsonData.tips)
				for (let tip of tips) {
					let tipInfo = jsonData.tips[tip];
					this['lbl_yuanbao' + tip].text = '' + tipInfo.need;
					this['lbl_tips' + tip].text = '藏宝图*' + tipInfo.cnt + ' 赠' + tipInfo.addjifen + '积分';
				}
				//宝藏积分
				this.lbl_score.text = '' + jsonData.score;
			})
			lcp.send(pkt);
		}

		/**
		 * 我的奖励记录
		 */
		public init_Record(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.LD_cangbaoge_getrecord, null, null, this, (jsonData) => {
				console.log('=====>藏宝阁奖励', jsonData)
				this.lbl_allRecord.text = '' + jsonData.record;
				let keys = Object.keys(jsonData.myrecord);
				this.vbox_myRecord.removeChildren();
				for (let key of keys) {
					this.vbox_myRecord.addChild(new view.luckDraw.LuckDraw_RecordItem().setData(jsonData.myrecord[key]))
				}
			})
			lcp.send(pkt);
		}
		/**
		 * 
		 * @param i 藏宝阁抽奖发协议
		 */
		public init_bless(i): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.LD_CangbaotuBuy, [i]);
			lcp.send(pkt);
		}
		/**
	  * 藏宝阁抽奖
	  */
		public addLcpEvent(): void {
			let pkt = new ProtoCmd.QuestClientData();
			GameApp.LListener.on(ProtoCmd.LD_CangbaotuBuy, this, (jsonData) => {
				console.log('=====>藏宝阁抽奖', GameObject)
				this.lbl_score.text = '' + jsonData.score;
			})
		}
		public destroy(isbool): void {
			GameApp.LListener.offCaller(ProtoCmd.LD_CangbaotuBuy, this);
			super.destroy(isbool);
		}
	}
}