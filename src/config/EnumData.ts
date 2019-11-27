/**
 * 枚举数据
 */
module EnumData {
    /**
     * 平台类型
     */
    export enum PLATFORM_TYPE {
        PLATFORM_TYPE_NULL = 0,
        PLATFORM_TYPE_WEB = 1,
        PLATFORM_TYPE_IOS = 2,
        PLATFORM_TYPE_ANDROID = 3,
    };

    /**
    * 客户端枚举类型
    */
    export enum CLIENT_TYPE {
        // Mobile(Phone, Pad)
        CLIENT_TYPE_MOBILE = 1,
        // Windows Application program
        CLIENT_TYPE_WIN = 2,
        // Linux Application program
        CLIENT_TYPE_LINUX = 3,
        // Mac Application program
        CLIENT_TYPE_MAC = 4,
        // Web，HTML5，Flash
        CLIENT_TYPE_BROWSER = 5,
        // bots
        CLIENT_TYPE_BOTS = 6,
        // Mini-Client
        CLIENT_TYPE_MINI = 7,
    };
    /**
     * 游戏字号
     */
    export enum FONT_SIZE {
        // 默认字号
        DEFAULT = 30,

    }
    /**
     * 创建角色枚举
     */
    export enum createPlayerError {
        _CREATEPLAYER_RET_SUCCESS_ = 0,
        _CREATEPLAYER_RET_LIMITSTR_ = -10,		    //有非法字符 	
        _CREATEPLAYER_RET_HASMAXPLAYER_ = -11,		//角色超过规定数量 
        _CREATEPLAYER_RET_STATEERROR_ = -12,		//正在游戏 
        _CREATEPLAYER_RET_OTHERZONEHASPLAYER_ = -13,//其他区还有角色 
        _CREATEPLAYER_RET_NAMECHECKFAIL_ = -14,		//角色名检查没通过
        _CREATEPLAYER_RET_NAMENUMBERCHECKFAIL_ = -15,//角色名不能超过4个以上的数字 
        _CREATEPLAYER_RET_SERVERDOWN_ = -16,		//当前服务器正在维护  	
        _CREATEPLAYER_RET_NAMEREPEAT_ = -70,		//角色重名
        _CREATEPLAYER_RET_ONLYIDERROR_ = -71,		//onlyid分配失败  
        _CREATEPLAYER_RET_NAMECHECKSVRASSERT_ = -21,//角色名检查服务器没有开启  
        _CREATEPLAYER_RET_DBCONNECTERROR_ = -31,	//数据库连接失败 
        _CREATEPLAYER_RET_DBINSERTERROR_ = -32,		//插入失败 
        _CREATEPLAYER_RET_COUNTRYERROR_ = -33,		//国家信息没有找到 
    };

    /**
     * 玩家和弟子对象枚举
     */
    export enum PlayerAndHeroType {
        Player = 0,// 玩家
        Hero1,// 战士弟子
        Hero2,// 道士弟子
        Hero3,// 法师弟子
    }


    /**
     * 道具信息界面模式
     */
    export enum ItemInfoModel {
        SHOW_NONE = 0,//不显示
        SHOW_IN_BAG = 1,//背包中显示
        SHOW_IN_CANGKU = 2,//仓库中显示
        SHOW_IN_PLAYER = 3,//角色弟子身上中显示
        SHOW_IN_MAIL = 4,//邮件中显示,只有信息 无操作按钮
        SHOW_IN_GUILD_CANGKU = 5,//公会仓库
        SHOW_IN_GUILD_BAG = 6,//公会背包
        SHOW_IN_HUI_SHOU_LU = 7,// 回收炉
        SHOW_IN_BAG_EQUIP = 100,//背包-装备显示
        SHOW_IN_BAG_HUISHOU = 101,//背包-回收显示
        SHOW_IN_BAG_CANGKU = 102,//背包=仓库显示
        SHOW_IN_BAG_BAITAN = 103,//背包-摆摊显示
    }

    /**
     * 职业
     */
    export enum JOB_TYPE {
        JOB_NONE = 0,//通用
        JOB_WARRIOR = 1,// 战士
        JOB_MAGE = 2,// 法师
        JOB_MONK = 3,// 道士
    }

    /**
     * 性别
     */
    export enum SEX_TYPE {
        SEX_NONE = 0,
        SEX_MAN = 1,
        SEX_WOMEN = 2
    }
    // 
    /**
     * 装备部位
     */
    export enum emEquipPosition {
        //战装
        EQUIP_HEADDRESS = 0,		//帽子
        EQUIP_NECKLACE,				//项链
        EQUIP_CLOTHES,				//衣服
        EQUIP_WEAPONS,				//武器
        EQUIP_BRACELET_LEFT,		//左手镯
        EQUIP_BRACELET_RIGHT,		//右手镯
        EQUIP_RING_LEFT,			//左戒指
        EQUIP_RING_RIGHT,			//右戒指
        EQUIP_SHOES,				//鞋
        EQUIP_BELT = 9,				//腰带

        //神装
        EQUIP_LEGEND_HEADDRESS = 10,		//传说帽子
        EQUIP_LEGEND_NECKLACE,				//传说项链
        EQUIP_LEGEND_CLOTHES,				//传说衣服
        EQUIP_LEGEND_WEAPONS,				//传说武器
        EQUIP_LEGEND_BRACELET_LEFT,			//传说左手镯
        EQUIP_LEGEND_BRACELET_RIGHT,		//传说右手镯
        EQUIP_LEGEND_RING_LEFT,				//传说左戒指
        EQUIP_LEGEND_RING_RIGHT,			//传说右戒指
        EQUIP_LEGEND_SHOES,					//传说鞋
        EQUIP_LEGEND_BELT = 19,				//传说腰带
        //符文八卦
        EQUIP_RUNE_UP = 20,
        EQUIP_RUNE_UPRIGHT,
        EQUIP_RUNE_RIGHT,
        EQUIP_RUNE_DOWNRIGHT,
        EQUIP_RUNE_DOWN,
        EQUIP_RUNE_DOWNLEFT,
        EQUIP_RUNE_LEFT,
        EQUIP_RUNE_UPLEFT = 27,

        //英雄战士
        EQUIP_HERO_WARRIOR_HEADDRESS = 28,			//英雄战士帽子
        EQUIP_HERO_WARRIOR_NECKLACE,				//英雄战士项链
        EQUIP_HERO_WARRIOR_CLOTHES,					//英雄战士衣服
        EQUIP_HERO_WARRIOR_WEAPONS,					//英雄战士武器
        EQUIP_HERO_WARRIOR_BRACELET_LEFT,			//英雄战士左手镯
        EQUIP_HERO_WARRIOR_BRACELET_RIGHT,			//英雄战士右手镯
        EQUIP_HERO_WARRIOR_RING_LEFT,				//英雄战士左戒指
        EQUIP_HERO_WARRIOR_RING_RIGHT,				//英雄战士右戒指
        EQUIP_HERO_WARRIOR_SHOES,					//英雄战士鞋
        EQUIP_HERO_WARRIOR_BELT = 37,				//英雄战士腰带

