/**
 * 调用服务器lua
 */
module ProtoCmd {

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
        limitcnt: number;// 限购数量
        num: number;// 数量
        price: number;// 价格
        pricetype: number;// 货币类型
        show: number;// 是否显示
    }
    /**
     * 热销商店返回数据
     */
    export interface itf_Shop_RefreshResult {
        refreshprice: number;//刷新价格
        items: { itf_Shop_ShopItem };//刷新道具
    }
}