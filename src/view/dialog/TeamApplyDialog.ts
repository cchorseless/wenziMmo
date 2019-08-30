/**Created by the LayaAirIDE*/
module view.dialog {
	export class TeamApplyDialog extends ui.dialog.TeamApplyDialogUI {
		constructor() {
			super();
		}
		public item;
		public setData(item: any, count: number): TeamApplyDialog {
			this.item = item;
			this.lbl_name.text = '' + item.szName;
			this.lbl_lvl.text = '' + item.lvl;
			this.lbl_count.text = '' + count;
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			// this.btn_teamApply.on(Laya.UIEvent.CLICK, this, () => {
			// 	let pkt = new ProtoCmd.TeamAgreeJoinEncoder();
			// 	pkt.getValue('szName', GameApp.MainPlayer.objName);
			// 	pkt.getValue('btJob', GameApp.MainPlayer.job);
			// 	pkt.getValue('dwLevel', GameApp.MainPlayer.level);
			// 	pkt.getValue('btSex', GameApp.MainPlayer.sex);
			// 	lcp.send(pkt, this, (data) => {
			// 		let cbpkt = new ProtoCmd.TeamAgreeJoinDecoder(data);
			// 	})
			// })
		}
	}
}