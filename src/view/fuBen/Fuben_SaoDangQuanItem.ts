/**Created by the LayaAirIDE*/
module view.fuBen {
	export class Fuben_SaoDangQuanItem extends ui.fuBen.Fuben_SaoDangQuanItemUI {
		constructor() {
			super();
		}
		public saodangDialog;
		public beishu;
		public id;
		/**
		 * 
		 * @param id 扫荡所需物品id
		 * @param beishu 扫荡倍数
		 * @param saodangdialog 扫荡弹窗
		 */
		public setData(id, beishu: number, saodangdialog): Fuben_SaoDangQuanItem {
			this.id=id;
			this.beishu = beishu;
			this.saodangDialog = saodangdialog;
			let itemInfo = new ProtoCmd.ItemBase();
			itemInfo.dwBaseID = id;
			this.ui_item.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL);
			//扫荡券倍数
			this.lbl_name.text = GameUtil.SectionToChinese(beishu, 0) + '倍扫荡券';
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			//选择扫荡券
			this.btn_select.on(Laya.UIEvent.CLICK, this, () => {
				this.btn_select.selected = !this.btn_select.selected;
				let itemArray = this.saodangDialog.hbox_quan._childs;
				if (this.btn_select.selected) {
					for (let item of itemArray) {
						if (item.beishu == this.beishu) {
							item.btn_select.selected = true;
						} else {
							item.btn_select.selected = false;
						}
					}
				}
			})
		}
	}
}