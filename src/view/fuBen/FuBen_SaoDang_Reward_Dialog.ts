/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_SaoDang_Reward_Dialog extends ui.fuBen.FuBen_SaoDang_Reward_DialogUI {
		constructor() {
			super();
			this.panel_item.hScrollBarSkin = ''
			this.addEvent();
		}
		public setData(index, bet) {
			let data = GameApp.GameEngine.fuBenResinfo[index]
			for (let i in data.jiangli) {
				let o = new compart.DaoJuWithNameItem();
				let item = new ProtoCmd.ItemBase();
				item.dwBaseID = data.jiangli[i].index;
				item.dwCount = data.jiangli[i].num * bet;
				o.setData(item);
				this.hbox_item.addChild(o);
			}
		}
		public addEvent() {
			this.btn_close.on(Laya.UIEvent.CLICK,this,function(){
				this.close();
			})
		}
	}
}