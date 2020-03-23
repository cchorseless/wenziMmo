module SheetConfig {
    export class sifa_consume {
        public data; private _instance; public constructor(data) { this.data = data; }
        public static getInstance(data): sifa_consume { let Class: any = this; if (!Class._instance) { Class._instance = new Class(data); } return Class._instance; }
        /**
         *  id顺序
         */
        public ID(configID): string { return this.data[configID][0] }
        /**
         *  升级对应等级
         */
        public LEVEL(configID): number { return this.data[configID][1] }
        /**
         *  对应分类
         */
        public TYPE(configID): number { return this.data[configID][2] }
        /**
         *  升级所需材料与数量
         */
        public NEED_MATERIAL(configID): any { return this.data[configID][3] }
        /**
         *  升级所需要的金币
         */
        public NEED_GOLD(configID): number { return this.data[configID][4] }

    }
}