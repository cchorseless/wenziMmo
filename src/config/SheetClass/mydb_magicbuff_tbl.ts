module SheetConfig{ export class  mydb_magicbuff_tbl { public data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): mydb_magicbuff_tbl { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  id顺序
 */
 public ID(configID):string { return this.data[configID][0]}
/**
 *  删除
 */
 public DELETED(configID):number { return this.data[configID][1]}
/**
 *  BUFF名字
 */
 public NAME(configID):string { return this.data[configID][2]}
/**
 *  BUFF类型
 */
 public BUFFTYPE(configID):number { return this.data[configID][3]}
/**
 *  BUFF技能等级分类
 */
 public BUFFLEVEL(configID):number { return this.data[configID][4]}
/**
 *  BUFF效果值
 */
 public BUFFEFFECT(configID):number { return this.data[configID][5]}
/**
 *  BUFF效果值总和
 */
 public BUFFEFFECT_COEFFICIENT(configID):number { return this.data[configID][6]}
/**
 *  BUFF持续时间类型
 */
 public BUFFTIME_TYPE(configID):number { return this.data[configID][7]}
/**
 *  BUFF持续时间总和
 */
 public BUFFTIME_COEFFICIENT(configID):number { return this.data[configID][8]}
/**
 *  BUFF的持续时间
 */
 public KEEPTIME(configID):number { return this.data[configID][9]}
/**
 *  BUFF的发动间隔
 */
 public INTERVAL_TIME(configID):number { return this.data[configID][10]}
/**
 *  BUFF是否会被覆盖
 */
 public COVERAGE(configID):number { return this.data[configID][11]}
/**
 *  BUFF是否能够叠加
 */
 public SUPERPOSITION(configID):number { return this.data[configID][12]}
/**
 *  BUFF死亡时是否会消失
 */
 public DEATH_VANISHES(configID):number { return this.data[configID][13]}
/**
 *  BUFF下线时是否会消失
 */
 public OFFLINE_DISAPPEARS(configID):number { return this.data[configID][14]}
/**
 *  BUFF超时是否会消失
 */
 public OVERTIME_DISAPPEARANCE(configID):number { return this.data[configID][15]}
/**
 *  BUFF是否能被驱散
 */
 public WHETHER_DISPERSE(configID):number { return this.data[configID][16]}
/**
 *  BUFF是否能保存
 */
 public WHETHER_SAVE(configID):number { return this.data[configID][17]}
/**
 *  BUFF公式的编号
 */
 public FORMULA_NUMBER(configID):number { return this.data[configID][18]}
/**
 *  BUFF注释
 */
 public BUFFTIPS(configID):string { return this.data[configID][19]}
/**
 *  BUFF是否会显示给玩家看
 */
 public DISPLAY(configID):number { return this.data[configID][20]}
/**
 *  BUFF的显示图标
 */
 public BUFFICON(configID):number { return this.data[configID][21]}
/**
 *  护盾之类的BUFF血量
 */
 public DURABILITY_VALUE(configID):number { return this.data[configID][22]}
}}