module ProtoCmd {

    // **************************************服务器扩展
    //0x0919 09-25
    export class QuestServerDataRet extends Packet {
        public static msgID: number = 0x0919;
        public str: string;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwDataType', PacketBase.TYPE_DWORD);//类型类型
            this.addProperty('nCount', PacketBase.TYPE_INT);
            this.read(data);
        }

        public read(data: Laya.Byte): number {
            data.pos += super.read(data);
            let nCount = this.getValue('nCount');
            this.str = data.readUTFBytes(nCount);
            return data.length;
        }
    }

    //0x091A 09-26
    //前端调用后端脚本函数
    export class QuestClientData extends Packet {
        public static msgID: number = 0x091A;
        public constructor() {
            super();
            this.addProperty('dwClientType', PacketBase.TYPE_DWORD);//无用
            this.addProperty("posx", PacketBase.TYPE_INT);//点击坐标
            this.addProperty("posy", PacketBase.TYPE_INT);
            this.addProperty('nSize', PacketBase.TYPE_INT);
            this.cmd = 0x091A;
        }

        /**
         * 发送协议包
         * @param funcName 调用函数名称
         * @param data 携带数据
         * @param key 回调函数上下文
         * @param cbfunc 回调函数
         */
        public setString(funcName: string, data: Array<any> = [], key = null, cbfunc: Function = null): QuestClientData {
            let s = funcName;
            // 有参数
            if (data && data.length != 0) {
                s += '(';
                for (let _data of data) {
                    s += ('' + _data) + ',';
                }
                s = s.substr(0, s.length - 1) + ')';
            }
            console.log(s);
            // 有回调
            if (key && cbfunc) {
                GameApp.LListener.once(funcName, key, cbfunc);
            }
            GameApp.GameEngine.packetBytes.clear();
            GameApp.GameEngine.packetBytes.writeUTFBytes(s);
            this.addProperty('str', Packet.TYPE_STRING, GameApp.GameEngine.packetBytes.length + 1);
            this.setValue('nSize', GameApp.GameEngine.packetBytes.length + 1);
            this.setValue('str', s);
            return this
        }

    }

    /*******************************************设置**************************************** */

    /**
     * 客户端设置
     */
    export class ClientSetData extends Packet {
        public static msgID: number = 0x02aa;
        public setData: string = "";
        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty('boNewHuman', PacketBase.TYPE_BOOL);
            this.addProperty('nSize', PacketBase.TYPE_INT);
            this.cmd = ClientSetData.msgID;
            if (data != null) {
                this.read(data);
            }
        }
        public read(data: Laya.Byte): number {
            if (data) {
                data.pos += super.read(data);
                var nSize: number = this.getValue('nSize');
                this.setData = data.readUTFBytes(nSize);
                return data.length
            }
            return 0;
        }

        public setString(s: string): ClientSetData {
            GameApp.GameEngine.packetBytes.clear();
            GameApp.GameEngine.packetBytes.pos = 0;
            GameApp.GameEngine.packetBytes.writeUTFBytes(s);
            this.addProperty('str', Packet.TYPE_STRING, GameApp.GameEngine.packetBytes.length + 1);
            this.setValue('nSize', GameApp.GameEngine.packetBytes.length + 1);
            this.setValue('str', s);
            return this
        }
    }

}