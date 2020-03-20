module SheetConfig {
    export class Synthesis {
        public data; private _instance; public constructor(data) { this.data = data; }
        public static getInstance(data): Synthesis { let Class: any = this; if (!Class._instance) { Class._instance = new Class(data); } return Class._instance; }
        /**
         *  大分类
         */
        public BSORT(configID: string): number { return this.data[configID][0] }
        /**
         *  子分类
         */
        public SORT(configID: string): number { return this.data[configID][1] }
        /**
         *  子分类2
         */
        public SORT2(configID: string): number { return this.data[configID][2] }
        /**
         *  对应物品ID
         */
        public ITEMID(configID: string): number { return this.data[configID][3] }
        /**
         *  所需材料ID
         */
        public SCIENCEID(configID: string): number { return this.data[configID][4] }
        /**
         *  所需材料数量
         */
        public SCIENCENUM(configID: string): number { return this.data[configID][5] }

    }
}