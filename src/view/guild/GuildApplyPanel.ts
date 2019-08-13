/**Created by the LayaAirIDE*/
module view.guild{
	export class GuildApplyPanel extends ui.guild.GuildApplyPanelUI{
		constructor(){
			super();
		}
		public setData(): void {
			this.box_guildNoApply.visible=false;
			this.panel_guildApply.vScrollBarSkin = '';
			this.vbox_guildApply['sortItem'] = (items) => { };

			for (let i = 0; i < 10; i++) {
				this.vbox_guildApply.addChild(new view.compart.GuildApplyItem());
			}
              this.btn_guildApplyReturn.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this, true, 4);
			});
		}
	}
}