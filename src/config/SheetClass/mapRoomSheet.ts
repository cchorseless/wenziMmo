module SheetConfig{ export class  mapRoomSheet { private data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): mapRoomSheet { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  房间名称
 */
 public ROOMNAME(configID:string):string { return this.data[configID][0]}
/**
 *  所属地图ID
 */
 public MAPID(configID:string):number { return this.data[configID][1]}
/**
 *  所属地图名称
 */
 public MAPNAME(configID:string):string { return this.data[configID][2]}
/**
 *  上连接ID
 */
 public UPID(configID:string):number { return this.data[configID][3]}
/**
 *  下连接ID
 */
 public DOWNID(configID:string):number { return this.data[configID][4]}
/**
 *  左连接ID
 */
 public LEFTID(configID:string):number { return this.data[configID][5]}
/**
 *  右连接ID
 */
 public RIGHTID(configID:string):number { return this.data[configID][6]}
/**
 *  X坐标最小
 */
 public XMIN(configID:string):number { return this.data[configID][7]}
/**
 *  X坐标最大
 */
 public XMAX(configID:string):number { return this.data[configID][8]}
/**
 *  Y坐标最小
 */
 public YMIN(configID:string):number { return this.data[configID][9]}
/**
 *  Y坐标最大
 */
 public YMAX(configID:string):number { return this.data[configID][10]}
/**
 *  ICON资源
 */
 public ICONPIC(configID:string):number { return this.data[configID][11]}
/**
 *  场景图片资源
 */
 public SCENEPIC(configID:string):number { return this.data[configID][12]}
/**
 *  进入等级条件
 */
 public LVNEED(configID:string):number { return this.data[configID][13]}
/**
 *  进入任务条件
 */
 public TASKIDNEED(configID:string):number { return this.data[configID][14]}
/**
 *  房间描述
 */
 public ROOMDES(configID:string):string { return this.data[configID][15]}
/**
 *  房间类型
 */
 public ROOMTYPE(configID:string):number { return this.data[configID][16]}
}}