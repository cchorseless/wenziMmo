/**
 * 调用服务器lua
 */
module ProtoCmd {
    /********************************新玩家进入****** */
    // 游戏触发第一个主线任务
    export const NEW_PLAYER_WelcomeDialog = 'welcomedialog';
    // 上线请求天赋资质
    export const NEW_PLAYER_sendTianFuZiZhi = 'sendTianFuZiZhi';
    // 随机天赋
    export const NEW_PLAYER_randomTianFuValue = 'randomTianFuValue';
    // 随机资质
    export const NEW_PLAYER_randomZiZhiValue = 'randomZiZhiValue';

    /********************************物品***************** */
    export const ITEM_LoopUseItem = 'LoopUseItem';//批量使用物品
    export const ITEM_zhuangbeihuishousys = 'zhuangbeihuishousys';// 批量回收装备
    /*****************************充值********************** */
    // 正常充值界面
    export const CZ_OPEN_chongzhidialog = 'chongzhidialog';

    // 首冲界面
    export const CZ_OPEN_weichongzhidialog = 'weichongzhidialog';

    // 剧情提示面板
    export const JQ_OPEN_JuQingEventDialog = 'JuQingEventDialog';

    /*****************************帮派*********************** */
    // 号角信息
    export const BP_getHaoJaoInfo = 'getHaoJaoInfo';
    // 购买号角
    export const BP_GouMaiCreateItem = 'GouMaiHaoJiao';
    // 帮会捐献信息
    export const BP_JuanXianInfo = 'HangHuiJuanXianConfig';
    // 行会捐献
    export const BP_JuanXian = 'HangHuiJuanXIan'; // (_,idx,num) idx:1元宝 2金币

    /******************************商店************************ */
    // 拉取商店道具列表
    export const SHOP_UpdateItemList = 'openMallLable';// (type:商城类型,subtype:商店子类型=0（0无子ID，从1开始）) return itf_HotShop
    // 商店购买物品
    export const SHOP_BuyItem = 'buyMallItem';//(type,subtype, idx, num)
    // 热销商店刷新
    export const SHOP_HOT_REFRESH = 'refreshMallHotItem';

    /*******************************地图移动******************** */
    // 传送地图
    export const MAP_MOVE = 'minMapSpaceMove';// 飞地图 (mapid:小地图ID)
    // 传送地图到指定坐标
    export const MAP_MOVE_POINT = 'moveToPoint';// (mapid, x, y, str) ：地图ID，地图坐标，附属信息
    // 小地图信息
    export const MAP_Get_ALLROOM_INFO = 'getAllMinMapStatus';//获取所有小地图信息

    /*****************************任务相关********************* */
    // 任务刷新星级
    export const TASK_REFRESH_XINGJI = 'huanrenwu_shuaxingxingji';// 任务刷新星级
    // 开始触发主线任务
    export const TASK_GET_FIRST_MAINTASK = 'HuangYingJieMian_QianDuan';// 触发主线任务
    // 成就任务信息
    export const TASK_GET_CHENGJIU_INFO = 'achievementPanel';// 拉取成就信息     (index:页签)

    /*****************************剧情相关*************************** */

    // 拉取自己的剧情相关信息
    export const JQ_GET_JQ_SELF_INFO = 'getSelfJuQingInfo';

    // 拉取剧情篇章目录
    export const JQ_GET_JQ_PIANZHANG = 'getJuQingPianZhang';

    // 剧情章节目录:篇章ID
    export const JQ_GET_JQ_ZHANGJIE = 'getJuQingCharpter';

    // 剧情详情:章节ID
    export const JQ_GET_JQ_JuQingInfo = 'getJuQingInfo';

    // 阅读剧情
    export const JQ_GET_JQ_readJuQing = 'readJuQing';

    // VIP跳剧情:章节ID
    export const JQ_GET_JQ_vipSkipJuQing = 'vipSkipJuQing';


    // 领取剧情奖励:章节ID
    export const JQ_GET_JQ_getJuQingBaseReward = 'getJuQingBaseReward';

    // 领取进度奖励:章节ID,对白ID
    export const JQ_GET_JQ_getJuQingReward = 'getJuQingReward';

    // 打开奖励面板
    export const JQ_GET_JQ_openJuQingBaseReward = 'openJuQingBaseReward';

