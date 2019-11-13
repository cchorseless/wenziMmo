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


        // 天赋
        public talentInfo;
        // 性格
        public xingGeInfo;
        public createTime;// 角色创建时间
        public zslevel: number = 0;//转生等级
        /**
         * 等级和
         */
        public get lvlCount(): number {
            return this.zslevel * 1000 + this.level
        }
        public viplvl: number = 0;//Vip等级
        public pkModel: EnumData.PkModel;// PK模式
        /******************视图信息************************ */
        private _allPlayer: { [V: string]: GameObject.OtherPlayer } = {};//所有的玩家
        private _allMonster: { [V: string]: GameObject.Monster } = {};//所有的怪物
        private _allNpc: { [V: string]: GameObject.Npc } = {};//所有的NPC
        private _allHero = {};// 所有的英雄
        public allItem = {};//所有的掉落宝物

        // ****************行会********************
        public guildInfo: ProtoCmd.stSingleGuildinfoBase;// 行会信息
        // *****************剧情*******************
        public pianZhangID: number;// 篇章ID
        public charpterID: number;// 章节ID
        public talkID: number;// 对白ID
        public charpterName: string;// 章节名字
        public pianZhangName: string;// 篇章名字
        /******************技能******************** */
        public skillShotButton: { [btRow: string]: ProtoCmd.stShortCuts } = {};// 所有技能快捷键信息
        public skillInfo: { [x: string]: ProtoCmd.stSkillLvlBase } = {};// 所有技能信息
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
        /******************BOSS积分************ */
        public bossCoin: number = 0;
        //玩家出生信息、八字、4格、9宫
        public playerBirthData: ProtoCmd.itf_JS_birthdateAndCompellation = null;
        //玩家强化信息
        public playerEquipIntensify: ProtoCmd.itf_JS_equipIntensifyMessage = null;
        //玩家强化信息
        public playersoulStoneLevel: ProtoCmd.itf_JS_soulStoneLevel = null;
        /*******************弟子**************** */
        public curHero: GameObject.Hero;// 当前的弟子
        public hero1: GameObject.Hero;// 战士弟子
        public hero2: GameObject.Hero;// 法师弟子
        public hero3: GameObject.Hero;// 道士弟子

        /**
         * 更改英雄最大经验
         * @param maxExp 
         */
        public changeHeroMaxExp(maxExp) {
            Hero.MaxExp = maxExp;
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
            let month = Math.ceil(span_day % 24);
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
        /*******************************************************************get************************************* */

        public _skeBoneRes;
        /**
         * 获取角色龙骨资源
         */
        public get skeBoneRes(): string {
            if (this._skeBoneRes) {
                return this._skeBoneRes;
            }
            // 令狐冲
            if (this.sex == EnumData.SEX_TYPE.SEX_MAN) {
                return 'sk/player/1_1.sk'
            }
            // 任盈盈
            else {
                return 'sk/player/1_2.sk'
            }
            // return 'sk/player/' + this.job + '_' + this.sex + '.sk';
        }

        public set skeBoneRes(srcID: string) {
            this._skeBoneRes = srcID;
        }

        public _tmpHeroList = {};
        /**
         * 将游戏对象添加到视野
         * @param obj 
         * @param type 
         */
        public addViewObj(obj: any, type: EnumData.CRET_TYPE): void {
            switch (type) {
                case EnumData.CRET_TYPE.CRET_PLAYER:
                    this._allPlayer[obj.tempId] = obj;
                    // 角色和弟子互相绑定
                    if (this._tmpHeroList[obj.tempId]) {
                        obj.curHero = this._tmpHeroList[obj.tempId]
                        delete this._tmpHeroList[obj.tempId];
                    }
                    break;
                case EnumData.CRET_TYPE.CRET_MONSTER:
                    this._allMonster[obj.tempId] = obj;
                    break;
                case EnumData.CRET_TYPE.CRET_NPC:
                    this._allNpc[obj.tempId] = obj;
                    break;
                case EnumData.CRET_TYPE.CRET_HERO:
                    // 角色和弟子互相绑定
                    let masterID = obj.feature.dwMasterTmpID;
                    // 自己的弟子不放在视野里面
                    if (masterID == this.tempId) {
                        this.curHero = obj;
                    }
                    // 其他的弟子
                    else if (this._allPlayer[masterID]) {
                        this._allPlayer[masterID].curHero = obj;
                        this._allHero[obj.tempId] = obj;
                    }
                    // 玩家还没进来的情况
                    else {
                        this._tmpHeroList[masterID] = obj;
                        this._allHero[obj.tempId] = obj;
                    }
                    break;
                default:
                    break;
            }
            PanelManage.Main && PanelManage.Main.addViewObjUI(obj, type);
        }
        /**
         * 将游戏对象移除视野
         * @param tempId 
         * @param type 
         */
        public removeViewObj(tempId: number, type: EnumData.CRET_TYPE): void {
            console.log(tempId + '从视野被移除');
            switch (type) {
                case EnumData.CRET_TYPE.CRET_PLAYER:
                    if (this._allPlayer[tempId]) {
                        this._allPlayer[tempId].clear();
                        delete this._allPlayer[tempId]
                    }
                    break;

                case EnumData.CRET_TYPE.CRET_MONSTER:
                    if (this._allMonster[tempId]) {
                        this._allMonster[tempId].clear();
                        delete this._allMonster[tempId]
                    }
                    break;

                case EnumData.CRET_TYPE.CRET_NPC:
                    if (this._allNpc[tempId]) {
                        this._allNpc[tempId].clear();
                        delete this._allNpc[tempId]
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
            if (GameApp.MainPlayer.tempId == tempId) {
                return GameApp.MainPlayer
            }
            switch (type) {
                case EnumData.CRET_TYPE.CRET_PLAYER:
                    return this._allPlayer[tempId]
                case EnumData.CRET_TYPE.CRET_MONSTER:
                    return this._allMonster[tempId]
                case EnumData.CRET_TYPE.CRET_NPC:
                    return this._allNpc[tempId]
                case EnumData.CRET_TYPE.CRET_HERO:
                    return this._allHero[tempId]
                default:
                    for (let obj of [this._allPlayer[tempId], this._allMonster[tempId], this._allNpc[tempId], this._allHero[tempId]]) {
                        if (obj) return obj;
                    }
                    break;
            }
        }

        /**
         * 视野内所有玩家
         */
        public get allPlayer() {
            return this._allPlayer;
        }
        /**
         * 视野内所有怪物
         */
        public get allMonster() {
            return this._allMonster;
        }
        /**
         * 视野内所有NPC
         */
        public get allNpc() {
            return this._allNpc;
        }

        /**
         * 是业内所有的英雄
         */
        public get allHero() {
            return this._allHero;
        }

        /**
         * 清除视野内所有的对象
         */
        public clearViewObj() {
            for (let tempId in this._allPlayer) {
                this._allPlayer[tempId].clear();
                this._allPlayer[tempId] = null;
            }
            this._allPlayer = {};
            for (let tempId in this._allMonster) {
                this._allMonster[tempId].clear();
                this._allMonster[tempId] = null;
            }
            this._allMonster = {};
            for (let tempId in this._allNpc) {
                this._allNpc[tempId].clear();
                this._allNpc[tempId] = null;
            }
            this._allNpc = {};
            for (let tempId in this._allHero) {
                this._allHero[tempId].clear();
                this._allHero[tempId] = null;
            }
            this._allHero = {};
            if (PanelManage.Main) {
                PanelManage.Main.clearViewUI();
            }
        }


        /**
         * 看自己是否是會長 true是
         */
        public checkSelfIsGuildMaster(): boolean {
            // 会长 副会长可以
            let canDoArray = [EnumData.emGuildMemberPowerLvl._GUILDMEMBER_POWERLVL_FITMASTER,
            EnumData.emGuildMemberPowerLvl._GUILDMEMBER_POWERLVL_MASTER]
            // 职位
            let self_zhiWei = this.feature.btClanMaster;
            return canDoArray.indexOf(self_zhiWei) != -1;
        }

        /**
         * 更改角色剧情信息
         * @param data 
         */
        public changeJuQingInfo(data: ProtoCmd.itf_JUQING_SELFINFO) {
            console.log(data);
            this.charpterID = data.zjid;
            this.talkID = data.dbid;
            this.pianZhangID = data.pzid;// 篇章ID
            this.pianZhangName = data.pzname;// 篇章名字
            this.charpterName = data.zjname;// 章节名字
        }


        /***************************************战斗******************************************* */
        /**
         * 尝试攻击，检查释放能攻击
         */
        public tryAttack(target: Creature, skillID: number = 999): void {
            this.atkTargetTempId = target.tempId;
            console.log('当前目标:', this.atkTargetTempId);
            let pkt = new ProtoCmd.CretAttack();
            pkt.dwTempId = this.tempId;
            pkt.nMagicId = skillID;
            pkt.dwTargetId = target.tempId;
            pkt.nX = target.location.ncurx;
            pkt.nY = target.location.ncury;
            pkt.distance = 3;
            lcp.send(pkt);


        }

        public completeAtkHandle: Laya.Handler = null;
        // 攻击目标
        public atkTargetTempId: number = null;
        /**
         * 自动战斗
         */
        public startAutoAtk(): void {
            this.completeAtkHandle = Laya.Handler.create(this, () => {
                // 有攻击目标找攻击目标 
                if (this.atkTargetTempId) {
                    let target = this.findViewObj(this.atkTargetTempId);
                    if (target) {
                        this.tryAttack(target);
                        return
                    }
                }
                // 先找BOSS
                let allMonsterKeys = Object.keys(this.allMonster);
                for (let key of allMonsterKeys) {
                    let monsterObj: Monster = this.allMonster[key];
                    let config = monsterObj.feature.dwCretTypeId;
                    // 查表找到BOSS
                    if (Boolean(SheetConfig.mydb_monster_tbl.getInstance(null).BOSS('' + config))) {
                        this.tryAttack(monsterObj);
                        return
                    }
                }
                // 没有攻击目标,所有的怪物位置最靠左的
                // if( ){

                // }
                TipsManage.showTips('无怪物');
            }, null, false);
            // 攻击一次
            this.completeAtkHandle.run();
        }

        /**
         * 停止自动战斗
         */
        public stopAutoAtk(): void {
            if (this.completeAtkHandle) {
                this.completeAtkHandle.recover();
            }
            this.completeAtkHandle = null;
        }

        /**
         * 手动攻击
         * @param target 
         * @param skillID 
         */
        public startHandAtk(target: Creature, skillID: number = 999): void {
            this.stopAutoAtk();
            this.tryAttack(target, skillID)
        }

        /**
         * 播放攻击动作
         */
        public startAttack(): void {
            if (this.ui_item) {
                // this.ui_item.stopPlayAni();
                // 自动攻击
                if (this.completeAtkHandle) {
                    // this.ui_item.playAni(0, false, true, this.completeAtkHandle);
                }
                // 手动攻击
                else {
                    // this.ui_item.playAni();
                }
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
            // this.ui_item && this.ui_item.playAni(3, false)
        }



    }
}