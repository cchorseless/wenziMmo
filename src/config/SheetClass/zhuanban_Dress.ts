module SheetConfig {
    export class zhuanban_Dress {
        private data; private _instance; public constructor(data) { this.data = data; }
        public static getInstance(data): zhuanban_Dress { let Class: any = this; if (!Class._instance) { Class._instance = new Class(data); } return Class._instance; }
        /**
         *  名称
         */
        public NAME(configID: string): string { return this.data[configID][0] }
        /**
         *  效果表ID
         */
        public EFFECTID(configID: string): string { return this.data[configID][1] }
        /**
         *  类型
         */
        public TYPE(configID: string): number { return this.data[configID][2] }
        /**
         *  子分类
         */
        public MINTYPE(configID: string): number { return this.data[configID][3] }
        /**
         *  称号描述
         */
        public DESCRIBE(configID: string): string { return this.data[configID][4] }
        /**
         *  美术资源
         */
        public RESOURCES(configID: string): string { return this.data[configID][5] }
        /**
         *  根据类型  返回数据  type:1时装 4：罡气 3：称号
         */
        public GETDATABYTYPE(type: number): any {
            let baseData = [];
            for (let i in this.data) {
                if (this.data[i][2] == type) {
                    baseData.push(this.data[i])
                }
            }
            return baseData;
        }
        public GETDATABYID(configID: string): any {
            let baseData = this.data[configID];
            return baseData;

        }
    }
}