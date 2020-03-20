module SheetConfig {
    export class mydb_magic_tbl {
        public data; private _instance; public constructor(data) { this.data = data; }
        public static getInstance(data): mydb_magic_tbl { let Class: any = this; if (!Class._instance) { Class._instance = new Class(data); } return Class._instance; }
        /**
         *  技能ID编号*100+技能等級
         */
        public ID(configID): string { if (this.data[configID]) { return this.data[configID][0] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能ID编号
         */
        public SKILL_ID(configID): number { if (this.data[configID]) { return this.data[configID][1] } else { throw new Error(configID + 'cant find') } }
        /**
         *  删除
         */
        public DELETED(configID): number { if (this.data[configID]) { return this.data[configID][2] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能名字
         */
        public NAME(configID): string { if (this.data[configID]) { return this.data[configID][3] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能等级
         */
        public LEVEL(configID): number { if (this.data[configID]) { return this.data[configID][4] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能升级所需经验
         */
        public PROFICIENCY(configID): number { if (this.data[configID]) { return this.data[configID][5] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能升级需要玩家等级
         */
        public SKILLS_UPGRADING(configID): number { if (this.data[configID]) { return this.data[configID][6] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能升级后的ID编号
         */
        public LEVEL_ID(configID): number { if (this.data[configID]) { return this.data[configID][7] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能升级素材编号
         */
        public ITEM_ID(configID): string { if (this.data[configID]) { return this.data[configID][8] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能升级素材数量
         */
        public NUMBER(configID): number { if (this.data[configID]) { return this.data[configID][9] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能是否会使用一个全部进入CD
         */
        public PUBLICCD(configID): number { if (this.data[configID]) { return this.data[configID][10] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能所能用的职业
         */
        public SKILLED_OCCUPATION(configID): number { if (this.data[configID]) { return this.data[configID][11] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能是否会命中自身
         */
        public INCLUDING_ONESELF(configID): number { if (this.data[configID]) { return this.data[configID][12] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能是否会命中尸体
         */
        public INCLUDING_DEATH(configID): number { if (this.data[configID]) { return this.data[configID][13] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能伤害
         */
        public ATK_NUMBER(configID): number { if (this.data[configID]) { return this.data[configID][14] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能伤害倍率
         */
        public ATTACK_DAMAGE(configID): number { if (this.data[configID]) { return this.data[configID][15] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能命中总和
         */
        public HIT_COEFFICIENT(configID): number { if (this.data[configID]) { return this.data[configID][16] } else { throw new Error(configID + 'cant find') } }
        /**
         *  远程/近战
         */
        public ATK_TYPE(configID): number { if (this.data[configID]) { return this.data[configID][17] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能起手消耗魔力
         */
        public MANIPULATION(configID): number { if (this.data[configID]) { return this.data[configID][18] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能总共消耗魔力
         */
        public CONSUMPTION_MANA(configID): number { if (this.data[configID]) { return this.data[configID][19] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能法力消耗总和
         */
        public CONSUMPTION_COEFFICIENT(configID): number { if (this.data[configID]) { return this.data[configID][20] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能冷却时间
         */
        public CD(configID): number { if (this.data[configID]) { return this.data[configID][21] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能最大攻击数量
         */
        public NUMBER_ATTACKS(configID): number { if (this.data[configID]) { return this.data[configID][22] } else { throw new Error(configID + 'cant find') } }
        /**
         *  攻击范围的标记
         */
        public POINT_SURFACE(configID): number { if (this.data[configID]) { return this.data[configID][23] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能最大攻击范围
         */
        public MAXIMUM_RANGE(configID): number { if (this.data[configID]) { return this.data[configID][24] } else { throw new Error(configID + 'cant find') } }
        /**
         *  0物理/1魔法
         */
        public INJURY_TYPE(configID): number { if (this.data[configID]) { return this.data[configID][25] } else { throw new Error(configID + 'cant find') } }
        /**
         *  指向与非指向
         */
        public MAGIC_DIRECTION(configID): number { if (this.data[configID]) { return this.data[configID][26] } else { throw new Error(configID + 'cant find') } }
        /**
         *  魔法技能的类型
         */
        public MAGIC_TYPE(configID): number { if (this.data[configID]) { return this.data[configID][27] } else { throw new Error(configID + 'cant find') } }
        /**
         *  ？？
         */
        public ELEMIX(configID): number { if (this.data[configID]) { return this.data[configID][28] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能为主动释放还是被动
         */
        public ACTIVE_PASSIVE(configID): number { if (this.data[configID]) { return this.data[configID][29] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能释放成功概率
         */
        public SKILL_SUCCESS(configID): number { if (this.data[configID]) { return this.data[configID][30] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能的释放模式
         */
        public SKILLS_MODEL(configID): number { if (this.data[configID]) { return this.data[configID][31] } else { throw new Error(configID + 'cant find') } }
        /**
         *  自身释放BUFF技能的ID
         */
        public SELFBUFFID(configID): number { if (this.data[configID]) { return this.data[configID][32] } else { throw new Error(configID + 'cant find') } }
        /**
         *  BUFFID
         */
        public BUFFID(configID): string { if (this.data[configID]) { return this.data[configID][33] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能公式的编号
         */
        public FORMULA_NUMBER(configID): number { if (this.data[configID]) { return this.data[configID][34] } else { throw new Error(configID + 'cant find') } }
        /**
         *  不能同时存在的技能
         */
        public EXCLUSION_SKILLS(configID): string { if (this.data[configID]) { return this.data[configID][35] } else { throw new Error(configID + 'cant find') } }
        /**
         *  使用BUFF所需要物品ID
         */
        public REQUIRED_ITEMSID(configID): number { if (this.data[configID]) { return this.data[configID][36] } else { throw new Error(configID + 'cant find') } }
        /**
         *  恢复性BUFF的物品血量
         */
        public LIFE_VALUE(configID): number { if (this.data[configID]) { return this.data[configID][37] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能是否有抬手动作
         */
        public NOSTARTING(configID): number { if (this.data[configID]) { return this.data[configID][38] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能后摇
         */
        public POSTPOSITION_ACTION(configID): number { if (this.data[configID]) { return this.data[configID][39] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能自动锁定目标
         */
        public AUTOMATIC_LOCKING(configID): number { if (this.data[configID]) { return this.data[configID][40] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能修改锁定目标
         */
        public LOCKING_MODIFY(configID): number { if (this.data[configID]) { return this.data[configID][41] } else { throw new Error(configID + 'cant find') } }
        /**
         *  连续释放技能
         */
        public CONTINUOUS_APPLICATION(configID): number { if (this.data[configID]) { return this.data[configID][42] } else { throw new Error(configID + 'cant find') } }
        /**
         *  修改连续释放的技能
         */
        public CONTINUOUS_RELEASE(configID): number { if (this.data[configID]) { return this.data[configID][43] } else { throw new Error(configID + 'cant find') } }
        /**
         *  跑动中释放技能
         */
        public RELEASE_RUNNING(configID): number { if (this.data[configID]) { return this.data[configID][44] } else { throw new Error(configID + 'cant find') } }
        /**
         *  翅膀自带技能
         */
        public WING_SKILLS(configID): number { if (this.data[configID]) { return this.data[configID][45] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能描述
         */
        public SKILL_DESCRIPTION(configID): string { if (this.data[configID]) { return this.data[configID][46] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能类型
         */
        public INTERNAL_TYPE(configID): number { if (this.data[configID]) { return this.data[configID][47] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能释放间隔
         */
        public ATTACK_INTERVAL(configID): number { if (this.data[configID]) { return this.data[configID][48] } else { throw new Error(configID + 'cant find') } }
        /**
         *  转生等级需求
         */
        public REINCARNATION_LEVEL(configID): number { if (this.data[configID]) { return this.data[configID][49] } else { throw new Error(configID + 'cant find') } }
        /**
         *  使用条件
         */
        public ACTIVATION_CONDITIONS(configID): string { if (this.data[configID]) { return this.data[configID][50] } else { throw new Error(configID + 'cant find') } }
        /**
         *  对怪物的增伤总和
         */
        public INJURIES_STRANGERS(configID): number { if (this.data[configID]) { return this.data[configID][51] } else { throw new Error(configID + 'cant find') } }
        /**
         *  对怪物的增伤值
         */
        public INCREASED_INJURY(configID): number { if (this.data[configID]) { return this.data[configID][52] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能特效ID
         */
        public SKILL_EFFECTSID(configID): string { if (this.data[configID]) { return this.data[configID][53] } else { throw new Error(configID + 'cant find') } }
        /**
         *  熟练度获取方式
         */
        public PROFICIENCY_ACQUISITION(configID): string { if (this.data[configID]) { return this.data[configID][54] } else { throw new Error(configID + 'cant find') } }
        /**
         *  增加熟练度的物品ID
         */
        public INCREASE_PROFICIENCY(configID): number { if (this.data[configID]) { return this.data[configID][55] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能IconID
         */
        public ICONPATH(configID): number { if (this.data[configID]) { return this.data[configID][56] } else { throw new Error(configID + 'cant find') } }
        /**
         *  0拳脚1刀剑2长枪3奇门
         */
        public SKILLTYPE(configID): number { if (this.data[configID]) { return this.data[configID][57] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能属性,0拳脚1刀剑2长枪3奇门
         */
        public SKILLEXTRAPROP(configID): number { if (this.data[configID]) { return this.data[configID][58] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能使用的性别1：男2女0通用
         */
        public SKILLUSESEX(configID): number { if (this.data[configID]) { return this.data[configID][59] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能品质1：入门2中级3高级4绝技
         */
        public SKILLQUALITY(configID): number { if (this.data[configID]) { return this.data[configID][60] } else { throw new Error(configID + 'cant find') } }
        /**
         *  内功效率
         */
        public INTERNALCOUNT(configID): number { if (this.data[configID]) { return this.data[configID][61] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能效果描述
         */
        public SKILLEFFECT(configID): string { if (this.data[configID]) { return this.data[configID][62] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能学习所需的帮派职位 0不限1入门  2内门 3核心 4首席 5副帮主 6帮主 
         */
        public SKILLLEARNGUILDLVNEED(configID): number { if (this.data[configID]) { return this.data[configID][63] } else { throw new Error(configID + 'cant find') } }
        /**
         *  组合技能id
         */
        public COMBINATION_SKILLSID(configID): any { if (this.data[configID]) { return this.data[configID][64] } else { throw new Error(configID + 'cant find') } }
        /**
         *  天赋id
         */
        public TALENTID(configID): any { if (this.data[configID]) { return this.data[configID][65] } else { throw new Error(configID + 'cant find') } }
        /**
         *  属性效果的效果表id
         */
        public ATTRIBUTE_EFFECT(configID): number { if (this.data[configID]) { return this.data[configID][66] } else { throw new Error(configID + 'cant find') } }
        /**
         *  每个品质的资质数值
         */
        public QUALIFICATIONS(configID): number { if (this.data[configID]) { return this.data[configID][67] } else { throw new Error(configID + 'cant find') } }
        /**
         *  升阶所需材料2
         */
        public ITEM_ID2(configID): number { if (this.data[configID]) { return this.data[configID][68] } else { throw new Error(configID + 'cant find') } }
        /**
         *  所需材料2
         */
        public NUMBER2(configID): number { if (this.data[configID]) { return this.data[configID][69] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能设计品质后所需道具ID
         */
        public SKILLS_QUALITY_UP_ITEM(configID): number { if (this.data[configID]) { return this.data[configID][70] } else { throw new Error(configID + 'cant find') } }
        /**
         *  升级所需要的物品数量
         */
        public SKILLS_QUALITY_NUMBER(configID): number { if (this.data[configID]) { return this.data[configID][71] } else { throw new Error(configID + 'cant find') } }
        /**
         *  技能的战力
         */
        public SKILL_CAPABILITY(configID): number { if (this.data[configID]) { return this.data[configID][72] } else { throw new Error(configID + 'cant find') } }
        /**
         *  返还碎片数量
         */
        public RETURN_DEBRIS(configID): number { if (this.data[configID]) { return this.data[configID][73] } else { throw new Error(configID + 'cant find') } }



    }
}