/**Created by the LayaAirIDE*/
module view.team {
	export class Team_MainDialog extends ui.team.Team_MainDialogUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.addEvent();
			this.init_myTeam();
		}
		public addEvent(): void {

		}
		public init_myTeam(): void {
			// 判定 有无队伍
			let btGroupId = GameApp.MainPlayer.feature.btGroupId;
			// 有队伍
			if (btGroupId) {
				let pkt = new ProtoCmd.TeamInfomationDecoder();
				pkt.setValue('dwGroupId', btGroupId)
				lcp.send(pkt, this, (data) => {
					let cbpkt = new ProtoCmd.TeamInfomationDecoder(data);
					let monsterId = cbpkt.MasterId;
					console.log('============>masterID', cbpkt.MasterId)
					//循环查询成员信息
					let i = 0;
					for (let info of cbpkt.Members) {
						if (info.onlyid == monsterId) {
							this.ui_team0.setData(info);
						} else {
							i += 1;
							if (i <= 3) {
								this['ui_team' + i].setData(info);
							}
						}
					}
				})
			}
		}
	}
}