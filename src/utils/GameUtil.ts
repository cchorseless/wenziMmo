module GameUtil {

    /**
     * 查找背包内道具的数量
     * @param itemID 
     * @param bag 
     */
    export function findItemInBag(itemID, bag): number {
        let count = 0;
        let keys = Object.keys(bag);
        for (let _key of keys) {
            let _item: ProtoCmd.ItemBase = bag[_key]
            if (_item.dwBaseID === itemID) {
                count += _item.dwCount;
            }
        }
        return count;
    }

    export function addTipsJianTou(btn: Laya.Button, mode) {
        let tipsJianTou = new view.compart.TipsJianTouItem();
        tipsJianTou.showSelf(PanelManage.JuQingMode.btn_tianJian, 3);
    }

    export const isParse: Boolean = false;
    // opendialog:Main|button:tab_player=3|find:5001=1000=10001|button:btn_renWu|
    export function parseTaskInfo(str: string) {
        if (this.isParse) {
            return
        }
        this.isParse = true;
        console.log('解析任务描述', str);
        let handleList = str.split('|');
        let toDoList = {};
        for (let singleHandle of handleList) {
            let singlehandleList = singleHandle.split(':');
            let key = singlehandleList[0];
            let info = singlehandleList[1];
            switch (key) {
                // 打开界面
                case 'opendialog':
                    switch (info) {
                        // 天鉴界面
                        case 'TianJian':
                            toDoList = { JuQingMode: ['btn_changeMode'], Main: ['btn_jueSe'], JueSe: ['tab_player=3', 'ui_jingLuo=btn_lvUp'], endPanel: 'JueSe' };
                            break;
                        // 阅读小说界面
                        case 'JuQingMode':
                            toDoList = { Main: ['btn_modeChange'], JuQingMode: [], end: 'JuQingMode' };
                            break;
                    }
                    break;

                // 地图ID
                case 'find':
                    toDoList[toDoList['endPanel']].push('find=' + info);
                    break;
                // 使用物品
                case 'use':
                    toDoList[toDoList['endPanel']].push('use=' + info);
                    break;
                // 按钮
                case 'button':
                    toDoList[toDoList['endPanel']].push(info);

                    break;
            }
        }
        // 循环函数
        let loopFunc = () => {
            let curName = PopUpManager.curPanel.name;
            if (curName && toDoList[curName]) {
                let btn_name: string = (toDoList[curName] as Array<any>).shift()
                if (btn_name) {
                    let btn;
                    // 界面内tab || ui_item || 查找NPC
                    if (btn_name.indexOf('=') != -1) {
                        let list = btn_name.split('=');
                        let biaoZhi = list[0];
                        let spr = PopUpManager.curPanel[biaoZhi];

                        // tab
                        if (biaoZhi.indexOf('tab') != -1) {
                            btn = spr.items[parseInt(list[1])];
                        }

                        // ui_item
                        else if (biaoZhi.indexOf('ui') != -1) {
                            btn = spr[list[1]];
                        }

                        // 查找NPC和怪物
                        else if (biaoZhi == 'find') {
                            let mapid = parseInt(list[1]);
                            let roomid = list[2];
                            let npcid = list[3];
                            // 同一张地图的情况
                            if (GameApp.MainPlayer.location.mapid == mapid) {
                                btn = PanelManage.Main.btn_mapBig;
                                // 地图内按钮
                                GameUtil.addEffectButton(PanelManage.Main.ui_mainDownMapItem.findRoomButton(roomid));
                            }
                        }

                        // 查找道具
                        else if (biaoZhi == 'use') {
                            // 背包内道具
                            let allObjitem = Object.keys(GameApp.GameEngine.bagItemDB)
                            for (let i = 1; i < list.length; i++) {
                                for (let key of allObjitem) {
                                    let _item: ProtoCmd.ItemBase = GameApp.GameEngine.bagItemDB[key];
                                    if (list.indexOf('' + _item.dwBaseID) != -1) {
                                        GameUtil.addEffectButton(_item.ui_item);
                                    }

                                }
                            }
                        }
                    }
                    // 界面内按钮
                    else {
                        btn = PopUpManager.curPanel[btn_name]
                    }
                    btn && GameUtil.addEffectButton(btn);
                }
            }
            if (curName == toDoList['endPanel'] && toDoList[curName].length == 0) {
                this.isParse = false;
                Laya.timer.clearAll(this);
                console.log('引导完成');
            }
        }
        Laya.timer.frameLoop(20, this, loopFunc);
        loopFunc();

    }

    /**
     * 给按钮添加特效
     * @param btn 
     */
    export function addEffectButton(btn) {
        EffectUtils.playScaleEffect(btn, 200, 2);
        btn.filters = [new Laya.GlowFilter('#4af608', 50)];
        // 按钮添加监听
        btn.once(Laya.UIEvent.CLICK, this, () => {
            btn.filters = [];
        });

    }
}