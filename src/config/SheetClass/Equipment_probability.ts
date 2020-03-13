module SheetConfig{ export class  Equipment_probability { public data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): Equipment_probability { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  顺序id
 */
 public ID(configID):string { return this.data[configID][0]}
/**
 *  对应装备等级
 */
 public EQUIPMENT_GRADE(configID):string { return this.data[configID][1]}
/**
 *  品质概率
 */
 public QUALITY_PROBABILITY(configID):any { return this.data[configID][2]}
/**
 *  星级概率
 */
 public STAR_PROBABILITY(configID):any { return this.data[configID][3]}
}}