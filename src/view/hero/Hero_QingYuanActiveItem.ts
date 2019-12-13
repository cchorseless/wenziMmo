/**Created by the LayaAirIDE*/
module view.hero {
    export class Hero_QingYuanActiveItem extends ui.hero.Hero_QingYuanActiveItemUI {
        constructor() {
            super();
        }
        public num;
        public setData(data, labels): Hero_QingYuanActiveItem {
            if (data) {
                this.view_activeRune.selectedIndex=1;
                this.num = data.btNpFrom - 11;
                let label = labels.split('上');
                if (label[1]) {
                    this.lbl_name.text = label[0] + ':';

                } else {
                    let label1 = labels.split(':');
                    this.lbl_name.text = label1[0] + ':';
                }
                this.lbl_des.text = '' + data.dwNpNum;
            }
            return this;
        }
    }
}