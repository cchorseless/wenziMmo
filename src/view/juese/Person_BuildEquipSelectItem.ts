/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_BuildEquipSelectItem extends ui.juese.Person_BuildEquipSelectItemUI {
		constructor() {
			super();
		}
		//装备数据
		public data;
		//装备索引
		public num;
		public setData(data,num): Person_BuildEquipSelectItem {
			this.data = data;
			//装备索引
			this.num=num;
			//装备显示
			if (data.dwBaseID) {
				let itemInfo = new ProtoCmd.ItemBase();
				itemInfo.dwBaseID = data.dwBaseID;
				itemInfo.dwBinding = data.dwBinding;
				itemInfo.dwCount = data.dwCount;
				this.ui_item.setData(itemInfo);
				this.ui_item.img_item.visible = true;
				this.ui_item.lbl_count.visible = true;
				this.btn_select.visible = true;
			} else {
				this.ui_item.img_item.visible = false;
				this.ui_item.lbl_count.visible = false;
				this.btn_select.visible = false;
			}
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			//选中状态
			this.btn_select.on(Laya.UIEvent.CLICK, this, () => {
				this.btn_select.selected = !this.btn_select.selected;
				GameApp.LListener.event(ProtoCmd.JS_updateBuildEquipItem, [this.data, 0,this.btn_select.selected,this.num]);
			})
		}
		public destroy(isbool): void {
			GameApp.LListener.offCaller(ProtoCmd.JS_updateBuildEquipItem, this);
			super.destroy(isbool);
		}
	}
}