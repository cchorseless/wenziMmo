module SheetConfig{ export class  mydb_magic_tbl { public data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): mydb_magic_tbl { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  技能ID编号
 */
 public SKILL_ID(configID):number { return this.data[configID][0]}
/**
 *  删除
 */
 public DELETED(configID):number { return this.data[configID][1]}
/**
 *  技能名字
 */
 public NAME(configID):string { return this.data[configID][2]}
/**
 *  技能等级
 */
 public LEVEL(configID):number { return this.data[configID][3]}
/**
 *  技能升级所需经验
 */
 public PROFICIENCY(configID):number { return this.data[configID][4]}
/**
 *  技能升级需要玩家等级
 */
 public SKILLS_UPGRADING(configID):number { return this.data[configID][5]}
/**
 *  技能升级后的ID编号
 */
 public LEVEL_ID(configID):number { return this.data[configID][6]}
/**
 *  技能升级素材编号
 */
 public ITEM_ID(configID):string { return this.data[configID][7]}
/**
 *  技能升级素材数量
 */
 public NUMBER(configID):number { return this.data[configID][8]}
/**
 *  技能是否会使用一个全部进入CD
 */
 public PUBLICCD(configID):number { return this.data[configID][9]}
/**
 *  技能所能用的职业
 */
 public SKILLED_OCCUPATION(configID):number { return this.data[configID][10]}
/**
 *  技能是否会命中自身
 */
 public INCLUDING_ONESELF(configID):number { return this.data[configID][11]}
/**
 *  技能是否会命中尸体
 */
 public INCLUDING_DEATH(configID):number { return this.data[configID][12]}
/**
 *  技能伤害
 */
 public ATK_NUMBER(configID):number { return this.data[configID][13]}
/**
 *  技能伤害倍率
 */
 public ATTACK_DAMAGE(configID):number { return this.data[configID][14]}
/**
 *  技能命中总和
 */
 public HIT_COEFFICIENT(configID):number { return this.data[configID][15]}
/**
 *  技能攻击类型
 */
 public ATK_TYPE(configID):number { return this.data[configID][16]}
/**
 *  技能起手消耗魔力
 */
 public MANIPULATION(configID):number { return this.data[configID][17]}
/**
 *  技能总共消耗魔力
 */
 public CONSUMPTION_MANA(configID):number { return this.data[configID][18]}
/**
 *  技能法力消耗总和
 */
 public CONSUMPTION_COEFFICIENT(configID):number { return this.data[configID][19]}
/**
 *  技能冷却时间
 */
 public CD(configID):number { return this.data[configID][20]}
/**
 *  技能最大攻击数量
 */
 public NUMBER_ATTACKS(configID):number { return this.data[configID][21]}
/**
 *  攻击范围的标记
 */
 public POINT_SURFACE(configID):number { return this.data[configID][22]}
/**
 *  技能最大攻击范围
 */
 public MAXIMUM_RANGE(configID):number { return this.data[configID][23]}
/**
 *  技能的攻击类型
 */
 public ATK_TYPE(configID):number { return this.data[configID][24]}
/**
 *  指向与非指向
 */
 public MAGIC_DIRECTION(configID):number { return this.data[configID][25]}
/**
 *  魔法技能的类型
 */
 public MAGIC_TYPE(configID):number { return this.data[configID][26]}
/**
 *  ？？
 */
 public ELEMIX(configID):number { return this.data[configID][27]}
/**
 *  技能为主动释放还是被动
 */
 public ACTIVE_PASSIVE(configID):number { return this.data[configID][28]}
/**
 *  技能释放成功概率
 */
 public SKILL_SUCCESS(configID):number { return this.data[configID][29]}
/**
 *  技能的释放模式
 */
 public SKILLS_MODEL(configID):number { return this.data[configID][30]}
/**
 *  自身释放BUFF技能的ID
 */
 public SELFBUFFID(configID):number { return this.data[configID][31]}
/**
 *  BUFFID
 */
 public BUFFID(configID):string { return this.data[configID][32]}
/**
 *  技能公式的编号
 */
 public FORMULA_NUMBER(configID):number { return this.data[configID][33]}
/**
 *  不能同时存在的技能
 */
 public EXCLUSION_SKILLS(configID):number { return this.data[configID][34]}
/**
 *  使用BUFF所需要物品ID
 */
 public REQUIRED_ITEMSID(configID):number { return this.data[configID][35]}
/**
 *  恢复性BUFF的物品血量
 */
 public LIFE_VALUE(configID):number { return this.data[configID][36]}
/**
 *  技能是否有抬手动作
 */
 public NOSTARTING(configID):number { return this.data[configID][37]}
/**
 *  技能后摇
 */
 public POSTPOSITION_ACTION(configID):number { return this.data[configID][38]}
/**
 *  技能自动锁定目标
 */
 public AUTOMATIC_LOCKING(configID):number { return this.data[configID][39]}
/**
 *  技能修改锁定目标
 */
 public LOCKING_MODIFY(configID):number { return this.data[configID][40]}
/**
 *  连续释放技能
 */
 public CONTINUOUS_APPLICATION(configID):number { return this.data[configID][41]}
/**
 *  修改连续释放的技能
 */
 public CONTINUOUS_RELEASE(configID):number { return this.data[configID][42]}
/**
 *  跑动中释放技能
 */
 public RELEASE_RUNNING(configID):number { return this.data[configID][43]}
/**
 *  翅膀自带技能
 */
 public WING_SKILLS(configID):number { return this.data[configID][44]}
/**
 *  技能描述
 */
 public SKILL_DESCRIPTION(configID):string { return this.data[configID][45]}
/**
 *  技能类型
 */
 public INTERNAL_TYPE(configID):number { return this.data[configID][46]}
/**
 *  技能释放间隔
 */
 public ATTACK_INTERVAL(configID):number { return this.data[configID][47]}
/**
 *  转生等级需求
 */
 public REINCARNATION_LEVEL(configID):number { return this.data[configID][48]}
/**
 *  使用条件
 */
 public ACTIVATION_CONDITIONS(configID):string { return this.data[configID][49]}
/**
 *  对怪物的增伤总和
 */
 public INJURIES_STRANGERS(configID):number { return this.data[configID][50]}
/**
 *  对怪物的增伤值
 */
 public INCREASED_INJURY(configID):number { return this.data[configID][51]}
/**
 *  技能特效ID
 */
 public SKILL_EFFECTSID(configID):string { return this.data[configID][52]}
/**
 *  熟练度获取方式
 */
 public PROFICIENCY_ACQUISITION(configID):string { return this.data[configID][53]}
/**
 *  增加熟练度的物品ID
 */
 public INCREASE_PROFICIENCY(configID):number { return this.data[configID][54]}
/**
 *  技能IconID
 */
 public ICONPATH(configID):number { return this.data[configID][55]}
/**
 *  技能类型：1外功2招架3身法4内功5合计技能6弟子技能
 */
 public SKILLTYPE(configID):number { return this.data[configID][56]}
/**
 *  技能五行攻击,1金2木3水4火5土
 */
 public SKILLEXTRAPROP(configID):number { return this.data[configID][57]}
/**
 *  技能使用的性别1：男2女0通用
 */
 public SKILLUSESEX(configID):number { return this.data[configID][58]}
/**
 *  技能品质1：入门2中级3高级4绝技
 */
 public SKILLQUALITY(configID):number { return this.data[configID][59]}
/**
 *  内功效率
 */
 public INTERNALCOUNT(configID):number { return this.data[configID][60]}
/**
 *  技能效果描述
 */
 public SKILLEFFECT(configID):string { return this.data[configID][61]}
/**
 *  技能学习所需的帮派职位 0不限1入门  2内门 3核心 4首席 5副帮主 6帮主 
 */
 public SKILLLEARNGUILDLVNEED(configID):number { return this.data[configID][62]}
}}