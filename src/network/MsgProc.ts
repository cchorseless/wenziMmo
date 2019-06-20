/**
 * 服务器协议监听
 */

class MsgProc extends BaseClass {

    public constructor() {
        super();
    }
    /**
     * 添加服务器全局监听事件
     */
    public init(): void {
        // 心跳包检测
        App.LListener.on(Packet.msgIdToEventName(CheckSignalCmd.msgID), this, this.checkSignalCmd);
        // socket链接
        App.LListener.on(SocketConst.SOCKET_CONNECT, this, this.onSocketConnect);
        // 更新本地密匙
        App.LListener.on(Packet.msgIdToEventName(UpdateToken.msgID), this, this.updateToken);

        //*****************************同步视野内对象
        App.LListener.on(Packet.msgIdToEventName(PlayerChangeMap.msgID), this, this.playerChangeMap);
        App.LListener.on(Packet.msgIdToEventName(MapCreateCret.msgID), this, this.mapCreateCret);
        App.LListener.on(Packet.msgIdToEventName(MapRemoveCret.msgID), this, this.mapRemoveCret);
        App.LListener.on(Packet.msgIdToEventName(MapCreatePlayer.msgID), this, this.mapCreatePlayer);

        //0x021F
        App.LListener.on(Packet.msgIdToEventName(CretMoveRet.msgID), this, this.cretMoveRet);
        //0x0232
        App.LListener.on(Packet.msgIdToEventName(CretAttackRet.msgID), this, this.cretAttackRet);
        //0x0234
        App.LListener.on(Packet.msgIdToEventName(CretHealthChange.msgID), this, this.cretHealthChange);
        //0x023-
        App.LListener.on(Packet.msgIdToEventName(CretGoldChange.msgID), this, this.cretGoldChange);
        App.LListener.on(Packet.msgIdToEventName(CretExpChange.msgID), this, this.cretExpChange);
        App.LListener.on(Packet.msgIdToEventName(CretLevelUp.msgID), this, this.cretLevelUp);
        App.LListener.on(Packet.msgIdToEventName(CretChat.msgID), this, this.cretChat);
        App.LListener.on(Packet.msgIdToEventName(CretAbility.msgID), this, this.cretAbility);
        App.LListener.on(Packet.msgIdToEventName(CretCharBase.msgID), this, this.cretCharBase);
        App.LListener.on(Packet.msgIdToEventName(CretLifestateChange.msgID), this, this.cretLifestateChange);
        App.LListener.on(Packet.msgIdToEventName(TipMsg.msgID), this, this.tipMsg);
        App.LListener.on(Packet.msgIdToEventName(CretGetUseItemRet.msgID), this, this.cretGetUseItemRet);
        //0x0297
        App.LListener.on(Packet.msgIdToEventName(CretStruck.msgID), this, this.cretStruck);
        App.LListener.on(Packet.msgIdToEventName(MapItemEventDel.msgID), this, this.mapItemEventDel);
        App.LListener.on(Packet.msgIdToEventName(MapItemEventAdd.msgID), this, this.mapItemEventAdd);
        App.LListener.on(Packet.msgIdToEventName(MapItemEventPick.msgID), this, this.mapItemEventPick);

        //0x03 背包相关
        // 删除背包道具
        App.LListener.on(Packet.msgIdToEventName(CretDeleteItem.msgID), this, this.cretDeleteItem);
        // 更新背包道具
        App.LListener.on(Packet.msgIdToEventName(CretUpdateItem.msgID), this, this.cretUpdateItem);
        // 初始化背包信息
        App.LListener.on(Packet.msgIdToEventName(CretItems.msgID), this, this.initBag);

        App.LListener.on(Packet.msgIdToEventName(CretItemCountChanged.msgID), this, this.cretItemCountChanged);
        App.LListener.on(Packet.msgIdToEventName(CretProcessingItem.msgID), this, this.cretProcessingItem);
        App.LListener.on(Packet.msgIdToEventName(CretForsakeItem.msgID), this, this.cretForsakeItem);
        //0x0919
        App.LListener.on(Packet.msgIdToEventName(QuestScriptData.msgID), this, this.questScriptData);
    }

    /**
    * 心跳包
    * @param data 
    */
    public checkSignalCmd(data: any): void {
        let checksignal = new CheckSignalCmd(data);
        if (checksignal.getValue('isneedACK') != 0) {
            let signal = new CheckSignalCmdRet();
            signal.setValue('checknum', checksignal.getValue('checknum'))
            signal.send();
            signal = null;
        }

        if (checksignal.getValue('checknum') == 66) {
            App.Socket.waitSignal = false;
            App.Socket.waitTime = 0;
        }
    }

