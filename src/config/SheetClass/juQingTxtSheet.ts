module SheetConfig{ export class  juQingTxtSheet { private data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): juQingTxtSheet { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  NPCID
 */
 public NPCID(configID:string):string { return this.data[configID][0]}
/**
 *  内容
 */
 public TXTCONTENT(configID:string):string { return this.data[configID][1]}
}}