    /********************************主线副本界面**************** */
    // 打开主线面板
    export const FB_ChuMoClientOpen = 'ChuMoClientOpen';//(章节ID)
    // 获取单层信息
    export const FB_ChuMoCengOpen = 'ChuMoCengOpen';//{层数ID}
    // 进入主线副本
    export const FB_ChuMoEnter = 'ChuMoEnter';//{层数ID} 
    // 离开主线副本
    export const FB_ChuMoLeave = 'ChuMoLeave';
    // 主线副本进入成功,更新副本进度
    export const FB_ChuMoRightPlane = 'ChuMoRightPlane';
    /********************************资源副本*********************** */
    // 资源状态
    export const FB_CLFubenStatus = 'CLFubenStatus';
    //单个资源副本
    export const FB_OpenNpc_CLFuben = 'OpenNpc_CLFuben';
    /********************************心魔副本*********************** */
    // 打开个人boss界面
    export const FB_GeRenBoss_Open = 'GeRenBoss_Open';
    /********************************缉盗悬赏副本*********************** */
    // 打开野外boss界面
    export const FB_YeWaiBoss_Open = 'YeWaiBoss_Open';
    /********************************诛杀邪帝副本*********************** */
    // 打开世界boss界面
    export const FB_WorldBossPanel = 'WorldBossPanel';

    /********************************天山血狱副本*********************** */
    // 打开boss之家界面
    export const FB_WorldBoss_Open = 'WorldBoss_Open';
    // boss之家单条信息界面
    export const FB_GetWorldBossInfo = 'GetWorldBossInfo';
    /********************************阴葵门副本*********************** */
    // 打开锁妖塔界面
    export const FB_BossSuoYaoTa = 'BossSuoYaoTa';
    /********************************角色信息界面***************** */
    // 声望信息
    export const JS_PrestigePanel = 'prestigePanel';
    // 强化大师(强化、装备等级、升级大师)
    export const JS_SoulNecklacePanel = 'SoulNecklacePanel';// (type:0是玩家1是英雄)
    /*********************************资质天赋******************** */
    // 善缘-官印
    // 激活善缘
    export const JS_SHANYUAN_Active = 'activeOfficialSeal';
    // 善缘界面
    export const JS_SHANYUAN_Panel = 'OfficialSealPanel';
    // 升级善缘
    export const JS_SHANGYUAN_LVUP = 'upgradeOfficialSeal';
    // 拉取天赋+性格随机结果
    export const JS_sendTianFuZiZhi = 'sendTianFuZiZhi';
    // 随机性格
    export const JS_randomXingGeValue = 'randomTianFuValue';
    // 随机天赋
    export const JS_randomZiZhiValue = 'randomZiZhiValue';
    // 拉取姓名九宫和生辰八字
    export const JS_birthdateAndCompellation = 'birthdateAndCompellation';
    // 悟性=龙魂

    // 臂力-神盾

    // 身法=血玉

    // 根骨-勋章
}

/**
 * 返回结构体
 */
module ProtoCmd {

    /**
     * 号角信息
     */
    export interface itf_Guild_HaoJiaoInfo {
        binding: number;// 是否绑定
        index: number;// 道具ID
        num: number;// 数量
        yuanbao: number//价格
    };

    /**
     * 行会捐献信息
     */
    export interface itf_Guild_JuanXianInfo {
        goldcnt: number;// 
        rmbcnt: number;// 
        leftGold: number// 金币剩余量
    };

    /**
     * 商店单个物品
     */
    export interface itf_Shop_ShopItem {
        binding: number;// 绑定
        curcnt: number;// 当前已购买次数
        discount: number;// 折扣数
        itemid: number;// 物品ID
        limitcnt: number;// 限购次数
        num: number;// 数量
        price: number;// 总价格
        pricetype: number;// 货币类型
        show: number;// 是否显示
        type: number;//商店类型
        subtype: number;//商店子类型
        index: string;//商店条目索引
    }


    /**
     * 热销商店返回数据
     */
    export interface itf_Shop_RefreshResult {
        refreshprice: number;//刷新价格
        items: { itf_Shop_ShopItem };//刷新道具
        pricetype: number;//刷新货币类型
    }


    /*******************************************地图*************************** */
    /**
     * 地图移动返回
     */
    export interface itf_MAP_MOVE {
        errorcode: number;// 状态码
        curmapid: number;// 房间ID
        dstmap: itf_MAP_SMALL_INFO;//上下左右房间信息
    }
    /**
     * 地图房间信息返回
     */
    export interface itf_MAP_ROOM_INFO {
        curminmapid: number;// 当前房间ID
        dstmap: itf_MAP_SMALL_INFO;//上下左右房间信息
        statetab: any;
    }
    /**
     * 房间上下左右信息
     */
    export interface itf_MAP_SMALL_INFO {
        left: number;
        right: number;
        up: number;
        down: number;
    }
    /********************************************道具*************************** */
    /**
     * 道具信息
     */
    export interface itf_ItemInfo {
        index: number;
        binding: number;
        num: number;
    }

