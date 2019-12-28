module SheetConfig{ export class  mydb_item_base_tbl { public data;private _instance; public constructor(data){ this.data=data;}
public static getInstance(data): mydb_item_base_tbl { let Class:any=this;if(!Class._instance){Class._instance=new Class(data);}return Class._instance;}
/**
 *  比如合成后的id,传世装备下级id，技能书的为对应的技能id
 */
 public ITEMLVUPID(configID):string { return this.data[configID][0]}
/**
 *  物品名称
 */
 public ITEMNAME(configID):string { return this.data[configID][1]}
/**
 *  删除
 */
 public DELETED(configID):number { return this.data[configID][2]}
/**
 *  穿戴等级需求
 */
 public ITEMLVNEED(configID):number { return this.data[configID][3]}
/**
 *  前端现在用到的类型为2装备,7矿石
 */
 public ITEMTYPE(configID):number { return this.data[configID][4]}
/**
 *  前端用于符文、传世装备(普通、星、月、神、圣)
 */
 public ITEMJIESHU(configID):number { return this.data[configID][5]}
/**
 *  None
 */
 public ITEMQUALITY(configID):number { return this.data[configID][6]}
/**
 *  None
 */
 public ITEMSTORE(configID):number { return this.data[configID][7]}
/**
 *  None
 */
 public ITEMAVOIDBAOCHU(configID):number { return this.data[configID][8]}
/**
 *  战装(0头盔,1项链,2衣服,3武器,4左手镯,5右手镯,6左戒指,7右戒指,8鞋,9腰带)
    神装(10头盔,11项链,12衣服,13武器,14左手镯,15右手镯,16左戒指,17右戒指,18鞋子,19腰带)
    符文(20-27共八个符文位)
    勋章58
    龙魂59
    血玉60
    主角翅膀61
    神盾62
    官印63
    英雄装备-火龙之心64
    英雄翅膀65
 */
 public ITEMPOSITION(configID):number { return this.data[configID][9]}
/**
 *  0男女通用,1男,2女
 */
 public ITEMSEX(configID):number { return this.data[configID][10]}
/**
 *  0通用职业,1战士,2法师,3道士
 */
 public ITEMJOB(configID):number { return this.data[configID][11]}
/**
 *  None
 */
 public ITEMABILITY(configID):number { return this.data[configID][12]}
/**
 *  None
 */
 public ITEMNEEDABILITY(configID):number { return this.data[configID][13]}
/**
 *  None
 */
 public ITEMSHENGWANG(configID):number { return this.data[configID][14]}
/**
 *  None
 */
 public ISLOCK(configID):number { return this.data[configID][15]}
/**
 *  None
 */
 public HASGOODABILITYCOUNT(configID):number { return this.data[configID][16]}
/**
 *  物品的基础效果id,即一创建就带有的效果id，三职业
 */
 public JOB1_EFFICTID(configID):number { return this.data[configID][17]}
/**
 *  物品的基础效果id,即一创建就带有的效果id，三职业
 */
 public JOB2_EFFICTID(configID):number { return this.data[configID][18]}
/**
 *  物品的基础效果id,即一创建就带有的效果id，三职业
 */
 public JOB3_EFFICTID(configID):number { return this.data[configID][19]}
/**
 *  None
 */
 public POTIONBUFFID(configID):number { return this.data[configID][20]}
/**
 *  套装效果id一致则为同一套装,目前只用于了符文套装
 */
 public SUIT_EFFICTID(configID):number { return this.data[configID][21]}
/**
 *  None
 */
 public SUIT_TYPE(configID):number { return this.data[configID][22]}
/**
 *  None
 */
 public DROP_GOODEFFECTID(configID):number { return this.data[configID][23]}
/**
 *  None
 */
 public SKILLID(configID):number { return this.data[configID][24]}
/**
 *  物品的使用冷却时间(前端使用),默认为1s,数据填的值小于1s,前端也会默认为1s
 */
 public ITEMUSECD(configID):number { return this.data[configID][25]}
/**
 *  购买的花费,货币类型不限,根据不同需求做不同展示
 */
 public ITEMBUYPRICE(configID):number { return this.data[configID][26]}
/**
 *  None
 */
 public ITEMSELLPRICE(configID):number { return this.data[configID][27]}
/**
 *  即场景动态图和内观图编号
 */
 public LOOKID(configID):number { return this.data[configID][28]}
/**
 *  None
 */
 public SPECLOOKID(configID):number { return this.data[configID][29]}
/**
 *  物品icon
 */
 public ICONID(configID):number { return this.data[configID][30]}
/**
 *  物品最大可叠加个数
 */
 public MAXADDCOUNT(configID):number { return this.data[configID][31]}
/**
 *  None
 */
 public MAXDURABLE(configID):number { return this.data[configID][32]}
/**
 *  None
 */
 public SCRIPTID(configID):number { return this.data[configID][33]}
/**
 *  None
 */
 public ITEMDISPOSETIME(configID):number { return this.data[configID][34]}
/**
 *  None
 */
 public ITEMVALIDTIMETYPE(configID):number { return this.data[configID][35]}
/**
 *  None
 */
 public ITEMVALIDTIME(configID):number { return this.data[configID][36]}
/**
 *  None
 */
 public CANSTRENGTHEN(configID):number { return this.data[configID][37]}
/**
 *  None
 */
 public CANDESTROY(configID):number { return this.data[configID][38]}
/**
 *  None
 */
 public CANINSTOREHOUSE(configID):number { return this.data[configID][39]}
/**
 *  None
 */
 public CANBORE(configID):number { return this.data[configID][40]}
/**
 *  1(0xffffff),2(0x04eb3d),3(0x00e4ff),4(0xff49f4),5(0xff0000),6(0xfecb00)
1：白色  2：绿色  3：蓝色  4：紫色    5：橙色   6：金色
 */
 public ITEMNAMECOLOR(configID):number { return this.data[configID][41]}
/**
 *  None
 */
 public ISNOTICE(configID):number { return this.data[configID][42]}
/**
 *  None
 */
 public ISLOG(configID):number { return this.data[configID][43]}
/**
 *  None
 */
 public ITEMSCORELIMIT(configID):number { return this.data[configID][44]}
/**
 *  1是,0为否（是否批量使用）
 */
 public CANBATCHUSE(configID):number { return this.data[configID][45]}
/**
 *  None
 */
 public REQUESTINFO(configID):number { return this.data[configID][46]}
/**
 *  (添加或者修改需要修改string表里的itemTypeEx)
     0物品
     1装备
     2药剂
     3货币道具
     4神羽
     5传送道具
     6技能书
     7主角修为
     8英雄修为
     9英雄真气
     10龙魂
     11功勋道具
     12成就令
     13魂石道具
     14强化石
     15复活道具
     16通行证
     17创建帮会
     18聊天道具
     19塔防道具
     20回复物品
     21属性药水
     22卷轴
     23神奇药水
     24召唤道具
     25血玉道具
     26注灵道具
     27帮会道具
     28战魂道具
     29符文道具
     30金币
 */
 public PLUSTYPE(configID):number { return this.data[configID][47]}
/**
 *  None
 */
 public JYH_TYPE(configID):number { return this.data[configID][48]}
/**
 *  None
 */
 public JYH_SUBTYPE(configID):number { return this.data[configID][49]}
/**
 *  交易行道具上架参考价格
 */
 public JYH_PRICE(configID):number { return this.data[configID][50]}
/**
 *  交易行道具上架最低单价
 */
 public JYH_MINPRICE(configID):number { return this.data[configID][51]}
/**
 *  交易行道具上架最高单价
 */
 public JYH_MAXPRICE(configID):number { return this.data[configID][52]}
/**
 *  不允许出现英文','符号
 */
 public ITEMDES(configID):string { return this.data[configID][53]}
/**
 *  同物品说明
 */
 public ITEMPLUSDES(configID):string { return this.data[configID][54]}
/**
 *  None
 */
 public INSHOPDES(configID):string { return this.data[configID][55]}
/**
 *  None
 */
 public SHOWEFFECT(configID):number { return this.data[configID][56]}
/**
 *  用于行会捐献
 */
 public CONTRIBUTIONVALUE(configID):number { return this.data[configID][57]}
/**
 *  None
 */
 public EQUIP_ATK_NEED(configID):number { return this.data[configID][58]}
/**
 *  None
 */
 public EQUIP_MAGIC_NEED(configID):number { return this.data[configID][59]}
/**
 *  None
 */
 public EQUIP_DS_NEED(configID):number { return this.data[configID][60]}
/**
 *  None
 */
 public EQUIP_YS_NEED(configID):number { return this.data[configID][61]}
/**
 *  None
 */
 public EQUIP_STRENGTHENEFFECT(configID):number { return this.data[configID][62]}
/**
 *  None
 */
 public EQUIP_LENGTHSIGN(configID):number { return this.data[configID][63]}
/**
 *  None
 */
 public EQUIP_POWERNEED(configID):number { return this.data[configID][64]}
/**
 *  None
 */
 public ITEMDROPDES(configID):string { return this.data[configID][65]}
/**
 *  None
 */
 public ITEMBGDES(configID):string { return this.data[configID][66]}
/**
 *  用于判断是否可穿戴
 */
 public ZS_LEVEL(configID):number { return this.data[configID][67]}
/**
 *  None
 */
 public STRENGTHENLIMIT(configID):number { return this.data[configID][68]}
/**
 *  None
 */
 public USETIMESDAILY(configID):number { return this.data[configID][69]}
/**
 *  回收获得的主角经验
 */
 public RECOVEREXP(configID):number { return this.data[configID][70]}
/**
 *  会收获得的英雄经验
 */
 public RECOVERHEROEXP(configID):number { return this.data[configID][71]}
/**
 *  道具动态图(沿用的老字段名称,看着有歧义可以修改掉)
    1:橙色边框环绕光效
    2:红色边框环绕光效
    3:紫色边框环绕光效
    4:橙色边框光效
    5:紫色边框光效
    6:蓝色边框光效
    7:紫色边框幸运装备光效
    8:橙色普通边框
    9:紫色普通边框
    10:蓝色普通边框
    11:绿色普通边框
 */
 public SZ_COLOR(configID):number { return this.data[configID][72]}
/**
 *  None
 */
 public SHOWSUBTYPE(configID):number { return this.data[configID][73]}
/**
 *  None
 */
 public SZ_ID(configID):number { return this.data[configID][74]}
/**
 *  None
 */
 public USEPRIZE(configID):number { return this.data[configID][75]}
/**
 *  None
 */
 public SORTTYPE(configID):number { return this.data[configID][76]}
/**
 *  None
 */
 public SORTSUBTYPE(configID):number { return this.data[configID][77]}
/**
 *  None
 */
 public LVNEED(configID):number { return this.data[configID][78]}
/**
 *  蓝月装备融合后的id
 */
 public SX_MIXID(configID):number { return this.data[configID][79]}
/**
 *  蓝月装备拆分后的id
 */
 public SX_SPLITID(configID):number { return this.data[configID][80]}
/**
 *  蓝月装备融合需要的道具个数
 */
 public MIXNEEDCOUNT(configID):number { return this.data[configID][81]}
/**
 *  None
 */
 public CANSPLIT(configID):number { return this.data[configID][82]}
/**
 *  NPC好感度
 */
 public LIKEVALUE(configID):number { return this.data[configID][83]}
/**
 *  是否记录图鉴
 */
 public TUJIAN(configID):number { return this.data[configID][84]}
}}