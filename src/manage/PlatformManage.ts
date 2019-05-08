/**
 * 平台管理类
 */
module PlatformManage {

    /**
     * 微信平台登陆
     */
    export class WxPlatform {

        /**
         * 微信小程序登陆，获取用户token
         */
        public static login(): Promise<any> {

            return new Promise(
                (resolve, reject) => {

                    wx.login(
                        {
                            success: (res) => {
                                console.log(res)
                                if (res.errMsg.indexOf('ok') != -1) {
                                    resolve(res.code)
                                }
                                else {
                                    resolve(null)
                                }
                            },
                            fail: (res) => {
                                resolve(null)
                            }
                        }
                    )
                })

        }

        /**
         * 微信小游戏获取用户信息
         */
        public static getUserInfo(func: Function): void {
            let button = wx.createUserInfoButton({
                type: 'image',
                image: 'userInfo.png',
                style: {
                    left: 0,
                    top: 0,
                    width: Laya.stage.width,
                    height: Laya.stage.height
                }
            })
            button.show();
            button.onTap((res) => {
                // 成功
                if (res.errMsg.indexOf('ok') != -1) {
                    button.destroy();
                    func(res);
                }
            })
        }

    }


    /**
     * 获取平台信息
     */
    export function getPlatform(): string {
        let result: string = '';
        switch (true) {
            case Laya.Browser.onEdge:
                result = 'Web'
                break;
            case Laya.Browser.onQQBrowser:
                result = 'Web'
                break;
            case Laya.Browser.onSafari:
                result = 'Web'
                break;
            case Laya.Browser.onMQQBrowser:
                result = 'Web'
                break;
            case Laya.Browser.onFirefox:
                result = 'Web'
                break;
            case Laya.Browser.onIE:
                result = 'Web'
                break;
            case Laya.Browser.onAndroid && Laya.Browser.onMobile && !Laya.Browser.onWeiXin:
                // 安卓手机APK
                result = 'Android';
                break;
            case Laya.Browser.onWP && !Laya.Browser.onWeiXin:
                // window手机
                result = 'WP';
                break;
            case Laya.Browser.onIPad && !Laya.Browser.onSafari && !Laya.Browser.onWeiXin:
                result = 'IOS';
                break;
            case Laya.Browser.onIPhone && !Laya.Browser.onSafari && !Laya.Browser.onWeiXin:
                result = 'IOS';
                break;
            case Laya.Browser.onWeiXin:
                // 微信小程序
                result = 'WeiXin';
                break;
            default:
                // 默认
                result = 'Web';
                break;
        }
        return result
    }
}





