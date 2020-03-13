module SheetConfig{ export class  NPC_talkInfoSheet { public data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): NPC_talkInfoSheet { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  对白编号
 */
 public NPC_NUMBER(configID):string { return this.data[configID][0]}
/**
 *  对白内容
 */
 public TALKINFO(configID):string { return this.data[configID][1]}
}}