/**
 * Created by yangsong on 15-2-11.
 */
class ByteArrayMsg implements BaseMsg {
    private _msgBuffer:Laya.Byte;
    /**
     * 构造函数
     */
    public constructor() {
    }

    /**
     * 接收消息处理
     * @param msg
     */
    public receive(data): void {
        var obj: any = this.decode(data);
        if (obj) {
            App.MessageCenter.dispatch(obj.msgID, obj.data);
        }
        //TODO double bytearray clear
        if (this._msgBuffer.bytesAvailable == 0) {
            this._msgBuffer.clear();
        }
    }

    /**
     * 发送消息处理
     * @param msg
     */
    public send(socket: Laya.Socket, msg: any): void {
        var obj: any = this.encode(msg);
        if (obj && socket) {
            obj.pos = 0;
            socket.output.writ(obj, 0, obj.bytesAvailable);
            socket.flush();
        }
    }

    /**
     * 消息解析
     * @param msg
     */
    public decode(msg: Laya.Byte): any {
        let msgID = Packet.ReadPackCmd(msg, 'recv')
        let bytes: Laya.Byte = new Laya.Byte();
        bytes.endian = Laya.Byte.LITTLE_ENDIAN;
        msg.writeArrayBuffer(bytes, 0, msg.length);
        var obj: any = {};
        obj.msgID = msgID;
        obj.data = bytes;
        msg.clear();
        return obj;
    }

    /**
     * 消息封装
     * @param msg
     */
    public encode(msg: any): any {
        //Log.trace("encode需要子类重写，根据项目的协议结构解析");
        return msg;
    }

    public readBytes
}