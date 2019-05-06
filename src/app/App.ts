/**
 * Created by yangsong on 2014/11/22.
 */
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
     * 调试工具
     * @type {DebugUtils}
     */
    public static get DebugUtils(): DebugUtils {
        return DebugUtils.getInstance();
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
     * 日期工具类
     * @type {DateUtils}
     */
    public static get DateUtils(): DateUtils {
        return DateUtils.getInstance();
    }

    /**
     * 数学计算工具类
     * @type {MathUtils}
     */
    public static get MathUtils(): MathUtils {
        return MathUtils.getInstance();
    }

    /**
     * 随机数工具类
     * @type {RandomUtils}
     */
    public static get RandomUtils(): RandomUtils {
        return RandomUtils.getInstance();
    }


    /**
     * Stage操作相关工具类
     */
    public static get StageUtils(): StageUtils {
        return StageUtils.getInstance();
    }

    /**
     * Effect工具类
     */
    public static get EffectUtils(): EffectUtils {
        return EffectUtils.getInstance();
    }

    /**
     * 字符串工具类
     */
    public static get StringUtils(): StringUtils {
        return StringUtils.getInstance();
    }


    /**
     * 设备工具类
     */
    public static get DeviceUtils(): DeviceUtils {
        return DeviceUtils.getInstance();
    }

    /**
     * 引擎扩展类
     */
    public static get EgretExpandUtils(): EgretExpandUtils {
        return EgretExpandUtils.getInstance();
    }

    /**
     * 键盘操作工具类
     */
    public static get KeyboardUtils(): KeyboardUtils {
        return KeyboardUtils.getInstance();
    }

    /**
     * 资源加载工具类
     */
    public static get ResourceUtils(): ResourceUtils {
        return ResourceUtils.getInstance();
    }

    /**
     * RenderTextureManager
     */
    public static get RenderTextureManager(): RenderTextureManager {
        return RenderTextureManager.getInstance();
    }

    /**
     * TextFlow
     */
    public static get TextFlowMaker(): TextFlowMaker {
        return TextFlowMaker.getInstance();
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
     * 分帧处理类
     * @returns {any}
     * @constructor
     */
    public static get DelayOptManager(): DelayOptManager {
        return DelayOptManager.getInstance();
    }

    /**
     * 数组工具类
     * @returns {any}
     * @constructor
     */
    public static get ArrayUtils(): ArrayUtils {
        return ArrayUtils.getInstance();
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
     * MainPanel 游戏主面析
     * @returns {GameEngine}
     * @constructor
     */
    public static get MainPanel(): MainPanel {
        return MainPanel.getInstance();
    }
    /**
     * 初始化函数
     * @constructor
     */
    public static Init(): void {
        console.log("当前引擎版本: ", egret.Capabilities.engineVersion);

        //App.Socket.initServer("192.168.199.240", "8001", new ByteArrayMsg());
        //App.Socket.initServer("192.168.10.109", "8001", new ByteArrayMsg());
        //App.Socket.initServer("192.168.110.107", "8001", new ByteArrayMsg());
        //App.Socket.initServer("47.97.159.179", "8001", new ByteArrayMsg());
        App.Socket.initServer("wss://textmmo.joyleafs.com/S", "8001", new ByteArrayMsg());

        new MsgProc();
    }
}