        //英雄法师
        EQUIP_HERO_MAGE_HEADDRESS = 38,			//英雄法师帽子
        EQUIP_HERO_MAGE_NECKLACE,				//英雄法师项链
        EQUIP_HERO_MAGE_CLOTHES,				//英雄法师衣服
        EQUIP_HERO_MAGE_WEAPONS,				//英雄法师武器
        EQUIP_HERO_MAGE_BRACELET_LEFT,			//英雄法师左手镯
        EQUIP_HERO_MAGE_BRACELET_RIGHT,			//英雄法师右手镯
        EQUIP_HERO_MAGE_RING_LEFT,				//英雄法师左戒指
        EQUIP_HERO_MAGE_RING_RIGHT,				//英雄法师右戒指
        EQUIP_HERO_MAGE_SHOES,					//英雄法师鞋
        EQUIP_HERO_MAGE_BELT = 47,				//英雄法师腰带

        //英雄道士
        EQUIP_HERO_MONK_HEADDRESS = 48,			//英雄道士帽子
        EQUIP_HERO_MONK_NECKLACE,				//英雄道士项链
        EQUIP_HERO_MONK_CLOTHES,				//英雄道士衣服
        EQUIP_HERO_MONK_WEAPONS,				//英雄道士武器
        EQUIP_HERO_MONK_BRACELET_LEFT,			//英雄道士左手镯
        EQUIP_HERO_MONK_BRACELET_RIGHT,			//英雄道士右手镯
        EQUIP_HERO_MONK_RING_LEFT,				//英雄道士左戒指
        EQUIP_HERO_MONK_RING_RIGHT,				//英雄道士右戒指
        EQUIP_HERO_MONK_SHOES,					//英雄道士鞋
        EQUIP_HERO_MONK_BELT = 57,				//英雄道士腰带

        //资源线
        EQUIP_MEDAL,					// 勋章-根骨2
        EQUIP_DRAGONSOUL,				// 龙魂-悟性1
        EQUIP_BLOODJADE,				// 血玉-身法4
        EQUIP_WING,						// 光翼-罡气
        EQUIP_SHIELD,					// 神盾-臂力3
        EQUIP_OFFICIALSEAL = 63,		// 官印-善缘5

        EQUIP_HERO_DRAGONHEART,			// 英雄共享装备-火龙之心
        EQUIP_HERO_WING,				// 英雄共享装备-翅膀

        EQUIP_SHOULDER,					// 肩
        EQUIP_KNEE,						// 膝
        EQUIP_PENDANT,					// 吊坠
        EQUIP_FACE = 69,				// 脸

        EQUIP_MAX_COUNT,				// 总数
    };



    /**
     * 背包类型
     */
    export enum PACKAGE_TYPE {
        ITEMCELLTYPE_NONE = 0,				// 不是格子，用于丢弃或捡到物品
        ITEMCELLTYPE_EQUIP = 1,				// 身上穿戴的装备
        ITEMCELLTYPE_STORE = 2,				// 仓库
        ITEMCELLTYPE_PACKAGE = 3,			// 包裹
        ITEMCELLTYPE_SOLDITEM = 4,			// 已出售物品
        ITEMCELLTYPE_LINGSHBAOGUO = 5,		// 临时包裹
        //-----
        ITEMCELLTYPE_PLAYER_EQUIP = 50,		    //人物战装(类型区分,不是实际包裹)
        ITEMCELLTYPE_PLAYER_LEGENDEQUIP = 51,	//人物神装(类型区分,不是实际包裹)
        ITEMCELLTYPE_PLAYER_RUNEEQUIP = 52,		//符文
        ITEMCELLTYPE_HERO_EQUIP = 53,			//英雄装备
        //====================
        //客户端已使用
        ITEMCELLTYPE_VIRTUAL = 200,	// 虚拟
    }

    /**
     * 物品类型
     */
    export enum ItemTypeDef {
        ITEM_TYPE_GOLD = 0,		//游戏币
        ITEM_TYPE_NORMAL,		//普通物品
        ITEM_TYPE_EQUIP,		//点使用后装备到人物身上 装备
        ITEM_TYPE_DRUG,			//药品，会响应“使用”按钮，点使用后吃掉并增加药效 消耗品
        ITEM_TYPE_SKILL,		//心法书，会响应“使用”按钮，点使用后吃掉并学会心法 消耗品
        ITEM_TYPE_MAZE,			//阵法书，会响应“使用”按钮，点使用后吃掉并学会队伍阵法 消耗品
        ITEM_TYPE_SCROLL,		//卷轴，会响应“使用”按钮，点使用后触发脚本ID 消耗品 
        ITEM_TYPE_TASK,         //多为任务品
    };

    /**
     * 
     */
    export enum JYH_ITEMTYPE {
        JYH_YAOPIN = 2,//药品
        JYH_QITA = 3,//其他道具
    }

    /**
     * 拾取装备枚举
     */
    export enum emPickType {
        PICK_SUCCESS,		// 成功
        PICK_NOOWNER,		// 不是你的物品
        PICK_NOITEM,		// 没有物品
        PICK_NOBAG,			// 没有加入到包裹
        PICK_NOXY,			// 坐标不对
        PICK_MAGICPET,      // 魔宠拾取
    };

    /**
     * 装备品质
     */
    export enum emRareType {
        RARE_TYPE_NORMAL,		//普通装备
        RARE_TYPE_GOD,			//神装
        RARE_TYPE_HOLY,			//圣装
        RARE_TYPE_LEGEND,		//传说装备
        RARE_TYPE_MOON,			//蓝月装备
        RARE_TYPE_RUNE,			//符文装备
        RARE_TYPE_MYSTIC,		//神秘品质
        RARE_TYPE_SPECIALRING = 8,//品质,麻痹戒指，护身戒指， 复活戒指
    };

    /**
     * 药品类型
     */
    export enum emDrugType {
        DRUG_TYPE_HP,		//红药
        DRUG_TYPE_MP,		//蓝药
        DRUG_TYPE_HPANDMP,	//红蓝同时加的药
        DRUG_TYPE_ABI,		//加状态和属性的药
    };

    /**
     * 绑定类型
     */
    export enum emBindType {					//绑定的各种属性
        BIND_TYPE_NULL = 0,				//无绑定
        BIND_TYPE_NOTTRADE = 0x1,		//不能交易,包含交易,寄售,邮件
        BIND_TYPE_NOTSELL = 0x2,		//不能卖给npc
        BIND_TYPE_NOTSTRENG = 0x4,		//装备用,不能强化
        BIND_TYPE_NOTTAKEDOWN = 0x8,	//传世装备激活,不能取下

    };

    /**
     * 极品属性
     */
    export enum emItemNpFrom {
        NP_ALL = 0,				//无来源
        NP_MONSTERDROP = 1,		//掉落生成
        NP_GMCREATE = 2,		//GM生成
        NP_STRENGPROPERTY = 3,	//武器强化
        NP_QUESTREWARD = 4,		//任务奖励
        NP_SCRIPTCREATE = 5,    //脚本生成

        NP_QUENCHING_POS_ONE = 6,	//第一条淬炼
        NP_QUENCHING_POS_TWO = 7,	//第二条淬炼
        NP_QUENCHING_POS_THREE = 8,	//第三条淬炼

        NP_POS_0_1 = 10,		// 符文属性
        NP_POS_1_1,
        NP_POS_2_1,
        NP_POS_3_1,
        NP_POS_4_1,
        NP_POS_5_1,
        NP_POS_6_1,
        NP_POS_7_1,
        NP_POS_8_1,
        NP_POS_9_1,
        NP_POS_10_1,

        NP_POS_0_2 = 30,	//
        NP_POS_1_2,
        NP_POS_2_2,
        NP_POS_3_2,
        NP_POS_4_2,
        NP_POS_5_2,
        NP_POS_6_2,
        NP_POS_7_2,
        NP_POS_8_2,
        NP_POS_9_2,
        NP_POS_10_2,

