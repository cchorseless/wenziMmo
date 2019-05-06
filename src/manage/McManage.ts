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
        * 加载动画资源
        * @param res 
        */
        public loadMcRes(res, comFunc: Function = () => { }): void {
            // 如果资源不存在
            if (!res) {
                comFunc();
                return
            }
            // 加载资源
            Laya.loader.load(res, Laya.Handler.create(this, (data) => {
                if (data) {
                    // 所有帧的key
                    let framesInfo = data.frames;
                    let prefix = data.meta.prefix;
                    for (let key in framesInfo) {
                        this._allFrameName.push(prefix + key);
                    }
                    // 使用groups将图集分组
                    let groups = data['groups'] || [{ name: 'default', frame: 1, end: this._allFrameName.length }];
                    let len = groups.length;
                    for (let i = 0; i < len; i++) {
                        let _frame = groups[i];
                        // 每个组的动画帧数组
                        this.allAniGroup[_frame.name] = [];
                        for (let j = _frame.frame - 1; j < _frame.end; j++) {
                            this.allAniGroup[_frame.name].push(this._allFrameName[j]);
                        }
                    }
                    // 使用events抛出帧事件
                    let events = data['events'];
                    if (events) {
                        let len = events.length;
                        for (let i = 0; i < len; i++) {
                            let eventInfo = events[i];
                            this.addLabel(eventInfo.name, eventInfo.frame);
                            this.allEventLable.push(eventInfo.name);
                        }
                    }
                }
                // 创建动画模板
                for (let key in this.allAniGroup) {
                    Laya.Animation.createFrames(this.allAniGroup[key], key);
                }
                // 回调函数；
                comFunc();
            }))
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
    }
}