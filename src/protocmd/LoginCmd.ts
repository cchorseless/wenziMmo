// TypeScript file

//***************************************心跳包
class CheckSignalCmd extends Packet {
    public static msgID: number = 0xFFFE;
    public constructor(data: Laya.Byte) {
        super();
        this.addProperty('isneedACK', PacketBase.TYPE_BYTE);
        this.addProperty('checknum', PacketBase.TYPE_BYTE);
        this.read(data);
    }
}

class CheckSignalCmdRet extends Packet {
    //服务器返回的包类型
    public cbPacket = CheckSignalCmd;
    public constructor() {
        super();
        this.cmd = 0xFFFE;
        this.addProperty('isneedACK', PacketBase.TYPE_BYTE);
        this.addProperty('checknum', PacketBase.TYPE_BYTE);
        this.setValue('isneedACK', 1);
    }
}
// ************************************************

// ********************************登陆验证
//登录前验证
class UserPreLogin extends Packet {
    //服务器返回的包类型
    public cbPacket = UserRetPreLogin;
    public constructor() {
        super();
        this.cmd = 0x0101;
        this.addProperty('checkcode', PacketBase.TYPE_DWORD);//验证码
        this.addProperty('clientver', PacketBase.TYPE_DWORD);//客户端版本号
        this.setValue('checkcode', 0x55884433);
        this.setValue('clientver', 0);
    }
}
//登录前验证返回
class UserRetPreLogin extends Packet {
    public static msgID: number = 0x0102;
    public constructor(data: Laya.Byte) {
        super();
        this.addProperty('clientver', PacketBase.TYPE_DWORD);//客户端版本号
        this.addProperty('passkey', PacketBase.TYPE_BYTES, 8);//服务器生成的验证key
        this.addProperty('encodetype', PacketBase.TYPE_INT);//加密类型
        this.addProperty('key', PacketBase.TYPE_BYTES, 16);//验证key
        this.read(data);
    }
}

//**************************************************

