module SheetConfig{ export class  zhaiyuan_upgrade { public data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): zhaiyuan_upgrade { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  建筑名称
 */
 public NAME(configID):string { return this.data[configID][0]}
/**
 *  建筑等级
 */
 public LEVEL(configID):number { return this.data[configID][1]}
/**
 *  建筑分类
 */
 public TYPE(configID):number { return this.data[configID][2]}
/**
 *  升级需要的材料
 */
 public LVL_MATERIAL(configID):any { return this.data[configID][3]}
/**
 *  升级所获得的物品
 */
 public ITEMTAB(configID):any { return this.data[configID][4]}
/**
 *  生产物品需要时间
 */
 public NEED_TIME(configID):number { return this.data[configID][5]}
/**
 *  生产物品需要材料
 */
 public PRODUCE_MATERIAL(configID):any { return this.data[configID][6]}
/**
 *  仆役所需要食粮
 */
 public CONSUME_FOOD(configID):number { return this.data[configID][7]}
/**
 *  每级的生产效率
 */
 public EFFICIENCY(configID):number { return this.data[configID][8]}
/**
 *  升级条件描述
 */
 public DESCRIBE(configID):string { return this.data[configID][9]}
/**
 *  对应建筑Icon
 */
 public ICON(configID):string { return this.data[configID][10]}
}}