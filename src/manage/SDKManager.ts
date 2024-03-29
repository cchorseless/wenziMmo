
/**
 * SDK 管理器
 */
class SDKManager extends SingletonClass {
    private _SDK = null;//默认喜扑网络SDK
    private _platform = EnumData.PLATFORM_TYPE.PLATFORM_TYPE_NULL;
    private _functionQuotation = '';
    private _sdkRole = {
        server_id: "-1",            // 区服ID
        server_name: "测试服",       // 区服名称
        role_id: "-1",              // ⻆⾊ID
        role_name: "波哥",           // ⻆⾊名称
        role_level: "-1",           // ⻆⾊等级
        vip_level: "-1",            // VIP等级
        remainder: "-1",            // 剩余元宝
    }


    constructor() {
        super();
        if (Laya.PlatformClass) {
            if (Laya.Browser.onIOS) {
                // IOS
                this._functionQuotation = ':';
                this._platform = EnumData.PLATFORM_TYPE.PLATFORM_TYPE_IOS;
            } else if (Laya.Browser.onAndroid) {
                // IOS
                this._platform = EnumData.PLATFORM_TYPE.PLATFORM_TYPE_ANDROID;
            }
        }

        switch (this._platform) {
            case EnumData.PLATFORM_TYPE.PLATFORM_TYPE_WEB:
                // this._SDK = XipuSDK;
                break;
            case EnumData.PLATFORM_TYPE.PLATFORM_TYPE_IOS:
                this._SDK = Laya.PlatformClass.createClass("SDKGameApi");
                break;
            case EnumData.PLATFORM_TYPE.PLATFORM_TYPE_ANDROID:
                //需要完整的类路径，注意与iOS的不同
                this._SDK = Laya.PlatformClass.createClass("gameapi.SDKGameApi");
                break;
            default:
                this._SDK = null;
                break;
        }
    }

    get SDK(): any {
        return this._SDK;
    }
    set SDK(sdk: any) {
        this._SDK = sdk;
    }

    /**
     * 
     * @param debug //参数设为 true 时 可开启调试模式
     */
    init(debug: any) {
        if (!this.SDK) {
            return;
        }
        console.log(this.SDK)
        switch (this._platform) {
            case EnumData.PLATFORM_TYPE.PLATFORM_TYPE_WEB:
                this.SDK.init(debug)
                break;
            case EnumData.PLATFORM_TYPE.PLATFORM_TYPE_ANDROID:
            case EnumData.PLATFORM_TYPE.PLATFORM_TYPE_IOS:
                {
                    let data = {
                        type: 'action',
                        data: {
                            id: 'init',
                            value: ''
                        }
                    }
                    this.SDK.call("_doAction" + this._functionQuotation, JSON.stringify(data))
                } break;
            default:
                console.warn("平台设置不正确, 请注意...");
                break;
        }
    }

    login() {
        if (!this.SDK) {
            return;
        }
        let self = this;
        this.getIOSDeviceInfo();
        switch (this._platform) {
            case EnumData.PLATFORM_TYPE.PLATFORM_TYPE_WEB:
                this.SDK.login(function (data) {
                    SDKManager.loginCallback(data.openid + '`' + data.timestamp + '`' + data.sign + '`' + data.identity_status);
                });
                break;
            case EnumData.PLATFORM_TYPE.PLATFORM_TYPE_ANDROID:
            case EnumData.PLATFORM_TYPE.PLATFORM_TYPE_IOS:
                {
                    let data = {
                        type: 'action',
                        data: {
                            id: 'login',
                            value: ''
                        }
                    }
                    this.SDK.call("_doAction" + this._functionQuotation, JSON.stringify(data))
                } break;

            default:
                console.warn("平台设置不正确, 请注意...");
                break;
        }
    }

    /**
     * IOS层 会回调此函数
     * @param params openid`timestamp`sign`identity_status
     */
    public static loginCallback(params) {
        let paramArr = params.split('`');
        // console.log("--->>>>>>>>>>>", params);

        var openid = paramArr[0];
        var timestamp = paramArr[1];
        var sign = paramArr[2];
        var identity_status = paramArr[3];
        if (identity_status == 0) {
            console.log('未实名认证');
        }
        if (identity_status == 1) {
            console.log('未成年');
        }
        if (identity_status == 2) {
            console.log('已成年');
        }


        GameApp.HttpManager.postJson('name=verify', { openid: openid, timestamp: timestamp, sign: sign }, (res) => {
            let jsonData = JSON.parse(res);
            if (jsonData.errorCode != 0) {
                console.error('登⼊失败，签名检验失败！')
                return;
            }
            console.log('登录成功！');
            GameApp.MainPlayer.playerAccount = openid + '@' + GameApp.GameEngine.zoneid
            Laya.LocalStorage.setItem('account', openid);
            Laya.LocalStorage.setItem('password', openid);
            PanelManage.openChooseServerPanel();
        })
    }

