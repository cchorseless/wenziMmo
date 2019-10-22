module SheetConfig{ export class  resume { private data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): resume { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  是否替换
 */
 public REPLACE(configID:string):number { return this.data[configID][0]}
/**
 *  对应介绍
 */
 public INTRODUCE(configID:string):string { return this.data[configID][1]}
}}