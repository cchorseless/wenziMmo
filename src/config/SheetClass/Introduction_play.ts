module SheetConfig {
    export class Introduction_play {
        private data; private _instance; public constructor(data) { this.data = data; }
        public static getInstance(data): Introduction_play { let Class: any = this; if (!Class._instance) { Class._instance = new Class(data); } return Class._instance; }
        /**
         *  名字
         */
        public NAME(configID: string): string { return this.data[configID][0] }
        /**
         *  页签分类
         */
        public TYPE(configID: string): number { return this.data[configID][1] }
        /**
         *  解锁等级
         */
        public LEVEL(configID: string): number { return this.data[configID][2] }
        /**
         *  文本1
         */
        public TEXT1(configID: string): string { return this.data[configID][3] }
        /**
         *  文本2
         */
        public TEXT2(configID: string): string { return this.data[configID][4] }
        /**
         *  文本3
         */
        public TEXT3(configID: string): string { return this.data[configID][5] }
        /**
         *  奖励
         */
        public REWARD(configID: string): number { return this.data[configID][6] }
        /**
         *  奖励数量
         */
        public REWARDNUMBER(configID: string): number { return this.data[configID][7] }
        /**
         *  具体内容
         */
        public CONTENT(configID: string): string { return this.data[configID][8] }
        /**
         *  介绍图标
         */
        public ICON(configID: string): string { return this.data[configID][9] }
        /**
         *  养成途径
         */
        public GROWUPDES(configID: string): string { return this.data[configID][10] }
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