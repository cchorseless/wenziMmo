/**
 * 界面层级管理
 */
module PopUpManager {
    /**界面层级信息 */
    export let ALLPANEL = new Laya.Dictionary();
    //当前界面
    export let curPanel: Laya.View;
    /**
     * 检查界面是否存在，若存在则销毁
     * @param panel 
     */
    export function checkPanel(panel: Laya.View, clearRes = true, effectType = 0): void {
        if (panel && !panel.destroyed) {
            if (panel['Dispose']) {
                panel['Dispose']();
            }
            else {
                PopUpManager.Dispose(panel, clearRes, effectType);
            }
        }
    }
    /**
     * 添加面板方法
     * @param panel  面板
     * @param isAlway 界面层级。0:创建开始就一直存在,1级以上，每级只存在一个界面，1级界面打开的必定是2级界面，2级打开必定是3级，以此类推   
     * @param effectType 0：没有动画 1:从中间轻微弹出 2：从中间猛烈弹出  3：从左向右 4：从右向左 5、从上到下 6、从下到上
     * @param showType 主界面上上下两个group是否显示；默认0：不显示；1：全显示；2：只显示上；3：只显示下。
     */
    export function addPanel(panel: Laya.View, isAlway: number, effectType: number = 0, showType: number = 0): void {
        // 当前界面 打开当前界面的情况
        if (PopUpManager.curPanel == panel) {
            PopUpManager.curPanel.visible = true;
            return
        }
        // 全屏适配
        panel.top = panel.bottom = panel.left = panel.right = 0;
        panel['LCP_isAlway'] = isAlway;
        panel['LCP_effectType'] = effectType;
        panel['LCP_showType'] = showType;
        // 添加监听界面Dispose事件
        panel.on(LcpEvent.PANEL_REMOVE, this, (panelName, isAlway, showType) => {
            // 修改ALLPANEL中的数据
            ALLPANEL.remove(isAlway);
            // 归还给main上下两个组
            switch (showType) {
                case 0:
                    break;
                case 1:
                    PanelManage.Main.showGroupTop(PanelManage.Main);
                    PanelManage.Main.showGroupBottom(PanelManage.Main);
                    break;
                case 2:
                    PanelManage.Main.showGroupTop(PanelManage.Main);
                    break;
                case 3:
                    PanelManage.Main.showGroupBottom(PanelManage.Main);
                    break;
            }
            // isAlway的低一级界面的标识
            let _tmp = [0]
            for (let i = 0; i < lenn; i++) {
                let j = ALLPANEL.keys[i]
                if (j != undefined && j < isAlway) {
                    _tmp.push(j)
                }
            }
            let lowIsAlways = _tmp[_tmp.length - 1];
            // 显示低一层的界面
            let nextPanel = ALLPANEL.get(lowIsAlways);
            if (nextPanel) {
                nextPanel.visible = true;
                switch (nextPanel['LCP_showType']) {
                    case 0:
                        break;
                    case 1:
                        PanelManage.Main.showGroupTop(nextPanel);
                        PanelManage.Main.showGroupBottom(nextPanel);
                        break;
                    case 2:
                        PanelManage.Main.showGroupTop(nextPanel);
                        break;
                    case 3:
                        PanelManage.Main.showGroupBottom(nextPanel);
                        break;
                }
                // 同步数据
                PopUpManager.curPanel = nextPanel;
            }
        });
        // 界面层级管理
        let lenn = ALLPANEL.keys.length;
        if (isAlway >= 0) {
            // isAlway的低一级界面的标识
            let _tmpArray = [0]
            for (let i = 0; i < lenn; i++) {
                let _tmp = ALLPANEL.keys[i]
                if (_tmp != undefined && _tmp < isAlway) {
                    _tmpArray.push(_tmp)
                }
            }
            let lowIsAlways = _tmpArray[_tmpArray.length - 1];
            for (let i = lenn - 1; i >= 0; i--) {
                let tmp = ALLPANEL.keys[i]
                if (tmp != undefined) {
                    // 高于界面全部销毁掉
                    if (tmp >= isAlway) {
                        checkPanel(ALLPANEL.get(tmp))
                    }
                    // 低一级界面显示,其他隐藏掉
                    else if (tmp != lowIsAlways) {
                        ALLPANEL.get(tmp).visible = false;
                    }
                }
            }
        }
        else {
            console.error('panel error,isAlway must > 0');
            return
        }
        // 主界面上、下 两个小组显示
        switch (showType) {
            // 默认是0,不显示
            case 0:
                break;
            case 1:
                PanelManage.Main.showGroupTop(panel);
                PanelManage.Main.showGroupBottom(panel);
                break;
            case 2:
                PanelManage.Main.showGroupTop(panel);
                break;
            case 3:
                PanelManage.Main.showGroupBottom(panel);
                break;
        }
        // 数据同步
        ALLPANEL.set(isAlway, panel);
        // 更新游戏配置
        PopUpManager.curPanel = panel;
        // 避免闪屏
        panel.alpha = 0;
        // 将界面放到显示列表中
        PanelManage.euiLayer.addChild(panel);
        //以下是弹窗动画
        let popUpWidth = panel.width;
        let popUpHeight = panel.height;
        switch (effectType) {
            case 0:
                panel.alpha = 1;
                break;
            case 1:
                panel.scaleX = 0.5;
                panel.scaleY = 0.5;
                panel.x = panel.x + popUpWidth / 4;
                panel.y = panel.y + popUpHeight / 4;
                Laya.Tween.to(panel, { alpha: 1, scaleX: 1, scaleY: 1, x: panel.x - popUpWidth / 4, y: panel.y - popUpHeight / 4 }, 300, Laya.Ease.backOut);
                break;
            case 2:
                panel.scaleX = 0.5;
                panel.scaleY = 0.5;
                panel.x = panel.x + popUpWidth / 4;
                panel.y = panel.y + popUpHeight / 4;
                Laya.Tween.to(panel, { alpha: 1, scaleX: 1, scaleY: 1, x: panel.x - popUpWidth / 4, y: panel.y - popUpHeight / 4 }, 500, Laya.Ease.elasticOut);
                break;
            case 3:
                panel.x = - popUpWidth;
                Laya.Tween.to(panel, { x: 0, alpha: 1 }, 500, Laya.Ease.cubicOut);
                break;
            case 4:
                panel.x = popUpWidth;
                Laya.Tween.to(panel, { x: 0, alpha: 1 }, 500, Laya.Ease.cubicOut);
                break;
            case 5:
                panel.y = - popUpHeight;
                Laya.Tween.to(panel, { y: 0, alpha: 1 }, 500, Laya.Ease.cubicOut);
                break;
            case 6:
                panel.y = popUpHeight;
                Laya.Tween.to(panel, { y: 0, alpha: 1 }, 500, Laya.Ease.cubicOut);
                break;
            default:
                panel.alpha = 1;
                break;
        }
    }