        NP_POS_0_3 = 50,	//
        NP_POS_1_3,
        NP_POS_2_3,
        NP_POS_3_3,
        NP_POS_4_3,
        NP_POS_5_3,
        NP_POS_6_3,
        NP_POS_7_3,
        NP_POS_8_3,
        NP_POS_9_3,
        NP_POS_10_3,

        NP_POS_0_4 = 70,	//
        NP_POS_1_4,
        NP_POS_2_4,
        NP_POS_3_4,
        NP_POS_4_4,
        NP_POS_5_4,
        NP_POS_6_4,
        NP_POS_7_4,
        NP_POS_8_4,
        NP_POS_9_4,
        NP_POS_10_4,

        NP_POS_0_5 = 90,	//
        NP_POS_1_5,
        NP_POS_2_5,
        NP_POS_3_5,
        NP_POS_4_5,
        NP_POS_5_5,
        NP_POS_6_5,
        NP_POS_7_5,
        NP_POS_8_5,
        NP_POS_9_5,
        NP_POS_10_5,
    };

    /**
     *  //角色属性 改变通知枚举
    // 0x0237
     */
    export enum eEXP_VALUE_TYPE {
        EXP_VALUE_TYPE_PLAYER,//角色经验
        EXP_VALUE_TYPE_HERO,//弟子经验
        EXP_VALUE_TYPE_BOSS,//boss积分
        EXP_VALUE_TYPE_HEALTH,//健康
        EXP_VALUE_TYPE_SPITIT,//精神
        EXP_VALUE_TYPE_TILI,//体力
        EXP_VALUE_TYPE_PRETTY,//颜值
        EXP_VALUE_TYPE_MOOD,//心情
    };

    /**
     * 天赋枚举
     */
    export enum emTalentType {
        talent_wuXing = 1,// 悟性-龙魂
        talent_genGu = 2,// 根骨-勋章
        talent_biLi = 3,// 臂力-神盾
        talent_shenFa = 4,// 身法-血玉
        talent_shanYuan = 5,// 善缘-官印
    }

    /**
     * 道具操作错误枚举
     */
    export enum emItemErrorCode {
        ITEM_SUCCESS,	   //成功操作',
        ITEM_FAIL_NOITEM,	    //没有物品',
        ITEM_FAIL_NOTENOUGH,    //物品数量不足以拆分',
        ITEM_FAIL_NOSPACE,	    //没有剩余的空间', 
        ITEM_FAIL_NOT_ENOUGH_GOLD, //人物金币不足', 
        ITEM_FAIL_MAX_CARRY_GOLD,  //人物金币已达上限值', 	
        ITEM_FAIL_SAVE_NOT_ENOUGH_GOLD, //仓库金币不足', 
        ITEM_FAIL_SAVE_MAX_CARRY_GOLD, //仓库已达上限值', 
        ITEM_FAIL_FULL,         //已满', 
        ITEM_FAIL_WRONGSTORAGE,//仓库编号错误', 
        ITEM_FAIL_WRONGBAG,//包裹编号错误', 
        ITEM_FAIL_NOTOPENED,//未开放', 
        ITEM_FAIL_LOWLEVEL,//等级不足', 
        ITEM_FAIL_WRONG_POSITION,//佩戴位置错误', 
        ITEM_FAIL_WRONG_TYPE,//物品操作类型错误', 
        ITEM_FAIL_WRONG_SEX,//物品性别错误', 	
        ITEM_FAIL_NOT_IDENT, //未鉴定', 
        ITEM_FAIL_NOTFIND_TARGET,//未找到使用目标', 
        ITEM_FAIL_NONEED,//不需要使用 
        ITEM_USER_DIE, //用户已死亡 
        ITEM_FAIL_FIGHT,//战斗中无法使用 
        ITEM_FAIL_UKNOWN,//未知错误 
        ITEM_FAIL_LOCKED, //装备已锁定 
        ITEM_FAIL_NOTLOCKED,//装备已锁定 
        ITEM_FAIL_BAG_FULL,//包裹满  
        ITEM_SKILL_STUDY,	//技能已学习(技能存档结构修改后)
        ITEM_SKILL_NOMAGIC,	//没有技能的下一等级 
        ITEM_SKILL_NOITEM,	//没有该技能书 
        ITEM_FAIL_NOJOB,	//职业不符合  
        ITEM_DRUG_NODRUG,	//药品没有 
        ITEM_DRUG_NOBUFF,	//药品使用不成功  
        ITEM_FAIL_NOCDTIME,	//物品没有冷却 
        ITEM_FORSAKE_NOITEM,	//物品不存在 	
        ITEM_FORSAKE_BINDING,	//物品绑定 
        ITEM_FORSAKE_NOMOVE,	//物品不能移出包裹 
        ITEM_FORSAKE_NOMAP,		//不能地面创建物品  
        ITEM_FAIL_NOPUTSTORAGE,	//不能放入仓库  
        ITEM_MARRIED_BINDING,	//结婚戒指被绑定,不能摘下和替换 
        ITEM_FAIL_DESTORY,		//不能摧毁  
        ITEM_FAIL_NORESORTSTORAGE,	//不能整理仓库  
        ITEM_FAIL_TMPPACKETNOREPLACE,//临时包裹有东西时不能替换 	
        ITEM_FAIL_NOFAME,			//物品所需声望不足 
        ITEM_FAIL_USELOWLEVEL,		//物品使用等级不足 
        ITEM_FAIL_TREASURESTONE,	//勋章和印不是luacall 
        ITEM_FAIL_SAMERUNEPROPERTY,	//已佩戴相同属性兽魂 
        ITEM_FAIL_EATANIMALSOUL,	//兽魂吞噬失败 
        ITEM_FAIL_CROSSSVR,			//跨服不能丢弃 
        ITEM_FAIL_ZHUANSHENGLV,		//转生等级不足 
        ITEM_FAIL_LEGEND_BINDING,	//传世装备绑定，不能取下、替换 
    };




    /**
     * 属性类型
     */
    export enum emNonpareilType {
        NONPAREIL_TYPE_NULL,	 //没有极品
        NONPAREIL_TYPE_MAXHP,	 //最大血量
        NONPAREIL_TYPE_MAXMP,	 //最大蓝量
        NONPAREIL_TYPE_MAXATK,	 //物理/魔法/道术攻击上限全部
        NONPAREIL_TYPE_MINATK,	 //物理/魔法/道术攻击下限全部
        NONPAREIL_TYPE_MAXDC,	 //物理攻击上限值,攻击力上限，影响所有职业普通攻击和战士技能的最大伤害。
        NONPAREIL_TYPE_MINDC,	 //物理攻击下限值,攻击力下限，影响所有职业普通攻击和战士技能的最小伤害。
        NONPAREIL_TYPE_MAXMC,	 //自然魔法攻击上限值,魔法攻击上限，影响法师技能的最大伤害。
        NONPAREIL_TYPE_MINMC,	 //自然魔法攻击下限值,魔法攻击下限，影响法师技能的最小伤害。

        NONPAREIL_TYPE_MAXSC,	 //灵魂魔法攻击上限值,道士攻击上限，影响法师技能的最大伤害。
        NONPAREIL_TYPE_MINSC,	 //灵魂魔法攻击下限值.道术攻击下限，影响法师技能的最小伤害。

        NONPAREIL_TYPE_MAXAC,	 //物理防御上限值,防御上限，影响受到物理攻击时可以降低的伤害。
        NONPAREIL_TYPE_MINAC,	 //物理防御下限值,防御下限，影响受到物理攻击时可以降低的伤害。

