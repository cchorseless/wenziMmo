/**
 * @module lcp
 * @class LListener,LEvent
 * @constructor
 */

module lcp {
    /**
     * 全局侦听类及消息处理
     */
    export class LListener {
        public CLASS_NAME: string = "LListener";
        private static _instance: LListener;
        private _dispatcher: Laya.EventDispatcher;
        private isInit: boolean = false;
        public constructor() {
            if (this.isInit) {
                throw new Error("不可以实例化" + this.CLASS_NAME + "类,请实例Lcp." + this.CLASS_NAME + ".getInstance()开始");
            }
            if (this._dispatcher == null) {
                this._dispatcher = new Laya.EventDispatcher();
                this.isInit = true;
            }
        }
        public static getInstance(): LListener {
            let Class: any = this;
            if (!Class._instance) {
                Class._instance = new Class();
            }
            return Class._instance;

        }
        // 监听事件
        public on(type: string, caller: any, listener: Function, args?: any[]): Laya.EventDispatcher {
            return this._dispatcher.on(type, caller, listener, args)
        }
        // 监听一次事件
        public once(type: string, caller: any, listener: Function, args?: Array<any>): Laya.EventDispatcher {
            return this._dispatcher.once(type, caller, listener, args)
        }
        // 移除事件
        public off(type: string, caller: any, listener: Function, onceOnly?: boolean): Laya.EventDispatcher {
            return this._dispatcher.off(type, caller, listener, onceOnly);
        }
        // 移除作用域事件
        public offCaller(type: string, caller: any): Laya.EventDispatcher {
            let events = this._dispatcher['_events'];
            if (!events || !events[type]) return this._dispatcher;
            let listeners = events[type];
            if (listeners != null) {
                if (listeners.run) {
                    if (!caller || listeners.caller === caller) {
                        delete events[type];
                        listeners.recover();
                    }
                } else {
                    var count = 0;
                    for (var i = 0, n = listeners.length; i < n; i++) {
                        var item = listeners[i];
                        if (!item) {
                            count++;
                            continue;
                        }
                        if (item && (!caller || item.caller === caller)) {
                            count++;
                            listeners[i] = null;
                            item.recover();
                        }
                    }
                    if (count === n) delete events[type];
                }
            }
            return this._dispatcher;
        }
        // 移除所有事件
        public offAll(type?: string): Laya.EventDispatcher {
            return this._dispatcher.offAll(type)
        }
        // 是否有事件监听者
        public hasListener(type: string): boolean {
            return this._dispatcher.hasListener(type);
        }
        // 触发事件
        public event(type: string, param?): boolean {
            return this._dispatcher.event(type, param);
        }
    }

    /**
     * 网络发送协议,配合实体，使用本地lcp实现回调
     * @param msgClass 包
     * @param key 上下文
     * @param cb 回调函数
     */
    export function send(msgClass: ProtoCmd.Packet, key?, cb?: Function): void {
        if (cb) {
            let eventName = msgClass.eventName;
            lcp.LListener.getInstance().once(eventName, key, cb)
        }
        msgClass.send();
    }
}