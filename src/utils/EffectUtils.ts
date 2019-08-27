/**
  * 游戏特效汇总
  * by 皮皮虾
  * 使用方法如：EffectUtils.rotationEffect()
  */

module EffectUtils {

    /**
     * 跳动数字特效
     * @param txt label
     * @param result 最终的显示结果
     * @param cb 回调函数
     */
    export class NumEffect {
        private txt: any = null;
        private result: number = 0;
        private cb: Function;
        public constructor(txt, result, cb, dur) {
            this.txt = txt;
            this.result = result;
            this.cb = cb;
            this.tweenNum(dur);
        }
        public get num(): number {
            var n = "";
            if (this.txt) {
                n = this.txt.text;
            }
            return parseInt(n);
        }

        public set num(value) {
            if (this.txt) {
                this.txt.text = Math.ceil(value);
            }
            if (value == this.result) {
                if (this.cb) {
                    this.cb();
                }
                this.dispose();
            }
        }
        private tweenNum(dur): void {
            Laya.Tween.to(this, { num: this.result }, dur);
        }
        private dispose(): void {
            Laya.Tween.clearAll(this);
            this.txt = null;
            this.result = 0;
            this.cb = null;
        }
    }

    /**
     * 对象旋转特效
     * @param obj 旋转对象
     * @param time 旋转一周用时，毫秒
     * @param times 旋转次数 默认-1，一致旋转；大于0为旋转周数
     */
    export function playRotationEffect(obj, time: number = 1000, times: number = -1): void {

        var onComplete1: Function = function () {
            Laya.Tween.to(obj, { rotation: 360 + obj.rotation }, time, null, Laya.Handler.create(this, onComplete1))
        };
        if (times >= 0) {
            Laya.Tween.to(obj, { rotation: 360 * times + obj.rotation }, time * times)
        }
        else {
            onComplete1();
        }
    }

    /**
     * 对象闪烁特效
     * @param obj 闪烁对象
     * @param interval 闪烁时间间隔
     * @param times 闪烁次数，0；不闪烁。小于0：一直闪烁
     */
    export function playBlinkEffect(obj, interval: number = 1000, times: number = -1, cb: Function): void {
        var onComplete1: Function = function () {
            Laya.Tween.to(obj, { alpha: 0 }, interval, null, Laya.Handler.create(this, onComplete2))
        }
        var onComplete2: Function = function () {
            if (times != 0) {
                Laya.Tween.to(obj, { alpha: 1 }, interval, null, Laya.Handler.create(this, onComplete1))
                times -= 1;
            }
            else {
                Laya.Tween.to(obj, { alpha: 1 }, interval, null, Laya.Handler.create(this, cb));
            }
        }
        Laya.Tween.to(obj, { alpha: 0 }, interval, null, Laya.Handler.create(this, onComplete2));
    }
    /**
    * 给显示对象增加持续放大特效
    * @param obj           对象
    * @param tt 时间
    */
    export function playScaleEffect(obj, tt: number = 1000): void {
        var onComplete2: Function = function () {
            obj.scaleX = 1;
            obj.scaleY = 1;
            Laya.Tween.to(obj, { alpha: 1 }, tt, null, Laya.Handler.create(this, onComplete1));
        };
        var onComplete1: Function = function () {
            obj.alpha = 1;
            Laya.Tween.to(obj, { scaleX: 1.5, scaleY: 1.5, alpha: 0 }, tt, null, Laya.Handler.create(this, onComplete2));
        };
        onComplete1();
    }

    /**
     * 左右抖动对象特效
     * @param obj 抖动对象
     * @param scope 抖动幅度
     * @param shakeNum 抖动时间
     */
    export function playShakeX(obj, scope: number = 20, shakeNum: number = 80): void {
        var oldX: number = obj.x;
        let onComplete3 = () => {
            Laya.Tween.to(obj, { x: oldX }, shakeNum)
        }
        let onComplete2 = () => {
            Laya.Tween.to(obj, { x: obj.x + scope }, shakeNum, null, Laya.Handler.create(this, onComplete3))
        }

        let onComplete1 = () => {
            Laya.Tween.to(obj, { x: obj.x - scope }, shakeNum, null, Laya.Handler.create(this, onComplete2))
        }
        let onComplete = () => {
            Laya.Tween.to(obj, { x: obj.x + scope }, shakeNum, null, Laya.Handler.create(this, onComplete1))
        }

        Laya.Tween.to(obj, { x: obj.x - scope / 2 }, shakeNum, null, Laya.Handler.create(this, onComplete))
    }
    /**
     * 上下抖动对象特效
     * @param obj 抖动对象
     * @param scope 抖动幅度
     * @param shakeNum 抖动时间
     */
    export function playShakeY(obj, scope: number = 20, shakeNum: number = 80): void {
        var oldY: number = obj.y;
        let onComplete3 = () => {
            Laya.Tween.to(obj, { y: oldY }, shakeNum)
        }
        let onComplete2 = () => {
            Laya.Tween.to(obj, { y: obj.y + scope }, shakeNum, null, Laya.Handler.create(this, onComplete3))
        }

        let onComplete1 = () => {
            Laya.Tween.to(obj, { y: obj.y - scope }, shakeNum, null, Laya.Handler.create(this, onComplete2))
        }
        let onComplete = () => {
            Laya.Tween.to(obj, { y: obj.y + scope }, shakeNum, null, Laya.Handler.create(this, onComplete1))
        }

        Laya.Tween.to(obj, { y: obj.y - scope / 2 }, shakeNum, null, Laya.Handler.create(this, onComplete))
    }

