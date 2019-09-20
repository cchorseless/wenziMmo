/**Created by the LayaAirIDE*/
module view.dialog{
	export class TeamInvitCheckDialog extends ui.dialog.TeamInvitCheckDialogUI{
		constructor(){
			super();
		}
			public setData(item:any): TeamInvitCheckDialog {
			// this.lbl_name.text = '' + item.playerName;
			// this.lbl_lvl.text = '' + item.level;
			return this;
		}
	}
}