        NONPAREIL_TYPE_MAXMAC,	 //全系法术防御上限值,魔法防御上限，影响受到魔法和道术攻击时可以降低的伤害。
        NONPAREIL_TYPE_MINMAC,	 //全系法术防御下限值,魔法防御下限，影响受到魔法和道术攻击时可以降低的伤害。

        NONPAREIL_TYPE_HIT,	 //命中(准确),在攻击时，增加命中目标的几率。当自身准确大于目标闪避时，目标不能闪避攻击
        NONPAREIL_TYPE_HITRATE,	 //命中的概率，准确值折算成命中率
        NONPAREIL_TYPE_JUCK,	 //闪避,影响受到所有攻击可以闪避的概率
        NONPAREIL_TYPE_JUCKRATE,	 //闪避的概率，闪避值折算成闪避率
        NONPAREIL_TYPE_CRIT,	 //暴击,在攻击时，增加暴击的几率。每160点暴击增加1%的暴击率
        NONPAREIL_TYPE_CRITRATE,	 //暴击率, 暴击的概率
        NONPAREIL_TYPE_TOUGHNESS,	 //韧性(暴抗),受攻击时，减少被暴击的几率。每160点韧性抵消对方1%的暴击率
        NONPAREIL_TYPE_TOUGHNESSRATE,	 //(韧性率)抗暴率, 抵抗暴击的概率
        NONPAREIL_TYPE_ATKCRIT,	 //暴击伤害,暴击时，暴伤越高，可以造成更多的额外伤害
        NONPAREIL_TYPE_LUCKY,	 //幸运,幸运值越高，出现攻击（所有）上限的几率越大，为9时必出
        NONPAREIL_TYPE_RESTOREHP,	 //每次恢复血量，正负,每N秒自动回复生命//生命恢复是英雄抗怪能力最重要的指标。
        NONPAREIL_TYPE_RESTOREMP,	 //每次恢复蓝量，正负,每N秒自动回复法力
        NONPAREIL_TYPE_MOVESPEED,	 //增加人物行走时的移动速度
        NONPAREIL_TYPE_PALSYRATE,	 //麻痹概率
        NONPAREIL_TYPE_PALSYRESI,	 //抗麻痹概率
        NONPAREIL_TYPE_UNIONATKRATE,	 //合击威力
        NONPAREIL_TYPE_INCATKWARRIOR,	 //对战士伤害增加
        NONPAREIL_TYPE_DECATKWARRIOR,	 //受战士伤害减少
        NONPAREIL_TYPE_INCATKMAGE,	 //对法师伤害增加
        NONPAREIL_TYPE_DECATKMAGE,	 //受法师伤害减少
        NONPAREIL_TYPE_INCATKMONK,	 //对道士伤害增加
        NONPAREIL_TYPE_DECATKMONK,	 //受道士伤害减少
        NONPAREIL_TYPE_INCATKMONSTER,	 //对怪物伤害增加
        NONPAREIL_TYPE_DECATKMONSTER,	 //受怪物伤害减少
        NONPAREIL_TYPE_INCATKBOSS,	 //对BOSS伤害增加
        NONPAREIL_TYPE_DECATKBOSS,	 //受BOSS伤害减少
        NONPAREIL_TYPE_INCATKHERO,	 //增加对英雄伤害
        NONPAREIL_TYPE_DECATKHERO,	 //减少受英雄伤害
        NONPAREIL_TYPE_ENERGY,	 //内功值(能量)，护盾能量最大值
        NONPAREIL_TYPE_RESTOREENERGY,	 //恢复内功值
        NONPAREIL_TYPE_ENERGYRESI,	 //内功抵消伤害比例
        NONPAREIL_TYPE_INCDAMAGE,	 //增伤,提高攻击时可以造成的伤害（百分比）
        NONPAREIL_TYPE_DECDAMAGE,	 //减伤,降低受到的所有伤害（百分比）
        NONPAREIL_TYPE_INCBOSSCRIT,	             //增加对BOSS的暴击
        NONPAREIL_TYPE_INCBOSSATKCRIT,	          //增加对BOSS的暴伤
        NONPAREIL_TYPE_DECUNIONATKDAMAGE,	       //受合击伤害减少
        NONPAREIL_TYPE_DECATKCRITDAMAGE,	        //受暴击伤害减少
        NONPAREIL_TYPE_RESTOREANGER,	            //怒气恢复率
        NONPAREIL_TYPE_UATOMONSTER,	             //合击对怪增伤率
        NONPAREIL_TYPE_UATOPLAYER,	              //合击对人增伤率
        NONPAREIL_TYPE_UPCOMBOSKILLLEVEL,	// 合计技能提升等级
        NONPAREIL_TYPE_MAXCOUNT,	                //最大

    };

    /**
     * 游戏对象类型
     */
    export enum CRET_TYPE {
        CRET_NONE = 0,
        CRET_PLAYER = 1,
        CRET_NPC = 2,
        CRET_MONSTER = 3,
        CRET_PET = 4,
        CRET_COPYHUMAN = 5,
        CRET_HERO = 6,
        CRET_ALL = 7,
        CRET_ITEM = 100,// 添加道具
    };

    /**
     * 怪物类型
     */
    export enum emMonsterType {
        _MON_TYPE_NORMAL_ = 0,		//普通怪物
        _MON_TYPE_LITTLEBOSS_ = 1,	//小BOSS
        _MON_TYPE_BIGBOSS_ = 2,		//大BOSS
        _MON_TYPE_PET_ = 3,		    //宠物
        _MON_TYPE_DEAD_ = 4,		//死亡系
        _MON_TYPE_DEFENSEFORCE_ = 5,//强制防御,掉血一点
        _MON_TYPE_BROADSWORD_ = 6,	//大刀守卫
        _MON_TYPE_BATTLE_ = 7,		//战场怪
        _MON_TYPE_CHARGEDART_ = 8,	//镖车
        _MON_TYPE_HUMAN_ = 9,		//模拟玩家类怪物
        _MON_TYPE_GUARD_ = 10,		//公会守护神
        _MON_TYPE_COPYHUMAN_ = 11,	//人物分身
        _MON_TYPE_CREAM_ = 12,		//精英怪物
        _MON_TYPE_CITYGUARD_ = 13,	//友军怪物
        _MON_TYPE_MAGICPET_ = 14,	//魔宠
        _MON_TYPE_COLLECT_ = 15,	//收集类
        _MON_TYPE_HERO_ = 16,		//英雄
    };

    /**
     * 聊天类型
     */
    export enum ChatType {

        CHAT_TYPE_PRIVATE = 1,			// 私聊频道

        CHAT_TYPE_REFMSG = 2,			// 当前屏幕聊天

        CHAT_TYPE_SYSTEM = 3,			// 系统消息	 //单人

        CHAT_TYPE_GROUP = 4,			// 队伍消息  

        CHAT_TYPE_CLAN = 5,				// 帮会消息  

        CHAT_TYPE_PRINCES = 6,			// 诸侯消息  

        CHAT_TYPE_BOHOU = 7,			// 伯侯消息   

        CHAT_TYPE_WORLD = 8,			// 世界消息  

        CHAT_TYPE_SPEAKER = 9,			// 喇叭消息

        CHAT_TYPE_DEAL = 10,			// 交易消息  

        CHAT_TYPE_RUMORS = 11,			// 传言消息 

        CHAT_TYPE_SYSTEMNOTICE = 12,	//系统公告消息

