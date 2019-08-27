/**Created by the LayaAirIDE*/
module view.compart {
	export class NpcIconItem extends ui.compart.NpcIconItemUI {
		constructor() {
			super();
		}
		public item: GameObject.Creature;
		public setData(obj: GameObject.Creature): void {
			this.item = obj;
			this.lbl_npcName.text = '' + obj.objName;
			this.addEvent();
		}
		public addEvent(): void {
			EventManage.onWithEffect(this, Laya.UIEvent.CLICK, this, () => { new view.dialog.NpcInfoDialog().popup(true); });
		}
	}
}