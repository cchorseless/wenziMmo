// TypeScript file

//0x0201
class PlayerChangeMap extends Packet {
    public static msgID: number = 0x0201;
    public location: CretLocation = new CretLocation();
    public constructor(data: egret.ByteArray) {
        super();
        this.addProperty('location', PacketBase.TYPE_BYTES, this.location.size(), this.location);
        this.addProperty('dwTmpId', PacketBase.TYPE_INT);
        this.addProperty('dwMapFileID', PacketBase.TYPE_DWORD);//
        this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
        this.addProperty('szMapFileName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
        this.addProperty('dir', PacketBase.TYPE_BYTE);
        this.addProperty('light', PacketBase.TYPE_BYTE);
        this.addProperty('country', PacketBase.TYPE_BYTE);
        this.addProperty('factionid', PacketBase.TYPE_BYTE);
        this.addProperty('minimapidx', PacketBase.TYPE_INT);
        this.addProperty('szMapName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
        this.addProperty('mapsublineid', PacketBase.TYPE_BYTE);
        this.addProperty('lifestate', PacketBase.TYPE_BYTE);//
        this.addProperty('dwPlayerCreateTime', PacketBase.TYPE_DWORD);//
        this.read(data);
    }


    public clear(): void {
        super.clear();
        this.location = null;
    }
}

//0x0202
class MapCreateCret extends Packet {
    public static msgID: number = 0x0202;
    public location: CretLocation = new CretLocation();
    public feature: AnimalFeature = new AnimalFeature();

    public constructor(data: egret.ByteArray) {
        super();
        this.addProperty('location', PacketBase.TYPE_BYTES, this.location.size(), this.location);
        this.addProperty('dwTmpId', PacketBase.TYPE_INT);
        this.addProperty('szMasterName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
        this.addProperty('szShowName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
        this.addProperty('lifestate', PacketBase.TYPE_BYTE);
        this.addProperty('lvl', PacketBase.TYPE_WORD);
        this.addProperty('nNowHp', PacketBase.TYPE_INT);
        this.addProperty('nMaxHp', PacketBase.TYPE_INT);
        this.addProperty('nNowMp', PacketBase.TYPE_INT);
        this.addProperty('nMaxMp', PacketBase.TYPE_INT);
        this.addProperty("btDir", PacketBase.TYPE_BYTE);
        this.addProperty('feature', PacketBase.TYPE_BYTES, this.feature.size(), this.feature);
        this.addProperty("btType", PacketBase.TYPE_BYTE);////0:正常，1: 英雄, 2:道士宠物, 3:英雄道士宠物, 4:怪物归属, 5:怪物队伍归属
        this.read(data);
    }

    public clear(): void {
        super.clear();
        this.feature.clear();
        this.location.clear();
        this.feature = null;
        this.location = null;
    }
}

//0x0203
class MapRemoveCret extends Packet {
    public static msgID: number = 0x0203;

    public constructor(data: egret.ByteArray) {
        super();
        this.addProperty('dwTmpId', PacketBase.TYPE_INT);
        this.addProperty('removetype', PacketBase.TYPE_BYTE);
        this.addProperty('btCretType', PacketBase.TYPE_BYTE);
        this.read(data);
    }
}

//0x0206
class MapCreatePlayer extends Packet {
    public static msgID: number = 0x0206;
    public location: CretLocation = new CretLocation();
    public feature: PlayerFeature = new PlayerFeature();
    public constructor(data: egret.ByteArray) {
        super();
        this.addProperty('location', PacketBase.TYPE_BYTES, this.location.size(), this.location);
        this.addProperty('dwTmpId', PacketBase.TYPE_INT);
        this.addProperty('szShowName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
        this.addProperty('lifestate', PacketBase.TYPE_BYTE);
        this.addProperty('lvl', PacketBase.TYPE_WORD);
        this.addProperty('nNowHp', PacketBase.TYPE_INT);
        this.addProperty('nMaxHp', PacketBase.TYPE_INT);
        this.addProperty('nNowMp', PacketBase.TYPE_INT);
        this.addProperty('nMaxMp', PacketBase.TYPE_INT);
        this.addProperty('nMaxNG', PacketBase.TYPE_INT);
        this.addProperty('nNowNG', PacketBase.TYPE_INT);
        this.addProperty("btDir", PacketBase.TYPE_BYTE);
        this.addProperty('feature', PacketBase.TYPE_BYTES, this.feature.size(), this.feature);
        this.read(data);
    }


    public clear(): void {
        super.clear();
        this.feature.clear();
        this.location.clear();
        this.feature = null;
        this.location = null;
    }
}

//0x0209
class StateReady extends Packet {
    public static msgID: number = 0x0209;
    public constructor() {
        super();
        this.cmd = 0x0209;
    }
}

//0x020A
class ChangeGameSvrCmd extends Packet {
    public static msgID: number = 0x020A;
    public constructor(data: egret.ByteArray) {
        super();
        this.addProperty('ip', PacketBase.TYPE_BYTES, 4);// in_addr ip;
        this.addProperty('port', PacketBase.TYPE_WORD);
        this.addProperty('mapid', PacketBase.TYPE_DWORD);
        this.addProperty('gamesvr_id_type', PacketBase.TYPE_DWORD);
        this.addProperty('changesvr_type', PacketBase.TYPE_BYTE);		//换服务器原因
        this.addProperty('btmapsubline', PacketBase.TYPE_BYTE);
        this.addProperty('dwTrueZoneid', PacketBase.TYPE_DWORD);
        this.addProperty('szTGWip', PacketBase.TYPE_STRING, 260) // 人物的名字  
        this.addProperty('szAccount', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
        this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);

        this.cmd = 0x020A;
        this.read(data);
    }
}

class CretMove extends Packet {
    public static msgID: number = 0x021E;
    public constructor() {
        super();

        this.addProperty('dir', PacketBase.TYPE_BYTE);// 1 255 方向，用255就是服务器判断方向，也可以自己判断  
        this.addProperty('btsetp', PacketBase.TYPE_BYTE);//  1 1 步幅用1，表示一次走一步  
        this.addProperty('ncurx', PacketBase.TYPE_WORD);//  2  目标位置坐标X  
        this.addProperty('ncury', PacketBase.TYPE_WORD);// 2  目标位置坐标Y  
        this.addProperty('ncurz', PacketBase.TYPE_WORD);//  2  目标位置坐标Z  
        this.addProperty('ncura', PacketBase.TYPE_DWORD);
        this.addProperty('movetype', PacketBase.TYPE_BYTE); //移动类型 0 跑 1 野蛮 2 倒退 3走
        this.cmd = 0x021E;
    }
}

class CretMoveRet extends Packet {

    public static msgID: number = 0x021F;
    public location: CretLocation = new CretLocation;
    public constructor(data: egret.ByteArray) {
        super();
        this.addProperty('location', PacketBase.TYPE_BYTES, this.location.size(), this.location);// stCretLocation 8  人物在地图的准确位置  
        this.addProperty('dwTmpId', PacketBase.TYPE_INT);// DWORD  4  人物在游戏服务器唯一的临时ID  
        this.addProperty('dir', PacketBase.TYPE_BYTE);// 1  方向  
        this.addProperty('light', PacketBase.TYPE_BYTE);//  1  灯光  
        this.addProperty('moveerrorcode', PacketBase.TYPE_BYTE);//  1  标示移动是否成功，非0错误，0成功  
        this.addProperty('btmovesetp', PacketBase.TYPE_BYTE);//  1  移动的步幅  
        this.addProperty('btMoveType', PacketBase.TYPE_BYTE); //移动类型 0 普通走跑 1 野蛮 2 倒退
        this.read(data);
    }
    public clear() {
        super.clear();
        this.location.clear();
        this.location = null;
    }
}

class CretAfterSpaceMove extends Packet {
    public static msgID: number = 0x0221;
    public constructor(data: egret.ByteArray) {
        super();
        this.addProperty('dwTmpId', PacketBase.TYPE_DWORD);// 玩家ID 
        this.addProperty('spacemovetype', PacketBase.TYPE_BYTE);// 飞的类型 
        this.addProperty('dir', PacketBase.TYPE_BYTE);// 方向 
        this.addProperty('ncurx', PacketBase.TYPE_WORD);//移动后坐标X 
        this.addProperty('ncury', PacketBase.TYPE_WORD);// 移动后坐标Y 
        this.addProperty('ncurz', PacketBase.TYPE_WORD);// 移动后坐标Z 
    }
}

class UpdatePlayerInfo extends Packet {
    public static msgID: number = 0x022a;
    public constructor(data: egret.ByteArray) {
        super();

        this.addProperty("btGmLv", PacketBase.TYPE_BYTE);
        this.addProperty("btHeroJob", PacketBase.TYPE_BYTE);
        this.addProperty("btHeroSex", PacketBase.TYPE_BYTE);
        this.addProperty("btMainRlvl", PacketBase.TYPE_BYTE);
        this.addProperty("btHeroRlvl", PacketBase.TYPE_BYTE);
        this.addProperty("wHeroLvl", PacketBase.TYPE_WORD);
        this.addProperty("btHeroState", PacketBase.TYPE_BYTE);
        this.addProperty("dwReliveTime", PacketBase.TYPE_DWORD);
    }
}

class CretAttack extends Packet {
    public static msgID: number = 0x0232;
    public constructor() {
        super();
        this.addProperty('dwTempId', PacketBase.TYPE_INT);
        this.addProperty('nMagicId', PacketBase.TYPE_INT);
        this.addProperty('nHitMagicId', PacketBase.TYPE_INT);
        this.addProperty('dwTargetId', PacketBase.TYPE_INT);
        this.addProperty('nX', PacketBase.TYPE_WORD);
        this.addProperty('nY', PacketBase.TYPE_WORD);
        this.addProperty("boself", PacketBase.TYPE_BOOL);
        this.cmd = CretAttack.msgID;
    }
}

class CretAttackRet extends Packet {
    public static msgID: number = 0x0233;
    public constructor(data: egret.ByteArray) {
        super();
        this.addProperty('dwTempId', PacketBase.TYPE_INT);
        this.addProperty('nX', PacketBase.TYPE_WORD);
        this.addProperty('nY', PacketBase.TYPE_WORD);
        this.addProperty('nZ', PacketBase.TYPE_WORD);
        this.addProperty('btFightCmdType', PacketBase.TYPE_BYTE);
        this.addProperty('btAtomType', PacketBase.TYPE_BYTE);
        this.addProperty('btDirect', PacketBase.TYPE_BYTE);
        this.addProperty('nMagicId', PacketBase.TYPE_INT);
        this.addProperty('btMagicLvl', PacketBase.TYPE_BYTE);
        this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);
        this.read(data);
    }
}

class CretHealthChange extends Packet {
    public static msgID: number = 0x0234;
    public constructor(data: egret.ByteArray) {
        super();
        this.addProperty('dwtempid', PacketBase.TYPE_INT);//  4  临时ID  
        this.addProperty('nNowHP', PacketBase.TYPE_INT);//int  4  当前血  
        this.addProperty('nMaxHP', PacketBase.TYPE_INT);// int  4  最大血  
        this.addProperty('nNowMP', PacketBase.TYPE_INT);// int  4  当前蓝 
        this.addProperty('nMaxMP', PacketBase.TYPE_INT); //int  4  最大蓝
        this.addProperty('btIsInFight', PacketBase.TYPE_BYTE);// BYTE 1  1表示在战场 0 表示在场景
        this.addProperty('nChangeHP', PacketBase.TYPE_INT);
        this.addProperty('nChangeMP', PacketBase.TYPE_INT);
        this.read(data);
    }
}

class CretGoldChange extends Packet {
    public static msgID: number = 0x0236;

    public constructor(data: egret.ByteArray) {
        super();
        this.addProperty('nGold', PacketBase.TYPE_INT);
        this.addProperty('nChanged', PacketBase.TYPE_INT);
        this.addProperty('boMax', PacketBase.TYPE_BOOL);
        this.read(data);
    }
}

class CretExpChange extends Packet {
    public static msgID: number = 0x0237;
    public constructor(data: egret.ByteArray) {
        super();
        this.addProperty('i64Exp', PacketBase.TYPE_INT64);// 8 当前经验 
        this.addProperty('dwAdd', PacketBase.TYPE_INT64);// 8 增加的经验 
        this.addProperty("nType", PacketBase.TYPE_BYTE);//0 player, 1 hero, 2 boss积分
        this.read(data);
    }
}

class CretLevelUp extends Packet {
    public static msgID: number = 0x0238;
    public constructor(data: egret.ByteArray) {
        super();
        this.addProperty('dwTempId', PacketBase.TYPE_DWORD);//升级对象的临时ID 
        this.addProperty('i64LeftExp', PacketBase.TYPE_INT64);// 升级后剩下的经验 
        this.addProperty('i64MaxExp', PacketBase.TYPE_INT64);// 升级后的升级最大经验 
        this.addProperty('dwLevel', PacketBase.TYPE_DWORD);// 升级后的等级 
        this.addProperty('LevelUpTime', PacketBase.TYPE_DWORD);// 升级时候的时间
        this.addProperty('btShow', PacketBase.TYPE_BYTE);  //是否现实动画
        this.read(data);
    }
}

class CretChat extends Packet {
    public static msgID: number = 0x0239;
    public chatMsg: string = "";
    public constructor(data: egret.ByteArray) {
        super();
        this.addProperty('dwZoneid', PacketBase.TYPE_DWORD);
        this.addProperty('btChatType', PacketBase.TYPE_BYTE);//btChatType BYTE  1  聊天类型，如下  
        this.addProperty('btCountryInfoId', PacketBase.TYPE_BYTE);//  1  国家类型  
        //AddProperty('btCretType',TYPE_BYTE);//  1  发起人类型  
        this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//  发起人名称  \
        this.addProperty('dwSrcOnlyId', PacketBase.TYPE_INT64);//  目标名称  
        this.addProperty('szTargetName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//  目标名称  
        this.addProperty('dwDestOnlyId', PacketBase.TYPE_INT64);//  目标名称  

        this.addProperty('dwSendTime', PacketBase.TYPE_INT);//发送时间
        this.addProperty('boBanner', PacketBase.TYPE_BOOL);//是否横幅
        this.addProperty('dwVip', PacketBase.TYPE_DWORD);//发送时间
        this.addProperty('dwGuildId', PacketBase.TYPE_DWORD);

        this.addProperty('btPlatForm', PacketBase.TYPE_BYTE);//平台类型
        this.addProperty('btTxYellowType', PacketBase.TYPE_BYTE);//黄钻类型 1黄钻,2年黄钻,3豪华黄钻
        this.addProperty('btTxYellowLevel', PacketBase.TYPE_BYTE);//黄钻等级.
        this.addProperty('btLevel3366', PacketBase.TYPE_BYTE);//3366等级
        this.addProperty('btTxBlueType', PacketBase.TYPE_BYTE);//蓝钻类型 1蓝钻,2年蓝钻,3豪华蓝钻
        this.addProperty('btTxBlueLevel', PacketBase.TYPE_BYTE);//蓝钻等级
        this.addProperty('btTxQQVipType', PacketBase.TYPE_BYTE);//QQ会员类型 1会员,2年会员,3豪华会员
        this.addProperty('btTxQQVipLevel', PacketBase.TYPE_BYTE);//QQ会员等级
        this.addProperty('nSize', PacketBase.TYPE_INT);
        this.cmd = CretChat.msgID;
        this.read(data);
    }

    public read(data: egret.ByteArray): number {
        if (data) {
            data.position += super.read(data);
            var nSize: number = this.getValue('nSize');
            this.chatMsg = data.readUTFBytes(nSize);
            return data.length
        }
        return 0;
    }

    public setString(s: string): void {
        // var bytes: egret.ByteArray = new egret.ByteArray();
        // bytes.endian = egret.Endian.LITTLE_ENDIAN;
        App.GameEngine.packetBytes.clear();
        App.GameEngine.packetBytes.position = 0;
        App.GameEngine.packetBytes.writeUTFBytes(s);
        this.addProperty('str', Packet.TYPE_STRING, App.GameEngine.packetBytes.length + 1);
        this.setValue('nSize', App.GameEngine.packetBytes.length + 1);
        this.setValue('str', s);
    }

}

class CretAbility extends Packet {
    public static msgID: number = 0x023B;
    public ability: ArpgAbility = new ArpgAbility;
    public constructor(data: egret.ByteArray) {
        super();
        this.addProperty('dwTempId', PacketBase.TYPE_INT);
        this.addProperty('ability', PacketBase.TYPE_BYTES, this.ability.size(), this.ability);
        this.addProperty("dwType", PacketBase.TYPE_BYTE);//0主角,1英雄战士,2英雄法师,3英雄道士
        this.addProperty("fightPower", PacketBase.TYPE_DWORD);//
        this.read(data);
    }
}

class CretCharBase extends Packet {
    public static msgID: number = 0x0240;

    public constructor(data: egret.ByteArray) {
        super();
        this.addProperty('dwLevel', PacketBase.TYPE_INT);		//当前等级
        this.addProperty('i64NowExp', PacketBase.TYPE_INT64);	//当前经验
        this.addProperty('i64MaxExp', PacketBase.TYPE_INT64);	//最大经验
        this.addProperty('nNowHp', PacketBase.TYPE_INT);
        this.addProperty('nNowMp', PacketBase.TYPE_INT);//当前兰
        this.addProperty('dwGold', PacketBase.TYPE_INT);			//当前金币
        this.addProperty('dwSavedGold', PacketBase.TYPE_DWORD);  //仓库金币
        this.addProperty('dwBindGold', PacketBase.TYPE_DWORD);//绑定金币
        this.addProperty('dwZhuGold', PacketBase.TYPE_DWORD);	//元宝
        this.addProperty('dwGiftsGold', PacketBase.TYPE_DWORD);	//礼金
        this.addProperty('dwJiFenGold', PacketBase.TYPE_DWORD);  //积分
        this.addProperty('dwAchiPoint', PacketBase.TYPE_DWORD);  //成就点数
        this.addProperty('i64NowSpirit', PacketBase.TYPE_INT64);//当前灵力
        this.addProperty('wNowSoulDevil', PacketBase.TYPE_WORD);
        this.addProperty('wNowKilling', PacketBase.TYPE_WORD);
        this.addProperty('btPkModel', PacketBase.TYPE_BYTE);	//pk模式
        this.addProperty('dwHonorNum', PacketBase.TYPE_DWORD);	//荣誉
        this.addProperty('dwGuildDedication', PacketBase.TYPE_DWORD);	//行会贡献值
        this.addProperty("dwExperience", PacketBase.TYPE_DWORD);//阅历值
        this.addProperty("btStorageCount", PacketBase.TYPE_BYTE);//仓库数量
        this.addProperty('i64Fame', PacketBase.TYPE_INT64);//当前声望
        this.addProperty('i64TotalFame', PacketBase.TYPE_INT64);//累计声望
        this.addProperty('i64Diamond', PacketBase.TYPE_INT64);//累计声望
        this.addProperty('nNeigongMax', PacketBase.TYPE_INT);//总内功
        this.addProperty('nNeigongnum', PacketBase.TYPE_INT);//内功
        this.addProperty('nFight', PacketBase.TYPE_DWORD); //战斗力
        this.addProperty('dwBindRmb', PacketBase.TYPE_DWORD);//绑定元宝
        this.addProperty("i64MaxHeroExp", PacketBase.TYPE_INT64);//英雄最大经验
        this.read(data);
    }
}

//0x0246
class CretLifestateChange extends Packet {
    public static msgID: number = 0x0246;
    public constructor(data: egret.ByteArray) {
        super();
        this.addProperty('dwTempID', PacketBase.TYPE_INT);
        this.addProperty('change_type', PacketBase.TYPE_BYTE);
        this.addProperty('curLifeState', PacketBase.TYPE_BYTE);
        this.addProperty('btIsInFight', PacketBase.TYPE_BYTE);
        this.read(data);
    }
}

//0x026C  --02-108
class CretGetUseItem extends Packet {
    public static msgID: number = 0x026C;
    public constructor() {
        super();
        this.addProperty('i64id', PacketBase.TYPE_INT64);
        this.addProperty('dwCretOwnerTempId', PacketBase.TYPE_DWORD);
        this.addProperty('dwCretTmpId', PacketBase.TYPE_DWORD);
        this.cmd = CretGetUseItem.msgID = 0x026C;
    }
}

//0x0315 03-21
class CretGetUseItemRet extends Packet {
    public static msgID: number = 0x0315;
    public constructor(data: egret.ByteArray) {
        super();
        this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);
        this.addProperty('i64id', PacketBase.TYPE_INT64);
        this.read(data);
    }
}

//0x0288
class TipMsg extends Packet {
    public static msgID: number = 0x0288;
    public tipmsg: string = "";
    public constructor(data: egret.ByteArray) {
        super();
        this.addProperty("posx", PacketBase.TYPE_INT);
        this.addProperty("posy", PacketBase.TYPE_INT);
        this.addProperty('nSize', PacketBase.TYPE_DWORD);
        this.read(data);
    }

    public read(data: egret.ByteArray): number {
        if (data) {
            data.position += super.read(data);
            var nSize: number = this.getValue('nSize');
            this.tipmsg = data.readUTFBytes(nSize);
            return data.length
        }
        return 0;
    }
}

//0x0297
class CretStruck extends Packet {
    public static msgID: number = 0x0297;
    public constructor(data: egret.ByteArray) {
        super();

        this.addProperty('dwTmpId', PacketBase.TYPE_INT);
        this.addProperty('dwAcTmpID', PacketBase.TYPE_INT);//攻击者ID
        this.addProperty('npower', PacketBase.TYPE_INT);
        this.addProperty('nDamageType', PacketBase.TYPE_INT);//1：暴击，2：MISS，3：抵挡，4：龙魂暴击
        this.addProperty('nHp', PacketBase.TYPE_INT);
        this.addProperty('nMaxHp', PacketBase.TYPE_INT);
        this.addProperty('wdMagicID', PacketBase.TYPE_INT);
        this.addProperty("nAddDamage", PacketBase.TYPE_INT);//威慑增伤
        this.read(data);
    }
}

//0x029C - 02-156

//0x029D - 02-157
class MapItemEventDel extends Packet {
    public static msgID: number = 0x029D;
    public constructor(data: egret.ByteArray) {
        super();
        this.addProperty('i64ItemID', PacketBase.TYPE_INT64);	//物品id
        this.addProperty('wX', PacketBase.TYPE_WORD); //坐标
        this.addProperty('wY', PacketBase.TYPE_WORD);
        this.read(data);
    }
}

//0x02A0 02-160
class MapItemEventPick extends Packet {
    public static msgID: number = 0x02A0;
    public constructor(data: egret.ByteArray) {
        super();
        this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);
        this.addProperty('i64ItemID', PacketBase.TYPE_INT64);	//物品id
        this.addProperty('wX', PacketBase.TYPE_WORD); //坐标
        this.addProperty('wY', PacketBase.TYPE_WORD);

        if (data) {
            this.read(data);
        }

        this.cmd = MapItemEventPick.msgID;
    }
}

//0x02B8 - 02-184
class MapItemEventAdd extends Packet {
    public static msgID: number = 0x02B8;
    public constructor(data: egret.ByteArray) {
        super();
        this.addProperty('wX', PacketBase.TYPE_WORD); //坐标
        this.addProperty('wY', PacketBase.TYPE_WORD);
        this.addProperty('i64ItemID', PacketBase.TYPE_INT64);	//物品id
        this.addProperty('dwBaseID', PacketBase.TYPE_INT);	//物品基本id
        this.addProperty('dwCount', PacketBase.TYPE_INT);	//物品数量	0..100
        this.addProperty('dwEffId', PacketBase.TYPE_DWORD);						//当前效果ID
        this.addProperty('btQuality', PacketBase.TYPE_BYTE);	//物品品质
        this.addProperty('i64OwnerId', PacketBase.TYPE_INT64);//归属权ID
        this.addProperty("coldTime", PacketBase.TYPE_BYTE);//
        this.read(data);
    }
}

//0x0919 09-25
class QuestScriptData extends Packet {
    public static msgID: number = 0x0919;
    public str: string;
    public constructor(data: egret.ByteArray) {
        super();
        this.addProperty('dwDataType', PacketBase.TYPE_DWORD);// NPC临时ID 
        this.addProperty('nCount', PacketBase.TYPE_INT);
        this.read(data);
    }

    public read(data: egret.ByteArray): number {
        data.position += super.read(data);
        let nCount = this.getValue('nCount');
        this.str = data.readUTFBytes(nCount);
        return data.length;
    }
}


//0x091A 09-26
class QuestClientData extends Packet {
    public static msgID: number = 0x091A;

    public constructor() {
        super();
        this.addProperty('dwClientType', PacketBase.TYPE_DWORD);
        this.addProperty("posx", PacketBase.TYPE_INT);
        this.addProperty("posy", PacketBase.TYPE_INT);
        this.addProperty('nSize', PacketBase.TYPE_INT);
        this.cmd = QuestClientData.msgID;
    }

    public setString(s: string): void {
        App.GameEngine.packetBytes.clear();
        App.GameEngine.packetBytes.position = 0;
        App.GameEngine.packetBytes.writeUTFBytes(s);
        this.addProperty('str', Packet.TYPE_STRING, App.GameEngine.packetBytes.length + 1);
        this.setValue('nSize', App.GameEngine.packetBytes.length + 1);
        this.setValue('str', s);
    }
}

//0x0301
class CretDeleteItem extends Packet {
    public static msgID: number = 0x0301;

    public constructor(data: egret.ByteArray) {
        super();
        this.addProperty('btPosition', PacketBase.TYPE_BYTE);
        this.addProperty('i64Id', PacketBase.TYPE_INT64);
        this.read(data);
    }
}

//0x0302
class CretUpdateItem extends Packet {
    public static msgID: number = 0x0302;
    public item: ItemBase = new ItemBase(null);
    public constructor(data: egret.ByteArray) {
        super();
        this.addProperty('btPosition', PacketBase.TYPE_BYTE);
        this.addProperty('item', PacketBase.TYPE_BYTES, this.item.size(), this.item);
        this.read(data);
    }
}

//0x0303
class CretItems extends Packet {
    public static msgID: number = 0x0303;
    public count: number;
    public pos: number;
    public items: Array<ItemBase> = new Array<ItemBase>();
    public constructor(data: egret.ByteArray) {
        super();

        this.addProperty('btType', PacketBase.TYPE_BYTE);	//控制前端是否清除包裹重新添加
        this.addProperty('btPosition', PacketBase.TYPE_CHAR);
        this.addProperty('btOpenCount', PacketBase.TYPE_BYTE);
        this.addProperty('dwSortCD', PacketBase.TYPE_INT);
        this.addProperty('nCount', PacketBase.TYPE_INT);
        this.cmd = CretItems.msgID;
        if (data) this.read(data);
    }

    public read(data: egret.ByteArray): number {
        data.position = super.read(data);
        this.count = this.getValue('nCount');
        this.pos = this.getValue('btPosition');

        if (this.count > 0) {
            for (let i = 0; i < this.count; i++) {
                this.items[i] = new ItemBase(data);
            }
        }
        return 0;
    }
}

class ResortBag extends Packet {
    public static msgID: number = 0x0305;
    public constructor() {
        super();
        this.cmd = ResortBag.msgID;
    }
}

//0x0307
class CretProcessingItem extends Packet {
    public static msgID: number = 0x0307;
    public srcitemlocation = new ItemLocation;
    public destitemlocation = new ItemLocation;
    public constructor(data: egret.ByteArray = null) {
        super();
        this.addProperty('nErrorCode', PacketBase.TYPE_INT);
        this.addProperty('dwtmpid', PacketBase.TYPE_DWORD);		//当前操作昵称ID(=0自己 !=0宠物或则自己)
        this.addProperty('i64ItemId', PacketBase.TYPE_INT64); //佩戴的装备的ID
        this.addProperty('srcLocation', PacketBase.TYPE_BYTES, this.srcitemlocation.size(), this.srcitemlocation); //物品原来的位置
        this.addProperty('destLocation', PacketBase.TYPE_BYTES, this.destitemlocation.size(), this.destitemlocation); //物品要去的位置
        this.read(data);
        this.cmd = CretProcessingItem.msgID;
    }

    public clear(): void {
        super.clear();
        this.srcitemlocation.clear();
        this.srcitemlocation = null;
        this.destitemlocation.clear();
        this.destitemlocation = null;
    }

    public get srcLocation(): ItemLocation {
        return this.srcitemlocation;
    }
    public set srcLocation(value: ItemLocation) {
        this.srcitemlocation.clone(value.data);
    }

    public set destLocation(value: ItemLocation) {
        this.destitemlocation.clone(value.data);
    }
    public get destLocation(): ItemLocation {
        return this.destitemlocation;
    }
}

//0x030A
class CretItemCountChanged extends Packet {
    public static msgID: number = 0x030A;

    public constructor(data: egret.ByteArray) {
        super();
        this.addProperty('btPosition', PacketBase.TYPE_BYTE);
        this.addProperty('itemid', PacketBase.TYPE_INT64);
        this.addProperty('dwCount', PacketBase.TYPE_DWORD);
        this.read(data);
    }
}

//0x033D 03-61
class CretForsakeItem extends Packet {
    public static msgID: number = 0x033D

    public constructor(data: egret.ByteArray = null) {
        super();
        this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);
        this.addProperty('i64id', PacketBase.TYPE_INT64);
        this.addProperty('nGoldNum', PacketBase.TYPE_INT);
        this.read(data);
        this.cmd = CretForsakeItem.msgID;
    }
}