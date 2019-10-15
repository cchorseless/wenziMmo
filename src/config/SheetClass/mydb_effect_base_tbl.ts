module SheetConfig{ export class  mydb_effect_base_tbl { public data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): mydb_effect_base_tbl { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  deleted
 */
 public DELETED(configID:string):number { return this.data[configID][0]}
/**
 *  效果名字
 */
 public NAME(configID:string):string { return this.data[configID][1]}
/**
 *  升级后效果ID
 */
 public NEXTID(configID:string):string { return this.data[configID][2]}
/**
 *  最大血量
 */
 public MAX_HP(configID:string):number { return this.data[configID][3]}
/**
 *  最大蓝量
 */
 public MAX_MP(configID:string):number { return this.data[configID][4]}
/**
 *  攻击上限值
 */
 public MAX_ATTACK(configID:string):number { return this.data[configID][5]}
/**
 *  攻击下限值
 */
 public MIN_ATTACK(configID:string):number { return this.data[configID][6]}
/**
 *  物理防御上限值
 */
 public MAX_PHYSICAL(configID:string):number { return this.data[configID][7]}
/**
 *  物理防御下限值
 */
 public MIN_PHYSICAL(configID:string):number { return this.data[configID][8]}
/**
 *  自然魔法攻击上限值
 */
 public MAX_NATURAL(configID:string):number { return this.data[configID][9]}
/**
 *  自然魔法攻击下限值
 */
 public MIN_NATURAL(configID:string):number { return this.data[configID][10]}
/**
 *  灵魂魔法攻击上限值
 */
 public MAX_SOUL(configID:string):number { return this.data[configID][11]}
/**
 *  灵魂魔法攻击下限值
 */
 public MIN_SOUL(configID:string):number { return this.data[configID][12]}
/**
 *  全系法术防御上限值
 */
 public MAX_SPELLS(configID:string):number { return this.data[configID][13]}
/**
 *  全系法术防御下限值
 */
 public MIN_SPELLS(configID:string):number { return this.data[configID][14]}
/**
 *  准确
 */
 public ACCURACY(configID:string):number { return this.data[configID][15]}
/**
 *  准确率
 */
 public ACCURACY_RATE(configID:string):number { return this.data[configID][16]}
/**
 *  闪避
 */
 public DODGE(configID:string):number { return this.data[configID][17]}
/**
 *  闪避率
 */
 public DODGE_RATE(configID:string):number { return this.data[configID][18]}
/**
 *  暴击
 */
 public CRIT(configID:string):number { return this.data[configID][19]}
/**
 *  暴击率
 */
 public CRIT_RATE(configID:string):number { return this.data[configID][20]}
/**
 *  韧性
 */
 public TOUGHNESS(configID:string):number { return this.data[configID][21]}
/**
 *  抗暴率
 */
 public RIOT_RESISTANCE(configID:string):number { return this.data[configID][22]}
/**
 *  暴击伤害
 */
 public CRITICAL_DAMAGE(configID:string):number { return this.data[configID][23]}
/**
 *  幸运
 */
 public LUCK(configID:string):number { return this.data[configID][24]}
/**
 *  每次恢复血量
 */
 public VOLUME_HP(configID:string):number { return this.data[configID][25]}
/**
 *  每次恢复蓝量
 */
 public VOLUME_MP(configID:string):number { return this.data[configID][26]}
/**
 *  移动速度
 */
 public SPEED(configID:string):number { return this.data[configID][27]}
/**
 *  麻痹
 */
 public PARALYSIS(configID:string):number { return this.data[configID][28]}
/**
 *  抗麻痹
 */
 public ANTI_PARALYSIS(configID:string):number { return this.data[configID][29]}
/**
 *  合击威力
 */
 public COLLABORATIVE_POWER(configID:string):number { return this.data[configID][30]}
/**
 *  对战士伤害增加
 */
 public WARRIOR_INCREASE(configID:string):number { return this.data[configID][31]}
/**
 *  受战士伤害减少
 */
 public WARRIOR_REDUCE(configID:string):number { return this.data[configID][32]}
/**
 *  对法师伤害增加
 */
 public MASTER_INCREASE(configID:string):number { return this.data[configID][33]}
/**
 *  受法师伤害减少
 */
 public MASTER_REDUCE(configID:string):number { return this.data[configID][34]}
/**
 *  对道士伤害增加
 */
 public TAOIST_INCREASE(configID:string):number { return this.data[configID][35]}
/**
 *  受道士伤害减少
 */
 public TAOIST_REDUCE(configID:string):number { return this.data[configID][36]}
/**
 *  对怪物伤害增加
 */
 public MONSTER_INCREASE(configID:string):number { return this.data[configID][37]}
/**
 *  受怪物伤害减少
 */
 public MONSTER_REDUCE(configID:string):number { return this.data[configID][38]}
/**
 *  对BOSS伤害增加
 */
 public BOSS_INCREASE(configID:string):number { return this.data[configID][39]}
/**
 *  受BOSS伤害减少
 */
 public BOSS_REDUCE(configID:string):number { return this.data[configID][40]}
/**
 *  增加对英雄伤害
 */
 public HERO_INCREASE(configID:string):number { return this.data[configID][41]}
/**
 *  减少受英雄伤害
 */
 public HERO_REDUCE(configID:string):number { return this.data[configID][42]}
/**
 *  内功值
 */
 public INTERNAL(configID:string):number { return this.data[configID][43]}
/**
 *  每次恢复内功值
 */
 public RECOVERY_INTERNAL(configID:string):number { return this.data[configID][44]}
/**
 *  内功抵伤
 */
 public INJURY_INTERNAL(configID:string):number { return this.data[configID][45]}
/**
 *  增伤
 */
 public INJURY_INCREASE(configID:string):number { return this.data[configID][46]}
/**
 *  减伤
 */
 public REDUCE_INJURY(configID:string):number { return this.data[configID][47]}
/**
 *  对BOSS的暴击
 */
 public BOSS_CRIT(configID:string):number { return this.data[configID][48]}
/**
 *  对BOSS的暴伤
 */
 public BOSS_SUDDEN(configID:string):number { return this.data[configID][49]}
/**
 *  受合击伤害减少
 */
 public REDUCE_COLLABORATIVE(configID:string):number { return this.data[configID][50]}
/**
 *  受暴击伤害减少
 */
 public REDUCE_SUDDEN(configID:string):number { return this.data[configID][51]}
/**
 *  怒气恢复率
 */
 public ANGER_RESTORED(configID:string):number { return this.data[configID][52]}
/**
 *  合击对怪增伤率
 */
 public JOINT_MONSTER(configID:string):number { return this.data[configID][53]}
/**
 *  合击对人增伤率
 */
 public JOINT_HUMAN(configID:string):number { return this.data[configID][54]}
/**
 *  增加合击技能等级
 */
 public JOINT_LEVEL(configID:string):number { return this.data[configID][55]}
/**
 *  生命万分比
 */
 public TENTHOUSANDSCORES_LIFE(configID:string):number { return this.data[configID][56]}
}}