/**Created by the LayaAirIDE*/
module view.main {
	export class Main_Skill_Circle extends ui.main.Main_Skill_CircleUI {
		public isTouch = false;
		public skillID = null;
		public unLock = false;
		public skillItemBase;
		public skillConfigID = 0;
		public isCD = false;
		constructor() {
			super();
		}
		public showCD() {
			let cd = 1;
			let self = this;
			if (this.skillID) {
				this.gray = true
				this.isCD = true;
				Laya.timer.once(1000 * cd, this, function () {
					self.gray = false;
					self.isCD = false;
				})
			}
		}
		public setData(unlock: boolean, index: number, skill = null) {
			let skillID = null
			if (skill) {
				skillID = skill.skillid
			}
			this.unLock = unlock;
			if (unlock) {
				if (skillID != null) {
					this.skillItemBase = skill;
					this.skillConfigID = skill.configID
					this.skillID = skillID;
					this.img_lock.visible = false;
					this.img_unlock.visible = false;
					this.ui_show.visible = true;
					this.ui_show.setData(this.skillConfigID);
				} else {
					this.img_lock.visible = false;
					this.img_unlock.visible = true;
					this.ui_show.visible = false;
					// this.lab_Index.text = GameUtil.SectionToChinese(index, 0)
					this.img_num.skin = 'image/common/wuxue/font_' + index + '.png'
				}
			} else {
				this.img_lock.visible = true;
				this.img_unlock.visible = false;
				this.ui_show.visible = false;
			}
		}
	}
}