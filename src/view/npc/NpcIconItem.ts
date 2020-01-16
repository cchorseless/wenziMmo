/**Created by the LayaAirIDE*/
module view.npc {
	export class NpcIconItem extends ui.npc.NpcIconItemUI {
		constructor() {
			super();
		}

		public item: GameObject.Npc;
		public setData(obj): NpcIconItem {
			this.item = obj;
			this.item.ui_item = this;
			this.centerX = this.centerY = 0
			this.initUI();
			this.addEvent();
			return this;
		}

		public addEvent(): void {
			EventManage.onWithEffect(this.box_view, Laya.UIEvent.CLICK, this, () => {
				let pkID = this.item.feature.dwCretTypeId
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.clickNpc, [pkID], 0, this, function (data) {
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
			// 任务状态
			switch (this.item.taskState) {
				//无任务
				case EnumData.NPCSTATUS.NOTASKALL:
					this.lbl_state.text = '';
					break;
				//可交付
				case EnumData.NPCSTATUS.ONETASKCOMPLETE:
				case EnumData.NPCSTATUS.REPEATTASKCOMPLETE:
					this.lbl_state.text = '？';
					this.lbl_state.color = '#efc623';
					break;
				//可领取
				case EnumData.NPCSTATUS.ONETASKNORECEIV:
				case EnumData.NPCSTATUS.REPEATTASKNORECEIV:
					this.lbl_state.text = '!';
					this.lbl_state.color = '#efc623';
					break;
				//接了任务未达成
				case EnumData.NPCSTATUS.ONETASKNOT:
					this.lbl_state.text = '？';
					this.lbl_state.color = '#000000';
					break;
			}
			// 配置表ID
			let configId = this.item.feature.dwCretTypeId;
			let pathID = SheetConfig.mydb_npcgen_tbl.getInstance(null).ICON_NUMBER('' + configId)
			if (pathID > 0) {
				this.img_avatarPic.skin = 'image/common/npc/npc_icon_' + pathID + '.png';
				this.img_bg.skin = "image/common/frame_npc.png"
			} else {
				this.img_bg.skin = "image/common/frame_npc.png"
			}
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
			return this;
		}
	}
}