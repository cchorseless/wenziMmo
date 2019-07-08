
class GameEngine extends SingletonClass {

    public IsDebug = false;
    /*********************用户基础信息**********************/
    public userInfo: any;                                                         //第三方登陆数据
    public name: string;                                                          //昵称
    public avatarIcon: string;                                                    //头像图片路径
    public openid: string = "";
    public token: string = "";                                                    //微信登陆成功的密匙，使用此内容login
    public legalKey: Array<any> = [];                                             //合法的更改属性的密钥
    public tableState: string = "0";                                              //0 空闲  1，游戏中
    public isSign: boolean = false;                                               //是否已经签到 0未签到
    public serverid: string = "";
    public version: string = "";//版本号

    public serverInfo;                                                            //服务器信息
    public isWss: Boolean = false;                                                // 通讯协议，true:wss://  false:ws://
    public connectIP: string = (true) ? '47.111.178.154' : '192.168.10.187';      // 云服务器 本地服务器
    public connectPort: string = '8001';
    public cdnResUrl: string = '';
    public curData: string = 'Laya_h5';
    public updateHZ: number = 100;                                                      // 客户端玩家跟新更新坐标频率
    public clientType: number = EnumData.CLIENT_TYPE.CLIENT_TYPE_MOBILE;                // 客户端类型
    public isOnInitCallPropertysSetMethods: boolean = true;                             // 在Entity初始化时是否触发属性的set_*事件(callPropertysSetMethods)

    // game配置
    public platform: string = 'Web';                                                    // 小游戏客户端运行平台
    public isGuest: boolean = false;                                                    // 来宾模式，随机一个账号进行服务器登陆
    public reConnectUpper: number = 5;                                                  // 断线连接次数上限

    /***************************end***************************/

    /*********************用户基础配置**********************/
    public isMusic: boolean = true;//音乐开关  
    public isSound: boolean = true;//按键音效
    public lang: any = null;       //语言配置
    /***************************end***************************/

    /*************************用户初始化数据****************** */
    public json;//策划配置表

    /******************************************************** */

    /*************************用户本地数据******************** */

    public chatData = {};//聊天缓存信息
    public chatDataSingleMax = 100;//单个频道聊天缓存信息最大条数
    public chatDataAllMax = 500;//全部频道缓存的信息最大条数目
    public chatDataSmallMax = 50;//小窗缓存的信息最大条目数
    /******************************************************** */
    public packetBytes: Laya.Byte;//全局消息包
    public mainPlayer: GameObject.Player;//玩家
    public equipDB;//装备背包
    public bagItemDB;//物品背包
    private mapId: number;
    private mapGroupKey: string;

    public isReady: boolean = false;
    public isLogin: boolean = false;

    public loginsvrIdType: number;//登陆服务器ID
    public gamesvrIdType: number;
    public tokenCheck: number;
    public logintoken: Laya.Byte;

    public trueZoneid: number = 1;
    public zoneid: number = 1001;//区号
    public svrIndex: number = 0;//服号


    public constructor() {
        super();
        this.packetBytes = new Laya.Byte();
        this.packetBytes.endian = Laya.Byte.LITTLE_ENDIAN;
        this.logintoken = new Laya.Byte();
        this.logintoken.endian = Laya.Byte.LITTLE_ENDIAN;
        this.mainPlayer = new GameObject.Player();
        this.equipDB = {};
        this.bagItemDB = {};
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
    public init(initHandle?: Laya.Handler) {
        console.log("当前引擎版本: ", Laya.version);
        GameApp.Socket.initServer(this.connectIP, this.connectPort, new ByteArrayMsg(), initHandle);
        //外网连接
        // GameApp.Socket.initServer("wss://textmmo.joyleafs.com/S", "8001", new ByteArrayMsg());
        GameApp.ServerListener.init();

    }

    /**
     * 添加背包物品
     */
    public addItemToBag(): void {

    }

    /**
     * 删除背包物品
     */
    public deleteItemBag(): void {

    }
}