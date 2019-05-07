class App {

    /*
        调试
    */
    public static IsDebug = true;

    /**
     * Socket请求
     * @type {null}
     */
    public static get Socket(): Socket {
        return Socket.getInstance();
    }



    /**
     * 服务器返回的消息处理中心
     * @type {MessageCenter}
     */
    public static get MessageCenter(): MessageCenter {
        return MessageCenter.getInstance(0);
    }

    /**
     * 统一的计时器和帧刷管理类
     * @type {TimerManager}
     */
    public static get TimerManager(): TimerManager {
        return TimerManager.getInstance();
    }

    
    /**
     * 消息通知中心
     */
    private static _notificationCenter: MessageCenter;

    public static get NotificationCenter(): MessageCenter {
        if (App._notificationCenter == null) {
            App._notificationCenter = new MessageCenter(1);
        }
        return App._notificationCenter;
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
     * 初始化函数
     * @constructor
     */
    public static Init(): void {
        //console.log("当前引擎版本: ", egret.Capabilities.engineVersion);

        //App.Socket.initServer("192.168.199.240", "8001", new ByteArrayMsg());
        //App.Socket.initServer("192.168.10.109", "8001", new ByteArrayMsg());
        //App.Socket.initServer("192.168.110.107", "8001", new ByteArrayMsg());
        //App.Socket.initServer("47.97.159.179", "8001", new ByteArrayMsg());
        App.Socket.initServer("wss://textmmo.joyleafs.com/S", "8001", new ByteArrayMsg());

        new MsgProc();
    }
}
