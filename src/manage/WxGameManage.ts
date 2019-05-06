/**
 * 微信小游戏接口
 */
declare module wx {

    //**************************************************分享接口**************************************** */
    /**
     * 主动拉起转发，进入选择通讯录界面。
     * @param title 转发标题，不传则默认使用当前小游戏的昵称
     * @param imageUrl 转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。显示图片长宽比是 5:4
     * @param query 查询字符串，从这条转发消息进入后，可通过 wx.getLaunchInfoSync() 或 wx.onShow() 获取启动参数中的 query。必须是 key1=val1&key2=val2 的格式。
     */
    export function shareAppMessage(obj?: { title?: string, imageUrl?: string, query?: string }): void;
    /**
     * 监听用户点击右上角菜单的“转发”按钮时触发的事件
     * @param func 监听事件的回调函数
     */
    export function onShareAppMessage(func: Function): void;

    //************************************************振动******************************************** */

    /**
     * 使手机发生较短时间的振动（15 ms）
     * @param success 接口调用成功的回调函数
     * @param fail 接口调用失败的回调函数
     * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export function vibrateShort(obj?: { success?: Function, fail?: Function, complete?: Function }): void;

    //*************************************************开放数据******************************************* */
    /**
     * 开放数据域对象,应该卸载openData文件夹的JS里面
     */
    export class OpenDataContext {
        // 开放数据域和主域共享的 sharedCanvas
        public canvas;
        // 向开放数据域发送消息
        public postMessage(obj: any);
    }
    /**
     * 监听主域发送的消息
     */
    export function getOpenDataContext(): OpenDataContext;
    /**
     * 监听开放数据
     */
    export function onMessage(func: Function);
    /**
     * 在无须用户授权的情况下，批量获取用户信息。该接口只在开放数据域下可用
     * @param openIdList要获取信息的用户的 openId 数组，如果要获取当前用户信息，则将数组中的一个元素设为 'selfOpenId'
     * @param lang 显示用户信息的语言
     * @param success 接口调用成功的回调函数
     * @param fail 接口调用失败的回调函数
     * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export function getUserInfo(obj?: { openIdList?: Array<string>, lang?: string, success?: Function, fail?: Function, complete?: Function })
    /**
     * 拉取当前用户所有同玩好友的托管数据。该接口只可在开放数据域下使用
     * @param keyList 要拉取的 key 列表
     * @param success 接口调用成功的回调函数
     * @param fail 接口调用失败的回调函数
     * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export function getFriendCloudStorage(obj: { keyList: Array<string>, success?: Function, fail?: Function, complete?: Function }): void;
    /**
     * 对用户托管数据进行写数据操作，允许同时写多组 KV 数据。
     * @param KVDataList 要修改的 KV 数据列表
     * @param success 接口调用成功的回调函数
     * @param fail 接口调用失败的回调函数
     * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export function setUserCloudStorage(obj: { KVDataList: Array<any>, success?: Function, fail?: Function, complete?: Function })
    /**
     * 获取当前用户托管数据当中对应 key 的数据。该接口只可在开放数据域下使用
     * @param KVDataList 要修改的 KV 数据列表
     * @param success 接口调用成功的回调函数
     * @param fail 接口调用失败的回调函数
     * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export function getUserCloudStorage(obj: { keyList: Array<string>, success?: Function, fail?: Function, complete?: Function })

    /***   ************************************************广告模块******************************************************************** */
    /**
     * banner 广告组件。banner 广告组件是一个原生组件，层级比上屏 Canvas 高，会覆盖在上屏 Canvas 上。banner 广告组件默认是隐藏的，需要调用 BannerAd.show() 将其显示。
     * banner 广告会根据开发者设置的宽度进行等比缩放，缩放后的尺寸将通过 BannerAd.onResize() 事件中提供。
     */
    export class BannerAd {
        //广告单元 id
        adUnitId: string;
        style: { left: number, top: number, width: number, height: number, realWidth: number, realHeight: number }
        //显示 banner 广告
        show()
        //隐藏 banner 广告
        hide();
        //销毁 banner 广告
        destroy();
        //监听隐藏 banner 广告
        onResize(func: Function);
        //取消监听隐藏 banner 广告
        offResize(func: Function);
        //监听banner 广告加载事件
        onLoad(func: Function);
        //取消监听banner 广告加载事件
        offLoad(func: Function);
        //监听banner 广告错误事件
        onError(func: Function);
        //取消监听banner 广告错误事件
        offError(func: Function);
    }
    /**
     * 创建 banner 广告组件。请通过 wx.getSystemInfoSync() 返回对象的 SDKVersion 判断基础库版本号 >= 2.0.4 后再使用该 API。
     * 同时，开发者工具上暂不支持调试该 API，请直接在真机上进行调试。
     */
    export function createBannerAd(obj: { adUnitId: string, style: { left: number, top: number, width: number, height: number } }): BannerAd;

