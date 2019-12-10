/**
 * 调用服务器lua
 */
module ProtoCmd {

    /*******************************新手引导进度设置************ */
    // 设置新手引导进度
    export const playerBubble = 'PlayerBubble';// 1-256*8
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
    //
    export const clickNpc = "clickNpc";   //点击NPC
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
    export const SHOP_BuyItem = 'buyMallItem';//(type商店类型,subtype商店子类型, idx第几个物品, num数量)
    // 热销商店刷新
    export const SHOP_HOT_REFRESH = 'refreshMallHotItem';

    /*******************************地图移动******************** */
    // 传送地图
    export const MAP_MOVE = 'minMapSpaceMove';// 飞地图 (mapid:小地图ID)
    // 传送地图到指定坐标
    export const MAP_MOVE_POINT = 'moveToPoint';// (mapid, x, y, str) ：地图ID，地图坐标，附属信息
    // 小地图信息
    export const MAP_Get_ALLROOM_INFO = 'getAllMinMapStatus';//获取所有小地图信息
    /*****************************好友相关********************* */
    // 好友列表本地数据更新
    export const FD_UPDATA = 'updataFriendInfo';
    // 好友申请本地数据更新
    export const FD_APPLY_UPDATA = 'updataFriendApplyInfo';
    /*****************************任务相关********************* */
    // 任务刷新星级
    export const TASK_REFRESH_XINGJI = 'huanrenwu_shuaxingxingji';// 任务刷新星级
    // 开始触发主线任务
    export const TASK_GET_FIRST_MAINTASK = 'HuangYingJieMian_QianDuan';// 触发主线任务
    // 任务日常活跃
    export const TASK_HuoYueDuClientOpen = 'HuoYueDuClientOpen';// 活跃度打开
    // 任务日常活跃度领取
    export const TASK_HuoYueGetWard = 'HuoYueGetWard';// 领取活跃度
    // 任务日常每日
    export const TASK_DailyTaskClientOpen = 'DailyTaskClientOpen';
    // 任务历练威望
    export const TASK_prestigeQuestPanel = 'prestigeQuestPanel';
    // 威望宝箱领取
    export const getRewardByPrestigeScore = 'getRewardByPrestigeScore';
    // 接受威望任务
    export const recvivePrestigeQuest = 'recvivePrestigeQuest';
    // 元宝完成威望任务
    export const finishPrestigeQuestByRmb = 'finishPrestigeQuestByRmb';
    // 领取威望任务奖励
    export const finishPrestigeQuest = 'finishPrestigeQuest';

    //任务成就id及其对应宝箱状态，0未达到|1已达到后未领取|2达到后已领取
    export const TASK_achievementPanel = 'achievementPanel';// 拉取成就信息     (index:页签)
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
    export const JQ_GET_JQ_vipSkipJuQing = 'vipSkipJuQing';   //id  章节ID  
    //talkid  是当前的id


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
    // 单个资源副本
    export const FB_OpenNpc_CLFuben = 'OpenNpc_CLFuben';
    // 进入副本
    export const FB_Into_CLFuben = 'Into_CLFuben';
    // 领取奖励
    export const FB_CLFuben_LingJiang = 'CLFuben_LingJiang';
    // 离开副本
    export const FB_CaiLiaoFuBenLikai = 'CaiLiaoFuBenLikai';
    // 扫荡
    export const FB_CaiLiaoFuBen_OneKey = 'CaiLiaoFuBen_OneKey';

    /********************************心魔副本*********************** */
    // 打开个人boss界面
    export const FB_GeRenBoss_Open = 'GeRenBoss_Open';
    // 进入个人BOSS界面
    export const FB_GeRenBoss_Enter = 'GeRenBoss_Enter';
    // 个人副本界面
    export const FB_GeRenBoss_FB_Info = 'GeRenBoss_FB_Info';
    // 离开个人BOSS界面
    export const FB_GeRenBoss_Leave = 'GeRenBoss_Leave';
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
    //装扮界面
    export const dressPanel = 'dressPanel';
    //装扮穿戴
    export const dressWearAndTakeoff = 'dressWearAndTakeoff';

    /********************************角色信息界面***************** */
    // 声望信息
    export const JS_PrestigePanel = 'prestigePanel';
    // 强化大师(强化、装备等级、升级大师)
    export const JS_SoulNecklacePanel = 'SoulNecklacePanel';// (type:0是玩家1是英雄)
    // 罡气护体激活
    export const JS_activePlayerWing = 'activePlayerWing';
    // 罡气护体
    export const JS_playerWingPanel = 'playerWingPanel';
    // 罡气使用物品
    export const JS_advancePlayerWing = 'advancePlayerWing';
    // 罡气升阶
    export const JS_upgradePlayerWing = 'upgradePlayerWing';
    // 成就领取奖励
    export const JS_getAchievementReward = 'getAchievementReward';
    // 成就领取奖励回调
    export const JS_updateAchievement = 'updateAchievement';
    // 角色更新装备打造信息
    export const JS_updateBuildEquip = 'updateBuildEquip';
    // 角色更新装备选择的材料
    export const JS_updateBuildEquipItem = 'updateBuildEquipItem';
    // 角色装备打造
    export const JS_equipFabricate = 'equipFabricate';//参数(baseid, i64Ids, status) 要打造的装备ID, 要消耗的物品64ID（111`11利用·符号连接两个64id）, 状态0不附加材料,1附加材料

