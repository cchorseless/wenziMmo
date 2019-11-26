/**Created by the LayaAirIDE*/
module view.newServer {
	export class NewServer_allBossItem extends ui.newServer.NewServer_allBossItemUI {
		constructor() {
			super();
			this.setData();
		}
		//怪物类型索引
		public num = 1;
		public data = null;
		//是否达成任务条件0未达成1已达成2已领取
		public bj:number;
		public setData(): void {
			this.panel_boss.hScrollBarSkin = '';
			this.hbox_boss['sortItem'] = (items) => { };
			this.addEvent();
			this.init_panel();
		}

		public addEvent(): void {
			this.btn_return.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(PanelManage.NewServerActive, true);
			})
			//前一页
			this.btn_last.on(Laya.UIEvent.CLICK, this, () => {
				if (this.num > 1) {
					this.num = this.num - 1;
					this.init_clickEvent();
				}
			})
			//后一页
			this.btn_next.on(Laya.UIEvent.CLICK, this, () => {
				if (this.num < 4) {
					this.num = this.num + 1;
					this.init_clickEvent();
				}
			})
			//领取
			this.btn_kill.on(Laya.UIEvent.CLICK, this, () => {
				if (this.bj == 1) {
					this.init_get()
				}
			})
			this.addLcpEvent();
		}
		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.NS_QuanMingBoss, this, (jsonData: ProtoCmd.itf_NS_AllBossInfo) => {
				console.log('======》全民boss', jsonData);
				this.data = jsonData;
				this.init_clickEvent();
			})

		}
		/**
		 * 全民BOSS面板
		 */
		public init_panel(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.NS_QuanMingBoss);
			lcp.send(pkt);
		}
		public destroy(isbool): void {
			GameApp.LListener.offCaller(ProtoCmd.NS_QuanMingBoss, this);
			super.destroy(isbool);
		}
		/**
		 *  领取奖励
		 * 
		 */
		public init_get(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.NS_QuanMingBossGet,[this.num])
			lcp.send(pkt);
		}
		/**
		 * 拉取boss数据
		 */
		public init_clickEvent(): void {
			if (this.data != null) {
				//boss类型
				this.lbl_type.text = this.data[this.num].name;
				//boss相关
				let keys = Object.keys(this.data[this.num].boss)
				this.hbox_boss.removeChildren();
				for (let key of keys) {
					let id = this.data[this.num].boss[key].bossid
					this.hbox_boss.addChild(new view.npc.NpcIconItem().newServer_AllBoss(id))
				}
				//奖励
				let itemKeys = Object.keys(this.data[this.num].item)
				for (let itemkey of itemKeys) {
					let itemData = this.data[this.num].item[itemkey];
					let itemInfo = new ProtoCmd.ItemBase();
					itemInfo.dwBaseID = itemData.index;
					itemInfo.dwCount = itemData.num;
					itemInfo.dwBinding = itemData.bind;
					this['ui_item' + itemkey].setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				}
				this.bj = this.data[this.num].bj;
				//判断奖励是否可领取
				switch (this.data[this.num].bj) {
					case 0:
						this.btn_kill.gray = false;
						this.btn_kill.mouseEnabled = true;
						this.btn_kill.label = '前往击杀';
						break;
					case 1:
						this.btn_kill.gray = false;
						this.btn_kill.mouseEnabled = true;
						this.btn_kill.label = '可领取';
						break;
					case 2:
						this.btn_kill.gray = true;
						this.btn_kill.mouseEnabled = false;
						this.btn_kill.label = '已领取';
						break;
				}
			}
		}
	}
}