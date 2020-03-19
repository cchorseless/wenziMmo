module SheetConfig{ export class  mydb_monster_tbl { public data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): mydb_monster_tbl { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  怪物编号
 */
 public MONSTER_NUMBER(configID):string { if(this.data[configID]) {return this.data[configID][0]}else { throw new Error(configID+'cant find')}}
/**
 *  地图读取
 */
 public REFRESH_MAP(configID):string { if(this.data[configID]) {return this.data[configID][1]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物名称
 */
 public NAME(configID):string { if(this.data[configID]) {return this.data[configID][2]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物名字的颜色
 */
 public NAME_COLOR(configID):number { if(this.data[configID]) {return this.data[configID][3]}else { throw new Error(configID+'cant find')}}
/**
 *  删除
 */
 public DELETED(configID):number { if(this.data[configID]) {return this.data[configID][4]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物造型图的编号
 */
 public STYLE_DRAWING(configID):number { if(this.data[configID]) {return this.data[configID][5]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物头像的编号
 */
 public HEAD_IMAGE(configID):number { if(this.data[configID]) {return this.data[configID][6]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物的类型
 */
 public MONSTER_TYPE(configID):number { if(this.data[configID]) {return this.data[configID][7]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物等级
 */
 public LEVEL(configID):number { if(this.data[configID]) {return this.data[configID][8]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物最大血量
 */
 public MAX_HP(configID):number { if(this.data[configID]) {return this.data[configID][9]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物最大蓝量
 */
 public MAX_MP(configID):number { if(this.data[configID]) {return this.data[configID][10]}else { throw new Error(configID+'cant find')}}
/**
 *  每个怪物的攻击力上限
 */
 public MAX_ATK(configID):number { if(this.data[configID]) {return this.data[configID][11]}else { throw new Error(configID+'cant find')}}
/**
 *  每个怪物的攻击力上限
 */
 public MIN_ATK(configID):number { if(this.data[configID]) {return this.data[configID][12]}else { throw new Error(configID+'cant find')}}
/**
 *  每个怪物的物理攻击下限
 */
 public MAX_PHYSICS(configID):number { if(this.data[configID]) {return this.data[configID][13]}else { throw new Error(configID+'cant find')}}
/**
 *  每个怪物的物理攻击上限
 */
 public MIN_PHYSICS(configID):number { if(this.data[configID]) {return this.data[configID][14]}else { throw new Error(configID+'cant find')}}
/**
 *  每个怪物的自然魔攻下限
 */
 public MAX_NATURAL(configID):number { if(this.data[configID]) {return this.data[configID][15]}else { throw new Error(configID+'cant find')}}
/**
 *  每个怪物的自然魔攻上限
 */
 public MIN_NATURAL(configID):number { if(this.data[configID]) {return this.data[configID][16]}else { throw new Error(configID+'cant find')}}
/**
 *  每个怪物的灵魂魔攻下限
 */
 public MAX_SOUL(configID):number { if(this.data[configID]) {return this.data[configID][17]}else { throw new Error(configID+'cant find')}}
/**
 *  每个怪物的灵魂魔攻上限
 */
 public MIN_SOUL(configID):number { if(this.data[configID]) {return this.data[configID][18]}else { throw new Error(configID+'cant find')}}
/**
 *  每个怪物的物防下限
 */
 public MAX_PD(configID):number { if(this.data[configID]) {return this.data[configID][19]}else { throw new Error(configID+'cant find')}}
/**
 *  每个怪物的物防上限
 */
 public MIN_PD(configID):number { if(this.data[configID]) {return this.data[configID][20]}else { throw new Error(configID+'cant find')}}
/**
 *  每个怪物的法防下限
 */
 public MAX_MD(configID):number { if(this.data[configID]) {return this.data[configID][21]}else { throw new Error(configID+'cant find')}}
/**
 *  每个怪物的法防上限
 */
 public MIN_MD(configID):number { if(this.data[configID]) {return this.data[configID][22]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物命中
 */
 public HIT(configID):number { if(this.data[configID]) {return this.data[configID][23]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物闪避
 */
 public AVOIDANCE(configID):number { if(this.data[configID]) {return this.data[configID][24]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物回复血量
 */
 public RECOVERY_HP(configID):number { if(this.data[configID]) {return this.data[configID][25]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物回复蓝量
 */
 public RECOVERY_MP(configID):number { if(this.data[configID]) {return this.data[configID][26]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物幸运值
 */
 public LUCK(configID):number { if(this.data[configID]) {return this.data[configID][27]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物暴击值
 */
 public VIOLENT_ATTACK(configID):number { if(this.data[configID]) {return this.data[configID][28]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物抗暴值
 */
 public VIOLENT_RESISTANCE(configID):number { if(this.data[configID]) {return this.data[configID][29]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物暴伤值
 */
 public BRUTAL_INJURY(configID):number { if(this.data[configID]) {return this.data[configID][30]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物韧性值
 */
 public TOUGHNESS(configID):number { if(this.data[configID]) {return this.data[configID][31]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物增伤值
 */
 public INCREASED_INJURY(configID):number { if(this.data[configID]) {return this.data[configID][32]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物减伤值
 */
 public INJURY_REDUCTION(configID):number { if(this.data[configID]) {return this.data[configID][33]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物视野值
 */
 public SCOPE_FIELD(configID):number { if(this.data[configID]) {return this.data[configID][34]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物活动范围值
 */
 public SCOPE_ACTIVITIES(configID):number { if(this.data[configID]) {return this.data[configID][35]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物释放范围值
 */
 public SCOPE_APPLICATION(configID):number { if(this.data[configID]) {return this.data[configID][36]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物技能释放范围
 */
 public CASTING_INTERVAL(configID):number { if(this.data[configID]) {return this.data[configID][37]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物技能释放间隔
 */
 public ATTACK_RANGE(configID):number { if(this.data[configID]) {return this.data[configID][38]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物技能攻击范围
 */
 public ATTACK_INTERVAL(configID):number { if(this.data[configID]) {return this.data[configID][39]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物移动速度
 */
 public SPEED(configID):number { if(this.data[configID]) {return this.data[configID][40]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物移动间隔
 */
 public MOVING_INTERVAL(configID):number { if(this.data[configID]) {return this.data[configID][41]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物是否自动回血
 */
 public AUTOMATED_BLOOD(configID):number { if(this.data[configID]) {return this.data[configID][42]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物是否记录BUFF
 */
 public RECORD_STATUS(configID):number { if(this.data[configID]) {return this.data[configID][43]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物是否主动攻击
 */
 public ACTIVE_ATTACK(configID):number { if(this.data[configID]) {return this.data[configID][44]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物是否能攻击
 */
 public POSSIBLE_ATTACK(configID):number { if(this.data[configID]) {return this.data[configID][45]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物是否能移动
 */
 public POSSIBLE_MOVE(configID):number { if(this.data[configID]) {return this.data[configID][46]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物是否能瞬移
 */
 public POSSIBLE_TELEPORTING(configID):number { if(this.data[configID]) {return this.data[configID][47]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物是否免疫施毒术
 */
 public IMMUNOTOXICATION(configID):number { if(this.data[configID]) {return this.data[configID][48]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物禁止被诱惑
 */
 public NO_TEMPTATION(configID):number { if(this.data[configID]) {return this.data[configID][49]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物禁止被推移
 */
 public PROHIBITED_DEFERRED(configID):number { if(this.data[configID]) {return this.data[configID][50]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物禁止被麻痹
 */
 public NO_PARALYSIS(configID):number { if(this.data[configID]) {return this.data[configID][51]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物是否能转向
 */
 public POSSIBLE_TURN(configID):number { if(this.data[configID]) {return this.data[configID][52]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物出生面朝方向
 */
 public MONSTER_DIRECTION(configID):number { if(this.data[configID]) {return this.data[configID][53]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物技能编号
 */
 public SKILL_NUMBER(configID):string { if(this.data[configID]) {return this.data[configID][54]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物AI
 */
 public MONSTER_AI(configID):number { if(this.data[configID]) {return this.data[configID][55]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物AI编号
 */
 public AI_NUMBER(configID):number { if(this.data[configID]) {return this.data[configID][56]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物AI编号1
 */
 public AI_NUMBER1(configID):number { if(this.data[configID]) {return this.data[configID][57]}else { throw new Error(configID+'cant find')}}
/**
 *  BOSSAI编号
 */
 public BOSS_AI(configID):number { if(this.data[configID]) {return this.data[configID][58]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物是否为BOSS
 */
 public BOSS(configID):number { if(this.data[configID]) {return this.data[configID][59]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物是否有归属权
 */
 public OWNERSHIP(configID):number { if(this.data[configID]) {return this.data[configID][60]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物是否共享产出
 */
 public SHARED_OUTPUT(configID):number { if(this.data[configID]) {return this.data[configID][61]}else { throw new Error(configID+'cant find')}}
/**
 *  击败怪物所给的经验值
 */
 public EMPIRICAL_VALUE(configID):number { if(this.data[configID]) {return this.data[configID][62]}else { throw new Error(configID+'cant find')}}
/**
 *  击败怪物所给星魂
 */
 public DAVIDS(configID):number { if(this.data[configID]) {return this.data[configID][63]}else { throw new Error(configID+'cant find')}}
/**
 *  击败怪物所给战魂
 */
 public SOUL_WAR(configID):number { if(this.data[configID]) {return this.data[configID][64]}else { throw new Error(configID+'cant find')}}
/**
 *  击败怪物所给灵力值
 */
 public SPIRITUAL_FORCE(configID):number { if(this.data[configID]) {return this.data[configID][65]}else { throw new Error(configID+'cant find')}}
/**
 *  击败怪物所给功勋
 */
 public MERIT(configID):number { if(this.data[configID]) {return this.data[configID][66]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物属性点数量总和
 */
 public NATURAL_ATTRIBUTES(configID):number { if(this.data[configID]) {return this.data[configID][67]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物掉落装备附加属性几率
 */
 public ADDITIONAL_ATTRIBUTES(configID):number { if(this.data[configID]) {return this.data[configID][68]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物掉落装备带孔几率
 */
 public HOLE_PROBABILITY(configID):number { if(this.data[configID]) {return this.data[configID][69]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物掉落积分限制
 */
 public MONSTER_INTEGRAL(configID):number { if(this.data[configID]) {return this.data[configID][70]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物音效
 */
 public MONSTER_SOUND(configID):number { if(this.data[configID]) {return this.data[configID][71]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物禁止穿怪，有实体
 */
 public WEARING_STRANGE(configID):number { if(this.data[configID]) {return this.data[configID][72]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物与NPC聊天语言1
 */
 public CHAT_LANGUAGE1(configID):string { if(this.data[configID]) {return this.data[configID][73]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物与NPC聊天语言2
 */
 public CHAT_LANGUAGE2(configID):string { if(this.data[configID]) {return this.data[configID][74]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物与NPC聊天语言3
 */
 public CHAT_LANGUAGE3(configID):string { if(this.data[configID]) {return this.data[configID][75]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物与NPC聊天语言4
 */
 public CHAT_LANGUAGE4(configID):string { if(this.data[configID]) {return this.data[configID][76]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物与NPC聊天语言5
 */
 public CHAT_LANGUAGE5(configID):string { if(this.data[configID]) {return this.data[configID][77]}else { throw new Error(configID+'cant find')}}
/**
 *  战将聊天语言1
 */
 public GENERAL_CHAT1(configID):string { if(this.data[configID]) {return this.data[configID][78]}else { throw new Error(configID+'cant find')}}
/**
 *  战将聊天语言2
 */
 public GENERAL_CHAT2(configID):string { if(this.data[configID]) {return this.data[configID][79]}else { throw new Error(configID+'cant find')}}
/**
 *  战将聊天语言3
 */
 public GENERAL_CHAT3(configID):string { if(this.data[configID]) {return this.data[configID][80]}else { throw new Error(configID+'cant find')}}
/**
 *  战将聊天语言4
 */
 public GENERAL_CHAT4(configID):string { if(this.data[configID]) {return this.data[configID][81]}else { throw new Error(configID+'cant find')}}
/**
 *  战将聊天语言5
 */
 public GENERAL_CHAT5(configID):string { if(this.data[configID]) {return this.data[configID][82]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物显示
 */
 public MONSTER_DISPLAY(configID):number { if(this.data[configID]) {return this.data[configID][83]}else { throw new Error(configID+'cant find')}}
/**
 *  击败怪物获得的内功经验
 */
 public WORK_EXPERIENCE(configID):number { if(this.data[configID]) {return this.data[configID][84]}else { throw new Error(configID+'cant find')}}
/**
 *  小地图显示怪物
 */
 public MINMAP_DISPLAY(configID):number { if(this.data[configID]) {return this.data[configID][85]}else { throw new Error(configID+'cant find')}}
/**
 *  击杀BOSS获得积分
 */
 public BOSS_INTEGRAL(configID):number { if(this.data[configID]) {return this.data[configID][86]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物掉落武器图片编号
 */
 public WEAPON_DOCUMENT(configID):number { if(this.data[configID]) {return this.data[configID][87]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物性别
 */
 public GENDER(configID):number { if(this.data[configID]) {return this.data[configID][88]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物职业
 */
 public OCCUPATION(configID):number { if(this.data[configID]) {return this.data[configID][89]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物出生X坐标
 */
 public XCOORDINATE(configID):number { if(this.data[configID]) {return this.data[configID][90]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物出生Y坐标
 */
 public YCOORDINATE(configID):number { if(this.data[configID]) {return this.data[configID][91]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物刷新地点ID
 */
 public MAPID(configID):number { if(this.data[configID]) {return this.data[configID][92]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物掉落物品
 */
 public DROPPED_ARTICLES(configID):string { if(this.data[configID]) {return this.data[configID][93]}else { throw new Error(configID+'cant find')}}
/**
 *  是否为人形怪物
 */
 public PEOPLE_WEIRD(configID):number { if(this.data[configID]) {return this.data[configID][94]}else { throw new Error(configID+'cant find')}}
/**
 *  击杀怪物英雄获得的经验
 */
 public HEROIC_EXPERIENCE(configID):number { if(this.data[configID]) {return this.data[configID][95]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物是否免疫火墙伤害
 */
 public IMMUNITY_FIREWALL(configID):number { if(this.data[configID]) {return this.data[configID][96]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物身形缩放比例
 */
 public SCALE_UP_RATIO(configID):number { if(this.data[configID]) {return this.data[configID][97]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物龙骨资源
 */
 public SKERES(configID):string { if(this.data[configID]) {return this.data[configID][98]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物描述
 */
 public MONSTERDES(configID):string { if(this.data[configID]) {return this.data[configID][99]}else { throw new Error(configID+'cant find')}}
/**
 *  房间编号
 */
 public TRANSFER_ROOM(configID):number { if(this.data[configID]) {return this.data[configID][100]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物的五行属性 0：金；1：木；2：水；3：火；4：土
 */
 public WUXINGPROPS(configID):number { if(this.data[configID]) {return this.data[configID][101]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物战斗力
 */
 public MONSTER_COMBAT(configID):number { if(this.data[configID]) {return this.data[configID][102]}else { throw new Error(configID+'cant find')}}
/**
 *  怪物的金币数量
 */
 public GOLD_NUMBER(configID):number { if(this.data[configID]) {return this.data[configID][103]}else { throw new Error(configID+'cant find')}}
}}