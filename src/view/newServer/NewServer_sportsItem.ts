/**Created by the LayaAirIDE*/
module view.newServer {
	export class NewServer_sportsItem extends ui.newServer.NewServer_sportsItemUI {
		constructor() {
			super();
			this.setData()
		}
		//天数
		public index = 1;
		//开服几天
		public day;
		public setData(): void {
			this.panel_down.vScrollBarSkin = '';
			this.tab_down.selectHandler = Laya.Handler.create(this, (index) => {
				this.index = index + 1;
				this.init_panel();
			}, null, false);
			this.addEvent();
			this.init_panel();
		}
		public addEvent(): void {
			for (let i = 1; i < 5; i++) {
				this['btn_get' + i].on(Laya.UIEvent.CLICK, this, () => {
					this.init_get(i);
				})
			}
			this.addLcpEvent();
		}
		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.NS_KaiFuJingJiOpen, this, (jsonData: ProtoCmd.itf_NS_sportsInfo) => {
				//开服天数
				this.day=jsonData.opendays;
				//全服排名奖励
				let keys_left = Object.keys(jsonData.item)
				for (let key_left of keys_left) {
					let data_left = jsonData.item[key_left]
					//第一个物品
					let itemInfo1 = new ProtoCmd.ItemBase();
					itemInfo1.dwBaseID = data_left[1].index;
					itemInfo1.dwCount = data_left[1].num;
					itemInfo1.dwBinding = data_left[1].bind;
					this['ui_allServer_' + key_left + '1'].setData(itemInfo1, EnumData.ItemInfoModel.SHOW_IN_MAIL)
					//第二个物品
					let itemInfo2 = new ProtoCmd.ItemBase();
					itemInfo2.dwBaseID = data_left[2].index;
					itemInfo2.dwCount = data_left[2].num;
					itemInfo2.dwBinding = data_left[2].bind;
					this['ui_allServer_' + key_left + '2'].setData(itemInfo2, EnumData.ItemInfoModel.SHOW_IN_MAIL)
				}
				//竞技活动
				let keys_down = Object.keys(jsonData.join)
				for (let key_down of keys_down) {
					let data_down = jsonData.join[key_down]
					//按钮状态
					if (data_down.bj == 0) {
						//不可领取
						this['btn_get' + key_down].mouseEnabled = false;
						this['btn_get' + key_down].gray = true;
						this['btn_get' + key_down].label = '未达成';
					}
					if (data_down.bj == 1) {
						//可领取
						this['btn_get' + key_down].mouseEnabled = true;
						this['btn_get' + key_down].gray = false;
						this['btn_get' + key_down].label = '领取';
					}
					if (data_down.bj == 2) {
						//已领取
						this['btn_get' + key_down].mouseEnabled = false;
						this['btn_get' + key_down].gray = true;
						this['btn_get' + key_down].label = '已领取';
					}
					//奖励
					//第一个物品
					let itemInfo1 = new ProtoCmd.ItemBase();
					itemInfo1.dwBaseID = data_down.item[1].index;
					itemInfo1.dwCount = data_down.item[1].num;
					itemInfo1.dwBinding = data_down.item[1].bind;
					this['ui_get_' + key_down + '1'].setData(itemInfo1, EnumData.ItemInfoModel.SHOW_IN_MAIL)
					//第二个物品
					let itemInfo2 = new ProtoCmd.ItemBase();
					itemInfo2.dwBaseID = data_down.item[2].index;
					itemInfo2.dwCount = data_down.item[2].num;
					itemInfo2.dwBinding = data_down.item[2].bind;
					this['ui_get_' + key_down + '2'].setData(itemInfo2, EnumData.ItemInfoModel.SHOW_IN_MAIL)
					//等级
					this['lbl_lvl' + key_down].text = '' + data_down.lv;
				}
				//当前排名
				let keys_right = Object.keys(jsonData.rank)
				for (let key_right of keys_right) {
					let data = jsonData.rank[key_right]
					this['lbl_name' + key_right].text = '' + data.name;
					this['lbl_right' + key_right].text = '' + data.score
				}
				//当前排名说明
				this.lbl_introduce.text = '' + jsonData.str;
				//我的排名
				let pkts = new ProtoCmd.stMyRankRequest();
				pkts.setValue('btType', jsonData.ranktype)
				lcp.send(pkts, this, (data) => {
					let bpkts = new ProtoCmd.stMyRankReturn(data)
					if (bpkts.rank > -1) {
						this.lbl_my.text = '' + bpkts.rank;
					}
					else {
						this.lbl_my.text = '未上榜';
					}
					if(this.day>this.index){
						this.lbl_my.text = '已结束';
					}
				})
			})
		}
		/**
		 * 开服竞技面板
		 */
		public init_panel(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.NS_KaiFuJingJiOpen, [this.index]);
			lcp.send(pkt);
		}
		public destroy(isbool): void {
			GameApp.LListener.offCaller(ProtoCmd.NS_KaiFuJingJiOpen, this);
			super.destroy(isbool);
		}
		/**
		 *  领取奖励
		 * @param i 领取第几个
		 */
		public init_get(i): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.NS_KaiFuJingJiGet, [this.index, i])
			lcp.send(pkt)
		}
	}
}