        CHAT_TYPE_GM = 13,				//GM发布的及时消息

        CHAT_TYPE_CENTER = 14,          //屏幕中间淡入淡出的消息

        CHAT_TYPE_QQ = 15,				//QQ聊天

        CHAT_TYPE_NOTICE = 16,			//公告消息

        CHAT_TYPE_CLASS = 17,			//班级消息

        CHAT_TYPE_SIMPLE = 18,			//简单消息

        CHAT_TYPE_OPERATOR = 20,		//平台消息

        CHAT_TYPE_SIMPLE2 = 30,			//左下角提示

        CHAT_TYPE_WORLD_TEAM = 99,		//世界队伍聊天

        CHAT_TYPE_MONSTER = 198,		//客户端提醒

        CHAT_TYPE_CLIENT = 199,			//客户端提醒

        CHAT_TYPE_GMCMD = 200,			//Gm命令

        CHAT_TYPE_ADFILTER = 201,		//Gm命令

    };
    /**
     * PK类型
     */
    export enum PkModel {
        PKMODEL_PEACEMODE,			//和平模式：只对怪物进行攻击起效
        PKMODEL_TEAMMODE,			//队伍模式：对怪物以及非本队伍的玩家进行攻击起效
        PKMODEL_GUILDMODE,			//行会模式：对怪物以及非本行会的玩家进行攻击起效
        PKMODEL_GUILDWARMODE,		//行会战模式：对怪物以及非本行会的行会战玩家进行攻击起效
        PKMODEL_NULL,
        PKMODEL_GOODANDEVILMODE,	//善恶模式：对怪物以及无保护状态的玩家进行攻击起效（灰名，黄名，红名玩家）
        PKMODEL_ALLTHEMODE,			//全体模式：对所有怪物和玩家进行攻击起效
        PKMODEL_SAFEMODE,			//安全模式
    };





    // *************************************工会***************************************
    /**
     * 行会捐献错误码
     */
    export enum emGuildDonateErrorCode {
        _GUILD_RET_SUCCESS,								//无操作
        _GUILD_RET_FAIL_AUTHORITY,						//权限不够
        _GUILD_RET_FAIL_NOTFOUND_USER,					//用户无法查找
        _GUILD_RET_ADDMEMBER_FAIL_MEMBERMAX,			//行会人满
        _GUILD_RET_ADDMEMBER_FAIL_ISHAVEGUILD,			//对方已经有行会
        _GUILD_RET_ADDMEMBER_FAIL_WAITASK,				//等待对方应答
        _GUILD_RET_QUITCLAN_FAIL_MASTERANDTWO,			//行会必须有2个人以上才能删除成员
        _GUILD_RET_CREATE_FAIL,							//行会创建失败
        _GUILD_RET_CREATE_FAIL_HAVENAME,				//行会名检查重复
        _GUILD_RET_MAXLEVEL,							//行会达到最大等级
        _GUILD_RET_FAIL_NOTFOUND,						//行会没有找到
        _GUILD_RET_FAIL_ASKJOIN_MINLVL,					//加入行会等级不够
        _GUILD_RET_FAIL_ASKJOIN_ISHAVEGUILD,			//加入行会已经有行会
        _GUILD_RET_FAIL_HAVECLASS,						//有班级无法加入行会
        _GUILD_RET_FAIL_NOTICE,							//行会公告错误
        _GUILD_RET_FAIL_OFFLINE,						//不在线
        _GUILD_RET_FAIL_RELATION,						//添加关系失败
        _GUILD_RET_ADDRElATION_WAIT,					//等待添加关系
        _GUILD_RET_FAIL_HASRELATION,					//关系已经存在
        _GUILD_RET_FAIL_ALREADHAS_GUILD,				//已经有行会了
    };
    /**
     * 行会职位枚举
     */
    export enum emGuildMemberPowerLvl {
        NULL = 1,			//帮会成员--外门弟子
        ELITISM = 2,			//精英--内门弟子
        ADMIRAL = 3,			//大将--核心弟子
        ELDERS = 4,			//长老--首席大弟子
        FITMASTER = 5,			//副帮主-副掌门
        MASTER = 6,			//帮主--掌门

    };


    // *************************************好友***************************************
    /**
     * 好友验证设置
     */
    export enum emFriendType {
        emFriendType_AllowAll = 0x1,                //允许所有人加我为好友
        emFriendType_NeedVerify = 0x2,	            //需要验证
        emFriendType_Refuse = 0x4,		            //拒绝所有
        emFriendType_HideLocation = 0x8,	        //对好友隐藏位置
        emFriendType_HideRelationTip = 0x10,        //不显示好友仇人提示
        emFriendType_GuildMemberDieHide = 0x20,     //不显示行会成员死亡提示
        emFriendType_GuildDonateHide = 0x40,        //不显示行会捐献
        emFriendType_GuildMemberJoinHide = 0x80,    //不显示行会新成员加入
        emFriendType_GuildMemberLeaveHide = 0x100,  //不显示行会成员离开
    };


    export enum emFriendErrorCode {
        RELATION_SUCCESS = 0,            //成功
        RELATION_FAIL_NOT_ONLINE,    //不在线
        RELATION_FAIL_IN_FRIEND,     //是好友
        RELATION_FAIL_IN_BLOCK,      //在黑名单中
        RELATION_FAIL_ALLREADY_FRIEND,      //已经在好友了
        RELATION_FAIL_ALLREADY_BLOCK,      //已经在黑名单了
        RELATION_FAIL_REFUSE,       //拒绝操作
        RELATION_FAIL_FRIENDLIST_FULL, //好友名单满了
        RELATION_FAIL_BLOCKLIST_FULL, //黑名单满了
        RELATION_FAIL_ERRORNAME,  //名字错误
        RELATION_FAIL_NO_USER,  //没有这个用户
        RELATION_FAIL_WAIT_TO_ANSWER,//
        RELATION_FAIL_CLOSE_INVITE,//关闭邀请
        RELATION_FAIL_NOSELF,	//不能添加自己
        RELATION_FAIL_ENEMYLIST_FULL,	//仇人名单满了
        RELATION_FAIL_ALLREADY_ENEMY,	//已经在仇人了
        RELATION_FAIL_SERVERERROR,		//系统错误
        RELATION_FAIL_NOT_FRIEND,//没有这好友
        RELATION_FAIL_NOT_ENEMY,//没有这敌人
        RELATION_FAIL_LOCATION_QUERY, //探查令不够
        RELATION_FAIL_ENEMY_CANT_BE_FRIEND,//仇人不是
        RELATION_FAIL_NEED_VERIFY,		//需要验证
        RELATION_FAIL_REFUSEALL,		//设置了拒绝加好友
    };
    export enum emListType {
        LIST_FRIEND,//好友列表
        LIST_BLOCK,	//黑名单
        LIST_ENEMY,	//仇人列表
        LIST_ALL,	//所有列表
    };


