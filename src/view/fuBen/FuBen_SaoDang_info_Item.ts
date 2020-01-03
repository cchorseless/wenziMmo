/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_SaoDang_info_Item extends ui.fuBen.FuBen_SaoDang_info_ItemUI {
		public cengID;
		constructor() {
			super();
			this.panel_first.hScrollBarSkin = this.panel_drop.hScrollBarSkin = '';
			this.addEvent();
		}
		public addEvent() {
			this.btn_challenge.on(Laya.UIEvent.CLICK, this, function () {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.FB_ChuMoEnter, [this.cengID]);
				lcp.send(pkt);
				this.close();
			})
			this.btn_saodang.on(Laya.UIEvent.CLICK, this, function () {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.oneKeyFinishChuMo, [this.cengID]);
				lcp.send(pkt);
				this.close();
			})
		}
		public setData(data, star) {
			this.cengID = data[0];
			if (star == 0) {
				this.box_star.visible = false;
				this.panel_first.visible = true;
				this.box_challenge.visible = false;
				this.btn_saodang.visible = false;
				let firstReward = data[7]
				let item;
				item = firstReward.split('|');
				for (let i = 0; i < item.length; i++) {
					let o = new FuBen_RewardItem();
					let itembase = new ProtoCmd.ItemBase();
					let base = item[i].split('`')
					itembase.dwBaseID = base[0];
					itembase.dwCount = base[1];
					o.setData(itembase, false)
					o.x = i * o.width + 20;
					this.panel_first.addChild(o)
				}
			} else if (star > 0 && star < 3) {
				this.box_star.visible = false;
				this.box_challenge.visible = true;
				this.panel_first.visible = false;
				this.btn_saodang.visible = false;
			} else if (star == 3) {
				this.box_star.visible = true;
				this.box_challenge.visible = false;
				this.panel_first.visible = false;
				this.btn_saodang.visible = true;
			}
			this.lab_stageID.text = data[9];
			this.lab_stageName.text = data[3];
			let coin;
			let exp;
			let dropReward = data[4];
			let dropItems;
			dropItems = dropReward.split('|');
			for (let i = 0; i < dropItems.length; i++) {
				let o = new compart.DaoJuWithNameItem();
				let itembase = new ProtoCmd.ItemBase();
				let base = dropItems[i].split('`')

				if (parseInt(base[0]) != 20001 && parseInt(base[0]) != 20015) {
					itembase.dwBaseID = parseInt(base[0]);
					itembase.dwCount = parseInt(base[1]);
					o.setData(itembase)
					o.x = this.panel_drop.numChildren * o.width + 20;
					this.panel_drop.addChild(o);
				} else if (parseInt(base[0]) == 20015) {
					this.lab_jinbi.text = base[1];
				} else if (parseInt(base[0]) == 20001) {
					this.lab_exp.text = base[1];
				}

			}
		}
	}
}