    /********************************武学界面***************** */
    //武学界面刷新    快捷键   外功
    export const WX_upData_Hotkeys_waigong = "WX_upData_Hotkeys_waigong"
    //武学界面刷新    面板     外功
    export const WX_upData_panel_waigong = "WX_upData_panel_waigong"
    //武学界面刷新    快捷键   内功
    export const WX_upData_Hotkeys_neigong = "WX_upData_Hotkeys_neigong"
    //武学界面刷新    面板     内功
    export const WX_upData_panel_neigong = "WX_upData_panel_neigong"
    //武学界面刷新    Dialog  
    export const WX_upData_Dialog = "WX_upData_Dialog"
    //武学戾气面板
    export const WX_warSoulPanel = 'warSoulPanel';
    //武学戾气兑换魂力
    export const WX_exchangeWarSoulExp = 'exchangeWarSoulExp';
    //武学戾气炼魂
    export const WX_upgradeWarSoul = 'upgradeWarSoul';
    //武学戾气升级面板
    export const WX_updateWarSoulPanel = 'updateWarSoulPanel';
    // /武学内功
    export const WX_shuxingxitong_minabandakai = 'shuxingxitong_minabandakai';
    // /武学内功升级
    export const WX_shuxingxitong_shengji = 'shuxingxitong_shengji';
    // /武学升级
    export const upgradeSkill = 'upgradeSkill';
    //武学经验值增加
    export const addSkillExp = 'addSkillExp';
    //内功计时
    export const neigong_nowTick = "neigong_nowTick";


    /********************************弟子信息界面***************** */
    //弟子面板
    export const Hero_HeroBaseInfo = 'HeroBaseInfo';
    // 激活第一个弟子
    export const Hero_firstGenHero = 'firstGenHero';
    // 激活第二第三个弟子
    export const Hero_HeroJiHuo2and3 = 'HeroJiHuo2and3';
    // 切换弟子出战状态
    export const Hero_ChangeHero = 'ChangeHero';
    // 转生面板
    export const Hero_zhuanShengPanel = 'zhuanShengPanel';
    // 转生
    export const Hero_zhuanSheng = 'zhuanSheng';
    // 获取修为面板
    export const Hero_getXiuWeiPanel = 'getXiuWeiPanel';
    // 兑换修为面板
    export const Hero_exchangeXiuWei = 'exchangeXiuWei';
    // 弟子罡气激活
    export const Hero_activeHeroWing = 'activeHeroWing';
    // 弟子罡气面板
    export const Hero_heroWingPanel = 'heroWingPanel';//得到数据(gold:升级所需消耗的金币数量)
    // 弟子罡气升级
    export const Hero_advanceHeroWing = 'advanceHeroWing';
    // 弟子所有天赋等级
    export const Hero_heroAllGeniusLvl = 'heroAllGeniusLvl';//得到数据(lvltab：天赋等级)
    // 弟子天赋重数面板
    export const Hero_heroGeniusPanel = 'heroGeniusPanel';//
    // 弟子天赋保存
    export const Hero_saveGenius = 'saveGenius';
    // 弟子天赋取消
    export const Hero_cancelGenius = 'cancelGenius';
    // 弟子武功招式
    export const Hero_heroJingMaiPanel = 'heroJingMaiPanel';
    // 弟子武功招式一键激活
    export const Hero_activeJingMai = 'activeJingMai';
    // 弟子武功招式真气面板
    export const Hero_getHeroRealGasPanel = 'getHeroRealGasPanel';
    // 弟子武功招式点真气球满了获取真气
    export const Hero_exchangeRealGasByFakeGas = 'exchangeRealGasByFakeGas';
    // 弟子武功招式返璞归真
    export const Hero_exchangeRealGas = 'exchangeRealGas';
    // 弟子符文面板
    export const Hero_openActiveRunePanel = 'openActiveRunePanel';//得到数据score符文积分viewtab符文碎片
    // 弟子符文全部回收
    export const Hero_runeRecycle = 'runeRecycle';//（参数：0-10阶）
    // 弟子符文激活
    export const Hero_activeRuneExProperty = 'activeRuneExProperty';//（参数：符文的64id和类型0背包1身上）
    // 弟子符文属性配置
    export const Hero_clickRunePreperty = 'clickRunePreperty';//（参数：符文阶数，符文穿戴位置）
    // 弟子符文交換
    export const Hero_exchangeRuneproperty = 'exchangeRuneproperty';//（参数：firid, firtype, firpos, secid, sectype, secpos--64id|类型：0 包裹，1身上|位置：第几条属性）
    // 符文回收属性
    export const Hero_runeRecycleConfig = 'runeRecycleConfig';

