/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_Skill_Circle extends ui.wuXue.WuXue_Skill_CircleUI {
		public isTouch = false;
		public skillID = null;
		public unLock  = false;
		constructor() {
			super();
			this.addEvent();
		}
		public setData(unlock: boolean, index: number, skillID = null) {
			this.unLock = unlock;
			if (unlock) {
				if (skillID != null) {
					this.skillID = skillID;
					this.img_lock.visible = false;
					this.img_unlock.visible = false;
					this.ui_show.visible = true;
					this.ui_show.setData(skillID);
				} else {
					this.img_lock.visible = false;
					this.img_unlock.visible = true;
					this.ui_show.visible = false;
					this.lab_Index.text = GameUtil.SectionToChinese(index, 0)
				}
			} else {
				this.img_lock.visible = true;
				this.img_unlock.visible = false;
				this.ui_show.visible = false;
			}
		}
		public addEvent() {
			// this.ui_show.on(Laya.Event.MOUSE_DOWN, this, function (e) {
			// 	this.isTouch = true;
			// 	let aa: any = [e.stageX, e.stageY, this.skillID]
			// 	aa = aa.join(',')
			// 	GameApp.LListener.event(WuXue_WaiGong_VS_Info.SkillDown_Create, aa)
			// })
			// this.ui_show.on(Laya.Event.MOUSE_MOVE, this, function (e) {
			// 	if (this.isTouch) {
			// 		let aa: any = [e.stageX, e.stageY]
			// 		console.log("POS???",e.stageX + "    " + e.stageY)
			// 		aa = aa.join(',')
			// 		GameApp.LListener.event(WuXue_WaiGong_VS_Info.SkillMove, aa)
			// 	}
			// })
			// this.ui_show.on(Laya.Event.MOUSE_UP, this, function (e) {
			// 	if (this.isTouch) {

			// 	}
			// })

		}
	}
}