    // *************************************排行榜***************************************
    export enum emRankType {
        Cret_Level_Rank,					//角色等级排行榜
        Cret_Warrior_Level_Rank,			//战士等级排行榜
        Cret_Mage_Level_Rank,				//法师等级排行榜
        Cret_Monk_Level_Rank,				//道士等级排行榜
        Cret_EquipScore_Rank,				//总战斗力排行榜
        Cret_Warrior_EquipScore_Rank,		//战士战斗力排行榜
        Cret_Mage_EquipScore_Rank,			//法师战斗力排行榜
        Cret_Monk_EquipScore_Rank,			//道士战斗力排行榜
        Cret_Hero_Score_Rank,				//英雄战斗力排行榜---(由三英雄职业统计而出)
        Cret_Hero_Warrior_Score_Rank,		//英雄战士战斗力排行榜
        Cret_Hero_Mage_Score_Rank,			//英雄法师战斗力排行榜
        Cret_Hero_Monk_Score_Rank,			//英雄道士战斗力排行榜
        Cret_Wing_Level_Rank,				//翅膀排行榜
        Cret_PrestigeScore_Rank,			//威名排行榜
        Cret_RmbHistory_Rank,			    //充值排行榜
        Cret_LvAddZSLv_Rank,				//等级转生等级综合排行榜
        Cret_HeroLvAddZSLv_Rank,			//英雄等级转生等级综合排行榜
        Cret_LongHunLv_Rank,				//龙魂排行榜
        Cret_GuanZhiLv_Rank,				//官职排行榜
        Cret_HunShiLv_Rank,					//魂石排行榜
        Cret_Fame_Rank,						//声望排行榜
        Cret_HeQuJiFen_Rank,                //合区积分排行榜
        Cret_Consume_Rank,                  //精彩活动消费排行榜
        Cret_Recharge_Rank,                 //精彩活动充值排行榜

        Cret_ChuMoEndJiFen_Rank,             //除魔通关积分
        Cret_Medal_Rank,                     //勋章总排行榜
        Cret_Intensify_Rank,                 //强化总排行榜

        Cret_XinFuConsume_Rank,              //精彩活动消费排行榜
        Cret_Chop_Rank,						 //精彩活动官印总排行榜
        Cret_DragonSoul_Rank,				 //精彩活动龙魂总排行榜
        Cret_Medal2_Rank,					 //精彩活动勋章总排行榜
        Cret_WingNum_Rank,					 //精彩活动光翼总排行榜
        Cret_Relive_Rank,					 //精彩活动转生总排行榜
        /*Cret_FightConsume_Rank,			 //新服消费夺宝排行榜*/

        Rank_Max_Count,						//最大排行类型

    };
    // ************************************邮件***************************************
    export enum emMailErrorCode {
        MAIL_SUCCESS,            //成功
        MAIL_FAIL_NORECEIVER,    //没找到接收者
        MAIL_FAIL_IDERROR,       //邮件编号错误
        MAIL_FAIL_NOT_VALIDCHAR, //非法字符
        MAIL_FAIL_SERVER_ERROR,  //内部错误
        MAIL_FAIL_FULLBAG,       //包裹已满 无法收取
        MAIL_FAIL_FULLGOLD,      //金币已满 无法收取
        MAIL_FAIL_NOTENOUTHGOLD, //发送的金币不足
        MAIL_FAIL_NOTENOUTHITEM, //发送的物品不足
        MAIL_FAIL_ITEMBINDING,   //绑定的物品
        MAIL_FAIL_NOTITLE,       //空标题
        MAIL_FAIL_NOTEXT,        //空内容
        MAIL_FAIL_GOLD,          //费用不足
        MAIL_FAIL_TOSELF,        //发给自己的
        MAIL_FAIL_SERVER_FULL,   //
        MAIL_FAIL_NOMAIL,        //没有任何邮件
        MAIL_FAIL_INBLOCK,
        MAIL_FAIL_COUNTRY,		//国家不同
        MAIL_FAIL_PET_BOX_FULL, //
        MAIL_FAIL_FULLZHUGOLD,	//身上铸比已满
        MAIL_FAIL_ITEMERROR,	//物品出错
        MAIL_FAIL_PAIDGOLD,		//付费金钱错误
        MAIL_FAIL_RETURNED,		//已经被退过
    };

    /******************************************商店************************************* */
    /**
     * 商店类型枚举
     */
    export enum ShopType {
        SHOP_TYPE_TUIJIAN = 1,//热销商店
        SHOP_TYPE_YUANBAOLOCK = 2,//礼券商店
        SHOP_TYPE_SKILL = 3,//技能商店
        SHOP_TYPE_HONOR = 4,//荣誉商店
        SHOP_TYPE_BAG_HOT = 5,//背包随机商店
        SHOP_TYPE_GUILD = 6,//行会商店
        SHOP_TYPE_GUILD_HOT = 7,//帮会随机商店
        SHOP_TYPE_LIMITED = 8,//限购商店
        SHOP_TYPE_MYSTERY = 9,//神秘商店

    }
    /**
     * 商店子类型枚举
     */
    export enum ShopSubType {
        SHOP_SUBTYPE_NONE = 0,// 默认无类型
    }
    /**
     * 货币类型枚举
     */
    export enum CoinType {
        COIN_TYPE_YUANBAO = 1,     //元宝
        COIN_TYPE_YUANBAOLOCK = 2, //礼券
        COIN_TYPE_GOLD = 3,        //金币
        COIN_TYPE_HONOR = 4,       //荣誉
        COIN_TYPE_GUILDSORCE = 5,  //帮贡
        COIN_TYPE_PLAYER_EXP = 20001,//阅历-玩家经验
        COIN_TYPE_HERO_EXP = 20024,//默契-英雄经验
    }

    /**
     * 商店购买界面类型
     */
    export enum ShopBuyPanelType {
        SHOP_BUY_HOT_PANEL = 0,// 热卖商店购买界面,单次购买一组
        SHOP_BUY_GUILD_PANEL = 1,// 公会商店购买界面
        SHOP_BUY_OTHER = 2,// 公会商店购买界面
    }

    // *************************************任务相关******************************************

    /**
     * 任务状态枚举
     */
    export enum QUESTSTATUS {//任务状态
        QUESTNO = -1,			//任务未接
        QUESTNEW = 0,			//新建任务
        QUESTDOING = 1,		//任务进行中
        QUESTCOMPLETED = 2,	//完成任务(条件达成)
        QUESTFINISH = 3,		//结束任务
        QUESTFAIL = 4,		//任务失败
        QUESTMALLCOMPLETED = 5,//完成任务(通过商城道具达成)
        QUESTGOTOCLONEMAP = 100,	//任务重新进入副本
    };

