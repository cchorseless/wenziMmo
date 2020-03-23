module SheetConfig {
    export class Strategy {
        public data; private _instance; public constructor(data) { this.data = data; }
        public static getInstance(data): Strategy { let Class: any = this; if (!Class._instance) { Class._instance = new Class(data); } return Class._instance; }
        /**
         *  名称
         */
        public NAME(configID: string): string { return this.data[configID][0] }
        /**
         *  分类
         */
        public TYPE(configID: string): number { return this.data[configID][1] }
        /**
         *  对应说明
         */
        public EXPLAIN(configID: string): string { return this.data[configID][2] }

    }
}