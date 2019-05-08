class App {

    /*
        调试
    */
    public static IsDebug = true;

    /*********************用户基础信息**********************/
    public static userInfo: any;                                                         //第三方登陆数据
    public static name: string;                                                          //昵称
    public static avatarIcon: string;                                                    //头像图片路径
    public static openid: string = "";
    public static token: string = "";                                                    //微信登陆成功的密匙，使用此内容login
    public static legalKey: Array<any> = [];                                             //合法的更改属性的密钥
    public static tableState: string = "0";                                              //0 空闲  1，游戏中
    public static isSign: boolean = false;                                               //是否已经签到 0未签到
    public static serverid: string = "";
    public static version: string = "";//版本号

    public static serverInfo;                                                            //服务器信息
    public static huancun: any = null;
    public static hasLogin: boolean = false;                                                 //是否已经登录过，

    public static isWss: Boolean = false;                                                    // 通讯协议，true:wss://  false:ws://
    public static remoteServer: Boolean = true;                                              // 服务器调试环境，true :云服务器；false :本地服务器
    public static connectIP: string = (App.remoteServer) ? '101.132.174.5' : '192.168.200.64';
    public static connectPort: number = 20013;
    public static cdnResUrl: string = '';
    public static curData: string = 'Laya_h5';
    public static updateHZ: number = 100;                                                      // 客户端玩家跟新更新坐标频率
    public static clientType: number = EnumData.CLIENT_TYPE.CLIENT_TYPE_MOBILE;                // 客户端类型
    public static isOnInitCallPropertysSetMethods: boolean = true;                             // 在Entity初始化时是否触发属性的set_*事件(callPropertysSetMethods)

    // game配置

    public static platform: string = 'Web';                                                    // 小游戏客户端运行平台
    public static isGuest: boolean = false;                                                    // 来宾模式，随机一个账号进行服务器登陆
    public static reConnectUpper: number = 5;                                                  // 断线连接次数上限

    /***************************end***************************/

    /*********************用户基础配置**********************/
    public static isMusic: boolean = true;//音乐开关  
    public static isSound: boolean = true;//按键音效
    public static lang: any = null;       //语言配置
    /***************************end***************************/

    /*************************用户初始化数据****************** */
    public static json;//策划配置表

    /******************************************************** */

    /*************************用户本地数据******************** */


    /******************************************************** */

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
