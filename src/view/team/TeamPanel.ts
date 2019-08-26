/**Created by the LayaAirIDE*/
module view.team {
	export class TeamPanel extends ui.team.TeamPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_team01.vScrollBarSkin = '';
			this.panel_team02.vScrollBarSkin = '';
			this.vbox_team01['sortItem'] = (items) => { };
			this.vbox_team02['sortItem'] = (items) => { };
			this.tab_team.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstask_team.selectedIndex = index;
			}, null, false);
			for (let i = 0; i < 10; i++) {
				this.vbox_team01.addChild(new view.compart.TeamItem());
				this.vbox_team02.addChild(new view.compart.TeamItem());
			}
			for (let i = 0; i < 6; i++) {
				this.vbox_team00.addChild(new view.compart.TeamItem());
			}
			this.addEvent();
		}
		public addEvent(): void {
			// 返回
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => { PopUpManager.Dispose(this) });
			// 工会
			this.btn_guild.on(Laya.UIEvent.CLICK, this, () => {
				// 判定 有无公会
				let dwClanId = GameApp.MainPlayer.feature.dwClanId;
				// 有工会
				if (dwClanId) {
					PanelManage.openGuildTeamPanel(dwClanId);
				}
				// 无工会
				else {
					PanelManage.openGuildSelectPanel();
				}
			})
			// 好友
			this.btn_friend.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFriendPanel();
			})
			// NPC好感度
			// todo
			// 小说模式
			this.btn_modeChange.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel();
			});
		}
	}
}