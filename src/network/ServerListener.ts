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
        // 新手引导进度
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.SUBCMD_QUESTBOOLDATA), this, this.updateQuestBoolData);
        // 玩家改变地图ID 201
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.PlayerChangeMap), this, this.playerChangeMap);
        // 地图创建怪物和NPC 202
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.MapCreateCret), this, this.mapCreateCret);
        // 地图同步NPC的任务状态
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.NpcStatsQuestRet), this, this.updateNpcState);
        // 地图删除怪物 203
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.MapRemoveCret), this, this.mapRemoveCret);
        // 创建地图其他玩家 206
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.MapCreatePlayer), this, this.MapCreateNewPlayer);
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
        /************************************背包内道具********************************************* */
        // 背包内道具移动
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.CretProcessingItem), this, this.itemLocationChange);

        /*************************************技能相关************************************************ */
        // 推送技能列表
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.AvatarAllSkillsDecoderRet), this, this.updateSkillList);
        // 推送技能冷却
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.AvatarMagicColdRet), this, this.updateSkillCold);
        // 推送技能更改状态
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.AvatarSkillAddDecoderRet), this, this.updateSkillState);
        // 拉取设置技能快捷键信息 0295
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.AvatarSetSkillShortCutsEnDeCoder), this, this.addSkillShortButton);
        // 删除技能快捷键信息 0296
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.AvatarDelSkillShortCutsEnDeCoder), this, this.delSkillShortButton);

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
        // 更新弟子和角色属性
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.UpdateCurHeroInfo), this, this.updateHeroInfo);
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
        //退出队伍
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.TeamQuitDecoder), this, this.outTeam);
        //邀请加入队伍
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.TeamInviteEnDecoder), this, this.invitTeam);
        //回答邀请加入队伍结果
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.TeamAgreeInviteEnDecoder), this, this.allowInvitTeam);
        //队长踢出队伍
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.TeamKickoutDecoder), this, this.outedTeam);
        /***********************************行会信息********************************* */
        // 同步行会信息
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.stGlobalGuildChangeGuildRet), this, this.syncBangPaiInfo);
        // 有人申请公会通知，红点提示
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.stGuildApply), this, this.RED_NOTICE_applyBangPai);
        // 服务器扩展脚本 0x0919
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.QuestServerDataRet), this, this.questServerDataRet);
        // 客户端本地设置 2aa
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.ClientSetData), this, this.clientSetData);
        /***********************************弟子相关信息********************************* */


        /***********************************任务信息*************************************** */
        // 监听任务信息
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.stQuestLoginRet), this, this.updateTaskInfo);
        // 服务器推送创建新任务1 主线-剧情
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.stQuestCreateRet), this, this.addTaskInfo_V1);
        // 服务器推送创建新任务2 能接未接任务
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.stQuestSendQuestInfoRet), this, this.addTaskInfo_V2);
        // 改变任务状态和描述
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.stQuestDoingRet), this, this.changeTaskState);
        // 只改变任务状态
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.stQuestFinishRet), this, this.changeOnlyTaskState);

        /***********************************剧情信息**************************************** */
        // 改变剧情相关数据
        GameApp.LListener.on(ProtoCmd.JQ_GET_JQ_SELF_INFO, this, this.updatePlayerJuQingInfo);

        /**********************************服务器打开面板全局监听**************************** */
        // 新玩家进入游戏打开欢迎界面
        GameApp.LListener.once(ProtoCmd.NEW_PLAYER_WelcomeDialog, this, this.openWelcomePanel);
        // 正常充值提示界面
        GameApp.LListener.on(ProtoCmd.CZ_OPEN_chongzhidialog, this, this.openPanel, [ProtoCmd.CZ_OPEN_chongzhidialog]);
        // 首次充值提示界面
        GameApp.LListener.on(ProtoCmd.CZ_OPEN_weichongzhidialog, this, this.openPanel, [ProtoCmd.CZ_OPEN_weichongzhidialog]);
        // 剧情事件提示面板
        GameApp.LListener.on(ProtoCmd.JQ_OPEN_JuQingEventDialog, this, this.openPanel, [ProtoCmd.JQ_OPEN_JuQingEventDialog]);
        // 监听图鉴信息
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.RecvTypeKeyValue), this, this.recvTypeKeyValue);
        //PKModel
        GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.CretPkModel), this, this.changePkModel);

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
        realLogin.setValue('szAccount', GameApp.MainPlayer.playerAccount);
        realLogin.setValue('szPlayerName', GameApp.MainPlayer.objName);
        realLogin.setValue('dwTrueZoneid', GameApp.GameEngine.trueZoneid);
        realLogin.setValue('dwUserOnlyId', GameApp.GameEngine.mainPlayer.onlyId);
        //realLogin.setValue('btReloginType', 2);
        realLogin.setValue('loginsvr_id_type', GameApp.GameEngine.loginsvrIdType);
        realLogin.setValue('tokencheck', GameApp.GameEngine.tokenCheck);
        realLogin.setValue('gamesvr_id_type', GameApp.GameEngine.gamesvrIdType);
        realLogin.setValue('logintoken', GameApp.GameEngine.logintoken);
        // 正式进入游戏
        lcp.send(realLogin, this, this.userRealLogin);
        let accounts = GameApp.GameEngine.mainPlayer.playerAccount.split('@');
        GameApp.HttpManager.postJson('name=playerLogin',
            {
                account: accounts[0],
                username: GameApp.GameEngine.mainPlayer.objName,
                zoneId: GameApp.GameEngine.zoneid,
                trueZoneId: GameApp.GameEngine.trueZoneid,
                tradeId: GameApp.GameEngine.tradeid
            },
            (res) => {
                // console.log('post json response=', res);
            });
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
        TipsManage.showTxt(cbpkt.tipmsg);
        console.log(cbpkt.tipmsg)
        cbpkt.clear();
        cbpkt = null;
    }

    /**
     * 新手引导存储数据
     * @param data 
     */
    public updateQuestBoolData(data): void {
        let pkt = new ProtoCmd.SUBCMD_QUESTBOOLDATA(data);
        GameApp.GameEngine.questBoolData = new Laya.Byte(pkt.getValue('value').buffer).getUint8Array(0, 256);
        pkt.clear();
        pkt = null;
    }

    /**
     * 正式登陆成功
     * @param data 
     */
    public userRealLogin(data: any): void {
        let msgData = new ProtoCmd.UserRealLoginRet(data);
        if (msgData.getValue('nErrorCode') == 0) {
            Log.trace('游戏登陆成功');
        }
        else {
            Log.trace('游戏重连失败');
        }
        msgData.clear();
    }

    /**
     * 刷新自己地图信息，改变地图ID
     * @param data 
     */
    public playerChangeMap(data: any): void {
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
        // 清空视野
        player.clearViewObj();
        console.log('=====已经改变了地图ID======');
        console.log('===isFirstCreate===', msgData.getValue('isFirstCreate'))
        // 非创建角色
        if (!msgData.getValue('isFirstCreate') || GameApp.GameEngine.isReady) {
            PanelManage.openMainPanel();
        }
        // 更新UI布局
        PanelManage.Main && PanelManage.Main.loadScene();
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
            // npc
            case EnumData.CRET_TYPE.CRET_NPC:
                obj = new GameObject.Npc();
                break;
            // 怪物
            case EnumData.CRET_TYPE.CRET_MONSTER:
                obj = new GameObject.Monster();
                break;
            // 英雄
            case EnumData.CRET_TYPE.CRET_HERO:
                // 判断是否是自己
                let masterId = msgData.feature.dwMasterTmpID;
                // 是自己不用创建
                if (masterId == GameApp.MainPlayer.tempId) {
                    switch (msgData.feature.simpleFeature.job) {
                        // 战士
                        case EnumData.JOB_TYPE.JOB_WARRIOR:
                            obj = GameApp.MainPlayer.hero1;
                            break;
                        // 法师
                        case EnumData.JOB_TYPE.JOB_MAGE:
                            obj = GameApp.MainPlayer.hero2;
                            break;
                        // 道士
                        case EnumData.JOB_TYPE.JOB_MONK:
                            obj = GameApp.MainPlayer.hero3;
                            break;
                    }
                }
                // 其他玩家需要创建
                else {
                    obj = new GameObject.Hero();
                }
                break;
        }
        obj.objName = obj.filterName(szShowName);
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
     * 地图ID改变后，创建玩家角色。包括自己和其他人
     * @param data 
     */
    public MapCreateNewPlayer(data: any): void {
        let msg = new ProtoCmd.MapCreatePlayer(data);
        let tempId = msg.getValue('dwTmpId');
        let type = msg.feature.getValue('btCretType');

        let player;
        // 玩家自己
        if (GameApp.MainPlayer.tempId == tempId) {
            player = GameApp.MainPlayer;
        }
        // 其他玩家
        else {
            player = new GameObject.OtherPlayer();
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
        // 自己进入地图，加载ui_scene.
        // 只会调用一次，创建自己的角色。
        // 这里可以拉取数据
        if (player.isMainPlayer) {
            console.log('====自己进入了地图====');
        }
        // 其他玩家进入地图，添加到玩家视野中,不包括自己
        else {
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
        console.log(dwTmpId, btCretType, '离开地图');
        GameApp.MainPlayer.removeViewObj(dwTmpId, btCretType);
        msgData.clear();
    }

    /**
     * 同步玩家的坐标
     * @param data 
     */
    public syncPlayerPosition(data: Laya.Byte): void {
        let cbpkt = new ProtoCmd.CretAfterSpaceMove(data);
        let obj = GameApp.MainPlayer.findViewObj(cbpkt.getValue('dwTmpId')) as GameObject.Player;
        if (obj) {
            obj.dir = cbpkt.getValue('dir');
            obj.location.ncurx = cbpkt.getValue('ncurx');
            obj.location.ncury = cbpkt.getValue('ncury');
            obj.location.ncurz = cbpkt.getValue('ncurz');
            // 刷新UI上的坐标
            obj.ui_item && obj.ui_item.updateUI();
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
        let atker: GameObject.Monster = player.findViewObj(msgData.dwTempId);
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
        let npower = msg.getValue('npower');
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
            TipsManage.showTxt('HP--' + npower);
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
        console.log('' + dwTempID + '死亡了');
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

    /**
     * 添加技能快捷键信息
     * @param data 
     */
    public addSkillShortButton(data): void {
        let cbpkt = new ProtoCmd.AvatarSetSkillShortCutsEnDeCoder(data);
        if (cbpkt.getValue('ErrorCode') == 0) {
            // console.log('===========',cbpkt);
            let shot = new ProtoCmd.stShortCuts();
            shot.clone(cbpkt.shortcuts.data);
            // 存储技能快捷键
            GameApp.MainPlayer.skillShotButton[shot.btRow] = shot;
        }
        else {
            TipsManage.showTips('技能快捷键失败')
        }
        cbpkt.clear();
    }

    /**
     * 删除技能快捷键
     * @param data 
     */
    public delSkillShortButton(data): void {
        let cbpkt = new ProtoCmd.AvatarDelSkillShortCutsEnDeCoder(data);
        if (cbpkt.getValue('ErrorCode')) {
            delete GameApp.MainPlayer.skillShotButton[cbpkt.shortcuts.btRow];
        }
        else {
            TipsManage.showTips('删除失败')
        }
        cbpkt.clear();
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
        TipsManage.showTxt('公会贡献改变了' + msg.getValue('nChanged'));
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
        let nowExp = msg.getValue('i64Exp').int64ToNumber();;
        let addExp = (msg.getValue('dwAdd') as ProtoCmd.Int64).int64ToNumber();
        switch (type) {
            // 更新角色经验
            case EnumData.eEXP_VALUE_TYPE.EXP_VALUE_TYPE_PLAYER:
                GameApp.MainPlayer.changeExp(nowExp.int64ToNumber());
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
                console.log('颜值改变了' + nowExp);
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
        let i64LeftExp = msg.getValue('i64LeftExp').int64ToNumber();;
        let i64MaxExp = msg.getValue('i64MaxExp').int64ToNumber();;
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

        GameApp.SDKManager.upgradeRole();
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
        console.log('-cretAbility-', dwType, dwTempId);
        if (dwTempId == player.tempId) {
            switch (dwType) {
                // 玩家
                case EnumData.PlayerAndHeroType.Player:
                    player.changeAbility(ability);
                    GameApp.LListener.event(LcpEvent.UPDATE_UI_PLAYER_ABILITY);
                    player.changeFight(fightPower);
                    GameApp.LListener.event(LcpEvent.UPDATE_UI_PLAYER_POWER);
                    break;
                // 英雄战士
                case EnumData.PlayerAndHeroType.Hero1:
                    player.hero1.changeAbility(ability);
                    GameApp.LListener.event(LcpEvent.UPDATE_UI_HERO_ABILITY, dwType);
                    player.hero1.changeFight(fightPower);
                    GameApp.LListener.event(LcpEvent.UPDATE_UI_HERO_POWER, dwType);
                    break;
                // 英雄法师
                case EnumData.PlayerAndHeroType.Hero2:
                    player.hero2.changeAbility(ability);
                    GameApp.LListener.event(LcpEvent.UPDATE_UI_HERO_ABILITY, dwType);
                    player.hero2.changeFight(fightPower);
                    GameApp.LListener.event(LcpEvent.UPDATE_UI_HERO_POWER, dwType);
                    break;
                // 英雄道士
                case EnumData.PlayerAndHeroType.Hero3:
                    player.hero3.changeAbility(ability);
                    GameApp.LListener.event(LcpEvent.UPDATE_UI_HERO_ABILITY, dwType);
                    player.hero3.changeFight(fightPower);
                    GameApp.LListener.event(LcpEvent.UPDATE_UI_HERO_POWER, dwType);
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
        let cbpkt = new ProtoCmd.CretPlayerAbility(data);
        GameApp.MainPlayer.changeAbility(cbpkt.ability);
        cbpkt.clear();
        cbpkt = null;
    }

    /**
     * 初始化玩家基本属性
     * @param data 
     */
    public cretCharBase(data: any): void {
        let msg = new ProtoCmd.CretCharBase(data);
        let player = GameApp.MainPlayer;
        player.changeExp(msg.i64NowExp.int64ToNumber(), msg.i64MaxExp.int64ToNumber());//经验
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
        player.changeNowFame(msg.i64Fame.int64ToNumber());//当前声望
        player.changeMaxTotalFame(msg.i64TotalFame.int64ToNumber());//累计声望
        player.changeNeigong(msg.getValue('nNeigongnum'), msg.getValue('nNeigongMax'));//内功
        player.changeFight(msg.getValue('nFight'));// 战斗力
        player.changenHealth(msg.getValue('nHealth'));// 健康
        player.changenSpirte(msg.getValue('nSpirte'));// 精神
        player.changenXinQing(msg.getValue('nXinQing'));// 心情
        player.changenTili(msg.getValue('nTili'));// 体力
        player.changenYanZhi(msg.getValue('nYanZhi'));// 颜值
        player.changeHeroMaxExp(msg.getValue('i64MaxHeroExp'));// 英雄最大经验
        msg.clear();
        msg = null;
        GameApp.SDKManager.loginRole();
    }

    /**
     * 切换弟子，更新弟子相关属性
     * @param data 
     */
    public updateHeroInfo(data: any): void {
        let msg = new ProtoCmd.UpdateCurHeroInfo(data);
        //GM等级
        GameApp.GameEngine.GMlvl = msg.getValue("btGmLv");
        //英雄职业
        let job = msg.getValue("btHeroJob");
        //英雄性别
        let sex = msg.getValue("btHeroSex");
        switch (job) {
            case EnumData.JOB_TYPE.JOB_WARRIOR:
                GameApp.MainPlayer.curHero = GameApp.MainPlayer.hero1;
                break;
            case EnumData.JOB_TYPE.JOB_MAGE:
                GameApp.MainPlayer.curHero = GameApp.MainPlayer.hero2;
                break;
            case EnumData.JOB_TYPE.JOB_MONK:
                GameApp.MainPlayer.curHero = GameApp.MainPlayer.hero3;
                break;
        }
        if (GameApp.MainPlayer.curHero) {
            //英雄转生等级
            GameObject.Hero.zslevel = msg.getValue("btHeroRlvl");
            //英雄等级
            GameObject.Hero.level = msg.getValue("wHeroLvl");
            //英雄状态
            GameApp.MainPlayer.curHero.lifestate = msg.getValue("btHeroState");
            //英雄复活时间戳
            GameApp.MainPlayer.curHero.rebornLeftTime = msg.getValue("dwReliveTime");
        }
        //角色转生等级
        GameApp.MainPlayer.zslevel = msg.getValue("btMainRlvl");
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
                // 身上穿的装备要同步位置
                GameApp.GameEngine.equipDBIndex[msg.item.location.btIndex] = idx;
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
            let item = new ProtoCmd.ItemBase();
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

    /**
     * 道具位置移动 包裹-身上-仓库
     * 
     * @param data 
     */
    public itemLocationChange(data: any): void {
        let msg = new ProtoCmd.CretProcessingItem(data);
        let errorcode = msg.getValue('nErrorCode');
        let i64ItemId = msg.getValue('i64ItemId').toString();
        let src_btIndex = msg.srcLocation.btIndex;
        let src_btLocation = msg.srcLocation.btLocation;
        let des_btIndex = msg.destLocation.btIndex;
        let des_btLocation = msg.destLocation.btLocation;
        let _itemBase: ProtoCmd.ItemBase;
        if (errorcode == 0) {
            // 根据来源找到装备的itembase
            switch (src_btLocation) {
                // 从仓库操作
                case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_STORE:
                    _itemBase = GameApp.GameEngine.cangKuDB[i64ItemId];
                    break;
                // 玩家身上装备操作
                case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_EQUIP:
                    _itemBase = GameApp.GameEngine.equipDB[i64ItemId];
                    break;
                // 背包内操作
                case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE:
                    _itemBase = GameApp.GameEngine.bagItemDB[i64ItemId];
                    break;
            }
            if (_itemBase) {
                // 重置位置属性
                _itemBase.location = msg.destLocation;
                // 清除绑定的UI
                _itemBase.recoverUI();
                // 位置分情况处理
                switch (des_btLocation) {
                    // 放入仓库
                    case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_STORE:
                        GameApp.GameEngine.cangKuDB[i64ItemId] = _itemBase;
                        delete GameApp.GameEngine.bagItemDB[i64ItemId];
                        PanelManage.BeiBao && PanelManage.BeiBao.addItem(EnumData.PACKAGE_TYPE.ITEMCELLTYPE_STORE, _itemBase);
                        TipsManage.showTips('放入仓库成功');
                        break;

                    // 放回背包
                    case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE:
                        switch (src_btLocation) {
                            // 从仓库取出 放回背包
                            case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_STORE:
                                GameApp.GameEngine.bagItemDB[i64ItemId] = _itemBase;
                                delete GameApp.GameEngine.cangKuDB[i64ItemId];
                                PanelManage.BeiBao && PanelManage.BeiBao.addItem(EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE, _itemBase);
                                PanelManage.BeiBao && PanelManage.BeiBao.updateCangKuInfo();
                                TipsManage.showTips('取出仓库成功');
                                break;
                            // 装备卸下
                            case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_EQUIP:
                                // 清除装备位置索引
                                delete GameApp.GameEngine.equipDBIndex[src_btIndex];
                                GameApp.GameEngine.bagItemDB[i64ItemId] = _itemBase;
                                delete GameApp.GameEngine.equipDB[i64ItemId];
                                // 更新背包UI
                                PanelManage.BeiBao && PanelManage.BeiBao.addItem(EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE, _itemBase)
                                TipsManage.showTips('装备卸下成功');
                                break;
                        }
                        break;


                    // 穿戴装备
                    case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_EQUIP:
                        // 是否替换判断
                        let old_i64ItemId = GameApp.GameEngine.equipDBIndex[des_btIndex];
                        if (old_i64ItemId) {
                            let old_itemBase = GameApp.GameEngine.equipDB[old_i64ItemId];
                            if (old_itemBase) {
                                old_itemBase.recoverUI();
                                old_itemBase.location.btIndex = src_btIndex;
                                old_itemBase.location.btLocation = src_btLocation;
                                GameApp.GameEngine.bagItemDB[old_i64ItemId] = old_itemBase;
                                delete GameApp.GameEngine.equipDB[old_i64ItemId];
                                delete GameApp.GameEngine.equipDBIndex[des_btIndex];
                                // 向背包中添加物品
                                PanelManage.BeiBao && PanelManage.BeiBao.addItem(EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE, old_itemBase);
                            }
                        }
                        // 清除绑定的UI
                        GameApp.GameEngine.equipDB[i64ItemId] = _itemBase;
                        GameApp.GameEngine.equipDBIndex[des_btIndex] = i64ItemId;
                        // 根据装备部位 UI刷新
                        let nowIndex = _itemBase.location.btIndex;
                        let updateTabIndex = 0;
                        // 角色身上装备
                        if (nowIndex >= EnumData.emEquipPosition.EQUIP_HEADDRESS && nowIndex <= EnumData.emEquipPosition.EQUIP_BELT) {
                            updateTabIndex = 0;
                        }

                        // 英雄战士
                        else if (nowIndex >= EnumData.emEquipPosition.EQUIP_HERO_WARRIOR_HEADDRESS && nowIndex <= EnumData.emEquipPosition.EQUIP_HERO_WARRIOR_BELT) {
                            updateTabIndex = 1;
                        }

                        // 英雄法师
                        else if (nowIndex >= EnumData.emEquipPosition.EQUIP_HERO_MAGE_HEADDRESS && nowIndex <= EnumData.emEquipPosition.EQUIP_HERO_MAGE_BELT) {
                            updateTabIndex = 2;
                        }

                        // 英雄道士
                        else if (nowIndex >= EnumData.emEquipPosition.EQUIP_HERO_MONK_HEADDRESS && nowIndex <= EnumData.emEquipPosition.EQUIP_HERO_MONK_BELT) {
                            updateTabIndex = 3;
                        }

                        if (PopUpManager.curPanel == PanelManage.BeiBao) {
                            if (PanelManage.BeiBao.ui_equipInfo.tab_0.selectedIndex == updateTabIndex) {
                                PanelManage.BeiBao.ui_equipInfo.updateUI();
                            }
                            else {
                                PanelManage.BeiBao.ui_equipInfo.tab_0.selectedIndex = updateTabIndex;
                            }
                        }

                        if (Laya.Dialog.getDialogsByGroup('ZhaiYuan_lianQiDialog').length > 0) {
                            GameApp.LListener.event(LcpEvent.UPDATE_UI_LIANQI_CHUANSHI_UI);
                        }

                        delete GameApp.GameEngine.bagItemDB[i64ItemId];
                        TipsManage.showTips('装备穿戴成功');
                        break;
                }
            }
            else {
                // TipsManage.showTips('找不到对应的装备itemBase');
            }
        }
        else {
            let errDes = LangConfig.emItemErrorCodeDes[EnumData.emItemErrorCode[errorcode]]
            TipsManage.showTips(errDes + errorcode);
        }
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
        let asks = new view.friend.FriendCheckDialog();
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
        let asks = new view.team.TeamApplyCheckDialog();
        asks.setData(msg).popup(true);
    }
    /**
   * 回答申请加入队伍请求
   */
    public allowTeam(data: Laya.Byte): void {
        let msg = new ProtoCmd.TeamAgreeJoinDecoder(data);
        if (msg.getValue('boAllow')) {
            TipsManage.showTips(msg.getValue('szName') + '已成功加入您的队伍');
            PanelManage.Team.myTeam();
        }
        else {
            TipsManage.showTips('拒绝' + msg.getValue('szName') + '加入');
        }
    }
    /**
 *离队返回
 */
    public outTeam(data: Laya.Byte): void {
        let msg = new ProtoCmd.TeamAgreeJoinEncoder(data);
        PanelManage.Team.myTeam();
        TipsManage.showTips('您已离开队伍');
    }
    /**
* 邀请加入队伍
*/
    public invitTeam(data: Laya.Byte): void {
        let msg = new ProtoCmd.TeamInviteEnDecoder(data);
        let asks = new view.team.TeamInvitCheckDialog();
        asks.setData(msg).popup(true);
    }
    /**
  * 回答邀请加入队伍
  */
    public allowInvitTeam(data: Laya.Byte): void {
        let msg = new ProtoCmd.TeamAgreeInviteEnDecoder(data);
        if (msg.getValue('boAllow')) {
            TipsManage.showTips('已成功邀请加入队伍');
            PanelManage.Team.myTeam();
        }
        else {
            TipsManage.showTips('拒绝加入');
        }
    }
    /**
*队长踢出队伍
*/
    public outedTeam(data: Laya.Byte): void {
        let msg = new ProtoCmd.TeamKickoutDecoder(data);
        PanelManage.Team.myTeam();
        TipsManage.showTips('您已被踢出队伍');
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
                // 主线任务
                case EnumData.TaskType.SYSTEM:
                    PanelManage.Main && PanelManage.Main.updateTaskInfo();
                    break;
                // 剧情任务
                case EnumData.TaskType.JUQINGEVENT:

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
     * 服务器推送创建任务（已接任务）
     * @param data 
     */
    public addTaskInfo_V1(data): void {
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
            // 剧情任务
            case EnumData.TaskType.JUQINGEVENT:
                // PanelManage.JuQingMode && PanelManage.JuQingMode.showJuQingEvent();
                break;
        }
        cbpket.clear();
        cbpket = null;
    }

    /**
     * 服务器推送创建任务（能接未接任务）
     * @param data 
     */
    public addTaskInfo_V2(data): void {
        let cbpket = new ProtoCmd.stQuestSendQuestInfoRet(data);
        let _item = new ProtoCmd.stQuestInfoBase();
        _item.clone(cbpket.info.data);
        console.log('新增了任务信息：' + _item.taskid);
        if (GameApp.GameEngine.taskInfo[_item.questtype] == null) {
            GameApp.GameEngine.taskInfo[_item.questtype] = {};
        }
        GameApp.GameEngine.taskInfo[_item.questtype][_item.taskid] = _item;
        cbpket.clear();
        cbpket = null;
    }




    /**
     * 改变任务信息
     * @param data 
     */
    public changeTaskState(data): void {
        let cbpket = new ProtoCmd.stQuestDoingRet(data);
        let keys = Object.keys(GameApp.GameEngine.taskInfo);
        let taskid = cbpket.getValue('taskid');
        for (let key of keys) {
            let taskGroup = GameApp.GameEngine.taskInfo[key];
            let taskInfo: ProtoCmd.stQuestInfoBase = taskGroup[taskid];
            if (taskInfo) {
                console.log('更新了任务' + taskid);
                let queststatus = cbpket.getValue('queststatus')
                taskInfo.targetdes = cbpket.targetDes;
                taskInfo.des = cbpket.des;
                taskInfo.queststatus = queststatus;
                switch (queststatus) {
                    // 任务完成通知
                    case EnumData.QUESTSTATUS.QUESTCOMPLETED:
                    case EnumData.QUESTSTATUS.QUESTMALLCOMPLETED:
                        new view.task.Task_CompleteDialog().setData(taskInfo).popup(true);
                        break;
                }
                break;
            }
        }
        cbpket.clear();
        cbpket = null;
    }

    /**
     * 只改变任务状态
     * @param data 
     */
    public changeOnlyTaskState(data): void {
        let cbpket = new ProtoCmd.stQuestFinishRet(data);
        let keys = Object.keys(GameApp.GameEngine.taskInfo);
        for (let key of keys) {
            let taskGroup = GameApp.GameEngine.taskInfo[key];
            let taskInfo: ProtoCmd.stQuestInfoBase = taskGroup[cbpket.getValue('taskid')];
            if (taskInfo) {
                console.log('更新了任务状态' + cbpket.getValue('taskid'));
                if (cbpket.getValue('queststatus') == 3) {
                    delete taskGroup[cbpket.getValue('taskid')];

                }
                else {
                    taskInfo.queststatus = cbpket.getValue('queststatus');
                }
                break;
            }
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
            console.warn('------------>', strArr)
            // throw new Error("questServerDataRet" + '长度错误');
        }
        let infoType = strArr[0];// 大类标识
        let funcName = strArr[1];// 调用的函数名称
        let msgID = 0;// 函数内小协议包
        // console.log(strArr);
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

        }
        catch (e) {
            console.error(e)
        }

        msg.clear();
        msg = null;
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
            case ProtoCmd.CZ_OPEN_chongzhidialog:
                new view.dialog.ChongZhiNoticeDialog().setData().popup(true);
                break;
            // 首冲界面
            case ProtoCmd.CZ_OPEN_weichongzhidialog:
                new view.dialog.ChongZhiNoticeDialog().setData().popup(true);
                break;
            // 剧情事件界面
            case ProtoCmd.JQ_OPEN_JuQingEventDialog:
                let taskInfo = GameApp.GameEngine.taskInfo[EnumData.TaskType.JUQINGEVENT];
                if (taskInfo) {
                    let _task = taskInfo[Object.keys(taskInfo)[0]];
                    new view.juQingMode.JuQingEventDialog().setData(_task).popup();
                }
                break;
        }
    }

    public recvTypeKeyValue(data: any): void {
        let msg = new ProtoCmd.RecvTypeKeyValue(data);

        msg.clear();
    }

    /**
     * 
     * @param data PK 模式 
     */
    public changePkModel(data: any): void {
        let msg = new ProtoCmd.CretPkModel(data);
        //   PanelManage.Main.ui_scene.pkModelChanged(msg.getValue('pkModel'));
        msg.clear();
    }
}

