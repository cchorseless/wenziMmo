/**Created by the LayaAirIDE*/
module view.guild{
	export class GuildRecordPanel extends ui.guild.GuildRecordPanelUI{
		constructor(){
			super();
		}
		public setData():void{
			this.btn_guildRecordReturn.on(Laya.UIEvent.CLICK,this, ()=>{
				PopUpManager.checkPanel(this, true, 4);
			})
		}
	}
}