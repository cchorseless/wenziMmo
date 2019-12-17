module SheetConfig {
    export class mydb_magic_tbl {
        private data; private _instance; public constructor(data) { this.data = data; }
        public static getInstance(data): mydb_magic_tbl { let Class: any = this; if (!Class._instance) { Class._instance = new Class(data); } return Class._instance; }
        /**
         *  技能编号
         */
        public SKILL_ID(configID: string): number { return this.data[configID][0] }
        /**
         *  deleted
         */
        public DELETED(configID: string): number { return this.data[configID][1] }
        /**
         *  技能名称
         */
        public NAME(configID: string): string { return this.data[configID][2] }
        /**
         *  技能等级
         */
        public LEVEL(configID: string): number { return this.data[configID][3] }
        /**
         *  技能升级熟练度
         */
        public PROFICIENCY(configID: string): number { return this.data[configID][4] }
        /**
         *  技能升级所需等级
         */
        public SKILLS_UPGRADING(configID: string): number { return this.data[configID][5] }
        /**
         *  升级后编号
         */
        public LEVEL_ID(configID: string): number { return this.data[configID][6] }
        /**
         *  升级所需物品ID
         */
        public ITEM_ID(configID: string): string { return this.data[configID][7] }
        /**
         *  升级所需物品个数
         */
        public NUMBER(configID: string): number { return this.data[configID][8] }
        /**
         *  是否公共CD
         */
        public PUBLICCD(configID: string): number { return this.data[configID][9] }
        /**
         *  技能职业
         */
        public SKILLED_OCCUPATION(configID: string): number { return this.data[configID][10] }
        /**
         *  包括自身
         */
        public INCLUDING_ONESELF(configID: string): number { return this.data[configID][11] }
        /**
         *  包括死亡
         */
        public INCLUDING_DEATH(configID: string): number { return this.data[configID][12] }
        /**
         *  攻击伤害值
         */
        public ATK_NUMBER(configID: string): number { return this.data[configID][13] }
        /**
         *  攻击伤害系数
         */
        public ATTACK_DAMAGE(configID: string): number { return this.data[configID][14] }
        /**
         *  命中系数
         */
        public HIT_COEFFICIENT(configID: string): number { return this.data[configID][15] }
        /**
         *  伤害类型
         */
        public ATK_TYPE(configID: string): number { return this.data[configID][16] }
        /**
         *  起手法力
         */
        public MANIPULATION(configID: string): number { return this.data[configID][17] }
        /**
         *  消耗法力
         */
        public CONSUMPTION_MANA(configID: string): number { return this.data[configID][18] }
        /**
         *  消耗法力系数
         */
        public CONSUMPTION_COEFFICIENT(configID: string): number { return this.data[configID][19] }
        /**
         *  冷却时间
         */
        public CD(configID: string): number { return this.data[configID][20] }
        /**
         *  攻击个数
         */
        public NUMBER_ATTACKS(configID: string): number { return this.data[configID][21] }
        /**
         *  点面
         */
        public POINT_SURFACE(configID: string): number { return this.data[configID][22] }
        /**
         *  最大攻击范围
         */
        public MAXIMUM_RANGE(configID: string): number { return this.data[configID][23] }
        /**
         *  魔法方向
         */
        public MAGIC_DIRECTION(configID: string): number { return this.data[configID][24] }
        /**
         *  魔法类型
         */
        public MAGIC_TYPE(configID: string): number { return this.data[configID][25] }
        /**
         *  魔法元素
         */
        public ELEMIX(configID: string): number { return this.data[configID][26] }
        /**
         *  主动被动
         */
        public ACTIVE_PASSIVE(configID: string): number { return this.data[configID][27] }
        /**
         *  技能成功率
         */
        public SKILL_SUCCESS(configID: string): number { return this.data[configID][28] }
        /**
         *  技能模式
         */
        public SKILLS_MODEL(configID: string): number { return this.data[configID][29] }
        /**
         *  SELFBUFFID
         */
        public SELFBUFFID(configID: string): number { return this.data[configID][30] }
        /**
         *  BUFFID
         */
        public BUFFID(configID: string): string { return this.data[configID][31] }
        /**
         *  公式编号
         */
        public FORMULA_NUMBER(configID: string): number { return this.data[configID][32] }
        /**
         *  互斥技能
         */
        public EXCLUSION_SKILLS(configID: string): number { return this.data[configID][33] }
        /**
         *  使用所需物品ID
         */
        public REQUIRED_ITEMSID(configID: string): number { return this.data[configID][34] }
        /**
         *  需要寿命值
         */
        public LIFE_VALUE(configID: string): number { return this.data[configID][35] }
        /**
         *  无起手动作
         */
        public NOSTARTING(configID: string): number { return this.data[configID][36] }
        /**
         *  起手动作后置
         */
        public POSTPOSITION_ACTION(configID: string): number { return this.data[configID][37] }
        /**
         *  自动锁定
         */
        public AUTOMATIC_LOCKING(configID: string): number { return this.data[configID][38] }
        /**
         *  自动锁定修改
         */
        public LOCKING_MODIFY(configID: string): number { return this.data[configID][39] }
        /**
         *  连续施放
         */
        public CONTINUOUS_APPLICATION(configID: string): number { return this.data[configID][40] }
        /**
         *  连续施放修改
         */
        public CONTINUOUS_RELEASE(configID: string): number { return this.data[configID][41] }
        /**
         *  跑动中释放
         */
        public RELEASE_RUNNING(configID: string): number { return this.data[configID][42] }
        /**
         *  翅膀技能
         */
        public WING_SKILLS(configID: string): number { return this.data[configID][43] }
        /**
         *  技能描述
         */
        public SKILL_DESCRIPTION(configID: string): string { return this.data[configID][44] }
        /**
         *  内功类型
         */
        public INTERNAL_TYPE(configID: string): number { return this.data[configID][45] }
        /**
         *  攻击间隔
         */
        public ATTACK_INTERVAL(configID: string): number { return this.data[configID][46] }
        /**
         *  转生等级
         */
        public REINCARNATION_LEVEL(configID: string): number { return this.data[configID][47] }
        /**
         *  激活条件
         */
        public ACTIVATION_CONDITIONS(configID: string): string { return this.data[configID][48] }
        /**
         *  对怪增伤系数
         */
        public INJURIES_STRANGERS(configID: string): number { return this.data[configID][49] }
        /**
         *  对怪增伤值
         */
        public INCREASED_INJURY(configID: string): number { return this.data[configID][50] }
        /**
         *  技能特效ID
         */
        public SKILL_EFFECTSID(configID: string): string { return this.data[configID][51] }
        /**
         *  熟练度获取方式
         */
        public PROFICIENCY_ACQUISITION(configID: string): string { return this.data[configID][52] }
        /**
         *  增加熟练度的物品ID
         */
        public INCREASE_PROFICIENCY(configID: string): number { return this.data[configID][53] }
        /**
         *  技能Icon
         */
        public ICONPATH(configID: string): number { return this.data[configID][54] }
        /**
         *  技能类型
         */
        public SKILLTYPE(configID: string): number { return this.data[configID][55] }
        /**
         *  技能五行属性
         */
        public SKILLEXTRAPROP(configID: string): number { return this.data[configID][56] }
        /**
         *  技能使用性别
         */
        public SKILLUSESEX(configID: string): number { return this.data[configID][57] }
        /**
         *  技能品质
         */
        public SKILLQUALITY(configID: string): number { return this.data[configID][58] }
        /**
         *  内功效率
         */
        public INTERNALCOUNT(configID: string): number { return this.data[configID][59] }
        /**
         *  技能效果
         */
        public SKILLEFFECT(configID: string): string { return this.data[configID][60] }
        /**
         *  技能学习门派职位
         */
        public SKILLLEARNGUILDLVNEED(configID: string): number { return this.data[configID][61] }
        /**
        * 获取技能数据
        * @param skillID 技能编号
        */
        public getAllData(skillID: number): any {
            let skillDate = [];
            for (let i in this.data) {
                if (this.data[i][1] == skillID) {
                    let base = this.data[i]
                    skillDate.push(base)
                }
            }
            return skillDate;
        }
    }
}