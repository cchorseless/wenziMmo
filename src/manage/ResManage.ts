/**
 * 资源加载管理
 */
module ResManage {
    // 加载资源
    export function loadResource(res, comFunc: Function = () => { }, proFunc: Function = () => { }, errFunc: Function = () => { }): void {
        // 如果资源不存在
        if (!res) {
            comFunc();
            return
        }
        // 资源存在
        Laya.loader.load(res,
            Laya.Handler.create(this, onComplete.bind(this, comFunc)),
            Laya.Handler.create(this, onProgress.bind(this, proFunc), null, false));
        // 侦听加载失败
        Laya.loader.on(Laya.Event.ERROR, this, onError.bind(this, errFunc));
    }
    /**
     * 资源加载完成
     * @param comFunc 加载成功回调函数
     * @param data 加载成功返回true
     */
    function onComplete(comFunc, data): void {
        comFunc()
    }
    // 资源加载过程界面
    function onProgress(proFunc, data): void {
        proFunc(data)
    }
    // 资源加载出错
    function onError(errFunc, err: String): void {
        console.log("加载失败: " + err);
        errFunc();
    }


    /**
     * 加载策划配置
     * @param jsonRes 策划配置资源路径
     */
    export function loadJSON(jsonRes: Array<any>, comFunc: Function = () => { }, proFunc: Function = () => { }, errFunc: Function = () => { }): void {
        ResManage.loadResource(jsonRes, () => {
            for (let _json of jsonRes) {
                _json.CLASSTYPE.getInstance(Laya.Loader.getRes(_json.url));
            }
            comFunc();
        }, proFunc, errFunc)

        return
    }

    /**
     * 加载TTF字体
     * @param ttfRes 
     */
    export function loadTTF(ttfRes: Array<any>, comFunc: Function = () => { }): void {
        // 原生环境
        if (Laya.Browser.window.conch) {
            for (let ttfinfo of ttfRes) {
                ttfinfo.type = Laya.Loader.BUFFER;
            }
            Laya.loader.load(ttfRes, Laya.Handler.create(this, (data) => {
                for (let ttfinfo of ttfRes) {
                    let arr: ArrayBuffer = Laya.loader.getRes(ttfinfo.url);
                    Laya.Browser.window.conch.setFontFaceFromBuffer(ttfinfo.TTFNAME, arr);
                }
                comFunc();
            }), null, Laya.Loader.BUFFER);
        }
        // 网页环境
        else {
            ResManage.loadResource(ttfRes, comFunc);
        }


    }
}