    /*********************************资质天赋******************** */

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
    export const JS_DragonSoulPanel = 'DragonSoulPanel';//得到数据curscore：当前经验 isfull:是否满级 score: 最大经验
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
    //路引界面数据
    export const openChuangSongRecord = "openChuangSongRecord";
    //路引增加
    export const addChuangSongRecord = "addChuangSongRecord";
    //路引删除
    export const delChuangSongRecord = "delChuangSongRecord";
    /*********************************菜单******************** */
    //菜单祈福面板
    export const Menu_QiFuClientOpen = "QiFuClientOpen";
    //祈福功能
    export const Menu_QiFu = "QiFu";
    //签到面板
    export const Menu_QianDao_DaKai = "QianDao_DaKai";
    //签到面板补签
    export const Menu_qiandao_buqian = "qiandao_buqian";
    //累计签到领取
    export const Menu_qiandaolingqu = "qiandaolingqu";
    //签到
    export const Menu_QianDao_ZengJia = "QianDao_ZengJia";
    //膜拜城主面板
    export const Menu_WorShipOpen = "WorShipOpen";
    //膜拜城主膜拜or鄙视
    export const Menu_WorshipGetWard = "WorshipGetWard";
    //膜拜城主刷新
    export const Menu_RefreshWard = "RefreshWard";
    //全民竞猜面板
    export const Menu_JingCaiClientOpen = "JingCaiClientOpen";
    //全民竞猜参与竞猜
    export const Menu_JingCai = "JingCai";
    //全民竞猜获奖情况
    export const Menu_JingCaiClientOpenEx = "JingCaiClientOpenEx";

    /*********************************新服活动******************** */
    /**
     * 获取菜单界面的活动state
     */
    export const HuoDongStatus = "HuoDongStatus";
    //新服活动面板
    export const NS_XinFuClientOpen = "XinFuClientOpen";
    //开服竞技
    export const NS_KaiFuJingJiOpen = "KaiFuJingJiOpen";
    //开服竞技领取
    export const NS_KaiFuJingJiGet = "KaiFuJingJiGet";
    //全民boss面板
    export const NS_QuanMingBoss = "QuanMingBoss";
    //全民boss领取
    export const NS_QuanMingBossGet = "QuanMingBossGet";
    //龙城争霸面板
    export const NS_LongChengClientOpen = "LongChengClientOpen";
    //龙城争霸领取
    export const NS_LongChengGet = "LongChengGet";
    /*********************************抽奖******************** */
    //抽奖面板
    export const LD_chouJiangPanel = "chouJiangPanel";
    //藏宝阁
    export const LD_cangbaogeopen = "cangbaogeopen";
    //藏宝阁奖励记录
    export const LD_cangbaoge_getrecord = "cangbaoge_getrecord";//得到数据(record全服奖励记录myrecord我的奖励记录)
    //藏宝阁购买藏宝图
    export const LD_CangbaotuBuy = "CangbaotuBuy";
    //藏宝阁抽奖
    export const cbg_choujiang = "cbg_choujiang";
    //积分兑换面板
    export const LD_BZ_SendPlaneMsg = "BZ_SendPlaneMsg";
    //积分兑换记录积分
    export const LD_DuiHuanSysRecord = "DuiHuanSysRecord";//得到数据(jifen:抽奖积分record:兑换记录)
    //积分兑换
    export const LD_BZ_DuiHuanSys = "BZ_DuiHuanSys";
    //仓库回收
    export const LD_caobaogehuishousys = "caobaogehuishousys";
    //仓库经验丹使用
    export const LD_cangbaogeusejinyan = "cangbaogeusejinyan";
    //仓库全部领取
    export const LD_cangbaoge_lingqu = "cangbaoge_lingqu";
    //仓库物品刷新
    export const LD_storeRefresh = "Refresh";
    //福利转盘面板
    export const LD_FLZP_Plane = "FLZP_Plane";
    //福利转盘抽奖
    export const LD_FLZP_Start = "FLZP_Start";
    //福利转盘领取
    export const LD_FLZP_LinQu = "FLZP_LinQu";
    //在线抽奖面板
    export const LD_ZXCJ_Plane = "ZXCJ_Plane";
    //在线抽奖开始抽奖
    export const LD_ZXCJ_Start = "ZXCJ_Start";
    //在线抽奖全服记录
    export const LD_ZXCJ_list = "ZXCJ_list";
    //在线抽奖领取奖励
    export const LD_ZXCJ_LingQu = "ZXCJ_LingQu";
    //在线抽奖领取宝箱
    export const LD_ZXCJ_LingQu2 = "ZXCJ_LingQu2";
    //幸运抽奖面板
    export const LD_LuckyDrawOpen = "LuckyDrawOpen";
    //幸运抽奖抽取奖励
    export const LD_LuckyDrawGet = "LuckyDrawGet";
    //幸运抽奖领取奖励
    export const LD_Lucky_LinQu = "Lucky_LinQu";
    //幸运抽奖自动抽奖
    export const LD_LuckyDrawGetAll = "LuckyDrawGetAll";
    //幸运抽奖领取标准奖奖励
    export const LD_LuckyDrawExGet = "LuckyDrawExGet";

