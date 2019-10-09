module SheetConfig{ export class  mydb_monster_tbl { private data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): mydb_monster_tbl { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  刷新地图
 */
 public REFRESH_MAP(configID:string):string { return this.data[configID][0]}
/**
 *  怪物名称
 */
 public NAME(configID:string):string { return this.data[configID][1]}
/**
 *  怪物名称颜色
 */
 public NAME_COLOR(configID:string):number { return this.data[configID][2]}
/**
 *  deleted
 */
 public DELETED(configID:string):number { return this.data[configID][3]}
/**
 *  造型图档编号
 */
 public STYLE_DRAWING(configID:string):number { return this.data[configID][4]}
/**
 *  头像图档编号
 */
 public HEAD_IMAGE(configID:string):number { return this.data[configID][5]}
/**
 *  怪物类型
 */
 public MONSTER_TYPE(configID:string):number { return this.data[configID][6]}
/**
 *  等级
 */
 public LEVEL(configID:string):number { return this.data[configID][7]}
/**
 *  最大血量
 */
 public MAX_HP(configID:string):number { return this.data[configID][8]}
/**
 *  最大蓝量
 */
 public MAX_MP(configID:string):number { return this.data[configID][9]}
/**
 *  攻击上限值
 */
 public MAX_ATK(configID:string):number { return this.data[configID][10]}
/**
 *  攻击下限值
 */
 public MIN_ATK(configID:string):number { return this.data[configID][11]}
/**
 *  物理攻击下限值
 */
 public MAX_PHYSICS(configID:string):number { return this.data[configID][12]}
/**
 *  物理攻击上限值
 */
 public MIN_PHYSICS(configID:string):number { return this.data[configID][13]}
/**
 *  自然魔法攻击下限值
 */
 public MAX_NATURAL(configID:string):number { return this.data[configID][14]}
/**
 *  自然魔法攻击上限值
 */
 public MIN_NATURAL(configID:string):number { return this.data[configID][15]}
/**
 *  灵魂魔法攻击下限值
 */
 public MAX_SOUL(configID:string):number { return this.data[configID][16]}
/**
 *  灵魂魔法攻击上限值
 */
 public MIN_SOUL(configID:string):number { return this.data[configID][17]}
/**
 *  物理防御下限值
 */
 public MAX_PD(configID:string):number { return this.data[configID][18]}
/**
 *  物理防御上限值
 */
 public MIN_PD(configID:string):number { return this.data[configID][19]}
/**
 *  全系法术防御下限值
 */
 public MAX_MD(configID:string):number { return this.data[configID][20]}
/**
 *  全系法术防御上限值
 */
 public MIN_MD(configID:string):number { return this.data[configID][21]}
/**
 *  命中
 */
 public HIT(configID:string):number { return this.data[configID][22]}
/**
 *  闪避
 */
 public AVOIDANCE(configID:string):number { return this.data[configID][23]}
/**
 *  每次恢复血量
 */
 public RECOVERY_HP(configID:string):number { return this.data[configID][24]}
/**
 *  每次恢复蓝量
 */
 public RECOVERY_MP(configID:string):number { return this.data[configID][25]}
/**
 *  幸运
 */
 public LUCK(configID:string):number { return this.data[configID][26]}
/**
 *  暴击
 */
 public VIOLENT_ATTACK(configID:string):number { return this.data[configID][27]}
/**
 *  暴抗
 */
 public VIOLENT_RESISTANCE(configID:string):number { return this.data[configID][28]}
/**
 *  暴伤
 */
 public BRUTAL_INJURY(configID:string):number { return this.data[configID][29]}
/**
 *  韧性
 */
 public TOUGHNESS(configID:string):number { return this.data[configID][30]}
/**
 *  增伤
 */
 public INCREASED_INJURY(configID:string):number { return this.data[configID][31]}
/**
 *  减伤
 */
 public INJURY_REDUCTION(configID:string):number { return this.data[configID][32]}
/**
 *  视野范围
 */
 public SCOPE_FIELD(configID:string):number { return this.data[configID][33]}
/**
 *  活动范围
 */
 public SCOPE_ACTIVITIES(configID:string):number { return this.data[configID][34]}
/**
 *  施法范围
 */
 public SCOPE_APPLICATION(configID:string):number { return this.data[configID][35]}
/**
 *  施法间隔
 */
 public CASTING_INTERVAL(configID:string):number { return this.data[configID][36]}
/**
 *  攻击范围
 */
 public ATTACK_RANGE(configID:string):number { return this.data[configID][37]}
/**
 *  攻击间隔
 */
 public ATTACK_INTERVAL(configID:string):number { return this.data[configID][38]}
/**
 *  移动速度
 */
 public SPEED(configID:string):number { return this.data[configID][39]}
/**
 *  移动间隔
 */
 public MOVING_INTERVAL(configID:string):number { return this.data[configID][40]}
/**
 *  是否自动回血
 */
 public AUTOMATED_BLOOD(configID:string):number { return this.data[configID][41]}
/**
 *  是否记录状态
 */
 public RECORD_STATUS(configID:string):number { return this.data[configID][42]}
/**
 *  是否主动攻击
 */
 public ACTIVE_ATTACK(configID:string):number { return this.data[configID][43]}
/**
 *  是否能攻击
 */
 public POSSIBLE_ATTACK(configID:string):number { return this.data[configID][44]}
/**
 *  是否能移动
 */
 public POSSIBLE_MOVE(configID:string):number { return this.data[configID][45]}
/**
 *  是否能瞬移
 */
 public POSSIBLE_TELEPORTING(configID:string):number { return this.data[configID][46]}
/**
 *  是否免疫施毒术
 */
 public IMMUNOTOXICATION(configID:string):number { return this.data[configID][47]}
/**
 *  禁止被诱惑
 */
 public NO_TEMPTATION(configID:string):number { return this.data[configID][48]}
/**
 *  禁止被推移
 */
 public PROHIBITED_DEFERRED(configID:string):number { return this.data[configID][49]}
/**
 *  禁止被麻痹
 */
 public NO_PARALYSIS(configID:string):number { return this.data[configID][50]}
/**
 *  是否能转向
 */
 public POSSIBLE_TURN(configID:string):number { return this.data[configID][51]}
/**
 *  怪物方向
 */
 public MONSTER_DIRECTION(configID:string):number { return this.data[configID][52]}
/**
 *  技能编号
 */
 public SKILL_NUMBER(configID:string):string { return this.data[configID][53]}
/**
 *  怪物基本AI
 */
 public MONSTER_AI(configID:string):number { return this.data[configID][54]}
/**
 *  怪物AI编号
 */
 public AI_NUMBER(configID:string):number { return this.data[configID][55]}
/**
 *  怪物AI编号1
 */
 public AI_NUMBER1(configID:string):number { return this.data[configID][56]}
/**
 *  BOSSAI编号
 */
 public BOSS_AI(configID:string):number { return this.data[configID][57]}
/**
 *  是否BOSS
 */
 public BOSS(configID:string):number { return this.data[configID][58]}
/**
 *  是否有归属权
 */
 public OWNERSHIP(configID:string):number { return this.data[configID][59]}
/**
 *  是否共享产出
 */
 public SHARED_OUTPUT(configID:string):number { return this.data[configID][60]}
/**
 *  经验值
 */
 public EMPIRICAL_VALUE(configID:string):number { return this.data[configID][61]}
/**
 *  星魂
 */
 public DAVIDS(configID:string):number { return this.data[configID][62]}
/**
 *  战魂
 */
 public SOUL_WAR(configID:string):number { return this.data[configID][63]}
/**
 *  灵力值
 */
 public SPIRITUAL_FORCE(configID:string):number { return this.data[configID][64]}
/**
 *  功勋
 */
 public MERIT(configID:string):number { return this.data[configID][65]}
/**
 *  天生属性系数
 */
 public NATURAL_ATTRIBUTES(configID:string):number { return this.data[configID][66]}
/**
 *  附加属性几率
 */
 public ADDITIONAL_ATTRIBUTES(configID:string):number { return this.data[configID][67]}
/**
 *  掉落孔几率系数
 */
 public HOLE_PROBABILITY(configID:string):number { return this.data[configID][68]}
/**
 *  怪物积分限制
 */
 public MONSTER_INTEGRAL(configID:string):number { return this.data[configID][69]}
/**
 *  怪物音效
 */
 public MONSTER_SOUND(configID:string):number { return this.data[configID][70]}
/**
 *  禁止穿怪
 */
 public WEARING_STRANGE(configID:string):number { return this.data[configID][71]}
/**
 *  怪物与NPC聊天语言1
 */
 public CHAT_LANGUAGE1(configID:string):number { return this.data[configID][72]}
/**
 *  怪物与NPC聊天语言2
 */
 public CHAT_LANGUAGE2(configID:string):number { return this.data[configID][73]}
/**
 *  怪物与NPC聊天语言3
 */
 public CHAT_LANGUAGE3(configID:string):number { return this.data[configID][74]}
/**
 *  怪物与NPC聊天语言4
 */
 public CHAT_LANGUAGE4(configID:string):number { return this.data[configID][75]}
/**
 *  怪物与NPC聊天语言5
 */
 public CHAT_LANGUAGE5(configID:string):number { return this.data[configID][76]}
/**
 *  战将聊天语言1
 */
 public GENERAL_CHAT1(configID:string):number { return this.data[configID][77]}
/**
 *  战将聊天语言2
 */
 public GENERAL_CHAT2(configID:string):number { return this.data[configID][78]}
/**
 *  战将聊天语言3
 */
 public GENERAL_CHAT3(configID:string):number { return this.data[configID][79]}
/**
 *  战将聊天语言4
 */
 public GENERAL_CHAT4(configID:string):number { return this.data[configID][80]}
/**
 *  战将聊天语言5
 */
 public GENERAL_CHAT5(configID:string):number { return this.data[configID][81]}
/**
 *  怪物显示
 */
 public MONSTER_DISPLAY(configID:string):number { return this.data[configID][82]}
/**
 *  内功经验
 */
 public WORK_EXPERIENCE(configID:string):number { return this.data[configID][83]}
/**
 *  小地图显示
 */
 public MINMAP_DISPLAY(configID:string):number { return this.data[configID][84]}
/**
 *  BOSS积分
 */
 public BOSS_INTEGRAL(configID:string):number { return this.data[configID][85]}
/**
 *  武器图档编号
 */
 public WEAPON_DOCUMENT(configID:string):number { return this.data[configID][86]}
/**
 *  性别
 */
 public GENDER(configID:string):number { return this.data[configID][87]}
/**
 *  职业
 */
 public OCCUPATION(configID:string):number { return this.data[configID][88]}
/**
 *  X坐标
 */
 public XCOORDINATE(configID:string):number { return this.data[configID][89]}
/**
 *  Y坐标
 */
 public YCOORDINATE(configID:string):number { return this.data[configID][90]}
/**
 *  地图ID
 */
 public MAPID(configID:string):number { return this.data[configID][91]}
/**
 *  掉落物品
 */
 public DROPPED_ARTICLES(configID:string):Array<number> { return this.data[configID][92]}
/**
 *  是否人形怪
 */
 public PEOPLE_WEIRD(configID:string):number { return this.data[configID][93]}
/**
 *  英雄经验
 */
 public HEROIC_EXPERIENCE(configID:string):number { return this.data[configID][94]}
/**
 *  免疫火墙伤害
 */
 public IMMUNITY_FIREWALL(configID:string):number { return this.data[configID][95]}
/**
 *  缩放比例
 */
 public SCALE_UP_RATIO(configID:string):number { return this.data[configID][96]}
/**
 *  怪物龙骨资源
 */
 public SKERES(configID:string):string { return this.data[configID][97]}
/**
 *  怪物文本描述
 */
 public MONSTERDES(configID:string):string { return this.data[configID][98]}
}}