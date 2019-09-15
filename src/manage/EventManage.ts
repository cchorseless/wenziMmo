module EventManage {
    /**
     * 监听响应按钮特效
     * @param dispatch 监听对象
     * @param event 事件
     * @param caller 上下文，this
     * @param func 回调函数
     * @param args 参数
     */
    export function onWithEffect(dispatch, event: string, caller, func: Function, args?: Array<any>): void {
        let time = 80;
        // 按下事件
        dispatch.on(Laya.UIEvent.MOUSE_DOWN, caller, () => {
            if (dispatch['lcp_onWithEffect']) { return }
            dispatch['lcp_onWithEffect'] = true;
            Laya.Tween.to(dispatch, { scaleX: 0.9, scaleY: 0.9 }, time, Laya.Ease.sineIn)
        });
        // 移走事件
        dispatch.on(Laya.UIEvent.MOUSE_OUT, caller, () => {
            dispatch['lcp_onWithEffect'] = false;
            Laya.Tween.to(dispatch, { scaleX: 1, scaleY: 1 }, time, Laya.Ease.sineIn)
        });
        // 抬起事件
        dispatch.on(Laya.UIEvent.MOUSE_UP, caller, () => {
            dispatch['lcp_onWithEffect'] = false;
            Laya.Tween.to(dispatch, { scaleX: 1, scaleY: 1 }, time, Laya.Ease.sineIn, Laya.Handler.create(caller, func, args));
        });
    }
}