    /**
     * socket链接
     */
    public onSocketConnect() {
        // 断线重连
        if (App.GameEngine.isLogin) {
            TipsManage.showTxt('正在重连');
            this.onSocketReconnect();
        }
        else {
            TipsManage.showTxt('SOCKET 初始化成功,可以登录');
        }
    }

    /**
     * 断线重连
     */
    public onSocketReconnect() {
        let realLogin = new UserRealLogin();
        realLogin.setValue('szAccount', App.GameEngine.mainPlayer.playerAccount);
        realLogin.setValue('szPlayerName', App.GameEngine.mainPlayer.playerName);
        realLogin.setValue('dwTrueZoneid', App.GameEngine.trueZoneid);
        realLogin.setValue('dwUserOnlyId', App.GameEngine.mainPlayer.userOnlyid);
        //realLogin.setValue('btReloginType', 2);
        realLogin.setValue('loginsvr_id_type', App.GameEngine.loginsvrIdType);
        realLogin.setValue('tokencheck', App.GameEngine.tokenCheck);
        realLogin.setValue('gamesvr_id_type', App.GameEngine.gamesvrIdType);
        realLogin.setValue('logintoken', App.GameEngine.logintoken);
        // 正式进入游戏
        lcp.send(realLogin, this, this.userRealLogin);
    }

    /**
     * 更新本地密匙
     * @param data 
     */
    public updateToken(data: any): void {
        let msgData = new UpdateToken(data);
        let tmp = msgData.getValue('logintoken');
        // App.GameEngine.logintoken.length = tmp.length;
        App.GameEngine.logintoken.writeArrayBuffer(tmp.buffer, 0, tmp.length);
        App.GameEngine.logintoken.pos = 0;
        App.GameEngine.tokenCheck = msgData.getValue('tokencheck');
        let token: string = '';
        tmp.pos = 0;
        for (let i = 0; i < tmp.length; ++i) {
            token += tmp.getUint8().toString(16);
        }
        Log.trace('------->>token=' + token);
        msgData.clear();
    }

    /**
     * 正式登陆成功
     * @param data 
     */
    public userRealLogin(data: any): void {
        let msgData = new UserRealLoginRet(data);
        if (msgData.getValue('nErrorCode') == 0) {
            Log.trace('游戏登陆成功');
            // 抛出事件
            App.LListener.event(LcpEvent.GAME_INIT_FINISH);
        }
        else {
            Log.trace('游戏重连失败');
        }
        msgData.clear();
    }

    /**
     * 玩家地图信息
     * @param data 
     */
    public playerChangeMap(data: any): void {
        let msgData = new PlayerChangeMap(data);
        App.GameEngine.mainPlayer.mapid = msgData.location.getValue('mapid');
        App.GameEngine.mainPlayer.x = msgData.location.getValue('ncurx');
        App.GameEngine.mainPlayer.y = msgData.location.getValue('ncury');
        App.GameEngine.mainPlayer.mapname = msgData.getValue('szMapFileName');
        App.GameEngine.mainPlayer.onlyid = msgData.getValue('dwTmpId');
        App.GameEngine.mainPlayer.dir = msgData.getValue('dir');
        TipsManage.showTips('切换地图成功');
        App.GameEngine.mainPlayer.clearViewObj();
        let ready = new StateReady();
        lcp.send(ready, this, () => {
            App.GameEngine.isReady = true;
        });
        msgData.clear();
    }

    /**
     * 非玩家进入地图，包括NPC和怪物
     * @param data 
     */
    public mapCreateCret(data: any): void {
        let msgData = new MapCreateCret(data);
        let type = msgData.feature.getValue('btCretType');
        let mapid = msgData.location.getValue('mapid')
        let obj;
        if (type == EnumData.CRET_TYPE.CRET_NPC) {
            obj = new Npc();
            obj.name = FunctionUtils.filterName(msgData.getValue('szShowName')) + '(复活中)';
        } else {
            obj = new Monster();
            obj.name = FunctionUtils.filterName(msgData.getValue('szShowName'));
        }
        obj.id = msgData.feature.getValue('dwCretTypeId');
        obj.onlyid = msgData.getValue('dwTmpId');
        obj.mapid = msgData.location.getValue('mapid');
        obj.x = msgData.location.getValue('ncurx');
        obj.y = msgData.location.getValue('ncury');
        obj.level = msgData.getValue('lvl');
        obj.hp = msgData.getValue('nNowHp');
        obj.mp = msgData.getValue('nNowMp');
        obj.lifestate = msgData.getValue('lifestate');
        // 将对象添加到视野列表中
        App.GameEngine.mainPlayer.addViewObj(obj, type);
        msgData.clear();
        msgData = null;
    }

