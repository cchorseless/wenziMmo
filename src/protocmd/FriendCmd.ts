module ProtoCmd {

    //请求关系列表
    // 0x0A01
    export class stRelationGetList extends Packet {
        public static msgID: number = 0x0A01;
        public cbPacket = stRelationGetListRet;
        public constructor() {
            super();
            this.addProperty('btType', PacketBase.TYPE_INT);//0好1黑2仇3所有
            this.cmd = 0x0A01;
        }
    }
    //请求关系列表返回
    // 0x0A02
    export class stRelationGetListRet extends Packet {
        public static msgID: number = 0x0A02;
        public friendlist: Array<stRelationInfoBase> = [];
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('btType', PacketBase.TYPE_INT);//
            this.addProperty('nCount', PacketBase.TYPE_DWORD);
            if (data) this.read(data);
        }
        public read(data: Laya.Byte): number {
            data.pos = super.read(data);
            for (var i: number = 0; i < this.getValue('nCount'); i++) {
                this.friendlist.push(new stRelationInfoBase(data));
            }
            return data.pos;
        }

        public clear(): void {
            super.clear();
            for (var i: number = 0; i < this.friendlist.length; i++) {
                this.friendlist[i].clear();
            }
            this.friendlist.length = 0;
        }

        public sortPlayers(): void {
            this.friendlist.sort(this.sortFunc);
        }

        private sortFunc(infoA: stRelationInfoBase, infoB: stRelationInfoBase): number {
            if (infoA.state > infoB.state) {
                return -1;
            }
            if (infoA.state < infoB.state) {
                return 1;
            }
            if (infoA.level > infoB.level) {
                return -1;
            }
            if (infoA.level < infoB.level) {
                return 1;
            }
            return 0;
        }
        //好友类型
        public get type(): String {
            return this.getValue("btType");
        }
        //好友数量
        public get num(): String {
            return this.getValue("nCount");
        }
    }

    //添加好友
    // 0x0A03
    export class stRelationAdd extends Packet {
        public static msgID: number = 0x0A03;
        public cbPacket = stRelationAddRet;
        public static TYPE_FRIEND: number = 0;
        public static TYPE_BLACK: number = 1;
        public static TYPE_ENEMY: number = 2;

        public constructor() {
            super();
            this.addProperty('btType', PacketBase.TYPE_INT);// //添加的类型 0 好友 1黑名单 2仇人
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//
            this.cmd = 0x0A03;
        }
    }

    // 添加好友返回
    // 0x0A04
    export class stRelationAddRet extends Packet {
        public static msgID: number = 0x0A04;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);//emFRIENDErrorCode
            this.addProperty('btType', PacketBase.TYPE_INT);//
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//
            this.read(data);
        }
    }


    //向被添加人发送询问(only 好友)
    export class stRelationAddQuery extends Packet {
        public static msgID: number = 0x0A05;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//添加者
            this.addProperty('szVerify', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN); //验证信息
            this.addProperty("dwLevel", PacketBase.TYPE_DWORD);
            this.addProperty("btJob", PacketBase.TYPE_BYTE);
            this.addProperty("btSex", PacketBase.TYPE_BYTE);
            this.read(data);
        }

        public get playerName(): String {
            return this.getValue("szName");
        }

        public get job(): number {
            return this.getValue("btJob");
        }

        public get sex(): number {
            return this.getValue("btSex");
        }

        public get level(): number {
            return this.getValue("dwLevel");
        }
    }


    //c-s 回答关系添加结果(only 好友)
    export class stRelationAddAnswerQuery extends Packet {
        public static msgID: number = 0x0A06;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//添加者
            this.addProperty('boAgree', PacketBase.TYPE_BOOL); //是否同意
            this.cmd = 0x0A06;
            if (data) {
                data.pos += this.read(data);
            }
        }

    }

    //列表增加了一个成员----------
    export class stRelationAddFriend extends Packet {
        public static msgID: number = 0x0A08;
        public friendInfo: stRelationInfoBase = new stRelationInfoBase();
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('btType', PacketBase.TYPE_INT);//
            this.addProperty("friendInfo", PacketBase.TYPE_BYTES, this.friendInfo.size(), this.friendInfo);
            if (data) {
                data.pos += this.read(data);
            }
        }

    }


    //从现有的列表中删除指定的信息
    export class stRelationListDelete extends Packet {
        public static msgID: number = 0x0A09;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('btType', PacketBase.TYPE_INT);
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.read(data);
        }
        //好友类型
        public get type(): number {
            return this.getValue("btType");
        }
        //好友名称
        public get szName(): String {
            return this.getValue("szName");
        }
    }

    //删除 好友
    export class stRelationDelete extends Packet {
        public static msgID: number = 0x0A0A;
        public cbPacket = stRelationDeleteRet;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('btType', PacketBase.TYPE_INT);//0好友1黑名单2仇人
            this.addProperty('dwOnlyId', PacketBase.TYPE_INT64);//
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//
            this.cmd = 0x0A0A;
        }
    }
    //删除好友返回  /成功后直接删除该成员------
    export class stRelationDeleteRet extends Packet {
        public static msgID: number = 0x0A0B;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);//
            this.addProperty('btType', PacketBase.TYPE_INT);//
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//
            this.read(data);
        }
        //是否成功
        public get ErrorCode(): number {
            return this.getValue("btErrorCode");
        }
        //好友类型
        public get type(): number {
            return this.getValue("btType");
        }
        //好友名称
        public get szName(): String {
            return this.getValue("szName");
        }
    }

    //搜索好友
    // 0x0A0C
    export class stRelationSearchFriend extends Packet {
        public static msgID: number = 0x0A0C;
        public cbPacket = stRelationSearchFriendRet;
        constructor() {
            super();
            this.cmd = 0x0A0C;
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//按名字like搜索
        }
    }

    //搜索好友返回
    // 0x0A0D
    export class stRelationSearchFriendRet extends Packet {
        public static msgID: number = 0x0A0D
        public results: Array<stFindResultBase> = [];
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('nCount', PacketBase.TYPE_DWORD);
            this.cmd = 0x0A0D;
            if (data) this.read(data);
        }

        public read(data: Laya.Byte): number {
            data.pos = super.read(data);
            for (var i: number = 0; i < this.getValue('nCount'); i++) {
                this.results.push(new stFindResultBase(data));
            }
            return data.pos;
        }

    }

    //验证设置
    export class stRelationSetAddFriendType extends Packet {
        public constructor() {
            super();
            this.addProperty('nType', PacketBase.TYPE_INT);//emFriendType
        }
    }

    export class stRelationSetAddFriendTypeRet extends Packet {
        public static msgID: number = 0x0A1E;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('btError', PacketBase.TYPE_BYTE);
            this.addProperty('nType', PacketBase.TYPE_INT);
        }
    }

    //一键添加好友
    export class stRelationAdvertiseFriend extends Packet {
        public static msgID: number = 0x0A27;
        public constructor() {
            super();
            this.cmd = 0x0A27;
        }
    }

    //一键添加好友返回
    export class stAdvertiseFriendRet extends Packet {
        public static msgID: number = 0x0A2A;
        public results: Array<stFindYiJianResultBase> = [];
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('nCount', PacketBase.TYPE_DWORD);
            if (data) this.read(data);
        }
        public read(data: Laya.Byte): number {
            data.pos = super.read(data);
            for (var i: number = 0; i < this.getValue('nCount'); i++) {
                this.results.push(new stFindYiJianResultBase(data));
            }
            return data.pos;
        }
        public clear(): void {
            super.clear();
            for (var i: number = 0; i < this.results.length; i++) {
                this.results[i].clear();
                this.results[i] = null;
            }
            this.results.length = 0;
        }
    }

}