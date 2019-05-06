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
     * 上阵枚举类型
     */
    export enum JOINPARTY_TYPE {
        equip_1 = 0, //武器
        equip_2 = 1, //铠甲
        equip_3 = 2, //鞋子
        equip_4 = 3, //饰品
        KaPai = 4,   //卡牌
        GongFa = 5,  //功法
        gongFa_1 = 6, //单功技能
        gongFa_2 = 7, //群攻技能
        gongFa_3 = 8  //被动技能
    }

    /**
     * 卡牌的职业类型枚举
     */
    export enum CardJobType  {
        /**
         * 铁卫（肉盾），克制豪侠
         */
        TIEWEI = 0,
        /**
         * 豪侠（外功输出），克制方士
         */
        HAOXIA,
        /**
         * 气宗(内功输出)，克制铁卫
         */
        QIZONG,
        /**
         * 方士(辅助)，克制气宗
         */
        FANGSHI
    }
    export enum SchoolShopType {
        commonshop = 1,
        specialshop = 2
    }

}