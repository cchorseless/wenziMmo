/**
  * 快捷创建
  * by fany，pipixia
  * (c) copyright false,0,0,2014 - 2035
  * All Rights Reserved. 
  * 快捷创建
  */
module QuickUtil {
    /**
     *数组里交换
     */
    export function swapArr(arr, index1, index2): Array<any> {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
    };
    /**
     * 数组求和
     */
    export function SumArr(arr: Array<any>): number {
        let result = 0;
        for (let i = 0; i < arr.length; i++) {
            result += arr[i];
        }
        return result;
    }

    /*
     * 给Url参数赋值
     * 不传递paraUrl参数默认获取当前url
     * */
    export function setProperty(paraName: string, paraValue: string, paraUrl?: string): string {
        var url = paraUrl || location.href;
        var urlPara = "&" + url.split("?")[1];
        if (url.indexOf("?") == -1) {
            return url += "?" + paraName + "=" + paraValue;
        } else {
            var urlPara = url.split("?")[1];
            if (urlPara == "")
                return url += paraName + "=" + paraValue;
            var regParaKV = new RegExp("(?:^|\&)" + paraName + "\=.*?(?:\&|$)");
            var result = regParaKV.exec(urlPara);
            if (!result || result[0] == "") {
                return url += "&" + paraName + "=" + paraValue;
            } else {
                var oldValue = result[0];
                var regParaKey = new RegExp("\=.*$");
                var newValue = oldValue.replace(regParaKey, "=" + paraValue);
                return url.replace(oldValue, newValue);
            }
        }
    }

    /*
     * 检查url中是否包含某参数
     * 这代码有一个例外就是paraName = "undefined", paraUrl中不含"?"会返回true
     * 相信你不会这么用的 =.=
     * */
    export function hasProperty(paraName: string, paraUrl?: string): boolean {
        var url = paraUrl || location.href;
        var para = "&" + url.split("?")[1]; //加&是为了把&作为参数名开始=作为参数名结束，防止uid=1&id=2此类误判
        return para.indexOf("&" + paraName + "=") != -1;
    }
    /*
     *移除数组指定元素
     * */
    export function remove(a: Array<any>, b: Function) {
        let len = a.length;
        let result = []
        for (let i = 0; i < len; i++) {
            if (b(a[i])) {
                result.push(a[i]);
                a.splice(i, 1);
                i = i - 1;
                len = len - 1;
            }
        }
        return result
    }

    /*
     *找到数组指定元素
     * 
     */
    export function find(a: Array<any>, b: Function) {
        let len = a.length;
        let result = []
        for (let i = 0; i < len; i++) {
            if (b(a[i])) {
                result.push(a[i]);
            }
        }
        return result
    }

    /*
     *数组中是否有指定元素
     *
     */
    export function hasItem(a: Array<any>, b) {
        let len = a.length;
        let result = false;
        for (let i = 0; i < len; i++) {
            if (a[i] == b) {
                result = true;
                break;
            }
        }
        return result
    }


    export function sortMoreFun(strarr: any[], sortarr: any[] = null) {
        return function (obj1, obj2) {
            var valarr: number[] = [];
            var sorlen: number = 0;
            if (sortarr) sorlen = sortarr.length;
            var chanum: number;
            for (var b in strarr) {
                //b = parseInt(b);
                var bb: number = parseInt(b);
                chanum = parseInt(obj1[strarr[bb]]) - parseInt(obj2[strarr[bb]]);
                if (chanum == 0) {
                    continue;
                } else {
                    if (sorlen > bb && sortarr[bb] == 0) {
                        return chanum;
                    } else {
                        return -chanum;
                    }
                }
            }
            return 0;
        }
    }
    /**
     * 获取类名称
     */
    export function getObjectClassName(obj) {
        if (obj && obj.constructor && obj.constructor.toString()) {
            /*
             * for browsers which have name property in the constructor
             * of the object,such as chrome 
             */
            if (obj.constructor.name) {
                return obj.constructor.name;
            }
            var str = obj.constructor.toString();
            /*
             * executed if the return of object.constructor.toString() is 
             * "[object objectClass]"
             */
            if (str.charAt(0) == '[') {
                var arr = str.match(/\[\w+\s*(\w+)\]/);
            } else {
                /*
                 * executed if the return of object.constructor.toString() is 
                 * "function objectClass () {}"
                 * for IE Firefox
                 */
                var arr = str.match(/function\s*(\w+)/);
            }
            if (arr && arr.length == 2) {
                return arr[1];
            }
        }
        return undefined;
    };

    /**
     * 区间内大小比较
     */
    export function inRange(a: number, min: number, max: number): boolean {
        return a >= min && a <= max
    }
    /**
     * 获取字符串的长度
     */
    export function getStrLength(str: string): number {
        var l = str.length;
        var blen = 0;
        for (let i = 0; i < l; i++) {
            if ((str.charCodeAt(i) & 0xff00) != 0) {
                blen++;
            }
            blen++;
        }
        return blen
    }

    // /**
    //  * 
    //  */
    // export function localToSpirtPoint(obj: Laya.Sprite, spr:Laya.Sprite): Laya.Point {
    //     let po
    // }
}