    /**
     * 销毁N层级以上的所有界面,不重新创建界面的方式显示界面
     * @param panel 面板
     */
    export function showPanel(panel: Laya.View): void {
        // 当前界面 打开当前界面的情况
        if (PopUpManager.curPanel == panel) {
            PopUpManager.curPanel.visible = true;
            return
        }
        if (panel == undefined || panel.destroyed) {
            return
        }
        // 界面层级管理
        let lenn = ALLPANEL.keys.length;
        let isAlway = panel['LCP_isAlway'];
        // isAlway的低一级界面的标识
        let _tmpArray = [0]
        for (let i = 0; i < lenn; i++) {
            let _tmp = ALLPANEL.keys[i]
            if (_tmp != undefined && _tmp < isAlway) {
                _tmpArray.push(_tmp)
            }
        }
        let lowIsAlways = Math.max.apply(null, _tmpArray);
        for (let i = lenn - 1; i >= 0; i--) {
            let tmp = ALLPANEL.keys[i];
            if (tmp != undefined) {
                // 高于本界面全部销毁掉
                if (tmp > isAlway) {
                    checkPanel(ALLPANEL.get(tmp))
                }
                // 低于低一层界面隐藏掉
                else if (tmp < lowIsAlways) {
                    ALLPANEL.get(tmp).visible = false;
                }
                // 本级以及低一级的界面显示
                else {
                    ALLPANEL.get(tmp).visible = true;
                }
            }
        }
        // 更新游戏配置
        PopUpManager.curPanel = panel;
    }



    /**
    * 销毁单个界面方法
    * @param panel 销毁的目标界面
    * @param clearRes 是否清理内存图片资源 true:销毁资源
    * @param effectType 0：没有动画 1:从中间缩小消失 2:无动画,避免黑屏，延时销毁 3：从左向右 4：从右向左 5、从上到下 6、从下到上
    */
    export function Dispose(panel: Laya.Sprite, clearRes = true, effectType: number = 0): void {
        // 派发销毁事件,将销毁界面的INFo传出
        panel.event(LcpEvent.PANEL_REMOVE, [panel.name, panel['LCP_isAlway'], panel['LCP_showType']]);
        // 动画完成的函数
        let comFunc = () => {
            // 销毁显存资源
            if (clearRes) {
                panel.visible = false;
                // 如果有皮肤资源，则清理
                if (panel['LCP_skin']) {
                    for (let i = 0; i < panel['LCP_skin'].length; i++) {
                        Laya.loader.clearTextureRes(panel['LCP_skin'][i].url);
                    }
                }
            }
            // 销毁所有缓动
            Laya.Tween.clearAll(panel);
            // 销毁内存对象,但是并不是null,destroy是等js自动垃圾回收机制回收
            panel.destroy(true);
            panel = null;
        }
        let comHandle = Laya.Handler.create(this, comFunc)
        //播放消失动画
        switch (effectType) {
            case 0:
                comFunc();
                break;
            case 1:
                Laya.Tween.to(panel, { alpha: 0, scaleX: 0, scaleY: 0 }, 500, null, comHandle);
                break;
            case 2:
                Laya.Tween.to(panel, { alpha: 0 }, 1000, null, comHandle);
                break;
            case 3:
                Laya.Tween.to(panel, { x: panel.width }, 500, Laya.Ease.cubicOut, comHandle);
                break;
            case 4:
                Laya.Tween.to(panel, { x: -panel.width }, 500, Laya.Ease.cubicOut, comHandle);
                break;
            case 5:
                Laya.Tween.to(panel, { y: panel.height }, 500, Laya.Ease.cubicOut, comHandle);
                break;
            case 6:
                Laya.Tween.to(panel, { y: -panel.height }, 500, Laya.Ease.cubicOut, comHandle);
                break;
            default:
                comFunc();
                break;
        }

    }

}


