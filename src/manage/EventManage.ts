module EventManage {
    /**
     * 监听响应按钮特效
     * @param caller 上下文，this
     * @param dispatch 监听对象
     * @param event 事件
     * @param func 回调函数
     * @param args 参数
     */
    export function addButtonEvent(caller, dispatch: Laya.Sprite, event: string, func: Function, args?: Array<any>): void {
        dispatch.on(event, caller, func, args)
        dispatch.once(event, caller, () => {
            EffectUtils.playButtonEffect(dispatch)
        })

    }
}