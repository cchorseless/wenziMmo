/**Created by the LayaAirIDE*/
module view.npc{
	export class Main_Npc_HaoGanDialog extends ui.npc.Main_Npc_HaoGanDialogUI{
		constructor(){
			super();
			this.setData();
		}
		public setData(){
			for(let i = 0;i <10;i++){
				let o = new Main_Npc_HaoGan_infoItem();
				o.setData(i);
				o.y =i*(o.height + 13)
				this.panel_show.addChild(o);
			}
			this.btn_back.on(Laya.UIEvent.CLICK,this,function(){
				this.close();
			})
		}
	}
}