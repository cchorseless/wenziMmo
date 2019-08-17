/**
 * 枚举数据
 */
module EnumData {
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
     * Handle行为类型
     */
    export enum HANDLE_TYPE {
        ADD,//增加
        REMOVE,//去除
    }

    /**
     * 确认界面场景模式
     */
    export enum SureCanelModel {
        DELET_ITEM = 0,//背包内删除道具
        JYH_BUY_ITEM = 1,//交易行购买物品
        BP_BUY_CREATEITEM = 2,//帮派购买物品

    }

    /**
     * 道具信息界面模式
     */
    export enum ItemInfoModel {
        SHOW_NONE = 0,//不显示
        SHOW_IN_BAG = 1,//背包中显示
        SHOW_IN_CANGKU = 2,//仓库中显示
        SHOW_IN_PLAYER = 3,//角色弟子身上中显示
        SHOW_IN_MAIL = 4,//邮件中显示
        SHOW_IN_SHOP = 5,//商店中显示

    }

    /**
     * 职业
     */
    export enum JOB_TYPE {
        JOB_WARRIOR = 1,// 战士
        JOB_MAGE = 2,// 法师
        JOB_MONK = 3,// 道士
    }

    /**
     * 性别
     */
    export enum SEX_TYPE {
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
        EQUIP_MEDAL,					//勋章
        EQUIP_DRAGONSOUL,				//龙魂
        EQUIP_BLOODJADE,				//血玉
        EQUIP_WING,						//光翼
        EQUIP_SHIELD,					//神盾
        EQUIP_OFFICIALSEAL = 63,		//官印

        EQUIP_HERO_DRAGONHEART,			//英雄共享装备-火龙之心
        EQUIP_HERO_WING,				//英雄共享装备-翅膀

        EQUIP_SHOULDER,					//肩
        EQUIP_KNEE,						//膝
        EQUIP_PENDANT,					//吊坠
        EQUIP_FACE = 69,				//脸
        EQUIP_MAX_COUNT,				//总数
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
        NP_GMCREATE = 2,			//GM生成
        NP_STRENGPROPERTY = 3,	//武器强化
        NP_QUESTREWARD = 4,		//任务奖励
        NP_SCRIPTCREATE = 5,      //脚本生成

        NP_QUENCHING_POS_ONE = 6,	//第一条淬炼
        NP_QUENCHING_POS_TWO = 7,	//第二条淬炼
        NP_QUENCHING_POS_THREE = 8,	//第三条淬炼