    /**
     * 玩家进入地图
     * @param data 
     */
    public mapCreatePlayer(data: any): void {
        let msg = new MapCreatePlayer(data);
        let player = new Player();
        player.onlyid = msg.getValue('dwTmpId');
        player.name = msg.getValue('szShowName');
        player.playerName = player.name;
        player.mapid = msg.location.getValue('mapid');
        player.x = msg.location.getValue('ncurx');
        player.y = msg.location.getValue('ncury');
        player.level = msg.getValue('lvl');
        player.hp = msg.getValue('nNowHp');
        player.mp = msg.getValue('nNowMp');
        player.lifestate = msg.getValue('lifestate');

        if (player.onlyid == App.GameEngine.mainPlayer.onlyid) {
            App.GameEngine.mainPlayer.level = player.level;
            App.GameEngine.mainPlayer.hp = player.hp;
            App.GameEngine.mainPlayer.mp = player.mp;
            App.GameEngine.mainPlayer.lifestate = player.lifestate;
            App.GameEngine.mainPlayer.job = msg.feature.feature.getValue('job');
            App.GameEngine.mainPlayer.sex = msg.feature.feature.getValue('sex');
            App.GameEngine.mainPlayer.changeHp(msg.getValue('nNowHp'), msg.getValue('nMaxHp'));
        }
        App.GameEngine.mainPlayer.addViewObj(player, msg.feature.getValue('btCretType'));
        msg.clear();
        msg = null;
    }

    /**
     * 去除地图内对象
     * @param data 
     */
    public mapRemoveCret(data: any): void {
        let msgData = new MapRemoveCret(data);
        App.GameEngine.mainPlayer.removeViewObj(msgData.getValue('dwTmpId'), msgData.getValue('btCretType'));
        msgData.clear();
    }


    //0x021F
    public cretMoveRet(data: any): void {
        let msg = new CretMoveRet(data);
        if (msg.getValue('moveerrorcode') != 0) {
            App.GameEngine.mainPlayer.dir = msg.getValue('dir');
            App.GameEngine.mainPlayer.x = msg.location.getValue('ncurx');
            App.GameEngine.mainPlayer.y = msg.location.getValue('ncury');
            ////App.MainPanel.addSysChat('move fail');
            return;
        }

        // //App.MainPanel.modifListViewObjPos(msg.getValue('dwTmpId'), msg.location.getValue('ncurx'), msg.location.getValue('ncury'));
        // if (msg.getValue('dwTmpId') == App.GameEngine.mainPlayer.onlyid) {
        //     //App.MainPanel.playerBtn.text = App.GameEngine.mainPlayer.playerName + 'lv.' + App.GameEngine.mainPlayer.level
        //         + "[color=#00EE00](" + App.GameEngine.mainPlayer.x + ',' + App.GameEngine.mainPlayer.y + ")[/color]";
        //     //App.MainPanel.playerBtn.grayed = //App.MainPanel.playerBtn.grayed ? false : true;
        // }


        msg.clear();
        msg = null;
    }

    //0x0232
    public cretAttackRet(data: any): void {
        let msgData = new CretAttackRet(data);

        if (msgData.getValue('btErrorCode') == 0) {
            ////App.MainPanel.addSysChat('怪物:'+msgData.getValue('dwTempId'));
        } else {
            ////App.MainPanel.addSysChat('攻击失败 errorcode:' + msgData.getValue('btErrorCode') + 'magicid:' + msgData.getValue('nMagicId'));
        }

        msgData.clear();
        msgData = null;
    }


