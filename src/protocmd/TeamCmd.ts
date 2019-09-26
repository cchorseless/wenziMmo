module ProtoCmd {

    export class Msg_team_Cfg {
        public constructor() { }
        public static MSG_TEAM_CREATE: number = 0x2801;//创建队伍
        public static MSG_TEAM_CREATERT: number = 0x2802;//创建队伍返回

        public static MSG_TEAM_LEAVEGROUP: number = 0x2803;//离队
        public static MSG_TEAM_LEAVEGROUPRT: number = 0x2804;//离队返回

        public static MSG_TEAM_BELEAVERT: number = 0x2806;//队长请离返回

        public static MSG_TEAM_ASKFORJOIN: number = 0x2807;//申请加入队伍，
        public static MSG_TEAM_ASKFORJOINRT: number = 0x2808;//申请加入返回值，申请人名字发给队长

        //public static  MSG_TEAM_MASTERAGREE:int=0x2808;//队长同意申请

        public static MSG_TEAM_GROUPUSERINFO: number = 0x2809;//队伍成员信息

        public static MSG_TEAM_MASTERDISSOLVEGROUP: number = 0x280C;//队长解散队伍
        public static MSG_TEAM_MASTERDISSOLVEGROUPRT: number = 0x280D;//队长解散返回

        public static MSG_TEAM_CHANGEMASTER: number = 0x2810;//队伍改变队长
        public static MSG_TEAM_CHANGEMASTERRT: number = 0x2811;//改变队长返回

        public static MSG_TEAM_INVITEJOINGROUP: number = 0x280A;//邀请加入队伍
        public static MSG_TEAM_INVITEJOINGROUPRT: number = 0x280B;//邀请加入组队返回


    }

    //0x2801
    // 创建队伍
    export class TeamBuildEncoder extends Packet {
        public static msgID: number = Msg_team_Cfg.MSG_TEAM_CREATE;
        public cbPacket = TeamBuildDecoder;
        public constructor() {
            super();
            this.cmd = Msg_team_Cfg.MSG_TEAM_CREATE;
        }
    }

    //0x2802
    //创建队伍返回
    export class TeamBuildDecoder extends Packet {
        public static msgID: number = Msg_team_Cfg.MSG_TEAM_CREATERT;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwOnlyid', PacketBase.TYPE_DOUBLE);
            this.addProperty('dwGroupId', PacketBase.TYPE_DWORD);
            this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);
            this.read(data);
        }
    }
    //0x2803
    //离队
    export class TeamQuitEncoder extends Packet {
        public static msgID: number = Msg_team_Cfg.MSG_TEAM_LEAVEGROUP;
        public cbPacket = TeamQuitDecoder;
        public constructor() {
            super();
            this.addProperty('dwOnlyid', PacketBase.TYPE_INT64);
            this.cmd = Msg_team_Cfg.MSG_TEAM_LEAVEGROUP;
        }
    }
    //0x2804
    //离队返回
    export class TeamQuitDecoder extends Packet {
        public static msgID: number = Msg_team_Cfg.MSG_TEAM_LEAVEGROUPRT;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwLeaveOnlyId', PacketBase.TYPE_INT64);
            this.addProperty('dwNowMasterId', PacketBase.TYPE_INT64);
            this.addProperty('btGroupType', PacketBase.TYPE_BYTE);
            this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);
            this.addProperty('szLeaveName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.read(data);
        }
    }

    //0x2805
    //队长请离
    export class TeamKickoutEncoder extends Packet {
        public static msgID: number = 0x2805;
        public cbPacket = TeamKickoutDecoder;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwOnlyid', PacketBase.TYPE_BYTES, 8);
            this.cmd = 0x2805;
        }
    }
    //0x2806
    //队长请离返回
    export class TeamKickoutDecoder extends Packet {
        public static msgID: number = Msg_team_Cfg.MSG_TEAM_BELEAVERT;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwKickOutOnlyId', PacketBase.TYPE_BYTES, 8);
            this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);
            this.read(data);
        }
    }

    //0x2807
    // 申请加入队伍
    export class TeamAgreeJoinEncoder extends Packet {
        public static msgID: number = Msg_team_Cfg.MSG_TEAM_ASKFORJOIN;
        public cbPacket = TeamAgreeJoinEncoder
        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//目标玩家名称
            this.addProperty('btJob', PacketBase.TYPE_BYTE);
            this.addProperty('dwLevel', PacketBase.TYPE_DWORD);
            this.addProperty("btSex", PacketBase.TYPE_BYTE);
            this.cmd = Msg_team_Cfg.MSG_TEAM_ASKFORJOIN;
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
    //0x2808
    //申请加入返回值，申请人名字发给队长
    export class TeamAgreeJoinDecoder extends Packet {
        public static msgID: number = Msg_team_Cfg.MSG_TEAM_ASKFORJOINRT;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//目标玩家名称
            this.addProperty('szMasterName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//目标玩家名称
            this.addProperty('dwGroupId', PacketBase.TYPE_DWORD);
            this.addProperty('boAllow', PacketBase.TYPE_BOOL);
            this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);
            this.cmd = Msg_team_Cfg.MSG_TEAM_ASKFORJOINRT;
            this.read(data);
        }
    }
    //0x2809
    //队伍成员信息
    export class TeamInfomationDecoder extends Packet {
        public static msgID: number = Msg_team_Cfg.MSG_TEAM_GROUPUSERINFO;
        public cbPacket = TeamInfomationDecoder;
        public ncount: number;
        public Members: Array<stSendSingleMemberInfoBase> = [];
        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty('dwGroupId', PacketBase.TYPE_DWORD);//
            this.addProperty('dwMasterId', PacketBase.TYPE_BYTES, 8);//
            this.addProperty('btMemberCount', PacketBase.TYPE_INT);
            this.cmd = Msg_team_Cfg.MSG_TEAM_GROUPUSERINFO;
            this.read(data);
        }
        public read(data: Laya.Byte): number {
            if (!data) return 0;
            data.pos = super.read(data);
            this.ncount = this.getValue('btMemberCount');

            if (this.ncount > 0) {
                for (var i: number = 0; i < this.ncount; i++) {
                    this.Members.push(new stSendSingleMemberInfoBase(data));
                }
            }
            return data.pos;
        }
        public get MasterId(): Int64 {
            return this.getValue("dwMasterId");
        }
    }
    //0x2810
    // 队伍改变队长
    export class TeamChangeCaptainEnDecoder extends Packet {
        public static msgID: number = Msg_team_Cfg.MSG_TEAM_CHANGEMASTER;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);  //发送 目标名 收包队长名
            this.read(data);
            this.cmd = Msg_team_Cfg.MSG_TEAM_CHANGEMASTER;
        }
    }
    //0x2811
    //改变队长返回
    export class TeamReplyCaptainEnDecoder extends Packet {
        public static msgID: number = Msg_team_Cfg.MSG_TEAM_CHANGEMASTERRT;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty('szMasterName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty('boAllow', PacketBase.TYPE_BOOL);
            this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);
            this.read(data);
            this.cmd = Msg_team_Cfg.MSG_TEAM_CHANGEMASTERRT;
        }
    }
    //0x280A
    //邀请加入队伍
    export class TeamInviteEnDecoder extends Packet {
        public static msgID: number = Msg_team_Cfg.MSG_TEAM_INVITEJOINGROUP;
        public cbPacket = TeamInviteEnDecoder;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty("dwLevel", PacketBase.TYPE_DWORD);
            this.addProperty("btJob", PacketBase.TYPE_BYTE);
            this.addProperty("btSex", PacketBase.TYPE_BYTE);
            this.addProperty("btNum", PacketBase.TYPE_BYTE);//邀请人队伍个数
            this.cmd = Msg_team_Cfg.MSG_TEAM_INVITEJOINGROUP;
            this.read(data);
        }

        public get playerName(): String {
            return this.getValue("szName");
        }

        public get level(): number {
            return this.getValue("dwLevel");
        }

        public get job(): number {
            return this.getValue("btJob");
        }

        public get sex(): number {
            return this.getValue("btSex");
        }

        public get memNum(): number {
            return this.getValue("btNum");
        }
    }
    //0x280B
    //邀请加入组队返回
    export class TeamAgreeInviteEnDecoder extends Packet {
        public static msgID: number = Msg_team_Cfg.MSG_TEAM_INVITEJOINGROUPRT;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('szInvitorName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);  //邀请人名字 
            this.addProperty('szMasterName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);  //邀请人名字 
            this.addProperty('dwGroupId', PacketBase.TYPE_DWORD);
            this.addProperty('boAllow', PacketBase.TYPE_BOOL);
            this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);
            this.read(data);
            this.cmd = Msg_team_Cfg.MSG_TEAM_INVITEJOINGROUPRT;
        }
    }
    //0x2814
    export class stGlobalPlayerGroupChange extends Packet {
        public static msgID: number = 0x2814;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwGroupId', PacketBase.TYPE_WORD);  //组队编号
            this.addProperty('boMaster', PacketBase.TYPE_BOOL); //是否队长
            this.addProperty('dwGroupMemberCount', PacketBase.TYPE_DWORD);//队伍人数
            this.read(data);
        }
    }
    //0x2815 //邀请加入组队返回给队长
    export class TeamInviteMasterDecoder extends Packet {
        public static msgID: number = 0x2815;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('szPlayerName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);  //邀请人名字 
            this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);
            this.read(data);
        }
    }

    //0x2816 //申请加入组队返回给队员
    export class TeamInvitePlayerDecoder extends Packet {
        public static msgID: number = 0x2816;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('szInvitorName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);  //邀请人名字 
            this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);
            this.read(data);
        }
    }


    //0x2819
    export class TeamReplyPlayerDecoder extends Packet {
        public static msgID: number = 0x2819;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);
            this.read(data);
        }
    }

    //0x2820
    export class TeamBaseInfoEncoder extends Packet {
        public static msgID: number = 0x2820;
        /**手动*/
        public static TEAM_MODE_MANUAL: number = 0;
        /**拒绝组队*/
        public static TEAM_MODE_REJECT: number = 1;
        /**自动组队*/
        public static TEAM_MODE_AUTO: number = 2;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('btType', PacketBase.TYPE_BYTE);
            this.read(data);
            this.cmd = 0x2820;
        }
    }


    //0x2821
    export class TeamBaseInfoDecoder extends Packet {
        public static msgID: number = 0x2821;
        public constructor(data: Laya.Byte) {
            super();
            //			AddProperty('dwGroupId',TYPE_INT);
            //			AddProperty('szGroupMaster',TYPE_STRING,_MAX_NAME_LEN);
            //			AddProperty('wMaze',TYPE_WORD);
            //			AddProperty('btErrorCode',TYPE_INT);//0成功
            this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);
            this.addProperty('btType', PacketBase.TYPE_BYTE);
            this.read(data);
        }
    }

    //0x2825
    export class stGroupMemberAllPosition extends Packet {
        public static msgID: number = 0x2825;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwOnlyId', PacketBase.TYPE_DOUBLE);
            this.addProperty('nX', PacketBase.TYPE_WORD);
            this.addProperty('nY', PacketBase.TYPE_WORD);
            this.addProperty('dwMapID', PacketBase.TYPE_DWORD);
            this.addProperty('szMapName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.read(data);

        }
    }

    //0x2830
    export class stGroupMemberDie extends Packet {
        public static msgID: number = 0x2830;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwOnlyId', PacketBase.TYPE_DWORD);
            this.read(data);
        }
    }




    //0x28C8
    export class stGlobalGetBossStatus extends Packet {
        //0x28C8    28大包  C8小包
        public static msgID: number = 0x28C8;
        public cbPacket = stGlobalGetBossStatusRet;
        public constructor(data: Laya.Byte) {
            super();
            this.cmd = 0x28C8;
            this.read(data);
        }
    }
    //0x28C9
    export class stGlobalGetBossStatusRet extends Packet {
        public static msgID: number = 0x28C9;
        public stZeroArray: Array<stBossStatusBase> = [];
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty("nCount", PacketBase.TYPE_INT);
            if (data) {
                data.pos += this.read(data);
            }
        }
        public read(data: Laya.Byte): number {
            data.pos = super.read(data);
            for (var i: number = 0; i < this.getValue('nCount'); i++) {
                this.stZeroArray[i] = new stBossStatusBase(data);
            }
            return data.pos;
        }

        public clear(): void {
            super.clear();
            if (this.stZeroArray) {
                for (let bs in this.stZeroArray) {
                    this.stZeroArray[bs].clear();
                }
                this.stZeroArray.length = 0;
            }
            this.stZeroArray = null;
        }
    }
    //0x280E
    export class UpdateAvaterLocationDecoder extends Packet {
        public static msgID: number = 0x280E;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwonlyid', PacketBase.TYPE_DOUBLE);
            //	AddProperty('nMapId',TYPE_INT);       
            this.addProperty('nX', PacketBase.TYPE_WORD);
            this.addProperty('nY', PacketBase.TYPE_WORD);
            //	AddProperty('szMapName',TYPE_STRING,_MAX_NAME_LEN);
            this.read(data);
        }
    }
}