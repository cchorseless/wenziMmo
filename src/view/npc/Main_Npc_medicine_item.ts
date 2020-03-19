/**Created by the LayaAirIDE*/
module view.npc{
	export class Main_Npc_medicine_item extends ui.npc.Main_Npc_medicine_itemUI{
		// public 
		constructor(){
			super();

		}
		public color = ['#c43939', '#38ad32'];
		/**
		 * 
		 * @param itemID      道具ID
		 * @param probability  成功率
		 * @param type         类型
		 */
		public setData(itemID,probability,type){
			let itembase = new ProtoCmd.ItemBase();
			itembase.dwBaseID = itemID;
			itembase.dwCount =  GameUtil.findItemInBag(itemID, GameApp.GameEngine.bagItemDB)
			this.ui_daoju.setData(itembase);
			this.lab_probability.text ='成功率:'+ probability + '%';
			this.lab_probability.color = this.color[type];
			this.setLight(false)
		}
		public setLight(boo:boolean){
			this.img_light.visible = boo;
		}
	}
}