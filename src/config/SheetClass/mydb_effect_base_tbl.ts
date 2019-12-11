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
 public NONPAREIL_TYPE_MAXHP(configID:string):number { return this.data[configID][3]}
/**
 *  最大蓝量
 */
 public NONPAREIL_TYPE_MAXMP(configID:string):number { return this.data[configID][4]}
/**
 *  攻击上限值
 */
 public NONPAREIL_TYPE_MAXATK(configID:string):number { return this.data[configID][5]}
/**
 *  攻击下限值
 */
 public NONPAREIL_TYPE_MINATK(configID:string):number { return this.data[configID][6]}
/**
 *  物理攻击上限值
 */
 public NONPAREIL_TYPE_MAXDC(configID:string):number { return this.data[configID][7]}
/**
 *  物理攻击下限值
 */
 public NONPAREIL_TYPE_MINDC(configID:string):number { return this.data[configID][8]}
/**
 *  自然魔法攻击上限值
 */
 public NONPAREIL_TYPE_MAXMC(configID:string):number { return this.data[configID][9]}
/**
 *  自然魔法攻击下限值
 */
 public NONPAREIL_TYPE_MINMC(configID:string):number { return this.data[configID][10]}
/**
 *  灵魂魔法攻击上限值
 */
 public NONPAREIL_TYPE_MAXSC(configID:string):number { return this.data[configID][11]}
/**
 *  灵魂魔法攻击下限值
 */
 public NONPAREIL_TYPE_MINSC(configID:string):number { return this.data[configID][12]}
/**
 *  物理防御上限值
 */
 public NONPAREIL_TYPE_MAXAC(configID:string):number { return this.data[configID][13]}
/**
 *  物理防御下限值
 */
 public NONPAREIL_TYPE_MINAC(configID:string):number { return this.data[configID][14]}
/**
 *  全系法术防御上限值
 */
 public NONPAREIL_TYPE_MAXMAC(configID:string):number { return this.data[configID][15]}
/**
 *  全系法术防御下限值
 */
 public NONPAREIL_TYPE_MINMAC(configID:string):number { return this.data[configID][16]}
/**
 *  准确
 */
 public NONPAREIL_TYPE_HIT(configID:string):number { return this.data[configID][17]}
/**
 *  准确率
 */
 public NONPAREIL_TYPE_HITRATE(configID:string):number { return this.data[configID][18]}
/**
 *  闪避
 */
 public NONPAREIL_TYPE_JUCK(configID:string):number { return this.data[configID][19]}
/**
 *  闪避率
 */
 public NONPAREIL_TYPE_JUCKRATE(configID:string):number { return this.data[configID][20]}
/**
 *  暴击
 */
 public NONPAREIL_TYPE_CRIT(configID:string):number { return this.data[configID][21]}
/**
 *  暴击率
 */
 public NONPAREIL_TYPE_CRITRATE(configID:string):number { return this.data[configID][22]}
/**
 *  韧性
 */
 public NONPAREIL_TYPE_TOUGHNESS(configID:string):number { return this.data[configID][23]}
/**
 *  抗暴率
 */
 public NONPAREIL_TYPE_TOUGHNESSRATE(configID:string):number { return this.data[configID][24]}
/**
 *  暴击伤害
 */
 public NONPAREIL_TYPE_ATKCRIT(configID:string):number { return this.data[configID][25]}
/**
 *  幸运
 */
 public NONPAREIL_TYPE_LUCKY(configID:string):number { return this.data[configID][26]}
/**
 *  每次恢复血量
 */
 public NONPAREIL_TYPE_RESTOREHP(configID:string):number { return this.data[configID][27]}
/**
 *  每次恢复蓝量
 */
 public NONPAREIL_TYPE_RESTOREMP(configID:string):number { return this.data[configID][28]}
/**
 *  移动速度
 */
 public NONPAREIL_TYPE_MOVESPEED(configID:string):number { return this.data[configID][29]}
/**
 *  麻痹
 */
 public NONPAREIL_TYPE_PALSYRATE(configID:string):number { return this.data[configID][30]}
/**
 *  抗麻痹
 */
 public NONPAREIL_TYPE_PALSYRESI(configID:string):number { return this.data[configID][31]}
