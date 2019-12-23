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
 *  每级可生产的数量
 */
 public PRODUCIBLE_QUANTITY(configID):number { return this.data[configID][3]}
/**
 *  升级需要的材料
 */
 public LVL_MATERIAL(configID):any { return this.data[configID][4]}
/**
 *  升级所获得的物品
 */
 public ITEMTAB(configID):any { return this.data[configID][5]}
/**
 *  生产物品需要时间
 */
 public NEED_TIME(configID):any { return this.data[configID][6]}
/**
 *  生产物品需要材料
 */
 public PRODUCE_MATERIAL(configID):any { return this.data[configID][7]}
/**
 *  仆役所需要食粮
 */
 public CONSUME_FOOD(configID):number { return this.data[configID][8]}
/**
 *  每级的生产效率
 */
 public EFFICIENCY(configID):number { return this.data[configID][9]}
/**
 *  升级条件描述
 */
 public DESCRIBE(configID):string { return this.data[configID][10]}
/**
 *  对应建筑Icon
 */
 public ICON(configID):string { return this.data[configID][11]}
}}