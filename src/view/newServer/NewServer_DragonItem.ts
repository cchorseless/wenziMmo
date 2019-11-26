/**Created by the LayaAirIDE*/
module view.newServer {
	export class NewServer_DragonItem extends ui.newServer.NewServer_DragonItemUI {
		constructor() {
			super();
			this.setData();
		}
		//是否可领取0不可领取1可领取2已领取
		public bj;
		public setData(): void {
			this.addEvent();
			this.init_panel();
		}
		public addEvent(): void {
			this.btn_get.on(Laya.UIEvent.CLICK, this, () => {
				if (this.bj == 1) {
					this.init_get();
				}
			});
			this.btn_return.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(PanelManage.NewServerActive, true);
			});
			this.addLcpEvent();
		}
		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.NS_LongChengClientOpen, this, (jsonData: ProtoCmd.itf_NS_DragonInfo) => {
				//活动时间
				let time = '' + TimeUtils.getFormatBySecond(jsonData.leftsec, 5)
				PanelManage.NewServerActive.init_time(time);
				let keys = Object.keys(jsonData.Item)
				//奖励
				for (let key of keys) {
					let data = jsonData.Item[key];
					let itemInfo = new ProtoCmd.ItemBase();
					itemInfo.dwBaseID = data.index;
					itemInfo.dwCount = data.num;
					itemInfo.dwBinding = data.bind;
					this['ui_item' + key].setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL)
				}
				//按钮状态
				this.bj = jsonData.Bj;
				switch (jsonData.Bj) {
					case 0:
						this.btn_get.gray = true;
						this.btn_get.mouseEnabled = false;
						this.btn_get.label = '领取';
						break;
					case 1:
						this.btn_get.gray = false;
						this.btn_get.mouseEnabled = true;
						this.btn_get.label = '领取';
						break;
					case 2:
						this.btn_get.gray = true;
						this.btn_get.mouseEnabled = false;
						this.btn_get.label = '已领取';
						break;
				}
			})
		}
		/**
		 * 龙城争霸面板
		 */
		public init_panel(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.NS_LongChengClientOpen);
			lcp.send(pkt);
		}
		public destroy(isbool): void {
			GameApp.LListener.offCaller(ProtoCmd.NS_LongChengClientOpen, this);
			super.destroy(isbool);
		}
		/**
		 *  
		 *
		 */
		public init_get(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.NS_LongChengGet)
			lcp.send(pkt)
		}
	}
}