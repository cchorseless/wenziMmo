module EventManage {
    /**
     * 监听响应按钮特效
     * @param dispatch 监听对象
     * @param event 事件
     * @param caller 上下文，this
     * @param func 回调函数
     * @param args 参数
     */
    export function onWithEffect(dispatch: Laya.Sprite, event: string, caller, func: Function, args?: Array<any>): void {
        let time = 80;
        let old_scaleX = dispatch.scaleX;
        let old_scaleY = dispatch.scaleY;
        // 按下事件
        dispatch.on(Laya.UIEvent.MOUSE_DOWN, caller, () => {
            // console.log('MOUSE_DOWN');
            if (dispatch['lcp_onWithEffect']) { return };
            dispatch['lcp_onWithEffect'] = true;
            Laya.Tween.to(dispatch, { scaleX: old_scaleX * 1.1, scaleY: old_scaleY * 1.1 }, time, Laya.Ease.sineIn);
        });

        // 移走事件
        dispatch.on(Laya.UIEvent.MOUSE_OUT, caller, () => {
            // console.log('MOUSE_OUT')
            dispatch['lcp_onWithEffect'] = false;
            Laya.Tween.to(dispatch, { scaleX: old_scaleX, scaleY: old_scaleY }, time, Laya.Ease.sineIn)
        });

        // 抬起事件 e 强制触发
        dispatch.on(Laya.UIEvent.MOUSE_UP, caller, () => {
            if (dispatch['lcp_onWithEffect']) {
                dispatch['lcp_onWithEffect'] = false;
                // console.log('MOUSE_UP')
                Laya.Tween.to(dispatch, { scaleX: old_scaleX, scaleY: old_scaleY }, time, Laya.Ease.sineIn, Laya.Handler.create(caller, func, args));
            }
        });
        // console.log(dispatch);
    }
}
