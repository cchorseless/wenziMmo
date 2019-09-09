/**Created by the LayaAirIDE*/
module view.dialog{
	export class TeamApplyCheckDialog extends ui.dialog.TeamApplyCheckDialogUI{
		constructor(){
			super();
		}
			public setData(item:any): TeamApplyCheckDialog {
			this.lbl_name.text = '' + item.playerName;
			this.lbl_level.text = '' + item.level;
			return this;
		}
		public addEvent(): void {
			this.btn_ok.on(Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.TeamAgreeJoinDecoder(null);
				pkt.setValue('szName', this.lbl_name.text);
				pkt.setValue('szMasterName', GameApp.MainPlayer.objName);
				pkt.setValue('dwGroupId', GameApp.MainPlayer.feature.btGroupId);
				pkt.setValue('boAgree', true);
				lcp.send(pkt, this)
				this.close();
			})
			this.btn_no.on(Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.TeamAgreeJoinDecoder(null);
				pkt.setValue('szName', this.lbl_name.text);
				pkt.setValue('szMasterName', GameApp.MainPlayer.objName);
				pkt.setValue('dwGroupId', GameApp.MainPlayer.feature.btGroupId);
				pkt.setValue('boAgree', false);
				lcp.send(pkt, this)
				this.close();
			})
		}
	}
}