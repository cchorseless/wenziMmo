module SheetConfig{ export class  mydb_effect_base_tbl { public data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): mydb_effect_base_tbl { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  基础效果ID
 */
 public ID(configID):string { return this.data[configID][0]}
/**
 *  删除
 */
 public DELETED(configID):number { return this.data[configID][1]}
/**
 *  效果名称
 */
 public NAME(configID):string { return this.data[configID][2]}
/**
 *  效果升级后的进阶ID
 */
 public NEXTID(configID):string { return this.data[configID][3]}
/**
 *  部分物品升级后的增加血量上限
 */
 public NONPAREIL_TYPE_MAXHP(configID):number { return this.data[configID][4]}
/**
 *  部分物品升级后的增加蓝量上限
 */
 public NONPAREIL_TYPE_MAXMP(configID):number { return this.data[configID][5]}
/**
 *  部分物品升级后的增加攻击上限
 */
 public NONPAREIL_TYPE_MAXATK(configID):number { return this.data[configID][6]}
/**
 *  部分物品升级后的增加攻击下限
 */
 public NONPAREIL_TYPE_MINATK(configID):number { return this.data[configID][7]}
/**
 *  部分物品升级后的增加物攻上限
 */
 public NONPAREIL_TYPE_MAXDC(configID):number { return this.data[configID][8]}
/**
 *  部分物品升级后的增加物攻下限
 */
 public NONPAREIL_TYPE_MINDC(configID):number { return this.data[configID][9]}
/**
 *  部分物品升级后的增加自然魔法上限
 */
 public NONPAREIL_TYPE_MAXMC(configID):number { return this.data[configID][10]}
/**
 *  部分物品升级后的增加自然魔法下限
 */
 public NONPAREIL_TYPE_MINMC(configID):number { return this.data[configID][11]}
/**
 *  部分物品升级后的增加灵魂魔法上限
 */
 public NONPAREIL_TYPE_MAXSC(configID):number { return this.data[configID][12]}
/**
 *  部分物品升级后的增加灵魂魔法下限
 */
 public NONPAREIL_TYPE_MINSC(configID):number { return this.data[configID][13]}
/**
 *  部分物品升级后的增加物防上限
 */
 public NONPAREIL_TYPE_MAXAC(configID):number { return this.data[configID][14]}
/**
 *  部分物品升级后的增加物防下限
 */
 public NONPAREIL_TYPE_MINAC(configID):number { return this.data[configID][15]}
/**
 *  部分物品升级后的增加魔防上限
 */
 public NONPAREIL_TYPE_MAXMAC(configID):number { return this.data[configID][16]}
/**
 *  部分物品升级后的增加魔防下限
 */
 public NONPAREIL_TYPE_MINMAC(configID):number { return this.data[configID][17]}
/**
 *  准确
 */
 public NONPAREIL_TYPE_HIT(configID):number { return this.data[configID][18]}
/**
 *  准确率
 */
 public NONPAREIL_TYPE_HITRATE(configID):number { return this.data[configID][19]}
/**
 *  闪避
 */
 public NONPAREIL_TYPE_JUCK(configID):number { return this.data[configID][20]}
/**
 *  闪避率
 */
 public NONPAREIL_TYPE_JUCKRATE(configID):number { return this.data[configID][21]}
/**
 *  暴击
 */
 public NONPAREIL_TYPE_CRIT(configID):number { return this.data[configID][22]}
/**
 *  暴击率
 */
 public NONPAREIL_TYPE_CRITRATE(configID):number { return this.data[configID][23]}
/**
 *  韧性
 */
 public NONPAREIL_TYPE_TOUGHNESS(configID):number { return this.data[configID][24]}
/**
 *  抗暴率
 */
 public NONPAREIL_TYPE_TOUGHNESSRATE(configID):number { return this.data[configID][25]}
/**
 *  暴击伤害
 */
 public NONPAREIL_TYPE_ATKCRIT(configID):number { return this.data[configID][26]}
/**
 *  幸运
 */
 public NONPAREIL_TYPE_LUCKY(configID):number { return this.data[configID][27]}
/**
 *  每次恢复血量
 */
 public NONPAREIL_TYPE_RESTOREHP(configID):number { return this.data[configID][28]}
/**
 *  每次恢复蓝量
 */
 public NONPAREIL_TYPE_RESTOREMP(configID):number { return this.data[configID][29]}
/**
 *  移动速度
 */
 public NONPAREIL_TYPE_MOVESPEED(configID):number { return this.data[configID][30]}
/**
 *  麻痹
 */
 public NONPAREIL_TYPE_PALSYRATE(configID):number { return this.data[configID][31]}
/**
 *  抗麻痹
 */
 public NONPAREIL_TYPE_PALSYRESI(configID):number { return this.data[configID][32]}
/**
 *  合击威力
 */
 public NONPAREIL_TYPE_UNIONATKRATE(configID):number { return this.data[configID][33]}
/**
 *  对战士伤害增加
 */
 public NONPAREIL_TYPE_INCATKWARRIOR(configID):number { return this.data[configID][34]}
/**
 *  受战士伤害减少
 */
 public NONPAREIL_TYPE_DECATKWARRIOR(configID):number { return this.data[configID][35]}
/**
 *  对法师伤害增加
 */
 public NONPAREIL_TYPE_INCATKMAGE(configID):number { return this.data[configID][36]}
/**
 *  受法师伤害减少
 */
 public NONPAREIL_TYPE_DECATKMAGE(configID):number { return this.data[configID][37]}
/**
 *  对道士伤害增加
 */
 public NONPAREIL_TYPE_INCATKMONK(configID):number { return this.data[configID][38]}
/**
 *  受道士伤害减少
 */
 public NONPAREIL_TYPE_DECATKMONK(configID):number { return this.data[configID][39]}
/**
 *  对怪物伤害增加
 */
 public NONPAREIL_TYPE_INCATKMONSTER(configID):number { return this.data[configID][40]}
/**
 *  受怪物伤害减少
 */
 public NONPAREIL_TYPE_DECATKMONSTER(configID):number { return this.data[configID][41]}
/**
 *  对BOSS伤害增加
 */
 public NONPAREIL_TYPE_INCATKBOSS(configID):number { return this.data[configID][42]}
/**
 *  受BOSS伤害减少
 */
 public NONPAREIL_TYPE_DECATKBOSS(configID):number { return this.data[configID][43]}
/**
 *  增加对英雄伤害
 */
 public NONPAREIL_TYPE_INCATKHERO(configID):number { return this.data[configID][44]}
/**
 *  减少受英雄伤害
 */
 public NONPAREIL_TYPE_DECATKHERO(configID):number { return this.data[configID][45]}
/**
 *  内功值
 */
 public NONPAREIL_TYPE_ENERGY(configID):number { return this.data[configID][46]}
/**
 *  每次恢复内功值
 */
 public NONPAREIL_TYPE_RESTOREENERGY(configID):number { return this.data[configID][47]}
/**
 *  内功抵伤
 */
 public NONPAREIL_TYPE_ENERGYRESI(configID):number { return this.data[configID][48]}
/**
 *  增伤
 */
 public NONPAREIL_TYPE_INCDAMAGE(configID):number { return this.data[configID][49]}
/**
 *  减伤
 */
 public NONPAREIL_TYPE_DECDAMAGE(configID):number { return this.data[configID][50]}
/**
 *  对BOSS的暴击
 */
 public NONPAREIL_TYPE_INCBOSSCRIT(configID):number { return this.data[configID][51]}
/**
 *  对BOSS的暴伤
 */
 public NONPAREIL_TYPE_INCBOSSATKCRIT(configID):number { return this.data[configID][52]}
/**
 *  受合击伤害减少
 */
 public NONPAREIL_TYPE_DECUNIONATKDAMAGE(configID):number { return this.data[configID][53]}
/**
 *  受暴击伤害减少
 */
 public NONPAREIL_TYPE_DECATKCRITDAMAGE(configID):number { return this.data[configID][54]}
/**
 *  怒气恢复率
 */
 public NONPAREIL_TYPE_RESTOREANGER(configID):number { return this.data[configID][55]}
/**
 *  合击对怪增伤率
 */
 public NONPAREIL_TYPE_UATOMONSTER(configID):number { return this.data[configID][56]}
/**
 *  合击对人增伤率
 */
 public NONPAREIL_TYPE_UATOPLAYER(configID):number { return this.data[configID][57]}
/**
 *  增加合击技能等级
 */
 public NONPAREIL_TYPE_UPCOMBOSKILLLEVEL(configID):number { return this.data[configID][58]}
/**
 *  生命万分比
 */
 public NONPAREIL_TYPE_MAXCOUNT(configID):number { return this.data[configID][59]}
/**
 *  攻击万分比
 */
 public ATK_PROPS(configID):number { return this.data[configID][60]}
/**
 *  物理防御万分比
 */
 public PHYDEF_PROS(configID):number { return this.data[configID][61]}
/**
 *  魔法防御万分比
 */
 public MAGDEF_PROS(configID):number { return this.data[configID][62]}
}}