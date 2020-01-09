/**Created by the LayaAirIDE*/
module view.wuXue {
    export class WuXue_logoWithNameItem extends ui.wuXue.WuXue_logoWithNameItemUI {
        public configID
        constructor() {
            super();
        }

        public setData(configID): void {
            this.configID = configID;
            if (configID == -1) {
                this.lbl_name.visible = false;
                this.ui_item.visible = false;
                return;
            }
            this.lbl_name.visible = true;
            this.ui_item.visible = true;
            this.lbl_name.text = SheetConfig.mydb_magic_tbl.getInstance(null).NAME(configID);
            this.ui_item.setData(configID);
        }

    }
}