module SheetConfig{ export class  attribute { private data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): attribute { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  名字
 */
 public NAME(configID:string):string { return this.data[configID][0]}
/**
 *  天赋介绍
 */
 public INTRODUCTION(configID:string):string { return this.data[configID][1]}
/**
 *  对应BUFFid
 */
 public BUFFID(configID:string):number { return this.data[configID][2]}
}}