//********************************登陆 */
class UserLogin extends Packet {
    //服务器返回的包类型
    public cbPacket = UserLoginRet;
    public constructor() {
        super();
        this.cmd = 0x0103;
        this.addProperty('queryhistory', PacketBase.TYPE_BYTE);//   ==0 正常登陆游戏 ==1只是查询账号登陆历史，不是登陆游戏，返回登录历史和相关昵称信息后就可以断开连接  
        this.addProperty('tokenlogin', PacketBase.TYPE_BYTE);//   ==0 正常登陆游戏 ==1运营商发放令牌登陆  
        this.addProperty('force_login', PacketBase.TYPE_BYTE);//   ==0 正常登陆游戏 ==1强制登陆(踢人)  
        this.addProperty('reserva3', PacketBase.TYPE_BYTE);//  保留，暂时无用  
        this.addProperty('ip_type', PacketBase.TYPE_BYTE);//  255 IP类型  
        this.addProperty('fclientver', PacketBase.TYPE_FLOAT);//   客户端版本号，浮点数  
        this.addProperty('szMac', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//11.17号
        this.addProperty('szAccount', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//  账号名  
        this.addProperty('szAccountDis', PacketBase.TYPE_STRING, 16);//账号描述
        this.addProperty('szADUrl', PacketBase.TYPE_STRING, 64);
        this.addProperty('dwZoneid', PacketBase.TYPE_DWORD);//区ID
        this.addProperty('dwTrueZoneid', PacketBase.TYPE_DWORD);//真实区ID

    }
}
//登录
class NormalUserLogin extends UserLogin {
    public constructor() {
        super();
        this.addProperty('szPassMd5', PacketBase.TYPE_BYTES, 16);//Md5加密的密码
        this.addProperty('dwPassCrc32', PacketBase.TYPE_INT);//crc32校验密码值
        this.addProperty('isSaveEncodePass', PacketBase.TYPE_BOOL);//无用
    }
}
//登录返回
class UserLoginRet extends Packet {
    public static msgID: number = 0x0104;
    public players: Array<SelectPlayerInfo> = new Array();
    public count: number = 0;
    public constructor(data: Laya.Byte) {
        super();
        this.addProperty('nErrorCode', PacketBase.TYPE_INT);// 4  错误标示，0成功，非0标示出错  
        this.addProperty('loginsvr_id_type', PacketBase.TYPE_INT); //登陆服务器ID  
        this.addProperty('fsvrver', PacketBase.TYPE_FLOAT);//  服务器版本号，浮点数  
        this.addProperty('nSvrZoneid', PacketBase.TYPE_WORD); //2  区号  
        this.addProperty('nSvrIndex', PacketBase.TYPE_WORD); //2  服号 预留  
        this.addProperty('nFaction', PacketBase.TYPE_WORD); //2  人数较少的阵营  
        this.addProperty('nCountry', PacketBase.TYPE_WORD); //审核服，区分加载的资源
        this.addProperty('LastPlayer', PacketBase.TYPE_INT); // 4  上次玩家选择几个玩家  
        this.addProperty('Playercount', PacketBase.TYPE_INT);//4  角色数  
        this.read(data);
    }

    public read(data: Laya.Byte): number {
        data.pos = super.read(data);
        this.count = this.getValue('Playercount');
        if (this.count > 0) {
            for (let i: number = 0; i < this.count; ++i) {
                this.players[i] = new SelectPlayerInfo(data);
            }
        }
        return 0;
    }

    public clear(): void {
        super.clear();
        for (let i: number = 0; i < this.players.length; ++i) {
            this.players[i].clear();
            this.players[i] = null;
        }
        this.players.length = 0;
        this.players = null;
    }
}
//************************************************ */
//暂时用不到
class TradeUserLogin extends UserLogin {
    public constructor() {
        super();
        this.addProperty('dwTradeID', PacketBase.TYPE_DWORD);//平台编号,5ding=0,360=1  
        this.addProperty('tokencheck', PacketBase.TYPE_DWORD);// 校验参数，客户端PHP生成，和平台无关  
        this.addProperty('checkParam1', PacketBase.TYPE_STRING, 48);// 平台参数1，5ding和360都是时间 t  
        this.addProperty('szPassMd5Str', PacketBase.TYPE_STRING, 48);//  平台结果校验参数,按照平台提供的KEY和算法最终生成的MD5值 p  
        this.addProperty('checkParam2', PacketBase.TYPE_STRING, 48);// 平台参数2，5ding没有,360是服务器ID  
        this.addProperty('paytoken', PacketBase.TYPE_STRING, 256);           //购买token，客户端定时刷新
        this.addProperty('nplatform', PacketBase.TYPE_INT);                        //weixin：1 qq：2
        this.addProperty('nZoneId', PacketBase.TYPE_INT);  //当前服务器id（对玩家zoneid）
        this.addProperty('ClientVersion', PacketBase.TYPE_STRING, 48);//客户端版本  
        this.addProperty('Txinvkey', PacketBase.TYPE_STRING, 48);
        this.addProperty('Txitime', PacketBase.TYPE_STRING, 48);
        this.addProperty('Txiopenid', PacketBase.TYPE_STRING, 48);
        this.addProperty('szCustomData', PacketBase.TYPE_STRING, 2048);
    }
}
//*********************************验证后登陆 */
class UserRealLogin extends Packet {
    public cbPacket = UserRealLoginRet;
    public constructor() {
        super();
        this.cmd = 0x0105;
        this.addProperty('loginsvr_id_type', PacketBase.TYPE_INT);//账号服务器ID
        this.addProperty('tokencheck', PacketBase.TYPE_DWORD);//校验码
        this.addProperty('ip_type', PacketBase.TYPE_BYTE);//
        this.addProperty('fclientver', PacketBase.TYPE_FLOAT);
        this.addProperty('logintoken', PacketBase.TYPE_BYTES, 24);//校验码
        this.addProperty('gamesvr_id_type', PacketBase.TYPE_INT);//游戏服务器ID
        this.addProperty('btReloginType', PacketBase.TYPE_BYTE);//登录类型
        this.addProperty('szAccount', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//账号
        this.addProperty('szPlayerName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//角色名
        this.addProperty('szTxSubPlatformName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//平台名
        this.addProperty('szMac', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
        this.addProperty('dwUserOnlyId', PacketBase.TYPE_INT64);//角色唯一ID
        this.addProperty('btmapsubline', PacketBase.TYPE_BYTE); //游戏分线
        this.addProperty('dwTrueZoneid', PacketBase.TYPE_DWORD); //游戏分线
        this.addProperty("szLoginChannel", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//平台,用于后端区分
    }
}
class UserRealLoginRet extends Packet {
    public static msgID: number = 0x0106;
    public constructor(data: Laya.Byte) {
        super();
        this.addProperty('nErrorCode', PacketBase.TYPE_INT);//错误标示，0成功，非0标示出错  
        this.addProperty('fsvrver', PacketBase.TYPE_FLOAT);//服务器版本号，浮点数  
        this.addProperty('nSvrZoneid', PacketBase.TYPE_WORD);//区号  
        this.addProperty('nSvrIndex', PacketBase.TYPE_WORD); //WORD 2  服号 预留  
        this.addProperty('nFaction', PacketBase.TYPE_WORD); //WORD 2  人数较少的阵营  
        this.addProperty('nCountry', PacketBase.TYPE_WORD); //WORD 2  人数较少的国家 预留 暂时没用  
        this.addProperty('encodetype', PacketBase.TYPE_INT);// int 4  加密算法标示  
        this.addProperty('m_key', PacketBase.TYPE_BYTES, 16);// BYTES 16  加密算法密钥，4个DWORD  
        this.read(data);
    }
}
//*************************************************** */
//********************************选角创角** */
//0x0107
class SelectPlayer extends Packet {
    public cbPacket = SelectPlayerRet;
    public constructor() {
        super();
        this.cmd = 0x0107;
        this.addProperty('nselectidx', PacketBase.TYPE_INT);//选择第几个角色
        this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//选择角色的角色名
        this.addProperty('btmapsubline', PacketBase.TYPE_BYTE);
    }
}

//0x0108
class SelectPlayerRet extends Packet {
    public static msgID: number = 0x0108;
    public constructor(data: Laya.Byte) {
        super();
        this.addProperty('nErrorCode', PacketBase.TYPE_INT);// int 4  错误标示，0成功，非0标示出错  
        this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN) // 人物的名字  
        this.addProperty('ip', PacketBase.TYPE_BYTES, 4);//  IP地址  
        this.addProperty('port', PacketBase.TYPE_WORD);  //端口  
        this.addProperty('mapid', PacketBase.TYPE_INT);  //地图编号  
        this.addProperty('gamesvr_id_type', PacketBase.TYPE_INT);  //游戏服务器ID  
        this.addProperty('dwUserOnlyId', PacketBase.TYPE_INT64);
        this.addProperty('btmapsubline', PacketBase.TYPE_BYTE);
        this.addProperty('szTGWip', PacketBase.TYPE_STRING, 260) // 人物的名字  
        this.read(data);
    }
}
//****************************************** */

//********************************更新本地token */
//0x0109
class UpdateToken extends Packet {
    public static msgID: number = 0x0109;
    public constructor(data: Laya.Byte) {
        super();
        this.addProperty('tokencheck', PacketBase.TYPE_DWORD);
        this.addProperty('logintoken', PacketBase.TYPE_BYTES, 24);
        this.read(data);
    }
}
//***********************************创建角色* */
//0x012C
class CreatePlayer extends Packet {
    public cbPacket = CreatePlayerRet;
    public static msgID: number = 0x012C;
    public playerinfo: SelectPlayerInfo = new SelectPlayerInfo(null);
    public constructor() {
        super();
        this.cmd = CreatePlayer.msgID;
        this.addProperty('szCountry', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
        this.addProperty('szAccount', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
        this.addProperty('playerinfo', PacketBase.TYPE_BYTES, this.playerinfo.size(), this.playerinfo);
    }
}

//0x012D
class CreatePlayerRet extends Packet {
    public static msgID: number = 0x012D;
    public constructor(data: Laya.Byte) {
        super();
        this.addProperty('errorcode', PacketBase.TYPE_BYTE);
        this.addProperty('szPlayerName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
        this.addProperty('szAccount', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
        this.addProperty('dwUserOnlyId', PacketBase.TYPE_BYTES, 8);
        this.read(data);
    }
}