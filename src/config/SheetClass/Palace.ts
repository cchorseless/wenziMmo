module SheetConfig {
    export class Palace {
        public data; private _instance; public constructor(data) { this.data = data; }
        public static getInstance(data): Palace { let Class: any = this; if (!Class._instance) { Class._instance = new Class(data); } return Class._instance; }
        /**
         *  宫格
         */
        public PALACE(configID: string): number { return this.data[configID][0] }
        /**
         *  对应属性
         */
        public ATTRIBUTE(configID: string): number { return this.data[configID][1] }

    }
}