    /*********************************菜单福利******************** */
    //菜单福利回收面板
    export const FuLi_ZiYuanZhaoHui_Open = "ZiYuanZhaoHui_Open";
    //菜单福利回收领取
    export const FuLi_ZiYuanZhaoHui = "ZiYuanZhaoHui";
    //菜单福利在线奖励
    export const FuLi_zaixiangjiangli_minbandakai = "zaixiangjiangli_minbandakai";//参数(0:openpanel -->getreward:1 2 3 4 5:yuanbao)
    //菜单福利邀请有礼激活
    export const FuLi_xinshouka_other_shiyong = "xinshouka_other_shiyong";
    /*********************************装备相关******************** */
    //玩家装备强化信息（所有Item）
    export const sendEquipIntensify = "sendEquipIntensify";   //无参数
    //玩家装备强化面板信息（单个Item）
    export const IntensifyPanel = "IntensifyPanel";           //参数 type(0:人 1英雄), pos(位置0-9)
    //开始强化
    export const equipIntensify = "equipIntensify"           //参数type(0:人 1英雄), pos(位置0-9) flag(强化15之后，花元宝必定成功)


    //玩家装备  魂石升阶信息（所有Item）
    export const soulStoneLevel = "soulStoneLevel";           //无参数
    //玩家装备  魂石升阶面板信息（单个Item） 
    export const soulStonePanel = "soulStonePanel";           //ntype, pos, step   (1-6球)
    //玩家装备  魂石升阶界面  升级按钮点击时发送
    export const upgradeSoulStone = "upgradeSoulStone";       //ntype, pos, step, flag(0 经验升级，1道具升级)
    //玩家装备  魂石升阶界面  激活按钮点击时发送
    export const SoulStoneActive = "SoulStoneActive";         //ntype,pos,flag(0元宝激活 1道具激活)
    //改变菜单按钮的状态
    export const changeActivityState = "changeMenuState"      //true/false   boolean


    export const legednEquipPanel = "legednEquipPanel";      //传世装备面板信息    pos(位置0-9)
    export const activeLegendEquip = "activeLegendEquip";    //传世装备激活        pos(位置0-9)
    export const advanceLegendEquip = "advanceLegendEquip";  //传世装备进阶        pos(0-9)
    export const legednEquipBaseid = "legednEquipBaseid";    //传世装备ID

    export const rxEquipCompound = "rxEquipCompound";        //装备合成（要合成的id）

    export const JingCaiSendShow = "JingCaiSendShow";        //精彩活动面板;

    export const Active1 = "EverydayBuyPanel";     //每日必买      面板        其他接口：购买
    export const Active2 = "CZJJ_OpenPlane";       //超值理财      面板        其他接口：购买、领取
    export const Active3 = "ChaoZhiLC_Open";       //成长基金      面板        其他接口：购买、领取
    export const Active4 = "ConsumeOpen";          //消费排行      面板
    export const Active5 = "LimitTimePanicBuyPanel"; //限时抢购       面板        其他接口：购买
    export const Active7 = "RechargeOpen";         //充值排行        面板
    export const Active10 = "RechargeGiftPanel"    //累计充值       面板         其他接口：领取
    export const Active12 = "ComposeEquipPanel";    //装备箱合成      面板        其他接口：领奖
    export const Active13 = "ContinueRechargePanel";//连续充值        面板        其他接口：领取
    export const Active15 = "FLZP_Plane";           //福利转盘        面板        其他接口：转动、领取次数奖励
    export const Active16 = "MeiRiChongZhiOpen";    //每日充值        面板        其他接口：领取
    export const Active17 = "MRLQ_Plane";           //每日领取        面板        其他接口：领取
    export const Active18 = "ConsumeGiftPanel";     //消费豪礼        面板        其他接口：领奖
    export const Active19 = "NationalResourcePanel";//全民官印/资源线  面板        其他接口：领奖
    export const Active24 = "ResourceGiftPanel";    //官印、资源线好礼 面板        其他接口
    export const Active32 = "ExchangePointPanel";   //积分兑换         面板       其他接口：领奖
    export const Active34 = "FuDaiOpen";            //福袋抽奖、档次    面板       其他接口：额外奖励、抽奖、领取额外奖励
    export const Active35 = "QuanMingLiBaoOpen";    //全民礼包         面板        其他接口：领取
    export const Active38 = "ZXCJ_Plane";           //在线抽奖、转盘    面板       其他接口：转盘、领取、领取档次奖励
    export const Active39 = "OneDayRechargePanel";  //单日充值         面板        其他接口：领取
    export const Active14 = "ExchangeGiftPanel"     //兑换豪礼      面板         其他接口：领取
    export const Active41 = "MeiRiShouChongOpen";   //每日首充      面板         其他接口：领取
    export const Active33 = "MeiRiTeHuiPanel"       //每日特惠      面板         其他接口：领取
    export const Active36 = "MZJJ_OpenPlane"        //每周基金      面板         其他接口：领取
    export const Active9 = "ShenMi_Open";          //神秘商店      面板         其他接口：刷新  购买
    export const Active37 = "XFYLPanel";           //消费有礼物      面板         其他接口：普通获取，奖励领取