/**
 *  合击威力
 */
 public NONPAREIL_TYPE_UNIONATKRATE(configID:string):number { return this.data[configID][32]}
/**
 *  对战士伤害增加
 */
 public NONPAREIL_TYPE_INCATKWARRIOR(configID:string):number { return this.data[configID][33]}
/**
 *  受战士伤害减少
 */
 public NONPAREIL_TYPE_DECATKWARRIOR(configID:string):number { return this.data[configID][34]}
/**
 *  对法师伤害增加
 */
 public NONPAREIL_TYPE_INCATKMAGE(configID:string):number { return this.data[configID][35]}
/**
 *  受法师伤害减少
 */
 public NONPAREIL_TYPE_DECATKMAGE(configID:string):number { return this.data[configID][36]}
/**
 *  对道士伤害增加
 */
 public NONPAREIL_TYPE_INCATKMONK(configID:string):number { return this.data[configID][37]}
/**
 *  受道士伤害减少
 */
 public NONPAREIL_TYPE_DECATKMONK(configID:string):number { return this.data[configID][38]}
/**
 *  对怪物伤害增加
 */
 public NONPAREIL_TYPE_INCATKMONSTER(configID:string):number { return this.data[configID][39]}
/**
 *  受怪物伤害减少
 */
 public NONPAREIL_TYPE_DECATKMONSTER(configID:string):number { return this.data[configID][40]}
/**
 *  对BOSS伤害增加
 */
 public NONPAREIL_TYPE_INCATKBOSS(configID:string):number { return this.data[configID][41]}
/**
 *  受BOSS伤害减少
 */
 public NONPAREIL_TYPE_DECATKBOSS(configID:string):number { return this.data[configID][42]}
/**
 *  增加对英雄伤害
 */
 public NONPAREIL_TYPE_INCATKHERO(configID:string):number { return this.data[configID][43]}
/**
 *  减少受英雄伤害
 */
 public NONPAREIL_TYPE_DECATKHERO(configID:string):number { return this.data[configID][44]}
/**
 *  内功值
 */
 public NONPAREIL_TYPE_ENERGY(configID:string):number { return this.data[configID][45]}
/**
 *  每次恢复内功值
 */
 public NONPAREIL_TYPE_RESTOREENERGY(configID:string):number { return this.data[configID][46]}
/**
 *  内功抵伤
 */
 public NONPAREIL_TYPE_ENERGYRESI(configID:string):number { return this.data[configID][47]}
/**
 *  增伤
 */
 public NONPAREIL_TYPE_INCDAMAGE(configID:string):number { return this.data[configID][48]}
/**
 *  减伤
 */
 public NONPAREIL_TYPE_DECDAMAGE(configID:string):number { return this.data[configID][49]}
/**
 *  对BOSS的暴击
 */
 public NONPAREIL_TYPE_INCBOSSCRIT(configID:string):number { return this.data[configID][50]}
/**
 *  对BOSS的暴伤
 */
 public NONPAREIL_TYPE_INCBOSSATKCRIT(configID:string):number { return this.data[configID][51]}
/**
 *  受合击伤害减少
 */
 public NONPAREIL_TYPE_DECUNIONATKDAMAGE(configID:string):number { return this.data[configID][52]}
/**
 *  受暴击伤害减少
 */
 public NONPAREIL_TYPE_DECATKCRITDAMAGE(configID:string):number { return this.data[configID][53]}
/**
 *  怒气恢复率
 */
 public NONPAREIL_TYPE_RESTOREANGER(configID:string):number { return this.data[configID][54]}
/**
 *  合击对怪增伤率
 */
 public NONPAREIL_TYPE_UATOMONSTER(configID:string):number { return this.data[configID][55]}
/**
 *  合击对人增伤率
 */
 public NONPAREIL_TYPE_UATOPLAYER(configID:string):number { return this.data[configID][56]}
/**
 *  增加合击技能等级
 */
 public NONPAREIL_TYPE_UPCOMBOSKILLLEVEL(configID:string):number { return this.data[configID][57]}
/**
 *  生命万分比
 */
 public NONPAREIL_TYPE_MAXCOUNT(configID:string):number { return this.data[configID][58]}
}}