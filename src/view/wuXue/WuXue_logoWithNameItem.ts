/**Created by the LayaAirIDE*/
module view.wuXue {
    export class WuXue_logoWithNameItem extends ui.wuXue.WuXue_logoWithNameItemUI {
        constructor() {
            super();
        }

        public setData(configID): void {
            this.lbl_name.text =SheetConfig.mydb_magic_tbl.getInstance(null).NAME(configID).split('_')[0];
            this.ui_item.setData(configID);
        }
        
    }
}