module SheetConfig {
    export class zhuanban_Dress {
        public data; private _instance; public constructor(data) { this.data = data; }
        public static getInstance(data): zhuanban_Dress { let Class: any = this; if (!Class._instance) { Class._instance = new Class(data); } return Class._instance; }
        /**
         *  物品名称
         */
        public NAME(configID): string { return this.data[configID][0] }
        /**
         *  效果表ID
         */
        public EFFECTID(configID): string { return this.data[configID][1] }
        /**
         *  大分类
         */
        public TYPE(configID): number { return this.data[configID][2] }
        /**
         *  页签分类
         */
        public MINTYPE(configID): number { return this.data[configID][3] }
        /**
         *  获取途径
         */
        public DESCRIBE(configID): string { return this.data[configID][4] }
        /**
         *  物品Icon，效果美术资源
         */
        public RESOURCES(configID): string { return this.data[configID][5] }
       
    }
}