    export const Active100 = "LimitTimeGiftBagPanel"  //限时礼包   面板         其他接口：购买
    export const Active30 = "DBCZ_Plane"             //单笔充值   面板         其他接口：领取
    // export const Active

    export const Active25 = "ResourceGiftPanel";    //龙魂好礼 面板        其他接口
    export const Active26 = "ResourceGiftPanel";    //勋章好礼 面板        其他接口
    export const Active27 = "ResourceGiftPanel";    //光翼好礼 面板        其他接口
    export const Active28 = "ResourceGiftPanel";    //转生好礼 面板        其他接口

    export const Active20 = "NationalResourcePanel";    //全民龙魂 面板        其他接口
    export const Active21 = "NationalResourcePanel";    //全民勋章 面板        其他接口
    export const Active22 = "NationalResourcePanel";    //全民光翼 面板        其他接口
    export const Active23 = "NationalResourcePanel";    //全民转生 面板        其他接口

    export const GetXFYLJiChuAward = "GetXFYLJiChuAward"  //消费有礼基础奖励
    export const GetXFYLAward = "GetXFYLAward"  //消费有礼，累计奖励     index:  order


    export const MeiRiChongZhiGet = "MeiRiChongZhiGet"  //领取每日充值的奖励   16
    export const GetConsumeGiftAward = "GetConsumeGiftAward"//领取消费豪礼    18
    export const LimitTimePanicBuy = "LimitTimePanicBuy"  //限时购买 购买
    export const GetExchangePointAward = "GetExchangePointAward"  //积分兑换  兑换
    export const GetComposeEquipAward = "GetComposeEquipAward" //装备合成 合成
    export const MeiRiShouChongGet = "MeiRiShouChongGet";     //每日首充
    export const GetNationalResourceAward = "GetNationalResourceAward";     //全民资源线
    export const GetExchangeGiftAward = "GetExchangeGiftAward";     //领取兑换豪礼
    export const GetContinueRechargeAward = "GetContinueRechargeAward"; //连续充值领奖
    export const MZJJ_LingQu = "MZJJ_LingQu"; //每周基金领取
    export const ShenMi_ShuaXin = "ShenMi_ShuaXin"  //神秘商店刷新
    export const ShenMi_Buy = "ShenMi_Buy"          //神秘商店购买
    export const GetOneDayRechargeAward = "GetOneDayRechargeAward"  //单日充值领取
    export const MRLQ_LingQu = "MRLQ_LingQu";     //每日领取  领取
    export const EverydayBuyPacks = "EverydayBuyPacks";     //每日必买  购买
    export const BuyLimitTimeGiftBag = "BuyLimitTimeGiftBag";     //限时礼包  购买
    export const GetRechargeGiftAward = "GetRechargeGiftAward";     //累计充值  领取
    export const QuanMingLiBaoGet = "QuanMingLiBaoGet";     //全民礼包  领取

    export const ChaoZhiLC_LingQu = "ChaoZhiLC_LingQu";     //成长基金  领取
    export const ChaoZhiLC_Buy = "ChaoZhiLC_Buy";     //成长基金  购买

    export const DBCZ_LingQu = "DBCZ_LingQu";         //单笔充值   领取







    export const FuDaiChouJiang = "FuDaiChouJiang";   //福袋抽奖开启按钮
    export const SendExItemPlane = "SendExItemPlane";   //福袋抽奖额外奖励面板
    export const FuDaiGet = "FuDaiGet";   //福袋抽奖额外奖励    领取

    export const leijidenglu_minbandakai = "leijidenglu_minbandakai"  //累计登录(0:打开面板 ，大于0，代表ID并领取)




    export const cashPanel = "cashPanel";     //充值panel;
    export const test_sendrmb = "test_sendrmb";     //充值Button;

    export const EquipSoulChain = "EquipSoulChain";  //装备等级套装Effid

    export const zhuangbeihuishousys = "zhuangbeihuishousys";   //回收装备

    export const GetMeiRiTeHuiAward = "GetMeiRiTeHuiAward"      //每日特惠领取

    export const VIP_OpenPlane = "VIP_OpenPlane";    //VIP特权
    export const VIP_LingQu = "VIP_LingQu";    //VIP特权  领取奖励
    export const VIP_ChangePlane = "VIP_ChangePlane";    //VIP特权  切页