    /**
     * NPC状态枚举
     */
    export enum NPCSTATUS {     // NPC状态	相差10级以上这些状态全显示NOTASKALL
        ONETASKNORECEIV = 0,	//（1）	NPC身上有可领取的只能完成一次的任务但该玩家未领取该任务时：显示１
        ONETASKCOMPLETE,	    //（2）	NPC身上有可交的一次性任务且该玩家达成任务未交任务时：显示２
        ONETASKNOT,			    //（3）	NPC身上有可交的任务且该玩家未达成任务时：显示３
        REPEATTASKNORECEIV,	    //（4）	NPC身上有可领取的可重复完成的任务但该玩家未领取该任务时：显示4
        REPEATTASKCOMPLETE,	    //（5）	NPC身上有可交的重复性任务且该玩家达成任务未交任务时：显示5
        NOTASKALL,			    //（6）	NPC身上没有任务或玩家不具备领取该任务的条件时：不显示
    };
    /**
     * 任务类型枚举
     */
    export enum TaskType {
        SYSTEM = 0,	         // 主线任务
        EVERYDAY = 1,	     // 每日任务
        LIFEEXP = 2,	     // 历练/支线
        CLAN = 3,		     // 氏族任务 
        JUQINGEVENT = 4,       // 剧情事件
        RUNRING = 5,	     // 跑环/环式任务 (除魔任務)
        LOOP = 6,		     // 循环 不要
        RUNWEEKRING = 7,	 // 每周跑环 不要
        QUESTTYPE_RANDOM = 8,// 随机任务 不要
        WANTED = 9,			 // 悬赏任务
        WST = 10,			 // 万事通 不要
        JINYIN = 11,		 // 精英任務 
        ACHIEVEMENT = 50,	 // 成就任务
        ONLINEREWARD = 51,   // 在线奖励任务
    };
    /**
     * 任务子类型枚举
     */
    export enum TaskSubType {   //事件类型
        NEEDLV = 0,	            //函数样式needlv_%d 需要的等级数（升级）
        NPCKILL = 1,	        //函数样式npckill_%d npc的id 杀死 怪物
        NPCVISIT = 2,	        //函数样式npcvisit_%d npc的id 拜访NPC
        ITEMUSE = 3,	        //函数样式itemuse_%d 物品id（使用物品）
        ITEMGET = 4,	        //函数样式itemget_%d 物品id 标记player questmark（获取物品）
        ITEMDROP = 5,	        //函数样式itemdrop_%d 物品id（丢弃物品）
        MAPAREA = 6,	        //函数样式maparea_%d_%d_%d_%d 地图ID 坐标X 坐标Y 范围Z  标记player mapcheck
        // CONTONLINETIME = 7,     //单次在线时间（不用）
        // CONTONLINEDAY = 8,	    //连续登陆天数（不用）
        // FIGHTNUM = 9,	        //函数样式fightnum_%d_%d 战斗地图ID 要战斗的次数（不用）
        LOGIN = 10,	            //函数样式login_%d 登陆次数
        OFFLINE = 11,	        //函数样式offline_%d 离线次数
        DIE = 12,		        //函数样式die_%d 死亡次数
        // FIGHTING = 13,          //函数样式fighting_%d npcid回合数 直接进入战斗 可能也需要标记player questmark（不用）
        // GRASPPET = 14,          //函数样式grasppet_%d 宠物id（不用）
        // ESCORT = 15,	        //函数样式escort_%d npcid（不用）
        // PANEL = 16,         	//函数样式panel_%d 面板id 枚举其id（不用）
        // MAPCELL = 17,	        //函数样式mapcell_%d_%d_%d_%d 地图ID 坐标X 坐标Y 范围Z（不用）
        // FIGHTMAP = 18,          //函数样式fightmap_%d 地图ID（不用）
        // SETFIGHT = 19,          //函数样式setfight_%d 怪物AIID（不用）
        // FIGHTSTART = 20,        //函数样式fightstart_%d 玩家临时ID（不用）
        // MAPNUM = 21,	        //函数样式mapnum_%d 地图ID（不用）
        EQUIPITEM = 22,         //函数样式equipitem_%d 装备物品事件，物品ID
        FIGHTMAPFINISH = 24,    //函数样式fightmapfinish_%d 战场结束的事件
        CHANGESVROFFLINE = 25,  //函数样式changesvroffline_%d 切换服务器的事件
        CLIENTFILISH = 26,	    //客户端触发完成
        // ANSWER = 27,		    // 答题任务
        KILLPLAYER = 28,	    //杀人
        ADDFRIEND = 29,	        //加好友
        INGROUP = 30,		    //组队

        GANGQI_UP = 31,	        //罡气升级任务
        NEIGONG_UP = 32,	        //内功经络升级
        WUXING_UP = 33,		    //悟性升级任务
        GENGU_UP = 34,	        //根骨升级任务
        SHANYUAN_UP = 35,	//善缘升级任务
        BILI_UP = 36,	    //臂力升级任务
        SHENFA_UP = 37,	    //身法升级任务
        SHENGWANG_UP = 38,		    //声望升级任务

        DRESS_WUXUE = 39,		    //装备武学
        QIANGHUAUP = 40,	    //强化升级任务	
        EVERYDAYFINISH = 41,	//完成一环赏金任务
        LOOPFINISH = 42,		//完成一环环式任务
        TESHU_QUEST = 43,       //特殊任务特殊处理
        NEEDHEROLV = 44,		//英雄升级
        // BUYINGIFTSMALL = 45,	//礼券商城购买（不用）
        SKILLEXP = 46,          //技能经验
        FINISH_CHUMOFUBEN = 47,   //通关除魔副本
    };

    /**
     * 大地图ID枚举
     */
    export enum MAP_BIG_MAP_ID {
        MAP_FENG_DU = 5001,// 酆都
        MAP_FU_ZHOU_CHENG = 5002,// 福州城
        MAP_HUA_SHAN_PAI = 5003,// 华山派

    }


    export enum ActiveityType {




    }

    /******************************************************战斗模块********************* */

    /**
     * 攻击结果返回
     */
    export enum BattleResult {
        SUCCESS = 0,//成功
        CRET_MAGICFAIL_CASTNOTSUCCESS = 1,//施放不成功
        CRET_MAGICFAIL_MAGICLACKING = 2,  //魔法不足
        CRET_MAGICFAIL_NOTINSCENE = 3,	  //不在场景中

        CRET_MAGICFAIL_BOUND = 4,		 //自己被束缚
        CRET_MAGICFAIL_PETRIFACTION = 5, //自己被石化
        CRET_MAGICFAIL_IMPRISONMENT = 6, //自己被禁锢
        CRET_MAGICFAIL_SLEEP = 7,		 //自己被昏睡
        CRET_MAGICFAIL_PARALYSIS = 8,	 //自己被麻痹
        CRET_MAGICFAIL_FROZEN = 9,		 //自己被冰冻
        CRET_MAGICFAIL_DEAD = 10,		 //自己死亡

        CRET_MAGICFAIL_TARGET = 11,		 //目标无效
        CRET_MAGICFAIL_LACKITEM = 12,	 //缺少物品
        CRET_MAGICFAIL_DELETEITEMFAIL = 13,	//删除物品失败

        CRET_MAGICFAIL_NOCOOLING = 14,	 //没有冷却
        CRET_MAGICFAIL_NORANGE = 15,	 //超出范围

        CRET_MAGICFAIL_NEEDLIFENUM = 16,	//没有足够的寿命值
    };

    /**
     * 怪物受击特效枚举
     */
    export enum FeatureStatus {
        STATE_Poisoning = 0x1,
        STATE_SpeedSlow = 0x2,
        STATE_Dizzy = 0x4,
        STATE_Petrifaction = 0x8,
        STATE_Mofadun = 0x10,
        STATE_Fire = 0x20,		//陨石燃烧的效果
        STATE_Yinshen = 0x40,
        STATE_DaoTui = 0x80,	//倒退
        STATE_Zhonghun = 0x100,
        STATE_Deter = 0x200,
        STATE_Thorns = 0x400,
        STATE_SpeedUp = 0x800,
        STATE_Godbless = 0x1000,
        STATE_Back = 0x2000,
        STATE_Halo = 0x4000,
        STATE_SupserMoster = 0x8000,	//精英怪脚底下有个光圈
        STATE_BAN = 0x10000,
        STATE_YUANSHEN1 = 0x20000,
        STATE_YUANSHEN2 = 0x40000,
        STATE_YUANSHEN3 = 0x80000,
        STATE_YUANSHEN4 = 0x100000,
        STATE_YUANSHEN5 = 0x200000,
        STATE_HANBINGPINGZHANG = 0x400000,
    };


