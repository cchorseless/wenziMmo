module SheetConfig{ export class  mydb_npcsell_tbl { public data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): mydb_npcsell_tbl { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  商店ID
 */
 public SELLID(configID):string { return this.data[configID][0]}
/**
 *  出售物品列表
 */
 public SELLITEM(configID):string { return this.data[configID][1]}
/**
 *  绑定NPCID
 */
 public ALLOWNPCID(configID):Array<number> { return this.data[configID][2]}
}}