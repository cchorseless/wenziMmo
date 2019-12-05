/**Created by the LayaAirIDE*/
module view.npc {
	export class NpcIconItem extends ui.npc.NpcIconItemUI {
		constructor() {
			super();
		}

		public item: GameObject.Npc;
		public setData(obj: GameObject.Npc): NpcIconItem {
			this.item = obj;
			this.item.ui_item = this;
			this.initUI();
			this.addEvent();
			return this;
		}

		public addEvent(): void {
			EventManage.onWithEffect(this.box_view, Laya.UIEvent.CLICK, this, () => {
				let pkID = this.item.feature.dwCretTypeId
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.clickNpc, [pkID], 0,this, function (data) {
					let aa = data;
					new view.npc.NpcInfoV1Dialog().setData(this.item).popup(true);
				})
				lcp.send(pkt);

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
			let pathID = SheetConfig.mydb_npcgen_tbl.getInstance(null).ICON_NUMBER('' + configId)
			if (pathID > 0) {
				this.img_avatarPic.skin = 'image/common/npc/npc_icon_' + pathID + '.png';
				this.img_bg.skin = "image/main/frame_npc_01.png"
			} else {
				this.img_bg.skin = "image/main/frame_npc_02.png"
			}

			this.lbl_zuoBiao.text = '(' + this.item.location.ncurx + ',' + this.item.location.ncury + ')';
		}
		/**
		 * 新服活动-全民BOSS
		 */
		public newServer_AllBoss(id): NpcIconItem {
			//boss头像
			let img_allBoss = SheetConfig.mydb_monster_tbl.getInstance(null).HEAD_IMAGE('' + id);
			this.img_avatarPic.skin = 'image/common/npc/npc_icon_' + img_allBoss + '.png';
			let name = SheetConfig.mydb_monster_tbl.getInstance(null).NAME('' + id);
			this.lbl_npcName.text = '' + name;
			this.img_tips.visible = false;
			this.lbl_zuoBiao.visible = false;
			return this;
		}
	}
}