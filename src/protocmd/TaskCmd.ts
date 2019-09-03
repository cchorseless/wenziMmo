module ProtoCmd {

    // 0x0901
    // 选项任务，提交选择
    export class SelectTalkOptionEncoder extends Packet {
        public static msgID: number = 0x0901;
        public constructor() {
            super();
            this.addProperty('questType', PacketBase.TYPE_BYTE);// 4 任务类型，0=剧情，1=日常，2=历练 
            this.addProperty('funcname', PacketBase.TYPE_STRING, 116);// 函数名(queststart,questfunc,questfinish)
            this.addProperty('showone', PacketBase.TYPE_BOOL);// true
            this.addProperty('szinput', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty('chooseidx', PacketBase.TYPE_INT);//倍数
            this.addProperty('dilogngc', PacketBase.TYPE_INT);
            this.addProperty('btCostType', PacketBase.TYPE_BYTE);//1金币，2元宝，3礼金
            this.cmd = 0x0901;
        }
    }

    // 0x0902
    // 服务器返回任务信息
    export class stQuestCreateRet extends Packet {
        public static msgID: number = 0x0902;
        public info: stQuestInfoBase = new stQuestInfoBase();
        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty('info', PacketBase.TYPE_BYTES, this.info.size(), this.info);
            this.read(data);
        }
    }

    // 0x0903
    // 服务器返回改变任务状态
    export class stQuestDoingRet extends Packet {
        public static msgID: number = 0x0903;
        public str: string = '';
        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty('id', PacketBase.TYPE_DWORD);// 4 任务ID 
            this.addProperty('queststatus', PacketBase.TYPE_BYTE);// 1 任务状态 
            this.addProperty('szKillID', PacketBase.TYPE_STRING, 300);
            this.addProperty('nCount', PacketBase.TYPE_INT);
            this.read(data);
        }

        public read(data: Laya.Byte): number {
            data.pos = super.read(data);
            this.str = data.readUTFBytes(this.getValue('nCount'));
            return data.pos;
        }
        public clear(): void {
            super.clear();
            this.str = null;
        }
    }

    // 0x0904
    // 服务器返回任务完成
    export class stQuestFinishRet extends Packet {
        public static msgID: number = 0x0904;
        public constructor() {
            super();
            this.addProperty('id', PacketBase.TYPE_DWORD);// 任务ID 
            this.addProperty('queststatus', PacketBase.TYPE_BYTE);//任务状态，任务状态枚举
        }
    }


    // 服务器推送所有的任务
    // 0x0907
    export class stQuestLoginRet extends Packet {
        public static msgID: number = 0x0907;
        public questinfos: Array<stQuestInfoBase> = [];
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('infocount', PacketBase.TYPE_DWORD);
            this.read(data);
        }
        public read(data: Laya.Byte): number {
            data.pos = super.read(data);
            for (var i: number = 0; i < this.getValue('infocount'); i++) {
                this.questinfos[i] = new stQuestInfoBase(data);
            }
            return data.pos;
        }
        public clear(): void {
            super.clear();
            for (var i: number = 0; i < this.questinfos.length; i++) {
                this.questinfos[i].clear();
                this.questinfos[i] = null;
            }
            this.questinfos.length = 0;
            this.questinfos = null;
        }
    }

    // 0x091B
    // 服务器刷新任务返回，刷任务星级
    export class stQuestSendQuestInfoRet extends Packet {
        public static msgID: number = 0x091B;
        public info: stQuestInfoBase = new stQuestInfoBase();
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('location', PacketBase.TYPE_BYTE);//1是增加,2删除,3是刷新任务星系
            this.addProperty('info', PacketBase.TYPE_BYTES, this.info.size(), this.info);
            this.read(data);
        }
        public clear(): void {
            super.clear();
            this.info = null;
        }
    }

    // 0x0428
    // 查询NPC身上任务信息
    export class VisitNPCEncoder extends Packet {
        public static msgID: number = 0x0428;
        public cbPacket = TalkWithNPCDecoder;
        public constructor() {
            super();
            this.addProperty('dwtmpid', PacketBase.TYPE_INT);
            this.addProperty('xDes', PacketBase.TYPE_WORD);
            this.addProperty('yDes', PacketBase.TYPE_WORD);
            this.cmd = 0x0428;
        }
    }
    
    // 0x0905
    // 打开NPC面板返回身上携带的任务信息
    export class TalkWithNPCDecoder extends Packet {
        public static msgID: number = 0x0905;
        public str: string = '';
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwtmpid', PacketBase.TYPE_DWORD);// NPC临时ID 
            this.addProperty('dwscript', PacketBase.TYPE_DWORD);// 脚本资源ID,0标示无 
            this.addProperty('nCount', PacketBase.TYPE_INT);
            this.read(data);

        }

        public read(data: Laya.Byte): number {
            data.pos = super.read(data);
            this.str = data.readUTFBytes(this.getValue('nCount'));

            return data.pos;
        }

        public clear(): void {
            super.clear();
            this.str = null;
        }
    }
}