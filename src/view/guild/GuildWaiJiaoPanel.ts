/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildWaiJiaoPanel extends ui.guild.GuildWaiJiaoPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.addEvent();
		}

		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.Dispose(this);
			})
		}
	}
}