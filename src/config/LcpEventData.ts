/**
 * 本地自定义事件
 * by pipixia
 */
module LcpEvent {

    /***************************Socket 事件***************************** */
    /**
    * Socket已经连接上
    * @type {string}
    */
    export const SOCKET_CONNECT: string = "SOCKET_CONNECT";
    /**
     * Socket重新连接上
     * @type {string}
     */
    export const SOCKET_RECONNECT: string = "SOCKET_RECONNECT";
    /**
     * Socket开始重新连接上
     * @type {string}
     */
    export const SOCKET_START_RECONNECT: string = "SOCKET_START_RECONNECT";
    /**
     * Socket已关闭
     * @type {string}
     */
    export const SOCKET_CLOSE: string = "SOCKET_CLOSE";
    /*
     * socket收到消息
     * */
    export const SOCKET_DATA: string = "SOCKET_DATA";
    /**
     * Socket不能连接上
     * @type {string}
     */
    export const SOCKET_NOCONNECT: string = "SOCKET_NOCONNECT";
    /**
     * Socketdebug的消息
     * @type {string}
     */
    export const SOCKET_DEBUG_INFO: string = "SOCKET_DEBUG_INFO";
    /***************************客户端保留事件*************************** */
    export const PANEL_REMOVE: string = 'LCP_PANEL_DISPOSE';//界面销毁事件
    export const SERVER_LIST_FINISH: string = 'SERVER_LIST_FINISH';//拉取服务器列表成功
    export const GAME_INIT_FINISH: string = "GAME_INIT_FINISH";//游戏初始化完成界面
    /**************************玩家数据事件****************************** */
    export const UPDATE_UI_YUANBAO: string = 'UPDATE_UI_YUANBAO';//更新元宝
    export const UPDATE_UI_YUANBAOLOCK: string = 'UPDATE_UI_YUANBAOLOCK';//更新绑定元宝
    export const UPDATE_UI_GOLD: string = 'UPDATE_UI_GOLD';//更新金币
    export const UPDATE_UI_GUILDSCORE: string = 'UPDATE_UI_GUILDSCORE';//更新帮派积分

    export const UPDATE_UI_PLAYER_LEVEL: string = 'UPDATE_UI_PLAYER_LEVEL';//更新玩家等级
    export const UPDATE_UI_PLAYER_EXP: string = 'UPDATE_UI_PLAYER_EXP';//更新玩家经验
    export const UPDATE_UI_PLAYER_POWER: string = 'UPDATE_UI_PLAYER_POWER';//更新玩家战力
    export const UPDATE_UI_PLAYER_ABILITY: string = 'UPDATE_UI_PLAYER_ABILITY';//更新玩家战斗属性


    export const UPDATE_UI_HERO_EXP: string = 'UPDATE_UI_HERO_EXP';//更新英雄经验
    export const UPDATE_UI_HERO_POWER: string = 'UPDATE_UI_HERO_POWER';//更新英雄战力
    export const UPDATE_UI_HERO_ABILITY: string = 'UPDATE_UI_HERO_ABILITY';//更新玩家战斗属性
    export const UPDATE_UI_LIANQI_CHUANSHI_UI: string = 'UPDATE_UI_LIANQI_CHUANSHI_UI';//更新装备界面

    // ----------------------场景内------------------------
    // 更新NPC属性
    // export const 
    // 更新所在位置信息
    export const UPDATE_UI_PLACE_DES: string = 'UPDATE_UI_PLACE_DES';


}