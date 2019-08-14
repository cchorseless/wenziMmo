module ProtoCmd {
    /**
     * 字段类
     */
    export class FieldInfo {
        public _name: string;
        public _type: number;
        public _pos: number;
        public _len: number;
        public _obj: any;
        public constructor(parent: PacketBase, name: string, type: number, pos: number, len: number, obj: any = null) {
            this._name = name;
            this._type = type;
            this._pos = pos;
            this._len = len;
            this._obj = obj;
            if (this._obj) {
                this._obj._parentStruct = parent;
                this._obj._offsetinparentStruct = pos;
            }
        }

        public clear(): void {
            this._name = "";
            this._type = 0;
            this._pos = 0;
            this._len = 0;
            this._obj = null;
        }
    }
    /**
     * INT64
     */
    export class Int64 {
        private _bytes: Laya.Byte;
        private _id: string = "";
        public constructor(data: any) {
            this._bytes = new Laya.Byte;
            this._bytes.endian = Laya.Byte.LITTLE_ENDIAN;
            this._bytes.writeArrayBuffer(data.buffer, data.pos, 8);
            this._bytes.pos = 0;
            this._id = this.int64ToStr();
        }

        public byteStr(): string {
            let str: string = "";
            str = this._bytes.readUTFBytes(this._bytes.length);
            this._bytes.pos = 0;
            return str;
        }

        public get data(): any {
            return this._bytes;
        }

        public get id(): string {
            return this._id;
        }

        public toString(): string {
            return this.int64ToStr();
        }

        public int64ToStr(): string {
            let h = this._bytes.getUint32().toString(16);
            let l = this._bytes.getUint32().toString(16);
            this._bytes.pos = 0;
            return h + '_' + l;
        }

        public int64ToNumber(): number {
            let num: number = 0;
            let nk: number = 0;
            for (let i = 0; i < 8; i++) {
                nk = this._bytes.getUint8();
                num = num + (nk * Math.pow(2, 8 * i));
            }

            if (nk & 0x80) {  //最高位是1
                num = 18446744073709551616 - num + 1;
                num = -num;
            }
            this._bytes.pos = 0;
            return num;
        }
    }

    /**
     * 包结构体
     */
    export class PacketBase {
        public static TYPE_BYTE: number = 1;
        public static TYPE_CHAR: number = 2;
        public static TYPE_BOOL: number = 3
        public static TYPE_WORD: number = 4;
        public static TYPE_INT: number = 6;
        public static TYPE_INT64: number = 7;
        public static TYPE_STRING: number = 8;
        public static TYPE_FLOAT: number = 9;
        public static TYPE_DOUBLE: number = 10;
        public static TYPE_BYTES: number = 11;
        public static TYPE_DWORD: number = 12;

        public static VALUE_TYPE_DEFAULT: number = 0;
        public static VALUE_TYPE_STRING: number = 1;
        public static VALUE_TYPE_STRING2: number = 2;

        public _list: any = {};
        public _posList: any[];
        public _bytes: Laya.Byte = null;
        public _returnBytes: Laya.Byte = null;

        public _postion: number = 0;
        public _parentStruct: PacketBase = null;
        public _offsetinparentStruct: number = 0;

        public constructor() {
            this._bytes = new Laya.Byte();
            this._bytes.endian = Laya.Byte.LITTLE_ENDIAN;
            this._posList = [];
        }

        public get returnBytes(): Laya.Byte {
            if (!this._returnBytes) {
                this._returnBytes = new Laya.Byte();
                this._returnBytes.endian = Laya.Byte.LITTLE_ENDIAN;
            }
            return this._returnBytes;
        }

        public get data(): Laya.Byte {
            if (this._bytes)
                this._bytes.pos = 0;
            return this._bytes;
        }

        public size(): number {
            return this._postion;
        }

        public getData(): Laya.Byte {
            this._bytes.pos = 0;
            return this._bytes;
        }

        /**
         * 克隆数据，将源头数据考入this
         * @param s 数据源
         * @param len 
         */
        public clone(s: Laya.Byte, len: number = 0): void {
            if (!s) {
                return;
            }
            this._bytes.pos = 0;
            if (len == 0)
                len = s.length;

            this._bytes.writeArrayBuffer(s.buffer, s.pos, len);

            var sub: PacketBase = this;
            var parent: PacketBase = this._parentStruct;
            var offset: number = this._offsetinparentStruct;

            while (parent && sub) {
                sub._bytes.pos = 0;
                parent._bytes.pos = offset;
                parent._bytes.writeArrayBuffer(sub._bytes.buffer, sub._bytes.pos, sub._bytes.length);
                sub = parent;
                offset = parent._offsetinparentStruct;
                parent = parent._parentStruct;
            }
            for (let element in this._list) {
                if (this._list[element]._obj) {
                    this._bytes.pos = this._list[element]._pos;
                    this._list[element]._obj.clone(this._bytes, this._list[element]._len);
                }
            }
        }

        public addProperty(name: string, type: number, len: number = 0, obj: any = null): void {
            var value: FieldInfo = this._list[name];
            if (value != null)
                return;

            var add: number = 0;
            switch (type) {
                case PacketBase.TYPE_BYTE:
                case PacketBase.TYPE_CHAR:
                case PacketBase.TYPE_BOOL:
                    {
                        add = 1;
                    };
                    break;
                case PacketBase.TYPE_WORD:
                    {
                        add = 2;
                    }
                    break;
                case PacketBase.TYPE_INT:
                case PacketBase.TYPE_FLOAT:
                case PacketBase.TYPE_DWORD:
                    {
                        add = 4;
                    }
                    break;
                case PacketBase.TYPE_INT64:
                case PacketBase.TYPE_DOUBLE:
                    {
                        add = 8;
                    }
                    break;
                case PacketBase.TYPE_STRING:
                    {
                        if (len == 0) {
                            throw new Error('结构中 TYPE_STRING 的长度是必须的 属性名:' + name);
                        }
                        else {
                            add = len;
                        }
                    }
                    break;
                case PacketBase.TYPE_BYTES:
                    {
                        if (len == 0) {
                            throw new Error('结构中 TYPE_BYTES 的长度是必须的 属性名:' + name);
                        }
                        else {
                            add = len;
                        }
                    }
                    break;
            }

            var field: FieldInfo = new FieldInfo(this, name, type, this._postion, add, obj);
            this._list[name] = field;
            this._postion += add;
            this._bytes.length = this._postion;

            if (name != '_flag' && name != '_cmd' && name != '_subcmd') {
                this._posList.push(name);
            }

        }

        public hasProperty(name: string): Boolean {
            return this._list[name] != null;
        }

        public setValue(name: string, value: any): any {
            var field: FieldInfo = this._list[name];
            if (field != null) {
                var type: number = field._type;
                this._bytes.pos = field._pos;
                var len: number = field._len;
                var i: number = 0;
                switch (type) {
                    case PacketBase.TYPE_BYTE:
                        {
                            this._bytes.writeByte(value);
                        }
                        break;
                    case PacketBase.TYPE_CHAR:
                        {
                            this._bytes.writeByte(value);
                        }
                        break;
                    case PacketBase.TYPE_BOOL:
                        {
                            this._bytes.writeByte(value);
                        }
                        break;
                    case PacketBase.TYPE_WORD:
                        {
                            this._bytes.writeByte(value & 0xff);
                            this._bytes.writeByte((value & 0xff00) >> 8);
                        }
                        break;
                    case PacketBase.TYPE_INT:
                    case PacketBase.TYPE_DWORD:
                        {
                            this._bytes.writeByte(value & 0xff);
                            this._bytes.writeByte((value & 0xff00) >> 8);
                            this._bytes.writeByte((value & 0xff0000) >> 16);
                            this._bytes.writeByte((value & 0xff000000) >> 24);
                        }
                        break;
                    case PacketBase.TYPE_INT64:
                        {
                            this._bytes.writeArrayBuffer(value.data.buffer, 0, 8);
                        }
                        break;
                    case PacketBase.TYPE_FLOAT:
                        {
                            this._bytes.writeFloat32(value);
                        }
                        break;
                    case PacketBase.TYPE_DOUBLE:
                        {
                            this._bytes.writeFloat64(value);
                        }
                        break;
                    case PacketBase.TYPE_STRING:
                        {
                            if (value != null) {
                                this._bytes.pos = field._pos;
                                var str: string = value;
                                for (i = 0; i < len; i++) {
                                    this._bytes[this._bytes.pos + i] = 0;
                                }
                                if (str.length < len) {
                                    this._bytes.writeUTFBytes(str);
                                    this._bytes.writeByte(0);
                                }
                            }
                        }
                        break;
                    case PacketBase.TYPE_BYTES:
                        {
                            if (value != null) {
                                var ndatalen: number = Math.min(len, value.length);
                                this._bytes.writeArrayBuffer(value.buffer, 0, ndatalen);
                                for (i = ndatalen; i < len; i++) {
                                    this._bytes.writeByte(0);
                                }
                            }
                        }
                        break;
                }

                var parent: PacketBase = this._parentStruct;
                var sub: PacketBase = this;
                var offset: number = this._offsetinparentStruct;
                while (parent) {
                    parent._bytes.pos = offset;
                    sub._bytes.pos = 0;
                    parent._bytes.writeArrayBuffer(sub._bytes.buffer, 0, sub._bytes.length);
                    sub = parent;
                    offset = parent._offsetinparentStruct;
                    parent = parent._parentStruct;
                }
            }
        }


        public getValue(name: string, valueType: number = PacketBase.VALUE_TYPE_DEFAULT): any {
            if (!this._list)
                return null;

            var field: FieldInfo = this._list[name];
            if (field == null) {
                throw new Error('getValue(' + name + ') key is not exists!');
            }

            var type: number = field._type;
            var obj: any = field._obj;
            this._bytes.pos = field._pos;
            var len: number = field._len;
            var str: string = "";
            var i: number = 0;
            switch (type) {
                case PacketBase.TYPE_CHAR:
                    {
                        return this._bytes.getByte();
                    }
                case PacketBase.TYPE_BYTE:
                    {
                        return this._bytes.getUint8();
                    }
                case PacketBase.TYPE_BOOL:
                    {
                        return this._bytes.getUint8();
                    }
                case PacketBase.TYPE_WORD:
                    {
                        return this._bytes.getUint16();
                    }
                case PacketBase.TYPE_INT:
                    {
                        return this._bytes.getInt32();
                    }
                case PacketBase.TYPE_DWORD:
                    {
                        return this._bytes.getUint32();
                    }
                case PacketBase.TYPE_FLOAT:
                    {
                        return this._bytes.getFloat32();
                    }
                case PacketBase.TYPE_DOUBLE:
                    {
                        return this._bytes.getFloat64();
                    }
                case PacketBase.TYPE_INT64:
                    {
                        return new Int64(this._bytes);
                    }
                case PacketBase.TYPE_STRING:
                    {
                        this.returnBytes.clear();
                        this.returnBytes.pos = 0;

                        this.returnBytes.writeArrayBuffer(this._bytes.buffer, this._bytes.pos, len);
                        this.returnBytes.pos = 0;
                        str = this.returnBytes.readUTFBytes(this.returnBytes.length);
                        return str;
                    }
                case PacketBase.TYPE_BYTES:
                    {
                        this.returnBytes.clear();
                        this.returnBytes.pos = 0;
                        this.returnBytes.writeArrayBuffer(this._bytes.buffer, this._bytes.pos, len);
                        this.returnBytes.pos = 0;

                        if (len == 24) {
                            let token: string = '';

                            for (let i = 0; i < this.returnBytes.length; ++i) {
                                token += this.returnBytes.getUint8().toString(16);
                            }
                        }

                        this.returnBytes.pos = 0;
                        return this.returnBytes;
                    }
            }
        }

        public read(data: Laya.Byte): number {
            if (data == null)
                return 0;

            this._bytes.pos = 0;
            this._bytes.length = this._postion;
            this._bytes.writeArrayBuffer(data.buffer, data.pos, Math.min(data.length, this._postion));

            var sub: PacketBase = this;
            var parent: PacketBase = this._parentStruct;
            var offset: number = this._offsetinparentStruct;
            while (parent && sub) {
                sub._bytes.pos = 0;
                parent._bytes.pos = offset;
                parent._bytes.writeArrayBuffer(sub._bytes.buffer, sub._bytes.pos, sub._bytes.length);

                sub = parent;
                offset = parent._offsetinparentStruct;
                parent = parent._parentStruct;
            }

            for (let element in this._list) {
                if (this._list[element]._obj) {
                    this._list[element]._obj.read(this.getValue(this._list[element]._name));
                }
            }

            return this._bytes.length;
        }

        public clear(): void {
            if (this._list) {
                for (let element in this._list) {
                    if (this._list[element]._obj) {
                        this._list[element]._obj.clear();
                    }
                    this._list[this._list[element].name] = null;
                    this._list[element].clear();
                }
            }
            this._list = null;

            if (this._posList)
                this._posList.splice(0);
            this._posList = null;

            if (this._bytes)
                this._bytes.clear();
            this._bytes = null;

            if (this._returnBytes)
                this._returnBytes.clear();
            this._returnBytes = null;

            this._parentStruct = null;
            this._offsetinparentStruct = 0;
        }
    }
    /**
     * 协议包
     */
    export class Packet extends PacketBase {
        // 返回包的类型
        public cbPacket = null;
        public static msgID = null;
        public static _MAX_NAME_LEN: number = 48;
        //private static _compressBytes: Laya.Byte = new Laya.Byte();
        //private static _sharedBytes: Laya.Byte = new Laya.Byte();

        public constructor() {
            super();
            // this.addProperty('_flag', PacketBase.TYPE_BYTE)
            // this.setValue('_flag', PacketBase.TYPE_BYTE);
            this.addProperty('_cmd', PacketBase.TYPE_BYTE);
            this.addProperty('_subcmd', PacketBase.TYPE_BYTE);


        }

        public get cmd(): number {
            var cmd: number = this.getValue('_cmd');
            var subcmd: number = this.getValue('_subcmd');
            if (cmd < 0) cmd += 256;
            if (subcmd < 0) subcmd += 256;
            return (cmd << 8 | subcmd);
        }

        public set cmd(msgID: number) {
            var cmd: number = (msgID & 0xff00) >> 8;
            var subcmd: number = msgID & 0x00ff;
            this.setValue('_cmd', cmd);
            this.setValue('_subcmd', subcmd);
        }

        public static printcmd(msgID: number): string {
            var cmd: number = (msgID & 0xff00) >> 8;
            var subcmd: number = msgID & 0x00ff;
            var cmdstr: string = "大包 ";
            var subcmdstr: string = " 小包 ";
            return cmdstr + cmd.toString() + subcmdstr + subcmd.toString();
        }

        public static ReadPackCmd(data: Laya.Byte, fix: string): number {
            var pos: number = data.pos;
            var cmd: number = data.getUint8();
            var subcmd: number = data.getUint8();
            if (cmd < 0) cmd += 256;
            if (subcmd < 0) subcmd += 256;
            var msgID: number = cmd << 8 | subcmd;
            data.pos = pos;
            Log.trace(fix + "：" + msgID.toString(16) + "[" + this.printcmd(msgID) + " ]");
            return msgID;
        }

        public send(): void {
            this._bytes.pos = 0;
            if (GameApp.Socket == null) {
                throw new Error('socket == null')
            }
            // 这里没有做分包
            if (false && this._bytes.length >= 64) {
                //_compress
            }
            else {
                Packet.ReadPackCmd(this._bytes, "send");
                GameApp.Socket.send(this._bytes);
            }
            this.clear();
        }
        /**
         * 包号转化成事件字符串
         */
        public get eventName(): string {
            if (this.cbPacket == null) {
                throw new Error(QuickUtil.getObjectClassName(this) + '-cbPacket缺失');
            }
            if (this.cbPacket.msgID == null) {
                throw new Error(QuickUtil.getObjectClassName(this) + '-cbPacket无msgID设置');
            }
            return Packet.eventName(this.cbPacket)
        }

        public static eventName(_packet): string {
            if (_packet == null || _packet.msgID == null) {
                throw new Error(QuickUtil.getObjectClassName(this) + '_packet无msgID设置');
            }
            return 'CLIENT_MESSAGE_' + _packet.msgID;
        }
    }


    export class SimpleFeature extends PacketBase {
        public constructor() {
            super();
            this.addProperty('sex', PacketBase.TYPE_BYTE);//性别
            this.addProperty('job', PacketBase.TYPE_BYTE);//职业
            this.addProperty('hair', PacketBase.TYPE_BYTE);//发型
            this.addProperty('dwFaceId', PacketBase.TYPE_DWORD);//脸型
            this.addProperty('weapon', PacketBase.TYPE_DWORD);//武器ID
            this.addProperty('dress', PacketBase.TYPE_DWORD);//衣服ID
        }

        /**
         * 性别
         */
        public get sex(): number {
            return this.getValue('sex');
        }
        public set sex(v: number) {
            this.setValue('sex', v);
        }
        /**
         * 职业
         */
        public get job(): number {
            return this.getValue('job');
        }
        public set job(v: number) {
            this.setValue('job', v);
        }
        /**
         * 发型
         */
        public get hair(): number {
            return this.getValue('hair');
        }
        public set hair(v: number) {
            this.setValue('hair', v);
        }
        /**
         * 脸型
         */
        public get dwFaceId(): number {
            return this.getValue('dwFaceId');
        }
        public set dwFaceId(v: number) {
            this.setValue('dwFaceId', v);
        }
        /**
         * 武器
         */
        public get weapon(): number {
            return this.getValue('weapon');
        }
        public set weapon(v: number) {
            this.setValue('weapon', v);
        }
        /**
         * 衣服ID
         */
        public get dress(): number {
            return this.getValue('dress');
        }
        public set dress(v: number) {
            this.setValue('dress', v);
        }




    }

    export class CretFeature extends PacketBase {
        public feature: SimpleFeature = new SimpleFeature();
        public constructor() {
            super();
            this.addProperty('btCretType', PacketBase.TYPE_BYTE);//1此人物的类型，比如1==玩家，2==NPC，3==怪,4宝宝,5，人形怪，6英雄
            this.addProperty('feature', PacketBase.TYPE_BYTES, this.feature.size());//昵称外观信息stSimpleFeature结构
            this.addProperty('nTitleId', PacketBase.TYPE_WORD);//称号ID
            this.addProperty('btBattleCamp', PacketBase.TYPE_BYTE);//战场类型
            this.addProperty('dwWingId', PacketBase.TYPE_WORD);//翅膀Id
            this.addProperty('n_bo_AllFeature', PacketBase.TYPE_DWORD);//外观 位状态信息
        }

        public read(data: Laya.Byte): number {
            let pos: number = super.read(data);
            this.feature.read(this.getValue('feature'));
            return pos;
        }
        /**
         * 人物类型
         */
        public get btCretType(): number {
            return this.getValue('btCretType');
        }
        public set btCretType(v: number) {
            this.setValue('btCretType', v);
        }
        /**
         * 称号ID
         */
        public get nTitleId(): number {
            return this.getValue('nTitleId');
        }
        public set nTitleId(v: number) {
            this.setValue('nTitleId', v);
        }
        /**
         * 战场类型
         */
        public get btBattleCamp(): number {
            return this.getValue('btBattleCamp');
        }
        public set btBattleCamp(v: number) {
            this.setValue('btBattleCamp', v);
        }
        /**
         * 翅膀ID
         */
        public get dwWingId(): number {
            return this.getValue('dwWingId');
        }
        public set dwWingId(v: number) {
            this.setValue('dwWingId', v);
        }
        /**
         * 外观 位状态信息
         */
        public get n_bo_AllFeature(): number {
            return this.getValue('n_bo_AllFeature');
        }
        public set n_bo_AllFeature(v: number) {
            this.setValue('n_bo_AllFeature', v);
        }

    }
    /**
     * 怪物　NPC　外显
     */
    export class AnimalFeature extends CretFeature {
        public constructor() {
            super()
            this.addProperty('dwMonsterAudioId', PacketBase.TYPE_DWORD);// 怪物声音类型
            this.addProperty("dwRefreshTime", PacketBase.TYPE_DWORD);//BOSS刷新时间
            this.addProperty('dwMasterTmpID', PacketBase.TYPE_DWORD);//主人ID;
            this.addProperty('dwCretTypeId', PacketBase.TYPE_INT);//NPC 怪物基本ID  
        }
        /**
         * 怪物声音类型
         */
        public get dwMonsterAudioId(): number {
            return this.getValue('dwMonsterAudioId');
        }
        public set dwMonsterAudioId(v: number) {
            this.setValue('dwMonsterAudioId', v);
        }
        /**
         * BOSS刷新时间
         */
        public get dwRefreshTime(): number {
            return this.getValue('dwRefreshTime');
        }
        public set dwRefreshTime(v: number) {
            this.setValue('dwRefreshTime', v);
        }
        /**
         * 主人ID
         */
        public get dwMasterTmpID(): number {
            return this.getValue('dwMasterTmpID');
        }
        public set dwMasterTmpID(v: number) {
            this.setValue('dwMasterTmpID', v);
        }
        /**
         * NPC 怪物基本ID  
         */
        public get dwCretTypeId(): number {
            return this.getValue('dwCretTypeId');
        }
        public set dwCretTypeId(v: number) {
            this.setValue('dwCretTypeId', v);
        }

    }

    /**
     * 人物外显
     */
    export class PlayerFeature extends CretFeature {
        public constructor() {
            super();
            this.addProperty('btGroupId', PacketBase.TYPE_DWORD);//队伍ID
            this.addProperty('btGroupMaster', PacketBase.TYPE_BYTE);//是否是队长			
            this.addProperty('dwClanId', PacketBase.TYPE_INT);//  4  氏族ID  公会ID
            this.addProperty('btClanMaster', PacketBase.TYPE_BYTE);// 1  是否族长  
            this.addProperty('dwVip', PacketBase.TYPE_DWORD); //vip类型
            this.addProperty("btNameColor", PacketBase.TYPE_BYTE);//名字颜色 0是正常的，1灰，2黄，3红
            this.addProperty("wNowKilling", PacketBase.TYPE_DWORD);//pk值
        }
        /**
         * 队伍ID
         */
        public get btGroupId(): number {
            return this.getValue('btGroupId');
        }
        public set btGroupId(v: number) {
            this.setValue('btGroupId', v);
        }
        /**
         * 是否是队长
         */
        public get btGroupMaster(): number {
            return this.getValue('btGroupMaster');
        }
        public set btGroupMaster(v: number) {
            this.setValue('btGroupMaster', v);
        }
        /**
         * 氏族ID  公会ID
         */
        public get dwClanId(): number {
            return this.getValue('dwClanId');
        }
        public set dwClanId(v: number) {
            this.setValue('dwClanId', v);
        }
        /**
         * 是否族长  
         */
        public get btClanMaster(): number {
            return this.getValue('btClanMaster');
        }
        public set btClanMaster(v: number) {
            this.setValue('btClanMaster', v);
        }
        /**
         * vip类型
         */
        public get dwVip(): number {
            return this.getValue('dwVip');
        }
        public set dwVip(v: number) {
            this.setValue('dwVip', v);
        }
        /**
         * 名字颜色 0是正常的，1灰，2黄，3红 
         */
        public get btNameColor(): number {
            return this.getValue('btNameColor');
        }
        public set btNameColor(v: number) {
            this.setValue('btNameColor', v);
        }
        /**
         * pk值
         */
        public get wNowKilling(): number {
            return this.getValue('wNowKilling');
        }
        public set wNowKilling(v: number) {
            this.setValue('wNowKilling', v);
        }
    }

    /**
     * 角色信息
     */
    export class SelectPlayerInfo extends PacketBase {
        public feature: SimpleFeature = new SimpleFeature();
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//名称
            this.addProperty('nlevel', PacketBase.TYPE_INT);//等级
            this.addProperty('mapid', PacketBase.TYPE_WORD);//地图ID
            this.addProperty('cloneid', PacketBase.TYPE_WORD);//副本ID
            this.addProperty('homemapid', PacketBase.TYPE_WORD);//出生地图ID
            this.addProperty('conid', PacketBase.TYPE_WORD);//弃用
            this.addProperty('countryId', PacketBase.TYPE_BYTE);//国家ID
            this.addProperty('ngmlvl', PacketBase.TYPE_BYTE);//GM等级
            this.addProperty('Feature', PacketBase.TYPE_BYTES, this.feature.size(), this.feature);
            this.addProperty('dwUserOnlyId', PacketBase.TYPE_BYTES, 8);//唯一识别ID
            this.addProperty('zslevel', PacketBase.TYPE_INT);//转生等级
            this.addProperty('viplvl', PacketBase.TYPE_BYTE);//VIP等级
            this.addProperty('btisdel', PacketBase.TYPE_BOOL);//是否删除
            this.addProperty('posdeltime', PacketBase.TYPE_INT);//删除时间
            this.addProperty('lastlogintime', PacketBase.TYPE_INT);//最后登录时间
            this.addProperty('remaindeltime', PacketBase.TYPE_INT);//剩余删除时间
            this.addProperty("playerBanTime", PacketBase.TYPE_INT);//封号时间
            this.addProperty('lastloginip', PacketBase.TYPE_BYTES, 4);//最后登录IP
            if (data) {
                data.pos += this.read(data);
            }
        }

        public read(data: Laya.Byte) {
            data.pos += super.read(data);
            return this._bytes.length;
        }

        public clear(): void {
            super.clear();
            this.feature = null;
        }
    }


    /**
     * 生物位置
     */
    export class CretLocation extends PacketBase {
        public constructor() {
            super();
            this.addProperty('mapid', PacketBase.TYPE_INT);//  地图编号  
            this.addProperty('ncurx', PacketBase.TYPE_WORD);//   所在坐标X  
            this.addProperty('ncury', PacketBase.TYPE_WORD);//   所在坐标Y  
            this.addProperty('ncurz', PacketBase.TYPE_WORD);//   所在坐标Z 
        }
    }


    /**
     * 角色属性
     */
    export class ArpgAbility extends PacketBase {
        public constructor() {
            super();
            this.addProperty('nMaxHP', PacketBase.TYPE_INT); //最大血量
            this.addProperty('nMaxMP', PacketBase.TYPE_INT); //最大蓝量
            this.addProperty("nMaxAttack", PacketBase.TYPE_INT);//攻击上限
            this.addProperty("nMinAttack", PacketBase.TYPE_INT);//攻击下限
            this.addProperty('nMaxDC', PacketBase.TYPE_INT); //物理攻击上限值
            this.addProperty('nMinDC', PacketBase.TYPE_INT); //物理攻击下限值
            this.addProperty('nMaxMC', PacketBase.TYPE_INT); //自然魔法攻击上限值
            this.addProperty('nMinMC', PacketBase.TYPE_INT); //自然魔法攻击下限值
            this.addProperty('nMaxSC', PacketBase.TYPE_INT); //灵魂魔法攻击上限值
            this.addProperty('nMinSC', PacketBase.TYPE_INT); //灵魂魔法攻击下限值
            this.addProperty('nMaxAC', PacketBase.TYPE_INT); //物理防御上限值
            this.addProperty('nMinAC', PacketBase.TYPE_INT); //物理防御下限值
            this.addProperty('nMaxMAC', PacketBase.TYPE_INT); //全系法术防御上限值
            this.addProperty('nMinMAC', PacketBase.TYPE_INT); //全系法术防御下限值
            this.addProperty('nHit', PacketBase.TYPE_INT); //命中
            this.addProperty("nHitRatio", PacketBase.TYPE_INT);//命中率
            this.addProperty('nJuck', PacketBase.TYPE_INT); //闪避
            this.addProperty("nJuckRatio", PacketBase.TYPE_INT);//闪避率
            this.addProperty('nCrit', PacketBase.TYPE_INT); //暴击
            this.addProperty("nCritRatio", PacketBase.TYPE_INT);//暴击率
            this.addProperty('nCritResi', PacketBase.TYPE_INT); //暴抗
            this.addProperty("nCritResiRatio", PacketBase.TYPE_INT);//暴抗率
            this.addProperty('nAtkCrit', PacketBase.TYPE_INT); //暴击伤害,每次暴击额外增加的伤害
            this.addProperty('nLucky', PacketBase.TYPE_INT); //幸运
            this.addProperty('nRestoreHp', PacketBase.TYPE_INT); //每次恢复血量，正负
            this.addProperty('nRestoreMp', PacketBase.TYPE_INT); //每次恢复蓝量，正负
            this.addProperty("nMoveSpeed", PacketBase.TYPE_INT);//移动速度
            this.addProperty("nPalsyRatio", PacketBase.TYPE_INT);//麻痹几率
            this.addProperty("nPalsyResiRatio", PacketBase.TYPE_INT);//抗麻痹几率
            this.addProperty("nCoAtkPower", PacketBase.TYPE_INT);//合击威力
            this.addProperty("nAtkAdd1", PacketBase.TYPE_INT);//对战士伤害增加
            this.addProperty("nAtkReduce1", PacketBase.TYPE_INT);//受战士伤害减少
            this.addProperty("nAtkAdd2", PacketBase.TYPE_INT);	//对法师伤害增加
            this.addProperty("nAtkReduce2", PacketBase.TYPE_INT);//受法师伤害减少
            this.addProperty("nAtkAdd3", PacketBase.TYPE_INT);//对道士伤害增加
            this.addProperty("nAtkReduce3", PacketBase.TYPE_INT);//受道士伤害减少
            this.addProperty("nAtkAddMon", PacketBase.TYPE_INT);	//对怪物伤害增加
            this.addProperty("nAtkReduceMon", PacketBase.TYPE_INT);	//受怪物伤害减少
            this.addProperty("nAtkAddBoss", PacketBase.TYPE_INT);//对BOSS伤害增加
            this.addProperty("nAtkReduceBoss", PacketBase.TYPE_INT);//受BOSS伤害减少
            this.addProperty("nAtkAddHero", PacketBase.TYPE_INT);//增加对英雄伤害
            this.addProperty("nAtkReduceHero", PacketBase.TYPE_INT);//减少受英雄伤害
            this.addProperty("nInnerValue", PacketBase.TYPE_INT);//内功值
            this.addProperty("nInnerRestore", PacketBase.TYPE_INT);//内功恢复
            this.addProperty("nInnerResi", PacketBase.TYPE_INT);//内功抵伤
            this.addProperty("nFinalDamageAdd", PacketBase.TYPE_INT);//最终伤害增加
            this.addProperty("nFinalDamageReduce", PacketBase.TYPE_INT);//最终伤害减免
            this.addProperty("nCritAdd2BOSS", PacketBase.TYPE_INT);//增加对BOSS的暴击
            this.addProperty("nAtkCritAdd2BOSS", PacketBase.TYPE_INT);//增加对BOSS的爆伤
            this.addProperty("nCoAtkReduce", PacketBase.TYPE_INT);//受合击伤害减少
            this.addProperty("nCritReduce", PacketBase.TYPE_INT);//受暴击伤害减少
            this.addProperty("nRestoreAnger", PacketBase.TYPE_INT);//怒气恢复(万分比)	
            this.addProperty("nCoAtt2Monster", PacketBase.TYPE_INT);//合击对怪物增伤率
            this.addProperty("nCoAtt2Player", PacketBase.TYPE_INT);//合击对怪物增伤害
            this.addProperty("nCoAttLvl", PacketBase.TYPE_INT);//合击技能等级
            this.addProperty("nHpPer", PacketBase.TYPE_INT);//生命万分比
        }
    }

    /**
     * 物品位置
     */
    export class ItemLocation extends PacketBase {
        public constructor() {
            super();
            this.addProperty('btLocation', PacketBase.TYPE_CHAR);//位置
            this.addProperty('btTableID', PacketBase.TYPE_CHAR);//页签
            this.addProperty('btIndex', PacketBase.TYPE_CHAR);//索引
        }
    }


    /**
     * 极品属性
     */
    export class Nonpareil {
        public btNpFrom: number;
        public btNpType: number;
        public dwNpNum: number;
        public constructor() {
        }
    }


    /**
     * 物品结构
     */
    export class ItemBase extends PacketBase {
        public _location: ItemLocation = new ItemLocation(); //3存储位置
        public ExtensionProperty: Laya.Byte;		// 预留 10字节，做扩充
        public defaultName: string;
        // 绑定的UI组件
        public ui_item;
        public constructor(data: Laya.Byte = null) {
            super();
            this.ExtensionProperty = new Laya.Byte();
            this.ExtensionProperty.endian = Laya.Byte.LITTLE_ENDIAN;
            this.addProperty('i64ItemID', PacketBase.TYPE_INT64);	//物品id
            this.addProperty('dwBaseID', PacketBase.TYPE_INT);	//物品基本id
            this.addProperty('Location', PacketBase.TYPE_BYTES, this._location.size(), this._location);	//存储位置
            this.addProperty('dwLevel', PacketBase.TYPE_DWORD);//当前等级
            this.addProperty('nValue', PacketBase.TYPE_INT); //当前存储的经验
            this.addProperty('nMaxValue', PacketBase.TYPE_INT);//存储的最大经验
            this.addProperty('boIdent', PacketBase.TYPE_BOOL);	//是否鉴定
            this.addProperty('nDura', PacketBase.TYPE_INT);	//当前耐久度
            this.addProperty('nMaxDura', PacketBase.TYPE_INT);	//最大耐久度
            this.addProperty('dwCount', PacketBase.TYPE_INT);	//物品数量	0..100
            this.addProperty('dwBinding', PacketBase.TYPE_DWORD);	//绑定信息
            this.addProperty('btBornFrom', PacketBase.TYPE_BYTE);	//物品来源
            this.addProperty('dwEffId', PacketBase.TYPE_DWORD);		 //当前效果ID
            this.addProperty('btQuality', PacketBase.TYPE_BYTE);	//物品品质
            this.addProperty('btStrengCount', PacketBase.TYPE_BYTE);	//强化次数
            this.addProperty('dwExpireTime', PacketBase.TYPE_DWORD);//过期时间	
            this.addProperty('btNpPropertyCount', PacketBase.TYPE_BYTE);	//极品属性条目数
            this.addProperty('UnionData', PacketBase.TYPE_BYTES, 60);
            this.addProperty('ExtensionProperty', PacketBase.TYPE_BYTES, 10);	//预留10字节，做扩充
            if (data) { data.pos += this.read(data); }
        }

        /**
         * 位置信息
         */
        public get location(): ItemLocation {
            return this._location;
        }

        public set location(v: ItemLocation) {
            this._location.clone(v.data);
        }

        /**
         * 道具ID
         */
        public get i64ItemID(): Int64 {
            return this.getValue('i64ItemID');
        }
        /**
         * 道具ID
         */
        public set i64ItemID(v: Int64) {
            this.setValue('i64ItemID', v);
        }

        /**
         * 物品基本id
         */
        public get dwBaseID(): number {
            return this.getValue('dwBaseID');
        }
        /**
         * 物品基本id
         */
        public set dwBaseID(v: number) {
            this.setValue('dwBaseID', v);
        }

        /**
         * 当前等级
         */
        public get dwLevel(): number {
            return this.getValue('dwLevel');
        }

        /**
         * 当前等级
         */
        public set dwLevel(v: number) {
            this.setValue('dwLevel', v);
        }

        /**
         * 当前经验
         */
        public get nValue(): number {
            return this.getValue('nValue');
        }

        /**
         * 当前经验
         */
        public set nValue(v: number) {
            this.setValue('nValue', v);
        }

        /**
         * 下次升级需要经验
         */
        public get nMaxValue(): number {
            return this.getValue('nMaxValue');
        }

        /**
         * 下次升级需要经验
         */
        public set nMaxValue(v: number) {
            this.setValue('nMaxValue', v);
        }

        /**
         * 是否鉴定
         */
        public get boIdent(): number {
            return this.getValue('boIdent')
        }

        /**
         * 是否鉴定
         */
        public set boIdent(v: number) {
            this.setValue('boIdent', v);
        }

        /**
         * 当前耐久度
         */
        public get nDura(): number {
            return this.getValue('nDura')
        }
        /**
         * 耐久度
         */
        public set nDura(v: number) {
            this.setValue('nDura', v);
        }

        /**
         * 最大耐久度
         */
        public get nMaxDura(): number {
            return this.getValue('nMaxDura');
        }

        public set nMaxDura(v: number) {
            this.setValue('nMaxDura', v);
        }

        /**
         * 物品数量
         */
        public get dwCount(): number {
            return this.getValue('dwCount');
        }

        public set dwCount(v: number) {
            this.setValue('dwCount', v);
        }

        /**
         * 是否绑定
         */
        public get dwBinding(): number {
            return this.getValue('dwBinding');
        }

        public set dwBinding(v: number) {
            this.setValue('dwBinding', v);
        }

        /**
         * 物品来源
         */
        public get btBornFrom(): number {
            return this.getValue('btBornFrom');
        }

        public set btBornFrom(v: number) {
            this.setValue('btBornFrom', v);
        }

        /**
         * 当前效果ID
         */
        public get dwEffId(): number {
            return this.getValue('dwEffId');
        }

        public set dwEffId(v: number) {
            this.setValue('dwEffId', v);
        }

        /**
         * 品质
         */
        public get btQuality(): number {
            return this.getValue('btQuality');
        }

        public set btQuality(v: number) {
            this.setValue('btQuality', v);
        }

        /**
         * 1强化1
         */
        public get btStrengCount(): number {
            return this.getValue('btStrengCount');
        }

        public set btStrengCount(v: number) {
            this.setValue('btStrengCount', v);
        }

        /**
         * 4物品到期时间(秒)
         */
        public get dwExpireTime(): number {
            return this.getValue('dwExpireTime');
        }

        public set dwExpireTime(v: number) {
            this.setValue('dwExpireTime', v);
        }

        /**
         * 1极品属性条目数--55
         */
        public get btNpPropertyCount(): number {
            return this.getValue('btNpPropertyCount');
        }

        public set btNpPropertyCount(v: number) {
            this.setValue('btNpPropertyCount', v);
        }

        /**
         * 属性
         */
        public get stNpProperty(): Array<Nonpareil> {
            let result = [];
            if (this.btNpPropertyCount > 0) {
                let npdata: Laya.Byte = new Laya.Byte();;
                npdata.endian = Laya.Byte.LITTLE_ENDIAN;
                npdata = this.getValue('UnionData');
                for (let j = 0; j < this.btNpPropertyCount; j++) {
                    let np = new Nonpareil();
                    np.btNpFrom = npdata.getUint8();
                    np.btNpType = npdata.getUint8();
                    np.dwNpNum = npdata.getUint32();
                    result.push(np);
                }
            }
            return result;
        }


        public read(data: Laya.Byte): number {
            if (data) {
                data.pos += super.read(data);
                return this._bytes.length;
            }
            return 0;
        }

        /**
         * 清理数据，删除UI组件
         */
        public clear(): void {
            this.recoverUI();
            super.clear();
        }
        /**
         * 清除绑定的UI
         */
        public recoverUI(): void {
            if (this.ui_item) {
                this.ui_item.destroy(true);
            }
            this.ui_item = null;
        }
    }

    /**
     * 摊位信息
     */
    export class stAuctionItemBase extends ItemBase {
        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty('dwIndex', PacketBase.TYPE_DWORD);
            this.addProperty('btConsignType', PacketBase.TYPE_BYTE);
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty('wType', PacketBase.TYPE_WORD);//物品类型
            this.addProperty('dwWearLevel', PacketBase.TYPE_DWORD);//穿戴等级
            this.addProperty("dwZSLevel", PacketBase.TYPE_DWORD);//转生等级
            this.addProperty('btRare', PacketBase.TYPE_BYTE);
            this.addProperty('dwConsignPrice', PacketBase.TYPE_DWORD);//售价
            this.addProperty('dwSellOnlyId', PacketBase.TYPE_DOUBLE);
            this.addProperty('dwBuyOnlyId', PacketBase.TYPE_DOUBLE);
            this.addProperty('overTime', PacketBase.TYPE_DWORD);
            this.addProperty('szSeller', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty('tSellTime', PacketBase.TYPE_DWORD);
            this.addProperty('szBuyerer', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty('btState', PacketBase.TYPE_BYTE);
            this.addProperty('szSellTip', PacketBase.TYPE_STRING, 256);
            this.addProperty('boShowSellName', PacketBase.TYPE_BOOL);
            if (data) { data.pos += this.read(data); }
        }

        /**
         * 寄售条目索引
         */
        public get dwIndex(): number {
            return this.getValue('dwIndex');
        }
        public set dwIndex(v: number) {
            this.setValue('dwIndex', v);
        }

        /**
         * 寄售类型(0 金币 1 元宝)
         */
        public get btConsignType(): number {
            return this.getValue('btConsignType');
        }
        public set btConsignType(v: number) {
            this.setValue('btConsignType', v);
        }
        /**
         * 物品名称
         */
        public get szName(): string {
            return this.getValue('szName');
        }
        public set szName(v: string) {
            this.setValue('szName', v);
        }
        /**
         * 物品类型
         */
        public get wType(): number {
            return this.getValue('wType');
        }
        public set wType(v: number) {
            this.setValue('wType', v);
        }


        /**
         * 佩戴等级
         */
        public get dwWearLevel(): number {
            return this.getValue('dwWearLevel');
        }
        public set dwWearLevel(v: number) {
            this.setValue('dwWearLevel', v);
        }
        /**
         * 转生等级
         */
        public get dwZSLevel(): number {
            return this.getValue('dwZSLevel');
        }
        public set dwZSLevel(v: number) {
            this.setValue('dwZSLevel', v);
        }
        /**
         * 物品品质 稀世等
         */
        public get btRare(): number {
            return this.getValue('btRare');
        }
        public set btRare(v: number) {
            this.setValue('btRare', v);
        }
        /**
         * 售价
         */
        public get dwConsignPrice(): number {
            return this.getValue('dwConsignPrice');
        }
        public set dwConsignPrice(v: number) {
            this.setValue('dwConsignPrice', v);
        }
        /**
         * 售卖者ID
         */
        public get dwSellOnlyId(): number {
            return this.getValue('dwSellOnlyId');
        }
        public set dwSellOnlyId(v: number) {
            this.setValue('dwSellOnlyId', v);
        }
        /**
         * 购买者ID
         */
        public get dwBuyOnlyId(): number {
            return this.getValue('dwBuyOnlyId');
        }
        public set dwBuyOnlyId(v: number) {
            this.setValue('dwBuyOnlyId', v);
        }
        /**
         * 自动下架结束时间
         */
        public get overTime(): number {
            return this.getValue('overTime');
        }
        public set overTime(v: number) {
            this.setValue('overTime', v);
        }
        /**
         * 出售人名称
         */
        public get szSeller(): string {
            return this.getValue('szSeller');
        }
        public set szSeller(v: string) {
            this.setValue('szSeller', v);
        }
        /**
         * 售出时间
         */
        public get tSellTime(): number {
            return this.getValue('tSellTime');
        }
        public set tSellTime(v: number) {
            this.setValue('tSellTime', v);
        }
        /**
         * 购买人名字
         */
        public get szBuyerer(): string {
            return this.getValue('szBuyerer');
        }
        public set szBuyerer(v: string) {
            this.setValue('szBuyerer', v);
        }
        /**
         * 0卖了未领取<br>1卖了领取<br>2超时下架
         */
        public get btState(): number {
            return this.getValue('btState');
        }
        public set btState(v: number) {
            this.setValue('btState', v);
        }
        /**
         * 
         */
        public get szSellTip(): string {
            return this.getValue('szSellTip');
        }
        public set szSellTip(v: string) {
            this.setValue('szSellTip', v);
        }
        /**
         * 
         */
        public get boShowSellName(): boolean {
            return this.getValue('boShowSellName');
        }
        public set boShowSellName(v: boolean) {
            this.setValue('boShowSellName', v);
        }



        public read(data: Laya.Byte): number {
            if (data) {
                data.pos += super.read(data);
                return this._bytes.length;
            }
            return 0;
        }

    }


    /**
     * 摆摊日志
     */
    export class stConsignLogBase extends PacketBase {
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty("szItemName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty("opTime", PacketBase.TYPE_DWORD);//
            this.addProperty("dwPrice", PacketBase.TYPE_DWORD);//
            this.addProperty("buyerName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//购买人name
            this.addProperty("btState", PacketBase.TYPE_BYTE);//
            this.read(data);
        }

        public get itemName(): string {
            return this.getValue("szItemName");
        }

        public get buyerName(): string {
            return this.getValue("buyerName");
        }

        public get optime(): number {
            return this.getValue("opTime");
        }

        public get money(): number {
            return this.getValue("dwPrice");
        }

        /**0 卖了未取<br>1卖了已取<br>2超时下架*/
        public get state(): number {
            return this.getValue("btState");
        }

    }

    /**
     * 行会捐献日志
     */
    export class stDonateLogBase extends PacketBase {
        public item: ItemBase = new ItemBase(null);
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty("szName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//名字
            this.addProperty("btAction", PacketBase.TYPE_BYTE);//0捐献 1兑换 2摧毁
            this.addProperty('item', PacketBase.TYPE_BYTES, this.item.size(), this.item);//物品
            this.addProperty("dwTime", PacketBase.TYPE_DWORD);//时间
            if (data) {
                data.pos += this.read(data);
            }
        }

        public clear(): void {
            super.clear();
            this.item.clear();
            this.item = null;
        }
    }

    export class stGSGuildInfoBase extends PacketBase {
        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty('dwGuildId', PacketBase.TYPE_DWORD);
            this.addProperty('dwGuildLevel', PacketBase.TYPE_DWORD);
            this.addProperty('dwPowerLeve', PacketBase.TYPE_DWORD);
            this.addProperty('szGuildName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty('dwCurExp', PacketBase.TYPE_DWORD);
            this.addProperty('dwLevelUpExp', PacketBase.TYPE_DWORD);
            this.addProperty('i64StoreExp', PacketBase.TYPE_INT64);
            if (data) data.pos += this.read(data);
        }
    }

    /**
     * 单条行会信息
     */
    export class stSingleGuildinfoBase extends PacketBase {
        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty("dwCurGuildPlayerCount", PacketBase.TYPE_DWORD);
            this.addProperty("dwCurGuildOnlineCount", PacketBase.TYPE_DWORD);
            this.addProperty("dwGuildPlayerTotalLvl", PacketBase.TYPE_DWORD);
            this.addProperty("szAllMasters", PacketBase.TYPE_STRING, 288);
            this.addProperty("dwRank", PacketBase.TYPE_DWORD);
            this.addProperty("btMasterSex", PacketBase.TYPE_BYTE);
            this.addProperty("btMasterJob", PacketBase.TYPE_BYTE);
            this.addProperty("btRelation", PacketBase.TYPE_BYTE);//本帮与此帮会的关系0：正常  1：宣战
            if (data) {
                data.pos += this.read(data);
            }
        }
    }
    /**
     * 行会事件
     */
    export class stGuildEventBase extends PacketBase {
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty("dwGuildId", PacketBase.TYPE_DWORD);
            this.addProperty("dwEventTime", PacketBase.TYPE_DWORD);
            this.addProperty('szEventText', PacketBase.TYPE_STRING, 256);
            this.addProperty("dwEventType", PacketBase.TYPE_DWORD);
            if (data) data.pos += this.read(data);
        }
    }

    export class stClassEventBase extends PacketBase {
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty("CampClassId", PacketBase.TYPE_DWORD);//key为 营队*100+班级	营队最大99	班级最大99
            this.addProperty("dwTime", PacketBase.TYPE_DWORD);
            this.addProperty("szEvents", PacketBase.TYPE_STRING, 512);
            if (data) {
                data.pos += this.read(data);
            }
        }
    }



    /**
	 * 班级信息
	 * */
    export class stClassInfoBase extends PacketBase {
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty("dwCampId", PacketBase.TYPE_DWORD);
            this.addProperty("dwClassId", PacketBase.TYPE_DWORD);
            this.addProperty("dwOnlineNum", PacketBase.TYPE_DWORD);
            this.addProperty("dwTotalNum", PacketBase.TYPE_DWORD);
            if (data) {
                data.pos += this.read(data);
            }
        }
    }

    /**
	 * 用户信息
	 * */
    export class szAskJoinUserInfoBase extends PacketBase {
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty("szName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty("btSex", PacketBase.TYPE_BYTE);
            this.addProperty("btJob", PacketBase.TYPE_BYTE);
            this.addProperty("dwLevel", PacketBase.TYPE_DWORD);
            this.addProperty("boOnline", PacketBase.TYPE_BOOL);
            this.addProperty("dwLastLoginOutTime", PacketBase.TYPE_DWORD);
            if (data) {
                data.pos += this.read(data);
            }
        }
    }
    export class stGSALLGuild extends PacketBase {
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty("dwGuildId", PacketBase.TYPE_DWORD);
            this.addProperty("szGuildName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty("dwGuildLevel", PacketBase.TYPE_DWORD);
            this.addProperty("dwCurGuildPlayerCount", PacketBase.TYPE_DWORD);
            if (data) {
                data.pos += this.read(data);
            }
        }


        public get dwGuildId(): number {
            return this.getValue('dwGuildId');
        }

        public get szGuildName(): string {
            return this.getValue('szGuildName');
        }

        public get dwGuildLevel(): number {
            return this.getValue('dwGuildLevel');
        }

        public get dwCurGuildPlayerCount(): number {
            return this.getValue('dwCurGuildPlayerCount');
        }

    }


    export class AliaMemberInfoBase extends PacketBase {
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty("szName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty("dwLevel", PacketBase.TYPE_DWORD);
            this.addProperty("btJob", PacketBase.TYPE_BYTE);
            this.addProperty("btSex", PacketBase.TYPE_BYTE);
            if (data) {
                data.pos += this.read(data);
            }
        }
    }

    export class DiplomacyGuildBase extends PacketBase {
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty("dwGuildId", PacketBase.TYPE_DWORD);
            this.addProperty("szGuildName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty("dwOnlinePlayerCount", PacketBase.TYPE_DWORD);
            this.addProperty("dwGuildPlayerCount", PacketBase.TYPE_DWORD);
            this.addProperty("szMasterNamep", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty("dwGuildLevel", PacketBase.TYPE_DWORD);
            if (data) {
                data.pos += this.read(data);
            }
        }
    }
    export class stGuildMemberBase extends PacketBase {
        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty('dwUserOnlyId', PacketBase.TYPE_DOUBLE);				//角色唯一ID
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);							//名称
            this.addProperty('szAliaName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);						//别名
            this.addProperty('dwGuildId', PacketBase.TYPE_DWORD);					//行会id	
            this.addProperty('tInTime', PacketBase.TYPE_DWORD);						//加入氏族时间
            this.addProperty("dwGuildPowerLvl", PacketBase.TYPE_DWORD);		//职位等级
            if (data) data.pos += this.read(data);
        }
    }


    export class stSingleGuildMemberInfoBase extends PacketBase {
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty("szName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty("btJob", PacketBase.TYPE_BYTE);
            this.addProperty("btSex", PacketBase.TYPE_BYTE);
            this.addProperty("dwLevel", PacketBase.TYPE_DWORD);
            this.addProperty("dwGuildPowerLvl", PacketBase.TYPE_DWORD);
            this.addProperty("szAliaName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty("dwDayGuildDedication", PacketBase.TYPE_DWORD);
            this.addProperty("dwGuildDedication", PacketBase.TYPE_DWORD);//贡献度
            this.addProperty("dwFightNum", PacketBase.TYPE_DWORD);//战斗力
            this.addProperty("dwRank", PacketBase.TYPE_DWORD);//个人信息
            this.addProperty("boOnline", PacketBase.TYPE_BOOL);

            this.addProperty("btPlatForm", PacketBase.TYPE_BYTE);//平台类型
            this.addProperty("btTxYellowType", PacketBase.TYPE_BYTE);//黄钻类型 1黄钻,2年黄钻,3豪华黄钻
            this.addProperty("btTxYellowLevel", PacketBase.TYPE_BYTE);//黄钻等级
            this.addProperty("btLevel3366", PacketBase.TYPE_BYTE);//3366等级
            this.addProperty("btTxBlueType", PacketBase.TYPE_BYTE);//蓝钻类型 1蓝钻,2年蓝钻,3豪华蓝钻
            this.addProperty("btTxBlueLevel", PacketBase.TYPE_BYTE);//蓝钻等级
            this.addProperty("btTxQQVipType", PacketBase.TYPE_BYTE);//QQ会员类型 1会员,2年会员,3豪华会员
            this.addProperty("btTxQQVipLevel", PacketBase.TYPE_BYTE);//QQ会员等级
            if (data) {
                data.pos += this.read(data);
            }
        }
    }


    export class stGuildMemberExtenBase extends PacketBase {
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwUserOnlyId', PacketBase.TYPE_DOUBLE);				//角色唯一ID
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);							//名称
            this.addProperty('szAliaName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);						//别名
            this.addProperty('dwGuildId', PacketBase.TYPE_DWORD);					//行会id	
            this.addProperty('tInTime', PacketBase.TYPE_DWORD);						//加入氏族时间
            this.addProperty("dwGuildPowerLvl", PacketBase.TYPE_DWORD);		//职位等级
            this.addProperty("dwRank", PacketBase.TYPE_DWORD);                    //会内排名
            this.addProperty("btJob", PacketBase.TYPE_BYTE);
            this.addProperty("btSex", PacketBase.TYPE_BYTE);
            if (data) data.pos += this.read(data);
        }
    }

    export class stVoterBase extends PacketBase {
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty("szName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty("btVote", PacketBase.TYPE_BYTE);
            if (data) {
                data.pos += this.read(data);
            }
        }
    }

    /**
	 * 班级成员信息
	 * */
    export class stStudentInfoBase extends PacketBase {
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty("dwOnlyId", PacketBase.TYPE_DOUBLE);
            this.addProperty("szName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty("boOnline", PacketBase.TYPE_BOOL);
            this.addProperty("btSex", PacketBase.TYPE_BYTE);
            this.addProperty("btJob", PacketBase.TYPE_BYTE);
            this.addProperty("dwLevel", PacketBase.TYPE_DWORD);
            if (data) {
                data.pos += this.read(data);
            }
        }
    }

    export class stGreenGuildJobJoinConfig extends PacketBase {
        public btJob: number = 0;
        public dwAllowPlayerLvl: number = 0;
        public dwAllowJoinCount: number = 0;
        public dwPlayerCount: number = 0;
        public btAllowType: number = 0;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty("btJob", PacketBase.TYPE_BYTE);//职业
            this.addProperty("dwAllowPlayerLvl", PacketBase.TYPE_DWORD);//要求等级
            this.addProperty("dwAllowJoinCount", PacketBase.TYPE_DWORD);//允许加入数量
            this.addProperty("dwPlayerCount", PacketBase.TYPE_DWORD);//已招收当前职业人数
            this.addProperty("btAllowType", PacketBase.TYPE_BYTE);//审批模式
            if (data) data.pos += this.read(data);
        }

        public read(data: Laya.Byte): number {
            var npos: number = super.read(data);
            this.btJob = this.getValue("btJob");
            this.dwAllowPlayerLvl = this.getValue("dwAllowPlayerLvl");

            this.dwAllowJoinCount = this.getValue("dwAllowJoinCount");
            this.dwPlayerCount = this.getValue("dwPlayerCount");
            this.btAllowType = this.getValue("btAllowType");
            return npos;
        }
    }

    export class stGuildEventDB extends PacketBase {
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwGuildID', PacketBase.TYPE_DWORD);
            this.addProperty('dwTime', PacketBase.TYPE_DWORD);
            this.addProperty('szEvents', PacketBase.TYPE_STRING, 512);
            if (data) data.pos += this.read(data);
        }
    }

    export class stMemberLvlConfigBase extends PacketBase {
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('szLvvName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//
            this.addProperty('dwAuthority', PacketBase.TYPE_INT);//
            if (data) data.pos += this.read(data);
        }
    }

    export class stWarGuildBase extends PacketBase {
        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty("dwWarGuildId", PacketBase.TYPE_DWORD);
            this.addProperty("szWarGuildName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty("tWarOverTime", PacketBase.TYPE_DWORD);
            this.addProperty("tWarRemainTime", PacketBase.TYPE_DWORD);
            this.addProperty("dwKillNum", PacketBase.TYPE_DWORD);
            this.addProperty("dwDieNum", PacketBase.TYPE_DWORD);
            if (data) data.pos += this.read(data);

        }
    }
    export class stClientGuildInfo extends PacketBase {
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty('dwLevel', PacketBase.TYPE_DWORD);
            this.addProperty('szGuildMasterName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty('dwGuildMasterOnlyId', PacketBase.TYPE_DOUBLE);
            this.addProperty('dwOnlinePlayerCount', PacketBase.TYPE_DWORD);
            this.addProperty('dwPlayerCount', PacketBase.TYPE_DWORD);
            this.addProperty('dwOnlinMasterOnlyid', PacketBase.TYPE_DOUBLE);

            this.addProperty('nPlayerLevelSum', PacketBase.TYPE_DWORD);
            this.addProperty('nOnlinePlayerLevelSum', PacketBase.TYPE_DWORD);
            this.addProperty('nMaxMemberCount', PacketBase.TYPE_DWORD);
            if (data) data.pos += this.read(data);
        }
    }

    export class stClassDB extends PacketBase {
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty("szClassNotice", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty("CampId", PacketBase.TYPE_DWORD);
            this.addProperty("ClassId", PacketBase.TYPE_DWORD);
            if (data) {
                data.pos += this.read(data);
            }
        }
    }


    export class stGuildDB extends PacketBase {
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty("dwID", PacketBase.TYPE_DWORD);
            this.addProperty("szName", PacketBase.TYPE_STRING, 48);
            this.addProperty("dwLevel", PacketBase.TYPE_DWORD);
            this.addProperty("dwCurExp", PacketBase.TYPE_DWORD);
            this.addProperty("dwLevelUpExp", PacketBase.TYPE_DWORD);
            this.addProperty("i64StoreExp", PacketBase.TYPE_INT64);
            this.addProperty("dwShenTaLevel", PacketBase.TYPE_DWORD);
            this.addProperty("dwShenTaCurExp", PacketBase.TYPE_DWORD);
            this.addProperty("dwShenTaMaxExp", PacketBase.TYPE_DWORD);
            this.addProperty("dwMaxPlayerCount", PacketBase.TYPE_DWORD);
            this.addProperty("szNotice", PacketBase.TYPE_STRING, 512);
            this.addProperty("dwMasterOnlyId", PacketBase.TYPE_DOUBLE);
            this.addProperty("dwCreateTime", PacketBase.TYPE_DWORD);
            this.addProperty("dwWeekFieldBoss", PacketBase.TYPE_DWORD);
            this.addProperty("dwWeekGuildBoss", PacketBase.TYPE_DWORD);
            this.addProperty("dwJoinNeedLvl", PacketBase.TYPE_DWORD);
            this.addProperty("szJoinNotice", PacketBase.TYPE_STRING, 512);
            this.addProperty("szAliaNames", PacketBase.TYPE_STRING, 1024);
            if (data) {
                data.pos += this.read(data);
            }
        }
    }

    // export class stGuildMemberDB extends PacketBase
    // {
    // 	public constructor(data: Laya.Byte) {
    //         super();
    // 		this.addProperty('szName',PacketBase.TYPE_STRING,Packet._MAX_NAME_LEN);			//名称
    // 		this.addProperty('szAliaName',PacketBase.TYPE_STRING,Packet._MAX_NAME_LEN);	//别名
    // 		this.addProperty('dwGuildId',PacketBase.TYPE_DWORD);						//行会id
    // 		this.addProperty('dwUserOnlyId',PacketBase.TYPE_DOUBLE);							//角色唯一ID
    // 		this.addProperty('tInTime',PacketBase.TYPE_DWORD);			//加入氏族时间
    // 		this.addProperty('tLoginOutTime',PacketBase.TYPE_DWORD);	//上次下线时间
    // 		this.addProperty('dwPositionLvl',PacketBase.TYPE_DWORD);				//职位等级
    // 		if (data) data.pos += this.read(data);
    // 	}
    // }
    // 	export class stGuildNameMsg  extends PacketBase
    // {
    // 	public  m_nGuildID:number = 0;
    // 	public  m_szGuildName:String = '';
    // 	public  m_cTitleNameArray:Array = [new Array];
    // 	public  stGuildNameMsg()
    // 	{

    // 	}

    // 	public  getTitleName(n:number):String{
    // 		return this.m_cTitleNameArray[n] as String;
    // 	}
    // }


    export class stGuildPower extends PacketBase {
        public szPowerName: String = '';
        public nPower: number = 0;
        public constructor() {
            super();
        }

        public change(szpname: String, np: number): void {
            this.szPowerName = szpname;
            this.nPower = np;
        }

    }

    export class stGuildRelation extends PacketBase {
        public constructor() {
            super();
            this.addProperty("szInterestGuild", PacketBase.TYPE_CHAR, 1024 * 8);
            this.addProperty("szAllianceGuild", PacketBase.TYPE_CHAR, 1024 * 8);
            this.addProperty("szHostilityGuild", PacketBase.TYPE_CHAR, 1024 * 8);
            this.addProperty("szFightGuild", PacketBase.TYPE_CHAR, 1024 * 8);
        }
    }

    export class stStudentDB extends PacketBase {
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty("StudentOnlyId", PacketBase.TYPE_DOUBLE);
            this.addProperty("CampId", PacketBase.TYPE_DWORD);
            this.addProperty("ClassId", PacketBase.TYPE_DWORD);
            this.addProperty("BoLeader", PacketBase.TYPE_BOOL);
            this.addProperty("ClassNumber", PacketBase.TYPE_DWORD);
            if (data) {
                data.pos += this.read(data);
            }
        }
    }


    // ******************************************邮件*****************************
    // 	
    //邮件详细信息
    export class stMailDetail extends PacketBase {
		/*
		   DWORD dwMailID;
		   DWORD dwSenderID;
		   DWORD dwReceiverID;
		   char szSenderName[_MAX_NAME_LEN_];
		   char szReceiverName[_MAX_NAME_LEN_];
		   time_t tSendTime;
		   char szTitle[_MAX_MAIL_TITLE_LEN];
		   char szNotice[_MAX_MAILNOTICE_LEN];
		   bool boRead;
		   DWORD dwGold;
		   WORD wReveivedItem;
		   bool boSystem;
		   bool boPaid;
		   stZeroArray<stItem> ItemArr;
		 */
        public items: Array<ItemBase> = [];
        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty('dwMailID', PacketBase.TYPE_DWORD);
            this.addProperty('dwSenderID', PacketBase.TYPE_DOUBLE);
            this.addProperty('dwReceiverID', PacketBase.TYPE_DOUBLE);
            this.addProperty('szSenderName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty('szReceiverName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty('tSendTime', PacketBase.TYPE_DWORD);
            this.addProperty('szTitle', PacketBase.TYPE_STRING, 64);
            this.addProperty('szNotice', PacketBase.TYPE_STRING, 512);
            this.addProperty('boRead', PacketBase.TYPE_BOOL);
            this.addProperty('btGoldType', PacketBase.TYPE_BYTE);
            this.addProperty('dwGold', PacketBase.TYPE_DWORD);
            this.addProperty('wReveivedItem', PacketBase.TYPE_WORD);
            this.addProperty('boSystem', PacketBase.TYPE_BOOL);
            this.addProperty('boPaid', PacketBase.TYPE_BOOL);
            this.addProperty('boReturn', PacketBase.TYPE_BOOL);
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

    //邮件摘要 
    export class stMailSummary extends PacketBase {

		/*
		   DWORD dwMailID;        //不需显示,客户端操作时候需填写的
		   char szSenderName[_MAX_NAME_LEN_];//发件人
		   char szTitle[_MAX_MAIL_TITLE_LEN];//发件人
		   bool boRead; //是否已读取
		   bool boAccessory; //是否有附件
		   time_t tSendTime; //发送时间
		   bool boSystem;
		 */

        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty('dwMailID', PacketBase.TYPE_DWORD);
            this.addProperty('szSenderName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty('szTitle', PacketBase.TYPE_STRING, 64);
            this.addProperty('boRead', PacketBase.TYPE_BOOL);
            this.addProperty('boAccessory', PacketBase.TYPE_BOOL);
            this.addProperty('boPaid', PacketBase.TYPE_BOOL);
            this.addProperty('tSendTime', PacketBase.TYPE_DWORD);
            this.addProperty('boSystem', PacketBase.TYPE_BOOL);
            if (data) data.pos += this.read(data);
        }

        public get boRead(): number {
            return this.getValue("boRead");
        }
        public get sendTime(): number {
            return this.getValue("tSendTime");
        }
        public get szTitle(): string {
            return this.getValue("szTitle");
        }


    }
    export class stToClientItemAndCountBase extends PacketBase {
        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty('szItemName', PacketBase.TYPE_STRING, 24);
            this.addProperty('nCount', PacketBase.TYPE_INT);
            if (data) {
                data.pos += this.read(data);
            }
        }
    }


    export class stFindYiJianResultBase extends PacketBase {
        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty('_int64', PacketBase.TYPE_INT64);
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//名字
            this.addProperty('dwLevel', PacketBase.TYPE_DWORD);  //等级
            this.addProperty('btSex', PacketBase.TYPE_BYTE); //性别
            this.addProperty('btJob', PacketBase.TYPE_BYTE);	//职业
            if (data) {
                data.pos += this.read(data);
            }
        }
    }


    export class stRelationInfoBase extends PacketBase {
        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty('dwOnlyId', PacketBase.TYPE_INT64);					//唯一ID
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);	//名字
            this.addProperty('fuchou', PacketBase.TYPE_INT);   //复仇
            this.addProperty('Killed', PacketBase.TYPE_INT);   //被杀
            this.addProperty('tAddTime', PacketBase.TYPE_DWORD);
            this.addProperty('nRelationDegree', PacketBase.TYPE_INT);//关系度，正数为友好值，负数为仇恨值
            this.addProperty('dwLevel', PacketBase.TYPE_DWORD);					//等级
            this.addProperty('btSex', PacketBase.TYPE_BYTE);//							//性别
            this.addProperty('btJob', PacketBase.TYPE_BYTE);//职业
            this.addProperty('btState', PacketBase.TYPE_BYTE);//					//状态 1 在线 0 离线
            this.addProperty('tOfflineTime', PacketBase.TYPE_DWORD);		//离线时间
            this.addProperty('btLocationState', PacketBase.TYPE_BYTE);     //是否显示位置
            this.addProperty('mapname', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//所在地图

            this.addProperty("btPlatForm", PacketBase.TYPE_BYTE);//平台类型
            this.addProperty("btTxYellowType", PacketBase.TYPE_BYTE);//黄钻类型 1黄钻,2年黄钻,3豪华黄钻
            this.addProperty("btTxYellowLevel", PacketBase.TYPE_BYTE);//黄钻等级
            this.addProperty("btLevel3366", PacketBase.TYPE_BYTE);//3366等级
            this.addProperty("btTxBlueType", PacketBase.TYPE_BYTE);//蓝钻类型 1蓝钻,2年蓝钻,3豪华蓝钻
            this.addProperty("btTxBlueLevel", PacketBase.TYPE_BYTE);//蓝钻等级
            this.addProperty("btTxQQVipType", PacketBase.TYPE_BYTE);//QQ会员类型 1会员,2年会员,3豪华会员
            this.addProperty("btTxQQVipLevel", PacketBase.TYPE_BYTE);//QQ会员等级
            this.addProperty('guildname', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//行会名
            if (data) {
                data.pos += this.read(data);
            }
        }
        public get state(): number {
            return this.getValue("btState");
        }
        public get level(): number {
            return this.getValue("dwLevel");
        }

        public get playerName(): String {
            return this.getValue("szName");
        }

        public get guildName(): String {
            return this.getValue("guildname");
        }

        public get job(): number {
            return this.getValue("btJob");
        }

        public get sex(): number {
            return this.getValue("btSex");
        }

        public get onlyId(): Number {
            return this.getValue("dwOnlyId");
        }
    }

    export class stFindResultBase extends PacketBase {
        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty('dwOnlyId', PacketBase.TYPE_DOUBLE);
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//名字
            this.addProperty('dwLevel', PacketBase.TYPE_DWORD);  //等级
            this.addProperty('btSex', PacketBase.TYPE_BYTE); //性别
            this.addProperty('btJob', PacketBase.TYPE_BYTE);	//职业
            this.addProperty("btPlatForm", PacketBase.TYPE_BYTE);//平台类型
            this.addProperty("btTxYellowType", PacketBase.TYPE_BYTE);//黄钻类型 1黄钻,2年黄钻,3豪华黄钻
            this.addProperty("btTxYellowLevel", PacketBase.TYPE_BYTE);//黄钻等级
            this.addProperty("btLevel3366", PacketBase.TYPE_BYTE);//3366等级
            this.addProperty("btTxBlueType", PacketBase.TYPE_BYTE);//蓝钻类型 1蓝钻,2年蓝钻,3豪华蓝钻
            this.addProperty("btTxBlueLevel", PacketBase.TYPE_BYTE);//蓝钻等级
            this.addProperty("btTxQQVipType", PacketBase.TYPE_BYTE);//QQ会员类型 1会员,2年会员,3豪华会员
            this.addProperty("btTxQQVipLevel", PacketBase.TYPE_BYTE);//QQ会员等级
            if (data) {
                data.pos += this.read(data);
            }
        }
    }
}