module ProtoCmd {

    // 0x02A3
    // 拉取技能列表
    export class AvatarAllSkillsDecoderRet extends Packet {
        public static msgID: number = 0x02A3;
        public skills: Array<stSkillLvlBase> = [];
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('nCount', PacketBase.TYPE_INT);
            this.read(data);
        }

        public read(data: Laya.Byte): number {
            data.pos = super.read(data);
            for (var i: number = 0; i < this.getValue('nCount'); i++) {
                this.skills[i] = new stSkillLvlBase(data);
            }
            return data.pos;
        }

        public clear(): void {
            super.clear();
            for (var i: number = 0; i < this.skills.length; i++) {
                this.skills[i].clear();
                this.skills[i] = null;
            }
            this.skills.length = 0;
        }
    }


    // 0x02A6
    // 服务器推送技能冷却
    export class AvatarMagicColdRet extends Packet {
        public static msgID: number = 0x02A6;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwskillId', PacketBase.TYPE_DWORD);
            this.addProperty('dwPublicTick', PacketBase.TYPE_DWORD);//公共的CD
            this.addProperty('dwSelfTick', PacketBase.TYPE_DWORD);//单个的CD
        }
    }

    // 0x0299
    // 服务器推送改变技能状态
    export class AvatarSkillAddDecoderRet extends Packet {
        public static msgID: number = 0x0299;
        public skilllvl: stSkillLvlBase = new stSkillLvlBase();
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('skilllvl', PacketBase.TYPE_BYTES, this.skilllvl.size(), this.skilllvl);
            this.read(data);
        }
        public clear(): void {
            super.clear();
            this.skilllvl.clear();
            this.skilllvl = null;
        }
    }
}