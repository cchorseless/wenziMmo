/**Created by the LayaAirIDE*/
module view.fuli {
	export class FuLi_MainPanel extends ui.fuli.FuLi_MainPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.addEvent();
			this.init_getRecoveryData();
			this.addLcpEvent();
		}
		public addEvent(): void {
			this.btn_Sign.on(Laya.UIEvent.CLICK, this, () => {
				this.viw_fuli.selectedIndex = 0;
			})
			this.btn_reward.on(Laya.UIEvent.CLICK, this, () => {
				this.viw_fuli.selectedIndex = 1;
			})
			this.btn_recovery.on(Laya.UIEvent.CLICK, this, () => {
				this.viw_fuli.selectedIndex = 2;
			})
			this.btn_return.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			})
			this.btn_free.on(Laya.UIEvent.CLICK, this, () => {
				let beFree = 0;
				this.init_recovery(beFree);

			})
			this.btn_yuanbao.on(Laya.UIEvent.CLICK, this, () => {
				let yuanbao = 1
				this.init_recovery(yuanbao);
			})
		}
		public addLcpEvent(): void {

			GameApp.LListener.on(ProtoCmd.FuLi_ZiYuanZhaoHui_Open, this, (jsonData) => {
				this.lbl_price.text = ':' + jsonData.need;
				//物品可回收次数
				let key = Object.keys(jsonData.cnttab)
				this.list_top.array = [];
				for (let i = 1; i < key.length + 1; i++) {
					if (jsonData.cnttab[i]) {
						this.list_top.array.push(jsonData.cnttab[i])
					}
				}
				this.list_top.itemRender = view.fuli.FuLi_lableItem;
				this.list_top.renderHandler = Laya.Handler.create(this, (cell: view.fuli.FuLi_lableItem, index) => {
					cell.setData(cell.dataSource);

				}, null, false)
				//回收物品展示
				let keys = Object.keys(jsonData.itemtab)
				this.list_down.array = [];
				if(jsonData.itemtab){
					this.box_01.visible=true;
				}
				else{
					this.box_01.visible=false;
				}
				for (let i = 1; i < keys.length + 1; i++) {
					if (jsonData.itemtab[i]) {
						let itemInfo = new ProtoCmd.ItemBase();
						itemInfo.dwBaseID = jsonData.itemtab[i][1];
						this.list_down.array.push(itemInfo)
					}
				}
				
				this.list_down.itemRender = view.compart.DaoJuItem;
				this.list_down.renderHandler = Laya.Handler.create(this, (cell: view.compart.DaoJuItem, index) => {
					cell.setData(cell.dataSource, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				}, null, false)
				console.log('====>福利资源找回找回', jsonData)
			})
		}
		/**
		 * 回收面板
		 */
		public init_getRecoveryData(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FuLi_ZiYuanZhaoHui_Open);
			lcp.send(pkt);
		}
		public init_recovery(getMean): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FuLi_ZiYuanZhaoHui,[getMean]);
			lcp.send(pkt);
		}
	}
}