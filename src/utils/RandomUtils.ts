/**
 * 随机工具
 */
module RandomUtils {
    /**
     * 获取一个区间的随机数
     * @param $from 最小值
     * @param $end 最大值
     * @returns {number}
     */
    export function randomRange($from: number, $end: number): number {
        $from = Math.min($from, $end);
        $end = Math.max($from, $end);
        var range: number = $end - $from;
        return $from + Math.random() * range;
    }

    /**
     * 获取一个区间的随机数,包含两端
     * @param $from 最小值
     * @param $end 最大值
     * @returns {number}
     */
    export function randomInt($from: number, $end: number): number {
        return Math.round(RandomUtils.randomRange($from, $end));
    }

    /**
     * 在一个数组中随机获取一个元素
     * @param arr 数组
     * @returns {any} 随机出来的结果
     */
    export function randomArray(arr: Array<any>): any {
        var index: number = Math.floor(Math.random() * arr.length);
        return arr[index];
    }
    /**
     * 在一个数组内根据权重随机取一个元素
     */
    export function randomArrayByWeight(arr: Array<any>, weight: Array<number>): any {
        let _sum = randomInt(0, QuickUtil.SumArr(weight));
        for (let i = 0; i < weight.length; i++) {
            _sum -= weight[i];
            if (_sum <= 0) {
                return arr[i]
            }
        }
        return arr[arr.length - 1]


    }

    /**
    * 在一个数组中随机删除一个元素，并返回该元素
    * @param arr 数组
    * @returns {any} 随机出来的结果
    */
    export function randomPopArray(arr: Array<any>): any {
        var index: number = Math.floor(Math.random() * arr.length);
        var ss = arr[index];
        arr.splice(index, 1);
        return ss;
    }
    /**
    * 随机t长度的随机字符串
    * @param t
    */
    export function randomName(t: number) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < t; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
}