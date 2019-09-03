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
            GameApp.LListener.event(ProtoCmd.Packet.eventName(obj), obj.data);
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
        let compress = msg.getByte()
        let msgData = msg;
        if (compress != 0) {
            msgData = FunctionUtils.uncompress(msg)
        }
        let msgID = ProtoCmd.Packet.ReadPackCmd(msgData, 'recv')
        let bytes: Laya.Byte = new Laya.Byte();
        bytes.endian = Laya.Byte.LITTLE_ENDIAN;
        bytes.writeArrayBuffer(msgData.buffer, msgData.pos, msgData.length);
        bytes.pos = 0;
        var obj: any = {};
        obj.msgID = msgID;
        obj.data = bytes;
        msgData.clear();
        return obj;
    }
}