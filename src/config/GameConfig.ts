/**
* pipixia 
*/
module GameConfig {

    //当前面板
    export var curPanel: Laya.View;

    //当前游戏宽度
    export function curWidth(): number {
        return Laya.stage.width;
    }

    //当前游戏宽度
    export function curHeight(): number {
        return Laya.stage.height;
    }

    //是横屏还是竖屏
    export function isVertical(): boolean {
        var angle = window["orientation"];
        if (angle == 90) {
            return false;
        } else {
            return true;
        }
    }

}