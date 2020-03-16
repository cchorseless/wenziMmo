/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_Skill_Circle extends ui.wuXue.WuXue_Skill_CircleUI {
		public static skillAdd = 'SkillAdd_';
		public static skillRemove = 'SkillRemove_';
		public pageID;
		public index;
		public skillItemBase;
		constructor() {
			super();
		}
		/**
		 * 
		 * @param pageID 页数套路类型
		 * @param index 序列
		 * @param skill 技能数据
		 */
		public setData(pageID, index: number, skill = null) {
			this.img_lock.visible = false;
			this.img_num.skin = 'image/common/wuxue/font_' + (index + 1) + '.png';
			this.pageID = pageID;
			this.index = index;
			if (skill) {
				this.skillItemBase = skill;
				this.img_unlock.visible = false;
				let item = new WuXue_logoWithNameV1Item()
				item.setData(skill);
				this.box_skill.addChild(item);
			}
			else {
				this.img_unlock.visible = true;
			}
			// 添加技能监听
			GameApp.LListener.on(WuXue_Skill_Circle.skillAdd + this.pageID + this.index, this, (skillBase) => {
				Log.trace(WuXue_Skill_Circle.skillAdd + this.pageID + this.index)
				this.box_skill.removeChildren();
				let item = new WuXue_logoWithNameV1Item()
				item.setData(skillBase);
				this.box_skill.addChild(item);
				this.skillItemBase = item.skillBase;
				this.img_unlock.visible = false;
			})

			// 删除技能监听
			GameApp.LListener.on(WuXue_Skill_Circle.skillRemove + this.pageID + this.index, this, (skillBase) => {
				this.box_skill.removeChildren();
				this.img_unlock.visible = true;
				this.skillItemBase = null
			})

		}

		public destroy() {
			GameApp.LListener.offCaller(WuXue_Skill_Circle.skillAdd + this.pageID + this.index, this)
			GameApp.LListener.offCaller(WuXue_Skill_Circle.skillRemove + this.pageID + this.index, this)
			super.destroy()
		}

		/**
		 * 添加技能
		 */
		public addSkillItem(item: WuXue_logoWithNameV1Item) {
			// 穿技能
			let skillID = item.skillBase.skillid;
			let pkt1 = new ProtoCmd.AvatarSetSkillShortCutsEnDeCoder();
			pkt1.setValue('oldcol', this.index);
			pkt1.setValue('oldrow', this.pageID);
			pkt1.shortcuts.emShortCuts = 1;
			pkt1.shortcuts.i64Id = ProtoCmd.Int64.numberToInt64(skillID)
			pkt1.shortcuts.btCol = this.index;
			pkt1.shortcuts.btRow = this.pageID;
			lcp.send(pkt1);
			item.removeSelf();
		}



		/**
		 * 移除技能
		 */
		public removeSkillItem() {
			//脱技能
			let pkt = new ProtoCmd.AvatarDelSkillShortCutsEnDeCoder();
			pkt.shortcuts.btCol = this.index;
			pkt.shortcuts.btRow = this.pageID;
			lcp.send(pkt);
		}

		


	}
}