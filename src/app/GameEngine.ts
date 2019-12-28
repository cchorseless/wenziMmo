
class GameEngine extends SingletonClass {

    public IsDebug = true;      //tru 日志打印 false 去日志打印
    /*********************用户基础信息**********************/
    public userInfo: any;                                                         //第三方登陆数据
    public name: string;                                                          //昵称
    public openid: string = "";
    public token: string = "";                                                    //微信登陆成功的密匙，使用此内容login
    public legalKey: Array<any> = [];                                             //合法的更改属性的密钥
    public serverid: string = "";
    public version: string = "1.0.0";//版本号
    public deviceInfo = {}                                                         //设备信息

    public serverInfo;                                                            //服务器信息
    public isWss: Boolean = false;                                                // 通讯协议，true:wss://  false:ws://
    public connectIP: string = (false) ? '47.111.178.154' : '192.168.10.187';      // 云服务器 本地服务器
    public connectPort: string = '8001';
    public trueZoneid: number = 50001;
    public serverName: string = '测试服'
    public zoneid: number = 51001;//区号
    public tradeid: number = 29;
    public svrIndex: number = 0;//服号
    public cdnResUrl: string = '';
    public curData: string = 'Laya_h5';
    public updateHZ: number = 100;                                                      // 客户端玩家跟新更新坐标频率
    public clientType: number = EnumData.CLIENT_TYPE.CLIENT_TYPE_MOBILE;                // 客户端类型

    // game配置
    public isGuest: boolean = false;                                                    // 来宾模式，随机一个账号进行服务器登陆
    public reConnectUpper: number = 5;                                                  // 断线连接次数上限

    /***************************end***************************/

    /*********************用户基础配置**********************/
    public isMusic: boolean = true;//音乐开关  
    public isSound: boolean = true;//按键音效
    public lang: any = null;       //语言配置
    /***************************end***************************/

    /*************************用户初始化数据****************** */

    /******************************************************** */

    /*************************用户本地数据******************** */
    public chatData = {};           //聊天缓存信息
    public chatDataSingleMax = 100; //单个频道聊天缓存信息最大条数
    public chatDataAllMax = 500;    //全部频道缓存的信息最大条数目
    public chatDataSmallMax = 50;   //小窗缓存的信息最大条目数
    /******************************************************** */
    public packetBytes: Laya.Byte;//全局消息包
    public mainPlayer: GameObject.Player;//玩家
    // ****************道具存储*****************
    public equipDB = {};//身上的装备背包
    public equipDBIndex = {};//装备位置索引，用于判定该位置是否有装备{bindex:i64id}
    public bagItemDB = {};//物品背包
    public cangKuDB = {};//仓库背包
    // ****************装备打造必选材料*****************
    public buildEquip;
    /************************地图信息************* */
    public smallMapData: ProtoCmd.itf_MAP_SMALL_INFO;//
    /************************任务信息************ */
    public taskInfo = {};// 所有任务信息
    /************************活跃信息************ */
    public activeInfo = {};// 所有活跃信息
    /**************行会信息********** */
    public allGuildInfo = {};
    /**************Gm************* */
    public GMlvl = null;//GM等级
    /************************抽奖相关信息************ */
    public luckDrawType: boolean = false//幸运抽奖自动抽奖状态
    /************************对白信息************ */

    /***********************新手引导数据********* */
    public questBoolData: Uint8Array = null;
    // 客户端登录状态
    public isReady: boolean = false;
    public isLogin: boolean = false;
    public loginsvrIdType: number;//登陆服务器ID
    public gamesvrIdType: number;
    public tokenCheck: number;
    public logintoken: Laya.Byte;

    //所有活动的状态
    public activityStatus: ProtoCmd.itf_MENU_ActiveStatus = null;
    //轮播页的活动推送
    public turnActivity;

    public curFuBenMsg: ProtoCmd.itf_FUBEN_MESSAGE;

    public zhaiYuanLevels = null;
    public zhaiYuaninfo:ProtoCmd.itf_ZHAIYUAN_INFO = null;



    public fuBenResinfo:{[index:number]:ProtoCmd.itf_FB_ZiYuanOneInfo} = {};



    //服务器开服信息
    public openDay = null;

    //单个装备panel信息
    public equipPanelMsg: ProtoCmd.itf_JS_equipPanelMsg;

    public wuxueDataID = -1;


    public constructor() {
        super();
        this.packetBytes = new Laya.Byte();
        this.packetBytes.endian = Laya.Byte.LITTLE_ENDIAN;
        this.logintoken = new Laya.Byte();
        this.logintoken.endian = Laya.Byte.LITTLE_ENDIAN;
        this.mainPlayer = new GameObject.Player();
        this.initSelf();
    }


    public initSelf(): void {
        this.equipDB = {};
        this.equipDBIndex = {};
        this.bagItemDB = {};
        this.cangKuDB = {};
        if (PanelManage.Main) {
            GameApp.SceneManager.clearViewUI();
        }
    }

    private initMapResource(): void {

    }

    /**
     * 资源组加载完成
     */
    private onResourceLoadComplete(): void {
        this.initModule();
    }

    /**
     * 资源组加载进度
     */
    private onResourceLoadProgress(itemsLoaded: number, itemsTotal: number): void {

    }

    /**
     * 初始化所有模块
     */
    private initModule(): void {
    }
    /**
     * 初始化socket,并添加网络监听
     */
    public init(initHandle: Laya.Handler = null) {
        Log.trace("当前引擎版本: ", Laya.version);
        GameApp.Socket.initServer(this.connectIP, this.connectPort, new ByteArrayMsg(), initHandle);
        //外网连接
        // GameApp.Socket.initServer("wss://textmmo.joyleafs.com/S", "8001", new ByteArrayMsg());
        GameApp.ServerListener.init();
    }

}