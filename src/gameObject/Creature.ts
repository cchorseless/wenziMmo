
module GameObject {
    export class Ability {
        // 血
        public nowHP: number = 0;
        public nMaxHP: number = 0;
        // 攻击
        public nMinAttack: number = 0;
        public nMaxAttack: number = 0;
        // 蓝
        public nowMP: number = 0;
        public nMaxMP: number = 0;
        // 经验
        public nowexp: number = 0;
        public maxexp: number = 0;

        // 防御
        public mindef: number = 0;
        public maxdef: number = 0;
        // 内功
        public nInnerValue = 0;//内功最大值
        public nowInnerValue = 0;//内功当前值

        public nFight = 0;// 战斗力

        public nMaxDC = 0; //物理攻击上限值
        public nMinDC = 0; //物理攻击下限值

        public nMaxMC = 0; //自然魔法攻击上限值
        public nMinMC = 0; //自然魔法攻击下限值

        public nMaxSC = 0; //灵魂魔法攻击上限值
        public nMinSC = 0; //灵魂魔法攻击下限值

        public nMaxAC = 0; //物理防御上限值
        public nMinAC = 0; //物理防御下限值

        public nMaxMAC = 0; //全系法术防御上限值
        public nMinMAC = 0; //全系法术防御下限值

        public nHit = 0; //命中
        public nHitRatio = 0;//命中率

        public nJuck = 0; //闪避
        public nJuckRatio = 0;//闪避率

        public nCrit = 0; //暴击
        public nCritRatio = 0;//暴击率

        public nCritResi = 0; //韧性
        public nCritResiRatio = 0;//韧性抵抗率

        public nAtkCrit = 0; //暴击伤害,每次暴击额外增加的伤害
        public nLucky = 0; //幸运
        public nRestoreHp = 0; //每次恢复血量，正负
        public nRestoreMp = 0; //每次恢复蓝量，正负
        public nMoveSpeed = 0;//移动速度
        public nPalsyRatio = 0;//麻痹几率
        public nPalsyResiRatio = 0;//抗麻痹几率
        public nCoAtkPower = 0;//合击威力
        public nAtkAdd1 = 0;//对战士伤害增加
        public nAtkReduce1 = 0;//受战士伤害减少
        public nAtkAdd2 = 0;	//对法师伤害增加
        public nAtkReduce2 = 0;//受法师伤害减少
        public nAtkAdd3 = 0;//对道士伤害增加
        public nAtkReduce3 = 0;//受道士伤害减少
        public nAtkAddMon = 0;	//对怪物伤害增加
        public nAtkReduceMon = 0;	//受怪物伤害减少
        public nAtkAddBoss = 0;//对BOSS伤害增加
        public nAtkReduceBoss = 0;//受BOSS伤害减少
        public nAtkAddHero = 0;//增加对英雄伤害
        public nAtkReduceHero = 0;//减少受英雄伤害

        public nInnerRestore = 0;//内功恢复
        public nInnerResi = 0;//内功抵伤
        public nFinalDamageAdd = 0;//最终伤害增加
        public nFinalDamageReduce = 0;//最终伤害减免
        public nCritAdd2BOSS = 0;//增加对BOSS的暴击
        public nAtkCritAdd2BOSS = 0;//增加对BOSS的爆伤
        public nCoAtkReduce = 0;//受合击伤害减少
        public nCritReduce = 0;//受暴击伤害减少
        public nRestoreAnger = 0;//怒气恢复(万分比)	
        public nCoAtt2Monster = 0;//合击对怪物增伤率
        public nCoAtt2Player = 0;//合击对怪物增伤害
        public nCoAttLvl = 0;//合击技能等级
        public nHpPer = 0;//生命万分比

    }

