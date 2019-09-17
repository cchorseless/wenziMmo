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
        // socket断线
        GameApp.LListener.on(LcpEvent.SOCKET_CLOSE, this, this.onSocketClose);
        // 心跳包检测 fffe
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.CheckSignalCmd), this, this.checkSignalCmd);
        // 更新本地密匙 109
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.UpdateToken), this, this.updateToken);
        // 服务器tips提示
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.TipMsg), this, this.showTips);
        // 玩家进入地图 201
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.PlayerChangeMap), this, this.playerChangeMap);
        // 地图创建怪物和NPC 202
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.MapCreateCret), this, this.mapCreateCret);
        // 地图同步NPC的任务状态
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.NpcStatsQuestRet), this, this.updateNpcState);
        // 地图删除怪物 203
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.MapRemoveCret), this, this.mapRemoveCret);
        // 创建地图其他玩家 206
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.MapCreatePlayer), this, this.mapCreatePlayer);
        // 同步怪物feature
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.AvaterIconDecoder), this, this.syncNotPlayerFeature);
        // 同步玩家feature
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.PlayerIconDecoder), this, this.syncPlayerFeature);
        // 传送移动 0x0221
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.CretAfterSpaceMove), this, this.syncPlayerPosition);
        /*************************************战斗相关***************************************** */
        // 攻击 0x0232
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.CretAttackRet), this, this.cretAttackRet);
        // 怪物掉血 0x0297
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.CretStruck), this, this.cretStruck);
        // 生物复活死亡通知 246
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.CretLifestateChange), this, this.cretLifestateChange);
        // 攻击技能特效飞行
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.AvatorSpellDecoderRet), this, this.AvatorSpellDecoderRet);
        /*************************************地图上道具******************************************** */
        // 删除地图上的物品 29D
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.MapItemEventDel), this, this.mapItemEventDel);
        // 添加地图上的物品 288
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.MapItemEventAdd), this, this.mapItemEventAdd);

        /*************************************技能相关************************************************ */
        // 推送技能列表
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.AvatarAllSkillsDecoderRet), this, this.updateSkillList);
        // 推送技能冷却
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.AvatarMagicColdRet), this, this.updateSkillCold);
        // 推送技能更改状态
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.AvatarSkillAddDecoderRet), this, this.updateSkillState);
        /*************************************同步玩家属性************************************ */
        // 血条/蓝条变化 0x0234
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.CretHealthChange), this, this.cretHealthChange);
        // 金币 236
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.CretGoldChange), this, this.cretGoldChange);
        // 绑定金币 2b6
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.CretGoldLockChange), this, this.cretGoldLockChange);
        // 元宝 258
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.CretYuanBaoChange), this, this.CretYuanBaoChange);
        // 绑定元宝 259
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.CretYuanBaoLockChange), this, this.CretYuanBaoLockChange);
        // 经验 237
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.CretExpChange), this, this.cretExpChange);
        // 等级 238
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.CretLevelUp), this, this.cretLevelUp);
        // 场景内角色战斗属性包 23b
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.CretAbility), this, this.cretAbility);
        // 玩家战斗属性包 249
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.CretPlayerAbility), this, this.cretPlayerAbility);
        // 玩家经济属性包 240
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.CretCharBase), this, this.cretCharBase);
        // 更新玩家行会贡献
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.AvatarguildJiFenDecoder), this, this.updateGuildSorce);
        /***************************************聊天相关***************************************** */
        // 聊天相关 239
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.CretChat), this, this.cretChat);
        /***********************************背包相关 *********************************/
        // 删除背包道具 301
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.CretDeleteItem), this, this.cretDeleteItem);
        // 更新背包道具 302
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.CretUpdateItem), this, this.cretUpdateItem);
        // 初始化背包信息 303
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.CretItems), this, this.initBag);
        // 背包内物品数量改变 30a
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.CretItemCountChanged), this, this.cretItemCountChanged);
        /***********************************好友相关 *********************************/
        // 添加一个好友
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.stRelationAddFriend), this, this.addFriend);
        //向添加人发出询问
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.stRelationAddQuery), this, this.addFriendAsk);
        // 回答关系添加结果(only 好友)
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.stRelationAddAnswerQuery), this, this.addFriendAskResult);
        /***********************************组队相关********************************* */
        //向队长发出申请
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.TeamAgreeJoinEncoder), this, this.addTeamAsk);
        //回答申请加入组队结果
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.TeamAgreeJoinDecoder), this, this.allowTeam);
        /***********************************行会信息********************************* */
        // 同步行会信息
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.stGlobalGuildChangeGuildRet), this, this.syncBangPaiInfo);
        // 有人申请公会通知，红点提示
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.stGuildApply), this, this.RED_NOTICE_applyBangPai);
        // 服务器扩展脚本 0x0919
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.QuestServerDataRet), this, this.questServerDataRet);
        // 客户端本地设置 2aa
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.ClientSetData), this, this.clientSetData);
        /***********************************任务信息*************************************** */
        // 监听任务信息
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.stQuestLoginRet), this, this.updateTaskInfo);
        // 服务器推送创建新任务
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.stQuestCreateRet), this, this.addTaskInfo);
        /***********************************剧情信息**************************************** */
        // 改变剧情相关数据
        GameApp.LListener.on(ProtoCmd.JQ_GET_JQ_SELF_INFO, this, this.updatePlayerJuQingInfo);
        /**********************************服务器打开面板全局监听**************************** */
        // 新玩家进入游戏打开欢迎界面
        GameApp.LListener.once(ProtoCmd.NEW_PLAYER_WelcomeDialog, this, this.openWelcomePanel);
        // 正常充值提示界面
        GameApp.LListener.on(ProtoCmd.CZ_chongzhidialog, this, this.openPanel, [ProtoCmd.CZ_chongzhidialog]);
        // 首次充值提示界面
        GameApp.LListener.on(ProtoCmd.CZ_weichongzhidialog, this, this.openPanel, [ProtoCmd.CZ_weichongzhidialog]);

        // 监听图鉴信息
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.RecvTypeKeyValue), this, this.recvTypeKeyValue);

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
            // TipsManage.showTxt('SOCKET 初始化成功,可以登录');
        }
    }

    /**
     * 断线重连
     */
    public onSocketReconnect() {
        GameApp.GameEngine.initSelf();
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
     * 断线界面
     */
    public onSocketClose() {
        PanelManage.openServerErrorPanel()
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
     * 服务器提示的tips
     * @param data 
     */
    public showTips(data): void {
        let cbpkt = new ProtoCmd.TipMsg(data);
        TipsManage.showTips(cbpkt.tipmsg);
        cbpkt.clear();
        cbpkt = null;
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
        // 更新位置信息
        player.location.clone(msgData.location.data);
        // 更新其他信息
        player.objName = player.filterName(msgData.getValue('szName'))
        player.mapName = msgData.getValue('szMapName');
        player.tempId = msgData.getValue('dwTmpId');
        player.dir = msgData.getValue('dir');
        player.lifestate = msgData.getValue('lifestate');
        player.createTime = msgData.getValue('dwPlayerCreateTime');
        player.clearViewObj();
        // 切完大地图发送
        let ready = new ProtoCmd.StateReady();
        lcp.send(ready, this, () => {
            GameApp.GameEngine.isReady = true;
            // 切完大地图拉取地图信息
            PanelManage.Main && PanelManage.Main.initUI();
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
        // feature 信息
        obj.feature.clone(msgData.feature.data);
        // 位置  信息
        obj.location.clone(msgData.location.data);
        // 战斗信息
        obj.changeHp(msgData.getValue('nNowHp'), msgData.getValue('nMaxHp'));
        obj.changeMp(msgData.getValue('nNowMp'), msgData.getValue('nMaxMp'));
        // 其他信息
        obj.tempId = msgData.getValue('dwTmpId');
        obj.level = msgData.getValue('lvl');
        obj.lifestate = msgData.getValue('lifestate');
        obj.dir = msgData.getValue('btDir');
        // 将对象添加到视野列表中
        GameApp.MainPlayer.addViewObj(obj, type);
        msgData.clear();
        msgData = null;
    }

    /**
     * 同步NPC身上的任务状态信息
     * @param data 
     */
    public updateNpcState(data): void {
        let cbpkt = new ProtoCmd.NpcStatsQuestRet(data);
        let npcid = cbpkt.getValue('npcid');
        let npcState = cbpkt.getValue('npcState');
        PanelManage.Main && PanelManage.Main.updateNpcState(npcid, npcState);
    }



    /**
     * 同步怪物和NPC的feature信息
     * @param data 
     */
    public syncNotPlayerFeature(data: any): void {
        let cbPkt = ProtoCmd.AvaterIconDecoder.getInstance();
        cbPkt.read(data);
    }

    /**
     * 玩家进入地图
     * @param data 
     */
    public mapCreatePlayer(data: any): void {
        let msg = new ProtoCmd.MapCreatePlayer(data);
        let tempId = msg.getValue('dwTmpId');
        let type = msg.feature.getValue('btCretType');

        let player: GameObject.Player;
        // 玩家自己
        if (GameApp.MainPlayer.tempId == tempId) {
            player = GameApp.MainPlayer;
        }
        // 其他玩家
        else {
            player = new GameObject.Player();
        }
        // 更新其他信息
        player.tempId = tempId;
        player.objName = msg.getValue('szShowName');
        player.level = msg.getValue('lvl');
        player.lifestate = msg.getValue('lifestate');
        player.dir = msg.getValue('btDir');
        // 更新位置信息
        player.location.clone(msg.location.data);
        // 更新外观信息
        player.feature.clone(msg.feature.data);
        // 更新能力信息
        player.changeHp(msg.getValue('nNowHp'), msg.getValue('nMaxHp'));//血
        player.changeMp(msg.getValue('nNowMp'), msg.getValue('nMaxMp'));//蓝
        player.changeNeigong(msg.getValue('nMaxNG') - msg.getValue('nHasUseNG'), msg.getValue('nMaxNG'));//内功
        // 添加到玩家视野中,不包括自己
        if (!player.isMainPlayer) {
            GameApp.MainPlayer.addViewObj(player, type);
        }
        msg.clear();
        msg = null;
    }

    /**
     * 同步玩家feature
     * @param data 
     */
    public syncPlayerFeature(data): void {
        let cbpkt = ProtoCmd.PlayerIconDecoder.getInstance();
        cbpkt.read(data);
    }

    /**
     * 去除地图内对象
     * @param data 
     */
    public mapRemoveCret(data: any): void {
        let msgData = new ProtoCmd.MapRemoveCret(data);
        let dwTmpId = msgData.getValue('dwTmpId');
        let btCretType = msgData.getValue('btCretType');
        GameApp.MainPlayer.removeViewObj(dwTmpId, btCretType);
        msgData.clear();
    }

    /**
     * 同步玩家的坐标
     * @param data 
     */
    public syncPlayerPosition(data: Laya.Byte): void {
        let cbpkt = new ProtoCmd.CretAfterSpaceMove(data);
        console.log(cbpkt.getValue('dwTmpId'));
        let obj = GameApp.MainPlayer.findViewObj(cbpkt.getValue('dwTmpId'));
        if (obj) {
            obj.dir = cbpkt.getValue('dir');
            obj.location.ncurx = cbpkt.getValue('ncurx');
            obj.location.ncury = cbpkt.getValue('ncury');
            obj.location.ncurz = cbpkt.getValue('ncurz');
            // 更新大地图
            PanelManage.Main.ui_scene.initUI();
        }
        else {
            TipsManage.showTips('同步位置找不到玩家');
        }
    }


    /*****************************************************战斗模块******************************************** */
    // 0x0232
    // 攻击返回包
    public cretAttackRet(data: any): void {
        let msgData = new ProtoCmd.CretAttackRet(data);
        let player = GameApp.MainPlayer;
        let atker = player.findViewObj(msgData.dwTempId);
        if (atker) {
            switch (msgData.btErrorCode) {
                // 检查攻击动作，释放攻击动作,检查CD
                case EnumData.BattleResult.SUCCESS:
                    atker.startAttack();
                    break;
                default:
                    TipsManage.showTips('攻击失败' + msgData.btErrorCode);
                    break;
            }
        }
        else {
            TipsManage.showTips('攻击失败' + '没有找到目标');
        }
        msgData.clear();
        msgData = null;
    }


    // 0x0297
    // 同屏内怪物掉血
    public cretStruck(data: any): void {
        let msg = new ProtoCmd.CretStruck(data);
        let nowhp = msg.getValue('nHp');
        let maxhp = msg.getValue('nMaxHp');
        let actmpid = msg.getValue('dwAcTmpID');
        let tartmpid = msg.getValue('dwTmpId');
        let player = GameApp.MainPlayer;
        // 攻击者
        let atker = player.findViewObj(actmpid);
        // 受伤者
        let targeter = player.findViewObj(tartmpid);
        if (targeter) {
            targeter.onAttack();
            targeter.changeHp(nowhp, maxhp);
        }
        else {
            TipsManage.showTips('没有找到受击对象')
        };
        msg.clear();
        msg = null;
    }


    /** 0x0246
     * 复活死亡消息
     * @param data 
     */
    public cretLifestateChange(data: any): void {
        let msg = new ProtoCmd.CretLifestateChange(data);
        let dwTempID = msg.getValue('dwTempID');
        let lifestate = msg.getValue('curLifeState');
        let targeter = GameApp.MainPlayer.findViewObj(dwTempID);
        switch (lifestate) {
            // 复活
            case 0:
                break;
            // 死亡
            case 1:
                targeter.goDie();
                break;
        }
        msg.clear();
        msg = null;
    }

    /**
     * 技能飞行动作
     * @param data 
     */
    public AvatorSpellDecoderRet(data: Laya.Byte): void {
        let cbpkt = new ProtoCmd.AvatorSpellDecoderRet(data);
        // 施法者
        let dwTempId = cbpkt.getValue('dwTempId');
        // 受击者
        let dwTargetId = cbpkt.getValue('dwTargetId');
        // 技能ID
        let nMagicId = cbpkt.getValue('nMagicId');
        // 花费时间
        let dwActionTick = cbpkt.getValue('dwActionTick');
        let atker = GameApp.MainPlayer.findViewObj(dwTempId);
        atker && atker.showSkill(dwTargetId, nMagicId, dwActionTick);
        cbpkt.clear();
        cbpkt = null;
    }

    /*************************************同步技能状态************************************ */

    /**
     * 更新技能列表
     */
    public updateSkillList(data): void {
        console.log('更新技能列表')
        let cbpkt = new ProtoCmd.AvatarAllSkillsDecoderRet(data);
        for (let skillInfo of cbpkt.skills) {
            let skill = new ProtoCmd.stSkillLvlBase();
            skill.clone(skillInfo.data);
            GameApp.MainPlayer.skillInfo[skill.skillid] = skill;
        }
        cbpkt.clear();
        cbpkt = null;
    }
    /**
     * 更新技能冷却
     * @param data 
     */
    public updateSkillCold(data): void {
        let cbpket = new ProtoCmd.AvatarMagicColdRet(data);
    }
    /**
     * 更新技能状态
     * @param data 
     */
    public updateSkillState(data): void {
        let cbpkt = new ProtoCmd.AvatarSkillAddDecoderRet(data);
        let skill = new ProtoCmd.stSkillLvlBase();
        skill.clone(cbpkt.skilllvl.data);
        GameApp.MainPlayer.skillInfo[skill.skillid] = skill;
        cbpkt.clear();
        cbpkt = null;
    }
    /*************************************同步玩家属性************************************ */

    //0x0234
    /**
     * 玩家血蓝变化
     */
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
        console.log('========>绑定金币', msg.getValue('dwBindGold'));
        TipsManage.showTxt('绑定金币改变了' + msg.getValue('nChanged'));
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
        msg.clear();
        msg = null;
    }
    /**
     * 更新行会积分
     * @param data 
     */
    public updateGuildSorce(data): void {
        let msg = new ProtoCmd.AvatarguildJiFenDecoder(data);
        let player = GameApp.MainPlayer;
        player.changeGuildDedication(msg.getValue('dwJiFen'));
        TipsManage.showTips('公会贡献改变了' + msg.getValue('nChanged'));
        msg.clear();
        msg = null;

    }
    /**
     * 经验 0x0237
     * @param data 
     */
    public cretExpChange(data: any): void {
        let msg = new ProtoCmd.CretExpChange(data);
        let type: EnumData.eEXP_VALUE_TYPE = msg.getValue('nType');
        let nowExp = msg.getValue('i64Exp');
        let addExp = (msg.getValue('dwAdd') as ProtoCmd.Int64).int64ToNumber();
        switch (type) {
            // 更新角色经验
            case EnumData.eEXP_VALUE_TYPE.EXP_VALUE_TYPE_PLAYER:
                GameApp.MainPlayer.changeExp(nowExp);
                TipsManage.showTxt('主角经验改变了' + addExp);
                break;
            // 更新英雄经验
            case EnumData.eEXP_VALUE_TYPE.EXP_VALUE_TYPE_HERO:
                TipsManage.showTxt('英雄经验改变了' + addExp);
                break;
            // 更新BOSS积分
            case EnumData.eEXP_VALUE_TYPE.EXP_VALUE_TYPE_BOSS:
                GameApp.MainPlayer.changeBossCoin(nowExp);
                break;
            //健康
            case EnumData.eEXP_VALUE_TYPE.EXP_VALUE_TYPE_HEALTH:
                GameApp.MainPlayer.changenHealth(nowExp);
                break;
            //精神
            case EnumData.eEXP_VALUE_TYPE.EXP_VALUE_TYPE_SPITIT:
                GameApp.MainPlayer.changenSpirte(nowExp);
                break;
            //体力
            case EnumData.eEXP_VALUE_TYPE.EXP_VALUE_TYPE_TILI:
                GameApp.MainPlayer.changenTili(nowExp);
                break;
            //颜值
            case EnumData.eEXP_VALUE_TYPE.EXP_VALUE_TYPE_PRETTY:
                GameApp.MainPlayer.changenYanZhi(nowExp);
                break;
            //心情
            case EnumData.eEXP_VALUE_TYPE.EXP_VALUE_TYPE_MOOD:
                GameApp.MainPlayer.changenXinQing(nowExp);
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
        let player: GameObject.Player;
        // 玩家等级改变
        if (GameApp.MainPlayer.tempId == dwTempId) {
            player = GameApp.MainPlayer;
        }
        else {
            player = GameApp.MainPlayer.findViewObj(dwTempId, EnumData.CRET_TYPE.CRET_PLAYER) as GameObject.Player;
        }
        if (player) {
            player.changeLevel(level);
            player.changeExp(i64LeftExp, i64MaxExp);
        }
        msg.clear();
        msg = null;
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
        player.changenHealth(msg.getValue('nHealth'));// 健康
        player.changenSpirte(msg.getValue('nSpirte'));// 精神
        player.changenXinQing(msg.getValue('nXinQing'));// 心情
        player.changenTili(msg.getValue('nTili'));// 体力
        player.changenYanZhi(msg.getValue('nYanZhi'));// 颜值
        msg.clear();
        msg = null;
    }




    /*************************************聊天信息************************************ */
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
            PanelManage.Main && PanelManage.Main.updateChatView(msg);
        }
        msg.clear();
        // Laya.Pool.recover("ProtoCmd.CretChat", msg);
    }

    // *********************************************背包相关***************************************

    /**
     * 初始化背包数据
     * @param data 
     */
    public initBag(data: any): void {
        let msg = new ProtoCmd.CretItems(data);
        let bagType: EnumData.PACKAGE_TYPE = msg.getValue('bagType');
        let itemsInfo: Array<ProtoCmd.ItemBase> = msg.items;
        let _bag;
        Log.trace('开始初始化背包', bagType);
        switch (bagType) {
            // 身上穿戴的
            case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_EQUIP:
                _bag = GameApp.GameEngine.equipDB;
                break;
            // 背包里面的
            case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE:
                _bag = GameApp.GameEngine.bagItemDB;
                break;
            // 仓库里面的
            case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_STORE:
                _bag = GameApp.GameEngine.cangKuDB;
                break;
        }
        if (_bag != null) {
            for (let i = 0; i < itemsInfo.length; i++) {
                let idx = itemsInfo[i].i64ItemID.toString();
                let newItem = new ProtoCmd.ItemBase(null);
                newItem.clone(itemsInfo[i].data);
                _bag[idx] = newItem;
                Log.trace('获得物品' + idx);
                // 身上装备索引
                if (bagType == EnumData.PACKAGE_TYPE.ITEMCELLTYPE_EQUIP) {
                    let btIndex = newItem.location.getValue('btIndex');
                    GameApp.GameEngine.equipDBIndex[btIndex] = idx;
                }
            }
        }
        msg.clear();
        msg = null;
    }

    /**
     * 删除背包数据 //0x0301
     * @param data 
     */
    public cretDeleteItem(data: Laya.Byte) {
        let msg = new ProtoCmd.CretDeleteItem(data);
        let i64Id: string = msg.getValue('i64Id').toString();
        let bagType = msg.getValue('bagType');
        let _bag;
        switch (bagType) {
            // 身上穿戴的
            case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_EQUIP:
                _bag = GameApp.GameEngine.equipDB;
                break;
            // 背包里面的
            case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE:
                _bag = GameApp.GameEngine.bagItemDB;
                break;
            // 仓库里面的
            case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_STORE:
                _bag = GameApp.GameEngine.cangKuDB;
                break;
        }
        if (_bag != null && _bag[i64Id]) {
            _bag[i64Id].clear();
            delete _bag[i64Id];
            Log.trace('删除背包物品' + i64Id);
        }
        msg.clear();
        msg = null;
    }

    /**
     * 更新背包数据 //0x0302
     * @param data 
     */
    public cretUpdateItem(data: Laya.Byte) {
        let msg = new ProtoCmd.CretUpdateItem(data);
        let bagType = msg.getValue('bagType');
        let idx = msg.item.i64ItemID.toString();
        let _bag;
        switch (bagType) {
            // 身上穿戴的
            case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_EQUIP:
                _bag = GameApp.GameEngine.equipDB;
                break;
            // 背包里面的
            case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE:
                _bag = GameApp.GameEngine.bagItemDB;
                break;
            // 仓库里面的
            case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_STORE:
                _bag = GameApp.GameEngine.cangKuDB;
                break;
            default:
                throw new Error('背包类型不对');
        }
        if (_bag[idx]) {
            _bag[idx].recoverUI();
            _bag[idx].clone(msg.item.data);
        }
        else {
            let item = new ProtoCmd.ItemBase(null);
            item.clone(msg.item.data);
            _bag[idx] = item;
        }
        Log.trace('===>获得了道具' + idx);
        PanelManage.BeiBao && PanelManage.BeiBao.addItem(bagType, _bag[idx]);
        msg.clear();
        msg = null;
    }

    /**
     * 背包内物品数量改变 0x030A
     * @param data 
     */
    public cretItemCountChanged(data: any): void {
        let msg = new ProtoCmd.CretItemCountChanged(data);
        let bagType = msg.getValue('bagType');
        let i64id = msg.getValue('i64Id').toString();
        let dwCount = msg.getValue('dwCount');//数量
        let _bag;
        switch (bagType) {
            // 身上穿戴的
            case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_EQUIP:
                _bag = GameApp.GameEngine.equipDB;
                break;
            // 背包里面的
            case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE:
                _bag = GameApp.GameEngine.bagItemDB;
                break;
            // 仓库里面的
            case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_STORE:
                _bag = GameApp.GameEngine.cangKuDB;
                break;
        }
        if (_bag && _bag[i64id]) {
            let _itemBase: ProtoCmd.ItemBase = _bag[i64id];
            _itemBase.setValue('dwCount', dwCount);
            _itemBase.dwCount = dwCount;
            // 更新UI
            _itemBase.ui_item && _itemBase.ui_item.updateDwCount();
        }
        Log.trace('物品数量改变', _bag[i64id].dwBaseID, dwCount);
        msg.clear();
        msg = null;
    }
    /**
     * 删除地图物品 0x029D
     * @param data 
     */
    public mapItemEventDel(data: any): void {
        let msg = new ProtoCmd.MapItemEventDel(data);
        let key = msg.getValue('i64ItemID').int64ToStr();
        let itemInfo: ProtoCmd.ItemBase = GameApp.MainPlayer.allItem[key]
        if (itemInfo) {
            itemInfo.clear();
        }
        delete GameApp.MainPlayer.allItem[key];
        msg.clear();
        msg = null;
    }

    /**
     * 地图上添加物品 0x02B8
     * @param data 
     */
    public mapItemEventAdd(data: any): void {
        let msg = new ProtoCmd.MapItemEventAdd(data);
        let itemInfo = new ProtoCmd.ItemBase()
        itemInfo.i64ItemID = msg.getValue('i64ItemID');
        itemInfo.dwBaseID = msg.getValue('dwBaseID');
        itemInfo.dwCount = msg.getValue('dwCount');
        itemInfo.btQuality = msg.getValue('btQuality');
        // let itemUI = new view.compart.DaoJuWithNameItem();
        // itemUI.setData(itemInfo);
        GameApp.MainPlayer.allItem[itemInfo.i64ItemID.int64ToStr()] = itemInfo;
        msg.clear();
        msg = null;
    }

    /*******************************************************好友信息******************************************* */
    /**
     * 添加一个好友信息
     */
    public addFriend(data: Laya.Byte): void {
        let msg = new ProtoCmd.stRelationAddFriend(data);
        let Type = msg.getValue('btType');
        let _friend;
        switch (Type) {
            // 好友
            case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_EQUIP:
                _friend = GameApp.GameEngine.friendDB;
                break;
            // 黑名单
            case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE:
                _friend = GameApp.GameEngine.blackDB;
                break;
            // 仇人
            case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_STORE:
                _friend = GameApp.GameEngine.chouRenDB;
                break;
            default:
                throw new Error('好友类型不对');
        }
    }
    /**
    * 向添加人发出询问
    */
    public addFriendAsk(data: Laya.Byte): void {
        let msg = new ProtoCmd.stRelationAddQuery(data);
        let asks = new view.dialog.FriendCheckDialog();
        asks.setData(msg.getValue('szName'), msg.getValue('dwLevel')).popup(true);
    }
    /**
      * 回答关系添加结果(only 好友)
      */
    public addFriendAskResult(data: Laya.Byte): void {
        let msg = new ProtoCmd.stRelationAddAnswerQuery(data);
        if (msg.getValue('boAgree')) {
            TipsManage.showTips('你成功添加' + msg.getValue('szName'));
        }
        else {
            TipsManage.showTips('添加失败');
        }
    }
    /*******************************************************组队信息******************************************* */
    /**
   * 向队长发出询问
   */
    public addTeamAsk(data: Laya.Byte): void {
        let msg = new ProtoCmd.TeamAgreeJoinEncoder(data);
        let asks = new view.dialog.TeamApplyCheckDialog();
        asks.setData(msg).popup(true);
    }
    /**
   * 回答申请加入队伍请求
   */
    public allowTeam(data: Laya.Byte): void {
        let msg = new ProtoCmd.TeamAgreeJoinDecoder(data);
        if (msg.getValue('boAllow')) {
            TipsManage.showTips(msg.getValue('szName') + '已成功加入您的队伍');
            let a = new view.team.TeamPanel();
            a.myTeam();
        }
        else {
            TipsManage.showTips('拒绝' + msg.getValue('szName') + '加入');
        }
    }
    /*******************************************************行会信息******************************************* */
    /**
     * 同步行会信息
     */
    public syncBangPaiInfo(data): void {
        let cbpkt = new ProtoCmd.stGlobalGuildChangeGuildRet(data);
        let guildInfo = cbpkt.guildSinfo;
        GameApp.MainPlayer.guildInfo.dwID = guildInfo.dwGuildId;//更新行会ID
        GameApp.MainPlayer.guildInfo.szName = guildInfo.szGuildName;//更新行会名字
        GameApp.MainPlayer.guildInfo.dwCurExp = guildInfo.dwCurExp;//更新行会当前经验
        GameApp.MainPlayer.guildInfo.dwLevelUpExp = guildInfo.dwLevelUpExp;//更新行会升级经验上限
        GameApp.MainPlayer.guildInfo.dwLevel = guildInfo.dwGuildLevel;//更新行会等级

        cbpkt.clear();
        cbpkt = null
    }

    /**
     * 有人申请帮派红点提示
     * @param data 
     */
    public RED_NOTICE_applyBangPai(data): void {
        let cbpkt = new ProtoCmd.stGuildApply(data);
        let btState = cbpkt.getValue('btState');
        if (btState > 0) {
            // 有红点提示
        }
        else {
            // 去除红点提示
        }
    }

    /**********************************任务信息********************************* */
    /**
     * 服务器推送所有已有任务
     */
    public updateTaskInfo(data): void {
        let cbpket = new ProtoCmd.stQuestLoginRet(data);
        console.log('同步了任务信息' + cbpket.questinfos.length);
        for (let task of cbpket.questinfos) {
            let _item = new ProtoCmd.stQuestInfoBase();
            _item.clone(task.data);
            if (GameApp.GameEngine.taskInfo[_item.questtype] == null) {
                GameApp.GameEngine.taskInfo[_item.questtype] = {};
            };
            GameApp.GameEngine.taskInfo[_item.questtype][_item.taskid] = _item;
            switch (_item.questtype) {
                case EnumData.TaskType.SYSTEM:
                    PanelManage.Main && PanelManage.Main.updateTaskInfo();
                    break;
            }
        }
    }

    /**
     * 欢迎界面领取第一个主线任务
     * @param data 
     */
    public openWelcomePanel(): void {
        // 判定等级和任务情况，是否触发（等级1级 任务为空，领取第一个主线任务）
        if (Object.keys(GameApp.GameEngine.taskInfo).length == 0) {
            new view.dialog.WelcomeDialog().setData().popup(true);
        }

    }
    /**
     * 服务器推送创建任务
     * @param data 
     */
    public addTaskInfo(data): void {
        let cbpket = new ProtoCmd.stQuestCreateRet(data);
        let _item = new ProtoCmd.stQuestInfoBase();
        _item.clone(cbpket.info.data);
        console.log('新增了任务信息：' + _item.taskid);
        if (GameApp.GameEngine.taskInfo[_item.questtype] == null) {
            GameApp.GameEngine.taskInfo[_item.questtype] = {};
        }
        GameApp.GameEngine.taskInfo[_item.questtype][_item.taskid] = _item;
        switch (_item.questtype) {
            case EnumData.TaskType.SYSTEM:
                PanelManage.Main && PanelManage.Main.updateTaskInfo();
                break;
        }
        cbpket.clear();
        cbpket = null;
    }


    /****************************************剧情相关********************************* */
    /**
     * 服务器推送更新剧情信息
     */
    public updatePlayerJuQingInfo(data: ProtoCmd.itf_JUQING_SELFINFO): void {
        GameApp.MainPlayer.changeJuQingInfo(data);
    }

    /***************************************LUA消息分发****************************** */
    /**
     * 服务器返回的lua脚本数据
     * @param data 
     */
    public questServerDataRet(data: any): void {
        let msg = new ProtoCmd.QuestServerDataRet(data);
        let strArr = msg.str.split('`');
        if (strArr.length != 4) {
            console.log('=====>', strArr)
            // throw new Error("questServerDataRet" + '长度错误');
        }
        let infoType = strArr[0];// 大类标识
        let funcName = strArr[1];// 调用的函数名称
        let msgID = 0;// 函数内小协议包
        console.log(strArr);
        // TODO
        try {
            let jsonData = JSON.parse(strArr[strArr.length - 1]);// json数据
            switch (strArr.length) {
                case 4:
                    msgID = parseInt(strArr[2]);
                    break;
            }
            let eventName = funcName;
            if (msgID) {
                eventName += '_' + msgID;
            }
            // 抛出事件
            GameApp.LListener.event(eventName, [jsonData]);
            msg.clear();
            msg = null;
        }
        catch (e) {

        }

    }

    /**
     * 客户端设置
     * @param data 
     */
    public clientSetData(data: any): void {

    }
    /**
     * 打开界面
     * @param data 
     */
    public openPanel(data: string): void {
        switch (data) {
            // 充值界面
            case ProtoCmd.CZ_chongzhidialog:
                new view.dialog.ChongZhiNoticeDialog().setData().popup(true);
                break;
            // 首冲界面
            case ProtoCmd.CZ_weichongzhidialog:
                new view.dialog.ChongZhiNoticeDialog().setData().popup(true);
                break;
        }
    }

    public recvTypeKeyValue(data: any): void {
        let msg = new ProtoCmd.RecvTypeKeyValue(data);

        msg.clear();
    }
}

