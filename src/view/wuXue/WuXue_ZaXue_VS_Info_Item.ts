/**
* name 
*/
module view.wuXue{
	export class WuXue_ZaXue_VS_Info_Item extends ui.wuXue.WuXue_ZaXue_VS_Info_ItemUI{
		constructor(){
			super();
			this.addEvent();
		}
		private skillId:number;
		private configId:string;
		private maxProgressLength:number = 255;
		public setData(skillId:number){
			this.skillId = skillId;
			this.configId = GameApp.MainPlayer.skillInfo[this.skillId].configID;
			this.maxProgressLength = this.img_progress.width;
			this.renderItem();
		}

		private renderItem(){
			let skillData = GameApp.MainPlayer.skillInfo[this.skillId];
			let skillConfig = SheetConfig.mydb_magic_tbl.getInstance(null);

			// 技能icon背景
			this.img_bg.skin = "";
			// 技能icon
			this.img_icon.skin = PathUtil.getSkillIconPath(this.skillId);
			// 技能名字
			this.lb_skill_name.text = skillConfig.NAME(this.configId).split('_')[0];
			// 技能等级
			this.lb_skill_lv.text = 'lv.' + skillData.subLevel;
			// 到达了最大等级
			if(skillConfig.NUMBER(this.configId) == 0){
				this.box_exp.visible = false;
				this.lb_maxLv.visible = true;
			} else {
				this.box_exp.visible = true;
				this.box_exp.visible = false;
				// 升级所需经验
				let needExp = skillConfig.PROFICIENCY(this.configId);
				let curExp = skillData.dwexp;
				this.lb_exp_left.text = (needExp - curExp).toString();
				this.lb_exp_right.text = '/' + curExp;
				// 进度条
				this.img_progress.width = this.maxProgressLength * curExp / needExp;
			}
			// 技能描述
			this.lb_skill_describe.text = skillConfig.SKILL_DESCRIPTION(this.configId).toString();
		}

		private addEvent(){
			this.img_icon.on(Laya.UIEvent.CLICK, this, function () {

			})
		}
	}
}