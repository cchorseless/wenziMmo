// TypeScript file


class FieldInfo {
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