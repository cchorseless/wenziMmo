/**Created by the LayaAirIDE*/
module view.wuXue{
	export class WuXue_SkillEffect extends ui.wuXue.WuXue_SkillEffectUI{
		constructor(){
			super();
		}
		/**
		 * 
		 * @param type   0:player  1:monster
		 */
		public setData(type,iconID){
			if(type==0){
				this.img_player_BG.visible = true;
				this.img_monster_BG.visible = false;
				this.img_player_icon.skin = 'image/common/skillName/' + iconID + '.png'
			}else{
				this.img_player_BG.visible = false;
				this.img_monster_BG.visible = true;
				this.img_monster_icon.skin = 'image/common/skillName/' + iconID + '.png'
			}
		}
	}
}