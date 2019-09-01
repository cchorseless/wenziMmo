module ProtoCmd {



    // 0x0901
    export class SelectTalkOptionEncoder extends Packet {
        public static msgID: number = 0x0901;
        public constructor() {
            super();
            this.addProperty('questType', PacketBase.TYPE_BYTE);// 4 任务类型，0=剧情，1=日常，2=历练 
            this.addProperty('funcname', PacketBase.TYPE_STRING, 116);
            this.addProperty('showone', PacketBase.TYPE_BOOL);
            this.addProperty('szinput', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty('chooseidx', PacketBase.TYPE_INT);//倍数
            this.addProperty('dilogngc', PacketBase.TYPE_INT);
            this.addProperty('btCostType', PacketBase.TYPE_BYTE);//1金币，2元宝，3礼金
            this.cmd = 0x0901;
        }
    }

    // 0x0902
    export class stQuestCreate extends Packet {
        private _instance: stQuestCreate;
        public static getInstance(): stQuestCreate {
            var Class: any = this;
            if (!Class._instance) {
                Class._instance = new stQuestCreate();
            }
            return Class._instance
        }

        public static msgID: number = 0x0902;
        public info: stQuestInfoBase = new stQuestInfoBase();
        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty('info', PacketBase.TYPE_BYTES, this.info.size(), this.info);
            this.read(data);
        }


    }
    
    // 0x0903
    export class stQuestDoing extends Packet {
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
            this.str = data.readMultiByte(this.getValue('nCount'), 'utf-8');
            return data.pos;
        }
        public clear(): void {
            super.clear();
            this.str = null;
        }
    }

    // 0x0904
    export class stQuestFinish extends Packet {
        private _instance: stQuestFinish;
        public static getInstance(): stQuestFinish {
            var Class: any = this;
            if (!Class._instance) {
                Class._instance = new stQuestFinish();
            }
            return Class._instance
        }

        public static msgID: number = 0x0904;
        public constructor() {
            super();
            this.addProperty('id', PacketBase.TYPE_DWORD);// 任务ID 
            this.addProperty('queststatus', PacketBase.TYPE_BYTE);//任务状态，标示如下 
        }
    }

    // 0x0905
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
            this.str = data.readMultiByte(this.getValue('nCount'), 'utf-8');

            return data.pos;
        }

        public clear(): void {
            super.clear();
            this.str = null;
        }
    }

    /**
     * 服务器推送任务
     */
    // 0x0907
    export class stQuestLogin extends Packet {
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

    // 0x0919
    export class stQuestScriptDataDecoder extends Packet {
        private _instance: stQuestScriptDataDecoder;
        public static getInstance(): stQuestScriptDataDecoder {
            var Class: any = this;
            if (!Class._instance) {
                Class._instance = new stQuestScriptDataDecoder();
            }
            return Class._instance
        }
        public static msgID: number = 0x0919;
        public str: string = '';
        public constructor() {
            super();
            this.addProperty('dwDataType', PacketBase.TYPE_DWORD);// NPC临时ID 
            this.addProperty('nCount', PacketBase.TYPE_INT);
        }

        public read(data: Laya.Byte): number {
            data.pos = super.read(data);
            this.str = data.readMultiByte(this.getValue('nCount'), 'utf-8');
            return data.pos;
        }

        public clear(): void {
            super.clear();
            this.str = "";
            this.str = null;
            this._instance = null;
        }
    }

    // 0x091B
    export class stQuestSendQuestInfo extends Packet {
        public static msgID: number = 0x091B;
        public info: stQuestInfoBase = new stQuestInfoBase();
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('location', PacketBase.TYPE_BYTE);//1是增加,3是刷新任务星系
            this.addProperty('info', PacketBase.TYPE_BYTES, this.info.size(), this.info);
            this.read(data);
        }

        public clear(): void {
            super.clear();
            this.info = null;
        }
    }

    // 0x0428
    export class VisitNPCEncoder extends Packet {
         private _instance: VisitNPCEncoder;
        public static getInstance(): VisitNPCEncoder {
            var Class: any = this;
            if (!Class._instance) {
                Class._instance = new VisitNPCEncoder();
            }
            return Class._instance
        }
        public constructor() {
            super();
            this.addProperty('dwtmpid', PacketBase.TYPE_INT);
            this.addProperty('xDes', PacketBase.TYPE_WORD);
            this.addProperty('yDes', PacketBase.TYPE_WORD);
            this.cmd = 0x0428;
        }
    }

}