    export const ZGTQ_Open = "ZGTQ_Open";    //月卡界面
    export const ZGTQ_Buy = "ZGTQ_Buy";    //月卡  购买
    export const ZGTQ_LingQu = "ZGTQ_LingQu";    //月卡  领取奖励

    export const chaozhiopen = "chaozhiopen";         //超值礼包(促销)      面板
    export const ChaoZhiBuy = "ChaoZhiBuy"        //超值礼包(促销)      领取

    export const TeHuiIndex = "TeHuiIndex";       //特惠礼包   面板
    export const TeHuiClientOpen = "TeHuiClientOpen";       //特惠礼包   选择其中一个显示    面板
    export const TeHuiBuy = "TeHuiBuy";       //特惠礼包   购买

    export const WorthGiftBagPanel = "WorthGiftBagPanel";  //特选礼包    面板
    export const BuyWorthGiftBag = "BuyWorthGiftBag";      //特选礼包    购买


    export const FirstChargeOpen = "FirstChargeOpen";  //首充面板；
    export const FirstChargeGet = "FirstChargeGet";  //首充面板   领取

    export const ExpRefineOpen = "ExpRefineOpen"; //经验炼制  界面
    export const ExpRefining = "ExpRefining";     //经验炼制  index (1人物 2英雄)



    export const tubiaofasong = "tubiaofasong";  //菜单界面的动态切图的刷新，实时推送



}

/**
 * 返回结构体
 */
module ProtoCmd {
    /**
     * 活动status返回data
     */
    export interface itf_MENU_ActiveStatus {

    }


    /**
     * 活动面板
     */
    export interface itf_ACT_JingCaiSendShow {
        id: number;
        name: string;
        index?: number;

    }
    /**
     * 传世面板信息
     */
    export interface itf_JS_legednEquipPanel {

    }
    /**
     * soulStoneLevel 升阶所有信息
     */
    export interface itf_JS_soulStoneLevel {
        herolvl: { [index: number]: Object };
        openlvl: { [index: number]: Object };  //pbj  玩家的解锁状态  hbj  弟子的解锁状态  item:index 解锁需要的道具ID  num 解锁需要的道具数量   yuanbao  解锁需要的元宝数
        playerlvl: { [index: number]: Object };
        soulchaintab: { [index: number]: Object }
    }

    /**
     * 单个装备面板的信息
     */
    export interface itf_JS_equipPanelMsg {
        count: number;    //升级需要的数量
        curexp: number;   //当前幸运值经验
        maxexp: number;   //升级所需的经验
        gold: number;     //强化所需要的金币数
        itemid: number;   //强化所需要的消耗品ID
        lvl: number      //当前装备等级：星星的数量根据等级来定，1级 = 1星 
    }
    /**
     * 装备强化信息
     */


    export interface itf_JS_equipIntensifyMessage {
        herojson: Object;
        playerjson: Object;
        sooulchaintab: Object
    }

    /**
     * 路引数据
     */
    export interface itf_Main_openChuangSongRecord {
        datatab: { [tabid: string]: { [index: number]: { idx: number, roomID: number } } };//房间信息{tabid:{index:roomid}} 1:{idx: 1, roomID: 10009}
        recordtab: { [index: string]: { viplvl: number } }//解锁VIP等级{}
    }

    /**
     * 请求介绍手册的解锁状态   返回数据结构 {[index:number]:number}    
     */
    export interface itf_ZhiNan_getIntroductionInfo {

    };

    /**
     * 天鉴数据
     */
    export interface itf_TianJian_SpecialRingPanel {
        cfgtab: { [index: number]: Object };  //详细数据
        status: { [index: number]: number }   //解锁情况
    };

