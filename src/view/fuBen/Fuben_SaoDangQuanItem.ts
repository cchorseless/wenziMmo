/**Created by the LayaAirIDE*/
module view.fuBen {
	export class Fuben_SaoDangQuanItem extends ui.fuBen.Fuben_SaoDangQuanItemUI {
		constructor() {
			super();
		}
		//扫荡弹窗
		public saodangDialog;
		//扫荡倍数
		public beishu;
		//物品id
		public id;
		//背包里当前扫荡券的数量
		public num;
		/**
		 * 
		 * @param id 扫荡所需物品id
		 * @param beishu 扫荡倍数
		 * @param saodangdialog 扫荡弹窗
		 */
		public setData(id, beishu: number, saodangdialog): Fuben_SaoDangQuanItem {
			this.id = id;
			this.beishu = beishu;
			this.saodangDialog = saodangdialog;
			let num = GameUtil.findItemInBag(parseInt(id));
			this.num = num;
			let itemInfo = new ProtoCmd.ItemBase();
			itemInfo.dwBaseID = id;
			if (num > 0) {
				itemInfo.dwCount = num;
				this.ui_item.setData(itemInfo);
			} else {
				this.ui_item.img_cantWear.visible = true;
				this.ui_item.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL)
			};
			//扫荡券倍数
			this.lbl_name.text = GameUtil.SectionToChinese(beishu, 0) + '倍扫荡券';
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			//选择扫荡券
			this.btn_select.on(Laya.UIEvent.CLICK, this, () => {
				//背包里数量大于0才可选择
				if (this.num > 0) {
					this.btn_select.selected = !this.btn_select.selected;
					this.ui_item.img_onself.visible = this.btn_select.selected;
					let itemArray = this.saodangDialog.hbox_quan._childs;
					if (this.btn_select.selected) {
						for (let item of itemArray) {
							if (item.beishu == this.beishu) {
								item.ui_item.img_onself.visible = item.btn_select.selected = true;
							} else {
								item.ui_item.img_onself.visible = item.btn_select.selected = false;
							}
						}
					}
				}
			})
		}
	}
}