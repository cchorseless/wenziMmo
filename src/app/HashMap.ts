/*
 * @Author: Y-way 
 * @Date: 2018-05-19 15:52:15 
 * @Last Modified by: Y-way
 * @Last Modified time: 2018-06-30 12:02:17
 */
class HashMap<K, V> {
    constructor() {
        // super();
    }

    public onRemoveValue: (value: V, key: K) => void;
    /**
     * 加入数据
     * @param key 键
     * @param value 值
     */
    public put(key: K, value: V | any): void {
        this[key as any] = value;
    }
    /**
     * 获得数据
     * @param key 键
     */
    public get(key: any): V {
        return this[key] as V;
    }

    /**
     * 移除数据
     * @param key 键
     */
    public remove(key: K): V {
        let value: V = this[key as any];
        if (value) {
            if (this.onRemoveValue) {
                this.onRemoveValue(value, key);
            }
            delete this[key as any];
        }
        return value;
    }

    /**
     * 是否存在
     * @param key 键
     */
    public contains(key: K): boolean {
        return this[key as any] != null;
    }

    /**
     * 获得所有键值
     */
    public keys(): string[] {
        let keys: string[] = Object.keys(this);
        let index = keys.indexOf("onRemoveValue");
        if (index != -1) {
            keys.splice(index, 1);
        }
        return keys;
    }

    /**
     * 清空
     */
    public clear(): void {
        let keys = this.keys();
        let len = keys.length;
        for (let i = 0; i < len; i++) {
            this.remove(keys[i] as any);
        }
    }

    public foreachKey(func: (key: string, index: number, array: string[]) => void, thisobj: any): void {
        let keys = this.keys();
        keys.forEach(func, thisobj);
    }

    public foreachValue(func: (value: V, index: number, array: V[]) => void, thisobj: any) {
        let keys = this.keys();
        let len = keys.length;
        for (let i = 0; i < len; i++) {
            func.call(thisobj, this.get(keys[i] as any), i, null);
        }
    }
}