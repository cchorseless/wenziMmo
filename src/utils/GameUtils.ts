/**
 * by fany 2015 7.5
 * pipixia改动  2018.3.14
 * (c) copyright 2015 - 2035
 * All Rights Reserved.
 */

class GameUtils {
    private static _instance: GameUtils = null;
    private isComXls: boolean = false;
    public reConnectTimes: number = 0;//断线重连次数
    public isKicked: boolean = false;//是否被服务器踢掉
    public constructor() {
        if (GameUtils._instance) {
            throw new Error("Instance is alreally exist");
        }
    }
    public static getInstance(): GameUtils {
        let Class: any = this;
        if (!Class._instance) {
            Class._instance = new Class();
        }
        return Class._instance;
    }
    public static resert(): void {
        GameUtils._instance = null
    }
    public async initGame() {
        // 策划配置加载                         
        GlobalData.json = await ResManage.loadJSON(ResData.JsonRes.AllClientData);
        //初始化并运行KBE插件
        this.kbeRun();
        //注册关于登陆方面的事件
        this.initKbeEvent();
        //登录管理（登录、第三方登录），登陆完成后调用UpdateAccountFinished
        this.platformLogin();
    }
    private kbeRun(): void {
        KBEngine.destroy();
        let args = new KBEngine.KBEngineArgs();
        args.ip = GlobalData.connectIP;
        args.port = GlobalData.connectPort;
        args.clientType = GlobalData.clientType;
        args.updateHZ = GlobalData.updateHZ;
        args.isWss = GlobalData.isWss;
        args.remoteServer = GlobalData.remoteServer;
        args.isOnInitCallPropertysSetMethods = GlobalData.isOnInitCallPropertysSetMethods;
        KBEngine.create(args);
    }
    private initKbeEvent(): void {
        // 游戏login成功，初始化加载,更新Account完成
        KBEngine.Event.register("UpdateAccountFinished", GameUtils.getInstance(), "UpdateAccountFinished");
        // 登陆login失败
        KBEngine.Event.register("onLoginFailed", GameUtils.getInstance(), "onLoginFailed");
        // 登陆base失败
        KBEngine.Event.register("onLoginBaseappFailed", GameUtils.getInstance(), "onLoginBaseappFailed");
        // 与服务器失去链接
        KBEngine.Event.register("onDisconnected", GameUtils.getInstance(), "onDisconnected");
        // 被服务器踢掉
        KBEngine.Event.register("onKicked", GameUtils.getInstance(), "onKicked");
        // 创建角色
        KBEngine.Event.register("onCreateAccountResult", GameUtils.getInstance(), "onCreateAccountResult");
        // 断线重连失败
        KBEngine.Event.register("onReloginBaseappFailed", GameUtils.getInstance(), "onReloginBaseappFailed");
        // 断线重连成功
        KBEngine.Event.register("onReloginBaseappSuccessfully", GameUtils.getInstance(), "onReloginBaseappSuccessfully");
        // 客户端KBENGINE插件版本与服务器不匹配，热更新插件
        KBEngine.Event.register("onVersionNotMatch", GameUtils.getInstance(), "onVersionNotMatch");
        // 客户端版本不匹配，热更新客户端界面资源逻辑
        KBEngine.Event.register("onScriptVersionNotMatch", GameUtils.getInstance(), "onScriptVersionNotMatch");
        // 注册onEnterWorld事件
        KBEngine.Event.register("onEnterWorld", GameUtils.getInstance(), "onEnterWorld");
        // 注册onLeaveWorld事件
        KBEngine.Event.register("onLeaveWorld", GameUtils.getInstance(), "onLeaveWorld");
        // 注册onEnterSpace事件
        KBEngine.Event.register("onEnterSpace", GameUtils.getInstance(), "onEnterSpace");
        // 注册onLeaveSpace事件
        KBEngine.Event.register("onLeaveSpace", GameUtils.getInstance(), "onLeaveSpace");
    }
    /*************************KBE模块回调函数******************************** */
    private onLoginFailed(msg): void {
        console.log('登陆Login失败')
        let code = msg[0]
        let des = KBEngine.app.serverErrs[code].descr
        TipsManage.showTips(des)
        lcp.LListener.getInstance().event(new lcp.LEvent(LcpEvent.GAME_INIT_FINISH, false));
    }
    private onLoginBaseappFailed(msg): void {
        console.log('登陆BaseApp失败')
        let code = msg[0]
        let des = KBEngine.app.serverErrs[code].descr
        TipsManage.showTips(des)
    }
    private onDisconnected(): void {
        console.log('与服务器断开链接了');
        // 被服务器踢掉退出游戏
        if (this.isKicked) {
            GlobalData.hasLogin = false;
        }
        // 打开断线重连界面
        PanelManage.openServerErrorPanel();
        // 已经登陆则尝试短线重现
        this.reConnect()
    }
    private onKicked(msg): void {
        this.isKicked = true;
        TipsManage.showTips('被服务器踢掉了，请重新启动游戏')
    }
    private onCreateAccountResult(msg): void {
        let code = msg[0]
        let data = msg[1]
        let des = KBEngine.app.serverErrs[code].descr
        TipsManage.showTips(des)
    }
    private onReloginBaseappFailed(msg): void {
        let code = msg[0]
        let des = KBEngine.app.serverErrs[code].descr
        // 尝试次数小于上限，继续连接
        GlobalData.hasLogin = this.reConnectTimes <= GlobalData.reConnectUpper;
        // 断线重连
        this.reConnect()
    }
    private onReloginBaseappSuccessfully(): void {
        this.reConnectTimes = 0;
        GlobalData.hasLogin = true;
        TipsManage.showTips('断线重连成功');
        // 抛出事件成功
        lcp.LListener.getInstance().event(new lcp.LEvent(LcpEvent.GAME_INIT_FINISH, true));

    }
    private onVersionNotMatch(msg): void {
        let clientVersion = msg[0]
        let serverVersion = msg[1]
    }
    private onScriptVersionNotMatch(msg): void {
        let clientScriptVersion = msg[0]
        let serverScriptVersion = msg[1]
    }
    private onEnterWorld(msg): void {
        let entity = msg[0];
        lcp.LListener.getInstance().event(new lcp.LEvent("Entity.onEnterWorld", entity))
    }
    private onLeaveWorld(msg): void {
        let entity = msg[0];
        lcp.LListener.getInstance().event(new lcp.LEvent("Entity.onLeaveWorld", entity))
    }
    private onEnterSpace(msg): void {
        let entity = msg[0];
        lcp.LListener.getInstance().event(new lcp.LEvent("Entity.onEnterSpace", entity))
    }
    private onLeaveSpace(msg): void {
        let entity = msg[0];
        lcp.LListener.getInstance().event(new lcp.LEvent("Entity.onLeaveSpace", entity))
    }
    /**
     * 断线重连
     */
    private reConnect(): void {
        console.log('重新连接中')
        if (GlobalData.hasLogin) {
            console.log('重连中~~~~~')
            this.reConnectTimes += 1;
            Laya.timer.once(1000, this, () => { KBEngine.Event.fire(Protocol.Re_ReqLogin) })
        }
        else {
            console.log('重连失败')
            // 抛出事件报错
            lcp.LListener.getInstance().event(new lcp.LEvent(LcpEvent.GAME_INIT_FINISH, false));
        }

    }
    /**
     * 平台登陆管理
     */
    private async platformLogin() {
        // 随机的名字
        let accountName = RandomUtils.randomName(8);
        // 平台信息
        GlobalData.platform = GlobalData.platform || PlatformManage.getPlatform();
        // 登陆时附带平台数据
        let data = { platform: GlobalData.platform }
        // 第三方平台登陆授权
        switch (GlobalData.platform) {
            // 微信小游戏授权登陆功能
            case 'WeiXin':
                GlobalData.token = await PlatformManage.WxPlatform.login();
                // 微信登陆登陆成功
                if (GlobalData.token) {
                    // 获取用户授权
                    PlatformManage.WxPlatform.getUserInfo((res) => {
                        GlobalData.userInfo = res.userInfo;
                        lcp.send(Protocol.ReqLogin, [GlobalData.token, "12345678", JSON.stringify(data)]);
                    });
                }
                else {
                    // 抛出事件报错
                    lcp.LListener.getInstance().event(new lcp.LEvent(LcpEvent.GAME_INIT_FINISH, false));
                }
                break;
            // 单机版本
            case 'DanJi':
                lcp.LListener.getInstance().event(new lcp.LEvent(LcpEvent.GAME_INIT_FINISH, true));
                break;
            // 默认登陆方式
            default:
                PanelManage.openLoginPanel();
                break;
        }

    }
    /**
     * 更新account
     */
    private UpdateAccountFinished(): void {

        console.log('更新Account')
        // 游戏login成功，初始化加载,更新Account完成
        GlobalData.account = KBEngine.app.player();
        KBEngine.Event.deregister("UpdateAccountFinished", GameUtils.getInstance());
        KBEngine.Event.register("Update" + GlobalData.avatarType + "Finished", GameUtils.getInstance(), "UpdateAvatarFinished");
        // 拉取服务器列表，角色信息列表，游戏公告,游戏版本号
        lcp.send(Protocol.GetAppServerInfo, null, this.GetAppServerCB.bind(this));
    }
    /**
     * 拉取服务器列表信息
     * @param msg 
     */
    private GetAppServerCB(msg): void {
        let code = msg.code;
        if (code == Protocol.SERVER_SUCCESS) {
            // 同步到本地信息
            GlobalData.AppServerInfo = JSON.parse(msg.data);
            // 服务器列表更新完成,通知登陆界面更新界面
            lcp.LListener.getInstance().event(new lcp.LEvent(LcpEvent.SERVER_LIST_FINISH, true));
        }
        else {
            TipsManage.showTips('拉取服务器列表失败');
            // 拉取服务器列表失败
            lcp.LListener.getInstance().event(new lcp.LEvent(LcpEvent.SERVER_LIST_FINISH, false));
        }
    }

    // 更新完成avatar属性的回调
    private async UpdateAvatarFinished() {
        KBEngine.Event.deregister("Update" + GlobalData.avatarType + "Finished", GameUtils.getInstance());
        // 初始化服务器主动消息推送的监听器
        ServerListenerUtils.getInstance().init();
        // 更新同步到全局变量
        let initResult = await this.initGlobalData();
        // 同步全局属性完成回调,抛出事件可以进入游戏了
        lcp.LListener.getInstance().event(new lcp.LEvent(LcpEvent.GAME_INIT_FINISH, initResult && GlobalData.json));
    }
    // 初始化全局属性
    public initGlobalData(): Promise<any> {
        return new Promise(
            async (resolve, reject) => {
                // 登陆成功
                GlobalData.hasLogin = true;
                // 重置连接次数
                this.reConnectTimes = 0;
                // 同步角色实体
                GlobalData.avatar = KBEngine.app.player();
                // 请求背包数据
                lcp.send(Protocol.InitClientData, null, (data) => {
                    if (data.code == Protocol.SERVER_SUCCESS) {
                        let _data = JSON.parse(data.data)
                        resolve(true);
                    }
                    else {
                        // 数据同步失败
                        resolve(false);
                    }
                })
            })
    }




}

