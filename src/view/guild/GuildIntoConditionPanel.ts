/**Created by the LayaAirIDE*/
module view.guild{
	export class GuildIntoConditionPanel extends ui.guild.GuildIntoConditionPanelUI{
		constructor(){
			super();
		}
		public setData(): void {
                 this.btn_guildIntoReturn.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this, true, 4);
			})
		}
	}
}