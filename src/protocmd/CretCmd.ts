/**
 * 协议模块
 */
module ProtoCmd {
    //0x0201
    //人物进入地图
    export class PlayerChangeMap extends Packet {
        public static msgID: number = 0x0201;
        public location: CretLocation = new CretLocation();
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('location', PacketBase.TYPE_BYTES, this.location.size(), this.location);
            this.addProperty('dwTmpId', PacketBase.TYPE_INT);//临时唯一ID
            this.addProperty('dwMapFileID', PacketBase.TYPE_DWORD);//地图文件ID
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//角色名
            this.addProperty('szMapFileName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//地图文件名
            this.addProperty('dir', PacketBase.TYPE_BYTE);//方向
            this.addProperty('light', PacketBase.TYPE_BYTE);//弃用
            this.addProperty('country', PacketBase.TYPE_BYTE);//弃用
            this.addProperty('factionid', PacketBase.TYPE_BYTE);//弃用
            this.addProperty('minimapidx', PacketBase.TYPE_INT);//小地图ID
            this.addProperty('szMapName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//地图名
            this.addProperty('mapsublineid', PacketBase.TYPE_BYTE);//弃用
            this.addProperty('lifestate', PacketBase.TYPE_BYTE);//人物状态　生或死
            this.addProperty('dwPlayerCreateTime', PacketBase.TYPE_DWORD);//角色创建时间
            this.read(data);
        }


        public clear(): void {
            super.clear();
            this.location = null;
        }
    }

