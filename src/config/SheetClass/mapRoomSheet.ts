module SheetConfig {
    export class mapRoomSheet {
        public data; private _instance; public constructor(data) { this.data = data; }
        public static getInstance(data): mapRoomSheet { let Class: any = this; if (!Class._instance) { Class._instance = new Class(data); } return Class._instance; }
        /**
         *  房间ID
         */
        public ID(configID): string { return this.data[configID][0] }
        /**
         *  房间名称
         */
        public ROOMNAME(configID): string { return this.data[configID][1] }
        /**
         *  所属地图ID
         */
        public MAPID(configID): number { return this.data[configID][2] }
        /**
         *  所属地图名称
         */
        public MAPNAME(configID): string { return this.data[configID][3] }
        /**
         *  所属地图类型
         */
        public ROOMTYPE(configID): number { return this.data[configID][4] }
        /**
         *  上连接房间ID
         */
        public UPID(configID): number { return this.data[configID][5] }
        /**
         *  下连接房间ID
         */
        public DOWNID(configID): number { return this.data[configID][6] }
        /**
         *  左连接房间ID
         */
        public LEFTID(configID): number { return this.data[configID][7] }
        /**
         *  右连接房间ID
         */
        public RIGHTID(configID): number { return this.data[configID][8] }
        /**
         *  X坐标最小（包含）
         */
        public XMIN(configID): number { return this.data[configID][9] }
        /**
         *  X坐标最大（包含）
         */
        public XMAX(configID): number { return this.data[configID][10] }
        /**
         *  Y坐标最小（包含）
         */
        public YMIN(configID): number { return this.data[configID][11] }
        /**
         *  Y坐标最大（包含）
         */
        public YMAX(configID): number { return this.data[configID][12] }
        /**
         *  ICON图片资源
         */
        public ICONPIC(configID): string { return this.data[configID][13] }
        /**
         *  场景背景图资源
         */
        public SCENEPIC(configID): string { return this.data[configID][14] }
        /**
         *  进入的等级限制条件
         */
        public LVNEED(configID): number { return this.data[configID][15] }
        /**
         *  进入的VIP等级限制
         */
        public VIPNEED(configID): number { return this.data[configID][16] }
        /**
         *  进入需要完成的任务ID
         */
        public TASKIDNEED(configID): number { return this.data[configID][17] }
        /**
         *  是否限制进入条件
         */
        public ISNEEDLIMIT(configID): number { return this.data[configID][18] }
        /**
         *  进入房间的描述
         */
        public ROOMDES(configID): string { return this.data[configID][19] }
        /**
                    *  通过地图id得到该地图的开始房间id
                    */
        public GETBEGINROOMIDBYMAPID(mapid = GameApp.MainPlayer.location.mapid): number {
            let roomid;
            for (let room in this.data) {
                if (this.data[room][2] == mapid) {
                    if (!roomid) {
                        roomid = room;
                    } else if (room < roomid) {
                        roomid = room;
                    }
                }
            }
            return roomid;
        }

    }
}