module SheetConfig{ export class  randomNameSheet { private data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): randomNameSheet { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  姓
 */
 public SURNAME(configID:string):string { return this.data[configID][0]}
/**
 *  名_男
 */
 public BOYNAME(configID:string):string { return this.data[configID][1]}
/**
 *  名_女
 */
 public GIRLNAME(configID:string):string { return this.data[configID][2]}
}}