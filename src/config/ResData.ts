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
        public static Clothe = [{ url: "res/atlas/image/juese/clothe.atlas", type: Laya.Loader.ATLAS }];
        // 武学 外功
        public static WaiGong = [{ url: "res/atlas/image/juese.atlas", type: Laya.Loader.ATLAS }];;
        // 武学 内功
        public static NeiGong = [{ url: "res/atlas/image/juese.atlas", type: Laya.Loader.ATLAS }];;
        // 武学 合道
        public static HeDao = [{ url: "res/atlas/image/juese.atlas", type: Laya.Loader.ATLAS }];;
        // 武学 生活技能
        public static LifeSkill = [{ url: "res/atlas/image/juese.atlas", type: Laya.Loader.ATLAS }];;
        // 养成界面
        public static YangCheng = [{ url: "res/atlas/image/yangCheng.atlas", type: Laya.Loader.ATLAS }];;
        // 背包界面
        public static BeiBao = [{ url: "res/atlas/image/bag.atlas", type: Laya.Loader.ATLAS }];;
        // 社交江湖界面
        public static SheJiao = null;
        // 剧情进度界面
        public static JuQingInfo = [{ url: "res/atlas/image/juQing.atlas", type: Laya.Loader.ATLAS }];
        // 排行榜界面
        public static RankMain = null;
        // 引导界面
        public static YinDao = null;
        // 指南界面
        public static ZhiNan = null;
        // 主线任务界面
        public static Task_Main = [{ url: "res/atlas/image/task.atlas", type: Laya.Loader.ATLAS }];
        // 日常任务界面
        public static Task_Daily = [{ url: "res/atlas/image/task.atlas", type: Laya.Loader.ATLAS }];;
        // 历练任务界面
        public static Task_LiLian = [{ url: "res/atlas/image/task.atlas", type: Laya.Loader.ATLAS }];;
        // 成就任务界面
        public static Task_chengJiu = [{ url: "res/atlas/image/task.atlas", type: Laya.Loader.ATLAS }];;
        // 帮派选择界面
        public static GuildSelect = [{ url: "res/atlas/image/guild.atlas", type: Laya.Loader.ATLAS }];;
        // 帮派界面
        public static GuildMain = [{ url: "res/atlas/image/guild.atlas", type: Laya.Loader.ATLAS }];;
        // 队伍界面
        public static Team = [{ url: "res/atlas/image/team.atlas", type: Laya.Loader.ATLAS }];
        // 好友界面
        public static Friend = [{ url: "res/atlas/image/common.atlas", type: Laya.Loader.ATLAS }];
        // 入帮设置界面
        public static GuildIntoCondition = [{ url: "res/atlas/image/guild.atlas", type: Laya.Loader.ATLAS }];;
        // 帮派福利
        public static GuildFuli = null;;
        // 帮派仓库
        public static GuildStore = null;;
        // 帮派日志
        public static GuildRecord = null;;
        // 入帮申请
        public static GuildApply = null;;
        // 帮派支援
        public static GuildHelp = null;;
        // 帮会成员界面
        public static GuildMember = null;;
        // 帮派商店
        public static GuildShop = null;
        // 帮派实力排行界面
        public static GuildRank = null;
        // 帮派实力排行界面
        public static GuildWaiJiao = null;
        // 副本界面
        public static FuBen = null;;
        // 世界地图界面
        public static WorldMap = [{ url: "res/atlas/image/map.atlas", type: Laya.Loader.ATLAS }];;
        // 剧情对白界面
        public static JuQingMode = [{ url: "res/atlas/image/juQingMode.atlas", type: Laya.Loader.ATLAS }];;
        // 菜单界面
        public static Menu = [{ url: "res/atlas/image/menu.atlas", type: Laya.Loader.ATLAS }];;
        // 图鉴道具界面
        public static TuJianDaoju = [{ url: "res/atlas/image/tujian.atlas", type: Laya.Loader.ATLAS }];;
        // 图鉴角色界面
        public static TuJianJuese = [{ url: "res/atlas/image/tujian.atlas", type: Laya.Loader.ATLAS }];;
        // 图鉴事件界面
        public static TuJianEvent = [{ url: "res/atlas/image/tujian.atlas", type: Laya.Loader.ATLAS }];;
        // 图鉴地理界面
        public static TuJianPlace = null;
        // 天鉴界面
        public static TianJian = null;

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
            // 参数表
            { url: 'json/canshuSheet.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.canshuSheet },
            // 剧情对白表
            { url: 'json/juQingTxtSheet.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.juQingTxtSheet },
            // 行会升级表
            { url: 'json/config_guild.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.config_guild },
            // 地图房间表
            { url: 'json/mapRoomSheet.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.mapRoomSheet },
            // 地图信息表
            { url: 'json/mydb_mapinfo_tbl.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.mydb_mapinfo_tbl },
            // NPC位置表
            { url: 'json/mydb_npcgen_tbl.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.mydb_npcgen_tbl },
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
