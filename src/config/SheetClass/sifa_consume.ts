module SheetConfig {
    export class sifa_consume {
        private data; private _instance; public constructor(data) { this.data = data; }
        public static getInstance(data): sifa_consume { let Class: any = this; if (!Class._instance) { Class._instance = new Class(data); } return Class._instance; }
        /**
         *  等级
         */
        public LEVEL(configID: string): number { return this.data[configID][0] }
        /**
         *  分类
         */
        public TYPE(configID: string): number { return this.data[configID][1] }
        /**
         *  所需材料
         */
        public NEED_MATERIAL(configID: string): string { return this.data[configID][2] }
        /**
         *  所需金币
         */
        public NEED_GOLD(configID: string): number { return this.data[configID][3] }
        /**
         * 根据分类和等级找到对应材料数据
         */
        public GETDATABYTYPEANDLVL(type: number, lvl: number) {
            let final;
            let lvlArray = [];
            for (let index in this.data) {
                if (this.data[index][0] == lvl) {
                    lvlArray.push(this.data[index]);
                }
            }
            for (let part of lvlArray) {
                if (part[1] == type) {
                    final = part;
                }
            }
            return final;
        }
    }
}