    export enum emMagicStateType {
        MAGICSTATE_NULL,				//没有状态
        MAGICSTATE_HP,					// 血相关,包括蓝
        MAGICSTATE_MP,					// 蓝相关
        MAGICSTATE_RELIVE,				//复活
        MAGICSTATE_SPEEDSLOW,			//减速
        MAGICSTATE_DIZZY,				// 晕眩
        MAGICSTATE_PETRIFACTION,		// 石化
        MAGICSTATE_ABI,					//属性相关
        MAGICSTATE_LIEHUO,				// 烈火
        MAGICSTATE_XINYUE,				//新月剑法
        MAGICSTATE_LINGKONGZHAN,		//凌空斩
        MAGICSTATE_LIANYUE,				//莲月剑法
        MAGICSTATE_MOFADUN,				// 魔法盾
        MAGICSTATE_SHENGYAN,			//圣言术
        MAGICSTATE_YINSHEN,				//隐身
        MAGICSTATE_CISHA,				//刺杀
        MAGICSTATE_COLLISION,			//冲撞
        MAGICSTATE_REVERSE,				//倒退
        MAGICSTATE_POISONING,			// 施毒类，百分比当前掉血，每次计算伤害
        MAGICSTATE_KAITIAN,				//开天
        MAGICSTATE_NOHPDRUG,			// 不准吃红药
        MAGICSTATE_COFHP2MP,			//百分比血蓝相关(人物最终属性)
        MAGICSTATE_ABI_PERCENT,			//(属性百分比)
        MAGICSTATE_BAN,					// 禁
        MAGICSTATE_PAUSE,				//停顿
        MAGICSTATE_CANTRUN,				//不能跑
        MAGICSTATE_MUTITIMESEXP,		// 多倍经验
        MAGICSTATE_BAFANZHAN,			//八方斩
        MAGICSTATE_TREATMENT,			// 治疗术
        MAGICSTATE_TIANSHANXUELIAN,		//天山雪莲
        MAGICSTATE_WINE,				//酒
        MAGICSTATE_YUNSHI,				//陨石
        MAGICSTATE_ABI_TITLE,			//属性称号
        MAGICSTATE_SEEPUP,				//加速
        MAGICSTATE_DAMAGE,				// 减伤
        MAGICSTATE_FEEDBACK,			// 反弹
        MAGICSTATE_INVINCIBLE,			// 无敌
        MAGICSTATE_MOOR,				//沼泽
        MAGICSTATE_PERCENT_POISONING,	// 毒（百分比真实伤害）
        MAGICSTATE_SUCKBLOOD,			//生命恢复
        MAGICSTATE_PERCENT_POISONING_INC,	//毒（百分比真实伤害,百分比增伤）
        MAGICSTATE_MAXCOUNT,			//最大状态值
    };


    //技能攻击类型枚举
    export enum emAttackType {
        NEARLY_ATTACK,		//近身
        FAR_ATTACK,			//远程
        SELF_ATTACK,		//自身
    };

    /**
     * 技能类型
     */
    export enum enSkillType {
        ZhaoShi = 1,
        ZhaoJia = 2,
        ShenFa = 3,
        NeiGong = 4,
        combatSkill = 5,
        HeroSkill = 6,
    }

    /**
     * 技能五行属性
     */
    export enum emSkillWuXingProp {
        jin = 1,
        mu,
        shui,
        huo,
        tu
    }

    /**
     * 技能槽位枚举
     */
    export enum emSkillShotButtonType {
        WaiGong_1 = 1,// 外功
        WaiGong_2 = 2,
        WaiGong_3 = 3,
        WaiGong_4 = 4,
        ZhaoJia_1 = 5,// 招架
        ShenFa_1 = 6,// 身法
        NeiGong_1 = 7,// 内功
        NeiGong_2 = 8,
        NeiGong_3 = 9,
        NeiGong_4 = 10,
    }


    //图鉴类型枚举
    export enum emSaveKeyValueType {
        SAVE_KEY_VALUE_TYPE_TUJIAN_CRET,	//角色图鉴
        SAVE_KEY_VALUE_TYPE_TUJIAN_MAP,		//地图图鉴
        SAVE_KEY_VALUE_TYPE_TUJIAN_EVENT,	//事件图鉴
        SAVE_KEY_VALUE_TYPE_TUJIAN_ITEM,	//物品图鉴
        SAVE_KEY_VALUE_TYPE_MAX,
    };
    /**
     * 房间类型，决定ui_scene类型
     */
    export enum emRoomType {
        singleFuBen = 100, // 个人副本
        chuMoFuBen = 101,// 除魔副本
        publicFuBen = 200, // 公共副本
        zuDuiFuBen = 201,// 组队副本
        publicYeWai = 300, // 普通公共野外
        publicZhuCheng = 301,// 主城

    }


    /**
     * 活动枚举
     */
    export enum activityType {
        EverydayBuyPanel = 1,   // 每日必买
        CZJJ_OpenPlane = 2,   //超值理财
        ChaoZhiLC_Open = 3,   //成长基金
        ConsumeOpen = 4,   //消费排行
        LimitTimePanicBuyPanel = 5,   //限时抢购
        LimitTimeGiftBagPanel = 100,   //限时礼包  6
        RechargeOpen = 7,   //充值排行
        ShenMi_Open = 9,   //神秘商店
        RechargeGiftPanel = 10,   //累计充值
        ComposeEquipPanel = 12,   //装备箱合成
        ContinueRechargePanel = 13,   //连续充值
        ExchangeGiftPanel = 14,   //兑换豪礼
        FLZP_Plane = 15,   //福利转盘
        MeiRiChongZhiOpen = 16,   //每日充值
        MRLQ_Plane = 17,   //每日领取
        ConsumeGiftPanel = 18,   //消费豪礼


        chaozhiopen = 202,   // 超值礼包   29
        DBCZ_Plane = 30,   //单笔充值
        LuckyDrawOpen = 201,   //幸运抽奖 31
        ExchangePointPanel = 32,   //积分兑换
        MeiRiTeHuiPanel = 33,   //每日特惠
        FuDaiOpen = 34,   //福袋抽奖、档次
        QuanMingLiBaoOpen = 35,   //全民礼包
        MZJJ_OpenPlane = 36,   //每周基金
        ZXCJ_Plane = 38,   //在线抽奖、转盘
        OneDayRechargePanel = 39,   //单日充值
        MeiRiShouChongOpen = 41,   //每日首充
        XFYLPanel = 37,   //消费有礼


        ResourceGiftPanel = 24,   //官印、资源线好礼
        ResourceGiftIsShow2 = 25,   //龙魂豪礼
        ResourceGiftIsShow3 = 26,   //勋章豪礼
        ResourceGiftIsShow4 = 27,   //光翼豪礼
        ResourceGiftIsShow5 = 28,   //转生豪礼


        NationalResourcePanel = 19,   //全民官印
        NationalResourceIsShow2 = 20,   //全民龙魂
        NationalResourceIsShow3 = 21,   //全民勋章
        NationalResourceIsShow4 = 22,   //全民光翼
        NationalResourceIsShow5 = 23,   //全民转生



        TeHuiIndex = 203,   //  特惠礼包
        WorthGiftBagPanel = 204,   //  特选礼包 
        FirstChargeOpen = 205,   //  首充

        leijidenglu_minbandakai = 206,   // 累计登录
        KaiFuJingJiOpen = 207,   //  开服竞技
        QuanMingBoss = 208,   // 全民BOSS
        LongChengClientOpen = 209,   // 新服活动龙城争霸
        JingCaiClientOpen = 301,   // 全民竞猜
        ExpRefineOpen = 302,   // 经验炼制

    }
}