    /**
     * 战力计算
     */
    export const AbilityWorth = {
        1:  [0.445, 1, 0.6], //最大血量
        2:  [0, 0, 0], //最大蓝量
        3:  [0, 0, 0], //物理/魔法/道术攻击上限全部
        4:  [0, 0, 0], //物理/魔法/道术攻击下限全部
        5:  [1.85, 0, 0], //物理攻击上限值,攻击力上限，影响所有职业普通攻击和战士技能的最大伤害。
        6:  [1.85, 0, 0], //物理攻击下限值,攻击力下限，影响所有职业普通攻击和战士技能的最小伤害。
        7:  [0, 2, 0], //自然魔法攻击上限值,魔法攻击上限，影响法师技能的最大伤害。
        8:  [0, 2, 0], //自然魔法攻击下限值,魔法攻击下限，影响法师技能的最小伤害。
        9:  [0, 0, 2], //灵魂魔法攻击上限值,道士攻击上限，影响法师技能的最大伤害。
        10:  [0, 0, 2], //灵魂魔法攻击下限值,道术攻击下限，影响法师技能的最小伤害。
        11:  [1.5, 1.5, 1.5], //物理防御上限值,防御上限，影响受到物理攻击时可以降低的伤害。
        12:  [1.5, 1.5, 1.5], //物理防御下限值,防御下限，影响受到物理攻击时可以降低的伤害。
        13:  [1.5, 1.5, 1.5], //全系法术防御上限值,魔法防御上限，影响受到魔法和道术攻击时可以降低的伤害。
        14:  [1.5, 1.5, 1.5], //全系法术防御下限值,魔法防御下限，影响受到魔法和道术攻击时可以降低的伤害。
        15:  [4.8, 4.8, 4.8], //命中(准确),在攻击时，增加命中目标的几率。当自身准确大于目标闪避时，目标不能闪避攻击
        16:  [0, 0, 0], //命中的概率，准确值折算成命中率
        17:  [4.8, 4.8, 4.8], //闪避,影响受到所有攻击可以闪避的概率
        18:  [0, 0, 0], //闪避的概率，闪避值折算成闪避率
        19:  [7.5, 7.5, 7.5], //暴击,在攻击时，增加暴击的几率。每160点暴击增加1%的暴击率
        20:  [12, 12, 12], //暴击率, 暴击的概率
        21:  [7.5, 7.5, 7.5], //韧性(暴抗),受攻击时，减少被暴击的几率。每160点韧性抵消对方1%的暴击率
        22:  [0, 0, 0], //(韧性率)抗暴率, 抵抗暴击的概率
        23:  [1, 1, 1], //暴击伤害,暴击时，暴伤越高，可以造成更多的额外伤害
        24:  [0, 0, 0], //幸运
        25:  [2, 4, 2.4], //每次恢复血量，正负,每N秒自动回复生命//生命恢复是英雄抗怪能力最重要的指标。
        26:  [0, 0, 0], //每次恢复蓝量，正负,每N秒自动回复法力
        27:  [0, 0, 0], //增加人物行走时的移动速度
        28:  [0, 0, 0], //麻痹概率
        29:  [0, 0, 0], //抗麻痹概率
        30:  [0, 0, 0], //合击威力
        31:  [1.6, 1.6, 1.6], //对战士伤害增加
        32:  [1.6, 1.6, 1.6], //受战士伤害减少
        33:  [1.6, 1.6, 1.6], //对法师伤害增加
        34:  [1.6, 1.6, 1.6], //受法师伤害减少
        35:  [1.6, 1.6, 1.6], //对道士伤害增加
        36:  [1.6, 1.6, 1.6], //受道士伤害减少
        37:  [0, 0, 0], //对怪物伤害增加
        38:  [0, 0, 0], //受怪物伤害减少
        39:  [0, 0, 0], //对BOSS伤害增加
        40:  [0, 0, 0], //受BOSS伤害减少
        41:  [0, 0, 0], //增加对英雄伤害
        42:  [0, 0, 0], //减少受英雄伤害
        43:  [0.6, 0.75, 0.6], //内功值(能量)，护盾能量最大值
        44:  [2, 4, 2.4], //恢复内功值
        45:  [0, 0, 0], //内功抵消伤害比例
        46:  [0, 0, 0], //增伤,提高攻击时可以造成的伤害（百分比）
        47:  [0, 0, 0], //减伤,降低受到的所有伤害（百分比）
        48:  [3, 3, 3], //增加对BOSS的暴击
        49:  [0.25, 0.25, 0.25], //增加对BOSS的暴伤
        50:  [0, 0, 0], //受合击伤害减少
        51:  [0, 0, 0], //受暴击伤害减少
        52:  [0, 0, 0], //怒气恢复率
        53:  [0, 0, 0], //合击对怪增伤率
        54:  [0, 0, 0], //合击对人增伤率
        55:  [0, 0, 0], //增加合击技能等级
        56:  [0, 0, 0], //生命万分比

    }

