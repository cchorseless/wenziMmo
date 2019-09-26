/**Created by the LayaAirIDE*/
module view.dialog {
	export class TeamMemberDialog extends ui.dialog.TeamMemberDialogUI {
		constructor() {
			super();

		}
		public item;
		public setData(item): TeamMemberDialog {
			this.item = item;
			this.lbl_name.text = '' + item.szName;
			this.lbl_lvl.text = '' + item.lvl;
			let onlyid = GameApp.MainPlayer.onlyId;
		
			this.addEvent();
			this.outedTeam();
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			});

		}
		public outedTeam(): void {
			let btGroupMaster = GameApp.MainPlayer.feature.btGroupMaster;
			//是队长
			if (btGroupMaster) {
				this.btn_out.visible = true;
				this.btn_out.on(Laya.UIEvent.CLICK, this, () => {
					let pkt = new ProtoCmd.TeamKickoutEncoder(null);
					pkt.setValue('dwOnlyid', this.item.onlyid);
					lcp.send(pkt, this, (data) => {
						let cbpkt = new ProtoCmd.TeamKickoutDecoder(data);
					})
				});
			}

		}
	}
}