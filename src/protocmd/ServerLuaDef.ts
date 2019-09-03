/**
 * 调用服务器lua
 */
module ProtoCmd {
    /********************************物品使用***************** */
    export const ITEM_LoopUseItem = 'LoopUseItem';//批量使用物品
    /*****************************充值********************** */
    // 正常充值界面
    export const CZ_chongzhidialog = 'chongzhidialog';

    // 首冲界面
    export const CZ_weichongzhidialog = 'weichongzhidialog';

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
    // 小地图信息
    export const MAP_Get_ALLROOM_INFO = 'getAllMinMapStatus';//获取所有小地图信息

    /*****************************任务相关********************* */
    // 任务刷新星级
    export const TASK_REFRESH_XINGJI = 'huanrenwu_shuaxingxingji';// 任务刷新星级
    // 开始触发主线任务
    export const TASK_GET_FIRST_MAINTASK = 'HuangYingJieMian_QianDuan';// 触发主线任务

    /*****************************剧情相关*************************** */

    // 拉取自己的剧情相关信息
    export const JQ_GET_JQ_SELF_INFO = 'getSelfJuQingInfo';

    // 拉取剧情篇章目录
    export const JQ_GET_JQ_PIANZHANG = 'getJuQingPianZhang';

    // 剧情章节目录:篇章ID
    export const JQ_GET_JQ_ZHANGJIE = 'getJuQingCharpter';

    // 剧情详情:章节ID
    export const JQ_GET_JQ_JuQingInfo = 'getJuQingInfo';

    // 阅读剧情:章节ID
    export const JQ_GET_JQ_readJuQing = 'readJuQing';

    // VIP跳剧情:章节ID
    export const JQ_GET_JQ_vipSkipJuQing = 'vipSkipJuQing';

    // 领取剧情奖励:章节ID
    export const JQ_GET_JQ_getJuQingBaseReward = 'getJuQingBaseReward';

    // 领取进度奖励:章节ID,对白ID
    export const JQ_GET_JQ_getJuQingReward = 'getJuQingReward';

    // 打开奖励面板
    export const JQ_GET_JQ_openJuQingBaseReward = 'openJuQingBaseReward';

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
    /********************************************剧情*************************** */
    export interface itf_JUQING_SELFINFO{
        dbid:number;// 对白ID
        pzid:number;// 篇章ID
        zjid:number;// 章节ID
    }

}