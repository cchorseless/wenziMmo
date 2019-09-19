/**Created by the LayaAirIDE*/
module view.compart {
	export class JuQingContentV2Item extends ui.compart.JuQingContentV2ItemUI {
		constructor() {
			super();
		}
		public npcId;
		public setData(npcid: number, txt: string): void {
			this.div_content.style.fontSize = 24;
			this.div_content.style.wordWrap = true;
			this.div_content.style.leading = 5;
			this.div_content.style.align = 'middle';
			this.div_content.innerHTML = txt;
			// NPC 头像
			this.npcId = npcid;
			this.ui_item.img_avatarPic.skin = 'image/common/npc/npc_icon_' + npcid + '.png';
			this.ui_item.img_tips.visible = false;
			this.ui_item.lbl_npcName.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME('' + npcid);
			this.ui_item.lbl_zuoBiao.visible = false;
			this.addEvent();
		}

		public addEvent(): void {
			EventManage.onWithEffect(this.ui_item, Laya.UIEvent.CLICK, this, () => {
				new view.dialog.NpcInfoV0Dialog().setData(this.npcId).popup();
			})
		}
	}
}