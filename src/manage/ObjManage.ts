// /**
//  * Created by yangsong on 2014/11/22.
//  * pipixia 有改动
//  * 对象池类
//  */
// class ObjectPool {

//     private static _pools: { [refKey: string]: ObjectPool } = {};

//     private _objs;

//     /**
//      * 构造函数
//      */
//     public constructor() {
//         this._objs = { '_': [] };
//     }

//     /**
//      * 放回一个对象
//      * @param obj
//      */
//     public push(obj: any): void {
//         if (obj.extraKey) {
//             this._objs[obj.extraKey].push(obj);
//         }
//         else {
//             this._objs._.push(obj);
//         }
//     }

//     /**
//      * 取出一个对象
//      * @returns {*}
//      */
//     public pop(extraKey?: string): any {

//         if (extraKey) {
//             if (!this._objs[extraKey]) {
//                 this._objs[extraKey] = [];
//             }
//             return this._objs[extraKey].pop();
//         }
//         else {
//             return this._objs._.pop();
//         }

//     }

//     /**
//      * 所有缓存对象执行的函数
//      */
//     public execute(funcName?: string): void {
//         if (funcName == null || funcName == undefined) {
//             return;
//         }
//         let lenn;
//         for (let key in this._objs) {
//             lenn = this._objs[key].length;
//             for (let i = lenn - 1, obj: any; i > -1; i--) {
//                 obj = this._objs[key][i];
//                 obj[funcName]();
//             }
//         }
//     }

//     /**
//      * 清除所有缓存对象,并执行一个函数
//      */
//     public clear(funcName?: string): void {
//         let lenn;
//         for (let key in this._objs) {
//             lenn = this._objs[key].length;
//             for (let i = lenn - 1, obj: any; i > -1; i--) {
//                 obj = this._objs[key].pop();
//                 if (funcName) {
//                     obj[funcName]();
//                 }
//             }
//         }
//         this._objs = { '_': [] };
//     }

//     /**
//      * 取出一个对象
//      * @param classZ Class
//      * @param extraKey 标识值,标识有状态的对象
//      * @return Object
//      *
//      */
//     public static pop(classZ, extraKey?: string, ...args: any[]): any {
//         let refKey = QuickUtil.getObjectClassName(classZ);
//         let pool: ObjectPool = ObjectPool._pools[refKey];

//         if (pool == null || pool == undefined) {
//             pool = new ObjectPool();
//             ObjectPool._pools[refKey] = pool;
//         }

//         let obj: any = pool.pop(extraKey);

//         if (obj) {
//             return obj;
//         }
//         let argsLen: number = args.length;
//         if (argsLen == 0) {
//             obj = new classZ();
//         } else if (argsLen == 1) {
//             obj = new classZ(args[0]);
//         } else if (argsLen == 2) {
//             obj = new classZ(args[0], args[1]);
//         } else if (argsLen == 3) {
//             obj = new classZ(args[0], args[1], args[2]);
//         } else if (argsLen == 4) {
//             obj = new classZ(args[0], args[1], args[2], args[3]);
//         } else if (argsLen == 5) {
//             obj = new classZ(args[0], args[1], args[2], args[3], args[4]);
//         }
//         obj.ObjectPoolKey = refKey;
//         if (extraKey) {
//             obj.extraKey = extraKey;
//         }
//         return obj;
//     }
//     /**
//      * 取出一个界面上已存在的eui对象
//      * @param OBJ Class
//      * @param extraKey 标识符
//      * @return Object
//      *
//      */

//     public static popEuiObj(OBJ, extraKey?: string): any {
//         let initAttr: Array<string> = [
//             'name',
//             'skewX',
//             'skewY',
//             'anchorOffsetX',
//             'anchorOffsetY',
//             'width',
//             'height',
//             'x',
//             'y',
//             'scaleX',
//             'scaleY',
//             'rotation',
//             'alpha',
//             'visible',
//             'mask'
//         ]
//         let refKey = QuickUtil.getObjectClassName(OBJ);
//         let pool: ObjectPool = ObjectPool._pools[refKey];

//         if (pool == null || pool == undefined) {
//             pool = new ObjectPool();
//             ObjectPool._pools[refKey] = pool;
//         }
//         let obj: any = pool.pop(extraKey);

