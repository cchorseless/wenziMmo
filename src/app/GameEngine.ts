

class GameEngine extends BaseClass {

    public IsDebug = true;
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
    public huancun: any = null;
    public hasLogin: boolean = false;                                                 //是否已经登录过，

    public isWss: Boolean = false;                                                    // 通讯协议，true:wss://  false:ws://
    public remoteServer: Boolean = true;                                              // 服务器调试环境，true :云服务器；false :本地服务器
    public connectIP: string = (this.remoteServer) ? '101.132.174.5' : '192.168.200.64';
    public connectPort: number = 20013;
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


    /******************************************************** */
    public packetBytes: Laya.Byte;
    public mainPlayer: Player;

    private mapId: number;
    private mapGroupKey: string;

    public isReady: boolean = false;
    public isLogin: boolean = false;

    public loginsvrIdType: number;
    public gamesvrIdType: number;
    public tokenCheck: number;
    public logintoken: Laya.Byte;

    public trueZoneid: number = 1;
    public zoneid: number = 1001;
    public svrIndex: number = 0;


    public constructor() {
        super();
        this.packetBytes = new Laya.Byte();
        this.packetBytes.endian = Laya.Byte.LITTLE_ENDIAN;
        this.logintoken = new Laya.Byte();
        this.logintoken.endian = Laya.Byte.LITTLE_ENDIAN;
        this.mainPlayer = new Player();
        // this.mainPlayer.playerAccount = '1@1001';
    }




    public outputCretInfo(name: string, type: number, num: number): void {
        // switch (type) {
        //     case CRET_TYPE.CRET_PLAYER:
        //         this.playerInfo.text = name + ': ' + num;
        //         break;
        //     case CRET_TYPE.CRET_MONSTER:
        //         this.monsterInfo.text = name + ': ' + num;
        //         break;
        //     case CRET_TYPE.CRET_NPC:
        //         this.npcInfo.text = name + ': ' + num;
        //         break;
        //     default:
        //         break;
        // }
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

    public init() {
        console.log("当前引擎版本: ", Laya.version);
        //App.Socket.initServer("192.168.199.240", "8001", new ByteArrayMsg());
        //App.Socket.initServer("192.168.10.109", "8001", new ByteArrayMsg());
        //App.Socket.initServer("192.168.110.107", "8001", new ByteArrayMsg());
        //App.Socket.initServer("47.97.159.179", "8001", new ByteArrayMsg());
        App.Socket.initServer("wss://textmmo.joyleafs.com/S", "8001", new ByteArrayMsg());
        App.MsgProc.init();

    }
}