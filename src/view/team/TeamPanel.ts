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
		}
	}
}