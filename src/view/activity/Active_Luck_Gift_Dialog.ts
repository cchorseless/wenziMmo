/**Created by the LayaAirIDE*/
module view.activity {
	export class Active_Luck_Gift_Dialog extends ui.activity.Active_Luck_Gift_DialogUI {
		constructor() {
			super();
			this.addEvent();
		}
		public setData(data, str) {
			this.lab_Name.text = str;
			for (let i in data) {
				// this.box_1
				let o = new view.compart.DaoJuItem();
				let base = new ProtoCmd.ItemBase();
				base.dwBaseID = data[i].index;
				base.dwCount = data[i].num;
				base.dwBinding = data[i].binding;
				o.setData(base, EnumData.ItemInfoModel.SHOW_IN_MAIL)
				this["box_" + i].addChild(o)
			}
		}
		public addEvent() {
			this.btn_close.on(Laya.UIEvent.CLICK,this,function(){
				this.close();
			})
		}
	}
}