    //0x0202
    //地图创建怪物，NPC
    export class MapCreateCret extends Packet {
        public static msgID: number = 0x0202;
        public location: CretLocation = new CretLocation();
        public feature: AnimalFeature = new AnimalFeature();

        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('location', PacketBase.TYPE_BYTES, this.location.size(), this.location);
            this.addProperty('dwTmpId', PacketBase.TYPE_INT);//临时唯一ID
            this.addProperty('szMasterName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//主人名字
            this.addProperty('szShowName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//头顶名字
            this.addProperty('lifestate', PacketBase.TYPE_BYTE);
            this.addProperty('lvl', PacketBase.TYPE_WORD);//等级
            this.addProperty('nNowHp', PacketBase.TYPE_INT);//当前血量
            this.addProperty('nMaxHp', PacketBase.TYPE_INT);//最大血量
            this.addProperty('nNowMp', PacketBase.TYPE_INT);//当前蓝量
            this.addProperty('nMaxMp', PacketBase.TYPE_INT);//最大蓝量
            this.addProperty("btDir", PacketBase.TYPE_BYTE);//方向
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
    //删除地图上的生物
    export class MapRemoveCret extends Packet {
        public static msgID: number = 0x0203;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwTmpId', PacketBase.TYPE_INT);
            this.addProperty('removetype', PacketBase.TYPE_BYTE);//删除类型
            this.addProperty('btCretType', PacketBase.TYPE_BYTE);//生物类型
            this.read(data);
        }
    }

    //0x0206
    //地图上创建人物
    export class MapCreatePlayer extends Packet {
        public static msgID: number = 0x0206;
        public location: CretLocation = new CretLocation();
        public feature: PlayerFeature = new PlayerFeature();
        public constructor(data: Laya.Byte) {
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
    //客户端与服务器状态
    export class StateReady extends Packet {
        public static msgID: number = 0x0209;
        public cbPacket = StateReady;
        public constructor() {
            super();
            this.cmd = 0x0209;
        }
    }

    //0x020A
    //切换服务器
    export class ChangeGameSvrCmd extends Packet {
        public static msgID: number = 0x020A;
        public constructor(data: Laya.Byte) {
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

    //移动
    export class CretMove extends Packet {
        public static msgID: number = 0x021E;
        public cbPacket = CretMoveRet;
        public constructor() {
            super();
            this.addProperty('dir', PacketBase.TYPE_BYTE);// 1 255 方向，用255就是服务器判断方向，也可以自己判断  
            this.addProperty('btsetp', PacketBase.TYPE_BYTE);//  1 1 步幅用1，表示一次走一步  
            this.addProperty('ncurx', PacketBase.TYPE_WORD);//  2  目标位置坐标X  
            this.addProperty('ncury', PacketBase.TYPE_WORD);// 2  目标位置坐标Y  
            this.addProperty('ncurz', PacketBase.TYPE_WORD);//  2  目标位置坐标Z  
            this.addProperty('ncura', PacketBase.TYPE_DWORD);// 校验值
            this.addProperty('movetype', PacketBase.TYPE_BYTE); //移动类型 0 跑 1 野蛮 2 倒退 3走
            this.cmd = 0x021E;
        }
    }

    //移动返回
    export class CretMoveRet extends Packet {
        public static msgID: number = 0x021F;
        public location: CretLocation = new CretLocation();
        public constructor(data: Laya.Byte) {
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

    //生物移动后
    export class CretAfterSpaceMove extends Packet {
        public static msgID: number = 0x0221;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwTmpId', PacketBase.TYPE_DWORD);// 玩家ID 
            this.addProperty('spacemovetype', PacketBase.TYPE_BYTE);// 飞的类型 
            this.addProperty('dir', PacketBase.TYPE_BYTE);// 方向 
            this.addProperty('ncurx', PacketBase.TYPE_WORD);//移动后坐标X 
            this.addProperty('ncury', PacketBase.TYPE_WORD);// 移动后坐标Y 
            this.addProperty('ncurz', PacketBase.TYPE_WORD);// 移动后坐标Z 
        }
    }

    //更新角色信息
    export class UpdatePlayerInfo extends Packet {
        public static msgID: number = 0x022a;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty("btGmLv", PacketBase.TYPE_BYTE);//GM等级
            this.addProperty("btHeroJob", PacketBase.TYPE_BYTE);//英雄职业
            this.addProperty("btHeroSex", PacketBase.TYPE_BYTE);//英雄性别
            this.addProperty("btMainRlvl", PacketBase.TYPE_BYTE);//人物转生等级
            this.addProperty("btHeroRlvl", PacketBase.TYPE_BYTE);//英雄转生等级
            this.addProperty("wHeroLvl", PacketBase.TYPE_WORD);//英雄等级
            this.addProperty("btHeroState", PacketBase.TYPE_BYTE);//英雄状态
            this.addProperty("dwReliveTime", PacketBase.TYPE_DWORD);//英雄复活时间戳
        }
    }

    //攻击
    export class CretAttack extends Packet {
        public static msgID: number = 0x0232;
        public cbPacket = CretAttackRet;
        public constructor() {
            super();
            this.addProperty('dwTempId', PacketBase.TYPE_INT);//临时唯一ID
            this.addProperty('nMagicId', PacketBase.TYPE_INT);//技能ID
            this.addProperty('nHitMagicId', PacketBase.TYPE_INT);
            this.addProperty('dwTargetId', PacketBase.TYPE_INT);//目标临时唯一ID
            this.addProperty('nX', PacketBase.TYPE_WORD);//目标坐标
            this.addProperty('nY', PacketBase.TYPE_WORD);
            this.addProperty("boself", PacketBase.TYPE_BOOL);//是否包含自己，服务器用
            this.cmd = CretAttack.msgID;
        }
    }

    //攻击返回
    export class CretAttackRet extends Packet {
        public static msgID: number = 0x0233;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwTempId', PacketBase.TYPE_INT);
            this.addProperty('nX', PacketBase.TYPE_WORD);
            this.addProperty('nY', PacketBase.TYPE_WORD);
            this.addProperty('nZ', PacketBase.TYPE_WORD);
            this.addProperty('btFightCmdType', PacketBase.TYPE_BYTE);//无用
            this.addProperty('btAtomType', PacketBase.TYPE_BYTE);//无用
            this.addProperty('btDirect', PacketBase.TYPE_BYTE);//攻击方向
            this.addProperty('nMagicId', PacketBase.TYPE_INT);//技能ID
            this.addProperty('btMagicLvl', PacketBase.TYPE_BYTE);//技能等级
            this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);
            this.read(data);
        }
    }

    //血　蓝改变通知
    export class CretHealthChange extends Packet {
        public static msgID: number = 0x0234;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwtempid', PacketBase.TYPE_INT);//  4  临时ID  
            this.addProperty('nNowHP', PacketBase.TYPE_INT);//int  4  当前血  
            this.addProperty('nMaxHP', PacketBase.TYPE_INT);// int  4  最大血  
            this.addProperty('nNowMP', PacketBase.TYPE_INT);// int  4  当前蓝 
            this.addProperty('nMaxMP', PacketBase.TYPE_INT); //int  4  最大蓝
            this.addProperty('btIsInFight', PacketBase.TYPE_BYTE);// BYTE 1  1表示在战场 0 表示在场景
            this.addProperty('nChangeHP', PacketBase.TYPE_INT);//改变的血
            this.addProperty('nChangeMP', PacketBase.TYPE_INT);//改变的蓝
            this.read(data);
        }
    }

    //金币 改变通知
    export class CretGoldChange extends Packet {
        public static msgID: number = 0x0236;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('nGold', PacketBase.TYPE_DWORD);//当前金币
            this.addProperty('nChanged', PacketBase.TYPE_INT);//改变的金币
            this.addProperty('boMax', PacketBase.TYPE_BOOL);//是否上限
            this.read(data);
        }
    }

    //绑定金币 改变通知
    export class CretGoldLockChange extends Packet {
        public static msgID: number = 0x02b6;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwBindGold', PacketBase.TYPE_DWORD);//当前金币
            this.addProperty('nChanged', PacketBase.TYPE_INT);//改变的金币
            this.addProperty('boMax', PacketBase.TYPE_BOOL);//是否上限
            this.read(data);
        }
    }

