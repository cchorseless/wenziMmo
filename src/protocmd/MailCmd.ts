module ProtoCmd {
    // 0x0808
    // 删除邮件
    export class stMailDeleteMailEncoder extends Packet {
		/*
		bool bodeleteAll;//true 全删除 全删的话后面不需要添写
		DWORD dwMailIDs[_MAX_MAIL_DELETE_COUNT];  //或者 最大支持删除10封信
		*/
        public static msgID: number = 0x0808;
        public cbPacket = stMailQueryRetDecoder;
        public constructor() {
            super();
            this.addProperty('bodeleteAll', PacketBase.TYPE_BOOL);
            for (var i: number = 0; i < 10; i++) {
                this.addProperty('dwMailIDs' + i.toString(), PacketBase.TYPE_DWORD);
            }
            this.cmd = 0x0808;
        }
    }

    //收取附件
    // 0x0807
    export class stMailGetItemEncoder extends Packet {
        public static msgID: number = 0x0807;
        public cbPacket = stMailGetItemRetDecoder;
        public constructor() {
            super();
            this.addProperty('dwMailID', PacketBase.TYPE_DWORD);
            this.addProperty('i64itemid', PacketBase.TYPE_INT64);	//要取得的附件物品编号,为-1表示全部收取,为0表示收取金钱
            this.cmd = 0x0807;
        }
    }

    // 0x080C
    //收取附件返回
    export class stMailGetItemRetDecoder extends Packet {
		/*
		   BYTE btErrorCode;//客户端不许填写 返回用
		   DWORD dwMailID;   //要获得附件的邮件ID
		   WORD wReveivedItem;	//是否可收取的标记
		   DWORD dwGold;    //客户端不许填写 返回用  附件里面的金币
		   __int64 i64itemid;	//要取得的附件物品编号,为-1表示全部收取,为0表示收取金钱
		   stZeroArray<stItem> getItemArr;     //客户端不许填写 返回用  附件里面的物品
		 */
        public static msgID: number = 0x080C;
        public items: Array<ItemBase> = [];
        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty('bterrorcode', PacketBase.TYPE_BYTE);
            this.addProperty('dwMailID', PacketBase.TYPE_DWORD);
            this.addProperty('wReveivedItem', PacketBase.TYPE_WORD);
            this.addProperty('btGoldType', PacketBase.TYPE_BYTE);
            this.addProperty('dwGold', PacketBase.TYPE_DWORD);
            this.addProperty('i64itemid', PacketBase.TYPE_INT64);
            this.addProperty('nCount', PacketBase.TYPE_INT);
            if (data) this.read(data);
        }

        public read(data: Laya.Byte): number {
            data.pos = super.read(data);
            for (var i: number = 0; i < this.getValue('nCount'); i++) {
                this.items[i] = new ItemBase(data);
            }
            return data.pos;
        }

        public clear(): void {
            super.clear();
            for (var i: number = 0; i < this.items.length; i++) {
                this.items[i].clear();
                this.items[i] = null;
            }
            this.items.length = 0;
        }
    }
    //收到新邮件
    // 0x0804
    export class stMailGetNewMailDecoder extends Packet {
        public static msgID: number = 0x0804;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwCount', PacketBase.TYPE_DWORD);
            this.read(data);
        }
    }
    //读取邮件
    // 0x0803
    export class stMailQueryDetailEncoder extends Packet {
        public static msgID: number = 0x0803;
        public cbPacket = stMailQueryDetailRetDecoder;
        public constructor() {
            super();
            this.addProperty('dwMailID', PacketBase.TYPE_DWORD);
            this.cmd = 0x0803;
        }
    }

    //查询单封邮件返回
    // 0x0809
    export class stMailQueryDetailRetDecoder extends Packet {
        public static msgID: number = 0x0809;
        public MailDetail: stMailDetailBase = new stMailDetailBase();
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('bterrorcode', PacketBase.TYPE_BYTE);
            this.addProperty('MailDetail', PacketBase.TYPE_BYTES, data.length - 8 - 1, this.MailDetail);
            this.read(data);
        }
    }

    //获得邮件列表
    // 0x0801
    export class stMailQueryEncoder extends Packet {
        public static msgID: number = 0x0801;
        public cbPacket = stMailQueryRetDecoder;
        public constructor() {
            super();
            this.cmd = 0x0801;
        }
    }

    // 获得邮件列表返回
    // 0x0802
    export class stMailQueryRetDecoder extends Packet {
        public mails: Array<stMailSummaryBase> = []
        public static msgID: number = 0x0802;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('bterrorcode', PacketBase.TYPE_BYTE);
            //AddProperty('nTotalMail',TYPE_INT);
            //AddProperty('nShowMail',TYPE_INT);
            this.addProperty('nCount', PacketBase.TYPE_INT);
            this.read(data);
        }

        public read(data: Laya.Byte): number {
            data.pos = super.read(data);
            for (var i: number = 0; i < this.getValue('nCount'); i++) {
                this.mails[i] = new stMailSummaryBase(data);
            }
            return data.pos;
        }
    }

    //查询用户
    // 0x080A
    export class stMailQueryUserEncoder extends Packet {
        public static msgID: number = 0x080A;
        public cbPacket = stMailQueryUserRetDecoder;
        public constructor() {
            super();
            this.addProperty('szReceiverName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.cmd = 0x080A;

        }

    }


    //查询用户返回
    // 0x080B
    export class stMailQueryUserRetDecoder extends Packet {
        public static msgID: number = 0x080B;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('bterrorcode', PacketBase.TYPE_BYTE);
            this.addProperty('szReceiverName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty('boOnline', PacketBase.TYPE_BOOL);
            this.read(data);
        }
    }

    //退信
    // 0x081E
    export class stMailReturnEncoder extends Packet {
        public static msgID: number = 0x081E;
        public cbPacket = stMailReturnRetDecoder;
        public constructor() {
            super();
            this.addProperty('dwMailid', PacketBase.TYPE_DWORD);
            this.cmd = 0x081E;
        }
    }

    //退信返回
    // 0x081F
    export class stMailReturnRetDecoder extends Packet {
        /*
        BYTE btErrorCode;
        DWORD dwMailid;*/
        public static msgID: number = 0x081F;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('bterrorcode', PacketBase.TYPE_BYTE);
            this.addProperty('dwMailid', PacketBase.TYPE_DWORD);
        }
    }

    //发送邮件
    // 0x0805
    export class stMailSendNewMailEncoder extends Packet {
        /*
        char szReceiverName[_MAX_NAME_LEN_];
        char szTitle[_MAX_MAIL_TITLE_LEN];
        char szNotice[_MAX_MAILNOTICE_LEN];
        DWORD dwGold;
        bool boPaid;
        stZeroArray<__int64> i64itemarr;
        */
        public static msgID: number = 0x0805;
        public cbPacket = stMailSendNewMailRetDecoder;
        public constructor() {
            super();
            this.addProperty('szReceiverName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty('szTitle', PacketBase.TYPE_STRING, 64);
            this.addProperty('szNotice', PacketBase.TYPE_STRING, 512);
            this.addProperty('dwGold', PacketBase.TYPE_DWORD);
            this.addProperty('boPaid', PacketBase.TYPE_BOOL);
            this.addProperty('nCount', PacketBase.TYPE_INT);
            for (var i: number = 0; i < 14; i++) {
                this.addProperty('nId' + i.toString(), PacketBase.TYPE_INT64);
            }
            this.cmd = 0x0805;
        }
    }

    //发送新邮件返回
    // 0x0806
    export class stMailSendNewMailRetDecoder extends Packet {
        public static msgID: number = 0x0806;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('bterrorcode', PacketBase.TYPE_BYTE);// 成功标示，0成功 server -> client 
            this.read(data);
        }
    }

}