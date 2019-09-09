module GameObject {

    export class Player extends Creature {
        public playerAccount: string;
        public playerPassword: string;
        public avatarIcon: string;
        public job: EnumData.JOB_TYPE;
        public sex: EnumData.SEX_TYPE;
        public createTime;// 角色创建时间
        public zslevel: number = 0;//转生等级
        public viplvl: number;//Vip等级
        public pkModel: EnumData.PkModel;// PK模式
        private _allPlayer = {};//所有的玩家
        private _allMonster = {};//所有的怪物
        private _allNpc = {};//所有的NPC
        public wealth: Wealth;//财富
        public feature: ProtoCmd.PlayerFeature;//外显
        // ****************行会********************
        public guildInfo: ProtoCmd.stSingleGuildinfoBase;// 行会信息
        // *****************剧情*******************
        public pianZhangID: number;// 篇章ID
        public charpterID: number;// 章节ID
        public talkID: number;// 对白ID
        /******************技能******************** */
        public skillInfo = {};
        /******************UI****************** */
        public ui_item: view.compart.SelfPlayerInSceneItem;
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

        /**
         * 获取玩家真实名称
         */
        public get realName(): string {
            if (this.objName != null) {
                return this.objName.split('@')[0];
            }
            return '';

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
            switch (type) {
                case EnumData.CRET_TYPE.CRET_PLAYER:
                    if (this._allPlayer[tempId]) {
                        this._allPlayer[tempId].clear();
                        console.log(this._allPlayer[tempId].objName + this._allPlayer[tempId].tempId + '离开地图');
                        delete this._allPlayer[tempId]
                    }
                    break;

                case EnumData.CRET_TYPE.CRET_MONSTER:
                    if (this._allMonster[tempId]) {
                        this._allMonster[tempId].clear();
                        console.log(this._allMonster[tempId].objName + this._allMonster[tempId].tempId + '离开地图');
                        delete this._allMonster[tempId]
                    }
                    break;

                case EnumData.CRET_TYPE.CRET_NPC:
                    if (this._allNpc[tempId]) {
                        this._allNpc[tempId].clear();
                        console.log(this._allNpc[tempId].objName + this._allNpc[tempId].tempId + '离开地图');
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
            this.charpterID = data.zjid;
            this.talkID = data.dbid;
            this.pianZhangID = data.pzid;
        }


        /***************************************战斗******************************************* */
        /**
         * 尝试攻击，检查释放能攻击
         */
        public tryAttack(target: Creature, skillID: number = 999): void {
            let pkt = new ProtoCmd.CretAttack();
            pkt.dwTempId = this.tempId;
            switch (this.job) {
                // 战士
                case EnumData.JOB_TYPE.JOB_WARRIOR:
                    break;
                // 法师
                case EnumData.JOB_TYPE.JOB_MAGE:
                    skillID = 2002;
                    break;
                // 道士
                case EnumData.JOB_TYPE.JOB_MONK:
                    skillID = 3002;
                    break;
            }
            pkt.nMagicId = skillID;
            pkt.dwTargetId = target.tempId;
            pkt.nX = target.location.ncurx;
            pkt.nY = target.location.ncury;
            lcp.send(pkt);
        }

        /**
         * 播放攻击动作
         */
        public startAttack(): void {
            TipsManage.showTips(this.objName + '正在攻击');
            this.ui_item && this.ui_item.playAni();
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