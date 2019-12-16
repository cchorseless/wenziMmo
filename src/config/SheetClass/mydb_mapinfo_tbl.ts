module SheetConfig{ export class  mydb_mapinfo_tbl { private data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): mydb_mapinfo_tbl { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  countryid
 */
 public COUNTRYID(configID:string):number { return this.data[configID][0]}
/**
 *  lineid
 */
 public LINEID(configID:string):number { return this.data[configID][1]}
/**
 *  name
 */
 public NAME(configID:string):string { return this.data[configID][2]}
/**
 *  deleted
 */
 public DELETED(configID:string):number { return this.data[configID][3]}
/**
 *  mapfilename
 */
 public MAPFILENAME(configID:string):string { return this.data[configID][4]}
/**
 *  mapfileid
 */
 public MAPFILEID(configID:string):number { return this.data[configID][5]}
/**
 *  minmapidx
 */
 public MINMAPIDX(configID:string):number { return this.data[configID][6]}
/**
 *  refmonsteronstart
 */
 public REFMONSTERONSTART(configID:string):number { return this.data[configID][7]}
/**
 *  monlvlmin
 */
 public MONLVLMIN(configID:string):number { return this.data[configID][8]}
/**
 *  monlvlmax
 */
 public MONLVLMAX(configID:string):number { return this.data[configID][9]}
/**
 *  脚本编号
 */
 public SCRIPT_NUMBER(configID:string):number { return this.data[configID][10]}
/**
 *  复活点地图ID
 */
 public RESURRECTION_MAPID(configID:string):number { return this.data[configID][11]}
/**
 *  X坐标
 */
 public XCOORDINATE(configID:string):number { return this.data[configID][12]}
/**
 *  Y坐标
 */
 public YCOORDINATE(configID:string):number { return this.data[configID][13]}
/**
 *  范围
 */
 public RANGE(configID:string):number { return this.data[configID][14]}
/**
 *  mapproperty
 */
 public MAPPROPERTY(configID:string):number { return this.data[configID][15]}
/**
 *  smrefreshitem
 */
 public SMREFRESHITEM(configID:string):number { return this.data[configID][16]}
/**
 *  地图介绍
 */
 public MAPINFO(configID:string):string { return this.data[configID][17]}
/**
 *  地图类型描述
 */
 public MAPITYPEDES(configID:string):string { return this.data[configID][18]}
/**
 *  地图类型
 */
 public MAPTYPE(configID:string):number { return this.data[configID][19]}
/**
 *  出生房间ID
 */
 public BIRTHROOMID(configID:string):number { return this.data[configID][20]}
}}