    export class Wealth {
        // 金币
        public _gold: number = 0;
        public _gold_lock: number = 0;
        // 原来分金币和绑定金币，现在合成一个
        public get gold(): number {
            return this._gold + this._gold_lock;
        }
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
        public objName: string;//名字
        public level: number = 1;//等级
        public lifestate: number;// 生命状态
        public tempId: number;// 临时ID
        public onlyId: ProtoCmd.Int64;// 唯一ID
        public mapName: string;// 地图名字
        public roomId: number;//房间ID
        public dir: number;//8方向朝向
        public ability: Ability;//能力信息
        public feature;//外观特征
        public location: ProtoCmd.CretLocation;//位置信息
        public ui_item;//绑定的UI组件
        public constructor() {
            this.ability = new Ability();
            this.location = new ProtoCmd.CretLocation();
        }

        public clear(): void {
            if (this.ui_item) {
                this.ui_item.removeSelf();
                this.ui_item.item = null;
            }
            this.ui_item = null;
            console.log(this.objName + '离开视野');
        }


        /**
         * 获取名字
         * @param name 
         */
        public filterName(name: string): string {
            if (name != undefined) {
                let arr = name.split('_');
                return arr[0];
            }
            return name;
        }
        /**
         * 是否是自己
         */
        public get isMainPlayer(): boolean {
            return this.onlyId == GameApp.MainPlayer.onlyId
        }

