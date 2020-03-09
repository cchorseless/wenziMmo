/**Created by the LayaAirIDE*/
module view.wuXue {
    export class WuXue_logoWithNameItem extends ui.wuXue.WuXue_logoWithNameItemUI {
        public configID;
        public ColorArr = ['', '#4b674b', '#4f5575', '#6e4b70', '#9f6b39', '#8f3535']
        constructor() {
            super();
        }
        public setInit(){
            this.img_quality.skin = '';
            this.html_name.innerHTML = '';
            this.ui_item.init()

        }

        public setData(configID): WuXue_logoWithNameItem {
            this.configID = configID;
            if (configID == -1) {
                this.html_name.visible = false;
                this.ui_item.visible = false;
                this.img_quality.visible = false;
                return;
            }
            this.html_name.visible = true;
            this.ui_item.visible = true;
            this.img_quality.visible = true;


            let stage = SheetConfig.mydb_magic_tbl.getInstance(null).LEVEL(configID);
            this.html_name.style.align = 'center';
            this.html_name.style.fontFamily = 'STKaiti';
            this.html_name.style.fontSize = 20;

            let quality = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLQUALITY(configID);
            if (!quality) {
                quality = 1;
            }
            let name = SheetConfig.mydb_magic_tbl.getInstance(null).NAME(configID);
            name = name.split('_')[0];
            switch (quality) {
                case 1:
                    if ((stage - 1) == 0) {
                        this.html_name.innerHTML = "<span style='color:#4b674b;'>" + name + "</span>"
                    } else {
                        this.html_name.innerHTML = "<span style='color:#4b674b;'>" + name + "</span>"
                            + "<span style='color:#ffffff;stroke:2.5;strokeColor:#4b674b'>+" + (stage - 1) + "</span>"
                    }
                    break;
                case 2:
                    if ((stage - 1) == 0) {
                        this.html_name.innerHTML = "<span style='color:#4f5575;'>" + name + "</span>"
                    } else {
                        this.html_name.innerHTML = "<span style='color:#4f5575;'>" + name + "</span>"
                            + "<span style='color:#ffffff;stroke:2.5;strokeColor:#4f5575'>+" + (stage - 1) + "</span>"
                    }
                    break;
                case 3:
                    if ((stage - 1) == 0) {
                        this.html_name.innerHTML = "<span style='color:#6e4b70;'>" + name + "</span>"
                    } else {
                        this.html_name.innerHTML = "<span style='color:#6e4b70;'>" + name + "</span>"
                            + "<span style='color:#ffffff;stroke:2.5;strokeColor:#6e4b70'>+" + (stage - 1) + "</span>"
                    }
                    break;
                case 4:
                    if ((stage - 1) == 0) {
                        this.html_name.innerHTML = "<span style='color:#9f6b39;'>" + name + "</span>"
                    } else {
                        this.html_name.innerHTML = "<span style='color:#9f6b39;'>" + name + "</span>"
                            + "<span style='color:#ffffff;stroke:2.5;strokeColor:#9f6b39'>+" + (stage - 1) + "</span>"
                    }
                    break;
                case 5:
                    if ((stage - 1) == 0) {
                        this.html_name.innerHTML = "<span style='color:#8f3535;'>" + name + "</span>"
                    } else {
                        this.html_name.innerHTML = "<span style='color:#8f3535;'>" + name + "</span>"
                            + "<span style='color:#ffffff;stroke:2.5;strokeColor:#8f3535'>+" + (stage - 1) + "</span>"
                    }
                    break;
            }
            // this.lbl_name.color = ''

            this.img_quality.skin = 'image/common/wuxue/wuxue_quality_' + quality + '.png'
            this.ui_item.setData(configID);
        }

    }
}