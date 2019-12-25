/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_BuyAndUseDialog extends ui.juese.Person_BuyAndUseDialogUI {
		constructor() {
			super();
		}
		public data;
		//0罡气1资质2弟子转生3角色转生
		public type;
		public setData(data, type): Person_BuyAndUseDialog {
			this.type = type;
			this.vbox_01['sortItem'] = (items) => { };
			this.data = data;
			//养成途径
			switch (this.type) {
				case 0:
					this.lbl_from.text = SheetConfig.Introduction_play.getInstance(null).GROWUPDES('' + 1016)
					break;
				case 1:
					this.lbl_from.text = SheetConfig.Introduction_play.getInstance(null).GROWUPDES('' + 1014)
					break;
				case 2:
					this.lbl_from.text = SheetConfig.Introduction_play.getInstance(null).GROWUPDES('' + 1056)
					break;
				case 3:
					this.lbl_from.text = SheetConfig.Introduction_play.getInstance(null).GROWUPDES('' + 1021)
					break;
			}
			//角色罡气||角色资质天赋
			if (type == 0 || type == 1) {
				this.view_item.selectedIndex = 0;
				this.init_itemBuy();
			}
			//弟子转生
			if (type == 2 || type == 3) {
				this.view_item.selectedIndex = 1;
				this.vbox_02.removeChildren();
				this.init_zhuansheng();
			}
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			});
			//返璞归真
			this.btn_duihuan.on(Laya.UIEvent.CLICK, this, () => {
				this.init_UpXiuWei();
			})
		}
		/**
		 * 相关功能所需购买物品
		 */
		public init_itemBuy(): void {
			if (this.data) {
				this.vbox_01.removeChildren();
				for (let key in this.data) {
					this.vbox_01.addChild(new view.juese.Person_BuyAndUseItem().setData(this.data[key], this.type));
				}
			}
		}
		/**
		 * 弟子转生
		 */
		public init_zhuansheng(): void {
			let data: ProtoCmd.itf_Hero_XiuWeiInfo = this.data;
			//可兑换修为
			this.lbl_xiuwei.text = '' + data.xw;
			//所需金币
			this.lbl_jinbi.text = '' + data.gold;
			//所需阅历经验
			this.lbl_yueli.text = '' + data.exp;
			//今天可兑换次数
			this.lbl_count.text=data.count+'/3';
			this.vbox_02.addChild(new view.juese.Person_BuyAndUseItem().setData(data.pill, this.type))
			this.vbox_02.addChild(new view.juese.Person_BuyAndUseItem().setData(data.superpill, this.type));
		}
		/**
    * 兑换修为
    */
		public init_UpXiuWei(): void {
			let num;
			if (this.type == 2) {
				num = 1;
			}
			if (this.type == 3) {
				num = 0;
			}
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_exchangeXiuWei, [num], null, this, (jsonData) => {
			})
			lcp.send(pkt);
		}
	}
}