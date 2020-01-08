module SheetConfig {
    export class Introduction_play {
        public data; private _instance; public constructor(data) { this.data = data; }
        public static getInstance(data): Introduction_play { let Class: any = this; if (!Class._instance) { Class._instance = new Class(data); } return Class._instance; }
        /**
         *  介绍对应ID
         */
        public ID(configID): string { return this.data[configID][0] }
        /**
         *  介绍名称
         */
        public NAME(configID): string { return this.data[configID][1] }
        /**
         *  介绍页签分类
         */
        public TYPE(configID): number { return this.data[configID][2] }
        /**
         *  介绍解锁等级
         */
        public LEVEL(configID): number { return this.data[configID][3] }
        /**
         *  描述文本1
         */
        public TEXT1(configID): string { return this.data[configID][4] }
        /**
         *  描述文本2
         */
        public TEXT2(configID): string { return this.data[configID][5] }
        /**
         *  描述文本3
         */
        public TEXT3(configID): string { return this.data[configID][6] }
        /**
         *  奖励
         */
        public REWARD(configID): number { return this.data[configID][7] }
        /**
         *  奖励物品数量
         */
        public REWARDNUMBER(configID): number { return this.data[configID][8] }
        /**
         *  具体介绍
         */
        public CONTENT(configID): string { return this.data[configID][9] }
        /**
         *  介绍Icon图标
         */
        public ICON(configID): string { return this.data[configID][10] }
        /**
         *  养成途径
         */
        public GROWUPDES(configID): string { return this.data[configID][11] }
        /**
             * 全部数据
             */
        public GETDATALIST(typeKey): any {
            this.data;
            let tempDate = [];
            for (let i in this.data) {
                if (this.data[i][1] == typeKey) {
                    let base = this.data[i]
                    tempDate.push(base)
                }
            }
            return tempDate;
        }
    }
}