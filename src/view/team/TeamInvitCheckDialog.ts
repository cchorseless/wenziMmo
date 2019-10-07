/**Created by the LayaAirIDE*/
module view.team {
	export class TeamInvitCheckDialog extends ui.team.TeamInvitCheckDialogUI {
		constructor() {
			super();
		}
		public item;
		public setData(item: any): TeamInvitCheckDialog {
			this.item = item;
			//邀请自己的人的姓名
			this.lbl_name.text = '' + item.playerName;
			//邀请自己的人的等级
			this.lbl_lvl.text = '' + item.level;
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			//同意邀请
			this.btn_agree.on(Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.TeamAgreeInviteEnDecoder(null);
				pkt.setValue('szMasterName', this.item.playerName);
				pkt.setValue('boAllow', true);
				lcp.send(pkt, this)
				this.close();
			})
			this.btn_refuse.on(Laya.UIEvent.CLICK, this, () => {
				//拒绝邀请
				let pkt = new ProtoCmd.TeamAgreeInviteEnDecoder(null);
				pkt.setValue('szMasterName', this.item.playerName);
				pkt.setValue('boAllow', false);


				
				lcp.send(pkt, this)
				this.close();
			})
		}
	}
}