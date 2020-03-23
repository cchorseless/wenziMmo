/**
 * 帧动画管理
 * by pipixia
 */
module McManage {

    /**
     * 帧动画类
     */
    export class McAnimation extends Laya.Animation {
        // 所有帧名称
        public _allFrameName;
        // 动画组
        public allAniGroup;
        // 事件组标签
        public allEventLable;

        public constructor() {
            super();
            this._allFrameName = [];
            this.allAniGroup = {};
            this.allEventLable = [];

        }
        /**
        * 加载动画资源,png资源
        * @param AnimationData   
        * @param comFunc       
        */
        public loadMcRes(AnimationData, comFunc: Function = () => { }): void {
            // 如果资源不存在
            // let res = AnimationData.group;
            // if (!res) {
            //     comFunc();
            //     return
            // };
            // // 加载资源
            // this.loadAtlas(res, Laya.Handler.create(this, () => {
            //     if (data) {
            //         // 所有帧的key
            //         let frames = data.frames;
            //         let prefix = data.meta.prefix;
            //         for (let key in frames) {
            //             // this._allFrameName.push(prefix + key);
            //             console.log(prefix + key);
            //             this._allFrameName.push('image/common/skillTween/' + key);
            //             console.log()
            //         }
            //         // 使用groups将图集分组
            //         let groups = AnimationData['group'] || [{ name: 'default', start: 1, end: this._allFrameName.length }];
            //         let len = groups.length;
            //         for (let i = 0; i < len; i++) {
            //             let _frame = groups[i];
            //             // 每个组的动画帧数组
            //             this.allAniGroup[_frame.name] = [];
            //             for (let j = _frame.start - 1; j < _frame.end; j++) {
            //                 this.allAniGroup[_frame.name].push(this._allFrameName[j]);
            //             }
            //         }
            //         // 使用events抛出帧事件
            //         let events = AnimationData['events'];
            //         if (events) {
            //             let len = events.length;
            //             for (let i = 0; i < len; i++) {
            //                 let eventInfo = events[i];
            //                 this.addLabel(eventInfo.name, eventInfo.frame);
            //                 this.allEventLable.push(eventInfo.name);
            //             }
            //         }
            //     }
            //     // 创建动画模板
            //     for (let key in this.allAniGroup) {
            //         Laya.Animation.createFrames(this.allAniGroup[key], key);
            //     }
            //     // 回调函数；
            //     comFunc();

            // }))


        }

        /**
         * 获取动画组名称
         */
        public getAniGroupName(): Array<string> {
            let result = []
            for (let key in this.allAniGroup) {
                result.push(key)
            }
            return result;
        }
        /**
         * 获取帧事件标签
         */
        public getAllEventLable(): Array<string> {
            return this.allEventLable;
        }


        /**
         * 播放一次动画
         * @param name 
         * @param finishfunc
         */
        public playAni(name, finishfunc) {
            this.once(Laya.UIEvent.COMPLETE, this, finishfunc);
            super.play(0, false, name)
        }
    }





}