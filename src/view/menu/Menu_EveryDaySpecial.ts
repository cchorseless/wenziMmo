/**Created by the LayaAirIDE*/
module view.menu {
	export class Menu_EveryDaySpecial extends ui.menu.Menu_EveryDaySpecialUI {
		public buttonBJ = 0;
		constructor() {
			super();
			this.addEvent()
			this.getData()
		}
		public getData() {
			let pkt33 = new ProtoCmd.QuestClientData().setString(ProtoCmd.Active33, null)
			lcp.send(pkt33);
		}
		public setData(data) {
			this.buttonBJ = data.state;
			if (this.buttonBJ == 0) {
				this.btn_get.label = "已领取";
			} else if (this.buttonBJ == 1) {
				this.btn_get.label = "领取";
			}
			this.lab_rules.text = data.introduce
			GameUtil.timeCountDown(data.leftsec, this.html_time)
			for (let i = 1; i < 5; i++) {
				let o = new view.compart.DaoJuItem();
				let itemBase = new ProtoCmd.ItemBase();
				itemBase.dwBaseID = data.item[i].index;
				itemBase.dwBinding = data.item[i].binding;
				itemBase.dwCount = data.item[i].num;
				o.setData(itemBase, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				this["box_" + i].addChild(o);
				let itemID = itemBase.dwBaseID
				let name = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(itemID.toString());
				this["lab_name" + i].text = name;
			}
		}
		private addEvent() {
			EventManage.onWithEffect(this.btn_get, Laya.UIEvent.CLICK, this, function () {
				if (this.buttonBJ == 1) {
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.GetMeiRiTeHuiAward, null)
					lcp.send(pkt)

				} else if (this.buttonBJ == 0) {
					TipsManage.showTips("今日已领取")
					return;
				}
			})
			GameApp.LListener.on(ProtoCmd.Active33, this, (data) => {
				this.setData(data);
			})
			this.btn_close.on(Laya.UIEvent.CLICK, this, function () {
				GameApp.LListener.offCaller(ProtoCmd.Active33,this)
				this.close();
			})
		}
	}
}