/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_SaoDang_Dialog extends ui.fuBen.FuBen_SaoDang_DialogUI {
		public index;
		public data;
		public coinType;
		constructor() {
			super();
		}
		public setData(index, data, coinType) {
			for (let i = 1; i < 6; i++) {
				this['img' + i].visible = false;
			}
			this.coinType = coinType;
			this.index = index;
			this.data = data;
			let coinArr = ['元宝', '礼券', '金币', '荣誉', '帮贡']

			for (let i in data) {
				this['img' + i].visible = true;
				this.lab_bet1
				this.btn_confirm1
				this['lab_bet' + i].text = data[i] + coinArr[coinType];
				this['btn_confirm' + i].label = i + '倍扫荡';
			}
			this.addEvent();
		}
		public addEvent() {
			let keys = Object.keys(this.data);
			for (let i = 1; i < 6; i++) {
				this['btn_confirm' + i].on(Laya.UIEvent.CLICK, this, function () {
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.FB_CaiLiaoFuBen_OneKey,
						[this.index, keys[i - 1]], 0)
					pkt.send();
					this.close();
				})
			}
		}
	}
}