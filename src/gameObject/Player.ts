module GameObject {

    export class Player extends Creature {
        public playerAccount: string;
        /****************************基本信息****************** */
        public wealth: Wealth;//财富
        public feature: ProtoCmd.PlayerFeature;//外显
        /**
         * 职业
         */
        public get job(): EnumData.JOB_TYPE {
            return this.feature.simpleFeature.job;
        }
        public set job(srcID: EnumData.JOB_TYPE) {
            this.feature.simpleFeature.job = srcID;
        }
        /**
         * 性别
         */
        public get sex(): EnumData.SEX_TYPE {
            return this.feature.simpleFeature.sex;
        }
        public set sex(srcID: EnumData.SEX_TYPE) {
            this.feature.simpleFeature.sex = srcID;
        }
        //我的声望信息
        public fameInfo: ProtoCmd.itf_JS_ShengWangInfo;
        //月卡剩余时间
        public monthCard: number
        // 好友列表
        public friendInfo = [];
        //好友申请列表
        public friendApplyInfo = [];
        // 天赋
        public talentInfo;
        // 性格
        public xingGeInfo;

        public createTime;// 角色创建时间
        public zslevel: number = 0;//转生等级
        //等级精炼强化达标装备数量
        public EquipmentNum = [];
        /**
         * 聊天设置
         */
        public chatStatus: any = {};
        /**
         * 等级和
         */
        public get lvlCount(): number {
            return this.zslevel * 1000 + this.level
        }
        public viplvl: number = 0;//Vip等级
        public pkModel: EnumData.PkModel;// PK模式
        /******************视图信息************************ */
        public allPlayer: { [V: string]: GameObject.OtherPlayer } = {};//所有的玩家
        public allMonster: { [V: string]: GameObject.Monster } = {};//所有的怪物
        public allNpc: { [V: string]: GameObject.Npc } = {};//所有的NPC
        public allHero: { [V: string]: GameObject.Hero } = {};// 所有的英雄
        public allItem: { [V: string]: ProtoCmd.ItemBase } = {};//所有的掉落宝物

        // ****************行会********************
        public guildInfo: ProtoCmd.stSingleGuildinfoBase;// 行会信息
        // *****************剧情*******************
        public talkInfo = {};// 所有对白信息
        public allCharpterInfo = {};//所有章节信息
        public allPianZhangInfo = null//篇章信息 {index:{id,name,charpterInfo}
        public curFuBenMainID = 1;   //是否通关当前章节的所有主线副本

        public pianZhangID: number;// 篇章ID
        public charpterID: number;// 章节ID
        public talkID: number;// 对白ID
        public charpterName: string;// 章节名字
        public pianZhangName: string;// 篇章名字

        /******************技能******************** */
        public skill_stage: { [index: number]: number } = {};
        public comboTypeByPage = {}  //根据页数的技能组合ID以及其对应数量
        // public taoluPageID;    //当前是哪一页套路  0123
        public skillShotButton: { [btRow: string]: ProtoCmd.stShortCuts } = {};// 所有技能快捷键信息
        public skillInfo: { [x: string]: ProtoCmd.stSkillLvlBase } = {};// 所有技能信息
        public upGraspSkillID: number;  //升品技能ID

        //默认设置的套路ID
        public get defaultTaoLuID(): number {
            let key = 400;
            let tab;
            if (GameApp.MainPlayer.skillShotButton[key]) {
                tab = GameApp.MainPlayer.skillShotButton[key].i64Id.int64ToNumber();
            } else {
                tab = 0;
            }
            return tab;
        }

        //副本ID
        public curFuBenID = 0;
        //副本怪物战力
        public fubenMonsterPower = 0;
        //主线副本奖励
        public zhuxianFuBenReward = {
            '0': null,
            '1': null
        }

        // public TitleID = null;
        // public wingID = null;
        // public dressID = null;
        /**
         * 判断技能是否已经装备上了
         * @param skillID 
         */
        public checkSkillHadDress(skillID): number {
            for (let btow in this.skillShotButton) {
                let skillBase = this.skillShotButton[btow];
                if (skillBase.i64Id.int64ToNumber() == skillID) {
                    return parseInt(btow)
                }
            }
            return 0
        }
        /******************UI****************** */
        public ui_item: view.scene.PlayerInSceneItem;
        /******************生活属性************ */
        public nHealth: number = 0;// 健康
        public nSpirte: number = 0;// 精神
        public nTili: number = 0;// 体力
        public nYanZhi: number = 0;// 颜值
        public nXinQing: number = 0;// 心情

        public npcRelation: { [index: number]: number } = {};//npc关系列表   0结拜  1情侣

        public skillLvUpPoint: number = 0;//技能升级所需
        /******************BOSS积分************ */
        public bossCoin: number = 0;
        //玩家出生信息、八字、4格、9宫
        public playerBirthData: ProtoCmd.itf_JS_birthdateAndCompellation = null;
        //玩家强化信息
        public playerEquipIntensify: ProtoCmd.itf_JS_equipIntensifyMessage = null;
        //玩家魂石信息
        public playersoulStoneLevel: ProtoCmd.itf_JS_soulStoneLevel = null;
        /*******************弟子**************** */
        public curHero: GameObject.Hero;// 当前的弟子
        public hero1;// 战士弟子
        public hero2;// 法师弟子
        public hero3;// 道士弟子

        /**
         * 更改英雄最大经验
         * @param maxExp 
         */
        public changeHeroExp(nowExp = 0, maxExp = 0) {
            if (maxExp > 0) {
                Hero.MaxExp = maxExp;
            }
            if (nowExp > 0) {
                Hero.NowExp = nowExp;
            }
            GameApp.LListener.event(LcpEvent.UPDATE_UI_HERO_EXP);
        }

        /**
         * 弟子性别
         */
        public get heroSex(): EnumData.SEX_TYPE {
            if (this.sex == EnumData.SEX_TYPE.SEX_MAN) {
                return EnumData.SEX_TYPE.SEX_WOMEN;
            }
            else {
                return EnumData.SEX_TYPE.SEX_MAN;
            }
        }
        /**
         * 获取弟子对象
         * @param job 
         */
        public heroObj(job): GameObject.Hero {
            return this['hero' + job] as GameObject.Hero;
        }

        //当前选择的是玩家或是弟子  0玩家  1
        public playerORHero: EnumData.PlayerAndHeroType = EnumData.PlayerAndHeroType.Player;
        constructor() {
            super();
            this.wealth = new Wealth();
            this.feature = new ProtoCmd.PlayerFeature();
            this.guildInfo = new ProtoCmd.stSingleGuildinfoBase();
            this.hero1 = new GameObject.Hero();
            this.hero2 = new GameObject.Hero();
            this.hero3 = new GameObject.Hero();
        }
        /**
         * 返回默认技能ID
         */
        public get default_skill(): string {

            return ['99901', '200201', '300201'][this.job - 1];
        }

        /**
         * 年龄 字符串
         */
        public get age_str(): string {
            let span = new Date().getTime() / 1000 - GameApp.MainPlayer.createTime;
            let span_day = span / 60 / 60 / 24;
            let year = 17 + Math.ceil(span_day / 24);
            let month = Math.ceil(span_day % 24) / 24 * 12;
            let str = '';
            if (month == 0) {
                str = year + '岁' + '整';
            }
            else {
                str = year + '岁' + month + '个月';
            }
            return str //出生年
        }

        /**
         * 年龄 数字
         */
        public get age_number(): number {
            let span = new Date().getTime() / 1000 - GameApp.MainPlayer.createTime;
            let span_day = span / 60 / 60 / 24;
            let year = 17 + Math.ceil(span_day / 24);
            let month = Math.ceil(span_day % 24);
            return year //出生年
        }
        /**
         * 修改金币
         * @param gold 
         */
        public changeGold(gold: number) {
            this.wealth._gold = gold;
            Log.trace('金币：' + gold);
            GameApp.LListener.event(LcpEvent.UPDATE_UI_GOLD);
        }
        /**
         * 修改绑定金币
         * @param gold_lock 
         */
        public changeGold_lock(gold_lock: number) {
            this.wealth._gold_lock = gold_lock;
            Log.trace('绑定金币：' + gold_lock);
            GameApp.LListener.event(LcpEvent.UPDATE_UI_GOLD);
        }

        /**
         * 修改元宝
         * @param yuanBao 
         */
        public changeYuanBao(yuanBao: number) {
            Log.trace('元宝：' + yuanBao);
            this.wealth.yuanBao = yuanBao;
            GameApp.LListener.event(LcpEvent.UPDATE_UI_YUANBAO);
        }

        /**
         * 修改绑定元宝
         * @param yuanBao_lock 
         */
        public changeYuanBao_lock(yuanBao_lock: number) {
            this.wealth.yuanBao_lock = yuanBao_lock;
            GameApp.LListener.event(LcpEvent.UPDATE_UI_YUANBAOLOCK);
        }


        /**
         * 修改荣誉
         * @param honorNum 
         */
        public changeHonorNum(honorNum: number) {
            this.wealth.honorNum = honorNum;
        }

        /**
         * PK模式
         * @param pkModel 
         */
        public changePkModel(pkModel: EnumData.PkModel) {
            this.pkModel = pkModel;
        }

        /**
         * 帮会贡献
         * @param guildDedication 
         */
        public changeGuildDedication(guildDedication: number) {
            this.wealth.guildDedication = guildDedication;
            GameApp.LListener.event(LcpEvent.UPDATE_UI_GUILDSCORE);
        }

        /**
         * 当前声望
         * @param nowFame 
         */
        public changeNowFame(nowFame: number) {
            this.wealth.nowFame = nowFame
        }

        /**
         * 累计声望
         * @param maxTotalFame 
         */
        public changeMaxTotalFame(maxTotalFame: number) {
            this.wealth.maxTotalFame = maxTotalFame
        }

        // 健康
        public changenHealth(srcID: number) {
            this.nHealth = srcID;
        }
        // 颜值
        public changenYanZhi(srcID: number) {
            this.nYanZhi = srcID
        }
        // 体力
        public changenTili(srcID: number) {
            this.nTili = srcID
        }
        // 精力
        public changenSpirte(srcID: number) {
            this.nSpirte = srcID
        }
        // 心情
        public changenXinQing(srcID: number) {
            this.nXinQing = srcID
        }
        // BOSS积分
        public changeBossCoin(srcID: number) {
            this.bossCoin = srcID;
        }
        // 技能升级所需
        public changeSkillPoint(srcID: number) {
            this.skillLvUpPoint = srcID;
        }
        /*******************************************************************get************************************* */


        public _tmpHeroList = {};
        /**
         * 将游戏对象添加到视野
         * @param obj 
         * @param type 
         */
        public addViewObj(obj: any, type: EnumData.CRET_TYPE): void {
            switch (type) {
                case EnumData.CRET_TYPE.CRET_PLAYER:
                    this.allPlayer[obj.tempId] = obj;
                    // 角色和弟子互相绑定
                    if (this._tmpHeroList[obj.tempId]) {
                        obj.curHero = this._tmpHeroList[obj.tempId]
                        delete this._tmpHeroList[obj.tempId];
                    }
                    let label = new Laya.Label;
                    label.width = 590;
                    label.font = 'FZXK';
                    label.fontSize = 22;
                    label.wordWrap = true;
                    label.color = '#63491a';
                    if (obj.feature.simpleFeature.weaponId == 0) {
                        label.text = obj.objName + ' 进来了';
                    } else {
                        let name = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + obj.feature.simpleFeature.weaponId);
                        label.text = obj.objName + '拿着' + name + '进来了';
                    }
                    PanelManage.Main.view_scene._childs[1].init_updataHieght(label);
                    break;
                case EnumData.CRET_TYPE.CRET_MONSTER:
                    this.allMonster[obj.tempId] = obj;
                    break;
                case EnumData.CRET_TYPE.CRET_NPC:
                    this.allNpc[obj.tempId] = obj;
                    break;
                case EnumData.CRET_TYPE.CRET_HERO:
                    // 角色和弟子互相绑定
                    let masterID = obj.feature.dwMasterTmpID;
                    // 自己的弟子不放在视野里面
                    if (masterID == this.tempId) {
                        this.curHero = obj;
                    }
                    // 其他的弟子
                    else if (this.allPlayer[masterID]) {
                        this.allPlayer[masterID].curHero = obj;
                        this.allHero[obj.tempId] = obj;
                    }
                    // 玩家还没进来的情况
                    else {
                        this._tmpHeroList[masterID] = obj;
                        this.allHero[obj.tempId] = obj;
                    }
                    break;
                default:
                    break;
            }

            PanelManage.Main && GameApp.SceneManager.addViewObjUI(obj, type);

        }
        /**
         * 将游戏对象移除视野
         * @param tempId 
         * @param type 
         */
        public removeViewObj(tempId: number, type: EnumData.CRET_TYPE): void {
            Log.trace(tempId + '从视野被移除');
            switch (type) {
                case EnumData.CRET_TYPE.CRET_PLAYER:
                    let label = new Laya.Label;
                    label.width = 590;
                    label.wordWrap = true;
                    label.font = 'FZXK';
                    label.color = '#63491a';
                    label.fontSize = 22;
                    if (this.allPlayer[tempId]) {
                        label.text = this.allPlayer[tempId].objName + '离开了';
                        PanelManage.Main.view_scene._childs[1].init_updataHieght(label);
                        this.allPlayer[tempId].clear();
                        delete this.allPlayer[tempId]
                    }
                    break;

                case EnumData.CRET_TYPE.CRET_MONSTER:
                    if (this.allMonster[tempId]) {
                        this.allMonster[tempId].clear();
                        delete this.allMonster[tempId]
                    }
                    break;

                case EnumData.CRET_TYPE.CRET_NPC:
                    if (this.allNpc[tempId]) {
                        this.allNpc[tempId].clear();
                        delete this.allNpc[tempId]
                    }
                    break;

                default:
                    break;
            }

        }

        /**
         * 查找视野内的游戏对象
         * @param tempId 
         * @param type 
         */
        public findViewObj(tempId: number, type?: EnumData.CRET_TYPE): Creature {
            // 自己
            if (GameApp.MainPlayer.tempId == tempId) {
                return GameApp.MainPlayer
            }
            // 自己的英雄
            if (GameApp.MainPlayer.curHero && GameApp.MainPlayer.curHero.tempId == tempId) {
                return GameApp.MainPlayer.curHero;
            }
            switch (type) {
                case EnumData.CRET_TYPE.CRET_PLAYER:
                    return this.allPlayer[tempId]
                case EnumData.CRET_TYPE.CRET_MONSTER:
                    return this.allMonster[tempId]
                case EnumData.CRET_TYPE.CRET_NPC:
                    return this.allNpc[tempId]
                case EnumData.CRET_TYPE.CRET_HERO:
                    return this.allHero[tempId]
                default:
                    for (let obj of [this.allPlayer[tempId], this.allMonster[tempId], this.allNpc[tempId], this.allHero[tempId]]) {
                        if (obj) return obj;
                    }
                    break;
            }
        }

        /**
         * 清除视野内所有的对象
         */
        public clearViewObj() {
            // 清除所有玩家
            for (let tempId in this.allPlayer) {
                this.allPlayer[tempId].clear();
                this.allPlayer[tempId] = null;
            }
            this.allPlayer = {};
            // 清除所有怪物
            for (let tempId in this.allMonster) {
                this.allMonster[tempId].clear();
                this.allMonster[tempId] = null;
            }
            this.allMonster = {};
            // 清除所有NPC
            for (let tempId in this.allNpc) {
                this.allNpc[tempId].clear();
                this.allNpc[tempId] = null;
            }
            this.allNpc = {};
            // 清除所有英雄
            for (let tempId in this.allHero) {
                this.allHero[tempId].clear();
                this.allHero[tempId] = null;
            }
            this.allHero = {};
            // 清除所有物品
            for (let tempId in this.allItem) {
                this.allItem[tempId].clear();
                this.allItem[tempId] = null;

            }
            this.allItem = {};
            if (PanelManage.Main) {
                GameApp.SceneManager.clearViewUI();
            }

        }


        /**
         * 看自己是否是會長 true是
         */
        public checkSelfIsGuildMaster(): boolean {
            // 会长 副会长可以
            let canDoArray = [EnumData.emGuildMemberPowerLvl.FITMASTER,
            EnumData.emGuildMemberPowerLvl.MASTER]
            // 职位
            let self_zhiWei = this.feature.btClanMaster;
            return canDoArray.indexOf(self_zhiWei) != -1;
        }

        /**
         * 更改角色剧情信息
         * @param data 
         */
        public changeJuQingInfo(data: ProtoCmd.itf_JUQING_SELFINFO) {
            this.charpterID = data.zjid;
            this.talkID = data.dbid;
            this.pianZhangID = data.pzid;// 篇章ID
            this.pianZhangName = data.pzname;// 篇章名字
            this.charpterName = data.zjname;// 章节名字
            this.getFuBenMainMsg()

        }
        /**
         * 拉取除魔副本信息
         */
        public getFuBenMainMsg() {
            // if (this.allFuBenInfo[this.charpterID]) {
            //     return
            // }
            // else {
            //     let pkt = new ProtoCmd.QuestClientData();
            //     pkt.setString(ProtoCmd.FB_ChuMoClientOpen, [this.charpterID], null, this, (jsonData: ProtoCmd.itf_FB_MainFbInfo) => {
            //         this.allFuBenInfo[this.charpterID] = jsonData;
            //     })
            //     lcp.send(pkt);
            // }

        }


        /***************************************战斗******************************************* */
        /**
         * 尝试攻击，检查释放能攻击
         */
        public tryAttack(target: Monster, skillID: number = 999): void {
            this.atkTarget = target;
            // 攻击者坐标
            let a = this.ui_item.localToGlobal(new Laya.Point(0, 0));
            // 受击者坐标
            let b = target.ui_item.localToGlobal(new Laya.Point(0, 0));
            let pkt = new ProtoCmd.CretAttack();
            pkt.dwTempId = this.tempId;
            pkt.nMagicId = skillID;
            pkt.dwTargetId = target.tempId;
            pkt.nX = target.location.ncurx;
            pkt.nY = target.location.ncury;
            pkt.distance = Math.ceil(Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)) / 45);
            lcp.send(pkt);

        }
        /**
         * 查找当前的攻击目标
         */
        public findAttackTarget(): Monster {
            if (this.atkTarget && this.atkTarget.checkSelfCanAtk()) {
                return this.atkTarget
            }

            let allMonsterKeys = Object.keys(this.allMonster);
            for (let key of allMonsterKeys) {
                let monsterObj: Monster = this.allMonster[key];
                let config = monsterObj.feature.dwCretTypeId;
                // 查表找到BOSS
                if (monsterObj.checkSelfCanAtk() && Boolean(SheetConfig.mydb_monster_tbl.getInstance(null).BOSS(config.toString()))) {
                    return monsterObj;
                }
            }
            for (let key of allMonsterKeys) {
                let monsterObj: Monster = this.allMonster[key];
                // 或者的小怪
                if (monsterObj.checkSelfCanAtk()) {
                    return monsterObj;
                }
            }
        }

        // 攻击目标
        public atkTarget: Monster = null;

        /**
         * 更改BUFF状态
         * @param data 
         */
        public changeBuff(data): void {
            // this.stopAutoAtk();
            if (this.ui_item) {
                this.ui_item.changeBuff(data)
            }
        }


        /**
         * 受击
         */
        public onAttack(): void {
        }

        /**
         * 死亡
         */
        public goDie(): void {
            TipsManage.showTips(this.objName + '死亡了');
            if (this.objName == GameApp.MainPlayer.objName) {
                switch (GameApp.MainPlayer.curFuBenID) {
                    // 心魔副本
                    case EnumData.emRoomType.singleFuBen:
                    // 除魔副本
                    case EnumData.emRoomType.chuMoFuBen:
                    // 资源副本
                    case EnumData.emRoomType.resourceFuBen:
                        let p = new view.scene.BattleRewardInfoV0Item();
                        p.setData(1);
                        p.popup();
                        break;
                    // 多人副本   只有boss的野外地图
                    case EnumData.emRoomType.publicFuBen:

                        break;
                }

            }
            // this.ui_item && this.ui_item.playAni(3, false)
        }
    }
}