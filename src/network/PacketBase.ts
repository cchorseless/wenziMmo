// TypeScript file

class PacketBase {
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

    protected _list: any = {};
    protected _posList: any[];
    protected _bytes: Laya.Byte = null;
    protected _returnBytes: Laya.Byte = null;

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
            this._returnBytes.endian =  Laya.Byte.LITTLE_ENDIAN;
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

    public clone(s: Laya.Byte, len: number = 0): void {
        if (!s) {
            return;
        }
        this._bytes.pos = 0;
        if (len == 0)
            len = s.length;

        this._bytes.writeArrayBuffer(s, s.pos, len);

        var sub: PacketBase = this;
        var parent: PacketBase = this._parentStruct;
        var offset: number = this._offsetinparentStruct;

        while (parent && sub) {
            sub._bytes.pos = 0;
            parent._bytes.pos = offset;
            parent._bytes.writeArrayBuffer(sub._bytes, sub._bytes.pos, sub._bytes.length);

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
                        // let buf = value as Laya.Byte;
                        // this._bytes.writeArrayBuffer(value, buf.pos, 8);

                        // if (value != null) {
                        //     let ba = new Object(value);
                        //     let ndatalen: number = Math.min(8, ba.si);
                        //     ba.pos = 0;
                        //     this._bytes.writeArrayBuffer(value, 0, ndatalen);
                        //     for (i = ndatalen; i < len; i++) {
                        //         this._bytes.writeByte(0);
                        //     }
                        // }

                        // let l = value & 0x00000000ffffffff;
                        // let h = (value & 0xffffffff00000000) >> 32;
                        // this._bytes.writeByte(l & 0xff);
                        // this._bytes.writeByte((l & 0xff00) >> 8);
                        // this._bytes.writeByte((l & 0xff0000) >> 16);
                        // this._bytes.writeByte((l & 0xff000000) >> 24);

                        // this._bytes.writeByte(h & 0xff);
                        // this._bytes.writeByte((h & 0xff00) >> 8);
                        // this._bytes.writeByte((h & 0xff0000) >> 16);
                        // this._bytes.writeByte((h & 0xff000000) >> 24);

                        // this._bytes.writeByte(value & 0xff);
                        // this._bytes.writeByte((value & 0xff00) >> 8);
                        // this._bytes.writeByte((value & 0xff0000) >> 16);
                        // this._bytes.writeByte((value & 0xff000000) >> 24);

                        // this._bytes.writeByte((value & 0xff00000000) >> 32);
                        // this._bytes.writeByte((value & 0xff0000000000) >> 40);
                        // this._bytes.writeByte((value & 0xff000000000000) >> 48);
                        // this._bytes.writeByte((value & 0xff00000000000000) >> 56);
                        this._bytes.writeArrayBuffer(value.data, 0, 8);
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
                            var ba: Laya.Byte = value;
                            var ndatalen: number = Math.min(len, ba.length);
                            //ba.pos = 0;
                            this._bytes.writeArrayBuffer(value, 0, ndatalen);
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
                parent._bytes.writeArrayBuffer(sub._bytes, 0, sub._bytes.length);
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
                    var n: number = this._bytes.readUnsignedByte();
                    if (n < 0) n += 256;
                    return n;
                }
            case PacketBase.TYPE_BYTE:

                {
                    return this._bytes.getByte();
                }
            case PacketBase.TYPE_BOOL:
                {
                    return this._bytes.readBoolean();
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

                    // this.returnBytes.clear();
                    // this.returnBytes.pos = 0;

                    // this._bytes.readBytes(this.returnBytes, 0, 8);

                    // let num: number = 0;
                    // let nk: number = 0;
                    // for (let i = 0; i < 8; i++) {
                    //     nk = this.returnBytes.readUnsignedByte();
                    //     num = num + (nk * Math.pow(2, 8 * i));
                    // }

                    // if (nk & 0x80) {  //最高位是1
                    //     num = 18446744073709551616 - num + 1;
                    //     num = -num;
                    // }

                    return new Int64(this._bytes);
                }
            case PacketBase.TYPE_STRING:
                {
                    this.returnBytes.clear();
                    this.returnBytes.pos = 0;

                    this._bytes.readBytes(this.returnBytes, 0, len);
                    str = this.returnBytes.readUTFBytes(this.returnBytes.length);
                    this.returnBytes.clear();
                    return str;
                }
            case PacketBase.TYPE_BYTES:
                {
                    this.returnBytes.clear();
                    this._bytes.readBytes(this.returnBytes, 0, len);
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
        this._bytes.writeArrayBuffer(data, data.pos, Math.min(data.length, this._postion));

        var sub: PacketBase = this;
        var parent: PacketBase = this._parentStruct;
        var offset: number = this._offsetinparentStruct;
        while (parent && sub) {
            sub._bytes.pos = 0;
            parent._bytes.pos = offset;
            parent._bytes.writeArrayBuffer(sub._bytes, sub._bytes.pos, sub._bytes.length);

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