    //========================== a lot of effect will coming! ============================
    var isPlayEffectPlay: Boolean = false;
    /**
     * 按钮特效1 按钮放大缩小
     * @param obj 按钮对象
     * @param cb 回调函数
     */
    export function playButtonEffect(obj: Laya.Button, cb = () => { }): void {
        let acx = obj.anchorX;
        let acy = obj.anchorY;
        obj.anchorX = 0.5;
        obj.anchorY = 0.5;
        let xx = (obj.anchorX - acx);
        let yy = (obj.anchorY - acy);
        obj.x += xx;
        obj.y += yy;
        let onComplete2: Function = function () {
            this.isPlayEffectPlay = false;
            obj.anchorX = acx;
            obj.anchorY = acy;
            obj.x -= xx;
            obj.y -= yy;
            obj.scaleX = 1;
            obj.scaleY = 1;
            cb();
        };
        let onComplete1: Function = function () {
            Laya.Tween.to(obj, { scaleX: 1, scaleY: 1 }, 100, null, Laya.Handler.create(this, onComplete2));
        };
        Laya.Tween.to(obj, { scaleX: 0.9, scaleY: 0.9 }, 100, Laya.Ease.sineIn, Laya.Handler.create(this, onComplete1))
    }
    /**
     * 按钮特效2 按钮闪烁特效
     * @param obj 按钮对象
     * @param cb 回调函数
     */
    export function playButtonEffect2(obj, cb: Function = () => { }): void {
        if (this.isPlayEffectPlay) {
            return;
        }
        var onComplete2: Function = function () {
            this.isPlayEffectPlay = false;
            if (cb) {
                cb();
            }
        };
        var onComplete1: Function = function () {
            Laya.Tween.to(obj, { alpha: 1 }, 100, null, Laya.Handler.create(this, onComplete2));
        };
        Laya.Tween.to(obj, { alpha: 0.6 }, 100, Laya.Ease.sineIn, Laya.Handler.create(this, onComplete1))
    }



