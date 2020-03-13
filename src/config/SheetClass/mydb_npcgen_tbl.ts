module SheetConfig{ export class  mydb_npcgen_tbl { public data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): mydb_npcgen_tbl { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  NPC编号
 */
 public NPC_NUMBER(configID):string { return this.data[configID][0]}
/**
 *  NPC名字
 */
 public NAME(configID):string { return this.data[configID][1]}
/**
 *  删除
 */
 public DELETED(configID):number { return this.data[configID][2]}
/**
 *  NPC类型，
 */
 public TYPE(configID):number { return this.data[configID][3]}
/**
 *  加载地图
 */
 public REFRESH_MAP(configID):string { return this.data[configID][4]}
/**
 *  加载地图的编号
 */
 public REFRESH_NUMBER(configID):number { return this.data[configID][5]}
/**
 *  NPC图片模型编号
 */
 public ICON_NUMBER(configID):number { return this.data[configID][6]}
/**
 *  NPC的X坐标
 */
 public COORDINATEX(configID):number { return this.data[configID][7]}
/**
 *  NPC的Y坐标
 */
 public COORDINATEY(configID):number { return this.data[configID][8]}
/**
 *  NPC面朝方向
 */
 public ORIENTATION(configID):number { return this.data[configID][9]}
/**
 *  NPC是否走路
 */
 public WALK(configID):number { return this.data[configID][10]}
/**
 *  NPC是否隐身
 */
 public INVISIBLE(configID):number { return this.data[configID][11]}
/**
 *  NPC走路路径
 */
 public WALKING_PATH(configID):number { return this.data[configID][12]}
/**
 *  NPC复活时间
 */
 public RESURRECTION_TIME(configID):number { return this.data[configID][13]}
/**
 *  怪物ID
 */
 public MONSTERID(configID):number { return this.data[configID][14]}
/**
 *  怪物名称
 */
 public MONSTER_NAME(configID):string { return this.data[configID][15]}
/**
 *  所在房间ID
 */
 public ROOMID(configID):number { return this.data[configID][16]}
/**
 *  所在房间名称
 */
 public ROOMNAME(configID):string { return this.data[configID][17]}
/**
 *  NPC别号
 */
 public NPC_NICKNAME(configID):string { return this.data[configID][18]}
/**
 *  NPC人物设定描写
 */
 public NPC_DES1(configID):string { return this.data[configID][19]}
/**
 *  NPC外貌描写
 */
 public NPC_DES2(configID):string { return this.data[configID][20]}
/**
 *  NPC喜好的道具ID
 */
 public NPC_LOVE(configID):string { return this.data[configID][21]}
/**
 *  NPC身上的装备信息，击杀NPC可能获得
 */
 public NPC_EQUIP(configID):string { return this.data[configID][22]}
/**
 *  NPC身上的宝物信息，偷窃可能获得
 */
 public NPC_BAOWU(configID):string { return this.data[configID][23]}
/**
 *  NPC门派
 */
 public SECTS(configID):number { return this.data[configID][24]}
/**
 *  npc品质
 */
 public QUALITY(configID):number { return this.data[configID][25]}
/**
 *  npc名誉值
 */
 public REPUTATION(configID):number { return this.data[configID][26]}
/**
 *  npc好感增加系数
 */
 public FAVORABLE_COEFFICIENT(configID):number { return this.data[configID][27]}
/**
 *  可从NPC身上请教获得的技能ID
 */
 public SKILLS_UP_ITEM(configID):string { return this.data[configID][28]}
/**
 *  NPC顺序对白
 */
 public TALKINFO_SHUNXU(configID):string { return this.data[configID][29]}
/**
 *  NPC随机对白
 */
 public TALKINFO_RANDOM(configID):string { return this.data[configID][30]}
/**
 *  NPC身上是否绑任务.0:没有任务；1有任务
 */
 public ISTASKONSELF(configID):number { return this.data[configID][31]}
/**
 *  NPCicon编号
 */
 public ICON_ICON_NUMBER(configID):number { return this.data[configID][32]}
/**
 *  臂力属性
 */
 public STRENGTH(configID):number { return this.data[configID][33]}
/**
 *  洞察属性
 */
 public INSIGHT(configID):number { return this.data[configID][34]}
/**
 *  根骨属性
 */
 public BONE(configID):number { return this.data[configID][35]}
/**
 *  魅力属性
 */
 public CHARM(configID):number { return this.data[configID][36]}
/**
 *  悟性属性
 */
 public UNDERSTANDING(configID):number { return this.data[configID][37]}
/**
 *  口才属性
 */
 public ELOQUENCE(configID):number { return this.data[configID][38]}
/**
 *  0是中庸，1是守序，2是唯我
 */
 public ATTITUDE(configID):number { return this.data[configID][39]}
}}