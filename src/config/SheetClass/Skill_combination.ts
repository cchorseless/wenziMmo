module SheetConfig{ export class  Skill_combination { public data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): Skill_combination { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  组合技能顺序id
 */
 public ID(configID):string { return this.data[configID][0]}
/**
 *  组合名称
 */
 public NAME(configID):string { return this.data[configID][1]}
/**
 *  效果表id
 */
 public EFFECTID(configID):number { return this.data[configID][2]}
/**
 *  对应技能id
 */
 public SKILLID(configID):number { return this.data[configID][3]}
/**
 *  文本描述
 */
 public DESCRIBE(configID):string { return this.data[configID][4]}
}}