module SheetConfig{ export class  mydb_npcgen_tbl { private data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): mydb_npcgen_tbl { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  NPC名字
 */
 public NAME(configID:string):string { return this.data[configID][0]}
/**
 *  deleted
 */
 public DELETED(configID:string):number { return this.data[configID][1]}
/**
 *  NPC类型
 */
 public TYPE(configID:string):number { return this.data[configID][2]}
/**
 *  刷新地图
 */
 public REFRESH_MAP(configID:string):string { return this.data[configID][3]}
/**
 *  刷新地图编号
 */
 public REFRESH_NUMBER(configID:string):number { return this.data[configID][4]}
/**
 *  图片模型编号
 */
 public ICON_NUMBER(configID:string):number { return this.data[configID][5]}
/**
 *  坐标X
 */
 public COORDINATEX(configID:string):number { return this.data[configID][6]}
/**
 *  坐标Y
 */
 public COORDINATEY(configID:string):number { return this.data[configID][7]}
/**
 *  朝向
 */
 public ORIENTATION(configID:string):number { return this.data[configID][8]}
/**
 *  是否走路
 */
 public WALK(configID:string):number { return this.data[configID][9]}
/**
 *  是否隐身
 */
 public INVISIBLE(configID:string):number { return this.data[configID][10]}
/**
 *  走路路径
 */
 public WALKING_PATH(configID:string):number { return this.data[configID][11]}
/**
 *  复活时间
 */
 public RESURRECTION_TIME(configID:string):number { return this.data[configID][12]}
/**
 *  怪物名称
 */
 public MONSTER_NAME(configID:string):string { return this.data[configID][13]}
/**
 *  所在房间ID
 */
 public ROOMID(configID:string):number { return this.data[configID][14]}
/**
 *  所在房间名称
 */
 public ROOMNAME(configID:string):string { return this.data[configID][15]}
/**
 *  NPC别称
 */
 public NPC_NICKNAME(configID:string):string { return this.data[configID][16]}
/**
 *  NPC人设描述
 */
 public NPC_DES1(configID:string):string { return this.data[configID][17]}
/**
 *  NPC外貌描写
 */
 public NPC_DES2(configID:string):string { return this.data[configID][18]}
/**
 *  喜好
 */
 public NPC_LOVE(configID:string):Array<number> { return this.data[configID][19]}
/**
 *  装备信息
 */
 public NPC_EQUIP(configID:string):Array<number> { return this.data[configID][20]}
/**
 *  宝物信息
 */
 public NPC_BAOWU(configID:string):Array<number> { return this.data[configID][21]}
}}