        /**
         * 修改战斗属性
         * @param ArpgAbility 
         */
        public changeAbility(ArpgAbility: ProtoCmd.ArpgAbility, type: number = 0): void {
            let ability = this.ability;
            switch (type) {
                case 1:
                    ability = GameApp.GameEngine.warriorAbility;
                    break;
                case 2:
                    ability = GameApp.GameEngine.masterAbility;
                    break;
                case 3:
                    ability = GameApp.GameEngine.taoistAbility;
                    break;
            }
            ability.nMaxHP = ArpgAbility.getValue('nMaxHP'); //最大血量
            ability.nMaxMP = ArpgAbility.getValue('nMaxMP'); //最大蓝量
            ability.nMaxAttack = ArpgAbility.getValue('nMaxAttack');//攻击上限
            ability.nMinAttack = ArpgAbility.getValue('nMinAttack');//攻击下限
            ability.nMaxDC = ArpgAbility.getValue('nMaxDC'); //物理攻击上限值
            ability.nMinDC = ArpgAbility.getValue('nMinDC'); //物理攻击下限值
            ability.nMaxMC = ArpgAbility.getValue('nMaxMC'); //自然魔法攻击上限值
            ability.nMinMC = ArpgAbility.getValue('nMinMC'); //自然魔法攻击下限值
            ability.nMaxSC = ArpgAbility.getValue('nMaxSC'); //灵魂魔法攻击上限值
            ability.nMinSC = ArpgAbility.getValue('nMinSC'); //灵魂魔法攻击下限值
            ability.nMaxAC = ArpgAbility.getValue('nMaxAC'); //物理防御上限值
            ability.nMinAC = ArpgAbility.getValue('nMinAC'); //物理防御下限值
            ability.nMaxMAC = ArpgAbility.getValue('nMaxMAC'); //全系法术防御上限值
            ability.nMinMAC = ArpgAbility.getValue('nMinMAC'); //全系法术防御下限值
            ability.nHit = ArpgAbility.getValue('nHit'); //命中
            ability.nHitRatio = ArpgAbility.getValue('nHitRatio');//命中率
            ability.nJuck = ArpgAbility.getValue('nJuck'); //闪避
            ability.nJuckRatio = ArpgAbility.getValue('nJuckRatio');//闪避率
            ability.nCrit = ArpgAbility.getValue('nCrit'); //暴击
            ability.nCritRatio = ArpgAbility.getValue('nCritRatio');//暴击率
            ability.nCritResi = ArpgAbility.getValue('nCritResi'); //暴抗
            ability.nCritResiRatio = ArpgAbility.getValue('nCritResiRatio');//暴抗率
            ability.nAtkCrit = ArpgAbility.getValue('nAtkCrit'); //暴击伤害,每次暴击额外增加的伤害
            ability.nLucky = ArpgAbility.getValue('nLucky'); //幸运
            ability.nRestoreHp = ArpgAbility.getValue('nRestoreHp'); //每次恢复血量，正负
            ability.nRestoreMp = ArpgAbility.getValue('nRestoreMp'); //每次恢复蓝量，正负
            ability.nMoveSpeed = ArpgAbility.getValue('nMoveSpeed');//移动速度
            ability.nPalsyRatio = ArpgAbility.getValue('nPalsyRatio');//麻痹几率
            ability.nPalsyResiRatio = ArpgAbility.getValue('nPalsyResiRatio');//抗麻痹几率
            ability.nCoAtkPower = ArpgAbility.getValue('nCoAtkPower');//合击威力
            ability.nAtkAdd1 = ArpgAbility.getValue('nAtkAdd1');//对战士伤害增加
            ability.nAtkReduce1 = ArpgAbility.getValue('nAtkReduce1');//受战士伤害减少
            ability.nAtkAdd2 = ArpgAbility.getValue('nAtkAdd2');	//对法师伤害增加
            ability.nAtkReduce2 = ArpgAbility.getValue('nAtkReduce2');//受法师伤害减少
            ability.nAtkAdd3 = ArpgAbility.getValue('nAtkAdd3');//对道士伤害增加
            ability.nAtkReduce3 = ArpgAbility.getValue('nAtkReduce3');//受道士伤害减少
            ability.nAtkAddMon = ArpgAbility.getValue('nAtkAddMon');	//对怪物伤害增加
            ability.nAtkReduceMon = ArpgAbility.getValue('nAtkReduceMon');	//受怪物伤害减少
            ability.nAtkAddBoss = ArpgAbility.getValue('nAtkAddBoss');//对BOSS伤害增加
            ability.nAtkReduceBoss = ArpgAbility.getValue('nAtkReduceBoss');//受BOSS伤害减少
            ability.nAtkAddHero = ArpgAbility.getValue('nAtkAddHero');//增加对英雄伤害
            ability.nAtkReduceHero = ArpgAbility.getValue('nAtkReduceHero');//减少受英雄伤害
            ability.nInnerValue = ArpgAbility.getValue('nInnerValue');//内功值
            ability.nInnerRestore = ArpgAbility.getValue('nInnerRestore');//内功恢复
            ability.nInnerResi = ArpgAbility.getValue('nInnerResi');//内功抵伤
            ability.nFinalDamageAdd = ArpgAbility.getValue('nFinalDamageAdd');//最终伤害增加
            ability.nFinalDamageReduce = ArpgAbility.getValue('nFinalDamageReduce');//最终伤害减免
            ability.nCritAdd2BOSS = ArpgAbility.getValue('nCritAdd2BOSS');//增加对BOSS的暴击
            ability.nAtkCritAdd2BOSS = ArpgAbility.getValue('nAtkCritAdd2BOSS');//增加对BOSS的爆伤
            ability.nCoAtkReduce = ArpgAbility.getValue('nCoAtkReduce');//受合击伤害减少
            ability.nCritReduce = ArpgAbility.getValue('nCritReduce');//受暴击伤害减少
            ability.nRestoreAnger = ArpgAbility.getValue('nRestoreAnger');//怒气恢复(万分比)	
            ability.nCoAtt2Monster = ArpgAbility.getValue('nCoAtt2Monster');//合击对怪物增伤率
            ability.nCoAtt2Player = ArpgAbility.getValue('nCoAtt2Player');//合击对怪物增伤害
            ability.nCoAttLvl = ArpgAbility.getValue('nCoAttLvl');//合击技能等级
            ability.nHpPer = ArpgAbility.getValue('nHpPer');//生命万分比
        }

