module GameUtil {

    /**
     * 查找背包内道具的数量
     * @param itemID 
     * @param bag 
     */
    export function findItemInBag(itemID: number, bag): number {
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
    * 查找背包内道具信息
    * @param itemID 
    * @param bag 
    */
    export function findItemInfoInBag(itemID, bag): ProtoCmd.ItemBase {
        let keys = Object.keys(bag);
        for (let _key of keys) {
            let _item: ProtoCmd.ItemBase = bag[_key]
            if (_item.dwBaseID === itemID) {
                return _item
            }
        }
    }

    /**
     * 根据等级查找背包内大于这个等级的所有装备
     * @param itemID 
     * @param bag 
     */
    export function findItemInfoInBagByLevel(level: number, bag = GameApp.GameEngine.bagItemDB): any {
        let itemArray = [];
        for (let i in bag) {
            let zslevel = SheetConfig.mydb_item_base_tbl.getInstance(null).ZS_LEVEL('' + bag[i].dwBaseID);
            let nowlevel = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMLVNEED('' + bag[i].dwBaseID);
            let lvlnum = zslevel * 1000 + nowlevel;
            if (bag[i].itemType == 2 && lvlnum == level) {
                itemArray.push(bag[i]);
            }
        }
        return itemArray;
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

    /**
     * 查找背包的符文
     */
    export function findFuWenInBag(): Array<ProtoCmd.ItemBase> {
        let bag = GameApp.GameEngine.bagItemDB;
        let keys = Object.keys(bag);
        let result = [];
        for (let key of keys) {
            let _itemBase: ProtoCmd.ItemBase = bag[key];
            let position = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMPOSITION('' + _itemBase.dwBaseID);
            let type = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMTYPE('' + _itemBase.dwBaseID);
            if (type == EnumData.ItemTypeDef.ITEM_TYPE_EQUIP && position >= EnumData.emEquipPosition.EQUIP_RUNE_UP && position <= EnumData.emEquipPosition.EQUIP_RUNE_UPLEFT) {
                result.push(_itemBase);
            }
        }
        return result;
    }
    /**
     * 战力变化效果
     * @param label 显示战力数值的label
     * @param battleNum 变化前战力
     * @param afterBattle 变化后战力
     */
    export function battleChange(label: Laya.Label = undefined, battleNum: number, afterBattle: number, dialog): any {
        if (label) {
            let isClose = false;
            //原战力和变化后数值拆分成数组
            //战力不变
            let nowValue = battleNum;
            let now = String(nowValue).split('');
            let power = afterBattle;
            let after = String(power).split('');
            let surplus = '';
            if (after.length > now.length) {
                let cha = after.length - now.length;
                for (let j = 0; j < cha; j++) {
                    surplus = surplus + '' + after[j]
                }
            }
            let i = 0;
            Laya.timer.clearAll(this);
            Laya.timer.loop(100, this, () => {
                //限制循环
                if (i != now.length) {
                    //战力增加
                    if (power > nowValue) {
                        let cha1 = after.length - now.length;
                        if (parseInt(after[i + cha1]) > parseInt(now[i])) {
                            now[i] = '' + (parseInt(now[i]) + 1);
                        }
                        if (parseInt(after[i + cha1]) < parseInt(now[i])) {
                            now[i] = '' + ((parseInt(now[i]) + 1) % 10);
                        }
                        if (parseInt(after[i + cha1]) == parseInt(now[i])) {
                            i += 1
                        }
                        let battleData = surplus;
                        for (let single of now) {
                            battleData = battleData + single;
                        }
                        if (label.text) {
                            label.text = (battleData);
                        }
                    }
                    //战力减少
                    if (power < nowValue) {
                        let cha2 = now.length - after.length;
                        if (after[(i - cha2)]) {
                            if (parseInt(after[i - cha2]) > parseInt(now[i])) {
                                if ((parseInt(now[i]) > 0)) {
                                    now[i] = '' + (parseInt(now[i]) - 1);
                                } else {
                                    now[i] = '9';
                                }
                            }
                            if (parseInt(after[i - cha2]) < parseInt(now[i])) {
                                now[i] = '' + (parseInt(now[i]) - 1);
                            }
                            if (parseInt(after[i - cha2]) == parseInt(now[i])) {
                                i += 1
                            }
                        } else {
                            if ((parseInt(now[i]) > 0)) {
                                now[i] = '' + (parseInt(now[i]) - 1);
                            } else {
                                i += 1;
                            }
                        }
                        let battleData = 0;
                        for (let index in now) {
                            let beishu = Math.pow(10, (now.length - parseInt(index) - 1));
                            battleData = battleData + parseInt(now[index]) * beishu;
                        }
                        label.text = '' + battleData;
                    }

                } else {
                    Laya.timer.clearAll(this);
                    isClose = true;
                }
                if (isClose) {
                    dialog.close();
                }
            });
        }
    }

    /**
     * 把数字转换成汉字  同理可转换成繁体汉字
     * @param num  数字 
     * @param type  简体0  繁体1
     */
    export function SectionToChinese(num: number, type: number) {
        var chnNumChar = [["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"], ["零", "壹", "贰", "叁", "肆", "伍", "柒", "捌", "玖"]][type];
        var chnUnitChar = [["", "十", "百", "千", "万", "亿", "万亿", "亿亿"], ["", "拾", "佰", "仟", "萬", "億"]][type];
        var strIns = '', chnStr = '';
        var unitPos = 0;
        var zero = true;
        while (num > 0) {
            var v = num % 10;
            if (v === 0) {
                if (!zero) {
                    zero = true;
                    chnStr = chnNumChar[v] + chnStr;
                }
            } else {
                zero = false;
                strIns = chnNumChar[v];
                strIns += chnUnitChar[unitPos];
                chnStr = strIns + chnStr;
            }
            unitPos++;
            num = Math.floor(num / 10);
        }
        return chnStr;
    }

    /**
     * 显示倒计时
     * @param second 时间戳
     * @param ui 需要显示的html组件
     */
    export function timeCountDown(second: number, ui: laya.html.dom.HTMLDivElement): void {
        if (second >= 60) {
            let aa = TimeUtils.getFormatBySecond(second, 6)
            ui.style.align = "center";
            ui.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>剩余时间：</span>"
                + "<span style='color:#a53232;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>" + aa + "</span>";
        }
        else {
            ui.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>已过期</span>"
            return;
        }


        Laya.timer.loop(60000, ui, round);
        function round() {
            second -= 60;
            if (second >= 60) {
                let time = TimeUtils.getFormatBySecond(second, 6)
                ui.style.align = "center";
                ui.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>剩余时间：</span>"
                    + "<span style='color:#a53232;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + time + "</span>";
            }
            else {
                ui.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>已过期</span>"
                Laya.timer.clear(ui, round)
            }
        }
    }

    const keyMap = {
        // 攻击
        3: { key: '3_4', label: '攻击:' },
        4: { key: '3_4', label: '攻击:' },
        // 物理攻击
        5: { key: '5_6', label: '力道:' },
        6: { key: '5_6', label: '力道:' },
        // 灵巧攻击
        7: { key: '7_8', label: '柔劲:' },
        8: { key: '7_8', label: '柔劲:' },
        // 灵魂攻击
        9: { key: '9_10', label: '刚劲:' },
        10: { key: '9_10', label: '刚劲:' },
        // 物理防御
        11: { key: '11_12', label: '卸力:' },
        12: { key: '11_12', label: '卸力:' },
        // 法术防御
        13: { key: '13_14', label: '化劲:' },
        14: { key: '13_14', label: '化劲:' },
    }
    const richProps: richLabProps = { color: "#00ff00", bold: true };//富文本格式
    /**
     * 解析效果ID，返回数组描述
     * @param effectID 
     */
    export function parseEffectidToObj(effectList: Array<string>): { des: Array<ProtoCmd.EffectIDStruct>, battle: Array<number> } {
        let ObjList = [];// 描述
        let ObjListMap = {};
        let r0 = 0; // 战力
        let r1 = 0; // 战力
        let r2 = 0; // 战力

        for (let effectID of effectList) {
            let sheetInfo = SheetConfig.mydb_effect_base_tbl.getInstance(null).data[effectID];
            if (sheetInfo) {
                let startIndex = 3;
                let length = sheetInfo.length - startIndex;
                let tmpDes = {};
                for (let i = 0; i < length; i++) {
                    let dataIndex = i + startIndex;
                    // 类型枚举
                    let desIndex = i + 1;
                    // 数据
                    let data = sheetInfo[dataIndex];
                    if (data != 0) {
                        let des = LangConfig.emNonpareilTypeDes[EnumData.emNonpareilType[desIndex]];
                        let obj = new ProtoCmd.EffectIDStruct();
                        if (desIndex >= EnumData.emNonpareilType.NONPAREIL_TYPE_MAXATK && desIndex <= EnumData.emNonpareilType.NONPAREIL_TYPE_MINMAC) {
                            // 标记有两个值
                            obj.onlyValue = false;
                            let key = keyMap[desIndex].key;
                            let old_obj = tmpDes[key];
                            if (old_obj) {
                                old_obj.finish = true;
                                obj = old_obj;
                            }
                            else {
                                obj.finish = false;
                                obj.value = data;
                                obj.label = keyMap[desIndex].label;
                            }
                            obj.min = Math.min(obj.value, data);
                            obj.max = Math.max(obj.value, data);
                            obj.des = obj.label + GameApp.DomUtil.changeToRichStr(obj.min, richProps) + '-' + GameApp.DomUtil.changeToRichStr(obj.max, richProps);
                            obj.index = key;
                            tmpDes[key] = obj;
                        }
                        else {
                            obj.index = desIndex;
                            obj.label = des;
                            obj.value = data;
                            obj.des = des + ' ' + GameApp.DomUtil.changeToRichStr(data, richProps);
                        };
                        if (obj.finish) {
                            let tmpObj = ObjListMap[obj.index];
                            // 合并对象
                            if (tmpObj) {
                                tmpObj.min += obj.min;
                                tmpObj.max += obj.max;
                                tmpObj.value += obj.value;
                                if (tmpObj.onlyValue) {
                                    tmpObj.des = tmpObj.label + GameApp.DomUtil.changeToRichStr(tmpObj.value, richProps);
                                }
                                else {
                                    tmpObj.des = tmpObj.label + GameApp.DomUtil.changeToRichStr(tmpObj.min, richProps)
                                        + '-' + GameApp.DomUtil.changeToRichStr(tmpObj.max, richProps);
                                }

                            }
                            // 没有添加对象
                            else {
                                ObjList.push(obj);
                                ObjListMap[obj.index] = obj;
                            }
                        }
                        // 战力计算
                        let tmp = GameObject.AbilityWorth[desIndex];
                        r0 += tmp[0] * data;
                        r1 += tmp[1] * data;
                        r2 += tmp[2] * data;
                    }
                }
            }
        }

        // 战力 ： 通用战力 战士战力 道士战力 法师战力
        let battleDes = [Math.ceil((r0 + r1 + r2) / 3), Math.ceil(r0), Math.ceil(r1), Math.ceil(r2)];
        return { des: ObjList, battle: battleDes }

    }


    /**
     * 计算极品属性
     * @param Nonpareil 
     */
    export function parseNonpareilToObj(NonpareilList: Array<ProtoCmd.Nonpareil>): Array<ProtoCmd.EffectIDStruct> {
        let ObjList: Array<ProtoCmd.EffectIDStruct> = [];// 描述
        let ObjListMap = {};
        let tmpDes = {};
        for (let _nonpare of NonpareilList) {
            let data = _nonpare.dwNpNum;
            let desIndex = _nonpare.btNpType;
            if (data) {
                let des = LangConfig.emNonpareilTypeDes[EnumData.emNonpareilType[desIndex]];
                let obj = new ProtoCmd.EffectIDStruct();
                if (desIndex >= EnumData.emNonpareilType.NONPAREIL_TYPE_MAXATK && desIndex <= EnumData.emNonpareilType.NONPAREIL_TYPE_MINMAC) {
                    // 标记有两个值
                    obj.onlyValue = false;
                    let key = keyMap[desIndex].key;
                    let old_obj = tmpDes[key];
                    if (old_obj) {
                        old_obj.finish = true;
                        obj = old_obj;
                    }
                    else {
                        obj.finish = false;
                        obj.value = data;
                        obj.label = keyMap[desIndex].label;
                    }
                    obj.min = Math.min(obj.value, data);
                    obj.max = Math.max(obj.value, data);
                    obj.des = obj.label + GameApp.DomUtil.changeToRichStr(obj.min, richProps) + '-' + GameApp.DomUtil.changeToRichStr(obj.max, richProps);
                    obj.index = key;
                    tmpDes[key] = obj;
                }
                else {
                    obj.index = desIndex;
                    obj.label = des;
                    obj.value = data;
                    obj.des = des + ' ' + GameApp.DomUtil.changeToRichStr(data, richProps);
                };
                if (obj.finish) {
                    let tmpObj = ObjListMap[obj.index];
                    // 合并对象
                    if (tmpObj) {
                        tmpObj.min += obj.min;
                        tmpObj.max += obj.max;
                        tmpObj.value += obj.value;
                        if (tmpObj.onlyValue) {
                            tmpObj.des = tmpObj.label + GameApp.DomUtil.changeToRichStr(tmpObj.value, richProps);
                        }
                        else {
                            tmpObj.des = tmpObj.label + GameApp.DomUtil.changeToRichStr(tmpObj.min, richProps)
                                + '-' + GameApp.DomUtil.changeToRichStr(tmpObj.max, richProps);
                        }
                    }
                    // 没有添加对象
                    else {
                        ObjList.push(obj);
                        ObjListMap[obj.index] = obj;
                    }
                }
            }
        }
        return ObjList
    }


    /**
     * 获取云服务器设置的新手引导数据
     * @param index 
     */
    export function getServerData(index: number): Boolean {
        if (GameApp.GameEngine.questBoolData) {
            return GameApp.GameEngine.questBoolData[index] > 0;
        }
        return false
    }


    /**
     * 设置云服务器的新手引导二进制数据
     * @param index 
     * @param value 
     */
    export function setServerData(index: number) {
        let pkt = new ProtoCmd.QuestClientData();
        pkt.setString(ProtoCmd.playerBubble, [index * 8]);
        lcp.send(pkt);
        // 维护本地数据，玩家上线后会重新
        GameApp.GameEngine.questBoolData[index] = 1;
    }


    /**
     * 任务循环
     * @param toDoList 
     * @param finishHander 
     */
    export function loopFuncTask(toDoList, finishHander = null) {
        let curName = PopUpManager.curPanelAndDialog().name;
        let curPanel = PopUpManager.curPanelAndDialog();
        if (curName == 'Main') {
            if (PanelManage.Main.view_scene.selectedIndex == 1) {
                curName = 'JuQingMode';
                curPanel = PanelManage.Main.view_scene.getChildAt(1) as Laya.View;
            }
        }
        if (curName && toDoList[curName]) {
            let btn_name: string = (toDoList[curName] as Array<any>).shift()
            if (btn_name) {
                let btn;
                // 界面内tab || ui_item || 查找NPC
                if (btn_name.indexOf('=') != -1) {
                    let list = btn_name.split('=');
                    let biaoZhi = list[0];
                    let spr = curPanel[biaoZhi];

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
                                // 是否需要导航
                                if (GameApp.GameEngine.smallMapData.left == roomid) {
                                    btn = GameApp.SceneManager.smallMapFindButton('btn_mapLeft');
                                }
                                else if (GameApp.GameEngine.smallMapData.right == roomid) {
                                    btn = GameApp.SceneManager.smallMapFindButton('btn_mapRight')
                                }
                                else if (GameApp.GameEngine.smallMapData.up == roomid) {
                                    btn = GameApp.SceneManager.smallMapFindButton('btn_mapUp')
                                }
                                else if (GameApp.GameEngine.smallMapData.down == roomid) {
                                    btn = GameApp.SceneManager.smallMapFindButton('btn_mapDown')
                                }
                                // 非相邻房间，需要展开地图导航
                                else {
                                    GameUtil.addEffectButton(GameApp.SceneManager.smallMapFindButton('btn_mapBig'));
                                    GameUtil.addEffectButton(GameApp.SceneManager.bigMapfindButton(roomid));
                                }
                            }
                            GameUtil.findNPC(roomid, npcid);
                        }
                        // 其他地图
                        else {
                            GameUtil.addEffectButton(PanelManage.Main.box_uiScene0.getChildAt(0)['btn_worldMap']);
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
                    btn = curPanel[btn_name]
                }
                // 找到了BUTTON
                if (btn) {
                    GameUtil.addEffectButton(btn);
                    // 判断最后一个按钮
                    if (curName == toDoList['endPanel'] && toDoList[curName].length == 0) {
                        btn.once(Laya.UIEvent.CLICK, this, () => {
                            if (finishHander) {
                                finishHander.run()
                            }
                        })
                    }
                }

            }
        }
        // 判断最后一个按钮
        if (curName == toDoList['endPanel'] && toDoList[curName].length == 0) {
            Laya.timer.clear(this, GameUtil.loopFuncTask);
            console.log('引导完成');
        }

    }


    // opendialog:Main|button:tab_player=3|find:5001=1000=10001|button:btn_renWu|
    export function parseTaskInfo(str: string, finishHander: Laya.Handler = null) {
        console.log(str);
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
                        // // 天鉴界面
                        case 'TianJian':
                            toDoList['JuQingMode'] = ['btn_tianjian'];
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
                        // 副本界面
                        case 'FuBen':
                            toDoList['JuQingMode'] = ['btn_fuBen'];
                            toDoList['Main'] = ['btn_changeMode'];
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
        console.log('todoList', toDoList)
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
                btn = GameApp.SceneManager.smallMapFindButton('btn_mapLeft');
            }
            else if (GameApp.GameEngine.smallMapData.right == next_id) {
                btn = GameApp.SceneManager.smallMapFindButton('btn_mapRight');
            }
            else if (GameApp.GameEngine.smallMapData.up == next_id) {
                btn = GameApp.SceneManager.smallMapFindButton('btn_mapUp');
            }
            else if (GameApp.GameEngine.smallMapData.down == next_id) {
                btn = GameApp.SceneManager.smallMapFindButton('btn_mapDown');
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