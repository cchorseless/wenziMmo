/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_SaoDang_Dialog extends ui.fuBen.FuBen_SaoDang_DialogUI {
		public index;
		public difficult;
		constructor() {
			super();
		}
		public setData(data: ProtoCmd.itf_FB_ZiYuanOneInfo, difficult, index) {
			this.difficult = difficult;
			this.index = index;
			let keys = Object.keys(data.jiangli);
			this.lbl_now.text = PanelManage.FuBenRes.now;
			this.lbl_max.text = '/'+PanelManage.FuBenRes.max;
			this.lbl_max.x=this.lbl_now.x+this.lbl_now.width;
			this.hbox_jiangli.removeChildren();
			for (let key of keys) {
				let _itemData = new ProtoCmd.ItemBase();
				_itemData.dwBaseID = data.jiangli[key].index;
				_itemData.dwCount = Math.ceil(data.jiangli[key].num * ((difficult - 1) * 0.2 + 1));
				let _itemUI = new view.compart.DaoJuWithNameItem();
				_itemUI.setData(_itemData, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				this.hbox_jiangli.addChild(_itemUI);
			};
			this.hbox_quan.removeChildren();
			for (let index in data.need) {
				this.hbox_quan.addChild(new view.fuBen.Fuben_SaoDangQuanItem().setData(index, data.need[index], this))
			}
			this.addEvent();
		}
		public addEvent() {
			this.btn_confirm.on(Laya.UIEvent.CLICK, this, () => {
				let id;
				for (let item of this.hbox_quan._childs) {
					if (item.btn_select.selected) {
						id = item.id;
					}
				}
				if (id) {
					let pkt = new ProtoCmd.QuestClientData();
					pkt.setString(ProtoCmd.FB_CaiLiaoFuBen_OneKey, [this.index, this.difficult, id])
					pkt.send();
					this.close();
				} else {
					TipsManage.showTips('请选择扫荡券')
				}
			})
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}