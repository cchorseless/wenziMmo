module SheetConfig{ export class  HeroInfoSheet { private data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): HeroInfoSheet { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  性别
 */
 public SEX(configID:string):number { return this.data[configID][0]}
/**
 *  出身
 */
 public JOB(configID:string):number { return this.data[configID][1]}
/**
 *  职业描述
 */
 public JOBDES(configID:string):string { return this.data[configID][2]}
/**
 *  名字
 */
 public NAME(configID:string):string { return this.data[configID][3]}
/**
 *  描述
 */
 public DES0(configID:string):string { return this.data[configID][4]}
/**
 *  特性
 */
 public DES1(configID:string):string { return this.data[configID][5]}
/**
 *  初始
 */
 public DES2(configID:string):string { return this.data[configID][6]}
}}