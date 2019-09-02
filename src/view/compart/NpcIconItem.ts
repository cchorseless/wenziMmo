/**Created by the LayaAirIDE*/
module view.compart {
	export class NpcIconItem extends ui.compart.NpcIconItemUI {
		constructor() {
			super();
		}

		public item: GameObject.Npc;
		public setData(obj: GameObject.Npc): void {
			this.item = obj;
			this.lbl_npcName.text = '' + obj.objName;
			this.img_warn.visible = false;
			// 配置表ID
			let configId = obj.feature.dwCretTypeId;
			this.img_avatarPic.skin = 'image/common/npc/npc_icon_' + configId + '.png';
			this.showHelloTalk();
			this.addEvent();
		}

		public addEvent(): void {
			EventManage.onWithEffect(this, Laya.UIEvent.CLICK, this, () => {
				new view.dialog.NpcInfoDialog().setData(this.item).popup(true);
			});
		}

		public showHelloTalk(): void {
			// 配置表ID
			let configId = this.item.feature.dwCretTypeId;
			// this.lbl_chat.text=''+ SheetConfig.
		}
	}
}