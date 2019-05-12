/**Created by the LayaAirIDE*/
module view.common {
	export class GmPanel extends ui.common.GmPanelUI {
		constructor() {
			super();
			this.btn_close.on(Laya.UIEvent.CLICK, this, this.openPanel.bind(this, 'close'));
			this.btn_getItem.on(Laya.UIEvent.CLICK, this, this.openPanel.bind(this, 'get'))
			lcp.LListener.getInstance().on("Avatar.PropertysSetMethods.coin", this, () => { console.log("金钱变化了"); });
			lcp.LListener.getInstance().on("Avatar.PropertysSetMethods.gold", this, () => { console.log("钻石变化了"); });
		}
		public setData() {

		}
		public openPanel(data): void {
			switch (data) {
				case 'close':
					PopUpManager.Dispose(this);
					break;
				case 'get':
					console.log(parseInt(this.input_ID.text), parseInt(this.input_Count.text))
					// lcp.send(Protocol.GetItem, [{ 'itemID': parseInt(this.input_ID.text), 'itemCount': parseInt(this.input_Count.text) }])
					break;
			}
		}

	}
}