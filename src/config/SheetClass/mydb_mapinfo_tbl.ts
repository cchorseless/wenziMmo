module SheetConfig{ export class  mydb_mapinfo_tbl { public data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): mydb_mapinfo_tbl { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  国家的ID
 */
 public COUNTRYID(configID):number { return this.data[configID][0]}
/**
 *  界线的ID
 */
 public LINEID(configID):number { return this.data[configID][1]}
/**
 *  地点名称
 */
 public NAME(configID):string { return this.data[configID][2]}
/**
 *  删除
 */
 public DELETED(configID):number { return this.data[configID][3]}
/**
 *  地图文件名
 */
 public MAPFILENAME(configID):string { return this.data[configID][4]}
/**
 *  地图文件ID
 */
 public MAPFILEID(configID):number { return this.data[configID][5]}
/**
 *  小地图索引
 */
 public MINMAPIDX(configID):number { return this.data[configID][6]}
/**
 *  ？？？
 */
 public REFMONSTERONSTART(configID):number { return this.data[configID][7]}
/**
 *  怪物最小等级
 */
 public MONLVLMIN(configID):number { return this.data[configID][8]}
/**
 *  怪物最大等级
 */
 public MONLVLMAX(configID):number { return this.data[configID][9]}
/**
 *  复活地点编号
 */
 public SCRIPT_NUMBER(configID):number { return this.data[configID][10]}
/**
 *  复活点ID
 */
 public RESURRECTION_MAPID(configID):number { return this.data[configID][11]}
/**
 *  复活点X坐标
 */
 public XCOORDINATE(configID):number { return this.data[configID][12]}
/**
 *  复活点Y坐标
 */
 public YCOORDINATE(configID):number { return this.data[configID][13]}
/**
 *  复活范围
 */
 public RANGE(configID):number { return this.data[configID][14]}
/**
 *  复活财产
 */
 public MAPPROPERTY(configID):number { return this.data[configID][15]}
/**
 *  刷新列表
 */
 public SMREFRESHITEM(configID):number { return this.data[configID][16]}
/**
 *  地图介绍
 */
 public MAPINFO(configID):string { return this.data[configID][17]}
/**
 *  地图类型描述
 */
 public MAPITYPEDES(configID):string { return this.data[configID][18]}
/**
 *  地图类型大于0是副本地图.根据大地图类型布局。
0非副本地图;
100个人BOSS; 101除魔副本;102资源副本 103个人副本;
200普通公共副本 201组队副本 202帮会副本 203闯天关
 */
 public MAPTYPE(configID):number { return this.data[configID][19]}
/**
 *  出生的房间ID
 */
 public BIRTHROOMID(configID):number { return this.data[configID][20]}
/**
 *  每个地点掉落道具预览
 */
 public DROP_PROPS(configID):any { return this.data[configID][21]}
}}