    /**
    * 给显示对象增加特效
    * @param obj           对象
    * @param cartoonType   动画类型 1:【可爱】按下变小，放开弹大 2:按下变小，放开轻微弹大 3：按下变小，放开变大
    */
    export function playEffect(obj, cartoonType: number = 1, cb = () => { }): void {
        if (this.isPlayEffectPlay) {
            return;
        }
        this.isPlayEffectPlay = true;
        var onComplete2: Function = function () {
            this.isPlayEffectPlay = false;
            cb();
        };
        var onComplete1: Function = function () {
            if (cartoonType == 1) {
                Laya.Tween.to(obj, { scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 500, Laya.Ease.elasticOut, Laya.Handler.create(this, onComplete2));
            } else if (cartoonType == 2) {
                Laya.Tween.to(obj, { scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 500, Laya.Ease.backOut, Laya.Handler.create(this, onComplete2));
            } else if (cartoonType == 3) {
                Laya.Tween.to(obj, { scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 100, null, Laya.Handler.create(this, onComplete2));
            }
        };
        Laya.Tween.to(obj, { scaleX: 0.5, scaleY: 0.5, x: obj.x + obj.width / 4, y: obj.y + obj.height / 4 }, 100, Laya.Ease.sineIn, Laya.Handler.create(this, onComplete1));
    }
    /**
     * 果冻效果
     * @param obj 
     * @param callback 
     */
    export function playEffect2(obj, callback = function () { }): void {
        var onComplete2: Function = function () {
            callback();
        };
        var onComplete1: Function = function () {
            Laya.Tween.to(obj, { scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 500, Laya.Ease.elasticOut, Laya.Handler.create(this, onComplete2));
        };
        Laya.Tween.to(obj, { scaleX: 0.5, scaleY: 0.5, x: obj.x + obj.width / 4, y: obj.y + obj.height / 4 }, 100, Laya.Ease.sineIn, Laya.Handler.create(this, onComplete1));
    }

    /**
     * 从大到小，慢慢出现
     * @param obj 
     * @param tt 
     * @param callback 
     */
    export function showEffect1(obj, tt = 800, callback = function () { }): void {
        obj.alpha = 0;
        obj.scaleX = 4;
        obj.scaleY = 4;
        obj.visible = true;
        var onComplete: Function = function () {
            callback();
        };
        Laya.Tween.to(obj, { scaleX: 1, scaleY: 1, alpha: 1 }, 200, null, Laya.Handler.create(this, onComplete));

    }

    /**
     * 从小变大,慢慢出现
     * @param obj 
     * @param tt 
     * @param callback 
     */
    export function showEffect2(obj, tt = 800, callback = function () { }): void {

        obj.scaleX = 0.1;
        obj.scaleY = 0.1;
        obj.alpha = 1;
        obj.visible = true;
        var onComplete1: Function = function () {
            callback();
        };
        Laya.Tween.to(obj, { scaleX: 1, scaleY: 1 }, tt, Laya.Ease.elasticOut, Laya.Handler.create(this, onComplete1));
    }

    /**
     * 从右向左，慢慢出现
     */

    export function showEffect3(obj, tt = 800, callback = function () { }): void {

        obj.visible = true;
        obj.alpha = 0.1;
        obj.x += obj.width / 2;
        var onComplete1: Function = function () {
            callback();
        };
        Laya.Tween.to(obj, { alpha: 1, x: obj.x - obj.width / 2 }, tt, null, Laya.Handler.create(this, onComplete1));

    }
    /**
     * TIPS从大变小，慢慢消失,注意只是隐藏掉了，并没有销毁
     * @param effectTips tips
     * @param tt 显示时间
     * @param callback 销毁后的回调 
     */
    export function disposeEffectTips1(effectTips: Laya.Sprite, tt = 800, callback = () => { }): void {
        effectTips.alpha = 0;
        effectTips.scaleX = 4;
        effectTips.scaleY = 4;
        var onComplete3: Function = function () {
            callback();
        };
        var onComplete2 = () => {
            Laya.Tween.to(effectTips, { alpha: 0 }, tt, null, Laya.Handler.create(this, onComplete3));
        }
        var onComplete1 = () => {
            Laya.Tween.to(effectTips, { alpha: 1 }, tt - 200, null, Laya.Handler.create(this, onComplete2));
        }
        Laya.Tween.to(effectTips, { scaleX: 1, scaleY: 1, alpha: 1 }, 200, null, Laya.Handler.create(this, onComplete1));
    }

    /**
     * 自下而上，慢慢消失，注意只是隐藏掉了，并没有销毁
     * @param effectTips 显示对象
     * @param tt 显示时间
     * @param callback 销毁后的回调 
     */
    export function disposeEffectTips2(effectTips: Laya.Sprite, tt = 200, callback = () => { }): void {
        var onComplete2 = () => {
            callback();
        }
        var onComplete1 = () => {
            Laya.Tween.to(effectTips, { alpha: 0 }, tt * 5, null, Laya.Handler.create(this, onComplete2))
        }
        Laya.Tween.to(effectTips, { y: effectTips.y - 50 }, tt, null, Laya.Handler.create(this, onComplete1));
    }

    /**
     * 从大变小，慢慢消失,注意只是隐藏掉了，并没有销毁
     * @param effectTips 显示对象
     * @param tt 显示时间
     * @param callback 销毁后的回调 
     */
    export function disposeEffect1(effectTips: Laya.Sprite, tt = 800, callback = () => { }): void {
        effectTips.alpha = 1;
        effectTips.scaleX = 1;
        effectTips.scaleY = 1;

        var onComplete1 = () => {
            effectTips.visible = false;
            effectTips.alpha = 1;
            effectTips.scaleX = 1;
            effectTips.scaleY = 1;
            callback();
        }
        Laya.Tween.to(effectTips, { scaleX: 0.1, scaleY: 0.1, alpha: 0 }, tt, null, Laya.Handler.create(this, onComplete1));
    }
    /**
     * 自下而上，慢慢消失，注意只是隐藏掉了，并没有销毁
     * @param effectTips 显示对象
     * @param tt 显示时间
     * @param callback 销毁后的回调 
     */
    export function disposeEffect2(effectTips: Laya.Sprite, tt = 200, callback = () => { }): void {
        var onComplete2 = () => {
            effectTips.visible = false;
            callback();
        }
        var onComplete1 = () => {
            Laya.Tween.to(effectTips, { alpha: 0 }, tt * 5, null, Laya.Handler.create(this, onComplete2))
        }
        Laya.Tween.to(effectTips, { y: effectTips.y - 50 }, tt, null, Laya.Handler.create(this, onComplete1));
    }
    /**
     * 自右向左，慢慢消失，注意只是隐藏掉了，并没有销毁
     * @param effectTips 显示对象
     * @param tt 显示时间
     * @param callback 销毁后的回调 
     */

    export function disposeEffect3(effectTips: Laya.Sprite, tt = 200, callback = () => { }): void {

        let oldX = effectTips.x;
        var onComplete1 = () => {
            effectTips.visible = false;
            effectTips.alpha = 1;
            effectTips.x = oldX;
            callback();
        }
        Laya.Tween.to(effectTips, { x: oldX - effectTips.width / 2, alpha: 0 }, tt, null, Laya.Handler.create(this, onComplete1));
    }

}