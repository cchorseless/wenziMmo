/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_WuXueBaseItem extends ui.juese.Person_WuXueBaseItemUI {
		constructor() {
			super();
			this.addEvent();
		}
		public data: ProtoCmd.ItemBase;
		public dialog: view.juese.Person_WuXueBaseDialog;
		public setData(data: ProtoCmd.ItemBase, dialog): Person_WuXueBaseItem {
			this.data = data;
			this.dialog = dialog;
			this.init_wuxueBase();
			
			return this;
		}
		public addEvent(): void {
			this.on(Laya.UIEvent.CLICK, this, () => {
				this.dialog.init_selectEvent(this.data)
			})
		}
		public init_wuxueBase(): void {
			let itemInfo=new ProtoCmd.ItemBase();
			itemInfo.clone(this.data.data);
			this.ui_item.setData(itemInfo)
			this.lbl_lvl.text = 'Lv.' + this.data.dwLevel;
			this.img_select.visible = false;
		}
	}
}