/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_InfoItem extends ui.wuXue.WuXue_InfoItemUI {
		constructor() {
			super();
		}

		public item: ProtoCmd.stSkillLvlBase;
		public setData(s: ProtoCmd.stSkillLvlBase): void {
			this.item = s;
			let configID = s.configID;
			// 等级
			for (let i = 1; i < 6; i++) {
				this['btn_' + i].selected = (i < s.level);
				if (this['btn_' + i].selected == true) {
				} else {
					this['btn_' + i].mouseEnabled = false;
				}
			}
			// 经验
			let expMax = Math.max(SheetConfig.mydb_magic_tbl.getInstance(null).PROFICIENCY(configID), 1);
			this.lbl_exp.text = s.dwexp + '/' + expMax;
			this.img_exp.width = this.img_expBg.width * Math.min(s.dwexp / expMax, 1);
			// 使用中
			this.img_isUse.visible = false;
			for(let k in GameApp.MainPlayer.skillShotButton){
				let skid = GameApp.MainPlayer.skillShotButton[k].i64Id.int64ToNumber();
				if( skid== s.skillid){
					this.img_isUse.visible = true;
				}
			}
			// this.img_isUse.visible = Boolean(GameApp.MainPlayer.skillShotButton[s.configID]);
			// icon
			this.ui_item.setData(configID);
			this.addEvent();
		}


		public addEvent(): void {
			this.btn_info.on(Laya.UIEvent.CLICK, this, () => {
				GameApp.GameEngine.wuxueDataID = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_ID(this.item.configID)
				// new view.wuXue.WuXue_InfoDialog().setData(this.item).show(true);
			})
		}
	}
}