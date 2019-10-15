module SheetConfig{ export class  troduce { private data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): troduce { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  介绍
 */
 public INTRODUCE(configID:string):string { 
     
     return this.data[configID][0]}
}}