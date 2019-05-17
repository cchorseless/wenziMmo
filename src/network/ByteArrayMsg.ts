class ByteArrayMsg {
    private _msgBuffer: Laya.Byte;
    /**
     * 构造函数
     */
    public constructor() {
        this._msgBuffer = new Laya.Byte();
        this._msgBuffer.endian = Laya.Byte.LITTLE_ENDIAN;
    }

    /**
     * 接收消息处理
     * @param msg
     */
    public receive(msg: any): void {
        this._msgBuffer.clear();
        this._msgBuffer.writeArrayBuffer(msg);
        this._msgBuffer.pos = 0;
        var obj: any = this.decode(this._msgBuffer);
        if (obj) {
            App.LListener.event(Packet.msgIdToEventName(obj.msgID), obj.data);
            // App.MessageCenter.dispatch(obj.msgID, obj.data);
        }
    }

    /**
     * 发送消息处理
     * @param msg
     */
    public send(socket: Laya.Socket, msg: any): void {
        if (msg && socket) {
            msg.pos = 0;
            socket.send(msg.buffer);
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
        bytes.writeArrayBuffer(msg.buffer, 0, msg.length);
        bytes.pos = 0;
        var obj: any = {};
        obj.msgID = msgID;
        obj.data = bytes;
        msg.clear();
        return obj;
    }
}