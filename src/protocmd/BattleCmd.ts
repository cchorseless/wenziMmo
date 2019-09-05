module ProtoCmd {


    //攻击
    // 0x0232
    export class CretAttack extends Packet {
        public static msgID: number = 0x0232;
        public cbPacket = CretAttackRet;
        public constructor() {
            super();
            this.addProperty('dwTempId', PacketBase.TYPE_INT);//临时唯一ID
            this.addProperty('nMagicId', PacketBase.TYPE_INT);//技能ID
            this.addProperty('nHitMagicId', PacketBase.TYPE_INT);
            this.addProperty('dwTargetId', PacketBase.TYPE_INT);//目标临时唯一ID
            this.addProperty('nX', PacketBase.TYPE_WORD);//目标坐标
            this.addProperty('nY', PacketBase.TYPE_WORD);
            this.addProperty("boself", PacketBase.TYPE_BOOL);//是否包含自己，服务器用
            this.cmd = CretAttack.msgID;
        }
        
    }


    //攻击返回
    export class CretAttackRet extends Packet {
        public static msgID: number = 0x0233;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwTempId', PacketBase.TYPE_INT);
            this.addProperty('nX', PacketBase.TYPE_WORD);
            this.addProperty('nY', PacketBase.TYPE_WORD);
            this.addProperty('nZ', PacketBase.TYPE_WORD);
            this.addProperty('btFightCmdType', PacketBase.TYPE_BYTE);//无用
            this.addProperty('btAtomType', PacketBase.TYPE_BYTE);//无用
            this.addProperty('btDirect', PacketBase.TYPE_BYTE);//攻击方向
            this.addProperty('nMagicId', PacketBase.TYPE_INT);//技能ID
            this.addProperty('btMagicLvl', PacketBase.TYPE_BYTE);//技能等级
            this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);
            this.read(data);
        }
    }

    //0x0246
    //生命状态改变通知
    export class CretLifestateChange extends Packet {
        public static msgID: number = 0x0246;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwTempID', PacketBase.TYPE_INT);//临时唯一ID
            this.addProperty('change_type', PacketBase.TYPE_BYTE);//改变类型
            this.addProperty('curLifeState', PacketBase.TYPE_BYTE);//当前状态　０生　１　死
            this.addProperty('btIsInFight', PacketBase.TYPE_BYTE);
            this.read(data);
        }
    }

    //0x0297
    //生物掉血
    export class CretStruck extends Packet {
        public static msgID: number = 0x0297;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwTmpId', PacketBase.TYPE_INT);//
            this.addProperty('dwAcTmpID', PacketBase.TYPE_INT);//攻击者ID
            this.addProperty('npower', PacketBase.TYPE_INT);//掉了多少血
            this.addProperty('nDamageType', PacketBase.TYPE_INT);//1：暴击，2：MISS，3：抵挡，4：龙魂暴击
            this.addProperty('nHp', PacketBase.TYPE_INT);//当前血量
            this.addProperty('nMaxHp', PacketBase.TYPE_INT);//最大血量
            this.addProperty('wdMagicID', PacketBase.TYPE_INT);//技能ID
            this.addProperty("nAddDamage", PacketBase.TYPE_INT);//威慑增伤
            this.read(data);
        }
    }

}