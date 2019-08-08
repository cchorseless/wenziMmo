module ProtoCmd {
    // 0x0239
    // 聊天消息
    export class CretChat extends Packet {
        public static msgID: number = 0x0239;
        public chatMsg: string = "";
        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty('dwZoneid', PacketBase.TYPE_DWORD);
            this.addProperty('btChatType', PacketBase.TYPE_BYTE);       //btChatType BYTE  1  聊天类型
            this.addProperty('btCountryInfoId', PacketBase.TYPE_BYTE);  //  1  国家类型   
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//  发起人名称  
            this.addProperty('dwSrcOnlyId', PacketBase.TYPE_INT64);     //  目标名称  
            this.addProperty('szTargetName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//  目标名称  
            this.addProperty('dwDestOnlyId', PacketBase.TYPE_INT64);    //  目标名称  

            this.addProperty('dwSendTime', PacketBase.TYPE_INT);    //发送时间
            this.addProperty('boBanner', PacketBase.TYPE_BOOL);     //是否横幅
            this.addProperty('dwVip', PacketBase.TYPE_DWORD);       //VIP等级
            this.addProperty('dwGuildId', PacketBase.TYPE_DWORD);

            this.addProperty('btPlatForm', PacketBase.TYPE_BYTE);       //平台类型
            this.addProperty('btTxYellowType', PacketBase.TYPE_BYTE);   //黄钻类型 1黄钻,2年黄钻,3豪华黄钻
            this.addProperty('btTxYellowLevel', PacketBase.TYPE_BYTE);  //黄钻等级.
            this.addProperty('btLevel3366', PacketBase.TYPE_BYTE);      //3366等级
            this.addProperty('btTxBlueType', PacketBase.TYPE_BYTE);//蓝钻类型 1蓝钻,2年蓝钻,3豪华蓝钻
            this.addProperty('btTxBlueLevel', PacketBase.TYPE_BYTE);//蓝钻等级
            this.addProperty('btTxQQVipType', PacketBase.TYPE_BYTE);//QQ会员类型 1会员,2年会员,3豪华会员
            this.addProperty('btTxQQVipLevel', PacketBase.TYPE_BYTE);//QQ会员等级
            this.addProperty('nSize', PacketBase.TYPE_INT);
            this.cmd = CretChat.msgID;
            if (data != null) {
                this.read(data);
            }
        }

        public read(data: Laya.Byte): number {
            if (data) {
                data.pos += super.read(data);
                var nSize: number = this.getValue('nSize');
                this.chatMsg = data.readUTFBytes(nSize);
                return data.length
            }
            return 0;
        }

        public setString(s: string): CretChat {
            GameApp.GameEngine.packetBytes.clear();
            GameApp.GameEngine.packetBytes.pos = 0;
            GameApp.GameEngine.packetBytes.writeUTFBytes(s);
            this.addProperty('str', Packet.TYPE_STRING, GameApp.GameEngine.packetBytes.length + 1);
            this.setValue('nSize', GameApp.GameEngine.packetBytes.length + 1);
            this.setValue('str', s);
            return this;
        }

    }
    //0x0288
    /***************************************信息通知Tips*********************************** */
    export class TipMsg extends Packet {
        public static msgID: number = 0x0288;
        public tipmsg: string = "";
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty("posx", PacketBase.TYPE_INT);//客户端屏幕坐标
            this.addProperty("posy", PacketBase.TYPE_INT);//
            this.addProperty('nSize', PacketBase.TYPE_DWORD);
            this.read(data);
        }
        public read(data: Laya.Byte): number {
            if (data) {
                data.pos += super.read(data);
                var nSize: number = this.getValue('nSize');
                this.tipmsg = data.readUTFBytes(nSize);
                return data.length
            }
            return 0;
        }
    }


}