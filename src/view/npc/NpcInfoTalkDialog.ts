/**Created by the LayaAirIDE*/
module view.npc{
	export class NpcInfoTalkDialog extends ui.npc.NpcInfoTalkDialogUI{
		constructor(){
			super();
		this.setData();
		}
		public setData(): void {
			this.addEvent();
		}
		public addEvent(): void {
			this.img_bg.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}