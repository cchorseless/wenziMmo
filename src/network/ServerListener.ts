/**
 * 服务器协议监听
 */

class ServerListener extends SingletonClass {
    public hasInit = false;
    public constructor() {
        super();
    }
    /**
     * 添加服务器全局监听事件
     */
    public init(): void {
        if (this.hasInit) return;
        // socket链接
        GameApp.LListener.on(LcpEvent.SOCKET_CONNECT, this, this.onSocketConnect);
        // 心跳包检测 fffe
        GameApp.LListener.on(Packet.eventName(ProtoCmd.CheckSignalCmd), this, this.checkSignalCmd);
        // 更新本地密匙 109
        GameApp.LListener.on(Packet.eventName(ProtoCmd.UpdateToken), this, this.updateToken);
        // 玩家进入地图 201
        GameApp.LListener.on(Packet.eventName(ProtoCmd.PlayerChangeMap), this, this.playerChangeMap);
        // 地图创建怪物 202
        GameApp.LListener.on(Packet.eventName(ProtoCmd.MapCreateCret), this, this.mapCreateCret);
        // 地图删除怪物 203
        GameApp.LListener.on(Packet.eventName(ProtoCmd.MapRemoveCret), this, this.mapRemoveCret);
        // 创建地图其他玩家 206
        GameApp.LListener.on(Packet.eventName(ProtoCmd.MapCreatePlayer), this, this.mapCreatePlayer);
        // 移动 0x021F
        GameApp.LListener.on(Packet.eventName(ProtoCmd.CretMoveRet), this, this.cretMoveRet);
        // 攻击 0x0232
        GameApp.LListener.on(Packet.eventName(ProtoCmd.CretAttackRet), this, this.cretAttackRet);
        // 血条/蓝条变化 0x0234
        GameApp.LListener.on(Packet.eventName(ProtoCmd.CretHealthChange), this, this.cretHealthChange);
        // 金币 236
        GameApp.LListener.on(Packet.eventName(ProtoCmd.CretGoldChange), this, this.cretGoldChange);
        // 绑定金币 2b6
        GameApp.LListener.on(Packet.eventName(ProtoCmd.CretGoldLockChange), this, this.cretGoldLockChange);
        // 元宝 258
        GameApp.LListener.on(Packet.eventName(ProtoCmd.CretYuanBaoChange), this, this.CretYuanBaoChange);
        // 绑定元宝 259
        GameApp.LListener.on(Packet.eventName(ProtoCmd.CretYuanBaoLockChange), this, this.CretYuanBaoLockChange);
        // 经验 237
        GameApp.LListener.on(Packet.eventName(ProtoCmd.CretExpChange), this, this.cretExpChange);
        // 等级 238
        GameApp.LListener.on(Packet.eventName(ProtoCmd.CretLevelUp), this, this.cretLevelUp);
        // 聊天相关 239
        GameApp.LListener.on(Packet.eventName(ProtoCmd.CretChat), this, this.cretChat);
        // 场景内角色战斗属性包 23b
        GameApp.LListener.on(Packet.eventName(ProtoCmd.CretAbility), this, this.cretAbility);
        // 玩家战斗属性包 249
        GameApp.LListener.on(Packet.eventName(ProtoCmd.CretPlayerAbility), this, this.cretPlayerAbility);
        // 玩家经济属性包 240
        GameApp.LListener.on(Packet.eventName(ProtoCmd.CretCharBase), this, this.cretCharBase);
        // 玩家复活死亡通知 246
        GameApp.LListener.on(Packet.eventName(ProtoCmd.CretLifestateChange), this, this.cretLifestateChange);
        // 服务器提示tips 288
        GameApp.LListener.on(Packet.eventName(ProtoCmd.TipMsg), this, this.tipMsg);
        // 使用物品返回 315
        GameApp.LListener.on(Packet.eventName(ProtoCmd.CretGetUseItemRet), this, this.cretGetUseItemRet);
        // 怪物掉血 0x0297
        GameApp.LListener.on(Packet.eventName(ProtoCmd.CretStruck), this, this.cretStruck);
        // 删除地图上的物品 29D
        GameApp.LListener.on(Packet.eventName(ProtoCmd.MapItemEventDel), this, this.mapItemEventDel);
        // 拾取地图上的物品 288
        GameApp.LListener.on(Packet.eventName(ProtoCmd.MapItemEventAdd), this, this.mapItemEventAdd);
        // 地图上添加物品 2a0
        GameApp.LListener.on(Packet.eventName(ProtoCmd.MapItemEventPick), this, this.mapItemEventPick);
        /***********************************背包相关 *********************************/
        // 删除背包道具 301
        GameApp.LListener.on(Packet.eventName(ProtoCmd.CretDeleteItem), this, this.cretDeleteItem);
        // 更新背包道具 302
        GameApp.LListener.on(Packet.eventName(ProtoCmd.CretUpdateItem), this, this.cretUpdateItem);
        // 初始化背包信息 303
        GameApp.LListener.on(Packet.eventName(ProtoCmd.CretItems), this, this.initBag);
        // 背包内物品数量改变 30a
        GameApp.LListener.on(Packet.eventName(ProtoCmd.CretItemCountChanged), this, this.cretItemCountChanged);
        // 背包内物品操作 307
        GameApp.LListener.on(Packet.eventName(ProtoCmd.CretProcessingItem), this, this.cretProcessingItem);
        // 丢弃背包物品 33d
        GameApp.LListener.on(Packet.eventName(ProtoCmd.CretForsakeItem), this, this.cretForsakeItem);
        // 服务器扩展脚本 0x0919
        GameApp.LListener.on(Packet.eventName(ProtoCmd.QuestScriptData), this, this.questScriptData);
        // 客户端本地设置 2aa
        GameApp.LListener.on(Packet.eventName(ProtoCmd.ClientSetData), this, this.clientSetData);
        // 初始化标记
        this.hasInit = true;
    }