    //0x0234
    public cretHealthChange(data: any): void {
        let msgData = new CretHealthChange(data);
        let nowhp = msgData.getValue('nNowHP');
        let maxhp = msgData.getValue('nMaxHP');
        let onlyid = msgData.getValue('dwtempid');
        if (onlyid == App.GameEngine.mainPlayer.onlyid) {
            let hp = msgData.getValue('nChangeHP');
            if (hp < 0) {
                ////App.MainPanel.addSysChat('你回复了' + (-hp) + '血量');
            } else {
                ////App.MainPanel.addSysChat('你掉了' + (-hp) + '血量');
            }
            // //App.MainPanel.addSysChat('你:' + msgData.getValue('dwtempid') + '最大血量:' + msgData.getValue('nMaxHP')
            //     + '当前血量:' + msgData.getValue('nNowHP') + '改变血量:' + msgData.getValue('nChangeHP'));

            App.GameEngine.mainPlayer.changeHp(nowhp, maxhp);
        }


        // for (let v = 0; v < //App.MainPanel.objItemDB.length; ++v) {
        //     if (//App.MainPanel.objItemDB[v].onlyid == onlyid) {
        //         let db = //App.MainPanel.objItemDB[v];
        //         db.nowhp = nowhp;
        //         db.maxhp = maxhp;
        //         let obj = //App.MainPanel.listView.getChildAt(v) as ObjItem;
        //         //obj.blood.text = nowhp + '/' + maxhp;
        //         obj.blood.text = "<font color='#00EE00'>(" + db.x + ',' + db.y + ")</font>" + db.nowhp + '/' + db.maxhp;
        //         break;
        //     }
        // }

        msgData.clear();
        msgData = null;
    }


    //0x0236
    public cretGoldChange(data: any): void {
        let msg = new CretGoldChange(data);
        //App.MainPanel.topGoldcnt.text = msg.getValue('nGold');
        //App.MainPanel.addSysChat('您获得</font color="#00EE00">' + msg.getValue('nChanged') + '金币</font>');

        msg.clear();
        msg = null;
    }


    //0x0237
    public cretExpChange(data: any): void {
        let msg = new CretExpChange(data);

        let type = msg.getValue('nType');
        switch (type) {
            case 0:
                //App.MainPanel.addSysChat('您获得</font color="#00EE00">' + msg.getValue('dwAdd') + '点经验</font>');
                App.GameEngine.mainPlayer.changeExp(msg.getValue('i64Exp'));
                break;
            case 1:
                break;
            case 2:
                break;
            default:
                //App.MainPanel.addSysChat('CretExpChange 未定义类型');
                break;
        }

        msg.clear();
        msg = null;
    }


    public cretLevelUp(data: any): void {
        let msg = new CretLevelUp(data);
        let onlyid = msg.getValue('dwTempId');
        let level = msg.getValue('dwLevel');
        if (onlyid == App.GameEngine.mainPlayer.onlyid) {
            App.GameEngine.mainPlayer.level = level;
            //App.MainPanel.playerBtn.text = App.GameEngine.mainPlayer.name + 'lv.' + App.GameEngine.mainPlayer.level
            + "[color=#00EE00](" + App.GameEngine.mainPlayer.x + ',' + App.GameEngine.mainPlayer.y + ")[/color]";

            //App.MainPanel.topLevelcnt.text = App.GameEngine.mainPlayer.level + '';
            App.GameEngine.mainPlayer.changeExp(msg.getValue('i64LeftExp'), msg.getValue('i64MaxExp'));

        }

        // for (let i = 0; i < //App.MainPanel.objItemDB.length; ++i) {
        //     if (//App.MainPanel.objItemDB[i].onlyid == onlyid) {
        //         let item = //App.MainPanel.listView.getChildAt(i) as ObjItem;
        //         item.level = level;
        //         let db = //App.MainPanel.objItemDB[i] as ObjItemDB;
        //         if (db.cretType == CRET_TYPE.CRET_NPC) {
        //             item.objName.text = "[color=#FF7F50]" + db.name + "[/color]";
        //         } else if (db.cretType == CRET_TYPE.CRET_PLAYER) {
        //             item.objName.text = "[color=#EE82EE]" + db.name + 'lv.' + db.level + "[/color]";
        //         } else {
        //             item.objName.text = db.name + 'lv.' + db.level;
        //         }
        //         //App.MainPanel.objItemDB[i].level = level;

        //         break;
        //     }
        // }
        msg.clear();
        msg = null;
    }


    public cretChat(data: any): void {
        let msg = new CretChat(data);
        let userOnlyid = msg.getValue('dwSrcOnlyId');
        let player: Player = null;
        if (userOnlyid.id == App.GameEngine.mainPlayer.userOnlyid.id) {
            player = App.GameEngine.mainPlayer;
        } else {

        }

        if (msg.chatMsg != "") {
            //App.MainPanel.addPlayerChat(msg.getValue('szName'), msg.chatMsg);
        }

        msg.clear();
        msg = null;
    }


