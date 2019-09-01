/**Created by the LayaAirIDE*/
module view.dialog {
	export class NpcInfoDialog extends ui.dialog.NpcInfoDialogUI {
		constructor() {
			super();
		}
		public item: GameObject.Npc;
		public setData(item: GameObject.Npc): NpcInfoDialog {
			this.item = item;
			// 配置表ID
			let configId = this.item.feature.dwCretTypeId
			this.img_npcPic.skin = 'image/common/npc/npc_half_' + configId + '.png';
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => { this.close() });
		}
	}
}