        /**
         * 血量
         * @param nowHP 
         * @param nMaxHP 
         */
        public changeHp(nowHP: number, nMaxHP: number = 0) {
            if (nMaxHP > 0) {
                this.ability.nMaxHP = nMaxHP;
                if (nowHP > 0) {
                    this.ability.nowHP = nowHP;
                }
            }
            else {
                this.ability.nowHP = nowHP;
            }
            if (this.ui_item) {
                this.ui_item.updateUI();
            }
        }


        /**
        * 蓝量
        * @param nowMP 
        * @param nMaxMP 
        */
        public changeMp(nowMP: number, nMaxMP: number = 0) {
            if (nMaxMP > 0) {
                this.ability.nMaxMP = nMaxMP;
                if (nowMP > 0) {
                    this.ability.nowMP = nowMP;
                }
            }
            else {
                this.ability.nowMP = nowMP;
            }
            if (this.isMainPlayer) {
                ////GameApp.MainPanel.bloodBtn.text = '血量:(' + this.ability.nowHP + '/' + this.ability.nMaxHP + ')';
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
                GameApp.LListener.event(LcpEvent.UPDATE_UI_PLAYER_EXP);
            }

        }

        /**
         * 攻击
         * @param nMinAttack 
         * @param nMaxAttack 
         */
        public changeAtk(nMinAttack: number, nMaxAttack: number) {
            this.ability.nMinAttack = nMinAttack;
            this.ability.nMaxAttack = nMaxAttack;
            if (this.isMainPlayer) {
                ////GameApp.MainPanel.atkBtn.text = '战力:' + this.ability.nMaxAttack;
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
                this.ability.nInnerValue = maxNeigong;
                if (nowNeigong > 0) {
                    this.ability.nInnerValue = nowNeigong;
                }
            }
            else {
                this.ability.nowInnerValue = nowNeigong;
            }
            if (this.isMainPlayer) {
                ////GameApp.MainPanel.bloodBtn.text = '血量:(' + this.ability.nowHP + '/' + this.ability.nMaxHP + ')';
            }
        }

        /**
         * 战力
         * @param fight 
         */
        public changeFight(fight: number) {
            this.ability.nFight = fight;
            if (this.isMainPlayer) {
                ////GameApp.MainPanel.atkBtn.text = '战力:' + this.ability.nMaxAttack;
            }
        }


        /**
         * 等级
         * @param level 
         */
        public changeLevel(level: number) {
            this.level = level;
            GameApp.LListener.event(LcpEvent.UPDATE_UI_PLAYER_LEVEL);
        }

        /***********************************战斗模块*********************************** */
        /**
         * 尝试攻击，检查释放能攻击
         */
        public tryAttack(target: Creature, skillID: number = 1000): void {
        }

        /**
         * 攻击开始
         */
        public startAttack(): void {
        }

        /**
         * 播放技能
         * @param dwTargetId 受击人
         * @param nMagicId 技能ID
         * @param dwActionTick 花费时间
         */
        public showSkill(dwTargetId, nMagicId, dwActionTick): void {
            let targeter = GameApp.MainPlayer.findViewObj(dwTargetId);
            if (targeter) {
                let selfPoint = (this.ui_item as Laya.Box).localToGlobal(new Laya.Point(0, 0), false);
                let targetPoint = (targeter.ui_item as Laya.Box).localToGlobal(new Laya.Point(0, 0), false);
                let _skeGroup: SkeletonUtil.SkeletonGroup = new SkeletonUtil.SkeletonGroup();
                _skeGroup.rotation = -90;
                _skeGroup.loadRes(['sk/skill/huoqu/B_fire_02_ske.sk', 'sk/skill/huoqu/S_fire_02_ske.sk'], () => {
                    _skeGroup.pos(selfPoint.x + 100, selfPoint.y)
                    PanelManage.Main.addChild(_skeGroup);
                    Laya.Tween.to(_skeGroup, { x: targetPoint.x + 50, y: targetPoint.y + 50 }, 500, null, Laya.Handler.create(this, () => {
                        _skeGroup.showChild(1);
                        _skeGroup.play(0, false, true, Laya.Handler.create(this, () => {
                            _skeGroup.removeSelf()
                        }))
                    }))
                })
            }
            else {
                TipsManage.showTips('技能没有找到目标对象');
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
        }
    }
}
