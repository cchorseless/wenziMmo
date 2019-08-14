module ProtoCmd {

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

    export class stRelationAdd extends Packet {
        public static msgID: number = 0x0A03;
        public static TYPE_FRIEND: number = 0;
        public static TYPE_BLACK: number = 1;
        public static TYPE_ENEMY: number = 2;

        public constructor() {
            super();
            this.addProperty('btType', PacketBase.TYPE_INT);//
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//
            this.cmd = 0x0A03;
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
            this.read(data);
        }

    }


    export class stRelationAddFriend extends Packet {
        public static msgID: number = 0x0A08;
        //		public var friendlist:Vector.<stRelationInfo> = new Vector.<stRelationInfo>;
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


    //s-c 向被添加人发送询问(only 好友)
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

    export class stRelationAddRet extends Packet {
        public static msgID: number = 0x0A04;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);//
            this.addProperty('btType', PacketBase.TYPE_INT);//
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//
            this.read(data);
        }


    }

    export class stRelationAdvertiseFriend extends Packet {
        public static msgID: number = 0x0A27;
        public constructor() {
            super();
            this.cmd = 0x0A27;
        }
    }

    export class stRelationDelete extends Packet {
        public static msgID: number = 0x0A0A;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('btType', PacketBase.TYPE_INT);//0好友1黑名单2仇人
            this.addProperty('dwOnlyId', PacketBase.TYPE_DOUBLE);//
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//
            this.cmd = 0x0A0A;
        }
    }

    export class stRelationDeleteRet extends Packet {
        public static msgID: number = 0x0A0B;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);//
            this.addProperty('btType', PacketBase.TYPE_INT);//
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//
            this.read(data);
        }


    }

    export class stRelationGetList extends Packet {
        public	static   msgID:number = 0x0A01;
        public constructor() {
            super();
            this.addProperty('btType', PacketBase.TYPE_INT);//0好1黑2仇3所有
            this.cmd = 0x0A01;
        }
    }

    export class stRelationGetListRet extends Packet
    {
    public	static   msgID:number = 0x0A02;
    	public  friendlist:Array<stRelationInfoBase> = [];
    	public constructor(data: Laya.Byte) {
    		super();
    		this.addProperty('btType',PacketBase.TYPE_INT);//
    		this.addProperty('nCount',PacketBase.TYPE_DWORD);
    		if(data) this.read(data);
    	}
    	 public  read(data: Laya.Byte):number
    	{
    		data.pos = super.read(data);
    		for (var i:number=0;i< this.getValue('nCount');i++)
    		{
    			this.friendlist.push(new stRelationInfoBase(data));
    		}
    		return data.pos;
    	}

    	 public  clear():void{
    		super.clear();
    		for(var i:number= 0; i < this.friendlist.length; i ++){
    			this.friendlist[i].clear();
    		}
    		this.friendlist.length = 0;
    	}

    	public  sortPlayers():void{
    		this.friendlist.sort(this.sortFunc);
    	}

    	private  sortFunc(infoA:stRelationInfoBase,infoB:stRelationInfoBase):number{
    		if(infoA.state > infoB.state){
    			return -1;
    		}
    		if(infoA.state < infoB.state){
    			return 1;
    		}
    		if(infoA.level > infoB.level){
    			return -1;
    		}
    		if(infoA.level < infoB.level){
    			return 1;
    		}
    		return 0;
    	}
    }


    export class stRelationListDelete extends Packet {
        public static msgID: number = 0x0A09;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('btType', PacketBase.TYPE_INT);
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.read(data);
        }
    }

    export class stRelationLocationRet extends Packet {
        public static msgID: number = 0x0A19;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);// 17,没有这好友 18 没有这敌人 19 探查令不够  1不在线
            this.addProperty('btType', PacketBase.TYPE_INT);//类型
            this.addProperty('dwOnlyId', PacketBase.TYPE_DOUBLE);//id号
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN); //被查询者名字
            this.addProperty('szMapName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN); //被查询者地图名字
            this.addProperty('mapid', PacketBase.TYPE_INT);//所在地图编号
            this.addProperty('nX', PacketBase.TYPE_INT);//坐标x
            this.addProperty('nY', PacketBase.TYPE_INT);//坐标y		
            this.read(data);
        }
    }
    // export class stRelationRecordQuestRet extends Packet
    // {
    // public	static   msgID:number = 0x0A17;
    // 	public  killedlist:String;
    // 	public constructor(data: Laya.Byte) {
    // 		super();
    // 		this.addProperty('nSize',PacketBase.TYPE_INT);
    // 		this.read(data);
    // 	}
    // 	 public  read(data:Laya.Byte):number
    // 	{
    // 		if(data)
    // 		{
    // 		data.pos += super.read(data);
    // 		var nSize:number =  this.getValue('nSize');
    // 		this.killedlist = data.readMultiByte(nSize,'utf-8');
    // 		}
    // 		return 0;
    // 	}
    // }


    export class stRelationSearchFriendRet extends Packet {
        public static msgID: number = 0x0A0D
        public results: Array<stFindResultBase> = [];
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('nCount', PacketBase.TYPE_DWORD);
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

    export class stRelationSetAddFriendTypeRet extends Packet {
        public static msgID: number = 0x0A1E;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('btError', PacketBase.TYPE_BYTE); //0允许所有人加我为好友  1需要验证 2拒绝所有
            this.addProperty('nType', PacketBase.TYPE_INT);
        }
    }
}