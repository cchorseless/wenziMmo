
class GameEngine extends BaseClass {

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
    }

    public init() {
        App.Init();
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

    
}