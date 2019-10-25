module SheetConfig {
    export class Synthesis {
        private data; private _instance; public constructor(data) { this.data = data; }
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
        /**
        * 获取等级装备合成数据    等级（1，1/2）   神装（2，）  热血
        */
        public BLvEquipAlldata(configID: number, tab: number, lv: number) {
            let baseData = [];
            for (let i in this.data) {
                if (lv) {
                    if (this.data[i][0] == configID && this.data[i][1] == tab&&this.data[i][2] == lv) {
                        let base = this.data[i]
                        baseData.push(base)
                    }
                } else {
                    if (this.data[i][0] == configID && this.data[i][1] == tab) {
                        let base = this.data[i]
                        baseData.push(base)
                    }
                }

            }
            return baseData;
        }
    }
}