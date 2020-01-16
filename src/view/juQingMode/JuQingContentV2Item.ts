/**Created by the LayaAirIDE*/
module view.juQingMode {
	export class JuQingContentV2Item extends ui.juQingMode.JuQingContentV2ItemUI {
		constructor() {
			super();
		}
		public npcId: string
		public setData(npcid: number, txt: string): void {
			txt = GameApp.DomUtil.dealWithTalkTxt(txt);
			this.div_content.style.fontSize = 24;
			this.div_content.style.bold = true;
			this.div_content.style.fontFamily = "FZHuaLi-M14S";
			this.div_content.style.wordWrap = true;
			this.div_content.style.leading = 5;
			this.div_content.style.align = 'middle';
			this.div_content.innerHTML = txt;
			if (txt.search('<a href=') > -1) {
				this.div_content.on(Laya.Event.LINK, this, (data) => {
					console.log(data)
					let o = new JuQingContentDialog();
					o.setData(data)
					o.popup(true)
				})
			}
			// NPC 头像
			this.npcId = '' + npcid;
			this.ui_item.img_avatarPic.skin = 'image/common/npc/npc_icon_' + npcid + '.png';
			this.ui_item.lbl_npcName.color = "#fff4ce"
			this.ui_item.lbl_npcName.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME('' + npcid);
			this.addEvent();
		}

		public addEvent(): void {
			EventManage.onWithEffect(this.ui_item, Laya.UIEvent.CLICK, this, () => {
				new view.npc.NpcInfoV0Dialog().setData(this.npcId).popup();
			})
		}
	}
}