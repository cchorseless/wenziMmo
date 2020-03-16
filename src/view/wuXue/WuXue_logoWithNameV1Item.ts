/**Created by the LayaAirIDE*/
module view.wuXue {
    export class WuXue_logoWithNameV1Item extends ui.wuXue.WuXue_logoWithNameV1ItemUI {
        public configID;
        public skillBase;
        public ColorArr = ['', '#4b674b', '#4f5575', '#6e4b70', '#9f6b39', '#8f3535']
        constructor() {
            super();
        }


        public isTouchSkillShow;
        public isOnDrag = false;
        public setData(skillBase: ProtoCmd.stSkillLvlBase) {
            this.configID = skillBase.configID;
            this.skillBase = skillBase;
            this.html_name.visible = true;
            this.ui_item.visible = true;
            this.img_quality.visible = true;
            Log.trace(this.configID, 'WuXue_logoWithNameItem');
            let stage = SheetConfig.mydb_magic_tbl.getInstance(null).LEVEL(this.configID);
            this.html_name.style.align = 'center';
            this.html_name.style.fontFamily = 'STKaiti';
            this.html_name.style.fontSize = 20;

            let quality = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLQUALITY(this.configID);
            if (!quality) {
                quality = 1;
            }
            let name = SheetConfig.mydb_magic_tbl.getInstance(null).NAME(this.configID);
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
            this.img_quality.skin = 'image/common/wuxue/wuxue_quality_' + quality + '.png'
            this.ui_item.setData(this.configID);
            this.addEvent();
        }

        public addEvent() {

            /**
             * 点击
             */
            this.on(Laya.UIEvent.CLICK, this, () => {
                let dialog = new WuXue_InfoDialog();
                dialog.setData(this.skillBase)
                dialog.popup()
            })

            // 拖拽
            this.on(Laya.Event.MOUSE_DOWN, this, (e) => {
                Laya.timer.once(100, this, () => {
                    this.isTouchSkillShow = true;
                    Log.trace('一选择')
                })
            })

            this.on(Laya.Event.MOUSE_MOVE, this, (e: Laya.Event) => {
                if (this.isTouchSkillShow) {
                    this.isTouchSkillShow = false
                    let copyUI = new WuXue_logoWithNameV1Item();
                    copyUI.setData(this.skillBase);
                    copyUI.pos(e.stageX - copyUI.width / 2, e.stageY - copyUI.height / 2);
                    PanelManage.WaiGong.addChild(copyUI);
                    copyUI.startDrag();
                    copyUI.isOnDrag = true;

                }
            })
            this.on(Laya.Event.MOUSE_UP, this, (e) => {
                Log.trace('一抬起');
                if (this.isOnDrag) {
                    this.isOnDrag = false;
                    // this.stopDrag()
                    // 判断是否在目标区域内
                    PanelManage.WaiGong.findCurWuXue_WaiGong_VS_Info().compareHit(this);

                }
            })
        }


    }
}