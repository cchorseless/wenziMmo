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
        public static StartLoading = [{ url: "res/atlas/image/common/startLoad.atlas", type: Laya.Loader.ATLAS },];
        // GM界面
        public static GM = null;
        // 登陆界面
        public static Login = [{ url: "res/atlas/image/common/login.atlas", type: Laya.Loader.ATLAS },];
        // 选择服务器界面  
        public static ChooseServer = [{ url: "res/atlas/image/common/login.atlas", type: Laya.Loader.ATLAS },];
        // 服务器列表界面
        public static ServerList = null
        // 服务器公告界面
        public static ServerNotice = null;
        // 断线界面
        public static serverError = null;
        // 创建角色界面
        public static CreateAvatar = [{ url: "res/atlas/image/createplayer.atlas", type: Laya.Loader.ATLAS },];;
        // 选择角色界面
        public static ChooseAvatar = null;
        // 通用素材
        public static Common = [{ url: "res/atlas/image/common/default.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/common/number.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/common/npc.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/common/scene.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/common/daoju.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/common/battle.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/common/skill.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/common/skillName.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/common.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/map/smallMap.atlas", type: Laya.Loader.ATLAS },
        { url: "music/bg.mp3", type: Laya.Loader.SOUND },
        { url: "res/atlas/image/main.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/main/main_zonglan.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/main/main_tansuo.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/juese.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/recharge_vip.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/menu.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/juQingMode.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/juese/chenghao.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/bag.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/juese/gangqi.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/map.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/map/northland.atlas", type: Laya.Loader.ATLAS },
        ];
        // 主界面 主界面资源通过同步加载
        public static Main = null;
        // 角色界面
        public static JueSe = [
            { url: "res/atlas/image/juese.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/image/juese/chenghao.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/image/juese/gangqi.atlas", type: Laya.Loader.ATLAS }];
        // 弟子界面
        public static DiZi = null;
        // 时装界面
        public static Clothe = [{ url: "res/atlas/image/juese/clothe.atlas", type: Laya.Loader.ATLAS }];
        // 武学 外功
        public static WaiGong = [{ url: "res/atlas/image/juese.atlas", type: Laya.Loader.ATLAS }];;
        // 武学 内功
        public static NeiGong = null;
        // 武学 合道
        public static HeDao = null;
        // 武学 闭关
        public static CloseDoor = null;
        // 武学 生活技能
        public static LifeSkill = [{ url: "res/atlas/image/juese.atlas", type: Laya.Loader.ATLAS }];;
        // 宅院界面
        public static ZhaiYuan = [{ url: "res/atlas/image/zhaiYuan.atlas", type: Laya.Loader.ATLAS }];;
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
        public static ZhiNan = [{ url: "res/atlas/image/tujian.atlas", type: Laya.Loader.ATLAS }];;
        // 玩法界面
        public static ZhiNan_WanFa = null;
        // 门派界面
        public static ZhiNan_MenPai = null;
        // 武学界面
        public static ZhiNan_WuXue = null;
        // 属性界面
        public static ZhiNan_ShuXing = null;
        // 地域界面
        public static ZhiNan_DiYu = null;
        // 主线任务界面
        public static Task_Main = [{ url: "res/atlas/image/task.atlas", type: Laya.Loader.ATLAS }];
        // 日常任务界面
        public static Task_Daily = null;
        // 历练任务界面
        public static Task_LiLian = null;
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
        // 副本-剧情界面
        public static FuBenMain = [{ url: "res/atlas/image/fuben.atlas", type: Laya.Loader.ATLAS }];;
        // 副本-日常界面
        public static FuBenDaily = [{ url: "res/atlas/image/fuben.atlas", type: Laya.Loader.ATLAS }];;
        // 副本-历练界面
        public static FuBenLiLian = [{ url: "res/atlas/image/fuben.atlas", type: Laya.Loader.ATLAS }];;
        // 副本-限时界面
        public static FuBenXianShi = [{ url: "res/atlas/image/fuben.atlas", type: Laya.Loader.ATLAS }];;
        // 北陆地图
        public static NorthMap = [{ url: "res/atlas/image/map.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/map/northland.atlas", type: Laya.Loader.ATLAS },
        ];;
        // 南陆地图
        public static SouthMap = [{ url: "res/atlas/image/map.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/map/southland.atlas", type: Laya.Loader.ATLAS },];
        // 东陆地图
        public static EastMap = [{ url: "res/atlas/image/map.atlas", type: Laya.Loader.ATLAS }];
        // 世界地图界面
        public static WorldMap = [{ url: "res/atlas/image/map.atlas", type: Laya.Loader.ATLAS }];
        // 剧情对白界面
        public static JuQingMode = [{ url: "res/atlas/image/juQingMode.atlas", type: Laya.Loader.ATLAS }];
        // 菜单界面
        public static Menu = [{ url: "res/atlas/image/menu.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/recharge_vip.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/activity.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/bag.atlas", type: Laya.Loader.ATLAS }
        ];
        //新服活动
        public static NewServerActive = null;
        //抽奖界面
        public static LuckDraw = null;
        //商城界面
        public static ShopMall = null;
        //福利界面
        public static FuLi = null;
        // 图鉴道具界面
        public static TuJianDaoju = [{ url: "res/atlas/image/tujian.atlas", type: Laya.Loader.ATLAS }];
        // 图鉴角色界面
        public static TuJianJuese = [{ url: "res/atlas/image/tujian.atlas", type: Laya.Loader.ATLAS }];
        // 图鉴事件界面
        public static TuJianEvent = [{ url: "res/atlas/image/tujian.atlas", type: Laya.Loader.ATLAS }];
        // 图鉴地理界面
        public static TuJianPlace = null;
        // 天鉴界面
        public static TianJian = null;
        //活动界面
        public static Activity = [{ url: "res/atlas/image/activity.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/image/guild.atlas", type: Laya.Loader.ATLAS }];
        //促销界面
        public static Promotion = [{ url: "res/atlas/image/promotion.atlas", type: Laya.Loader.ATLAS }];

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
            // 怪物表
            { url: 'json/mydb_monster_tbl.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.mydb_monster_tbl },
            // 随机属性表
            { url: 'json/attribute.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.attribute },
            // 手册介绍表
            { url: 'json/Introduction_play.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.Introduction_play },
            // 技能表
            { url: 'json/mydb_magic_tbl.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.mydb_magic_tbl },
            // 九宫表
            { url: 'json/Palace.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.Palace },
            // 八字表
            { url: 'json/characters.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.characters },
            // 八字介绍表
            { url: 'json/troduce.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.troduce },
            // 个人标签表
            { url: 'json/Label.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.Label },
            // 随机姓名表
            { url: 'json/randomNameSheet.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.randomNameSheet },
            // 生平履历
            { url: 'json/resume.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.resume },
            // 装备合成
            { url: 'json/Synthesis.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.Synthesis },
            // Vip描述
            { url: 'json/VIP_Content.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.VIP_Content },
            // 弟子信息描述
            { url: 'json/HeroInfoSheet.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.HeroInfoSheet },
            // 玩法攻略
            { url: 'json/Strategy.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.Strategy },
            // 排行榜奖励预览
            { url: 'json/Ranking_List.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.Ranking_List },
            //时辰节气
            { url: 'json/Solarterms.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.Solarterms },
            //装备打造
            { url: 'json/zhuangbei_make.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.zhuangbei_make },
            //外观列表
            { url: 'json/zhuanban_Dress.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.zhuanban_Dress },
            //武学四法（角色武学基础）
            { url: 'json/sifa_consume.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.sifa_consume },
            //主线扫荡
            { url: 'json/Thread_sweep_tbl.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.Thread_sweep_tbl },
            //宅院
            { url: 'json/zhaiyuan_upgrade.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.zhaiyuan_upgrade },
            //基础门派表
            { url: 'json/BaseMenPaiSheet.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.BaseMenPaiSheet },
            //剧情篇章表
            { url: 'json/juQingPianZhangSheet.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.juQingPianZhangSheet },
            //怪物更新表
            { url: 'json/mydb_mongen_tbl.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.mydb_mongen_tbl },
             //基础门派表
            { url: 'json/BaseMenPaiSheet.json', type: Laya.Loader.JSON, CLASSTYPE: SheetConfig.BaseMenPaiSheet }
        ];
    }

    /**
     * 游戏字体文件
     */
    export class TTFRes {
        public static AllTTFData = [
            { url: 'fonts/FZXK.ttf', type: Laya.Loader.TTF, TTFNAME: 'FZXK' },
            { url: 'fonts/FZHL.ttf', type: Laya.Loader.TTF, TTFNAME: 'FZHL' },
            { url: 'fonts/FZLB.ttf', type: Laya.Loader.TTF, TTFNAME: 'FZLB' },
            { url: 'fonts/HWXK.ttf', type: Laya.Loader.TTF, TTFNAME: 'HWXK' },
        ]
    }


}