    // 更新当前sdkrole信息
    updateRoleInfo() {
        this._sdkRole.server_id = GameApp.GameEngine.trueZoneid.toString();
        this._sdkRole.server_name = GameApp.GameEngine.serverName;
        this._sdkRole.role_id = GameApp.GameEngine.mainPlayer.onlyId.toString();
        this._sdkRole.role_name = GameApp.GameEngine.mainPlayer.objName;
        this._sdkRole.role_level = GameApp.GameEngine.mainPlayer.level.toString();
        this._sdkRole.vip_level = GameApp.GameEngine.mainPlayer.viplvl.toString();
        this._sdkRole.remainder = GameApp.GameEngine.mainPlayer.wealth.yuanBao.toString();
    }

    // 创建⻆⾊
    createRole(role_id: any, role_name: any, role_level: any = '-1', vip_level: any = '-1', remainder: any = '-1') {
        if (!this.SDK) {
            return;
        }
        this._sdkRole.server_id = GameApp.GameEngine.trueZoneid.toString();
        this._sdkRole.server_name = GameApp.GameEngine.serverName;
        this._sdkRole.role_id = role_id
        this._sdkRole.role_name = role_name
        this._sdkRole.role_level = role_level
        this._sdkRole.vip_level = vip_level
        this._sdkRole.remainder = remainder

        switch (this._platform) {
            case EnumData.PLATFORM_TYPE.PLATFORM_TYPE_WEB:
                this.SDK.createRole(this._sdkRole);
                break;
            case EnumData.PLATFORM_TYPE.PLATFORM_TYPE_ANDROID:
            case EnumData.PLATFORM_TYPE.PLATFORM_TYPE_IOS:
                {
                    let data = {
                        type: 'action',
                        data: {
                            id: 'createrole',
                            value: '',
                            serverId: this._sdkRole.server_id,
                            serverName: this._sdkRole.server_name,
                            roleId: this._sdkRole.role_id,
                            roleName: this._sdkRole.role_name,
                            roleLevel: this._sdkRole.role_level,
                            vipLevel: this._sdkRole.vip_level,
                            remainder: this._sdkRole.remainder
                        }
                    }
                    this.SDK.call("_doAction" + this._functionQuotation, JSON.stringify(data))
                } break;

            default:
                break;
        }

    }

    // ⻆⾊登陆
    loginRole() {
        if (!this.SDK) {
            return;
        }

        this.updateRoleInfo();

        switch (this._platform) {
            case EnumData.PLATFORM_TYPE.PLATFORM_TYPE_WEB:
                this.SDK.loginRole(this._sdkRole);
                break;
            case EnumData.PLATFORM_TYPE.PLATFORM_TYPE_ANDROID:
            case EnumData.PLATFORM_TYPE.PLATFORM_TYPE_IOS:
                {
                    let data = {
                        type: 'action',
                        data: {
                            id: 'loginrole',
                            value: '',
                            serverId: this._sdkRole.server_id,
                            serverName: this._sdkRole.server_name,
                            roleId: this._sdkRole.role_id,
                            roleName: this._sdkRole.role_name,
                            roleLevel: this._sdkRole.role_level,
                            vipLevel: this._sdkRole.vip_level,
                            remainder: this._sdkRole.remainder
                        }
                    }
                    this.SDK.call("_doAction" + this._functionQuotation, JSON.stringify(data))
                } break;

            default:
                break;
        }


    }

