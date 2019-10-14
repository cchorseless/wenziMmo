module GameUtil {
    let btn;
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

    /**
     * 查找玩家身上的装备信息
     * @param index 
     */
    export function findEquipInPlayer(index: EnumData.emEquipPosition): ProtoCmd.ItemBase {
        let i64ID = GameApp.GameEngine.equipDBIndex[index];
        if (i64ID) {
            return GameApp.GameEngine.equipDB[i64ID]
        }
    }


    export function addTipsJianTou(btn: Laya.Button, mode) {
        let tipsJianTou = new view.compart.TipsJianTouItem();
        tipsJianTou.showSelf(PanelManage.JuQingMode.btn_tianJian, 3);
    }

    export function loopFuncTask(toDoList, finishHander = null) {
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
                        let roomid = parseInt(list[2]);
                        let npcid = parseInt(list[3]);
                        // 同一张地图的情况
                        if (GameApp.MainPlayer.location.mapid == mapid) {
                            // 不在同一个房间内
                            if (GameApp.MainPlayer.roomId != roomid) {
                                GameUtil.addEffectButton(PanelManage.Main.btn_mapBig);
                                GameUtil.addEffectButton(PanelManage.Main.ui_mainDownMapItem.findRoomButton(roomid));
                            }
                            GameUtil.findNPC(roomid, npcid);
                        }
                        // 其他地图
                        else {
                            GameUtil.addEffectButton(PanelManage.Main.box_uiScene0.getChildAt(0)['btn_worldMap']);
                            TipsManage.showTips('到达地图后继续');
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
            Laya.timer.clear(this, GameUtil.loopFuncTask);
            if (finishHander) {
                finishHander.run()
            }
            console.log('引导完成');
        }
    }

    // opendialog:Main|button:tab_player=3|find:5001=1000=10001|button:btn_renWu|
    export function parseTaskInfo(str: string, finishHander: Laya.Handler = null) {
        let handleList = str.split('|');
        let toDoList = { endPanel: null };
        for (let singleHandle of handleList) {
            let singlehandleList = singleHandle.split(':');
            let key = singlehandleList[0];
            let info = singlehandleList[1];
            switch (key) {
                // 打开界面
                case 'opendialog':
                    toDoList.endPanel = info;
                    toDoList[info] = [];
                    switch (info) {
                        // 主界面
                        case 'Main':
                            toDoList['TaskMain'] = ['btn_changeMode'];
                            toDoList['JuQingMode'] = ['btn_changeMode'];
                            break;
                        // 天鉴界面
                        case 'TianJian':
                            toDoList['JuQingMode'] = ['btn_tianJian'];
                            toDoList['Main'] = ['btn_changeMode'];
                            toDoList['TaskMain'] = ['btn_back'];
                            break;
                        // 阅读小说界面
                        case 'JuQingMode':
                            toDoList['JuQingMode'] = [];
                            toDoList['Main'] = ['btn_changeMode'];
                            toDoList['TaskMain'] = ['btn_back'];
                            break;
                        // 角色界面
                        case 'JueSe':
                            toDoList['JuQingMode'] = ['btn_changeMode'];
                            toDoList['Main'] = ['btn_jueSe'];
                            toDoList['TaskMain'] = ['btn_changeMode'];
                            break;
                        // 武学界面
                        case 'WuXue':

                            break;
                        // 背包界面
                        case 'BeiBao':
                            toDoList['JuQingMode'] = ['btn_changeMode'];
                            toDoList['Main'] = ['btn_wuPin'];
                            toDoList['TaskMain'] = ['btn_back'];
                            break;
                    }
                    break;

                // 地图ID
                case 'find':
                    toDoList[toDoList.endPanel].push('find=' + info);
                    break;
                // 使用物品
                case 'use':
                    toDoList[toDoList.endPanel].push('use=' + info);
                    break;
                // 按钮
                case 'button':
                    toDoList[toDoList.endPanel].push(info);
                    break;
            }
        }
        // 循环函数
        Laya.timer.clear(this, GameUtil.loopFuncTask);
        Laya.timer.frameLoop(20, this, GameUtil.loopFuncTask, [toDoList, finishHander]);
    }

    export function loopFuncFindNPC(roomid, npcid) {
        if (GameApp.MainPlayer.roomId == roomid) {
            // 查找怪物
            let keys = Object.keys(GameApp.MainPlayer.allMonster);
            for (let key of keys) {
                let monster: GameObject.Monster = GameApp.MainPlayer.allMonster[key];
                if (monster.feature.dwCretTypeId == npcid) {
                    GameUtil.addEffectButton(monster.ui_item);
                    Laya.timer.clear(this, this.loopFuncFindNPC);
                    return
                }
            }
            // 查找NPC
            let keys2 = Object.keys(GameApp.MainPlayer.allNpc);
            for (let key2 of keys2) {
                let npc: GameObject.Npc = GameApp.MainPlayer.allNpc[key2];
                if (npc.feature.dwCretTypeId == npcid) {
                    GameUtil.addEffectButton(npc.ui_item);
                    Laya.timer.clear(this, this.loopFuncFindNPC);
                    return
                }
            }
        }

    }
    /**
     * 查找NPC
     * @param roomid 
     * @param npcid 
     */
    export function findNPC(roomid, npcid) {
        Laya.timer.clear(this, GameUtil.loopFuncFindNPC);
        Laya.timer.frameLoop(20, this, GameUtil.loopFuncFindNPC, [roomid, npcid]);
    }

    export function loopFuncMapPath(toDoList: Array<number>) {
        let curRoomID = GameApp.MainPlayer.roomId;
        let index = toDoList.indexOf(curRoomID);
        let btn;
        if (index + 1 < toDoList.length) {
            let next_id = toDoList[index + 1];
            if (GameApp.GameEngine.smallMapData.left == next_id) {
                btn = PanelManage.Main.btn_mapLeft;
            }
            else if (GameApp.GameEngine.smallMapData.right == next_id) {
                btn = PanelManage.Main.btn_mapRight
            }
            else if (GameApp.GameEngine.smallMapData.up == next_id) {
                btn = PanelManage.Main.btn_mapUp
            }
            else if (GameApp.GameEngine.smallMapData.down == next_id) {
                btn = PanelManage.Main.btn_mapDown
            }
            toDoList[index] = null;
            btn && GameUtil.addEffectButton(btn);
        }
        else {
            TipsManage.showTips('到达目的地');
            Laya.timer.clear(this, GameUtil.loopFuncMapPath)
        }
    }

    /**
     * 地图导航
     * @param toDoList 
     */
    export function parseMapPath(toDoList: Array<number>) {
        Laya.timer.clear(this, GameUtil.loopFuncMapPath);
        Laya.timer.frameLoop(20, this, GameUtil.loopFuncMapPath, [toDoList]);
    }

    /**
     * 给按钮添加特效
     * @param btn 
     */
    export function addEffectButton(btn: Laya.Sprite) {
        EffectUtils.playScaleEffect(btn, 200, 2);
        btn.filters = [new Laya.GlowFilter('#4af608', 50)];
        // 按钮添加监听
        btn.once(Laya.UIEvent.CLICK, this, () => {
            btn.filters = null;
        });
    }

    /**
     * 生成地图导航路径
     */
    export class findMapPath {

        constructor(minid, maxid) {
            this.line = {};
            this.res = [];
            this.hasRes = false;

            let mapRoom = SheetConfig.mapRoomSheet.getInstance(null);
            for (let i = minid; i <= maxid; ++i) {
                this.addLine(i, mapRoom.UPID(i.toString()));
                this.addLine(i, mapRoom.DOWNID(i.toString()));
                this.addLine(i, mapRoom.LEFTID(i.toString()));
                this.addLine(i, mapRoom.RIGHTID(i.toString()));
            }
        }

        ///最短路径
        public line = {};//保存所有节点关系
        public res = [];//最短路径结果
        public hasRes = false;//是否 至少有一个可以到达的路径
        /**
         * 添加房间对应关系
         * @param srcID 起始ID
         * @param dstID 相连ID
         */
        private addLine(srcID, dstID) {
            if (dstID > 0) {
                this._addLine(srcID, dstID);
                this._addLine(dstID, srcID);
            }
        }

        private _addLine(srcID, dstID) {
            !this.line[srcID] && (this.line[srcID] = []);
            this.line[srcID].push(dstID);
        }

        /**
         * 返回最短路径
         * @param srcID 起始ID
         * @param dstID 目的ID
         */
        public minPath(srcID, dstID) {
            this.step(this.line[srcID], [srcID], dstID);
            return this.res;
        }

        private step(adjacentNodes, tempRes, dstID) {
            //当前节点没有相邻节点
            if (!adjacentNodes) {
                return;
            }
            //存在可以到达的路径，并且比正在探测的路径短则直接退出探测
            if (this.hasRes && this.res.length < tempRes.length) {
                return;
            }
            adjacentNodes.forEach(item => {
                //当前探测的点已经走过了，不再重复走
                if (tempRes.indexOf(item) !== -1) {
                    return;
                }
                let newTempRes = tempRes.concat(item);
                //到达终点
                if (item === dstID) {
                    if (this.hasRes) {
                        if (newTempRes.length < this.res.length) {
                            //已有最短路径，且比当前路径更短，替换
                            this.res = newTempRes;
                        }
                    } else {
                        //目前没有最短路径，替换
                        this.res = newTempRes;
                        this.hasRes = true;
                    }
                } else {
                    this.step(this.line[item], newTempRes, dstID);
                }
            });
        }
    }
}