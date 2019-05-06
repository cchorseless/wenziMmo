/**
 * 资源数据管理，注册各个界面的资源组
 */
module ResData {
    /**
     * 游戏界面图片资源
     */
    export class PanelRes {
        // 开始游戏界面
        public static StartLoading = [{ url: "res/atlas/image/loading.atlas", type: Laya.Loader.ATLAS },];
        // GM界面
        public static GM = null;
        // 登陆界面
        public static Login = null;
        // 服务器列表界面
        public static ServerList = null;
        // 通用素材
        public static Common = [{ url: "res/atlas/image/common/default.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/common.atlas", type: Laya.Loader.ATLAS },
        { url: "fonts/ygyx.ttf", type: Laya.Loader.TTF },
        { url: "fonts/mini.ttf", type: Laya.Loader.TTF }];
        // 主界面
        public static Main = [{ url: "res/atlas/image/main.atlas", type: Laya.Loader.ATLAS }, { url: "res/atlas/image/bag.atlas", type: Laya.Loader.ATLAS }];
        // 城市界面
        public static City = null;
        // 城堡内界面
        public static Home = null;
        // 副本界面
        public static FuBen = [{ url: "res/atlas/image/fuben.atlas", type: Laya.Loader.ATLAS }]
        // 江湖界面
        public static JiangHu = [{ url: "res/atlas/image/jianghu.atlas", type: Laya.Loader.ATLAS }, { url: "res/atlas/image/fuben.atlas", type: Laya.Loader.ATLAS }]
        // 战斗界面
        public static Battle = [{ url: "res/atlas/image/battle.atlas", type: Laya.Loader.ATLAS },];
        // 阵容界面
        public static ZhenRong = [{ url: "res/atlas/image/bag.atlas", type: Laya.Loader.ATLAS }, { url: "res/atlas/image/common.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/main.atlas", type: Laya.Loader.ATLAS }
        ]
        // 卡牌详情界面
        public static CardInfo = null;
        // 背包界面
        public static Bag = [{ url: "res/atlas/image/bag.atlas", type: Laya.Loader.ATLAS },];
        // 商店界面
        public static Shop = null;
        // 制造界面
        public static Make = [{ url: "res/atlas/image/bag.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/make.atlas", type: Laya.Loader.ATLAS },];
        // 菜单界面
        public static Menu = null;
        // 测试界面
        public static Test = [{ url: "res/atlas/mc.atlas", type: Laya.Loader.ATLAS },];
        /**选择上阵伙伴界面 */
        public static CardChoose = [{ url: "res/atlas/image/bag.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/main.atlas", type: Laya.Loader.ATLAS }
        ];

        public static CardTrain = [{ url: "res/atlas/image/common/default.atlas", type: Laya.Loader.ATLAS }, { url: "res/atlas/image/bag.atlas", type: Laya.Loader.ATLAS }];

        public static EquipMentChoose = [{ url: "res/atlas/image/bag.atlas", type: Laya.Loader.ATLAS }];

        public static EquipMentInfo = [{ url: "res/atlas/image/common/default.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/bag.atlas", type: Laya.Loader.ATLAS }];

        public static KongFuChoose = [{ url: "res/atlas/image/bag.atlas", type: Laya.Loader.ATLAS }];

        public static KongFuInfo = [{ url: "res/atlas/image/common/default.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/bag.atlas", type: Laya.Loader.ATLAS }];

        public static ZhenRongItem0 = [{ url: "res/atlas/image/main.atlas", type: Laya.Loader.ATLAS }];

        public static ZhenRongItem1 = null;

        public static ZhenRongItem2 = null;

        public static CardChooseItem = [{ url: "res/atlas/image/main.atlas", type: Laya.Loader.ATLAS }, { url: "res/atlas/image/bag.atlas", type: Laya.Loader.ATLAS }];

        public static BagPanelV2 = [{ url: "res/atlas/image/common/default.atlas", type: Laya.Loader.ATLAS }, { url: "res/atlas/image/bag.atlas", type: Laya.Loader.ATLAS }];

        public static CardBag = [{ url: "res/atlas/image/main.atlas", type: Laya.Loader.ATLAS }, { url: "res/atlas/image/bag.atlas", type: Laya.Loader.ATLAS }];

        public static ItemBag = [{ url: "res/atlas/image/bag.atlas", type: Laya.Loader.ATLAS }, { url: "res/atlas/image/make.atlas", type: Laya.Loader.ATLAS }];

        public static EquipmentBag = [{ url: "res/atlas/image/bag.atlas", type: Laya.Loader.ATLAS }];

        public static KongfuBag = [{ url: "res/atlas/image/bag.atlas", type: Laya.Loader.ATLAS }];

        public static EquipmentStrengthen = [{ url: "res/atlas/image/bag.atlas", type: Laya.Loader.ATLAS },];

        public static EquipmentMaterialsChoose = null;

        public static OneClickStrengthenWindow = [{ url: "res/atlas/image/bag.atlas", type: Laya.Loader.ATLAS },];

        public static CardMaterialsChoose = null;

        public static EquipmentXilianWindow = null;

        public static KongFuStrengthenPanel = [{ url: "res/atlas/image/bag.atlas", type: Laya.Loader.ATLAS }];;

        public static KongFuStarUpMaterialsChoosePanel = [{ url: "res/atlas/image/bag.atlas", type: Laya.Loader.ATLAS }]

        public static KongFuStarUpWindow = null;
        public static EquipStarUpMaterialsChoosePanel = [{ url: "res/atlas/image/bag.atlas", type: Laya.Loader.ATLAS }]

        public static EquipStarUpWindow = null;

        public static CollectionPanel = [{ url: "res/atlas/image/bag.atlas", type: Laya.Loader.ATLAS }, { url: "res/atlas/image/make.atlas", type: Laya.Loader.ATLAS }]

        public static MailPanel = [{ url: "res/atlas/image/mail.atlas", type: Laya.Loader.ATLAS }];

        public static ChatPanel = null;

        public static FriendsPanel = [{ url: "res/atlas/image/friend.atlas", type: Laya.Loader.ATLAS }];

        public static PartnerComposePanel = [{ url: "res/atlas/image/main.atlas", type: Laya.Loader.ATLAS }]

        public static SchoolSelectPanel = [{ url: "res/atlas/image/school.atlas", type: Laya.Loader.ATLAS }]

        public static SkillDevelopPanel = null;

        public static SchoolMainPanel = [{ url: "res/atlas/image/school.atlas", type: Laya.Loader.ATLAS }];

        public static SchoolMembersPanel = null;

        public static GashaponPanel = null;

        public static AreaSelectPanel = [{ url: "res/atlas/image/fuben.atlas", type: Laya.Loader.ATLAS }];

        public static StageSelectPanel = [{ url: "res/atlas/image/fuben.atlas", type: Laya.Loader.ATLAS }];

        public static VisitPanel = [{ url: "res/atlas/image/common/default.atlas", type: Laya.Loader.ATLAS }];

        public static SchoolShopPanel = [{ url: "res/atlas/image/school.atlas", type: Laya.Loader.ATLAS }];

    };
    /**
     * 游戏音效资源
     */
    export class SoundRes {
        // 背景音效
        public static bg = 'sound/bg.mp3';
        // 爆炸音效
        public static boom = 'sound/boom.mp3';

    }
    /**
     * 游戏配置表资源
     */
    export class JsonRes {
        // 策划配置表
        public static AllClientData = 'json/AllClientData.json';
    }
}
