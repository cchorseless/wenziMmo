/**Created by the LayaAirIDE*/
module view.npc {
	export class Main_NPCWuXueItem extends ui.npc.Main_NPCWuXueItemUI {
		constructor() {
			super();
		}
		//npc信息
		public item: GameObject.Npc;
		public npcDialog: view.npc.Main_TanSuoV1Dialog;
		//当前技能id
		public curid;
		public setData(obj: GameObject.Npc, NPCdialog): void {
			this.item = obj;
			this.npcDialog = NPCdialog;
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
					let id = GameConfigFunc.getAllData(parseInt(skillArray[i]))[0];
					if (id) {
						//武学等级
						let idArray = skillArray[i].split('');
						let curlvl = parseInt(idArray[(idArray.length - 1)]);

						if (curlvl > (NPCdialog.lvl - 5)) {
							let img = new Laya.Image();
							img.skin = 'image/common/img_suoding.png';
							ui_item.ui_item.img_skill_bg.gray = true;
							ui_item.addChild(img);
							img.x = 34;
							img.y = 4;
						}
						ui_item.ui_item.visible = true;
						ui_item.setData(parseInt(id));
						this.box_skill.addChild(ui_item);
						// ui_item.y = 55;
						ui_item.x = ui_item.width * shu;
						shu += 1;
					}
				}
			}
			//初始化选中状态
			if (this.box_skill._childs[0]) {
				this.init_change(this.box_skill._childs[0].configID);
				this.box_skill._childs[0].ui_item.img_light.visible = true;
			}
			this.addEvent();
		}
		public addEvent(): void {
			//切换武学
			for (let skill of this.box_skill._childs) {
				skill.on(Laya.UIEvent.CLICK, this, () => {
					//取消所有选中效果
					for (let j in this.box_skill._childs) {
						this.box_skill._childs[j].ui_item.img_light.visible = false;
					}
					//选中当前武学
					skill.ui_item.img_light.visible = true;
					this.init_change(skill.configID);
				})
			}
			this.btn_teach.on(Laya.UIEvent.CLICK, this, () => {
				this.init_Teach();
			})
			this.btn_goOut.on(Laya.UIEvent.CLICK, this, () => {
				this.npcDialog.view_npc.selectedIndex = 0;
			})
		}
		/**
		 * 
		 * @param id 技能id
		 */
		public init_change(id): void {
			// this.ui_skill.ui_item.visible=true;
			// this.ui_skill.setData(id);
			//升级所需要的碎片id
			let partID = '' + SheetConfig.mydb_magic_tbl.getInstance(null).SKILLS_QUALITY_UP_ITEM('' + id);
			//已有碎片数量
			let num = GameUtil.findItemInBag(parseInt(partID));
			this.lbl_skillnum.text = '' + num;
			//升级所需要的碎片数量
			let max = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLS_QUALITY_NUMBER('' + id);
			this.lbl_skillmax.text = '/' + max;
			this.lbl_skillmax.x=this.lbl_skillnum.x+this.lbl_skillnum.width;
			//判断是否是第一次学该武学
			let skillFirst = this.npcDialog.skillFirst;
			let bianhao = '' + SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_ID('' + id)//技能编号
			this.curid = bianhao;
			//武学等级
			let idArray = bianhao.split('');
			let curlvl = parseInt(idArray[(idArray.length - 1)]);
			let haogan = LangConfig.RELATIONSHIP_TYPEDES(curlvl + 5);
			this.lbl_condition.text = haogan[0];
			this.lbl_condition.color = haogan[1];
			//是否能请教
			if (curlvl > (this.npcDialog.lvl - 5)) {
				this.btn_teach.disabled = true;
			} else {
				this.btn_teach.disabled = false;
			}
			for (let skill in skillFirst) {
				if (parseInt(skill) == parseInt(bianhao)) {
					//第一次学还没学会
					if (skillFirst[skill] == 0) {
						this.ui_skill.visible = false;
						this.img_no.visible = true;
						this.lbl_get.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMSTORE(partID);
					} else {
						//不是第一次学
						this.ui_skill.visible = true;
						this.img_no.visible = false;
						//选中的武学icon
						this.ui_skill.setData(id);
						switch (this.npcDialog.lvl) {
							//6融洽7喜爱
							case 6:
							case 7:
								if (curlvl == 1 || curlvl == 2) {
									this.lbl_get.text = '' + 1
								}
								break;
							//亲密
							case 8:
								if (curlvl == 1) {
									this.lbl_get.text = '' + 2;
								}
								if (curlvl == 2) {
									this.lbl_get.text = '' + 1;
								}
								break;
							//灵犀
							case 9:
								if (curlvl == 1) {
									this.lbl_get.text = '' + 2;
								}
								if (curlvl == 2) {
									this.lbl_get.text = '' + 2;
								}
								break;
						}
					}
				}
			}
		}
		/**
		 * 请教武学
		 */
		public init_Teach(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.NPC_getSkillItem, [this.item.feature.dwCretTypeId, this.curid], null, this, (jsonData) => {
				//刷新
				this.npcDialog.init_haoganEvent()
			})
			lcp.send(pkt);
		}
	}
}