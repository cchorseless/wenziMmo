// TypeScript file
class Packet extends PacketBase {
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

    public static ReadPackCmd(data: Laya.Byte, fix:string): number {
        var pos: number = data.pos;
        var cmd: number = data.getUint8();
        var subcmd: number = data.getUint8();
        if (cmd < 0) cmd += 256;
        if (subcmd < 0) subcmd += 256;
        var msgID: number = cmd << 8 | subcmd;
        data.pos = pos;
        Log.trace(fix + "：" + msgID + "[" + this.printcmd(msgID) + " ]");
        //App.GameEngine.outputConsoleLog(fix + "：" + msgID + "[" + this.printcmd(msgID) + " ]");
        return msgID;
    }

    public send(): void {
        this._bytes.pos = 0;
        if (App.Socket == null)
            return;
        if (false && this._bytes.length >= 64) {
            //_compress
        }
        else {
            Packet.ReadPackCmd(this._bytes, "send");

            App.Socket.send(this._bytes);
        }
    }
}