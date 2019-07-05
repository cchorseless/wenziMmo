/**
 * 配置表数据结构体
 */

class CfgItemDB {
    public baseID: number;
    public name: string;
    public level: number;
    public type: number;
    public quality: number;
    public pos: number;
    public sex: number;
    public job: number;
    public warriorEffID: number;
    public mageEffID: number;
    public monkEffID: number;
    public color: number;
    public desc: string;
    public zslevel: number;
    public intensify: number;
    public constructor() {

    }
}

class CfgEffectDB {
    public dwID: number;						//效果ID
    public deleted: number;
    public szName: string;	                    //效果名字
    public dwNextId: number;					//升级后效果ID
    public nMaxHP: number;				//最大血量
    public nMaxMP: number;				//最大蓝量
    public nMaxAtk: number;			//物理/魔法/道术攻击上限全部
    public nMinAtk: number;			//物理/魔法/道术攻击下限全部
    public nMaxDC: number;				//物理攻击上限值,攻击力上限，影响所有职业普通攻击和战士技能的最大伤害。
    public nMinDC: number;				//物理攻击下限值,攻击力下限，影响所有职业普通攻击和战士技能的最小伤害。
    public nMaxMC: number;				//自然魔法攻击上限值,魔法攻击上限，影响法师技能的最大伤害。
    public nMinMC: number;				//自然魔法攻击下限值,魔法攻击下限，影响法师技能的最小伤害。
    public nMaxSC: number;				//灵魂魔法攻击上限值,道士攻击上限，影响法师技能的最大伤害。
    public nMinSC: number;				//灵魂魔法攻击下限值,道术攻击下限，影响法师技能的最小伤害。
    public nMaxAC: number;				//物理防御上限值,防御上限，影响受到物理攻击时可以降低的伤害。
    public nMinAC: number;				//物理防御下限值,防御下限，影响受到物理攻击时可以降低的伤害。
    public nMaxMAC: number;			//全系法术防御上限值,魔法防御上限，影响受到魔法和道术攻击时可以降低的伤害。
    public nMinMAC: number;			//全系法术防御下限值,魔法防御下限，影响受到魔法和道术攻击时可以降低的伤害。
    public nHit: number;				//命中(准确),在攻击时，增加命中目标的几率。当自身准确大于目标闪避时，目标不能闪避攻击
    public nHitRate: number;			//命中的概率，准确值折算成命中率
    public nJuck: number;				//闪避,影响受到所有攻击可以闪避的概率
    public nJuckRate: number;			//闪避的概率，闪避值折算成闪避率
    public nCrit: number;				//暴击,在攻击时，增加暴击的几率。每160点暴击增加1%的暴击率
    public nCritRate: number;			//暴击率, 暴击的概率
    public nToughness: number;			//韧性(暴抗),受攻击时，减少被暴击的几率。每160点韧性抵消对方1%的暴击率
    public nToughnessRate: number;		//(韧性率)抗暴率, 抵抗暴击的概率
    public nAtkCrit: number;			//暴击伤害,暴击时，暴伤越高，可以造成更多的额外伤害
    public nLucky: number;				//幸运,幸运值越高，出现攻击（所有）上限的几率越大，为9时必出
    public nRestoreHp: number;			//每次恢复血量，正负,每N秒自动回复生命//生命恢复是英雄抗怪能力最重要的指标。
    public nRestoreMp: number;			//每次恢复蓝量，正负,每N秒自动回复法力
    public nMoveSpeed: number;			//增加人物行走时的移动速度
    public nPalsyRate: number;			//麻痹概率
    public nPalsyResi: number;			//抗麻痹概率
    public nUnionAtkRate: number;		//合击威力
    public nIncAtkWarrior: number;		//对战士伤害增加
    public nDecAtkWarrior: number;		//受战士伤害减少
    public nIncAtkMage: number;		//对法师伤害增加
    public nDecAtkMage: number;		//受法师伤害减少
    public nIncAtkMonk: number;		//对道士伤害增加
    public nDecAtkMonk: number;		//受道士伤害减少
    public nIncAtkMonster: number;		//对怪物伤害增加
    public nDecAtkMonster: number;		//受怪物伤害减少
    public nIncAtkBoss: number;		//对BOSS伤害增加
    public nDecAtkBoss: number;		//受BOSS伤害减少
    public nIncAtkHero: number;		//增加对英雄伤害
    public nDecAtkHero: number;		//减少受英雄伤害
    public nEnergy: number;			//内功值(能量)，护盾能量最大值
    public nRestoreEnergy: number;		//恢复内功值
    public nEnergyResi: number;		//内功抵消伤害比例
    public nIncDamage: number;			//增伤,提高攻击时可以造成的伤害（百分比）
    public nDecDamage: number;			//减伤,降低受到的所有伤害（百分比）
    public nIncBossCrit: number;		//增加对BOSS的暴击率
    public nIncBossAtkCrit: number;	//增加对BOSS的暴伤值
    public nDecUnionAtkDamage: number; //受合击伤害减少率
    public nDecAtkCritDamage: number;	//受暴击伤害减少率
    public nRestoreAnger: number;		//怒气恢复率（万分比）
    public nUAToMonster: number;		//合击对怪增伤率
    public nUAToPlayer: number;		//合击对人增伤率
    public nUASkillLvl: number;		//合击技能等级
    public nHpPer: number;             //生命万分比

    public constructor() {

    }
}

class CfgMonsterDB {
    public ID: number;
    public name: string;
    public constructor() {

    }
}

