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

    /****************************NPC************************* */
    // 偷盗
    export const stealNpcItem = 'stealNpcItem';
    // 切搓
    export const fightWithNpc = 'fightWithNpc'; // (_, npcid)
    // 送礼
    export const giveGiftToNpc = 'giveGiftToNpc'; //(_, npcid, itemid)


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
    // 任务日常活跃
    export const TASK_HuoYueDuClientOpen = 'HuoYueDuClientOpen';// 活跃度打开
    // 任务日常活跃度领取
    export const TASK_HuoYueGetWard = 'HuoYueGetWard';// 领取活跃度
    // 任务日常每日
    export const TASK_DailyTaskClientOpen = 'DailyTaskClientOpen';
    // 任务历练威望
    export const TASK_prestigeQuestPanel = 'prestigeQuestPanel';
    //任务成就id及其对应宝箱状态，0未达到|1已达到后未领取|2达到后已领取
    export const TASK_achievementPanel = 'achievementPanel';
    //任务成就描述与奖励
    export const TASK_achievementDesc = 'achievementDesc';

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
    /********************************限时副本*********************** */
    // 打开限时（限时活动）界面
    export const FB_LimitActivities = 'LimitActivities';
    // 打开限时详细信息界面
    export const FB_LimitActivitiesCfg = 'LimitActivitiesCfg';
    /********************************排行榜相关*********************** */
    //我的排行榜奖励预览
    export const Rank_rankShowRewardByRankType = 'rankShowRewardByRankType';
    //我的奖励领取
    export const Rank_getRankRewardByRankType = 'getRankRewardByRankType';

    /********************************角色信息界面***************** */
    // 声望信息
    export const JS_PrestigePanel = 'prestigePanel';
    // 强化大师(强化、装备等级、升级大师)
    export const JS_SoulNecklacePanel = 'SoulNecklacePanel';// (type:0是玩家1是英雄)
    // 内功经络
    export const JS_shuxingxitong_minabandakai = 'shuxingxitong_minabandakai';
    // 内功经络升级
    export const JS_shuxingxitong_shengji = 'shuxingxitong_shengji';
    // 罡气护体激活
    export const JS_activePlayerWing = 'activePlayerWing';
    // 罡气护体
    export const JS_playerWingPanel = 'playerWingPanel';
    // 罡气进阶
    export const JS_advancePlayerWing = 'advancePlayerWing';
    /********************************弟子信息界面***************** */

    //弟子面板
    export const JS_HeroBaseInfo = 'HeroBaseInfo';

    // 激活第一个弟子
    export const JS_firstGenHero = 'firstGenHero';

    /*********************************资质天赋******************** */
    // // 善缘-官印
    // // 激活善缘
    // export const JS_SHANYUAN_Active = 'activeOfficialSeal';
    // // 善缘界面
    // export const JS_SHANYUAN_Panel = 'OfficialSealPanel';
    // // 升级善缘
    // export const JS_SHANGYUAN_LVUP = 'upgradeOfficialSeal';
    // 拉取天赋+性格随机结果
    export const JS_sendTianFuZiZhi = 'sendTianFuZiZhi';
    // 随机性格
    export const JS_randomXingGeValue = 'randomTianFuValue';
    // 随机天赋
    export const JS_randomZiZhiValue = 'randomZiZhiValue';
    // 拉取姓名九宫和生辰八字
    export const JS_birthdateAndCompellation = 'birthdateAndCompellation';
    // 善緣=官印
    export const JS_OfficialSealPanel = 'OfficialSealPanel';
    // 善緣激活
    export const JS_activeOfficialSeal = 'activeOfficialSeal';
    // 善緣升级
    export const JS_upgradeOfficialSeal = 'upgradeOfficialSeal';
    // 悟性=龙魂
    export const JS_DragonSoulPanel = 'DragonSoulPanel';//curscore：当前经验 isfull:是否满级 score: 最大经验
    // 悟性激活
    export const JS_activeDragonSoul = 'activeDragonSoul';
    // 悟性升级
    export const JS_upgradeDragonSoul = 'upgradeDragonSoul';
    // 臂力-神盾
    export const JS_ShieldPanel = 'ShieldPanel';
    // 臂力激活
    export const JS_activeShield = 'activeShield';
    // 臂力升级
    export const JS_upgradeShield = 'upgradeShield';
    // 身法=血玉
    export const JS_BloodJadePanel = 'BloodJadePanel';
    // 身法激活
    export const JS_activeBloodJade = 'activeBloodJade';
    // 身法升级
    export const JS_upgradeBloodJade = 'upgradeBloodJade';
    // 根骨-勋章
    export const JS_MedalPanel = 'MedalPanel';
    // 根骨激活
    export const JS_activeMedal = 'activeMedal';
    // 根骨升级
    export const JS_upgradeMedal = 'upgradeMedal';
    // 请求介绍手册的解锁状态
    export const getIntroductionInfo = 'getIntroductionInfo';
    // 领取介绍手册中奖励
    export const getIntroductionReward = 'getIntroductionReward';
    //天鉴界面打开请求参数
    export const SpecialRingPanel = "SpecialRingPanel";
    //天鉴界面激活
    export const activeSpecialRing = "activeSpecialRing";
    //四格，9宫
    export const birthdateAndCompellation = "birthdateAndCompellation";
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
        maxexp: number;// 最大声望值
        minexp: number;// 当前声望值
        prestigeid: number;// 称号ID
        rank: any;// 排行榜
        titletab: any//声望头衔信息
    }
    /**
    * 拉取内息经络
    */
    export interface itf_JS_NeiGongInfo {

        dangqiandengji: number//当前等级
        dangqianneigong: number//当前内功
        dangqianshuxing: string//“内功抵抗=当前属性”
        nghf: number//内功恢复
        xiajishuxing: string//下级属性
        xiaohaoitem: number//当前属性的最大内功
        zongnum: number
    }

    /**********************************角色信息************************* */
    /**
     * 弟子基本信息
     */
    export interface itf_Hero_BaseInfo {
        DJS: number//倒计时
        JOB: number//职业
        STATE: number//状态 0未激活1可激活2已激活
    }

    /***********************************副本接口**************************** */
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
        caninto: number;//已进入副本次数
        index: number;//索引
        leftcnt: number;//最大可进入次数
        name: string;//副本类型
        name1: string;//副本地图名称
        openlv: number;//开放等级
    }
    /**
   * 资源副本单行信息
   */
    export interface itf_FB_ZiYuanOneInfo {
        FuBenIndex: number;//索引
        activity: number;//特权
        caninto: number;//已进入次数
        jiangli: any;//奖励
        leftcnt: number;//最大进入次数
        linquneed: any;//多倍领取需要的货币
        name1: string;//副本地图名称
        need: any;//需要的物品
        ntype: number;//领取的多倍奖励的货币类型
        openlv: number;//开放等级
    }
    /**
   * 天山血狱
   */
    export interface itf_FB_XueYuInfo {
        mapid: number;//地图ID
        vip: number;//vip等级
        alive1: number;//普通层存活率
        alive2: number;//vip层存活率
        bossid: number;//bossID
    }
    /**
 * 阴葵门
 */
    export interface itf_FB_YinKuiMenInfo {
        bossid: number;//bossID
        mapid: number;//地图ID
        time: number;//Boss刷新时间
        zslvl: number;//进入需求等级
    }
    /**
* 缉盗悬赏
*/
    export interface itf_FB_JiDaoInfo {
        monid: number;//bossID
        mapid: number;//地图ID
        time: number;//Boss刷新时间
    }
    /**
* 诛杀邪帝
*/
    export interface itf_FB_KillXieDiInfo {
        desc: string;//描述
        endtime: number;//活动结束时间
        mapid: number;//地图id
        monsterid: number;//bossID
        openlvl: number;//打开等级
        ranktab: any;//排行榜
        reward: any;//奖励
        starttime: number;//活动开始时间
    }
    /**
* 限时副本
*/
    export interface itf_FB_XianshiInfo {
        now: number;//当前时间
        id: number;//限时活动ID
    }
    /**
* 限时活动副本详细信息
*/
    export interface itf_FB_XianshiDetailInfo {
        award: any;//奖励id 
        id: number;//限时活动ID
        introduce: string;//活动简介
        levelDesc: string;//需求等级
        lv: number;//需求等级
        name: string;//活动名称
        starttime: string;//开始时间
        time: string;//活动时间
        tipDes: string;//点立即参与活动时的提示
    }
    /***********************************任务接口**************************** */
    /**
     * 任务日常活跃信息
     */
    export interface itf_Task_HuoYueInfo {
        maxvalue: number;//最大活跃值
        addvalue: number//做任务可获得活跃度
        tab: any;//任务相关
        value: number;//当前活跃值    
        cur: number;//当前任务君度
        id: number;//任务类型id
        max: number;//任务进度最大值
        wardtab: any;//宝箱活跃度相关（bj:领取状态，id:宝箱id，value:活跃值达到多少时可领取）
        item: any//奖励(num:数量，index：奖励id，blind)
        bj: number;//0不可领取|1可领取|2已领取
        desc: string;//任务描述
        name: string;//任务名称
    }
    /**
     * 任务日常每日信息
     */
    export interface itf_Task_DailyInfo {
        buycnt: number//购买任务次数
        curcnt: number//当前进度
        id: number//任务id
        maxcnt: number//最大进度
        txt: string//进入所需级别
        title: string//任务名称
        desc: string//任务描述
    }
    /**
     * 任务历练威望信息
     */
    export interface itf_Task_PrestigeInfo {
        needrmb: number//一键完成需要的元宝
        questdbname: string//任务名字
        questid: number//任务ID
        score: number//威望积分
        status: any//任务状态 -1是未接||0新接||1进行中||2已完成||3已结束||4放弃
        szquestrewards: string//任务奖励(id:奖励id，co：奖励数量)
        statustab: any
    }
}