    /**
     * 四格，9宫 数据
     */
    export interface itf_JS_birthdateAndCompellation {
        brithdata_one: { [index: number]: Object };  //八字_1
        brithdata_two: { [index: number]: Object };  //八字_2
        compellation: { [index: number]: Object };  //四格9宫
        descID: number   //介绍ID
        openday: number   //开服日期
    };

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
        items: { [index: string]: itf_Shop_ShopItem };//刷新道具
        curcount: number//当前次数
        maxcount: number//最大次数
        pricetype: number;//购买货币类型
        binding: number//是否绑定
        curcnt: number//当前购买次数
        limitcnt: number//最大购买次数
        discount: number//折扣
        itemid: number//物品id
        num: number//每组数量
        price: number//价格
        show: number//(是否显示，0为不显示，1为显示)
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
        zztab: any,//资质
        tftab: any,//性格、标签
        TotalZiZhiPoint: number,//天赋总数
    }
    /**
     * 拉取声望信息
     */
    export interface itf_JS_ShengWangInfo {
        damage: number;// 威望效果伤害百分比 
        daydelexp: number;// 每日衰减经验
        effid: number;// 效果ID
        maxexp: number;// 最大声望值
        minexp: number;// 当前声望值
        prestigeid: number;// 称号ID
        rank: any;// 排行榜
        titletab: any//声望头衔信息
    }

    /**
  * 拉取角色天赋
  */
    export interface itf_JS_TalentInfo {
        curscore: number//当前天赋经验值
        isfull: number//是否已满
        itemid: number//天赋id
        itemtab: any//升级天赋所需物品
        score: number//最大天赋经验值
    }

    /**********************************弟子信息************************* */
    /**
     * 弟子基本信息
     */
    export interface itf_Hero_BaseInfo {
        DJS: number//倒计时
        JOB: number//职业
        STATE: number//状态 0未激活1可激活2已激活
    }
    /**
     * 弟子散功转生面板
     */
    export interface itf_Hero_ZhuanShengInfo {
        afterlvl: number//转生前等级
        beforelvl: number//转生后等级
        effid: number//效果id
        maxxw: number//最大修为
        xw: number//当前修为
        xwlvl: number//修为等级
    }
    /**
     * 弟子散功修为面板
     */
    export interface itf_Hero_XiuWeiInfo {
        count: number//每日兑换次数
        exp: number//所需经验
        gold: number//金币数量
        pill: number//修为丹
        superpill: number//超级修为丹
        xw: number//上述条件可兑换的修为
    }
    /**
     * 弟子天赋面板
     */
    export interface itf_Hero_TalentInfo {
        consumetab: any//消耗的天赋魔力
        effidtab: any//效果id
        curduplicate: number//当前重id
        gssecore: number//天赋魔力
        lvltab: any//所有组天赋状态
        maxduplicate: number//当前已开启的最大重id
    }
    /**
     * 弟子武学面板
     */
    export interface itf_Hero_WuXueInfo {
        effid: number//效果ID
        fakeGas: number//当前圆球里真气值
        gas: number//最大真气值
        gold: number//金币数量
        jingMaiLvl: number//经脉等级
        maxfakegas: number//圆球里最大真气值
        nextid: number//下级效果ID
        realGas: number//当前真气值
        skilltab: any //（key为技能id,skilltab[key]为技能开关状态0开1关）
    }
    /**
     * 弟子武学兑换真气面板
     */
    export interface itf_Hero_WuXueGasInfo {
        count: number//兑换次数
        exp: number//所需经验
        gas: number//兑换真气值
        gold: number//所需金币
        oneid: number//所需道具ID1
        twoid: number//所需道具ID2
    }
    /**
     * 武学戾气升级面板
     */
    export interface itf_WX_LiQiUpPanelInfo {
        addpro: number//属性增加数值
        curexp: number//当前经验
        cursoul: number//当前魂力
        lvl: number//魂力等级
        maxexp: number//最大经验
        needexp: number//所需消耗经验
        pos: number//魂力穿戴位置
    }
    /**
  * 武学内息经络
  */
    export interface itf_WX_NeiGongInfo {
        dangqiandengji: number//当前等级
        dangqianneigong: number//当前内功
        dangqianshuxing: string//“内功抵抗=当前属性”
        nghf: number//内功恢复
        xiajishuxing: string//下级属性
        xiaohaoitem: number//当前属性的最大内功
        zongnum: number
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

    export interface itf_FB_MainFBjindu {
        ceng: number,
        curcnt: number,
        item: any
        sec: number,
        star: number,
        tiaojian: string,// 完成条件
        totalcnt: number,
        totalsec: number,
    }

    /**
     * 心魔副本信息
     */
    export interface itf_FB_XinMoInfo {
        index?: number;//索引
        flag: number;//已刷副本次数
        maxcnt: number;//最大刷副本次数
        maxlv: number;//最大等级
        minlv: number;//最小等级
        maxzslv: number;//最大转生等级
        minzslv: number;//最小转生等级
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
        //,montab怪物列表，openlvl开放等级
        montab: any;
        openlvl: number;
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
    /***********************************菜单接口**************************** */
    /**
     * 菜单祈福
     */
    export interface itf_Menu_blessInfo {
        GetGoldNum: number//可得到金币数量
        GetLiJuanNum: number//可得到礼券数量
        GoldCnt: number//金币祈福当前次数
        GoldCritLeftNum: number//金币祈福暴击倍数
        GoldMaxCnt: number//金币祈福最大次数
        GoldNeedYuanBao: number//金币祈福所需元宝
        GoldNum: number////获得金币总数
        LiJuanCnt: number//礼券祈福当前次数
        LiJuanCritLeftNum: number//礼券祈福暴击数
        LiJuanMaxCnt: number//礼券祈福最大次数
        LiJuanNeedYuanBao: number//礼券祈福所需元宝
        LiJuanNum: number//获得礼券总数
    }
    /**
     * 膜拜城主
     */
    export interface itf_Menu_MoBaiInfo {
        guildid: number//膜拜行会ID
        maxcnt: number//最大膜拜次数
        maxmultiple: number//最大倍数
        multab: any//倍数信息 {beishu: 倍数, exp: 当前倍数所获得的经验}
        multiple: number//当前倍数
        name: string//城主名称
        needgold: number//所需金币
        scorn: number//鄙视率
        support: number//膜拜率
        worshipcnt: number//当前膜拜次数
    }
    /**
     * 全民竞猜面板
     */
    export interface itf_Menu_GuessInfo {
        day: number//活动的天数
        jingcai: number//我的竞猜值
        leftsec: number//活动时间
        num: number//参与竞猜人数
        vip: number//我的vip值
    }
    /**
     * 全民竞猜获奖情况
     */
    export interface itf_Menu_GetSituationInfo {
        tab: any// 1: {name: "无玩家", num: 0 }     
    }
    /**
  * 签到
  */
    export interface itf_Menu_SignInInfo {
        buQianNum: number//可补签次数
        curtimetab: { 1: number, 2: number, 3: number }//当前1年2月3日
        firstlogindate: number//初次登陆日期
        history: string//历史签到记录
        items: any//每次签到的物品奖励
        itemtab: any//累计签到奖励
        qiandao: number//今天是否已签到0没签到1已签到
        qiandaonum: 7//已签到总天数
        qiaodaoday: 31//本月总天数
    }
    /***********************************抽奖接口**************************** */
    /**
     * 抽奖面板
     */
    export interface itf_LD_Info {
        id: number//抽奖活动ID
        name: string//抽奖活动名称
    }
    /**
     * 藏宝阁
     */
    export interface itf_LD_CangBaoGeInfo {
        middleItem: any//中间大宝箱信息（binding: 是否绑定, index: 物品ID, num: 物品数量
        score: number//宝藏积分
        sideItem: any//12个物品id
        tips: any//探宝的相关信息( addjifen: 增加积分 cnt: 藏宝图数量huobi_type: 货币类型 need: 所需货币数量)
    }
    /**
     * 福利转盘
     */
    export interface itf_LD_fuliTurnTableInfo {
        idx: number//抽到的物品索引
        lefttime: number//活动倒计时
        cnt: number//可抽奖次数
        desc: string//活动介绍
        max: number//最大抽奖次数
        item: any//物品信息
    }
    /**
     * 在线抽奖
     */
    export interface itf_LD_OnLineDrawInfo {
        exitem: any//宝箱信息（flag:宝箱状态0未开1可开2已开，need：打开宝箱所需抽奖次数）
        idx: number//抽到的物品索引
        lefttime: number//活动倒计时
        cnt: number//可抽奖次数
        introduce: string//活动介绍1
        introduce2: string//活动介绍2
        max: number//最大抽奖次数
        item: any//物品信息
        zaixiantime: number//在线时长
        used: number//已抽奖次数
    }
    /**
     * 幸运抽奖
     */
    export interface itf_LD_LuckDrawInfo {
        idx: number//抽到的物品索引
        extab: any//可领的达标奖相关信息(exitem:any leftcnt:number needcnt: number获得标准奖励还需要的次数)
        item: any//可抽奖的奖励信息
        leftsec: number//活动时间
        showtab: any//达标奖励预览
        text: string//抽奖活动介绍
    }

    /***********************************福利接口**************************** */
    /**
     * 在线奖励
     */
    export interface itf_Fuli_OnLineRewardInfo {
        benzhouyuanbao: number//本周累计元宝
        itemtab: any//宝箱1234相关（ btnStatus: 宝箱状态itemtab：宝箱奖励信息times: 领取时间）
        shangzhouyuanbao: number//下周累计元宝
        status: number//本周在线时长兑换状态
        zaixianshijian: number//今日在线时长
    }
    /***********************************新服活动接口**************************** */
    /**
     * 开服竞技
     */
    export interface itf_NS_sportsInfo {
        item: any//全服排名奖励{1：bind:绑定index:物品IDnum:物品数量,2,3}
        join: any//下方是否达成活动奖励条件{bj:（0没达到1达到了）, lv:等级, item: 奖励物品信息}
        leftsec: number//活动时间
        opendays: number//天数
        rank: any//当前排名{flag:达到条件（0达到了1没达到） 0name: 玩家姓名score:玩家等级}
        ranktype: number//排行榜类型
        str: string//说明
    }
    /**
     * 全民boss
     */
    export interface itf_NS_AllBossInfo {
        bj: number// 达成状态 0未达成1已达成2已领取
        boss: any//boss相关信息
        item: any//奖励信息
        name: string//boss分类
        // 1: { bj: 0, boss: {bj, bossid}, item: {num: 数量, index: 物品id, bind: 是否绑定 }，name：boss分类 }
        // 2: { bj: 0, boss: { … }, item: { … }，name }
        // 3: { bj: 0, boss: { … }, item: { … }，name }
        // 4: { bj: 0, boss: { … }, item: { … } ，name}
        // leftsec: number 活动时间
    }
    /**
     * 龙城争霸
     */
    export interface itf_NS_DragonInfo {
        Bj: number//是否可领取0不可1可领取2已领取
        Item: any //{num: 数量, index: 物品id, bind: 是否绑定 }
        leftsec: number//活动时间
    }
}