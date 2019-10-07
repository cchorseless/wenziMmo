/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildOutDialog extends ui.guild.GuildOutDialogUI {
		constructor() {
			super();
			this.addEvent();
		}
		public setData(data): GuildOutDialog {
			this.lbl_gongXian.text = '';
			this.lbl_guildLv.text = '';
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
				this.close();
				PanelManage.openMainPanel()
			})
		}
	}
}