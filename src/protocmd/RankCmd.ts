

module ProtoCmd {

    //查询排行榜列表 返回本包
    export class stRankMsg extends Packet {
        public static msgID: number = 0x2016;
        public TopInfos: Array<stRankInfo> = [];
        public constructor(data: Laya.Byte = null) {
            super();

            this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);  //0成功 1 未找到
            this.addProperty('btType', PacketBase.TYPE_DWORD);//emRankType
            this.addProperty('nPage', PacketBase.TYPE_BYTE);//页数
            this.addProperty('nNowPage', PacketBase.TYPE_BYTE);//当前页 从1开始
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty('nCount', PacketBase.TYPE_DWORD);
            this.read(data);
            this.cmd = 0x2016;
        }

        public get rankType(): number {
            return this.getValue("btType");
        }

        public set rankType(value: number) {
            this.setValue("btType", value);
        }

        public get curPage(): number {
            return this.getValue("nNowPage");
        }

        public get maxPage(): number {
            return this.getValue("nPage");
        }

        public read(data: Laya.Byte): number {
            if (data) {
                data.pos = super.read(data);
                for (var i: number = 0; i < this.getValue('nCount'); i++) {
                    var topinfo: stRankInfo = new stRankInfo(data);
                    this.TopInfos.push(topinfo);
                }
                return data.pos;
            }
            return 0;
        }


        public clear(): void {
            if (this.TopInfos) {
                for (var i: number = 0; i < this.TopInfos.length; i++) {
                    this.TopInfos[i].clear();
                    this.TopInfos[i] = null;
                }
                this.TopInfos.length = 0;
            }
            this.TopInfos = null;
        }
    }

    //查询我的排名
    export class stMyRankRequest extends Packet {
        constructor() {
            super();
            this.addProperty("btType", PacketBase.TYPE_BYTE);
            this.cmd = 0x2032;
        }
    }

    export class stMyRankReturn extends Packet {
        public static msgID: number = 0x2033;
        public myInfo: stRankInfo = new stRankInfo(null);

        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty('rankType', PacketBase.TYPE_BYTE);
            this.addProperty("nowRank", PacketBase.TYPE_WORD);
            this.addProperty('topInfo', PacketBase.TYPE_BYTES, this.myInfo.size(), this.myInfo);
            this.read(data);
        }

        public get rankType(): number {
            return this.getValue('rankType');
        }

        public get rank(): number {
            return this.getValue("nowRank");
        }
    }


    //跨服排行榜 返回本包
    export class stCrossRankMsg extends Packet {
        public static msgID: number = 0x2017;
        public TopInfos: Array<stRankInfo> = [];
        public constructor(data: Laya.Byte = null) {
            super();

            this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);  //0成功 1 未找到
            this.addProperty('btType', PacketBase.TYPE_DWORD);//emRankType
            this.addProperty('nPage', PacketBase.TYPE_BYTE);//页数
            this.addProperty('nNowPage', PacketBase.TYPE_BYTE);//当前页 从1开始
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty('nCount', PacketBase.TYPE_DWORD);
            this.read(data);
            this.cmd = 0x2017;
        }

        public get rankType(): number {
            return this.getValue("btType");
        }

        public set rankType(value: number) {
            this.setValue("btType", value);
        }

        public get curPage(): number {
            return this.getValue("nNowPage");
        }

        public get maxPage(): number {
            return this.getValue("nPage");
        }

        public read(data: Laya.Byte): number {
            if (data) {
                data.pos = super.read(data);
                for (var i: number = 0; i < this.getValue('nCount'); i++) {
                    var topinfo: stRankInfo = new stRankInfo(data);
                    this.TopInfos.push(topinfo);
                }
                return data.pos;
            }
            return 0;
        }


        public clear(): void {
            if (this.TopInfos) {
                for (var i: number = 0; i < this.TopInfos.length; i++) {
                    this.TopInfos[i].clear();
                    this.TopInfos[i] = null;
                }
                this.TopInfos.length = 0;
            }
            this.TopInfos = null;
        }
    }

}