        NP_POS_0_1 = 10,		//
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
     * 属性类型
     */
    export enum emNonpareilType {
        NONPAREIL_TYPE_NULL,			        //没有极品
        NONPAREIL_TYPE_MaxHP,                   //最大血量
        NONPAREIL_TYPE_MaxMP,                   //最大蓝量
        NONPAREIL_TYPE_MaxAtk,                  //物理/魔法/道术攻击上限全部
        NONPAREIL_TYPE_MinAtk,                  //物理/魔法/道术攻击下限全部
        NONPAREIL_TYPE_MaxDC,                   //物理攻击上限值,攻击力上限，影响所有职业普通攻击和战士技能的最大伤害。
        NONPAREIL_TYPE_MinDC,                   //物理攻击下限值,攻击力下限，影响所有职业普通攻击和战士技能的最小伤害。
        NONPAREIL_TYPE_MaxMC,                   //自然魔法攻击上限值,魔法攻击上限，影响法师技能的最大伤害。
        NONPAREIL_TYPE_MinMC,                   //自然魔法攻击下限值,魔法攻击下限，影响法师技能的最小伤害。
        NONPAREIL_TYPE_MaxSC,                   //灵魂魔法攻击上限值,道士攻击上限，影响法师技能的最大伤害。
        NONPAREIL_TYPE_MinSC,                   //灵魂魔法攻击下限值,道术攻击下限，影响法师技能的最小伤害。
        NONPAREIL_TYPE_MaxAC,                   //物理防御上限值,防御上限，影响受到物理攻击时可以降低的伤害。
        NONPAREIL_TYPE_MinAC,                   //物理防御下限值,防御下限，影响受到物理攻击时可以降低的伤害。
        NONPAREIL_TYPE_MaxMAC,                  //全系法术防御上限值,魔法防御上限，影响受到魔法和道术攻击时可以降低的伤害。
        NONPAREIL_TYPE_MinMAC,                  //全系法术防御下限值,魔法防御下限，影响受到魔法和道术攻击时可以降低的伤害。
        NONPAREIL_TYPE_Hit,                     //命中(准确),在攻击时，增加命中目标的几率。当自身准确大于目标闪避时，目标不能闪避攻击
        NONPAREIL_TYPE_HitRate,                 //命中的概率，准确值折算成命中率
        NONPAREIL_TYPE_Juck,                    //闪避,影响受到所有攻击可以闪避的概率
        NONPAREIL_TYPE_JuckRate,                //闪避的概率，闪避值折算成闪避率
        NONPAREIL_TYPE_Crit,                    //暴击,在攻击时，增加暴击的几率。每160点暴击增加1%的暴击率
        NONPAREIL_TYPE_CritRate,                //暴击率, 暴击的概率
        NONPAREIL_TYPE_Toughness,               //韧性(暴抗),受攻击时，减少被暴击的几率。每160点韧性抵消对方1%的暴击率
        NONPAREIL_TYPE_ToughnessRate,           //(韧性率)抗暴率, 抵抗暴击的概率
        NONPAREIL_TYPE_AtkCrit,                 //暴击伤害,暴击时，暴伤越高，可以造成更多的额外伤害
        NONPAREIL_TYPE_Lucky,                   //幸运,幸运值越高，出现攻击（所有）上限的几率越大，为9时必出
        NONPAREIL_TYPE_RestoreHp,               //每次恢复血量，正负,每N秒自动回复生命//生命恢复是英雄抗怪能力最重要的指标。
        NONPAREIL_TYPE_RestoreMp,               //每次恢复蓝量，正负,每N秒自动回复法力
        NONPAREIL_TYPE_MoveSpeed,               //增加人物行走时的移动速度
        NONPAREIL_TYPE_PalsyRate,               //麻痹概率
        NONPAREIL_TYPE_PalsyResi,               //抗麻痹概率
        NONPAREIL_TYPE_UnionAtkRate,            //合击威力
        NONPAREIL_TYPE_IncAtkWarrior,           //对战士伤害增加
        NONPAREIL_TYPE_DecAtkWarrior,           //受战士伤害减少
        NONPAREIL_TYPE_IncAtkMage,              //对法师伤害增加
        NONPAREIL_TYPE_DecAtkMage,              //受法师伤害减少
        NONPAREIL_TYPE_IncAtkMonk,              //对道士伤害增加
        NONPAREIL_TYPE_DecAtkMonk,              //受道士伤害减少
        NONPAREIL_TYPE_IncAtkMonster,           //对怪物伤害增加
        NONPAREIL_TYPE_DecAtkMonster,           //受怪物伤害减少
        NONPAREIL_TYPE_IncAtkBoss,              //对BOSS伤害增加
        NONPAREIL_TYPE_DecAtkBoss,              //受BOSS伤害减少
        NONPAREIL_TYPE_IncAtkHero,              //增加对英雄伤害
        NONPAREIL_TYPE_DecAtkHero,              //减少受英雄伤害
        NONPAREIL_TYPE_Energy,                  //内功值(能量)，护盾能量最大值
        NONPAREIL_TYPE_RestoreEnergy,           //恢复内功值
        NONPAREIL_TYPE_EnergyResi,              //内功抵消伤害比例
        NONPAREIL_TYPE_IncDamage,               //增伤,提高攻击时可以造成的伤害（百分比）
        NONPAREIL_TYPE_DecDamage,               //减伤,降低受到的所有伤害（百分比）
        NONPAREIL_TYPE_IncBossCrit,				//增加对BOSS的暴击
        NONPAREIL_TYPE_IncBossAtkCrit,			//增加对BOSS的暴伤
        NONPAREIL_TYPE_DecUnionAtkDamage,		//受合击伤害减少
        NONPAREIL_TYPE_DecAtkCritDamage,		//受暴击伤害减少
        NONPAREIL_TYPE_RestoreAnger,			//怒气恢复率
        NONPAREIL_TYPE_UAToMonster,				//合击对怪增伤率
        NONPAREIL_TYPE_UAToPlayer,				//合击对人增伤率

