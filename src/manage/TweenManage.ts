/**
 * 缓动动画管理
 * by pipixia
 */

module TweenManage {
    /**
     * 等待一组缓动动画播放完成执行回掉函数
     * @param tweenList 缓动动画组
     * @param func 缓动动画播放完成回掉函数
     */
    export function wait(tweenList: Laya.Tween[], func: Function): void {
        let lenn = tweenList.length;
        let name = RandomUtils.randomName(6);
        let group = { count: 0 };
        let onceFunc = function (group) {
            group.count -= 1;
            if (group.count == 0) {
                func();
            }
        }
        for (let i = 0; i < lenn; i++) {
            let eventName = "Laya_Tween_" + Laya.Utils.getGID() + name;
            let completeFunc = tweenList[i]['_complete']['method'] || (() => { })
            tweenList[i]['_complete'].method = () => {
                completeFunc();
                lcp.LListener.getInstance().event(eventName);
            }
            group.count += 1;
            lcp.LListener.getInstance().once(eventName, this, onceFunc.bind(this, group))
        }
    }
}