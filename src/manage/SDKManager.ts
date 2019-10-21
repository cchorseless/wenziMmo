
/**
 * SDK 管理器
 */
class SDKManager extends SingletonClass {
    private _sdkRole = {
        server_id: "-1",            // 区服ID
        server_name: "测试服",       // 区服名称
        role_id: "-1",              // ⻆⾊ID
        role_name: "波哥",           // ⻆⾊名称
        role_level: "-1",           // ⻆⾊等级
        vip_level: "-1",            // VIP等级
        remainder: "-1",            // 剩余元宝
    }

    private _SDK = XipuSDK;//默认喜扑网络SDK
    constructor() {
        super();
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
        if (!GameApp.GameEngine.IsSDKLogin) {
            return;
        }
        console.log(this.SDK)
        this.SDK.init(debug)
    }

    login() {
        if (!GameApp.GameEngine.IsSDKLogin) {
            return;
        }
        this.SDK.login(function (data) {
            var openid = data.openid;
            var timestamp = data.timestamp;
            var sign = data.sign;
            var identity_status = data.identity_status;
            if (identity_status == XipuSDK.IDENTITY_UNVERIFIED) {
                console.log('未实名认证');
            }
            if (identity_status == XipuSDK.IDENTITY_KIDS) {
                console.log('未成年');
            }
            if (identity_status == XipuSDK.IDENTITY_ADULT) {
                console.log('已成年');
            }


            GameApp.HttpManager.postJson('name=verify', { openid: openid, timestamp: timestamp, sign: sign }, (res) => {
                let jsonData = JSON.parse(res);
                if (jsonData.errorCode != 0) {
                    console.error('登⼊失败，签名检验失败！')
                    return;
                }
                console.log('登录成功！');
                GameApp.MainPlayer.playerAccount = data.openid + '@' + GameApp.GameEngine.zoneid
                Laya.LocalStorage.setItem('account', data.openid);
                Laya.LocalStorage.setItem('password', data.openid);
                PanelManage.openChooseServerPanel();
            })

        });
    }

    // 更新当前sdkrole信息
    updateRoleInfo() {
        this._sdkRole.server_id = GameApp.GameEngine.trueZoneid.toString();
        this._sdkRole.server_id = GameApp.GameEngine.serverName;
        this._sdkRole.role_id = GameApp.GameEngine.mainPlayer.onlyId.toString();
        this._sdkRole.role_name = GameApp.GameEngine.mainPlayer.objName;
        this._sdkRole.role_level = GameApp.GameEngine.mainPlayer.level.toString();
        this._sdkRole.vip_level = GameApp.GameEngine.mainPlayer.viplvl.toString();
        this._sdkRole.remainder = GameApp.GameEngine.mainPlayer.wealth.yuanBao.toString();
    }

    // 创建⻆⾊
    createRole(role_id: any, role_name: any, role_level: any = '-1', vip_level: any = '-1', remainder: any = '-1') {
        this._sdkRole.server_id = GameApp.GameEngine.trueZoneid.toString();
        this._sdkRole.server_id = GameApp.GameEngine.serverName;
        this._sdkRole.role_id = role_id
        this._sdkRole.role_name = role_name
        this._sdkRole.role_level = role_level
        this._sdkRole.vip_level = vip_level
        this._sdkRole.remainder = remainder

        this.SDK.createRole(this._sdkRole);
    }

    // ⻆⾊登陆
    loginRole() {
        this.updateRoleInfo();
        this.SDK.loginRole(this._sdkRole);
    }

    // ⻆⾊升级
    upgradeRole() {
        this.updateRoleInfo();
        this.SDK.upgradeRole(this._sdkRole);
    }

    // 切换账号
    switchAccount() {
        let self = this;
        self.SDK.switchAccount(() => {
            // CP 清理⽤户环境
            // ...
            // ... （代码忽略)

            // 显示登录
            self.login();
        });
    }
}