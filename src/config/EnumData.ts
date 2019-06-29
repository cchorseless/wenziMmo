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
     * 职业
     */
    export enum JOB_TYPE {
        JOB_WARRIOR = 1,
        JOB_MAGE = 2,
        JOB_MONK = 3,
    }

    /**
     * 性别
     */
    export enum SEX_TYPE {
        SEX_MAN = 1,
        SEX_WOMEN = 2
    }

    /**
     * 装备部位
     */
    export enum EQUIP_POS_TYPE {
        EQUIP_HEADDRESS,			//帽子
        EQUIP_NECKLACE,				//项链
        EQUIP_CLOTHES,				//衣服
        EQUIP_WEAPONS,				//武器
        EQUIP_BRACELET_LEFT,		//左手镯
        EQUIP_BRACELET_RIGHT,		//右手镯
        EQUIP_RING_LEFT,			//左戒指
        EQUIP_RING_RIGHT,			//右戒指
        EQUIP_SHOES,				//鞋
        EQUIP_BELT = 9,				//腰带
        EQUIP_ALL,
    }

    /**
     * 背包类型
     */
    export enum PACKAGE_TYPE {
        ITEMCELLTYPE_NONE = 0,				// 不是格子，用于丢弃或捡到物品
        ITEMCELLTYPE_EQUIP = 1,				// 装备
        ITEMCELLTYPE_STORE = 2,				// 仓库
        ITEMCELLTYPE_PACKAGE = 3,			// 包裹的格子
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

}