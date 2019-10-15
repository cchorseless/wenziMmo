module SheetConfig {
    export class Palace {
        private data; private _instance; public constructor(data) { this.data = data; }
        public static getInstance(data): Palace { let Class: any = this; if (!Class._instance) { Class._instance = new Class(data); } return Class._instance; }
        /**
         *  宫格
         */
        public PALACE(configID: string): number { return this.data[configID][0] }
        /**
         *  对应属性
         */
        public ATTRIBUTE(configID: string): number { return this.data[configID][1] }
        /**
         *  显示文字
         */
        public TYPE(configID, pro): string {
            for (let i in this.data) {
                if (this.data[i][0] == configID) {
                    if (this.data[i][1] == pro) {
                        return this.data[i][2];
                    }
                }
            }
        }
    }
}