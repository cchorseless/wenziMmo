module ProtoCmd {


    //攻击
    // 0x0232
    export class CretAttack extends Packet {
        public static msgID: number = 0x0232;
        public cbPacket = CretAttackRet;
        public constructor() {
            super();
            this.addProperty('dwTempId', PacketBase.TYPE_INT);//临时唯一ID
            this.addProperty('nMagicId', PacketBase.TYPE_INT);//技能ID,默认1000（普通攻击）
            this.addProperty('nHitMagicId', PacketBase.TYPE_INT);//战士BUFFid
            this.addProperty('dwTargetId', PacketBase.TYPE_INT);//目标临时唯一ID
            this.addProperty('nX', PacketBase.TYPE_WORD);//目标坐标
            this.addProperty('nY', PacketBase.TYPE_WORD);
            this.addProperty("boself", PacketBase.TYPE_BOOL);//是否包含自己，服务器用
            this.addProperty("distance", PacketBase.TYPE_WORD);//攻击距离
            this.cmd = 0x0232;
        }
        public set dwTempId(v: number) {
            this.setValue('dwTempId', v)
        }

        public set nMagicId(v: number) {
            this.setValue('nMagicId', v)
        }

        public set nHitMagicId(v: number) {
            this.setValue('nHitMagicId', v)
        }
        public set dwTargetId(v: number) {
            this.setValue('dwTargetId', v)
        }
        public set nX(v: number) {
            this.setValue('nX', v)
        }
        public set nY(v: number) {
            this.setValue('nY', v)
        }
        public set boself(v: number) {
            this.setValue('boself', v)
        }
        /**
         * 攻击距离
         */
        public set distance(v: number) {
            this.setValue('distance', v)
        }

    }


    // 攻击返回
    // 0x0233
    export class CretAttackRet extends Packet {
        public static msgID: number = 0x0233;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwTempId', PacketBase.TYPE_INT);// 攻击者临时ID
            this.addProperty('nX', PacketBase.TYPE_WORD);
            this.addProperty('nY', PacketBase.TYPE_WORD);
            this.addProperty('nZ', PacketBase.TYPE_WORD);
            this.addProperty('btFightCmdType', PacketBase.TYPE_BYTE);//无用
            this.addProperty('btAtomType', PacketBase.TYPE_BYTE); //无用
            this.addProperty('btDirect', PacketBase.TYPE_BYTE); //攻击方向
            this.addProperty('nMagicId', PacketBase.TYPE_INT); //技能ID
            this.addProperty('btMagicLvl', PacketBase.TYPE_BYTE); //技能等级
            this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);// 攻击结果
            this.read(data);
        }
        public get dwTempId(): number {
            return this.getValue('dwTempId');
        }
        public get btErrorCode(): number {
            return this.getValue('btErrorCode');
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
            this.addProperty('curLifeState', PacketBase.TYPE_BYTE);//当前状态　０生　１死
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
            this.addProperty('dwTmpId', PacketBase.TYPE_INT);//受击ID
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

    // 0x0296
    // 技能飞行路径
    export class AvatorSpellDecoderRet extends Packet {
        public static msgID: number = 0x0296;
        public constructor(data: Laya.Byte) {
            super();
            this.cmd = 0x0296;
            this.addProperty('dwTempId', PacketBase.TYPE_INT);// 发招人
            this.addProperty('dwTargetId', PacketBase.TYPE_INT);// 受击者
            this.addProperty('btDir', PacketBase.TYPE_BYTE);
            this.addProperty('nX', PacketBase.TYPE_INT);
            this.addProperty('nY', PacketBase.TYPE_INT);
            this.addProperty('nMagicId', PacketBase.TYPE_INT);
            this.addProperty('dwActionTick', PacketBase.TYPE_INT);//花费时间
            this.read(data);
        }
    }

}