/* eslint-disable no-unused-vars */
import WebGL = Laya.WebGL;
// 程序入口
class GameMain {

    constructor() {
        //初始化微信小游戏
        Laya.MiniAdpter.init();
        // 初始化客户端
        App.Init()
        this.initGame();
        this.createGameScene();
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
        if (App.IsDebug) {
            Laya.Stat.show(0, 0);
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
        box.bottom = box.top = box.left = box.right = 0;
        box.autoSize = true;
        return box
    }

}
new GameMain();
