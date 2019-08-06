/**Created by the LayaAirIDE*/
module view.guild{
	export class GuildHelpPanel extends ui.guild.GuildHelpPanelUI{
		constructor(){
			super();
		}
		public setData(): void {
			this.panel_guildHelp.vScrollBarSkin = '';
			this.vbox_guildHelp['sortItem'] = (items) => { };

			for (let i = 0; i < 10; i++) {
				this.vbox_guildHelp.addChild(new view.compart.GuildHelpItem());
			}
 this.btn_guildHelpReturn.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this, true, 4);
			});
		}
	}
}