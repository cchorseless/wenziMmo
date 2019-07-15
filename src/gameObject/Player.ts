module GameObject {

    export class Player extends Creature {
        public playerAccount: string;
        public playerPassword: string;
        public avatarIcon: string;
        public job: EnumData.JOB_TYPE;
        public sex: EnumData.SEX_TYPE;
        public zslevel: number;//转生等级
        public viplvl: number;//Vip等级
        public pkModel: EnumData.PkModel;// PK模式
        public wealth: Wealth;//财富
        private _allPlayer = {};//所有的玩家
        private _allMonster = {};//所有的怪物
        private _allNpc = {};//所有的NPC

        constructor() {
            super();
            this.wealth = new Wealth();
        }
        /**
         * 修改金币
         * @param gold 
         */
        public changeGold(gold: number) {
            this.wealth.gold = gold;
        }
        /**
         * 修改绑定金币
         * @param gold_lock 
         */
        public changeGold_lock(gold_lock: number) {
            this.wealth.gold_lock = gold_lock;
        }

        /**
         * 修改元宝
         * @param yuanBao 
         */
        public changeYuanBao(yuanBao: number) {
            Log.trace('元宝：' + yuanBao);
            this.wealth.yuanBao = yuanBao;
        }

        /**
         * 修改绑定元宝
         * @param yuanBao_lock 
         */
        public changeYuanBao_lock(yuanBao_lock: number) {
            this.wealth.yuanBao_lock = yuanBao_lock;
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
         * 帮会积分
         * @param guildDedication 
         */
        public changeGuildDedication(guildDedication: number) {
            this.wealth.guildDedication = guildDedication;
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
                    PanelManage.Main.updatePlayerView(EnumData.HANDLE_TYPE.ADD, obj);
                    //GameApp.GameEngine.outputSystemInfo('玩家：' + (obj as Player).name + '(' + (obj as Player).onlyid + ')' + '进入你的视野');
                    break;
                case EnumData.CRET_TYPE.CRET_MONSTER:
                    this._allMonster[obj.tempId] = obj;
                    PanelManage.Main.updateMonstorView(EnumData.HANDLE_TYPE.ADD, obj);
                    //GameApp.GameEngine.outputSystemInfo('怪物 lv' + monster.level + '：' + monster.name + '(' + monster.onlyid + ')[' + monster.x + ',' + monster.y + '] 进入你的视野');
                    break;
                case EnumData.CRET_TYPE.CRET_NPC:
                    this._allNpc[obj.tempId] = obj;
                    PanelManage.Main.updateNpcView(EnumData.HANDLE_TYPE.ADD, obj);
                    //GameApp.GameEngine.outputSystemInfo('<font color="#00CD00">NPC：' + npc.name + '(' + npc.onlyid + ')[' + npc.x + ',' + npc.y + '] 进入你的视野</font>');
                    break;
                default:
                    break;
            }
            console.log(obj.objName + obj.tempId + '进入地图');
        }
        /**
         * 将游戏对象移除视野
         * @param tempId 
         * @param type 
         */
        public removeViewObj(tempId: number, type: EnumData.CRET_TYPE): void {
            switch (type) {
                case EnumData.CRET_TYPE.CRET_PLAYER:
                    PanelManage.Main.updatePlayerView(EnumData.HANDLE_TYPE.REMOVE, this._allPlayer[tempId]);
                    console.log(this._allPlayer[tempId].objName + this._allPlayer[tempId].tempId + '离开地图');
                    delete this._allPlayer[tempId]
                    break;
                case EnumData.CRET_TYPE.CRET_MONSTER:
                    PanelManage.Main.updateMonstorView(EnumData.HANDLE_TYPE.REMOVE, this._allMonster[tempId]);
                    console.log(this._allMonster[tempId].objName + this._allMonster[tempId].tempId + '离开地图');
                    delete this._allMonster[tempId]
                    break;
                case EnumData.CRET_TYPE.CRET_NPC:
                    PanelManage.Main.updateNpcView(EnumData.HANDLE_TYPE.REMOVE, this._allNpc[tempId]);
                    console.log(this._allNpc[tempId].objName + this._allNpc[tempId].tempId + '离开地图');
                    delete this._allNpc[tempId]
                    break;
                default:
                    break;
            }
        }
        /**
         * 清除视野内所有的对象
         */
        public clearViewObj() {
            for (let tempId in this._allPlayer) {
                this._allPlayer[tempId] = null;
            }
            this._allPlayer = {};

            for (let tempId in this._allMonster) {
                this._allMonster[tempId] = null;
            }
            this._allMonster = {};

            for (let tempId in this._allNpc) {
                this._allNpc[tempId] = null;
            }
            this._allNpc = {};
        }
    }
}