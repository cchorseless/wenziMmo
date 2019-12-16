/* eslint-disable no-unused-vars */
import WebGL = Laya.WebGL;
// 程序入口
class GameMain {

    constructor() {
        //初始化微信小游戏
        Laya.MiniAdpter.init();
        this.initGame();
        this.createGameScene();
        GameApp.SDKManager.init(true); //参数设为 true 时 可开启调试模式
        PanelManage.openStartLoadingPanel();
    }

    // 初始化游戏
    private initGame(): void {
        // 初始化界面大小
        Laya.init(640, 1136, WebGL);
        // 设置适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_AUTO;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        Laya.stage.frameRate = Laya.Stage.FRAME_MOUSE;
        // 调试面板
        if (GameApp.GameEngine.IsDebug) {
            // Laya.Stat.show(0, 200);
        }

    }

    /**
     * 创建场景界面
     * Create scene interface
     */
    private createGameScene(): void {
        // 界面层
        let euiLayer = this.createPanel();
        Laya.stage.addChild(euiLayer);
        // tips层
        let tipsLayer = this.createPanel();
        Laya.stage.addChild(tipsLayer);

        PanelManage.euiLayer = euiLayer;
        PanelManage.tipsLayer = tipsLayer;
        PanelManage.tipsLayer.mouseThrough = false;
    }

    /**
     * 创造界面层级
     */
    private createPanel(): Laya.Box {
        let box = new Laya.Box();
        let offY = 0;
        let aspectRatio = Laya.Browser.height / Laya.Browser.width;
        if (aspectRatio > 1.9) {
            offY = 50;
        }
        box.top = offY;
        box.bottom = 0;
        if (Laya.Browser.onIPhone) {
            box.bottom = offY;
        }
        box.left = box.right = 0;
        box.autoSize = true;
        return box
    }

}
new GameMain();
