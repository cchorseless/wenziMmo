module SheetConfig{ export class  equip_QARate { public data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): equip_QARate { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  材料换算后的品质,id=品质
 */
 public SOURCEQAID(configID):string { return this.data[configID][0]}
/**
 *  生成品质1的权重
 */
 public QARATE(configID):any { return this.data[configID][1]}
}}