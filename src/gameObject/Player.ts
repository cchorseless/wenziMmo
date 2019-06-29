module GameObject {

    export class Player extends Creature {
        public playerAccount: string;
        public playerPassword: string;
        public userOnlyid: Int64;
        public avatarIcon: string;
        public playerName: string;
        public job: EnumData.JOB_TYPE;
        public sex: EnumData.SEX_TYPE;
        public pkModel: EnumData.PkModel;// PK模式
        public wealth: Wealth;//财富
        private _playerListView: any = [];
        private _monsterListView: any = [];
        private _npcListView: any = [];

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
            if (this.playerName != null) {
                return this.playerName.split('@')[0];
            }
            return '';

        }
        /**
         * 将游戏对象添加到视野中
         * @param obj 
         * @param type 
         */
        public addViewObj(obj: any, type: number): void {
            switch (type) {
                case EnumData.CRET_TYPE.CRET_PLAYER:
                    this._playerListView.push(obj);
                    GameApp.GameEngine.outputCretInfo('玩家', type, this._playerListView.length);
                    //GameApp.GameEngine.outputSystemInfo('玩家：' + (obj as Player).name + '(' + (obj as Player).onlyid + ')' + '进入你的视野');
                    break;
                case EnumData.CRET_TYPE.CRET_MONSTER:
                    this._monsterListView.push(obj);
                    GameApp.GameEngine.outputCretInfo('怪物', type, this._monsterListView.length);
                    //GameApp.GameEngine.outputSystemInfo('怪物 lv' + monster.level + '：' + monster.name + '(' + monster.onlyid + ')[' + monster.x + ',' + monster.y + '] 进入你的视野');
                    break;
                case EnumData.CRET_TYPE.CRET_NPC:
                    this._npcListView.push(obj);
                    GameApp.GameEngine.outputCretInfo('NPC', type, this._npcListView.length);
                    //GameApp.GameEngine.outputSystemInfo('<font color="#00CD00">NPC：' + npc.name + '(' + npc.onlyid + ')[' + npc.x + ',' + npc.y + '] 进入你的视野</font>');
                    break;
                default:
                    break;
            }
            console.log(obj.name + '进入地图');
        }
        /**
         * 将游戏对象移除视野
         * @param onlyid 
         * @param type 
         */
        public removeViewObj(onlyid: number, type: number): void {
            let list: any = [];
            let name: string = '';
            switch (type) {
                case EnumData.CRET_TYPE.CRET_PLAYER:
                    list = this._playerListView;
                    name = '玩家';
                    break;
                case EnumData.CRET_TYPE.CRET_MONSTER:
                    list = this._monsterListView;
                    name = '怪物';
                    break;
                case EnumData.CRET_TYPE.CRET_NPC:
                    list = this._npcListView;
                    name = 'NPC';
                    break;
                default:
                    break;
            }

            for (let i = 0; i < list.length; ++i) {
                if (list[i].onlyid == onlyid) {
                    list[i] = null;
                    list.splice(i, 1);
                    break;
                }
            }
            GameApp.GameEngine.outputCretInfo(name, type, list.length);
        }
        /**
         * 清除视野内所有的对象
         */
        public clearViewObj() {
            for (let obj in this._playerListView) {
                obj = null;
            }
            this._playerListView = [];

            for (let obj in this._monsterListView) {
                obj = null;
            }
            this._monsterListView = [];

            for (let obj in this._npcListView) {
                obj = null;
            }
            this._npcListView = [];
        }
    }
}