module SheetConfig{ export class  zhuangbei_make { public data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): zhuangbei_make { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  等级条件
 */
 public LEVEL(configID:string):string { return this.data[configID][0]}
/**
 *  所需材料
 */
 public NEEDLVL(configID:string):string { return this.data[configID][1]}
/**
 *  可选材料ID
 */
 public OPTIONAL_MATERIAL(configID:string):number { return this.data[configID][2]}
/**
 *  可选材料数量
 */
 public OPTIONALNUM(configID:string):number { return this.data[configID][3]}
/**
 *  极品效果ID
 */
 public GOURMET_EFFICTID(configID:string):string { return this.data[configID][4]}
/**
 *  所需装备ID
 */
 public NEED_EQUIPMENT(configID:string):number { return this.data[configID][5]}
/**
 *  星级概率
 */
 public PROBABILITY(configID:string):string { return this.data[configID][6]}
}}