module SheetConfig{ export class  mydb_npcgen_tbl { public data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): mydb_npcgen_tbl { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  NPC编号
 */
 public NPC_NUMBER(configID):string { if(this.data[configID]) {return this.data[configID][0]}else { throw new Error(configID+'cant find')}}
/**
 *  NPC名字
 */
 public NAME(configID):string { if(this.data[configID]) {return this.data[configID][1]}else { throw new Error(configID+'cant find')}}
/**
 *  删除
 */
 public DELETED(configID):number { if(this.data[configID]) {return this.data[configID][2]}else { throw new Error(configID+'cant find')}}
/**
 *  NPC类型，
 */
 public TYPE(configID):number { if(this.data[configID]) {return this.data[configID][3]}else { throw new Error(configID+'cant find')}}
/**
 *  加载地图
 */
 public REFRESH_MAP(configID):string { if(this.data[configID]) {return this.data[configID][4]}else { throw new Error(configID+'cant find')}}
/**
 *  加载地图的编号
 */
 public REFRESH_NUMBER(configID):number { if(this.data[configID]) {return this.data[configID][5]}else { throw new Error(configID+'cant find')}}
/**
 *  NPC图片模型编号
 */
 public ICON_NUMBER(configID):number { if(this.data[configID]) {return this.data[configID][6]}else { throw new Error(configID+'cant find')}}
/**
 *  NPC的X坐标
 */
 public COORDINATEX(configID):number { if(this.data[configID]) {return this.data[configID][7]}else { throw new Error(configID+'cant find')}}
/**
 *  NPC的Y坐标
 */
 public COORDINATEY(configID):number { if(this.data[configID]) {return this.data[configID][8]}else { throw new Error(configID+'cant find')}}
/**
 *  NPC面朝方向
 */
 public ORIENTATION(configID):number { if(this.data[configID]) {return this.data[configID][9]}else { throw new Error(configID+'cant find')}}
/**
 *  NPC是否走路
 */
 public WALK(configID):number { if(this.data[configID]) {return this.data[configID][10]}else { throw new Error(configID+'cant find')}}
/**
 *  NPC是否隐身
 */
 public INVISIBLE(configID):number { if(this.data[configID]) {return this.data[configID][11]}else { throw new Error(configID+'cant find')}}
/**
 *  NPC走路路径
 */
 public WALKING_PATH(configID):number { if(this.data[configID]) {return this.data[configID][12]}else { throw new Error(configID+'cant find')}}
/**
 *  NPC复活时间
 */
 public RESURRECTION_TIME(configID):number { if(this.data[configID]) {return this.data[configID][13]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物ID
 */
 public MONSTERID(configID):number { if(this.data[configID]) {return this.data[configID][14]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物名称
 */
 public MONSTER_NAME(configID):string { if(this.data[configID]) {return this.data[configID][15]}else { throw new Error(configID+'cant find')}}
/**
 *  所在房间ID
 */
 public ROOMID(configID):number { if(this.data[configID]) {return this.data[configID][16]}else { throw new Error(configID+'cant find')}}
/**
 *  所在房间名称
 */
 public ROOMNAME(configID):string { if(this.data[configID]) {return this.data[configID][17]}else { throw new Error(configID+'cant find')}}
/**
 *  NPC别号
 */
 public NPC_NICKNAME(configID):string { if(this.data[configID]) {return this.data[configID][18]}else { throw new Error(configID+'cant find')}}
/**
 *  NPC人物设定描写
 */
 public NPC_DES1(configID):string { if(this.data[configID]) {return this.data[configID][19]}else { throw new Error(configID+'cant find')}}
/**
 *  NPC外貌描写
 */
 public NPC_DES2(configID):string { if(this.data[configID]) {return this.data[configID][20]}else { throw new Error(configID+'cant find')}}
/**
 *  NPC喜好的道具ID
 */
 public NPC_LOVE(configID):string { if(this.data[configID]) {return this.data[configID][21]}else { throw new Error(configID+'cant find')}}
/**
 *  NPC身上的装备信息，击杀NPC可能获得
 */
 public NPC_EQUIP(configID):string { if(this.data[configID]) {return this.data[configID][22]}else { throw new Error(configID+'cant find')}}
/**
 *  NPC身上的宝物信息，偷窃可能获得
 */
 public NPC_BAOWU(configID):string { if(this.data[configID]) {return this.data[configID][23]}else { throw new Error(configID+'cant find')}}
/**
 *  NPC门派
 */
 public SECTS(configID):number { if(this.data[configID]) {return this.data[configID][24]}else { throw new Error(configID+'cant find')}}
/**
 *  npc品质
 */
 public QUALITY(configID):number { if(this.data[configID]) {return this.data[configID][25]}else { throw new Error(configID+'cant find')}}
/**
 *  npc名誉值
 */
 public REPUTATION(configID):number { if(this.data[configID]) {return this.data[configID][26]}else { throw new Error(configID+'cant find')}}
/**
 *  npc好感增加系数
 */
 public FAVORABLE_COEFFICIENT(configID):number { if(this.data[configID]) {return this.data[configID][27]}else { throw new Error(configID+'cant find')}}
/**
 *  可从NPC身上请教获得的技能ID
 */
 public SKILLS_UP_ITEM(configID):string { if(this.data[configID]) {return this.data[configID][28]}else { throw new Error(configID+'cant find')}}
/**
 *  NPC顺序对白
 */
 public TALKINFO_SHUNXU(configID):string { if(this.data[configID]) {return this.data[configID][29]}else { throw new Error(configID+'cant find')}}
/**
 *  NPC随机对白
 */
 public TALKINFO_RANDOM(configID):string { if(this.data[configID]) {return this.data[configID][30]}else { throw new Error(configID+'cant find')}}
/**
 *  NPC身上是否绑任务.0:没有任务；1有任务
 */
 public ISTASKONSELF(configID):number { if(this.data[configID]) {return this.data[configID][31]}else { throw new Error(configID+'cant find')}}
/**
 *  NPCicon编号
 */
 public ICON_ICON_NUMBER(configID):number { if(this.data[configID]) {return this.data[configID][32]}else { throw new Error(configID+'cant find')}}
/**
 *  臂力属性
 */
 public STRENGTH(configID):number { if(this.data[configID]) {return this.data[configID][33]}else { throw new Error(configID+'cant find')}}
/**
 *  洞察属性
 */
 public INSIGHT(configID):number { if(this.data[configID]) {return this.data[configID][34]}else { throw new Error(configID+'cant find')}}
/**
 *  根骨属性
 */
 public BONE(configID):number { if(this.data[configID]) {return this.data[configID][35]}else { throw new Error(configID+'cant find')}}
/**
 *  魅力属性
 */
 public CHARM(configID):number { if(this.data[configID]) {return this.data[configID][36]}else { throw new Error(configID+'cant find')}}
/**
 *  悟性属性
 */
 public UNDERSTANDING(configID):number { if(this.data[configID]) {return this.data[configID][37]}else { throw new Error(configID+'cant find')}}
/**
 *  口才属性
 */
 public ELOQUENCE(configID):number { if(this.data[configID]) {return this.data[configID][38]}else { throw new Error(configID+'cant find')}}
/**
 *  0是中庸，1是守序，2是唯我
 */
 public ATTITUDE(configID):number { if(this.data[configID]) {return this.data[configID][39]}else { throw new Error(configID+'cant find')}}
}}