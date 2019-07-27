/**Created by the LayaAirIDE*/
module view.guild{
	export class GuildTeamPanel extends ui.guild.GuildTeamPanelUI{
		constructor(){
			super();
		}
			public setData(): void {
			this.panel_get.vScrollBarSkin = '';
			this.vbox_get['sortItem'] = (items) => { };
			this.tab_team.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_team.selectedIndex = index;
			}, null, false);
			
			for (let i = 0; i < 10; i++) {
				this.box_actGet.addChild;
			}

		}
	}
}