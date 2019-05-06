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
     * 同步加载策划配置
     * @param jsonRes 策划配置资源路径
     */
    export function loadJSON(jsonRes): Promise<any> {
        return new Promise((resolve, reject) => {
            Laya.loader.load(jsonRes, Laya.Handler.create(this, (data) => {
                if (data) { resolve(data) }
                else { reject(data) };
            }));
        })


    }
}