    public cretAbility(data: any): void {
        let msg = new CretAbility(data);
        if (msg.getValue('dwType') == 0) {
            App.GameEngine.mainPlayer.changeHp(0, msg.ability.getValue('nMaxHP'));
            App.GameEngine.mainPlayer.changeFight(msg.getValue('fightPower'));
        }
        //App.GameEngine.mainPlayer.changeAtk(msg.ability.getValue('nMinDC'), msg.ability.getValue('nMaxDC'));

        msg.clear();
        msg = null;
    }


    public cretCharBase(data: any): void {
        let msg = new CretCharBase(data);
        App.GameEngine.mainPlayer.changeExp(msg.getValue('i64NowExp'), msg.getValue('i64MaxExp'));
        App.GameEngine.mainPlayer.changeHp(msg.getValue('nNowHp'));
        //App.MainPanel.topGoldcnt.text = msg.getValue('dwGold');
        //App.MainPanel.topRmbcnt.text = msg.getValue('dwZhuGold');

        msg.clear();
        msg = null;
    }


    public cretLifestateChange(data: any): void {
        let msg = new CretLifestateChange(data);
        let onlyid = msg.getValue('dwTempID');
        let lifestate = msg.getValue('curLifeState');
        // for (let i = 0; i < //App.MainPanel.objItemDB.length; ++i) {
        //     if (//App.MainPanel.objItemDB[i].onlyid == onlyid) {
        //         //App.MainPanel.objItemDB[i].lifestate = lifestate;
        //         let obj = //App.MainPanel.listView.getChildAt(i).asCom;
        //         if (lifestate > 0) {
        //             obj.getTransition('die').play();
        //             ////App.MainPanel.autoAttack = false;
        //         } else {
        //             obj.getTransition('t1').play();
        //         }
        //         break;
        //     }
        // }


        msg.clear();
        msg = null;
    }


    public tipMsg(data: any): void {
        let msg = new TipMsg(data);

        //App.MainPanel.tipsInfo.text = msg.tipmsg;
        // Main.main.getTransition('tipsinfo').play(() => {
        //     //App.MainPanel.tipsInfo.text = "";
        // });
        msg.clear();
        msg = null;
    }


    public cretGetUseItemRet(data: any): void {
        let msg = new CretGetUseItemRet(data);
        msg.clear();
        msg = null;
    }

    /**
     * 初始化背包数据
     * @param data 
     */
    public initBag(data: any): void {
        let msg = new CretItems(data);
        let typepos = msg.getValue('btPosition');
        let itemsInfo: Array<ItemBase> = msg.items;
        if (typepos == EnumData.PACKAGE_TYPE.ITEMCELLTYPE_EQUIP) {
            for (let i = 0; i < itemsInfo.length; i++) {
                // 装备索引
                let idx = itemsInfo[i].location.getValue('btIndex');
                App.GameEngine.equipDB[idx] = null;
                App.GameEngine.equipDB[idx] = itemsInfo[i];
            }
        }
        else if (typepos == EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE) {
            for (let i = 0; i < itemsInfo.length; i++) {
                // 包裹索引
                let idx = itemsInfo[i].location.getValue('btIndex');
                App.GameEngine.bagItemDB[idx] = null;
                App.GameEngine.bagItemDB[idx] = itemsInfo[i];
            }
        }
        msg.clear();
        msg = null;
    }

    //0x0301
    /**
     * 删除背包数据
     * @param data 
     */
    public cretDeleteItem(data: Laya.Byte) {
        let msg = new CretDeleteItem(data);
        let i64Id: Int64 = msg.getValue('i64Id');
        let typepos = msg.getValue('btPosition');
        let bag;
        // 装备
        if (typepos == EnumData.PACKAGE_TYPE.ITEMCELLTYPE_EQUIP) {
            bag = App.GameEngine.equipDB;
        }
        // 包裹
        else if (typepos == EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE) {
            bag = App.GameEngine.bagItemDB;
        }

        for (let i in bag) {
            if (bag[i].i64ItemID.int64ToStr() == i64Id.int64ToStr()) {
                delete bag[i];
                break
            }
        }

        msg.clear();
        msg = null;
    }