    /**
    * 心跳包
    * @param data 
    */
    public checkSignalCmd(data: any): void {
        let checksignal = new ProtoCmd.CheckSignalCmd(data);
        if (checksignal.getValue('isneedACK') != 0) {
            let signal = new ProtoCmd.CheckSignalCmdRet();
            signal.setValue('checknum', checksignal.getValue('checknum'))
            signal.send();
            signal = null;
        }
        if (checksignal.getValue('checknum') == 66) {
            GameApp.Socket.waitSignal = false;
            GameApp.Socket.waitTime = 0;
        }
    }

    /**
     * socket链接
     */
    public onSocketConnect() {
        // 断线重连
        if (GameApp.GameEngine.isLogin) {
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
        let realLogin = new ProtoCmd.UserRealLogin();
        realLogin.setValue('szAccount', GameApp.GameEngine.mainPlayer.playerAccount);
        realLogin.setValue('szPlayerName', GameApp.GameEngine.mainPlayer.objName);
        realLogin.setValue('dwTrueZoneid', GameApp.GameEngine.trueZoneid);
        realLogin.setValue('dwUserOnlyId', GameApp.GameEngine.mainPlayer.onlyId);
        //realLogin.setValue('btReloginType', 2);
        realLogin.setValue('loginsvr_id_type', GameApp.GameEngine.loginsvrIdType);
        realLogin.setValue('tokencheck', GameApp.GameEngine.tokenCheck);
        realLogin.setValue('gamesvr_id_type', GameApp.GameEngine.gamesvrIdType);
        realLogin.setValue('logintoken', GameApp.GameEngine.logintoken);
        // 正式进入游戏
        lcp.send(realLogin, this, this.userRealLogin);
    }

    /**
     * 更新本地密匙
     * @param data 
     */
    public updateToken(data: any): void {
        let msgData = new ProtoCmd.UpdateToken(data);
        let tmp = msgData.getValue('logintoken');
        //GameApp.GameEngine.logintoken.length = tmp.length;
        GameApp.GameEngine.logintoken.writeArrayBuffer(tmp.buffer, 0, tmp.length);
        GameApp.GameEngine.logintoken.pos = 0;
        GameApp.GameEngine.tokenCheck = msgData.getValue('tokencheck');
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
        let msgData = new ProtoCmd.UserRealLoginRet(data);
        if (msgData.getValue('nErrorCode') == 0) {
            Log.trace('游戏登陆成功');
            // 抛出事件
            GameApp.LListener.event(LcpEvent.GAME_INIT_FINISH);
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
        Log.trace('========>玩家进入地图');
        let msgData = new ProtoCmd.PlayerChangeMap(data);
        let player = GameApp.MainPlayer;
        player.mapid = msgData.location.getValue('mapid');
        player.x = msgData.location.getValue('ncurx');
        player.y = msgData.location.getValue('ncury');
        player.mapname = msgData.getValue('szMapFileName');
        player.tempId = msgData.getValue('dwTmpId');
        player.dir = msgData.getValue('dir');
        player.clearViewObj();
        let ready = new ProtoCmd.StateReady();
        lcp.send(ready, this, () => {
            GameApp.GameEngine.isReady = true;
        });
        msgData.clear();
    }

    /**
     * 非玩家进入地图，包括NPC和怪物
     * @param data 
     */
    public mapCreateCret(data: any): void {
        let msgData = new ProtoCmd.MapCreateCret(data);
        let type = msgData.feature.getValue('btCretType');
        let mapid = msgData.location.getValue('mapid');
        let szShowName = msgData.getValue('szShowName');
        let obj: GameObject.Creature;
        switch (type) {
            case EnumData.CRET_TYPE.CRET_NPC:
                obj = new GameObject.Npc();
                obj.objName = obj.filterName(szShowName);
                break;
            case EnumData.CRET_TYPE.CRET_MONSTER:
                obj = new GameObject.Monster();
                obj.objName = obj.filterName(szShowName);
                break;
        }
        obj.objType = type;
        obj.configId = msgData.feature.getValue('dwCretTypeId');
        obj.tempId = msgData.getValue('dwTmpId');
        obj.mapid = msgData.location.getValue('mapid');
        obj.x = msgData.location.getValue('ncurx');
        obj.y = msgData.location.getValue('ncury');
        obj.level = msgData.getValue('lvl');
        obj.hp = msgData.getValue('nNowHp');
        obj.mp = msgData.getValue('nNowMp');
        obj.lifestate = msgData.getValue('lifestate');
        // 将对象添加到视野列表中
        GameApp.MainPlayer.addViewObj(obj, type);
        msgData.clear();
        msgData = null;
    }

    /**
     * 玩家进入地图
     * @param data 
     */
    public mapCreatePlayer(data: any): void {
        let msg = new ProtoCmd.MapCreatePlayer(data);
        let newPlayer = new GameObject.Player();
        let type = msg.feature.getValue('btCretType');
        newPlayer.tempId = msg.getValue('dwTmpId');
        newPlayer.objName = msg.getValue('szShowName');
        newPlayer.objType = type;
        newPlayer.mapid = msg.location.getValue('mapid');
        newPlayer.x = msg.location.getValue('ncurx');
        newPlayer.y = msg.location.getValue('ncury');
        newPlayer.level = msg.getValue('lvl');
        newPlayer.hp = msg.getValue('nNowHp');
        newPlayer.mp = msg.getValue('nNowMp');
        newPlayer.lifestate = msg.getValue('lifestate');

        let player = GameApp.MainPlayer;
        if (player.tempId == newPlayer.tempId) {
            player.level = newPlayer.level;
            player.hp = newPlayer.hp;
            player.mp = newPlayer.mp;
            player.lifestate = newPlayer.lifestate;
            player.changeHp(msg.getValue('nNowHp'), msg.getValue('nMaxHp'));
            newPlayer = player;
        }
        GameApp.MainPlayer.addViewObj(newPlayer, type);
        msg.clear();
        msg = null;
    }

    /**
     * 去除地图内对象
     * @param data 
     */
    public mapRemoveCret(data: any): void {
        let msgData = new ProtoCmd.MapRemoveCret(data);
        GameApp.GameEngine.mainPlayer.removeViewObj(msgData.getValue('dwTmpId'), msgData.getValue('btCretType'));
        msgData.clear();
    }


    //0x021F
    public cretMoveRet(data: any): void {
        let msg = new ProtoCmd.CretMoveRet(data);
        if (msg.getValue('moveerrorcode') != 0) {
            GameApp.GameEngine.mainPlayer.dir = msg.getValue('dir');
            GameApp.GameEngine.mainPlayer.x = msg.location.getValue('ncurx');
            GameApp.GameEngine.mainPlayer.y = msg.location.getValue('ncury');
            ////App.MainPanel.addSysChat('move fail');
            return;
        }
        // //App.MainPanel.modifListViewObjPos(msg.getValue('dwTmpId'), msg.location.getValue('ncurx'), msg.location.getValue('ncury'));
        // if (msg.getValue('dwTmpId') ==GameApp.GameEngine.mainPlayer.onlyid) {
        //     //App.MainPanel.playerBtn.text =GameApp.GameEngine.mainPlayer.playerName + 'lv.' +GameApp.GameEngine.mainPlayer.level
        //         + "[color=#00EE00](" +GameApp.GameEngine.mainPlayer.x + ',' +GameApp.GameEngine.mainPlayer.y + ")[/color]";
        //     //App.MainPanel.playerBtn.grayed = //App.MainPanel.playerBtn.grayed ? false : true;
        // }
        msg.clear();
        msg = null;
    }

    //0x0232
    public cretAttackRet(data: any): void {
        let msgData = new ProtoCmd.CretAttackRet(data);

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
        let msgData = new ProtoCmd.CretHealthChange(data);
        let nowhp = msgData.getValue('nNowHP');
        let maxhp = msgData.getValue('nMaxHP');
        let onlyid = msgData.getValue('dwtempid');
        if (onlyid == GameApp.GameEngine.mainPlayer.onlyId) {
            let hp = msgData.getValue('nChangeHP');
            if (hp < 0) {
                ////App.MainPanel.addSysChat('你回复了' + (-hp) + '血量');
            } else {
                ////App.MainPanel.addSysChat('你掉了' + (-hp) + '血量');
            }
            // //App.MainPanel.addSysChat('你:' + msgData.getValue('dwtempid') + '最大血量:' + msgData.getValue('nMaxHP')
            //     + '当前血量:' + msgData.getValue('nNowHP') + '改变血量:' + msgData.getValue('nChangeHP'));
            GameApp.GameEngine.mainPlayer.changeHp(nowhp, maxhp);
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



    /**
     * 金币 0x0236
     * @param data 
     */
    public cretGoldChange(data: any): void {
        let msg = new ProtoCmd.CretGoldChange(data);
        let player = GameApp.MainPlayer;
        player.changeGold(msg.getValue('nGold'));
        TipsManage.showTxt('金币改变了' + msg.getValue('nChanged'));
        GameApp.LListener.event(LcpEvent.UPDATE_UI_GOLD);
        if (msg.getValue('boMax')) {
            TipsManage.showTips('金币达到上限');
        }
        msg.clear();
        msg = null;
    }

    /**
     * 绑定金币 02b6
     * @param data 
     */
    public cretGoldLockChange(data): void {
        let msg = new ProtoCmd.CretGoldLockChange(data);
        let player = GameApp.MainPlayer;
        player.changeGold_lock(msg.getValue('dwBindGold'));
        TipsManage.showTxt('绑定金币改变了' + msg.getValue('nChanged'));
        GameApp.LListener.event(LcpEvent.UPDATE_UI_GOLDLOCK);
        if (msg.getValue('boMax')) {
            TipsManage.showTips('绑定金币达到上限');
        }
        msg.clear();
        msg = null;
    }

    /**
     * 元宝 0x0258
     * @param data 
     */
    public CretYuanBaoChange(data): void {
        let msg = new ProtoCmd.CretYuanBaoChange(data);
        let player = GameApp.MainPlayer;
        player.changeYuanBao(msg.getValue('dwRmbGold'));
        TipsManage.showTxt('元宝改变了' + msg.getValue('nChanged'));
        GameApp.LListener.event(LcpEvent.UPDATE_UI_YUANBAO);
        msg.clear();
        msg = null;
    }

    /**
     * 绑定元宝 0x0259
     * @param data 
     */
    public CretYuanBaoLockChange(data): void {
        let msg = new ProtoCmd.CretYuanBaoLockChange(data);
        let player = GameApp.MainPlayer;
        player.changeYuanBao_lock(msg.getValue('dwGiftRmbGold'));
        TipsManage.showTxt('绑定元宝改变了' + msg.getValue('nChanged'));
        GameApp.LListener.event(LcpEvent.UPDATE_UI_YUANBAOLOCK);
        msg.clear();
        msg = null;
    }

    /**
     * 经验 0x0237
     * @param data 
     */
    public cretExpChange(data: any): void {
        let msg = new ProtoCmd.CretExpChange(data);
        let type = msg.getValue('nType');
        let nowExp = msg.getValue('i64Exp');
        let addExp = msg.getValue('dwAdd');
        switch (type) {
            // 更新角色
            case 0:
                //App.MainPanel.addSysChat('您获得</font color="#00EE00">' + msg.getValue('dwAdd') + '点经验</font>');
                GameApp.MainPlayer.changeExp(nowExp);
                TipsManage.showTxt('主角经验改变了' + addExp);
                GameApp.LListener.event(LcpEvent.UPDATE_UI_PLAYER_EXP);
                break;
            // 更新英雄
            case 1:
                TipsManage.showTxt('英雄经验改变了' + addExp);
                GameApp.LListener.event(LcpEvent.UPDATE_UI_HERO_EXP);
                break;
            // 更新BOSS积分
            case 2:
                break;

        }
        msg.clear();
        msg = null;
    }

    /**
     * 等级改变
     * @param data 
     */
    public cretLevelUp(data: any): void {
        let msg = new ProtoCmd.CretLevelUp(data);
        let dwTempId = msg.getValue('dwTempId');
        let level = msg.getValue('dwLevel');
        let i64LeftExp = msg.getValue('i64LeftExp');
        let i64MaxExp = msg.getValue('i64MaxExp');

        let player = GameApp.MainPlayer;
        if (dwTempId == player.tempId) {
            player.changeLevel(level);
            player.changeExp(i64LeftExp, i64MaxExp);
            GameApp.LListener.event(LcpEvent.UPDATE_UI_PLAYER_LEVEL);
            GameApp.LListener.event(LcpEvent.UPDATE_UI_PLAYER_EXP);
            //App.MainPanel.playerBtn.text =GameApp.GameEngine.mainPlayer.name + 'lv.' +GameApp.GameEngine.mainPlayer.level
            // + "[color=#00EE00](" + GameApp.GameEngine.mainPlayer.x + ',' + GameApp.GameEngine.mainPlayer.y + ")[/color]";
            //App.MainPanel.topLevelcnt.text =GameApp.GameEngine.mainPlayer.level + '';
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

    /**
     * 聊天频道相关
     * @param data 
     */
    public cretChat(data: any): void {
        // let msg: ProtoCmd.CretChat = Laya.Pool.getItemByCreateFun('ProtoCmd.CretChat', () => {
        //     return new ProtoCmd.CretChat(data)
        // });
        let msg = new ProtoCmd.CretChat(data);
        if (msg.chatMsg != "") {
            PanelManage.Main.updateChatView(msg);
        }
        msg.clear();
        // Laya.Pool.recover("ProtoCmd.CretChat", msg);
    }

    /**
     * 更新场景内所有角色的战斗属性
     * @param data 
     */
    public cretAbility(data: any): void {
        let msg = new ProtoCmd.CretAbility(data);
        let dwTempId = msg.getValue('dwTempId');
        let ability = msg.ability;
        let dwType = msg.getValue('dwType');
        let fightPower = msg.getValue('fightPower');

        let player = GameApp.MainPlayer;
        if (dwTempId == player.tempId) {
            switch (dwType) {
                // 玩家
                case 0:
                    player.changeAbility(ability);
                    GameApp.LListener.event(LcpEvent.UPDATE_UI_PLAYER_ABILITY);
                    player.changeFight(fightPower);
                    GameApp.LListener.event(LcpEvent.UPDATE_UI_PLAYER_POWER);
                    break;
                // 英雄战士
                case 1:
                    GameApp.LListener.event(LcpEvent.UPDATE_UI_HERO_POWER1);
                    break;
                // 英雄法师
                case 2:
                    GameApp.LListener.event(LcpEvent.UPDATE_UI_HERO_POWER2);
                    break;
                // 英雄道士
                case 3:
                    GameApp.LListener.event(LcpEvent.UPDATE_UI_HERO_POWER3);
                    break;

            }
        }
        msg.clear();
        msg = null;
    }
    /**
     * 更新玩家自己的战斗属性
     * @param data 
     */
    public cretPlayerAbility(data: any): void {

    }

    /**
     * 初始化玩家基本属性
     * @param data 
     */
    public cretCharBase(data: any): void {
        let msg = new ProtoCmd.CretCharBase(data);
        let player = GameApp.MainPlayer;
        player.changeExp(msg.getValue('i64NowExp'), msg.getValue('i64MaxExp'));//经验
        player.changeHp(msg.getValue('nNowHp'));//气血
        player.changeMp(msg.getValue('nNowMp'));//蓝量
        player.changeGold(msg.getValue('dwGold'));//金币
        player.changeGold_lock(msg.getValue('dwBindGold'));//绑定金币
        player.changeYuanBao(msg.getValue('dwZhuGold'));//元宝
        player.changeYuanBao_lock(msg.getValue('dwGiftsGold'));//绑定元宝
        player.changeLevel(msg.getValue('dwLevel'));//等级
        player.changePkModel(msg.getValue('btPkModel'));//PK模式
        player.changeHonorNum(msg.getValue('dwHonorNum'));//荣誉积分
        player.changeGuildDedication(msg.getValue('dwGuildDedication'));//行会贡献值
        player.changeNowFame(msg.getValue('i64Fame'));//当前声望
        player.changeMaxTotalFame(msg.getValue('i64TotalFame'));//累计声望
        player.changeNeigong(msg.getValue('nNeigongnum'), msg.getValue('nNeigongMax'));//内功
        player.changeFight(msg.getValue('nFight'));//战斗力
        msg.clear();
        msg = null;
    }


    public cretLifestateChange(data: any): void {
        let msg = new ProtoCmd.CretLifestateChange(data);
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
        let msg = new ProtoCmd.TipMsg(data);
        //App.MainPanel.tipsInfo.text = msg.tipmsg;
        // Main.main.getTransition('tipsinfo').play(() => {
        //     //App.MainPanel.tipsInfo.text = "";
        // });
        msg.clear();
        msg = null;
    }


    public cretGetUseItemRet(data: any): void {
        let msg = new ProtoCmd.CretGetUseItemRet(data);
        msg.clear();
        msg = null;
    }

    /**
     * 初始化背包数据
     * @param data 
     */
    public initBag(data: any): void {
        let msg = new ProtoCmd.CretItems(data);
        let typepos = msg.getValue('btPosition');
        let itemsInfo: Array<ItemBase> = msg.items;
        if (typepos == EnumData.PACKAGE_TYPE.ITEMCELLTYPE_EQUIP) {
            for (let i = 0; i < itemsInfo.length; i++) {
                // 装备索引
                let idx = itemsInfo[i].location.getValue('btIndex');
                GameApp.GameEngine.equipDB[idx] = null;
                GameApp.GameEngine.equipDB[idx] = itemsInfo[i];
            }
        }
        else if (typepos == EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE) {
            for (let i = 0; i < itemsInfo.length; i++) {
                // 包裹索引
                let idx = itemsInfo[i].location.getValue('btIndex');
                GameApp.GameEngine.bagItemDB[idx] = null;
                GameApp.GameEngine.bagItemDB[idx] = itemsInfo[i];
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
        let msg = new ProtoCmd.CretDeleteItem(data);
        let i64Id: Int64 = msg.getValue('i64Id');
        let typepos = msg.getValue('btPosition');
        let bag;
        // 装备
        if (typepos == EnumData.PACKAGE_TYPE.ITEMCELLTYPE_EQUIP) {
            bag = GameApp.GameEngine.equipDB;
        }
        // 包裹
        else if (typepos == EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE) {
            bag = GameApp.GameEngine.bagItemDB;
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
        let msg = new ProtoCmd.CretUpdateItem(data);
        let typepos = msg.getValue('btPosition');
        let idx = msg.item.location.getValue('btIndex');
        // 装备
        if (typepos == EnumData.PACKAGE_TYPE.ITEMCELLTYPE_EQUIP) {
            GameApp.GameEngine.equipDB[idx] = null;
            GameApp.GameEngine.equipDB[idx] = msg.item;
        }
        // 包裹
        else if (typepos == EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE) {
            GameApp.GameEngine.bagItemDB[idx] = null;
            GameApp.GameEngine.bagItemDB[idx] = msg.item;
            // let find: boolean = false;
            //App.MainPanel.addSysChat('你获得了' + //App.MainPanel.changeItemColor(Main.itemDBMap.get(msg.item.dwBaseID).name + '*' + msg.item.dwCount, Main.itemDBMap.get(msg.item.dwBaseID).color));
            ////App.MainPanel.addSysChat('你获得了' + "<font color='#00EE00'>[" + Main.itemDBMap.get(msg.item.dwBaseID).name + '*' + msg.item.dwCount + "]</color>");
        }
        msg.clear();
        msg = null;
    }

    public cretItemCountChanged(data: any): void {
        let msg = new ProtoCmd.CretItemCountChanged(data);
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
        let msg = new ProtoCmd.CretProcessingItem(data);
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
        let msg = new ProtoCmd.CretForsakeItem(data);
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
        let msg = new ProtoCmd.CretStruck(data);
        let nowhp = msg.getValue('nHp');
        let maxhp = msg.getValue('nMaxHp');
        let actmpid = msg.getValue('dwAcTmpID');
        let tartmpid = msg.getValue('dwTmpId');
        let srcName = '无名英雄';
        let dstName = '无名英雄';
        let msgstr = ''
        //App.MainPanel.onStruck(tartmpid, nowhp, maxhp, (nowhp > 0 ? false : true));

        // if (actmpid ==GameApp.GameEngine.mainPlayer.onlyid) {
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

        // if (tartmpid ==GameApp.GameEngine.mainPlayer.onlyid) {
        //     dstName = "您";
        //     msgstr = '<font color="#00EE00"><u>10秒后自动复活！</u></font>'
        //     ////App.MainPanel.bloodBtn.text = '血量:(' + msg.getValue('nHp') + '/' + msg.getValue('nMaxHp') + ')';
        //    GameApp.GameEngine.mainPlayer.changeHp(nowhp);
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
        let msg = new ProtoCmd.MapItemEventDel(data);
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

        let msg = new ProtoCmd.MapItemEventAdd(data);

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
        //         if (basedb.job !=GameApp.GameEngine.mainPlayer.job) {
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
        let msg = new ProtoCmd.MapItemEventPick(data);

        if (msg.getValue('btErrorCode') == 0) {

        } else {
            let errorcode = msg.getValue('btErrorCode');
            if (errorcode == 1) {
                //App.MainPanel.addSysChat('该物品不属于你');
            } else if (errorcode == 3) {
                //App.MainPanel.addSysChat('背包空间不足');
            } else {
                ////App.MainPanel.addSysChat('拾取物品失败 errorcode:' + errorcode);
                //App.MainPanel.moveTo(255,GameApp.GameEngine.mainPlayer.x,GameApp.GameEngine.mainPlayer.y + 1);
            }

        }

        msg.clear();
        msg = null;
    }

    public questScriptData(data: any): void {
        let msg = new ProtoCmd.QuestScriptData(data);

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

    /**
     * 客户端设置
     * @param data 
     */
    public clientSetData(data: any): void {

    }
}

