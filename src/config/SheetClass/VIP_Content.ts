module SheetConfig{ export class  VIP_Content { private data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): VIP_Content { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  特权描述0
 */
 public PRIVILEGE0(configID:string):string { 
     console.log(this.data)
     return this.data[configID][0]}
/**
 *  特权描述1
 */
 public PRIVILEGE1(configID:string):string { return this.data[configID][1]}
/**
 *  特权描述2
 */
 public PRIVILEGE2(configID:string):string { return this.data[configID][2]}
/**
 *  特权描述3
 */
 public PRIVILEGE3(configID:string):string { return this.data[configID][3]}
/**
 *  特权描述4
 */
 public PRIVILEGE4(configID:string):string { return this.data[configID][4]}
/**
 *  特权描述5
 */
 public PRIVILEGE5(configID:string):string { return this.data[configID][5]}
/**
 *  特权描述6
 */
 public PRIVILEGE6(configID:string):string { return this.data[configID][6]}
/**
 *  特权描述7
 */
 public PRIVILEGE7(configID:string):string { return this.data[configID][7]}
/**
 *  特权描述8
 */
 public PRIVILEGE8(configID:string):string { return this.data[configID][8]}
/**
 *  特权描述9
 */
 public PRIVILEGE9(configID:string):string { return this.data[configID][9]}
/**
 *  特权描述10
 */
 public PRIVILEGE10(configID:string):string { return this.data[configID][10]}
/**
 *  特权描述11
 */
 public PRIVILEGE11(configID:string):string { return this.data[configID][11]}
/**
 *  特权描述12
 */
 public PRIVILEGE12(configID:string):string { return this.data[configID][12]}
/**
 *  特权描述13
 */
 public PRIVILEGE13(configID:string):string { return this.data[configID][13]}
/**
 *  特权描述14
 */
 public PRIVILEGE14(configID:string):string { return this.data[configID][14]}
}}