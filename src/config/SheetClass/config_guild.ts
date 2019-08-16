module SheetConfig{ export class  config_guild { private data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): config_guild { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  行会人数
 */
 public NUMBER_GUILDS(configID:string):number { return this.data[configID][0]}
/**
 *  升级所需经验
 */
 public EXPERIENCE_UPGRADING(configID:string):number { return this.data[configID][1]}
}}