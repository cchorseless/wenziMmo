/**Created by the LayaAirIDE*/
module view.activity {
	export class Active_equipMix extends ui.activity.Active_equipMixUI {
		public data;
		public itemID;
		public btnState = false;
		public order;
		constructor() {
			super();
			this.addEvent()
		}
		public setData(data, index) {
			this.data = data;
// 682
			let o1 = new view.compart.DaoJuItem();
			let itemBase1 = new ProtoCmd.ItemBase()
			itemBase1.dwBaseID = this.data.needtab[1].index;
			itemBase1.dwCount = this.data.needtab[1].num;
			o1.setData(itemBase1, EnumData.ItemInfoModel.SHOW_IN_MAIL);
			this.box_1.addChild(o1)
			let o2 = new view.compart.DaoJuItem();
			let itemBase2 = new ProtoCmd.ItemBase()
			itemBase2.dwBaseID = this.data.item[1].index;
			itemBase2.dwCount = this.data.item[1].num;
			itemBase2.dwBinding = this.data.item[1].bind;
			o2.setData(itemBase2, EnumData.ItemInfoModel.SHOW_IN_MAIL);
			this.box_2.addChild(o2);
			this.lab_name.text = data.name;
			let curNum = GameUtil.findItemInBag(this.data.needtab[1].index, GameApp.GameEngine.bagItemDB);
			this.lab_num.text = "(" + curNum + "/" + data.needcnt + ")"
			if (curNum >= data.needcnt) {
				this.btnState = true;
			}
		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_mix, Laya.UIEvent.CLICK, this, function () {
				if (!this.btnState) {
					TipsManage.showTips("材料不足！！")
					return;
				}
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.GetComposeEquipAward, [this.data.order])
				lcp.send(pkt);

			})
		}
	}
}