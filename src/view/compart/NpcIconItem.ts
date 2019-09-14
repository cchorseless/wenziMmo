/**Created by the LayaAirIDE*/
module view.compart {
	export class NpcIconItem extends ui.compart.NpcIconItemUI {
		constructor() {
			super();
		}

		public item: GameObject.Npc;
		public setData(obj: GameObject.Npc): void {
			this.item = obj;
			this.item.ui_item = this;
			this.initUI();
			this.addEvent();
		}

		public addEvent(): void {
			EventManage.onWithEffect(this, Laya.UIEvent.CLICK, this, () => {
				new view.dialog.NpcInfoV1Dialog().setData(this.item).popup(true);
			});
		}

		public showHelloTalk(): void {
			// this.img_chat.visible = true;
			// 配置表ID
			// let configId = '' + this.item.feature.dwCretTypeId;
			// let allTalk = SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_TALK(configId);
			// this.lbl_chat.text = '' + RandomUtils.randomArray(allTalk);
			// Laya.Tween.to(this.img_chat, { scaleX: 1 }, 500, null,
			// 	Laya.Handler.create(this, () => {
			// 		Laya.Tween.to(this.img_chat, { scaleX: 0 }, 500, null, null, 2000)
			// 	})
			// )
		}

		public initUI(): void {
			this.lbl_npcName.text = '' + this.item.objName;
			this.img_tips.visible = false;
			// 任务状态
			switch (this.item.taskState) {
				case EnumData.NPCSTATUS.NOTASKALL:
					break;
				case EnumData.NPCSTATUS.ONETASKCOMPLETE:
					break;
				case EnumData.NPCSTATUS.ONETASKNORECEIV:
					break;
				case EnumData.NPCSTATUS.ONETASKNOT:
					break;
				case EnumData.NPCSTATUS.REPEATTASKCOMPLETE:
					break;
				case EnumData.NPCSTATUS.REPEATTASKNORECEIV:
					break;
			}
			// 配置表ID
			let configId = this.item.feature.dwCretTypeId;
			this.img_avatarPic.skin = 'image/common/npc/npc_icon_' + configId + '.png';
			this.lbl_zuoBiao.text = '(' + this.item.location.ncurx + ',' + this.item.location.ncury + ')';
		}
	}
}