    //0x0302
    /**
     * 更新背包数据
     * @param data 
     */
    public cretUpdateItem(data: Laya.Byte) {
        let msg = new CretUpdateItem(data);
        let typepos = msg.getValue('btPosition');
        let idx = msg.item.location.getValue('btIndex');
        // 装备
        if (typepos == EnumData.PACKAGE_TYPE.ITEMCELLTYPE_EQUIP) {
            App.GameEngine.equipDB[idx] = null;
            App.GameEngine.equipDB[idx] = msg.item;
        }
        // 包裹
        else if (typepos == EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE) {
            App.GameEngine.bagItemDB[idx] = null;
            App.GameEngine.bagItemDB[idx] = msg.item;
            // let find: boolean = false;
            //App.MainPanel.addSysChat('你获得了' + //App.MainPanel.changeItemColor(Main.itemDBMap.get(msg.item.dwBaseID).name + '*' + msg.item.dwCount, Main.itemDBMap.get(msg.item.dwBaseID).color));
            ////App.MainPanel.addSysChat('你获得了' + "<font color='#00EE00'>[" + Main.itemDBMap.get(msg.item.dwBaseID).name + '*' + msg.item.dwCount + "]</color>");
        }
        msg.clear();
        msg = null;
    }

    public cretItemCountChanged(data: any): void {
        let msg = new CretItemCountChanged(data);
        let i64id = msg.getValue('itemid');
        // for (let i = 0; i < //App.MainPanel.bagItemDB.length; ++i) {
        //     if (//App.MainPanel.bagItemDB[i].i64ItemID && //App.MainPanel.bagItemDB[i].i64ItemID.id == i64id.id) {
        //         let oldcnt = //App.MainPanel.bagItemDB[i].dwCount;
        //         //App.MainPanel.bagItemDB[i].dwCount = msg.getValue('dwCount');
        //         (//App.MainPanel.bagList._children[i] as BagItem).itemCount.text = //App.MainPanel.bagItemDB[i].dwCount.toString();

        //         let num = //App.MainPanel.bagItemDB[i].dwCount - oldcnt;
        //         if (num > 0) {
        //             //App.MainPanel.addSysChat('你获得了' + (//App.MainPanel.bagList._children[i] as BagItem).itemName.text + '*' + (num));
        //         } else {
        //             //App.MainPanel.addSysChat('你使用了' + (//App.MainPanel.bagList._children[i] as BagItem).itemName.text + '*' + (-num));
        //         }

        //         break;
        //     }
        // }

        msg.clear();
        msg = null;
    }

    public cretProcessingItem(data: any): void {
        let msg = new CretProcessingItem(data);
        let errorcode = msg.getValue('nErrorCode');
        if (errorcode != 0) {
            //App.MainPanel.addSysChat('穿戴装备失败：errorcode:' + errorcode);
        } else {
            let srctype = msg.srcLocation.getValue('btLocation');
            let dsttype = msg.destLocation.getValue('btLocation');
            let srcidx = msg.srcLocation.getValue('btIndex');
            let dstidx = msg.destLocation.getValue('btIndex');
            // if (srctype == PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE) {
            //     let srcItem = //App.MainPanel.bagItemDB[srcidx];
            //     let dstItem = //App.MainPanel.equipDB[dstidx];
            //     if (srcItem.dwBaseID) {
            //         srcItem.location.setValue('btLocation', dsttype);
            //         srcItem.location.setValue('btIndex', dstidx);
            //     }
            //     if (dstItem.dwBaseID) {
            //         dstItem.location.setValue('btLocation', srctype);
            //         dstItem.location.setValue('btIndex', srcidx);
            //     }
            //     //App.MainPanel.equipDB[dstidx] = srcItem;
            //     //App.MainPanel.bagItemDB[srcidx] = dstItem;
            // } else if (srctype == PACKAGE_TYPE.ITEMCELLTYPE_EQUIP) {
            //     let srcItem = //App.MainPanel.equipDB[srcidx];
            //     let dstItem = //App.MainPanel.bagItemDB[dstidx];
            //     if (srcItem.dwBaseID) {
            //         srcItem.location.setValue('btLocation', dsttype);
            //         srcItem.location.setValue('btIndex', dstidx);
            //     }
            //     if (dstItem.dwBaseID) {
            //         dstItem.location.setValue('btLocation', srctype);
            //         dstItem.location.setValue('btIndex', srcidx);
            //     }
            //     //App.MainPanel.bagItemDB[dstidx] = srcItem;
            //     //App.MainPanel.equipDB[srcidx] = dstItem;
            // }

            //App.MainPanel.bagList.numItems = //App.MainPanel.bagItemDB.length;
            //App.MainPanel.equipList.numItems = //App.MainPanel.equipDB.length;
        }


        msg.clear();
        msg = null;
    }

