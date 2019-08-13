/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildSelectPanel extends ui.guild.GuildSelectPanelUI {
		constructor() {
			super();

		}
		public setData(): void {
			this.panel_guild.vScrollBarSkin = '';
			this.vbox_guild['sortItem'] = (items) => { };
			this.tab_guild.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_guild.selectedIndex = index;
			}, null, false);

			for (let i = 0; i < 10; i++) {
				this.vbox_guild.addChild(new view.compart.GuildItem());
			}
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_create.on(Laya.UIEvent.CLICK, this, () => {


				// let pkt = new ProtoCmd.stCreatGlobalGuild();

				// pkt.setValue('btOPType', dfdfdfdfdf);

				// lcp.send(pkt, this, (data) => {
				// 	let cbpkt = new ProtoCmd.stCreatGlobalGuildRet(data);
				// 	let errorcode = cbpkt.getValue('errorcode');
				// 	if (errorcode == 0) {
						
				// 	}
				// 	else {

				// 	}

				// })



				PanelManage.openGuildTeamPanel();
			})
		}
	}
}
