/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_Get_Cookie_Dialog extends ui.wuXue.WuXue_Get_Cookie_DialogUI {
		constructor() {
			super();
			this.panel_show.vScrollBarSkin = '';
			this.vbox_show['sortItem'] = (items)=>{};
			this.addEvent();
		}
		public setData(configID) {

			this.lab_name.text = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(configID);
			let skillID = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMLVUPID(configID);
			let skillConfigID = parseInt(skillID) * 100 + 1;
			let skillType = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLTYPE(skillConfigID);
			if (skillType == 1) {
				this.lab_type.text = '外功';
			} else if (skillType == 4) {
				this.lab_type.text = '内功';
			}
			this.img_bg.skin = "image/common/daoju/quality_5.png";
			this.img_icon.skin = 'image/common/daoju/itemicon_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID(configID) + '.png';
			let getFrom = SheetConfig.mydb_item_base_tbl.getInstance(null).ACCESS_WAY(configID);
			let getFromArr = getFrom.split('|');
			for(let i =0;i<getFromArr.length;i++){
				let o = new WuXue_Get_Cookie_info();
				o.setData(getFromArr[i]);
				this.vbox_show.addChild(o);
			}
		}
		public addEvent(){
			this.btn_close.on(Laya.UIEvent.CLICK,this,function(){
				this.close();
			})
		}
	}
}