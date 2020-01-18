/**Created by the LayaAirIDE*/
module view.npc {
	export class NpcFunctionItem extends ui.npc.NpcFunctionItemUI {
		constructor() {
			super();
		}
		/**
        * 
        * @param data 功能NPC
        */
		public item: GameObject.Monster;
		public setData(data: GameObject.Npc): void {
			this.item = data;
			this.img_icon.skin = 'image/common/img_danLu.png';
			this.lbl_name.text = data.objName;
			this.addEvent();
		}
		public addEvent(): void {
			EventManage.onWithEffect(this.box_view, Laya.UIEvent.CLICK, this, () => {
				//無好感度NPC（功能NPC）弹窗
				new view.npc.Main_TanSuoV0Dialog().setData(this.item, 2).popup();
			})
		}
	}
}