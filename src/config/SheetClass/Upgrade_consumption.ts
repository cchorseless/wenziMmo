module SheetConfig{ export class  Upgrade_consumption { public data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): Upgrade_consumption { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  对应等级
 */
 public LEVEL(configID):string { return this.data[configID][0]}
/**
 *  物品表id
 */
 public ITEMID(configID):number { return this.data[configID][1]}
/**
 *  每级升级需要数量
 */
 public NEED_NUMBER(configID):number { return this.data[configID][2]}
}}