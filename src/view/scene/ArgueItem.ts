/**Created by the LayaAirIDE*/
module view.scene{
	export class ArgueItem extends ui.scene.ArgueItemUI{
		constructor(){
			super();

			this.initData();
		}
		public setData(my,npc){
			this.img_my.skin = 'image/npc_jiaohu/img_pai'+my+'.png';
			this.img_npc.skin = 'image/npc_jiaohu/img_pai'+npc+'.png';
		}
		public initData(){
			this.img_my.skin = this.img_npc.skin = ''
		}
	}
}