/**Created by the LayaAirIDE*/
module view.npc {
	export class Main_NPCWuXueDialog extends ui.npc.Main_NPCWuXueDialogUI {
		constructor() {
			super();
		}
		//npc信息
		public item: GameObject.Npc;
		public setData(obj: GameObject.Npc, NPCdialog): Main_NPCWuXueDialog {
			this.item = obj;
			//NPC姓名
			this.lbl_name.text = SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME('' + obj.feature.dwCretTypeId);
			//造型图
			let icon = SheetConfig.mydb_npcgen_tbl.getInstance(null).ICON_NUMBER('' + obj.feature.dwCretTypeId);
			this.img_npc.skin = 'image/common/npc/npc_half_' + icon + '.png';
			//好感度
			this.lbl_now.text = '' + NPCdialog.lbl_now.text;
			this.lbl_max.text = NPCdialog.lbl_max.text;
			this.img_haogan.width = NPCdialog.img_haogan.width;
			//体力
			this.lbl_tili.text = '' + GameApp.MainPlayer.nTili;
			this.lbl_maxtili.text = '/100';
			//NPC技能
			let skillArray = SheetConfig.mydb_npcgen_tbl.getInstance(null).SKILLS_UP_ITEM('' + obj.feature.dwCretTypeId).split('|');
			this.box_skill.removeChildren();
			let shu = 0;
			for (let i in skillArray) {
				if (parseInt(skillArray[i]) > 0) {
					let ui_item = new view.wuXue.WuXue_logoWithNameItem();
					let id = SheetConfig.mydb_magic_tbl.getInstance(null).getAllData(parseInt(skillArray[i]))[0];
					if (id) {
						if (NPCdialog.lvl <= 0) {
							let img = new Laya.Image();
							img.skin = 'image/common/img_suoding.png';
							ui_item.ui_item.gray = true;
							ui_item.addChild(img);
							img.x = 34;
							img.y = 4;
							this.ui_skill.visible = false;
							this.img_no.visible = true;
						} else {
							this.ui_skill.ui_item.visible = true;
							this.ui_skill.visible = true;
							this.img_no.visible = false;
						}
						ui_item.setData(parseInt(id));
						this.box_skill.addChild(ui_item);
						ui_item.y = 55;
						ui_item.x = ui_item.width * shu + 40;
						shu += 1;
					}
				}
			}
			if (this.box_skill._childs[0]) {
				this.init_change(this.box_skill._childs[0].configID);
			}
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			for (let skill of this.box_skill._childs) {
				skill.on(Laya.UIEvent.CLICK, this, () => {
					for (let j in this.box_skill._childs) {
						this.box_skill._childs[j].ui_item.img_light.visible = false;
					}
					skill.ui_item.img_light.visible = true;
					this.init_change(skill.configID);
				})
			}
		}
		public init_change(id): void {
			this.ui_skill.setData(id);
		}
	}
}