    public cretForsakeItem(data: any): void {
        let msg = new CretForsakeItem(data);
        let errorcode = msg.getValue('btErrorCode');
        if (errorcode != 0) {
            if (errorcode == 33) {
                //App.MainPanel.addSysChat('该物品不允许丢弃');
            } else {
                //App.MainPanel.addSysChat('丢弃物品失败:' + errorcode);
            }

        }

        msg.clear();
        msg = null;
    }

    //0x0297
    public cretStruck(data: any): void {
        let msg = new CretStruck(data);
        let nowhp = msg.getValue('nHp');
        let maxhp = msg.getValue('nMaxHp');
        let actmpid = msg.getValue('dwAcTmpID');
        let tartmpid = msg.getValue('dwTmpId');
        let srcName = '无名英雄';
        let dstName = '无名英雄';
        let msgstr = ''
        //App.MainPanel.onStruck(tartmpid, nowhp, maxhp, (nowhp > 0 ? false : true));

        // if (actmpid == App.GameEngine.mainPlayer.onlyid) {
        //     srcName = "您";

        // }
        // else {
        //     //TODO Player
        //     for (let k = 0; k < //App.MainPanel.objItemDB.length; ++k) {
        //         if (//App.MainPanel.objItemDB[k].onlyid == actmpid) {
        //             srcName = //App.MainPanel.objItemDB[k].name;
        //             if (nowhp == 0) {
        //                 //App.MainPanel.objItemDB[k].lifestate = 0;
        //             }
        //             break;
        //         }
        //     }
        // }

        // if (tartmpid == App.GameEngine.mainPlayer.onlyid) {
        //     dstName = "您";
        //     msgstr = '<font color="#00EE00"><u>10秒后自动复活！</u></font>'
        //     ////App.MainPanel.bloodBtn.text = '血量:(' + msg.getValue('nHp') + '/' + msg.getValue('nMaxHp') + ')';
        //     App.GameEngine.mainPlayer.changeHp(nowhp);
        // } else {
        //     for (let k = 0; k < //App.MainPanel.objItemDB.length; ++k) {
        //         if (//App.MainPanel.objItemDB[k].onlyid == tartmpid) {
        //             dstName = //App.MainPanel.objItemDB[k].name;
        //             break;
        //         }
        //     }
        // }

        // if (srcName == '无名英雄' || dstName == '无名英雄') {

        // } else {
        //     if (nowhp > 0) {
        //         msgstr = '[' + srcName + ']对[' + dstName + ']造成' + msg.getValue('npower') + '点伤害值, [' + dstName + ']剩余血量:' + nowhp;
        //     } else {
        //         msgstr = '[' + srcName + ']对[' + dstName + ']致命一击 [' + dstName + ']已死亡!' + msgstr;
        //     }

        //     let color: string = "#FFFFFF";
        //     if (!(srcName == '您' || dstName == '您')) {
        //         //msgstr = '<font color="#A9A9A9">' + msgstr + '</font>'
        //         color = '#A9A9A9';
        //         if (Main.auditVer) {
        //             return;
        //         }
        //     }
        //     //App.MainPanel.addSysChat(msgstr, color);
        // }


        msg.clear();
        msg = null;
    }

    public mapItemEventDel(data: any): void {
        let msg = new MapItemEventDel(data);
        let i64ItemID = msg.getValue('i64ItemID');
        // for (let i = 0; i < //App.MainPanel.objItemDB.length; ++i) {
        //     let obj = //App.MainPanel.objItemDB[i] as ObjItemDB;
        //     if (obj.cretType == CRET_TYPE.CRET_NONE) {
        //         if (obj.i64ItemID.id == i64ItemID.id) {
        //             //App.MainPanel.objItemDB.splice(i, 1);
        //             break;
        //         }
        //     }
        // }
        //App.MainPanel.listView.numItems = //App.MainPanel.objItemDB.length;

        msg.clear();
        msg = null;
    }

