module SheetConfig{ export class  mydb_magic_tbl { private data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): mydb_magic_tbl { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  技能名称
 */
 public NAME(configID:string):string { return this.data[configID][0]}
/**
 *  技能描述
 */
 public SKILL_DESCRIPTION(configID:string):string { return this.data[configID][1]}
/**
 *  技能Icon
 */
 public ICONPATH(configID:string):number { return this.data[configID][2]}
}}