module SheetConfig{ export class  mydb_monster_tbl { public data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): mydb_monster_tbl { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  怪物编号
 */
 public MONSTER_NUMBER(configID):string { return this.data[configID][0]}
/**
 *  地图读取
 */
 public REFRESH_MAP(configID):string { return this.data[configID][1]}
/**
 *  怪物名称
 */
 public NAME(configID):string { return this.data[configID][2]}
/**
 *  怪物名字的颜色
 */
 public NAME_COLOR(configID):number { return this.data[configID][3]}
/**
 *  删除
 */
 public DELETED(configID):number { return this.data[configID][4]}
/**
 *  怪物造型图的编号
 */
 public STYLE_DRAWING(configID):number { return this.data[configID][5]}
/**
 *  怪物头像的编号
 */
 public HEAD_IMAGE(configID):number { return this.data[configID][6]}
/**
 *  怪物的类型
 */
 public MONSTER_TYPE(configID):number { return this.data[configID][7]}
/**
 *  怪物等级
 */
 public LEVEL(configID):number { return this.data[configID][8]}
/**
 *  怪物最大血量
 */
 public MAX_HP(configID):number { return this.data[configID][9]}
/**
 *  怪物最大蓝量
 */
 public MAX_MP(configID):number { return this.data[configID][10]}
/**
 *  每个怪物的攻击力上限
 */
 public MAX_ATK(configID):number { return this.data[configID][11]}
/**
 *  每个怪物的攻击力上限
 */
 public MIN_ATK(configID):number { return this.data[configID][12]}
/**
 *  每个怪物的物理攻击下限
 */
 public MAX_PHYSICS(configID):number { return this.data[configID][13]}
/**
 *  每个怪物的物理攻击上限
 */
 public MIN_PHYSICS(configID):number { return this.data[configID][14]}
/**
 *  每个怪物的自然魔攻下限
 */
 public MAX_NATURAL(configID):number { return this.data[configID][15]}
/**
 *  每个怪物的自然魔攻上限
 */
 public MIN_NATURAL(configID):number { return this.data[configID][16]}
/**
 *  每个怪物的灵魂魔攻下限
 */
 public MAX_SOUL(configID):number { return this.data[configID][17]}
/**
 *  每个怪物的灵魂魔攻上限
 */
 public MIN_SOUL(configID):number { return this.data[configID][18]}
/**
 *  每个怪物的物防下限
 */
 public MAX_PD(configID):number { return this.data[configID][19]}
/**
 *  每个怪物的物防上限
 */
 public MIN_PD(configID):number { return this.data[configID][20]}
/**
 *  每个怪物的法防下限
 */
 public MAX_MD(configID):number { return this.data[configID][21]}
/**
 *  每个怪物的法防上限
 */
 public MIN_MD(configID):number { return this.data[configID][22]}
/**
 *  怪物命中
 */
 public HIT(configID):number { return this.data[configID][23]}
/**
 *  怪物闪避
 */
 public AVOIDANCE(configID):number { return this.data[configID][24]}
/**
 *  怪物回复血量
 */
 public RECOVERY_HP(configID):number { return this.data[configID][25]}
/**
 *  怪物回复蓝量
 */
 public RECOVERY_MP(configID):number { return this.data[configID][26]}
/**
 *  怪物幸运值
 */
 public LUCK(configID):number { return this.data[configID][27]}
/**
 *  怪物暴击值
 */
 public VIOLENT_ATTACK(configID):number { return this.data[configID][28]}
/**
 *  怪物抗暴值
 */
 public VIOLENT_RESISTANCE(configID):number { return this.data[configID][29]}
/**
 *  怪物暴伤值
 */
 public BRUTAL_INJURY(configID):number { return this.data[configID][30]}
/**
 *  怪物韧性值
 */
 public TOUGHNESS(configID):number { return this.data[configID][31]}
/**
 *  怪物增伤值
 */
 public INCREASED_INJURY(configID):number { return this.data[configID][32]}
/**
 *  怪物减伤值
 */
 public INJURY_REDUCTION(configID):number { return this.data[configID][33]}
/**
 *  怪物视野值
 */
 public SCOPE_FIELD(configID):number { return this.data[configID][34]}
/**
 *  怪物活动范围值
 */
 public SCOPE_ACTIVITIES(configID):number { return this.data[configID][35]}
/**
 *  怪物释放范围值
 */
 public SCOPE_APPLICATION(configID):number { return this.data[configID][36]}
/**
 *  怪物技能释放范围
 */
 public CASTING_INTERVAL(configID):number { return this.data[configID][37]}
/**
 *  怪物技能释放间隔
 */
 public ATTACK_RANGE(configID):number { return this.data[configID][38]}
/**
 *  怪物技能攻击范围
 */
 public ATTACK_INTERVAL(configID):number { return this.data[configID][39]}
/**
 *  怪物移动速度
 */
 public SPEED(configID):number { return this.data[configID][40]}
/**
 *  怪物移动间隔
 */
 public MOVING_INTERVAL(configID):number { return this.data[configID][41]}
/**
 *  怪物是否自动回血
 */
 public AUTOMATED_BLOOD(configID):number { return this.data[configID][42]}
/**
 *  怪物是否记录BUFF
 */
 public RECORD_STATUS(configID):number { return this.data[configID][43]}
/**
 *  怪物是否主动攻击
 */
 public ACTIVE_ATTACK(configID):number { return this.data[configID][44]}
/**
 *  怪物是否能攻击
 */
 public POSSIBLE_ATTACK(configID):number { return this.data[configID][45]}
/**
 *  怪物是否能移动
 */
 public POSSIBLE_MOVE(configID):number { return this.data[configID][46]}
/**
 *  怪物是否能瞬移
 */
 public POSSIBLE_TELEPORTING(configID):number { return this.data[configID][47]}
/**
 *  怪物是否免疫施毒术
 */
 public IMMUNOTOXICATION(configID):number { return this.data[configID][48]}
/**
 *  怪物禁止被诱惑
 */
 public NO_TEMPTATION(configID):number { return this.data[configID][49]}
/**
 *  怪物禁止被推移
 */
 public PROHIBITED_DEFERRED(configID):number { return this.data[configID][50]}
/**
 *  怪物禁止被麻痹
 */
 public NO_PARALYSIS(configID):number { return this.data[configID][51]}
/**
 *  怪物是否能转向
 */
 public POSSIBLE_TURN(configID):number { return this.data[configID][52]}
/**
 *  怪物出生面朝方向
 */
 public MONSTER_DIRECTION(configID):number { return this.data[configID][53]}
/**
 *  怪物技能编号
 */
 public SKILL_NUMBER(configID):string { return this.data[configID][54]}
/**
 *  怪物AI
 */
 public MONSTER_AI(configID):number { return this.data[configID][55]}
/**
 *  怪物AI编号
 */
 public AI_NUMBER(configID):number { return this.data[configID][56]}
/**
 *  怪物AI编号1
 */
 public AI_NUMBER1(configID):number { return this.data[configID][57]}
/**
 *  BOSSAI编号
 */
 public BOSS_AI(configID):number { return this.data[configID][58]}
/**
 *  怪物是否为BOSS
 */
 public BOSS(configID):number { return this.data[configID][59]}
/**
 *  怪物是否有归属权
 */
 public OWNERSHIP(configID):number { return this.data[configID][60]}
/**
 *  怪物是否共享产出
 */
 public SHARED_OUTPUT(configID):number { return this.data[configID][61]}
/**
 *  击败怪物所给的经验值
 */
 public EMPIRICAL_VALUE(configID):number { return this.data[configID][62]}
/**
 *  击败怪物所给星魂
 */
 public DAVIDS(configID):number { return this.data[configID][63]}
/**
 *  击败怪物所给战魂
 */
 public SOUL_WAR(configID):number { return this.data[configID][64]}
/**
 *  击败怪物所给灵力值
 */
 public SPIRITUAL_FORCE(configID):number { return this.data[configID][65]}
/**
 *  击败怪物所给功勋
 */
 public MERIT(configID):number { return this.data[configID][66]}
/**
 *  怪物属性点数量总和
 */
 public NATURAL_ATTRIBUTES(configID):number { return this.data[configID][67]}
/**
 *  怪物掉落装备附加属性几率
 */
 public ADDITIONAL_ATTRIBUTES(configID):number { return this.data[configID][68]}
/**
 *  怪物掉落装备带孔几率
 */
 public HOLE_PROBABILITY(configID):number { return this.data[configID][69]}
/**
 *  怪物掉落积分限制
 */
 public MONSTER_INTEGRAL(configID):number { return this.data[configID][70]}
/**
 *  怪物音效
 */
 public MONSTER_SOUND(configID):number { return this.data[configID][71]}
/**
 *  怪物禁止穿怪，有实体
 */
 public WEARING_STRANGE(configID):number { return this.data[configID][72]}
/**
 *  怪物与NPC聊天语言1
 */
 public CHAT_LANGUAGE1(configID):string { return this.data[configID][73]}
/**
 *  怪物与NPC聊天语言2
 */
 public CHAT_LANGUAGE2(configID):string { return this.data[configID][74]}
/**
 *  怪物与NPC聊天语言3
 */
 public CHAT_LANGUAGE3(configID):string { return this.data[configID][75]}
/**
 *  怪物与NPC聊天语言4
 */
 public CHAT_LANGUAGE4(configID):string { return this.data[configID][76]}
/**
 *  怪物与NPC聊天语言5
 */
 public CHAT_LANGUAGE5(configID):string { return this.data[configID][77]}
/**
 *  战将聊天语言1
 */
 public GENERAL_CHAT1(configID):string { return this.data[configID][78]}
/**
 *  战将聊天语言2
 */
 public GENERAL_CHAT2(configID):string { return this.data[configID][79]}
/**
 *  战将聊天语言3
 */
 public GENERAL_CHAT3(configID):string { return this.data[configID][80]}
/**
 *  战将聊天语言4
 */
 public GENERAL_CHAT4(configID):string { return this.data[configID][81]}
/**
 *  战将聊天语言5
 */
 public GENERAL_CHAT5(configID):string { return this.data[configID][82]}
/**
 *  怪物显示
 */
 public MONSTER_DISPLAY(configID):number { return this.data[configID][83]}
/**
 *  击败怪物获得的内功经验
 */
 public WORK_EXPERIENCE(configID):number { return this.data[configID][84]}
/**
 *  小地图显示怪物
 */
 public MINMAP_DISPLAY(configID):number { return this.data[configID][85]}
/**
 *  击杀BOSS获得积分
 */
 public BOSS_INTEGRAL(configID):number { return this.data[configID][86]}
/**
 *  怪物掉落武器图片编号
 */
 public WEAPON_DOCUMENT(configID):number { return this.data[configID][87]}
/**
 *  怪物性别
 */
 public GENDER(configID):number { return this.data[configID][88]}
/**
 *  怪物职业
 */
 public OCCUPATION(configID):number { return this.data[configID][89]}
/**
 *  怪物出生X坐标
 */
 public XCOORDINATE(configID):number { return this.data[configID][90]}
/**
 *  怪物出生Y坐标
 */
 public YCOORDINATE(configID):number { return this.data[configID][91]}
/**
 *  怪物刷新地点ID
 */
 public MAPID(configID):number { return this.data[configID][92]}
/**
 *  怪物掉落物品
 */
 public DROPPED_ARTICLES(configID):Array<number> { return this.data[configID][93]}
/**
 *  是否为人形怪物
 */
 public PEOPLE_WEIRD(configID):number { return this.data[configID][94]}
/**
 *  击杀怪物英雄获得的经验
 */
 public HEROIC_EXPERIENCE(configID):number { return this.data[configID][95]}
/**
 *  怪物是否免疫火墙伤害
 */
 public IMMUNITY_FIREWALL(configID):number { return this.data[configID][96]}
/**
 *  怪物身形缩放比例
 */
 public SCALE_UP_RATIO(configID):number { return this.data[configID][97]}
/**
 *  怪物龙骨资源
 */
 public SKERES(configID):string { return this.data[configID][98]}
/**
 *  怪物描述
 */
 public MONSTERDES(configID):string { return this.data[configID][99]}
/**
 *  房间编号
 */
 public TRANSFER_ROOM(configID):number { return this.data[configID][100]}
/**
 *  怪物的五行属性 0：金；1：木；2：水；3：火；4：土
 */
 public WUXINGPROPS(configID):number { return this.data[configID][101]}
/**
 *  怪物战斗力
 */
 public MONSTER_COMBAT(configID):number { return this.data[configID][102]}
/**
 *  怪物的金币数量
 */
 public GOLD_NUMBER(configID):number { return this.data[configID][103]}
}}