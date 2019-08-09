module SheetConfig{ export class  canshuSheet { private data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): canshuSheet { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  数据
 */
 public DATA(configID:string):Array<number> { return this.data[configID][0]}
}}