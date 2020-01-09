module SheetConfig {
    export class mydb_mongen_tbl {
        public data; private _instance; public constructor(data) { this.data = data; }
        public static getInstance(data): mydb_mongen_tbl { let Class: any = this; if (!Class._instance) { Class._instance = new Class(data); } return Class._instance; }
        /**
         *  表格编号
         */
        public TABLE_NUMBER(configID): string { return this.data[configID][0] }
        /**
         *  地图ID
         */
        public ID(configID): number { return this.data[configID][1] }
        /**
         *  删除
         */
        public DELETED(configID): number { return this.data[configID][2] }
        /**
         *  地图名称
         */
        public NAME(configID): string { return this.data[configID][3] }
        /**
         *  怪物的ID
         */
        public MONSTERID(configID): string { return this.data[configID][4] }
        /**
         *  怪物名字
         */
        public DISPLAY_NAME(configID): string { return this.data[configID][5] }
        /**
         *  刷怪中心点X轴
         */
        public CENTRAL_POINTX(configID): number { return this.data[configID][6] }
        /**
         *  刷怪中心点Y轴
         */
        public CENTRAL_POINTY(configID): number { return this.data[configID][7] }
        /**
         *  怪物刷新点的半径
         */
        public REFRESH_RADIUS(configID): number { return this.data[configID][8] }
        /**
         *  怪物最大刷新数量
         */
        public NUMBER_REFRESHES(configID): number { return this.data[configID][9] }
        /**
         *  怪物刷新的间隔时间
         */
        public REFRESH_INTERVAL(configID): number { return this.data[configID][10] }
        /**
         *  怪物可移动半径
         */
        public MOVING_RADIUS(configID): number { return this.data[configID][11] }
        /**
         *  怪物刷新开始时间
         */
        public FLASHING_STARTED(configID): number { return this.data[configID][12] }
        /**
         *  怪物刷新结束时间
         */
        public REFRESH_END(configID): number { return this.data[configID][13] }
        /**
         *  总共刷新几波怪物
         */
        public TOTAL_REFRESHES(configID): number { return this.data[configID][14] }
        /**
         *  怪物名字
         */
        public MONSTER_NAME(configID): string { return this.data[configID][15] }
        /**
         *  怪物刷新顺序
         */
        public SEQUENCE_MONSTER1(configID): number { return this.data[configID][16] }
        /**
         *  怪物刷新顺序
         */
        public SEQUENCE_MONSTER2(configID): number { return this.data[configID][17] }
        /**
         *  怪物刷新顺序
         */
        public SEQUENCE_MONSTER3(configID): number { return this.data[configID][18] }
        /**
         *  怪物刷新顺序
         */
        public SEQUENCE_MONSTER4(configID): number { return this.data[configID][19] }
        /**
         *  怪物刷新顺序
         */
        public SEQUENCE_MONSTER5(configID): number { return this.data[configID][20] }
        /**
         *  怪物刷新顺序
         */
        public SEQUENCE_MONSTER6(configID): number { return this.data[configID][21] }
        /**
         *  怪物刷新顺序
         */
        public SEQUENCE_MONSTER7(configID): number { return this.data[configID][22] }
        /**
         *  怪物刷新顺序
         */
        public SEQUENCE_MONSTER8(configID): number { return this.data[configID][23] }
        /**
         *  怪物刷新顺序
         */
        public SEQUENCE_MONSTER9(configID): number { return this.data[configID][24] }
        /**
         *  怪物刷新顺序
         */
        public SEQUENCE_MONSTER10(configID): number { return this.data[configID][25] }
        /**
         *  怪物刷新间隔
         */
        public REFRESH_TYPE(configID): number { return this.data[configID][26] }
    }
}