    public mapItemEventAdd(data: any): void {

        let msg = new MapItemEventAdd(data);

        // let objDB = new ObjItemDB;
        // objDB.x = msg.getValue('wX');
        // objDB.y = msg.getValue('wY');
        // objDB.i64ItemID = msg.getValue('i64ItemID');
        // objDB.dwBaseID = msg.getValue('dwBaseID');
        // objDB.dwCount = msg.getValue('dwCount');
        // objDB.quality = msg.getValue('btQuality');

        // if (Main.auditVer) {
        //     let basedb = Main.itemDBMap.get(objDB.dwBaseID)
        //     if (basedb) {
        //         if (basedb.job != App.GameEngine.mainPlayer.job) {
        //             return;
        //         }
        //     }
        // }

        // objDB.cretType = CRET_TYPE.CRET_NONE;
        //App.MainPanel.objItemDB.push(objDB);
        //App.MainPanel.listView.numItems = //App.MainPanel.objItemDB.length;

        msg.clear();
        msg = null;
    }

    public mapItemEventPick(data: any): void {
        let msg = new MapItemEventPick(data);

        if (msg.getValue('btErrorCode') == 0) {

        } else {
            let errorcode = msg.getValue('btErrorCode');
            if (errorcode == 1) {
                //App.MainPanel.addSysChat('该物品不属于你');
            } else if (errorcode == 3) {
                //App.MainPanel.addSysChat('背包空间不足');
            } else {
                ////App.MainPanel.addSysChat('拾取物品失败 errorcode:' + errorcode);
                //App.MainPanel.moveTo(255, App.GameEngine.mainPlayer.x, App.GameEngine.mainPlayer.y + 1);
            }

        }

        msg.clear();
        msg = null;
    }

    public questScriptData(data: any): void {
        let msg = new QuestScriptData(data);

        ////App.MainPanel.addPlayerChat(null, '502 ' + msg.str);

        let strArr = msg.str.split('`');

        let anyData: any;
        switch (strArr[0]) {
            case 'opendialog':
                switch (strArr[1]) {
                    case 'TransfermMapDialog':
                        anyData = JSON.parse(strArr[3]);
                        for (let i = 1; anyData[i] != undefined; ++i) {
                            for (let j = 1; anyData[i][j] != undefined; ++j) {
                                // let mapdb = new MapItemDB;
                                // mapdb.mapName = anyData[i][j].name;
                                // mapdb.mapid = anyData[i][j].id;
                                // mapdb.state = anyData[i][j].state;
                                // mapdb.key = i;
                                // mapdb.index = j;
                                //App.MainPanel.mapDB.push(mapdb)
                            }
                        }


                        break;
                    case 'BossJiZhan':
                        anyData = JSON.parse(strArr[3]);

                        for (let i = 1; anyData[i] != undefined; ++i) {
                            if (anyData[i].minlv) {
                                // let db = new BossInfoDB;
                                // db.monid = anyData[i].monsterid;
                                // db.minlvl = anyData[i].minlv;
                                // db.maxlvl = anyData[i].maxlv;
                                // db.nowcnt = anyData[i].flag;
                                // db.maxcnt = anyData[i].maxcnt;
                                //App.MainPanel.bossInfoDB.push(db);
                            }
                        }
                        //App.MainPanel.bossList.numItems = //App.MainPanel.bossInfoDB.length;

                        break;
                    case 'malldialog':
                        anyData = JSON.parse(strArr[3]);
                        ////App.MainPanel.addPlayerChat(null, anyData);
                        if (strArr[2] == '1') {
                            for (let i = 1; anyData.itemtab[i] != undefined && anyData.statusatab[i] != undefined; ++i) {
                                // let basedb = Main.itemDBMap.get(anyData.itemtab[i].itemid);
                                // if (basedb) {
                                //     let db = new ShopItemDB;
                                //     db.idx = i;
                                //     db.itemName = basedb.name;
                                //     db.itemID = anyData.itemtab[i].itemid;
                                //     db.limitcnt = anyData.itemtab[i].limitcnt;
                                //     db.num = anyData.itemtab[i].num;
                                //     db.price = anyData.itemtab[i].price;
                                //     db.buycnt = anyData.statusatab[i];
                                //     //App.MainPanel.shopDB.push(db);
                                // }
                            }
                            //App.MainPanel.shopList.numItems = //App.MainPanel.shopDB.length;
                        }

                        break;
                    default:
                        break;
                }

                break;
            default:
                ////App.MainPanel.addPlayerChat(null, '没有处理: ' + msg.str);
                break;
        }

        //JSON.parse(msg.str);

        msg.clear();
        msg = null;
    }
}