    /**
     * 激励视频广告组件。激励视频广告组件是一个原生组件，并且是一个全局单例。层级比上屏 Canvas 高，会覆盖在上屏 Canvas 上。
     * 激励视频 广告组件默认是隐藏的，需要调用 RewardedVideoAd.show() 将其显示。
     */
    export class RewardedVideoAd {
        //广告单元 id
        public adUnitId: number;
        //隐藏激励视频广告
        public load();
        //监听激励视频广告加载事件
        public show();
        //监听激励视频广告加载事件
        public onload(func: Function);
        //取消监听激励视频广告加载事件
        public offLoad(func: Function);
        // 监听激励视频错误事件
        public onError(func: Function);
        //取消监听激励视频错误事件
        public offError(func: Function);
        //监听用户点击 关闭广告 按钮的事件
        public onClose(func: Function);
        //取消监听用户点击 关闭广告 按钮的事件
        public offClose(func: Function);
    }
    /**
     * 创建激励视频广告组件。请通过 wx.getSystemInfoSync() 返回对象的 SDKVersion 判断基础库版本号 >= 2.0.4 后再使用该 API。
     * 同时，开发者工具上暂不支持调试该 API，请直接在真机上进行调试。
     */
    export function createRewardedVideoAd(obj: { adUnitId: string }): RewardedVideoAd;

    /** ****************************************************本地数据缓存******************************************** */
    /**
     * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容。
     */
    export function setStorage(obj: { key: string, data: any, success?: Function, fail?: Function, complete?: Function });
    /**
     * setStorage 的同步版本
     */
    export function setStorageSync(key: string, data: any);
    /**
     * 从本地缓存中异步获取指定 key 的内容
     */
    export function getStorage(obj: { key: string, success?: Function, fail?: Function, complete?: Function });
    /**
     * getStorage 的同步版本
     */
    export function getStorageSync(key: string);
    /**
     * 异步获取当前storage的相关信息
     */
    export function getStorageInfo(obj: { success?: Function, fail?: Function, complete?: Function });
    /**
     * wx.getStorageInfo 的同步版本
     */
    export function getStorageInfoSync();
    /**
     * 清理本地数据缓存
     */
    export function clearStorage(obj: { success?: Function, fail?: Function, complete?: Function });
    /**
     * clearStorage 的同步版本
     */
    export function clearStorageSync();
    /**
     * 从本地缓存中移除指定 key
     */
    export function removeStorage(Obj: { key: string, success?: Function, fail?: Function, complete?: Function });
    /**
     * removeStorage 的同步版本
     */
    export function removeStorageSync(key: string);

    /**************************************************用户信息******************************************** */

    /**
     * 创建用户授权按钮
     */
    export function createUserInfoButton(obj: { type: string, image: string, style: { left: number, top: number, width: number, height: number } }): UserInfoButton;

    /**
     * 用户授权按钮
     */
    export class UserInfoButton {
        show();
        hide();
        destroy();
        onTap(func: Function);
        offTap(func: Function);
    }

    /**
     * 微信登陆
     */
    export function login(obj: { success?: Function, fail?: Function, complete?: Function });

    /**
     * 发起请求
     */
    export function request(obj: { url: string, data: any, header: any, method: string, success: Function })


}

