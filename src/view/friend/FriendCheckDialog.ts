/**Created by the LayaAirIDE*/
module view.friend {
	export class FriendCheckDialog extends ui.friend.FriendCheckDialogUI {
		constructor() {
			super();
			this.addEvent();
		}
		public setData(name: string, level: number): FriendCheckDialog {
			this.lbl_name.text = '' + name;
			this.lbl_level.text = '' + level;
			return this;

		}
		public addEvent(): void {
			this.btn_agree.on(Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.stRelationAddAnswerQuery(null);
				pkt.setValue('szName', this.lbl_name.text);
				pkt.setValue('boAgree', true);
				lcp.send(pkt, this)
				this.close();
			})
			this.btn_fefuse.on(Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.stRelationAddAnswerQuery(null);
				pkt.setValue('szName', this.lbl_name.text);
				pkt.setValue('boAgree', false);
				lcp.send(pkt, this)
				this.close();
			})
		}
	}
}