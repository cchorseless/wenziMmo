/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_SaoDang_Reward_Dialog extends ui.fuBen.FuBen_SaoDang_Reward_DialogUI {
		constructor() {
			super();
			
		}
		/**
		 * 
		 * @param data  grade:困难程度 index副本id，itemID:扫荡券id，reward扫荡奖励
		 */
		public data: { grade: number, index: number, itemid: number, reward: any };
		public setData(data: { grade: number, index: number, itemid: number, reward: any }): FuBen_SaoDang_Reward_Dialog {
			this.data = data;
			let haveJinBi = false;
			let jiangli = data.reward;
			for (let i in jiangli) {
				if (jiangli[i].index != 20000 && jiangli[i].index != 20001) {
					let o = new compart.DaoJuWithNameItem();
					let item = new ProtoCmd.ItemBase();
					item.dwBaseID = jiangli[i].index;
					item.dwCount = jiangli[i].num;
					o.setData(item);
					this.hbox_item.addChild(o);
				}
				//金币
				if (jiangli[i].index == 20000) {
					this.lbl_jinbi.text = LangConfig.getBigNumberDes(jiangli[i].num);
					haveJinBi = true;
				}
				//经验
				if (jiangli[i].index == 20001) {
					this.lbl_exp.text = LangConfig.getBigNumberDes(jiangli[i].num);
				}
			}
			this.img_jinbi.visible = haveJinBi;
			this.lbl_now.text = '' + PanelManage.FuBenRes.now;
			this.lbl_max.text = '/' + PanelManage.FuBenRes.max;
			this.addEvent();
			return this;
		}
		public addEvent() {
			this.btn_jixu.on(Laya.UIEvent.CLICK, this, function () {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.FB_CaiLiaoFuBen_OneKey, [this.data.index, this.data.grade, this.data.itemid])
				pkt.send();
				this.close();
			})
		}
	}
}