        NONPAREIL_TYPE_MAXCOUNT,				//最大
    };

    /**
     * 游戏对象类型
     */
    export enum CRET_TYPE {
        CRET_NONE = 0,
        CRET_PLAYER = 1,
        CRET_NPC = 2,
        CRET_MONSTER = 3,
        CRET_PET,
        CRET_COPYHUMAN,
        CRET_HERO,
        CRET_ALL,
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
        _GUILDMEMBER_POWERLVL_NULL,				//帮会成员
        _GUILDMEMBER_POWERLVL_ELDERS,			//长老
        _GUILDMEMBER_POWERLVL_FITMASTER,		//副帮主
        _GUILDMEMBER_POWERLVL_MASTER,			//帮主
        _GUILDMEMBER_POWERLVL_ELITISM,			//精英
        _GUILDMEMBER_POWERLVL_ADMIRAL,			//大将
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


    // *************************************排行榜***************************************
    enum emRankType {
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


        Cret_ChuMoCeng1_Rank,               //除魔层排行榜
        Cret_ChuMoCeng2_Rank,               //除魔层排行榜
        Cret_ChuMoCeng3_Rank,               //除魔层排行榜
        Cret_ChuMoCeng4_Rank,               //除魔层排行榜
        Cret_ChuMoCeng5_Rank,               //除魔层排行榜
        Cret_ChuMoCeng6_Rank,               //除魔层排行榜
        Cret_ChuMoCeng7_Rank,               //除魔层排行榜
        Cret_ChuMoCeng8_Rank,               //除魔层排行榜
        Cret_ChuMoCeng9_Rank,               //除魔层排行榜
        Cret_ChuMoCeng10_Rank,               //除魔层排行榜
        Cret_ChuMoCeng11_Rank,               //除魔层排行榜
        Cret_ChuMoCeng12_Rank,               //除魔层排行榜
        Cret_ChuMoCeng13_Rank,               //除魔层排行榜
        Cret_ChuMoCeng14_Rank,               //除魔层排行榜
        Cret_ChuMoCeng15_Rank,               //除魔层排行榜
        Cret_ChuMoCeng16_Rank,               //除魔层排行榜
        Cret_ChuMoCeng17_Rank,               //除魔层排行榜
        Cret_ChuMoCeng18_Rank,               //除魔层排行榜
        Cret_ChuMoCeng19_Rank,               //除魔层排行榜
        Cret_ChuMoCeng20_Rank,               //除魔层排行榜
        Cret_ChuMoCeng21_Rank,               //除魔层排行榜
        Cret_ChuMoCeng22_Rank,               //除魔层排行榜
        Cret_ChuMoCeng23_Rank,               //除魔层排行榜
        Cret_ChuMoCeng24_Rank,               //除魔层排行榜
        Cret_ChuMoCeng25_Rank,               //除魔层排行榜
        Cret_ChuMoCeng26_Rank,               //除魔层排行榜
        Cret_ChuMoCeng27_Rank,               //除魔层排行榜
        Cret_ChuMoCeng28_Rank,               //除魔层排行榜
        Cret_ChuMoCeng29_Rank,               //除魔层排行榜
        Cret_ChuMoCeng30_Rank,               //除魔层排行榜
        Cret_ChuMoEndJiFen_Rank,             //除魔通关积分
        Cret_ChuMoTotalJiFen_Rank,           //除魔总排行榜
        Cret_Medal_Rank,                     //勋章总排行榜
        Cret_Intensify_Rank,                 //强化总排行榜

        Cret_XinFuConsume_Rank,              //精彩活动消费排行榜
        Cret_Chop_Rank,						 //精彩活动官印总排行榜
        Cret_DragonSoul_Rank,				 //精彩活动龙魂总排行榜
        Cret_Medal2_Rank,					 //精彩活动勋章总排行榜
        Cret_WingNum_Rank,					 //精彩活动光翼总排行榜
        Cret_Relive_Rank,					 //精彩活动转生总排行榜
        /*Cret_FightConsume_Rank,				 //新服消费夺宝排行榜*/

        Rank_Max_Count,						//最大排行类型

    };
    // ************************************邮件***************************************
    enum emMailErrorCode {
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


}