    /**
     * 元宝改变
     */
    export class CretYuanBaoChange extends Packet {
        public static msgID: number = 0x0258;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwRmbGold', PacketBase.TYPE_DWORD);//当前元宝
            this.addProperty('nChanged', PacketBase.TYPE_INT);//改变的元宝
            this.read(data);
        }
    }

    /**
     * 绑定元宝
     */
    export class CretYuanBaoLockChange extends Packet {
        public static msgID: number = 0x0259;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwGiftRmbGold', PacketBase.TYPE_DWORD);//当前绑定元宝
            this.addProperty('nChanged', PacketBase.TYPE_INT);//改变的元宝
            this.read(data);
        }
    }

    //经验 改变通知
    export class CretExpChange extends Packet {
        public static msgID: number = 0x0237;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('i64Exp', PacketBase.TYPE_INT64);// 8 当前经验 
            this.addProperty('dwAdd', PacketBase.TYPE_INT64);// 8 增加的经验 
            this.addProperty("nType", PacketBase.TYPE_BYTE);//0 player, 1 hero, 2 boss积分
            this.read(data);
        }
    }

    //等级 改变通知
    export class CretLevelUp extends Packet {
        public static msgID: number = 0x0238;
        public constructor(data: Laya.Byte) {
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

    //聊天
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

    //场景内角色 属性通知
    export class CretAbility extends Packet {
        public static msgID: number = 0x023B;
        public ability: ArpgAbility = new ArpgAbility();
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwTempId', PacketBase.TYPE_INT);
            this.addProperty('ability', PacketBase.TYPE_BYTES, this.ability.size(), this.ability);
            this.addProperty("dwType", PacketBase.TYPE_BYTE);//0主角,1英雄战士,2英雄法师,3英雄道士
            this.addProperty("fightPower", PacketBase.TYPE_DWORD);//战力
            this.read(data);
        }
    }

    //玩家 属性通知
    export class CretPlayerAbility extends Packet {
        public static msgID: number = 0x0249;
        public ability: ArpgAbility = new ArpgAbility();
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwTempId', PacketBase.TYPE_INT);
            this.addProperty('ability', PacketBase.TYPE_BYTES, this.ability.size(), this.ability);
            this.read(data);
        }
    }

    /**
     * 初始化玩家属性包
     */
    export class CretCharBase extends Packet {
        public static msgID: number = 0x0240;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwLevel', PacketBase.TYPE_INT);		//当前等级

            this.addProperty('i64NowExp', PacketBase.TYPE_INT64);	//当前经验
            this.addProperty('i64MaxExp', PacketBase.TYPE_INT64);	//最大经验

            this.addProperty('nNowHp', PacketBase.TYPE_INT);        //当前血量
            this.addProperty('nNowMp', PacketBase.TYPE_INT);        //当前蓝

            this.addProperty('dwGold', PacketBase.TYPE_INT);		//当前金币
            this.addProperty('dwSavedGold', PacketBase.TYPE_DWORD);  //仓库金币,弃用
            this.addProperty('dwBindGold', PacketBase.TYPE_DWORD);  //绑定金币
            this.addProperty('dwZhuGold', PacketBase.TYPE_DWORD);	//元宝
            this.addProperty('dwGiftsGold', PacketBase.TYPE_DWORD);	//绑定元宝

            this.addProperty('dwJiFenGold', PacketBase.TYPE_DWORD);  //积分，弃用
            this.addProperty('dwAchiPoint', PacketBase.TYPE_DWORD);  //成就点数，弃用
            this.addProperty('i64NowSpirit', PacketBase.TYPE_INT64); //当前灵力，弃用
            this.addProperty('wNowSoulDevil', PacketBase.TYPE_WORD);// 弃用
            this.addProperty('wNowKilling', PacketBase.TYPE_WORD);// 弃用

            this.addProperty('btPkModel', PacketBase.TYPE_BYTE);	//pk模式
            this.addProperty('dwHonorNum', PacketBase.TYPE_DWORD);	//荣誉积分
            this.addProperty('dwGuildDedication', PacketBase.TYPE_DWORD);	//行会贡献值
            this.addProperty("dwExperience", PacketBase.TYPE_DWORD);//阅历值，弃用
            this.addProperty("btStorageCount", PacketBase.TYPE_BYTE);//仓库数量

            this.addProperty('i64Fame', PacketBase.TYPE_INT64);//当前声望
            this.addProperty('i64TotalFame', PacketBase.TYPE_INT64);//累计声望
            this.addProperty('i64Diamond', PacketBase.TYPE_INT64);//累计声望，弃用

            this.addProperty('nNeigongMax', PacketBase.TYPE_INT);//总内功
            this.addProperty('nNeigongnum', PacketBase.TYPE_INT);//内功

            this.addProperty('nFight', PacketBase.TYPE_DWORD); //战斗力
            this.addProperty('dwBindRmb', PacketBase.TYPE_DWORD);//绑定元宝，弃用

            this.addProperty("i64MaxHeroExp", PacketBase.TYPE_INT64);//英雄最大经验
            this.read(data);
        }
    }

    //0x0246
    //生命状态改变通知
    export class CretLifestateChange extends Packet {
        public static msgID: number = 0x0246;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwTempID', PacketBase.TYPE_INT);//临时唯一ID
            this.addProperty('change_type', PacketBase.TYPE_BYTE);//改变类型
            this.addProperty('curLifeState', PacketBase.TYPE_BYTE);//当前状态　０生　１　死
            this.addProperty('btIsInFight', PacketBase.TYPE_BYTE);
            this.read(data);
        }
    }

    /**************************************************物品相关 */
    //0x026C  --02-108
    //单个使用物品
    export class CretGetUseItem extends Packet {
        public static msgID: number = 0x026C;
        public cbPacket = CretGetUseItemRet;
        public constructor() {
            super();
            this.addProperty('i64id', PacketBase.TYPE_INT64);//物品唯一ID
            this.addProperty('dwCretOwnerTempId', PacketBase.TYPE_DWORD);//使用者
            this.addProperty('dwCretTmpId', PacketBase.TYPE_DWORD);//对谁使用
            this.cmd = CretGetUseItem.msgID;
        }
    }

    //0x0315 03-21
    //使用物品返回
    export class CretGetUseItemRet extends Packet {
        public static msgID: number = 0x0315;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);
            this.addProperty('i64id', PacketBase.TYPE_INT64);//使用的物品唯一ID
            this.read(data);
        }
    }

    //0x0288
    //信息通知Tips
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

    //0x0297
    //生物掉血
    export class CretStruck extends Packet {
        public static msgID: number = 0x0297;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwTmpId', PacketBase.TYPE_INT);//
            this.addProperty('dwAcTmpID', PacketBase.TYPE_INT);//攻击者ID
            this.addProperty('npower', PacketBase.TYPE_INT);//掉了多少血
            this.addProperty('nDamageType', PacketBase.TYPE_INT);//1：暴击，2：MISS，3：抵挡，4：龙魂暴击
            this.addProperty('nHp', PacketBase.TYPE_INT);//当前血量
            this.addProperty('nMaxHp', PacketBase.TYPE_INT);//最大血量
            this.addProperty('wdMagicID', PacketBase.TYPE_INT);//技能ID
            this.addProperty("nAddDamage", PacketBase.TYPE_INT);//威慑增伤
            this.read(data);
        }
    }

    //0x029C - 02-156
    // *************************************地图物品***************************
    //0x029D - 02-157
    //删除地图上的物品
    export class MapItemEventDel extends Packet {
        public static msgID: number = 0x029D;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('i64ItemID', PacketBase.TYPE_INT64);	//物品id
            this.addProperty('wX', PacketBase.TYPE_WORD); //坐标
            this.addProperty('wY', PacketBase.TYPE_WORD);
            this.read(data);
        }
    }

    //0x02A0 02-160
    //拾取地图上的物品
    export class MapItemEventPick extends Packet {
        public static msgID: number = 0x02A0;
        public cbPacket = MapItemEventPick;
        public constructor(data: Laya.Byte = null) {
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
    //往地图上添加物品
    export class MapItemEventAdd extends Packet {
        public static msgID: number = 0x02B8;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('wX', PacketBase.TYPE_WORD); //坐标
            this.addProperty('wY', PacketBase.TYPE_WORD);
            this.addProperty('i64ItemID', PacketBase.TYPE_INT64);	//物品id
            this.addProperty('dwBaseID', PacketBase.TYPE_INT);	//物品基本id
            this.addProperty('dwCount', PacketBase.TYPE_INT);	//物品数量	0..100
            this.addProperty('dwEffId', PacketBase.TYPE_DWORD);						//当前效果ID
            this.addProperty('btQuality', PacketBase.TYPE_BYTE);	//物品品质
            this.addProperty('i64OwnerId', PacketBase.TYPE_INT64);//归属权ID
            this.addProperty("coldTime", PacketBase.TYPE_BYTE);//消失时间戳
            this.read(data);
        }
    }

    // ************************************包裹物品*******************************

    //0x0303
    //上线获取包裹所有物品
    export class CretItems extends Packet {
        public static msgID: number = 0x0303;
        public count: number;
        public pos: number;
        public items: Array<ItemBase> = new Array<ItemBase>();
        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty('btType', PacketBase.TYPE_BYTE);	//控制前端是否清除包裹重新添加(0:开始发并清除 1:添加 2:发完 3:第一次就发完(清除))
            this.addProperty('bagType', PacketBase.TYPE_CHAR);//包裹类型
            this.addProperty('btOpenCount', PacketBase.TYPE_BYTE);//开启的包裹数量
            this.addProperty('dwSortCD', PacketBase.TYPE_INT);//排序CD
            this.addProperty('nCount', PacketBase.TYPE_INT);//物品个数
            this.cmd = CretItems.msgID;
            if (data) this.read(data);
        }

        public read(data: Laya.Byte): number {
            data.pos = super.read(data);
            this.count = this.getValue('nCount');
            this.pos = this.getValue('bagType');
            if (this.count > 0) {
                for (let i = 0; i < this.count; i++) {
                    this.items[i] = new ItemBase(data);
                }
            }
            return 0;
        }
    }

    //0x0301
    //删除包裹物品
    export class CretDeleteItem extends Packet {
        public static msgID: number = 0x0301;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('bagType', PacketBase.TYPE_BYTE);//包裹类型
            this.addProperty('i64Id', PacketBase.TYPE_INT64);//物品唯一ID
            this.read(data);
        }
    }

    //0x0302
    //更新包裹物品
    export class CretUpdateItem extends Packet {
        public static msgID: number = 0x0302;
        public item: ItemBase = new ItemBase(null);
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('bagType', PacketBase.TYPE_BYTE);
            this.addProperty('item', PacketBase.TYPE_BYTES, this.item.size(), this.item);
            this.read(data);
        }
    }

    //包裹物品排序
    export class ResortBag extends Packet {
        public static msgID: number = 0x0305;
        public constructor() {
            super();
            this.cmd = ResortBag.msgID;
        }
    }

    //0x0307
    //物品操作，穿戴物品
    export class CretProcessingItem extends Packet {
        public static msgID: number = 0x0307;
        public cbPacket = CretProcessingItem;
        private srcitemlocation = new ItemLocation();
        private destitemlocation = new ItemLocation();
        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty('nErrorCode', PacketBase.TYPE_INT);
            this.addProperty('dwtmpid', PacketBase.TYPE_DWORD);
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
    //包裹物品数量改变
    export class CretItemCountChanged extends Packet {
        public static msgID: number = 0x030A;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('bagType', PacketBase.TYPE_BYTE);//包裹类型
            this.addProperty('i64Id', PacketBase.TYPE_INT64);//物品唯一ID
            this.addProperty('dwCount', PacketBase.TYPE_DWORD);//物品数量
            this.read(data);
        }
    }

    //0x033D 03-61
    //丢弃物品
    export class CretForsakeItem extends Packet {
        public static msgID: number = 0x033D
        public cbPacket = CretForsakeItem;
        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);
            this.addProperty('i64id', PacketBase.TYPE_INT64);//丢弃的物品唯一KD
            this.addProperty('nGoldNum', PacketBase.TYPE_INT);//无用
            this.read(data);
            this.cmd = CretForsakeItem.msgID;
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

    /******************************************技能**************************************** */

    /******************************************新手引导************************************ */


}
