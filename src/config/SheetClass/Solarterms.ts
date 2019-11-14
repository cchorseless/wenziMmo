module SheetConfig {
    export class Solarterms {
        public data; private _instance; public constructor(data) { this.data = data; }
        public static getInstance(data): Solarterms { let Class: any = this; if (!Class._instance) { Class._instance = new Class(data); } return Class._instance; }
        /**
         *  名称
         */
        public NAME(configID: string): string { return this.data[configID][0] }
        /**
         *  类型
         */
        public TYPE(configID: string): string { return this.data[configID][1] }
        /**
         *  对应时间
         */
        public TIME(configID: string): string { return this.data[configID][2] }
        /**
         *  具体介绍
         */
        public INTRODUCE(configID: string): string { return this.data[configID][3] }
        /**
         * 全部数据
         */
        public GETDATALIST(type): any {
            let tempDate = [];
            for (let i in this.data) {
                if (this.data[i][1] == type) {
                    let base = this.data[i]
                    tempDate.push(base)
                }
            }
            return tempDate;
        }
    }
}