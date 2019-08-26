/**
 * 调用服务器lua
 */
module ProtoCmd {

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
    export const SHOP_UpdateItemList = 'openMallLable';// (type:商城类型,subtype:商店子类型=0（0无子ID，从1开始）)
    // 商店购买物品
    export const SHOP_BuyItem = 'buyMallItem';//(type,subtype, idx, num)
}