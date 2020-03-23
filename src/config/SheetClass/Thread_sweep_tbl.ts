module SheetConfig{ export class  Thread_sweep_tbl { public data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): Thread_sweep_tbl { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  章节顺序
 */
 public ID(configID):string { return this.data[configID][0]}
/**
 *  大卷分类
 */
 public ROLL(configID):number { return this.data[configID][1]}
/**
 *  章节数
 */
 public CHAPTERS_NUMBER(configID):number { return this.data[configID][2]}
/**
 *  关卡名称
 */
 public NAME(configID):string { return this.data[configID][3]}
/**
 *  扫荡功能奖励id
 */
 public SWEEPING_AWARD(configID):any { return this.data[configID][4]}
/**
 *  扫荡功能掉落概率
 */
 public PROBABILITY1(configID):any { return this.data[configID][5]}
/**
 *  主线副本解锁对应的剧情对白id
 */
 public UNLOCK_DIALOGUE(configID):number { return this.data[configID][6]}
/**
 *  首次通关奖励
 */
 public FIRST_AWARD(configID):any { return this.data[configID][7]}
/**
 *  星级宝箱奖励
 */
 public STAR_AWARD(configID):any { return this.data[configID][8]}
/**
 *  关卡关数
 */
 public NUMBER_CHECKPOINTS(configID):string { return this.data[configID][9]}
 
}}