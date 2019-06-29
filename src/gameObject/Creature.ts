
module GameObject {
    export class Ability {
        // 血
        public nowhp: number = 0;
        public maxhp: number = 0;
        // 蓝
        public nowmp: number = 0;
        public maxmp: number = 0;
        // 经验
        public nowexp: number = 0;
        public maxexp: number = 0;
        // 攻击
        public minatk: number = 0;
        public maxatk: number = 0;
        // 防御
        public mindef: number = 0;
        public maxdef: number = 0;
        // 内功
        public maxNeigong = 0;
        public nowNeigong = 0;
        // 战斗力
        public nFight = 0;

    }
    export class Wealth {
        // 金币
        public gold: number = 0;
        public gold_lock: number = 0;
        // 元宝
        public yuanBao: number = 0;
        public yuanBao_lock: number = 0;
        // 荣誉积分
        public honorNum: number = 0;
        // 帮会贡献
        public guildDedication: number = 0;
        // 声望
        public nowFame = 0;
        public maxTotalFame = 0;

    }

    export class Creature {
        public name: string;
        public level: number;
        public hp: number;
        public mp: number;
        public lifestate: number;
        public onlyid: number;
        public mapid: number;
        public mapname: string;
        public x: number;
        public y: number;
        public dir: number;
        public ability: Ability;

        public constructor() {
            this.ability = new Ability();
        }

        /**
         * 是否是自己
         */
        public get isMainPlayer(): boolean {
            return this.onlyid == GameApp.MainPlayer.onlyid
        }
        /**
         * 血量
         * @param nowhp 
         * @param maxhp 
         */
        public changeHp(nowhp: number, maxhp: number = 0) {
            if (maxhp > 0) {
                this.ability.maxhp = maxhp;
                if (nowhp > 0) {
                    this.ability.nowhp = nowhp;
                }
            }
            else {
                this.ability.nowhp = nowhp;
            }
            if (this.isMainPlayer) {
                ////GameApp.MainPanel.bloodBtn.text = '血量:(' + this.ability.nowhp + '/' + this.ability.maxhp + ')';
            }
        }


        /**
        * 蓝量
        * @param nowmp 
        * @param maxmp 
        */
        public changeMp(nowmp: number, maxmp: number = 0) {
            if (maxmp > 0) {
                this.ability.maxmp = maxmp;
                if (nowmp > 0) {
                    this.ability.nowmp = nowmp;
                }
            }
            else {
                this.ability.nowmp = nowmp;
            }
            if (this.isMainPlayer) {
                ////GameApp.MainPanel.bloodBtn.text = '血量:(' + this.ability.nowhp + '/' + this.ability.maxhp + ')';
            }
        }

        /**
         * 经验
         * @param nowexp 
         * @param maxexp 
         */
        public changeExp(nowexp: number, maxexp: number = 0) {
            this.ability.nowexp = nowexp;
            if (maxexp > 0) {
                this.ability.maxexp = maxexp;
            }
            if (this.isMainPlayer) {
                ////GameApp.MainPanel.expBtn.text = '经验:(' + this.ability.nowexp + '/' + this.ability.maxexp + ')';
            }
        }

        /**
         * 攻击
         * @param minatk 
         * @param maxatk 
         */
        public changeAtk(minatk: number, maxatk: number) {
            this.ability.minatk = minatk;
            this.ability.maxatk = maxatk;
            if (this.isMainPlayer) {
                ////GameApp.MainPanel.atkBtn.text = '战力:' + this.ability.maxatk;
            }
        }

        /**
         * 防御
         * @param mindef  
         * @param maxdef 
         */
        public changeDef(mindef: number, maxdef: number) {
            this.ability.mindef = mindef;
            this.ability.maxdef = maxdef;

        }

        /**
         * 内功
         * @param nowNeigong 当前内功
         * @param maxNeigong 内功上限
         */
        public changeNeigong(nowNeigong: number, maxNeigong: number = 0) {
            if (maxNeigong > 0) {
                this.ability.maxNeigong = maxNeigong;
                if (nowNeigong > 0) {
                    this.ability.nowNeigong = nowNeigong;
                }
            }
            else {
                this.ability.nowNeigong = nowNeigong;
            }
            if (this.isMainPlayer) {
                ////GameApp.MainPanel.bloodBtn.text = '血量:(' + this.ability.nowhp + '/' + this.ability.maxhp + ')';
            }
        }

        /**
         * 战力
         * @param fight 
         */
        public changeFight(fight: number) {
            this.ability.nFight = fight;
            if (this.isMainPlayer) {
                ////GameApp.MainPanel.atkBtn.text = '战力:' + this.ability.maxatk;
            }
        }

        /**
         * 等级
         * @param level 
         */
        public changeLevel(level: number) {
            this.level = level;
        }



    }
}
