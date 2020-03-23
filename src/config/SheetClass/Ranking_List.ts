module SheetConfig{ export class  Ranking_List { public data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): Ranking_List { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  排行榜分类
 */
 public TYPE(configID:string):number { return this.data[configID][0]}
/**
 *  排名分类
 */
 public RANKTYPE(configID:string):string { return this.data[configID][1]}
/**
 *  奖励1
 */
 public REWARD(configID:string):string { return this.data[configID][2]}
/**
 *  奖励1数量
 */
 public REWARDNUM(configID:string):string { return this.data[configID][3]}

}}