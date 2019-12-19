module SheetConfig{ export class  zhaiyuan_upgrade { private data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): zhaiyuan_upgrade { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  名称
 */
 public NAME(configID:string):string { return this.data[configID][0]}
/**
 *  分类
 */
 public TYPE(configID:string):number { return this.data[configID][1]}
/**
 *  等级
 */
 public LEVEL(configID:string):number { return this.data[configID][2]}
/**
 *  升级需要材料id
 */
 public LVL_MATERIAL(configID:string):string { return this.data[configID][3]}
/**
 *  对应物品id
 */
 public ITEMTAB(configID:string):string { return this.data[configID][4]}
/**
 *  产出消耗时间
 */
 public NEED_TIME(configID:string):number { return this.data[configID][5]}
/**
 *  产出需要消耗材料
 */
 public PRODUCE_MATERIAL(configID:string):string { return this.data[configID][6]}
/**
 *  消耗粮食（分钟/人）
 */
 public CONSUME_FOOD(configID:string):number { return this.data[configID][7]}
/**
 *  每级效率
 */
 public EFFICIENCY(configID:string):number { return this.data[configID][8]}
/**
 *  条件描述
 */
 public DESCRIBE(configID:string):string { return this.data[configID][9]}
/**
 *  对应Icon
 */
 public ICON(configID:string):string { return this.data[configID][10]}
}}