//         switch (refKey) {
//             case 'Image':
//                 if (!obj) {
//                     obj = new Laya.Image();
//                 }
//                 initAttr = initAttr.concat(
//                     ['source',
//                         'scale9Grid',
//                         'fillMode',
//                         'left',
//                         'right',
//                         'top',
//                         'bottom',
//                         'horizontalCenter',
//                         'verticalCenter',
//                         'percentWidth',
//                         'percentHeight',
//                         'minWidth',
//                         'maxWidth',
//                         'minHeight',
//                         'maxHeight'
//                     ]);
//                 break;
//             case "Label":
//                 if (!obj) {
//                     obj = new Laya.Label();
//                 }
//                 initAttr = initAttr.concat([
//                     'text',
//                     'style',
//                     'left',
//                     'right',
//                     'top',
//                     'bottom',
//                     'horizontalCenter',
//                     'verticalCenter',
//                     'percentWidth',
//                     'percentHeight',
//                     'minWidth',
//                     'maxWidth',
//                     'minHeight',
//                     'maxHeight'
//                 ])
//                 break;
//             default:
//                 throw Error('功能尚未完成');
//         }
//         // 初始化属性
//         for (let i = 0; i < initAttr.length; i++) {
//             obj[initAttr[i]] = OBJ[initAttr[i]];
//         }
//         obj.ObjectPoolKey = refKey;
//         if (extraKey) {
//             obj.extraKey = extraKey;
//         }
//         if (OBJ.parent && !obj.parent) {
//             OBJ.parent.addChildAt(obj, OBJ.parent.getChildIndex(OBJ));
//         }
//         return obj
//     }
//     /**
//      * 放入一个对象
//      * @param obj
//      *
//      */
//     public static push(obj: any): boolean {
//         if (!obj) {
//             return false;
//         }

//         let refKey: any = obj.ObjectPoolKey;

//         if (refKey == null || refKey == undefined) {
//             return false;
//         }

//         //保证只有pop出来的对象可以放进来，或者是已经清除的无法放入
//         let pool: ObjectPool = ObjectPool._pools[refKey];
//         if (pool == null || pool == undefined) {
//             return false;
//         }
//         pool.push(obj);
//         return true;
//     }
//     /**
//      * 从界面容器中取出对象池创建的对象，放回对象池
//      * @param item 复制的对象源
//      *
//      */
//     public static pushALLPanelItems(item: Laya.View): void {
//         if (!item.parent) {
//             return
//         }
//         let lenn = item.parent.$children.length;
//         for (let i = lenn - 1; i >= 0; i--) {
//             let _item = item.parent.$children[i];
//             if (ObjectPool.push(_item)) {
//                 _item.removeSelf()
//                 Laya.Tween.clearAll(_item);
//                 EventManage.removeEvent(_item);
//             }
//         }
//     }
//     /**
//      * 从界面容器中取出一个对象池创建的对象，放回对象池
//      * @param grp 存有对象的容器
//      *
//      */
//     public static pushPanelItem(item: egret.DisplayObject): void {

//         if (ObjectPool.push(item) && item.parent) {
//             item.parent.removeChild(item);
//             egret.Tween.removeTweens(item);
//             EventManage.removeEvent(item);
//         }
//     }

//     /**
//      * 清除对象池中所有对象
//      */
//     public static clear(): void {
//         let pool: ObjectPool;
//         for (let rekKey in ObjectPool._pools) {
//             pool = ObjectPool._pools[rekKey];
//             pool.clear();
//         }
//         ObjectPool._pools = {};
//     }

//     /**
//      * 清除对象池中某一类对象
//      * @param classZ Class
//      * @param funcName 清除对象需要执行的函数
//      */
//     public static erase(refKey: string, funcName?: string): void {

//         let pool: ObjectPool = ObjectPool._pools[refKey];
//         if (pool == null || pool == undefined) {
//             pool.clear(funcName)
//         }

//         delete ObjectPool._pools[refKey];
//     }

//     /**
//      * 缓存中对象统一执行一个函数
//      * @param classZ Class
//      * @param funcName 要执行的函数名称
//      */
//     public static execute(refKey: string, funcName: string): void {
//         let pool: ObjectPool = ObjectPool._pools[refKey];
//         if (pool == null || pool == undefined) {
//             pool.execute(funcName)
//         }
//     }
// }