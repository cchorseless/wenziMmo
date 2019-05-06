// /**
//  * Frame管理器,用于帧同步
//  */
// class FrameManage {
//     private _handlers: { [key: string]: TimerHandler };
//     private _timeScale: number;
//     private _currTime: number;
//     private _lastTime: number;
//     private _totalTime: number;
//     private _currFrame: number;
//     private _realRate: number;
//     private static instance: FrameManage = null;
//     /**
//      * 构造函数
//      */
//     public constructor() {
//         if (FrameManage.instance) {
//             throw new Error("Instance is alreally exist");
//         }
//         this._handlers = {};
//         this._currTime = Laya.timer.currTimer;
//         this._lastTime = this._currTime;
//         this._totalTime = 0;
//         this._currFrame = 0;
//         this._timeScale = 1;
//         this._realRate = 30;
//         Laya.stage.on(Laya.Event.FRAME, this, this.onEnterFrame);
//     }
//     public static getInstance(): FrameManage {
//         if (this.instance == null) {
//             this.instance = new FrameManage();
//         }
//         return this.instance;
//     }
//     /**
//      * 设置时间参数
//      * @param timeScale
//      */
//     public setTimeScale(timeScale: number): void {
//         this._timeScale = timeScale;
//     }

//     /**
//      *
//      * 定时执行
//      * @param delay 执行间隔:毫秒
//      * @param repeatCount 执行次数, 0为无限次
//      * @param method 执行函数
//      * @param methodObj 执行函数所属对象
//      * @param complateMethod 完成执行函数
//      * @param complateMethodObj 完成执行函数所属对象
//      *
//      */
//     public setTimer(key: string, method: Function, thisObject: any, delay: number = 0, repeatCount: number = 0,
//         complateMethod: Function = null, complateMethodObj: any = null): void {
//         this.create(key, false, delay, repeatCount, method, thisObject, complateMethod, complateMethodObj);
//     }

//     /**
//      *
//      * 定时执行
//      * @param method 执行函数
//      * @param methodObj 执行函数所属对象
//      * @param delay 执行间隔:帧频
//      * @param repeatCount 执行次数, 0为无限次
//      * @param complateMethod 完成执行函数
//      * @param complateMethodObj 完成执行函数所属对象
//      *
//      */
//     public setFrame(key: string, method: Function, thisObject: any, delay: number = 0, repeatCount: number = 0,
//         complateMethod: Function = null, complateMethodObj: any = null): void {
//         this.create(key, true, delay, repeatCount, method, thisObject, complateMethod, complateMethodObj);
//     }

//     /**
//      * 清理
//      * @param method 要移除的函数
//      * @param methodObj 要移除的函数对应的对象
//      */
//     public remove(key: string): void {
//         let handler: TimerHandler = this._handlers[key];
//         if (handler == null) {
//             return;
//         }
//         handler.dispose();
//         ObjectPool.push(handler);
//         delete this._handlers[key];
//     }

//     //平均帧频(Frame/Sec)
//     public get realRate(): number {
//         return this._realRate;
//     }

//     //当前运行多少帧
//     public get currentFrame(): number {
//         return this._currFrame;
//     }

//     private create(key: string, useFrame: boolean, delay: number, repeatCount: number,
//         method: Function, methodObj: any, complateMethod: Function, complateMethodObj: any): void {
//         //参数监测
//         if (delay < 0 || repeatCount < 0 || method == null) {
//             return;
//         }
//         //先删除相同函数的计时
//         this.remove(key);
//         //创建
//         var handler: TimerHandler = ObjectPool.pop(TimerHandler);
//         handler.userFrame = useFrame;
//         handler.repeat = repeatCount == 0;
//         handler.repeatCount = repeatCount;
//         handler.delay = delay;
//         handler.method = method;
//         handler.methodObj = methodObj;
//         handler.complateMethod = complateMethod;
//         handler.complateMethodObj = complateMethodObj;
//         handler.exeTime = delay + (useFrame ? this._currFrame : this._currTime);
//         handler.dealTime = this._currTime;
//         this._handlers[key] = handler;
//     }

//     /**
//      * 每帧执行函数
//      * @param frameTime
//      */
//     private onEnterFrame(event: Laya.Event): void {
//         this._currFrame++;
//         this._currTime = Laya.timer.currTimer;
//         this._totalTime += this._currTime - this._lastTime;
//         this._realRate = this._currFrame * 1000 / this._totalTime;
//         this._lastTime = this._currTime;
//         let handler: TimerHandler;
//         let t: number;
//         for (let key in this._handlers) {
//             handler = this._handlers[key];
//             t = handler.userFrame ? this._currFrame : this._currTime;
//             if (t >= handler.exeTime) {
//                 handler.method.call(handler.methodObj, (this._currTime - handler.dealTime) * this._timeScale);
//                 handler.dealTime = this._currTime;
//                 handler.exeTime += handler.delay;
//                 if (!handler.repeat) {
//                     if (handler.repeatCount > 1) {
//                         handler.repeatCount--;
//                     } else {
//                         if (handler.complateMethod) {
//                             handler.complateMethod.apply(handler.complateMethodObj);
//                         }
//                         this.remove(key);
//                     }
//                 }
//             }
//         }
//     }

// }


// class TimerHandler {
//     /**执行间隔*/
//     public delay: number = 0;
//     /**是否重复执行*/
//     public repeat: boolean;
//     /**重复执行次数*/
//     public repeatCount: number = 0;
//     /**是否用帧率*/
//     public userFrame: boolean;
//     /**执行时间*/
//     public exeTime: number = 0;
//     /**处理函数*/
//     public method: Function;
//     /**处理函数所属对象*/
//     public methodObj: any;
//     /**完成处理函数*/
//     public complateMethod: Function;
//     /**完成处理函数所属对象*/
//     public complateMethodObj: any;
//     /**上次的执行时间*/
//     public dealTime: number = 0;

//     /**清理*/
//     public dispose(): void {
//         this.method = null;
//         this.methodObj = null;
//         this.complateMethod = null;
//         this.complateMethodObj = null;
//     }
// }