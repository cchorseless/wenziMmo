/**Created by the LayaAirIDE*/
module view.guild{
	export class GuildTeamPanel extends ui.guild.GuildTeamPanelUI{
		constructor(){
			super();
			this.addEvent();
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
		public addEvent():void{
			this.img_guildIntoSet.on(Laya.UIEvent.CLICK,this,() =>{
                PanelManage.openGuildIntoConditionPanel();
			
		}) 
			this.img_guildOut.on(Laya.UIEvent.CLICK,this,() =>{
               new view.dialog.GuildOutDialog().popup(true);
		})
		}
	}
}