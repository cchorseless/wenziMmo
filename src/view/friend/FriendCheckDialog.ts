/**Created by the LayaAirIDE*/
module view.friend {
	export class FriendCheckDialog extends ui.friend.FriendCheckDialogUI {
		constructor() {
			super();
			this.addEvent();
		}
		public data;
		public setData(data: ProtoCmd.friendApply): FriendCheckDialog {
			this.data=data;
			this.lbl_name.text = '' + data.playerName;
			this.lbl_level.text =data.zslevel+ '转' + data.level+'级';
			return this;
		}
		public addEvent(): void {
			this.btn_agree.on(Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.stRelationAddAnswerQuery(null);
				pkt.setValue('szName', this.data.playerName);
				pkt.setValue('boAgree', true);
				lcp.send(pkt, this)
				this.close();
			})
			this.btn_fefuse.on(Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.stRelationAddAnswerQuery(null);
				pkt.setValue('szName', this.data.playerName);
				pkt.setValue('boAgree', false);
				lcp.send(pkt, this)
				this.close();
			})
		}
	}
}