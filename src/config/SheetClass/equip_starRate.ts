module SheetConfig{ export class  equip_starRate { public data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): equip_starRate { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  材料装备的星级,id=星级数
 */
 public TARGETSTARID(configID):string { return this.data[configID][0]}
/**
 *  生成星级权重
 */
 public STARRATES(configID):any { return this.data[configID][1]}
}}