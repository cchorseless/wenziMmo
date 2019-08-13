/**
 * 资源数据管理，注册各个界面的资源组
 */
module ResData {
    /**
     * 游戏界面图片资源
     */
    export class PanelRes {
        //****************************************通用素材******************************** */
        // 开始游戏界面
        public static StartLoading = [{ url: "image/mc/loading.atlas", type: Laya.Loader.ATLAS },];
        // GM界面
        public static GM = null;
        // 登陆界面
        public static Login = [{ url: "res/atlas/image/common/login.atlas", type: Laya.Loader.ATLAS },];
        // 服务器列表界面
        public static ServerList = null
        // 服务器公告界面
        public static ServerNotice = null;
        // 创建角色界面
        public static CreateAvatar = null;
        // 选择角色界面
        public static ChooseAvatar = null;
        // 通用素材
        public static Common = [{ url: "res/atlas/image/common/default.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/common/comp.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/common/number.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/common/npc.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/common/scene.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/common/daoju.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/common.atlas", type: Laya.Loader.ATLAS },
        { url: "music/bg.mp3", type: Laya.Loader.SOUND },
        ];
        // 主界面
        public static Main = [{ url: "res/atlas/image/main.atlas", type: Laya.Loader.ATLAS }];
        // 角色界面
        public static JueSe = [{ url: "res/atlas/image/juese.atlas", type: Laya.Loader.ATLAS }];
        // 弟子界面
        public static DiZi = null;
        // 时装界面
        public static Clothe = [{ url: "res/atlas/image/juese/clothe.atlas", type: Laya.Loader.ATLAS }];;
        // 养成界面
        public static YangCheng = [{ url: "res/atlas/image/yangCheng.atlas", type: Laya.Loader.ATLAS }];;
        // 背包界面
        public static BeiBao = [{ url: "res/atlas/image/bag.atlas", type: Laya.Loader.ATLAS }];;
        // 社交界面
        public static SheJiao = null;
        // 任务界面
        public static Task = [{ url: "res/atlas/image/task.atlas", type: Laya.Loader.ATLAS }];;
        // 公会界面
        public static GuildSelect = [{ url: "res/atlas/image/guild.atlas", type: Laya.Loader.ATLAS }];;
        // 帮派界面
        public static GuildTeam = [{ url: "res/atlas/image/guild.atlas", type: Laya.Loader.ATLAS }];;
        // 入帮设置界面
        public static GuildIntoCondition = [{ url: "res/atlas/image/guild.atlas", type: Laya.Loader.ATLAS }];;
         // 帮派福利界面
        public static GuildFuli = [{ url: "res/atlas/image/guild.atlas", type: Laya.Loader.ATLAS }];;
        // 帮派日志界面
        public static GuildRecord = [{ url: "res/atlas/image/guild.atlas", type: Laya.Loader.ATLAS }];;
         // 帮派支援界面
        public static GuildHelp = [{ url: "res/atlas/image/guild.atlas", type: Laya.Loader.ATLAS }];;
         // 入帮申请界面
        public static GuildApply = [{ url: "res/atlas/image/guild.atlas", type: Laya.Loader.ATLAS }];;
        // 副本界面
        public static FuBen = [{ url: "res/atlas/image/fuben.atlas", type: Laya.Loader.ATLAS }];;
        // 世界地图界面
        public static WorldMap = [{ url: "res/atlas/image/map.atlas", type: Laya.Loader.ATLAS }];;
        // 剧情对白界面
        public static JuQingTalk = [{ url: "res/atlas/image/juQing.atlas", type: Laya.Loader.ATLAS }];;
        // 菜单界面
        public static Menu = [{ url: "res/atlas/image/menu.atlas", type: Laya.Loader.ATLAS }];;
        // 江湖图鉴界面
        public static TuJianJiangHu = [{ url: "res/atlas/image/tujian.atlas", type: Laya.Loader.ATLAS }];;
         // 角色图鉴界面
        public static TuJianJuese = [{ url: "res/atlas/image/tujian.atlas", type: Laya.Loader.ATLAS }];;
         // 物品图鉴界面
        public static TuJianDaoju = [{ url: "res/atlas/image/tujian.atlas", type: Laya.Loader.ATLAS }];;
         // 怪物图鉴界面
        public static TuJianBoss = [{ url: "res/atlas/image/tujian.atlas", type: Laya.Loader.ATLAS }];;
    };
    /**
     * 游戏音效资源
     */
    export class SoundRes {
        // 背景音效
        public static bg = 'music/bg.mp3';
        // 爆炸音效
        // public static boom = 'sound/boom.mp3';

    }
    /**
     * 游戏配置表资源
     */
    export class JsonRes {
        // 策划配置表
        public static AllClientData = [
            // 道具表
            { url: 'json/mydb_item_base_tbl.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.mydb_item_base_tbl },
            // 英雄升级表
            { url: 'json/mydb_heroability_tbl.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.mydb_heroability_tbl },
            // 角色升级表
            { url: 'json/mydb_playerability_tbl.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.mydb_playerability_tbl },
            // 基础效果表
            { url: 'json/mydb_effect_base_tbl.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.mydb_effect_base_tbl },
        ];
    }

    /**
     * 游戏字体文件
     */
    export class TTFRes {
        public static AllTTFData = [
            { url: 'fonts/FZXK.ttf', type: Laya.Loader.TTF, TTFNAME: 'FZXK' },
        ]
    }
}
