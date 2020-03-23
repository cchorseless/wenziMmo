/**Created by the LayaAirIDE*/
module view.npc {
	export class NpcIconItem extends ui.npc.NpcIconItemUI {
		constructor() {
			super();
		}
		public static HP = 'NPChp'
		//npc好感度
		public haogan;
		//npc信息
		public item: GameObject.Npc;
		public setData(obj): NpcIconItem {
			if (GameApp.MainPlayer.curFuBenID == 400) {
				this.img_Argue.visible = true;
				let monsterID;
				monsterID = SheetConfig.mydb_npcgen_tbl.getInstance(null).MONSTERID('' + obj.feature.dwCretTypeId)
				GameApp.MainPlayer.fubenMonsterPower += SheetConfig.mydb_monster_tbl.getInstance(null).MONSTER_COMBAT(monsterID)
			} else {
				this.img_Argue.visible = false;
			}
			this.item = obj;
			this.item.ui_item = this;
			this.centerX = this.centerY = 0

			this.haogan = SheetConfig.mydb_npcgen_tbl.getInstance(null).FAVORABLE_COEFFICIENT('' + obj.feature.dwCretTypeId)
			this.initUI();
			this.addEvent();
			return this;
		}
		public changeHeartNum(num) {
			console.log('npc血量' + num)
			this.lab_Argue.text = '心理值:' + num;
		}
		public addEvent(): void {
			GameApp.LListener.on(view.npc.NpcIconItem.HP, this, function (res) {
				this.changeHeartNum(res);
			});
			EventManage.onWithEffect(this.box_view, Laya.UIEvent.CLICK, this, () => {
				if (GameApp.MainPlayer.curFuBenID == 400) {
					return;
				}
				if (this.haogan == 0) {
					//无好感度NPC弹窗
					new view.npc.Main_TanSuoV0Dialog().setData(this.item, 2).popup();
				} else {
					//有好感度NPC
					new view.npc.Main_TanSuoV1Dialog().setData(this.item).popup();
				}
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
			// this.lbl_npcName.text = '' + this.item.objName.split("_")[0];
			this.lbl_npcName.text = SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME(this.item.feature.dwCretTypeId).split("_")[0];

			// 任务状态
			switch (this.item.taskState) {
				//无任务
				case EnumData.NPCSTATUS.NOTASKALL:
					this.lbl_state.text = '';
					break;
				//可交付
				case EnumData.NPCSTATUS.ONETASKCOMPLETE:
				case EnumData.NPCSTATUS.REPEATTASKCOMPLETE:
					this.lbl_state.visible = true;
					this.lbl_state.text = '？';
					this.lbl_state.color = '#efc623';
					break;
				//可领取
				case EnumData.NPCSTATUS.ONETASKNORECEIV:
				case EnumData.NPCSTATUS.REPEATTASKNORECEIV:
					this.lbl_state.visible = true;
					this.lbl_state.text = '!';
					this.lbl_state.color = '#efc623';
					break;
				//接了任务未达成
				case EnumData.NPCSTATUS.ONETASKNOT:
					this.lbl_state.visible = true;
					this.lbl_state.text = '？';
					this.lbl_state.color = '#000000';
					break;
			}
			// 配置表ID
			let configId = this.item.feature.dwCretTypeId;
			let pathID = SheetConfig.mydb_npcgen_tbl.getInstance(null).ICON_NUMBER('' + configId)
			if (pathID > 0) {
				this.img_avatarPic.skin = PathUtil.getNpcIconPath(pathID);
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
			this.img_avatarPic.skin = PathUtil.getNpcIconPath(img_allBoss);
			let name = SheetConfig.mydb_monster_tbl.getInstance(null).NAME('' + id);
			this.lbl_npcName.text = '' + name;
			return this;
		}
	}
}