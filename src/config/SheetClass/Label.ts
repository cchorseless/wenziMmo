module SheetConfig{ export class  Label { private data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): Label { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  标签名称
 */
 public NAME(configID:string):string { return this.data[configID][0]}
/**
 *  标签分类
 */
 public TYPE(configID:string):number { return this.data[configID][1]}
/**
 *  BUFFID
 */
 public BUFFID(configID:string):number { return this.data[configID][2]}
/**
 *  标签介绍
 */
 public INTRODUCE(configID:string):string { return this.data[configID][3]}
}}