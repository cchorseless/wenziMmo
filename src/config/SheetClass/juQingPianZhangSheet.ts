module SheetConfig{ export class  juQingPianZhangSheet { public data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): juQingPianZhangSheet { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  顺序ID
 */
 public ID(configID):string { return this.data[configID][0]}
/**
 *  大卷名字
 */
 public NAME(configID):string { return this.data[configID][1]}
/**
 *  章节id范围
 */
 public RANGE(configID):string { return this.data[configID][2]}
}}