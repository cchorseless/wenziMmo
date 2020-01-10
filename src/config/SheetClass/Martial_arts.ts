module SheetConfig{ export class  Martial_arts { public data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): Martial_arts { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  效果表id
 */
 public ID(configID):string { return this.data[configID][0]}
/**
 *  天赋效果名称
 */
 public NAME(configID):string { return this.data[configID][1]}
/**
 *  天赋描述
 */
 public DESCRIBE(configID):string { return this.data[configID][2]}
}}