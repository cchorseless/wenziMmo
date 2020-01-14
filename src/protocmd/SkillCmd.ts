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
    // 0x02b2
    // 服务器推送删除技能
    export class SkillDeleteCmd extends Packet {
        public static msgID: number = 0x02b2;
        public dwMagicId: stSkillLvlBase = new stSkillLvlBase();
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwMagicId', PacketBase.TYPE_INT);
            this.read(data);
        }
        public clear(): void {
            super.clear();
            this.dwMagicId.clear();
            this.dwMagicId = null;
        }
    }

    // 0x029a
    // 添加技能快捷键
    export class AvatarSetSkillShortCutsEnDeCoder extends Packet {
        public cbPacket = AvatarSetSkillShortCutsEnDeCoder;
        public static msgID: number = 0x029a;
        public shortcuts: stShortCuts = new stShortCuts(null);
        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty('ErrorCode', PacketBase.TYPE_BYTE); //0 成功
            this.addProperty('shortcuts', PacketBase.TYPE_BYTES, this.shortcuts.size(), this.shortcuts);
            this.addProperty('oldrow', PacketBase.TYPE_BYTE);// 技能快捷键坐标X 最大255
            this.addProperty('oldcol', PacketBase.TYPE_BYTE); // 技能快捷键坐标Y  最大255
            this.read(data);
            this.cmd = 0x029a;
        }
        public clear(): void {
            super.clear();
            this.shortcuts = null;
        }
    }

    // 0x029b
    // 删除技能快捷键
    export class AvatarDelSkillShortCutsEnDeCoder extends Packet {
        public static msgID: number = 0x029b;
        public shortcuts: stShortCuts = new stShortCuts(null);
        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty('ErrorCode', PacketBase.TYPE_BYTE);
            this.addProperty('shortcuts', PacketBase.TYPE_BYTES, this.shortcuts.size(), this.shortcuts);
            this.read(data);
            this.cmd = 0x029b;
        }
        public clear(): void {
            super.clear();
            this.shortcuts = null;
        }
    }
}