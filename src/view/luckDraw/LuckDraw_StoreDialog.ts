/**Created by the LayaAirIDE*/
module view.luckDraw {
	export class LuckDraw_StoreDialog extends ui.luckDraw.LuckDraw_StoreDialogUI {
		constructor() {
			super();
		}
		public data;
		public sendData;
		public noZhuanData: string;
		public zhuanData;
		public setData(data): LuckDraw_StoreDialog {
			this.panel_store.vScrollBarSkin = '';
			this.vbox_store['sortItem'] = items => { };
			this.data = data;
			this.init_store();
			this.addEvent();
			this.init_dataEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this,this.onclose);
			//回收非转生装备
			this.btn_nozhuan.on(Laya.UIEvent.CLICK, this, () => {
				this.sendData = this.noZhuanData;
				if (this.sendData !== undefined) {
					this.init_recovery();
				}
				else {
					TipsManage.showTips('当前仓库无非转生装备')
				}

			})
			//回收1-2转生装备
			this.btn_zhaun.on(Laya.UIEvent.CLICK, this, () => {
				this.sendData = this.zhuanData;
				if (this.sendData !== undefined) {
					this.init_recovery();
				}
				else {
					TipsManage.showTips('当前仓库无1-2级转生装备')
				}
			})
			//经验丹使用
			this.btn_use.on(Laya.UIEvent.CLICK, this, () => {
				if (this.data !== '') {
					this.init_use();
				}
			})
			//全部领取
			this.btn_allGet.on(Laya.UIEvent.CLICK, this, () => {
				if (this.data !== '') {
					this.init_allGet();
				}
			})
			this.addLcpEvent();
		}
		/**
		 * 监听data数据的变化
		 */
		public addLcpEvent(): void {
			//刷新弹窗物品
			GameApp.LListener.on(ProtoCmd.LD_storeRefresh, this, (jsonData) => {
				this.vbox_store.removeChildren();
				this.data = jsonData;
				this.init_store();
				this.addEvent();
				this.init_dataEvent();
			})
		}
		public onclose(): void {
			GameApp.LListener.offCaller(ProtoCmd.LD_storeRefresh, this);
			this.close();
		}
		/**
		 * 仓库物品显示
		 */
		public init_store(): void {
			//初始化仓库背景
			for (let i = 0; i < 20; i++) {
				this.vbox_store.addChild(new view.compart.DaoJuGroupItem())
			}
			if (this.data !== '') {
				let item = this.data.split('+')
				let keys = Object.keys(item)
				let num = Math.ceil(keys.length / 6)
				for (let i = 0; i < keys.length; i++) {
					for (let child of this.vbox_store._childs) {
						let itemData = item[i].split('=')
						if (!(child as view.compart.DaoJuGroupItem).checkIsFull()) {
							let ui_item = new view.compart.DaoJuItem();
							let itemInfo = new ProtoCmd.ItemBase;
							itemInfo.dwBaseID = parseInt(itemData[0]);
							itemInfo.dwCount = parseInt(itemData[1]);
							ui_item.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_CANGKU);
							child.addItem(ui_item);
							break;
						}
					}
				}
			}

		}
		/**
		 * 仓库物品分类
		 */
		public init_dataEvent(): void {
			if (this.data !== '') {
				let item = this.data.split('+');
				let keys = Object.keys(item);
				let i = 0;
				let j = 0;
				for (let key of keys) {
					let data = item[key];
					let itemID = data.split('=');
					let lvl = SheetConfig.mydb_item_base_tbl.getInstance(null).ZS_LEVEL('' + parseInt(itemID[0]))
					let type = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMTYPE('' + parseInt(itemID[0]))
					//判断物品类型
					if (type == 2) {
						//非转装备id
						if (lvl == 0) {
							i = i + 1;
							if (i == 1) {
								this.noZhuanData = '' + itemID[0]
							}
							else {
								this.noZhuanData = this.noZhuanData + '+' + itemID[0]
							}
						}
						//1-2级转生装备id
						if (lvl > 0 && lvl < 3) {
							j = j + 1;
							if (j == 1) {
								this.zhuanData = '' + itemID[0]
							}
							else {
								this.zhuanData = this.zhuanData + '+' + itemID[0]
							}
						}
					}
				}
			}
		}
		/**
		 * 回收装备
		 */
		public init_recovery(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.LD_caobaogehuishousys, [this.sendData])
			lcp.send(pkt);
		}
		/**
		 * 经验丹使用
		 */
		public init_use(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.LD_cangbaogeusejinyan)
			lcp.send(pkt);

		}
		/**
		 * 全部领取
		 */
		public init_allGet(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.LD_cangbaoge_lingqu, [0])
			lcp.send(pkt);
		}
	}
}
