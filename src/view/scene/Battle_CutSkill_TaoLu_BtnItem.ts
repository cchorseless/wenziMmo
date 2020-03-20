/**Created by the LayaAirIDE*/
module view.scene{
	export class Battle_CutSkill_TaoLu_BtnItem extends ui.scene.Battle_CutSkill_TaoLu_BtnItemUI{
		public taoluID = 0;
		public labels = ['拳脚','刀剑','长兵','奇门']
		constructor(){
			super();
			this.addEvent();
		}
		public setData(taoluID){
			this.taoluID = taoluID;
			// this.
			this.btn_show.skin = 'image/common/fight/icon_' + taoluID+'.png';
			this.btn_show.label  =this.labels[taoluID];
		}
		public addEvent(){
			// this.
		}
		public setButton(boo:boolean){
			this.btn_kuang.selected = boo;
			this.btn_show.selected = boo;
			this.img_MP.visible = !boo;
		}
	}
}