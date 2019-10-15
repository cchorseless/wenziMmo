module SheetConfig{ export class  characters { private data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): characters { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  显示字样
 */
 public TYPE(configID:string):string { return this.data[configID][0]}
}}