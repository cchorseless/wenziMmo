

module SkeletonUtil {
    /**
     * 骨骼动画组，用于角色多个方向的骨骼动画播放
     */
    export class SkeletonGroup extends Laya.Sprite {

        public _SkeletonGroup;
        constructor() {
            super();
        }

        public count;
        public finishFuc;
        loadRes(sk: Array<string>, finishFuc: Function): void {
            this.removeChildren();
            this._SkeletonGroup = this.addChild(new Laya.Sprite());
            this.finishFuc = finishFuc;
            this.count = sk.length;
            for (let path of sk) {
                let tmp = this._SkeletonGroup.addChild(new Laya.Skeleton().pos(0, 0)) as Laya.Skeleton;
                tmp.load(path, Laya.Handler.create(this, () => {
                    tmp.stop();
                    this.loadResFinish();
                }))
            }
        }
        loadResFinish(): void {
            this.count--;
            if (this.count <= 0) {
                this.showChild(0);
                this.finishFuc();
            }
        }
        curSkeleton: Laya.Skeleton
        /**
         * 调整显示哪个骨骼动画
         */
        showChild(index: number, scaleX = 1, scaleY = 1): void {
            if (this.curSkeleton === this._SkeletonGroup.getChildAt(index) && this.curSkeleton.scaleX === scaleX && this.curSkeleton.scaleY === scaleY) return;
            this.curSkeleton = this._SkeletonGroup.getChildAt(index) as Laya.Skeleton;
            this.curSkeleton.scale(scaleX, scaleY);
            for (let i = 0; i < this._SkeletonGroup.numChildren; i++) {
                (this._SkeletonGroup.getChildAt(i) as Laya.Skeleton).stop();
                (this._SkeletonGroup.getChildAt(i) as Laya.Skeleton).visible = (i === index);
            }
        }
        /**
         * 播放当前启用的骨骼动画的动画组
         * @param nameOrIndex 
         * @param loop 
         */
        play(nameOrIndex: any, loop: boolean, force = false, completeHandler: Laya.Handler = null, playbackRate = 1, ): void {
            if (this.curSkeleton) {
                let curSkeleton = this.curSkeleton;
                let eventNAME;
                if (force) {
                    eventNAME = Laya.Event.COMPLETE
                }
                else {
                    eventNAME = Laya.Event.STOPPED;
                }
                curSkeleton.player.once(eventNAME, this, () => {
                    curSkeleton['_currAniIndex'] = -1;
                    if (completeHandler) {
                        completeHandler.run();
                    }
                })
                curSkeleton.player.playbackRate = playbackRate;
                curSkeleton.play(nameOrIndex, loop, force);
            }
        }

        /**
         * 停止播放
         */
        stopPlay(): void {
            this.curSkeleton && this.curSkeleton.stop();
        }
    }
}