/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildTouPiaoDetailDialog extends ui.guild.GuildTouPiaoDetailDialogUI {
		constructor() {
			super();
		}
		public setData(data: Array<ProtoCmd.stVoterBase>): GuildTouPiaoDetailDialog {
			this.panel_0.vScrollBarSkin = this.panel_1.vScrollBarSkin = '';
			this.vbox_0['sortItem'] = (items) => { };
			this.vbox_1['sortItem'] = (items) => { };
			for (let item of data) {
				let lbl = new Laya.Label();
				lbl.fontSize = 25;

				// 同意
				switch (item.getValue('btVote')) {
					case 1:
						lbl.text = '' + (this.vbox_0.numChildren + 1) + '-' + item.getValue('szName');
						this.vbox_0.addChild(lbl);
						break;
					case 2:
						lbl.text = '' + (this.vbox_1.numChildren + 1) + '-' + item.getValue('szName');
						this.vbox_1.addChild(lbl);
						break;
				}
			}
			this.addEvent();
			return this
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, this.close);
		}
	}
}