    // ⻆⾊升级
    upgradeRole() {
        if (!this.SDK) {
            return;
        }
        this.updateRoleInfo();

        switch (this._platform) {
            case EnumData.PLATFORM_TYPE.PLATFORM_TYPE_WEB:
                this.SDK.upgradeRole(this._sdkRole);
                break;
            case EnumData.PLATFORM_TYPE.PLATFORM_TYPE_ANDROID:
            case EnumData.PLATFORM_TYPE.PLATFORM_TYPE_IOS:
                {
                    let data = {
                        type: 'action',
                        data: {
                            id: 'levelup',
                            value: '',
                            serverId: this._sdkRole.server_id,
                            serverName: this._sdkRole.server_name,
                            roleId: this._sdkRole.role_id,
                            roleName: this._sdkRole.role_name,
                            roleLevel: this._sdkRole.role_level,
                            vipLevel: this._sdkRole.vip_level,
                            remainder: this._sdkRole.remainder
                        }
                    }
                    this.SDK.call("_doAction" + this._functionQuotation, JSON.stringify(data))
                } break;

            default:
                break;
        }
    }

    // 切换账号
    switchAccount() {
        if (!this.SDK) {
            return;
        }
        let self = this;
        self.SDK.switchAccount(() => {
            // CP 清理⽤户环境
            // ...
            // ... （代码忽略)
            // 显示登录
            self.login();
        });
    }

    /**
     * 支付接口
     * @param price 元
     */
    pay(price: number) {
        if (!this.SDK) {
            return;
        }

        this.updateRoleInfo();
        let amountMin = price * 10 * 10;
        let self = this;
        GameApp.HttpManager.postJson("name=cashOrderNo",
            {
                trueZoneId: GameApp.GameEngine.trueZoneid,
                account: GameApp.GameEngine.mainPlayer.playerAccount,
                username: GameApp.GameEngine.mainPlayer.objName,
                amount: amountMin,
            },
            (res) => {
                let jsonData = JSON.parse(res);

                if (jsonData.errorCode == 0) {
                    switch (this._platform) {
                        case EnumData.PLATFORM_TYPE.PLATFORM_TYPE_WEB:
                            self.SDK.pay(amountMin.toString(), self._sdkRole, jsonData.orderNo, function (data) {
                                if (data.status == self.SDK.PAY_SUCCESS) {
                                    console.warn(data);
                                    console.warn('⽀付结果：⽀付成功!');
                                    GameApp.HttpManager.postJson("name=cashCompleted", {}, (res) => {

                                    })
                                } else if (data.status == self.SDK.PAY_CANCEL) {
                                    console.warn('⽀付结果：⽀付取消!');
                                }
                            }, 'extendString');
                            break;
                        case EnumData.PLATFORM_TYPE.PLATFORM_TYPE_ANDROID:
                        case EnumData.PLATFORM_TYPE.PLATFORM_TYPE_IOS:
                            {
                                let data = {
                                    type: 'action',
                                    data: {
                                        id: 'pay',
                                        orderId: jsonData.orderNo,
                                        price: amountMin
                                    }
                                }
                                this.SDK.call("_doAction" + this._functionQuotation, JSON.stringify(data))
                            } break;

                        default:
                            console.warn("平台设置不正确, 请注意...");
                            break;
                    }
                } else {
                    console.error("error->>>");
                }
            })
    }

    getIOSDeviceInfo() {
        let device = {
            type: 'getdata',
            data: {
                id: 'deviceInfo',
            }
        }
        this.SDK.call("_doAction:", JSON.stringify(device))
    }

    /**
     * IOS 设备信息
     */
    public static IOSDeviceInfo(str: any) {
        console.log(str);
        let infoArr = str.split('`');

        // let pkt = new ProtoCmd.UserDeviceInfo();

        for (let info of infoArr) {
            let keyValue = info.split('=');
            if (keyValue.length == 2) {
                GameApp.GameEngine.deviceInfo[keyValue[0]] = keyValue[1];
            }
            // switch (info[0]) {
            //     case 'deviceName':
            //         pkt.setValue('szSystemHardware', info[1]);

            //         break;
            //     case 'bundlenVersion':
            //         pkt.setValue('szSystemHardware', info[1]);
            //         break;
            //     case 'batteryLevel':
            //         break;
            //     case 'idfa':
            //         pkt.setValue('szIDFA', info[1]);
            //         break;
            //     case 'idfv':
            //         pkt.setValue('szDeviceId', info[1]);
            //         break;
            //     case 'channelLabel':
            //         pkt.setValue('nLoginChannel', info[1]);
            //         break;
            //     case 'deviceAdress':
            //         break;
            //     default:
            //         break;
            // }
        }
        // lcp.send(pkt);
    }

}

