class GameApp {

    /**
     * Socket请求
     * @type {null}
     */
    public static get Socket(): Socket {
        return Socket.getInstance();
    }
    /**
    * 全局事件处理
    */
    public static get LListener(): lcp.LListener {
        return lcp.LListener.getInstance();
    }

    /**
     * GameEngine 游戏主逻辑
     * @returns {GameEngine}
     * @constructor
     */
    public static get GameEngine(): GameEngine {
        return GameEngine.getInstance();
    }

    /**
     * 玩家对象
     */
    public static get MainPlayer(): GameObject.Player {
        return GameApp.GameEngine.mainPlayer;
    }

    /**
     * ServerListener 服务器全局监听器
     */
    public static get ServerListener(): ServerListener {
        return ServerListener.getInstance();
    }

    /**
     * HttpManager
     */
    public static get HttpManager(): HttpManager {
        return HttpManager.getInstance();
    }

    /**
     * xml解析类
     */
    public static get DomUtil(): DomUtil {
        return DomUtil.getInstance();
    }

    public static get SDKManager() : SDKManager {
        return SDKManager.getInstance();
    }
    // /**
    //  * 服务器返回的消息处理中心
    //  * @type {MessageCenter}
    //  */
    // private static _NetMessageCenter: MessageCenter;
    // public static get MessageCenter(): MessageCenter {
    //     if (App._NetMessageCenter == null) {
    //         App._NetMessageCenter = new MessageCenter(0);
    //     }
    //     return App._NetMessageCenter;
    // }

    // /**
    //  * 统一的计时器和帧刷管理类
    //  * @type {TimerManager}
    //  */
    // public static get TimerManager(): TimerManager {
    //     return TimerManager.getInstance();
    // }
    // /**
    //  * 本地消息通知中心
    //  */
    // private static _notificationCenter: MessageCenter;

    // public static get NotificationCenter(): MessageCenter {
    //     if (App._notificationCenter == null) {
    //         App._notificationCenter = new MessageCenter(1);
    //     }
    //     return App._notificationCenter;
    // }
}
