/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildSelectInfoDialog extends ui.guild.GuildSelectInfoDialogUI {
		constructor() {
			super();
		}
		public setData(guildInfo: ProtoCmd.stGuildDBBase): GuildSelectInfoDialog {
			this.panel_skill.hScrollBarSkin = '';
			this.hbox_skill['sortItem'] = (items) => { };
			this.lbl_guildName.text = guildInfo.szName;
			this.lbl_introduce.text = guildInfo.szJoinNotice;
			let skill = '' + guildInfo.skillList;
			let skillArray = skill.split('/');
			this.hbox_skill.removeChildren();
			for (let single of skillArray) {     
				let skillData = SheetConfig.mydb_magic_tbl.getInstance(null).getAllData(parseInt(single));
				this.hbox_skill.addChild(new view.wuXue.WuXue_logoBgItem())
			}
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}