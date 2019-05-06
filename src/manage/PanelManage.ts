/**
 * 游戏界面管理
 */
module PanelManage {
    /**
     * 主界面显示组枚举
     */
    enum ShowType {
        NONE = 0,
        ALL = 1,
        TOP = 2,
        BOTTOM = 3
    }
    /**
     * 界面显示特效枚举
     * 0：没有动画 1:从中间轻微弹出 2：从中间猛烈弹出  3：从左向右 4：从右向左 5、从上到下 6、从下到上
     */
    enum EffectType {
        NONE = 0,
        CENTER_S = 1,
        CENTER_H = 2,
        L2R = 3,
        R2L = 4,
        T2B = 5,
        B2T = 6
    }

    /**********************************界面层************************************ */
    export let tipsLayer: Laya.Box;                                                      //文字气泡提示
    export let euiLayer: Laya.Box;                                                       //界面弹窗提示
    export let StartLoading: view.loading.StartLoadingPanel                              //开始游戏加载界面
    export var netLoading: view.common.NetLoadingPanel;                                  //服务器网络数据加载界面
    export let resloading: view.common.ResLoadingPanel;                                  //游戏中加载资源切换场景界面
    export let serverError: view.common.ServerErrorPanel;                                //服务器意外失去连接界面
    export let GM: view.common.GmPanel;                                                  //GM界面
    export let Login: view.common.LoginPanel;                                             //登陆界面
    export let ServerList: view.common.ServerListPanel;                                   //服务器列表界面
    export let Main: view.main.MainPanel;                                                //主界面                                               //测试界面
    /*****************************游戏界面************************************* */
 
    // export let Make:
    /*****************************通用方法************************************* */

    // 游戏开始的资源加载界面
    export function openStartLoadingPanel(): void {
        PopUpManager.checkPanel(PanelManage.StartLoading);
        ResManage.loadResource(null, () => {
            PanelManage.StartLoading = new view.loading.StartLoadingPanel();
            PanelManage.StartLoading['LCP_skin'] = null;
            PanelManage.euiLayer.addChild(PanelManage.StartLoading);
            PanelManage.StartLoading.gameInit();
        });
    }
    //服务器意外失去连接界面
    export function openServerErrorPanel(): void {
        PopUpManager.checkPanel(PanelManage.serverError);
        ResManage.loadResource(null, () => {
            PanelManage.serverError = new view.common.ServerErrorPanel();
            PanelManage.serverError['LCP_skin'] = null;
            PanelManage.serverError.setData();
            PopUpManager.addPanel(PanelManage.serverError, 1, 2);
        });
    }
    // 加载游戏主界面
    export function loadMainPanel(): void {
        PopUpManager.checkPanel(PanelManage.Main);
        ResManage.loadResource(ResData.PanelRes.Main, () => {
            PanelManage.Main = new view.main.MainPanel();
            PanelManage.Main['LCP_skin'] = ResData.PanelRes.Main;
            PanelManage.Main.setData();
            PopUpManager.addPanel(PanelManage.Main, 0);
            // 为了避免黑屏，这里特殊化处理一下销毁StartLoadingPanel
            PopUpManager.checkPanel(PanelManage.StartLoading, true, 2);
        });
    }
    // GM工具
    export function openGmPanel(): void {
        if (GameConfig.curPanel && GameConfig.curPanel == PanelManage.GM) {
            return
        }
        PopUpManager.checkPanel(PanelManage.GM);
        ResManage.loadResource(ResData.PanelRes.GM, () => {
            PanelManage.GM = new view.common.GmPanel();
            PanelManage.GM['LCP_skin'] = ResData.PanelRes.GM;
            PanelManage.GM.setData();
            PanelManage.GM.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.GM, 99, 0, ShowType.BOTTOM);
        })
    }
    // 登陆界面
    export function openLoginPanel(): void {
        if (GameConfig.curPanel && GameConfig.curPanel == PanelManage.Login) {
            return
        }
        PopUpManager.checkPanel(PanelManage.Login);
        ResManage.loadResource(ResData.PanelRes.Login, () => {
            PanelManage.Login = new view.common.LoginPanel();
            PanelManage.Login['LCP_skin'] = ResData.PanelRes.Login;
            PanelManage.Login.setData();
            PanelManage.Login.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.Login, 0);
        })
    }
    // 服务器列表界面
    export function openServerListPanel(): void {
        if (GameConfig.curPanel && GameConfig.curPanel == PanelManage.ServerList) {
            return
        }
        PopUpManager.checkPanel(PanelManage.ServerList);
        ResManage.loadResource(ResData.PanelRes.ServerList, () => {
            PanelManage.ServerList = new view.common.ServerListPanel();
            PanelManage.ServerList['LCP_skin'] = ResData.PanelRes.ServerList;
            PanelManage.ServerList.setData();
            PanelManage.ServerList.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.ServerList, 1);
        })
    }
    /**
     * 显示主界面
     */
    export function openMainPanel(): void {
        if (PanelManage.Main) {
            PopUpManager.showPanel(PanelManage.Main);
        }
        else {
            PanelManage.loadMainPanel();
        }
    }
    /******************************游戏界面************************************* */
   


}