    /********************************************剧情*************************** */
    /**
     * 个人剧情进度信息
     */
    export interface itf_JUQING_SELFINFO {
        dbid: number;// 对白ID
        pzid: number;// 篇章ID
        zjid: number;// 章节ID
        zjname: string;// 章节名字
        pzname: string;// 篇章名字
    }

    /**
     * 单条篇章目录
     */
    export interface itf_JUQING_PIANZHANG {
        id: number;// 篇章ID
        name: number;// 篇章名称
        cnt: number;// 篇章内章节数量
    }

    /**
     * 单条章节信息
     */
    export interface itf_JUQING_CHARPTERINFO {
        drops: any;// 章节随机掉落池
        enddbid: number;// 章节结束ID
        intro: number;// 章节介绍
        items: any;// 章节奖励ID
        lvl: number;// 章节解锁等级
        name: string;// 章节名称
        startdbid: number;// 开始对话ID
        zjid: number;// 章节ID
        zslvl: number;// 转生等级
        index: string;//章节编号
        events: any;//事件信息
    }

    /**
     * 单条对白信息
     */
    export interface itf_JUQING_TALKINFO {
        msg: {
            content?: string;
            eventBn?: string;//第二种选项对白
            question: string;//选项问题
            eventA?: string;
            eventB?: string;
            id?: number;
            npcid?: number;
        }
    }

    /**
     * 单条阅读结果返回数据
     */
    export interface itf_JUQING_READBACK {
        eventid: number;// 完成事件奖励
        items: any;// 奖励
        mainquestid: number; // 剧情触发任务
        subquestid: number; // 激活任务

        tjeventid: number;// 图鉴激活事件
        tjitem: number;// 图鉴激活物品
        tjmap: number;// 图鉴激活地图
        tjrole: number;// 图鉴激活角色
    }
    /**********************************角色信息************************* */
    export interface itf_JS_talentXingGeInfo {
        zztab: any,//性格
        tftab: any,//天赋
        TotalZiZhiPoint: number,//天赋总数
    }

    /**
     * 拉取声望信息
     */
    export interface itf_JS_ShengWangInfo {
        damage: number;// 百分比 
        daydelexp: number;// 每日衰减经验
        effid: number;// 效果ID
        maxexp: number;// 当前挡位
        minexp: number;// 当前声望值
        prestigeid: number;// 称号ID
        rank: any;// 排行榜
    }

    /**
     * 拉取主线副本信息
     */
    export interface itf_FB_MainFbInfo {
        ceng: number;// 层数
        curcnt: number;// 当前挑战次数
        star: any; //星级宝箱
        state: any;//BOss信息
        totalcnt: number;//总层数
    }
    /***********************************副本接口**************************** */
    /**
     * 心魔副本信息
     */
    export interface itf_FB_XinMoInfo {
        flag: number;//已刷副本次数
        maxcnt: number;//最大刷副本次数
        maxlv: number;//最大等级
        minlv: number;//最小等级
        monsterid: number;//bossID
        sec: number;//剩余刷新时间
        show: number;//是否展示
        viplv: number;//vip等级
        x: number;//boss的X坐标
        y: number;//boss的y坐标
    }
    /**
   * 资源副本信息
   */
    export interface itf_FB_ZiYuanInfo {
        caninto: number//已进入副本次数
        index: number//索引
        leftcnt: number//最大可进入次数
        name: string//副本类型
        name1: string//副本地图名称
        openlv: number//开放等级
    }
    /**
   * 资源副本单行信息
   */
    export interface itf_FB_ZiYuanOneInfo {
        FuBenIndex: number//索引
        activity: number//特权
        caninto: number//已进入次数
        jiangli: any//奖励
        leftcnt: number//最大进入次数
        linquneed: any//多倍领取需要的货币
        name1: string//副本地图名称
        need: any//需要的物品
        ntype: number//领取的多倍奖励的货币类型
        openlv: number//开放等级
    }
    /**
   * 天山血狱
   */
    export interface itf_FB_XueYuInfo {
        mapid: number//地图ID
        vip: number//vip等级
        alive1: number//普通层存活率
        alive2: number//vip层存活率
        bossid: number//bossID
    }
    /**
 * 阴葵门
 */
    export interface itf_FB_YinKuiMenInfo {
        bossid: number//bossID
        mapid: number//地图ID
        time: number//Boss刷新时间
        zslvl: number//进入需求等级
    }
    /**
* 缉盗悬赏
*/
    export interface itf_FB_JiDaoInfo {
        monid: number//bossID
        mapid: number//地图ID
        time: number//Boss刷新时间
    }
    export interface itf_FB_KillXieDiInfo {
        desc: string//描述
        endtime: number//活动结束时间
        mapid: number//地图id
        monsterid: number//bossID
        openlvl: number//打开等级
        ranktab: any//排行榜
        reward: any//奖励
        starttime: number//活动开始时间
    }
}