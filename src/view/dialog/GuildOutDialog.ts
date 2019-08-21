/**Created by the LayaAirIDE*/
module view.dialog {
	export class GuildOutDialog extends ui.dialog.GuildOutDialogUI {
		constructor() {
			super();
			this.addEvent();
		}
		public setData(data): GuildOutDialog {

			return this;
		}
		public addEvent(): void {
			this.btn_guildOutClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			});
			this.btn_quit.on(Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.stGlobalGuildMemberLeave();
				pkt.setValue('btType', 0);
				pkt.setValue('szName', GameApp.MainPlayer.objName);
				pkt.setValue('szMasterName', GameApp.MainPlayer.guildInfo.masterName);
				lcp.send(pkt);
			})
		}
	}
}