module GameObject {

    export class Player extends Creature {
        public playerAccount: string;
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

        /**
         * 年龄
         */
        public get age(): number {
            let span = GameApp.MainPlayer.createTime - GameApp.GameEngine.openDay;
            let span_day = span / 86400;
            return 18 + Math.floor(span_day / 24); //出生年

        }

        // 玩家出生信息
        public playerBirthData: ProtoCmd.itf_Guild_birthdateAndCompellation = null;
        // 天赋
        public talentInfo;
        // 性格
        public xingGeInfo;
        public createTime;// 角色创建时间
        public zslevel: number = 0;//转生等级
        public viplvl: number;//Vip等级
        public pkModel: EnumData.PkModel;// PK模式
        private _allPlayer = {};//所有的玩家
        private _allMonster = {};//所有的怪物
        private _allNpc = {};//所有的NPC
        public allItem = {};//所有的掉落宝物
        public wealth: Wealth;//财富
        public feature: ProtoCmd.PlayerFeature;//外显
        // ****************行会********************
        public guildInfo: ProtoCmd.stSingleGuildinfoBase;// 行会信息
        // *****************剧情*******************
        public pianZhangID: number;// 篇章ID
        public charpterID: number;// 章节ID
        public talkID: number;// 对白ID
        public charpterName: string;// 章节名字
        public pianZhangName: string;// 篇章名字
        /******************技能******************** */
        public skillInfo = {};
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





        constructor() {
            super();
            this.wealth = new Wealth();
            this.feature = new ProtoCmd.PlayerFeature();
            this.guildInfo = new ProtoCmd.stSingleGuildinfoBase();
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
            console.log('颜值====', srcID);
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

        /**
         * 获取头像
         */
        public get iconAvatarPic(): string {
            let path;
            if (this.sex == EnumData.SEX_TYPE.SEX_MAN) {
                path = 'image/common/icon_nan';
            }
            else {
                path = 'image/common/icon_nv';
            }
            return path + '0' + this.job + '.png';
        }
        /**
         * 获取半身像
         */
        public get halfAvatarPic(): string {
            let path;
            if (this.sex == EnumData.SEX_TYPE.SEX_MAN) {
                path = 'image/common/nan';
            }
            else {
                path = 'image/common/nv';
            }
            return path + '0' + this.job + '_half.png';
        }
        /**
         * 获取全身像
         */
        public get allAvatarPic(): string {
            let path;
            if (this.sex == EnumData.SEX_TYPE.SEX_MAN) {
                path = 'image/common/nan';
            }
            else {
                path = 'image/common/nv';
            }
            return path + '0' + this.job + '.png';
        }

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


        /**
         * 将游戏对象添加到视野
         * @param obj 
         * @param type 
         */
        public addViewObj(obj: Creature, type: EnumData.CRET_TYPE): void {
            switch (type) {
                case EnumData.CRET_TYPE.CRET_PLAYER:
                    this._allPlayer[obj.tempId] = obj;
                    break;
                case EnumData.CRET_TYPE.CRET_MONSTER:
                    this._allMonster[obj.tempId] = obj;
                    break;
                case EnumData.CRET_TYPE.CRET_NPC:
                    this._allNpc[obj.tempId] = obj;
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
                default:
                    for (let obj of [this._allPlayer[tempId], this._allMonster[tempId], this._allNpc[tempId]]) {
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
                    this.ui_item.playAni(0, false, true, this.completeAtkHandle);
                }
                // 手动攻击
                else {
                    this.ui_item.playAni();
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
            this.ui_item && this.ui_item.playAni(3, false)
        }



    }
}