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
            this.addProperty('isFirstCreate', PacketBase.TYPE_BYTE); //首次创角 1：新角色 0：正常登陆
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
            this.addProperty('nHasUseNG', PacketBase.TYPE_INT);
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


    //生物移动后，
    // 0x0221
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
            this.read(data);
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
            this.read(data);
        }
    }


    //血蓝改变通知,玩家自己
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

    //角色属性 改变通知
    // 0x0237
    export class CretExpChange extends Packet {
        public static msgID: number = 0x0237;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('i64Exp', PacketBase.TYPE_INT64);// 8 当前经验 
            this.addProperty('dwAdd', PacketBase.TYPE_INT64);// 8 增加的经验 
            this.addProperty("nType", PacketBase.TYPE_BYTE);//枚举类型 eEXP_VALUE_TYPE
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

    //NPC任务提示消息
    // NPC任务状态
    // 0x0909
    export class NpcStatsQuestRet extends Packet {
        public static msgID: number = 0x0909;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('npcid', PacketBase.TYPE_DWORD);
            this.addProperty('npcState', PacketBase.TYPE_BYTE);
        }
    }


    /** 0x025B
     * 更新玩家行会贡献
     */
    export class AvatarguildJiFenDecoder extends Packet {
        public static msgID: number = 0x025B;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwJiFen', PacketBase.TYPE_INT);	// 当前工会积分
            this.addProperty('nChanged', PacketBase.TYPE_INT);	// 增加或者减少
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
            this.addProperty('nHealth', PacketBase.TYPE_DWORD); //健康
            this.addProperty('nSpirte', PacketBase.TYPE_DWORD); //精神
            this.addProperty('nTili', PacketBase.TYPE_DWORD); //体力
            this.addProperty('nYanZhi', PacketBase.TYPE_DWORD); //颜值
            this.addProperty('nXinQing', PacketBase.TYPE_DWORD); //心情

            this.read(data);
        }
    }


    // 0x0228
    // 更新怪物NPC 的feature
    export class AvaterIconDecoder extends Packet {
        public static msgID: number = 0x0228;
        public _instance: AvaterIconDecoder;
        // 对应怪物feature 10个属性
        private propLength = {
            "1": 1,
            "2": 15,
            "3": 2,
            "4": 1,
            "5": 2,
            "6": 4,
            "7": 4,
            "8": 4,
            "9": 4,
            "10": 4
        }
        public constructor() {
            super();
            this.addProperty('dwTmpId', PacketBase.TYPE_INT);//
            this.addProperty('crettype', PacketBase.TYPE_BYTE);//
            this.addProperty("dwCount", PacketBase.TYPE_INT);
        }
        /**
         * 获得单例
         */
        public static getInstance(): AvaterIconDecoder {
            let Class: any = this;
            if (!Class._instance) {
                Class._instance = new AvaterIconDecoder();
            }
            return Class._instance;
        }

        public read(data: Laya.Byte): number {
            data.pos = super.read(data);
            data.endian = Laya.Byte.LITTLE_ENDIAN;
            let cret: GameObject.Creature = GameApp.MainPlayer.findViewObj(this.getValue("dwTmpId"), this.getValue('crettype'));
            if (cret == null) {
                return 0;
            }
            let spos: number = data.pos;
            let bcount: number = this.getValue("dwCount");
            let index: number;
            while (data.pos < data.length && (data.pos - spos <= bcount)) {
                index = data.getUint8();
                switch (index) {
                    case 1:// 1此人物的类型，比如1==玩家，2==NPC，3==怪,4宝宝,5，人形怪，6英雄
                        {
                            cret.feature.btCretType = data.getByte();
                            break;
                        }
                    case 2://昵称外观信息stSimpleFeature结构
                        {
                            cret.feature.simpleFeature.sex = data.getByte();
                            cret.feature.simpleFeature.job = data.getByte();
                            data.getByte();
                            data.getInt32();
                            cret.feature.simpleFeature.weaponId = data.getInt32();
                            cret.feature.simpleFeature.dress = data.getInt32();
                            break;
                        }
                    case 3://称号
                        {
                            cret.feature.nTitleId = data.getInt16();
                            break;
                        }
                    case 4://战场类型
                        {
                            cret.feature.btBattleCamp = data.getByte();
                            break;
                        }
                    case 5:// 翅膀Id
                        {
                            cret.feature.dwWingId = data.getInt16();
                            break;
                        }
                    case 6://外观 位状态信息
                        {
                            cret.feature.n_bo_AllFeature = data.getInt32();
                            break;
                        }
                    case 7:// 怪物声音类型
                        {
                            (cret.feature as ProtoCmd.AnimalFeature).dwMonsterAudioId = data.getInt32();
                            break;
                        }
                    case 8://BOSS刷新时间
                        {
                            (cret.feature as ProtoCmd.AnimalFeature).dwRefreshTime = data.getInt32();
                            break;
                        }
                    case 9://主人ID;
                        {
                            (cret.feature as ProtoCmd.AnimalFeature).dwMasterTmpID = data.getInt32();
                            break;
                        }
                    case 10://NPC 怪物基本ID  
                        {
                            (cret.feature as ProtoCmd.AnimalFeature).dwCretTypeId = data.getInt32();
                            break;
                        }
                    default:
                        {
                            break;
                        }
                }
            }
            return 0;
        }
    }

    // 0x0229
    // 更新玩家的feature
    export class PlayerIconDecoder extends Packet {
        public static msgID: number = 0x0229;
        public _instance: PlayerIconDecoder;
        private propLength = {
            "1": 1,
            "2": 15,
            "3": 2,
            "4": 1,
            "5": 2,
            "6": 4,
            "7": 4,
            "8": 1,
            "9": 4,
            "10": 1,
            "11": 4,
            "12": 1,
            "13": 4
        }
        public constructor() {
            super();
            this.addProperty('dwTmpId', PacketBase.TYPE_INT);//
            this.addProperty('crettype', PacketBase.TYPE_BYTE);//
            this.addProperty("dwCount", PacketBase.TYPE_INT);
        }
        /**
         * 获得单例
         */
        public static getInstance(): PlayerIconDecoder {
            let Class: any = this;
            if (!Class._instance) {
                Class._instance = new PlayerIconDecoder();
            }
            return Class._instance;
        }

        public read(data: Laya.Byte): number {
            data.pos = super.read(data);
            data.endian = Laya.Byte.LITTLE_ENDIAN;
            let index: number;
            let cret: GameObject.Player = GameApp.MainPlayer.findViewObj(this.getValue("dwTmpId"), this.getValue('crettype')) as GameObject.Player;
            if (cret == null) {
                return 0;
            }
            let spos: number = data.pos;
            let bcount: number = this.getValue("dwCount");
            while (data.pos < data.length && (data.pos - spos < bcount)) {
                index = data.getUint8();
                if (data.pos + this.propLength[index] > data.length) {
                    return 0;
                }
                switch (index) {
                    case 1://类型
                        {
                            cret.feature.btCretType = data.getByte();
                            break;
                        }
                    case 2://
                        {
                            cret.feature.simpleFeature.sex = data.getByte();
                            cret.feature.simpleFeature.job = data.getByte();
                            data.getByte();
                            data.getInt32();
                            cret.feature.simpleFeature.weaponId = data.getInt32();
                            cret.feature.simpleFeature.dress = data.getInt32();
                            break;
                        }
                    case 3://称号
                        {
                            cret.feature.nTitleId = data.getInt16();
                            break;
                        }
                    case 4://战场类型
                        {
                            cret.feature.btBattleCamp = data.getByte();
                            break;
                        }
                    case 5:// 翅膀Id
                        {
                            cret.feature.dwWingId = data.getInt16();
                            break;
                        }
                    case 6://外观 位状态信息
                        {
                            cret.feature.n_bo_AllFeature = data.getInt32();
                            break;
                        }
                    case 7://队伍ID
                        {
                            cret.feature.btGroupId = data.getUint32();
                            break;
                        }
                    case 8://是否是队长	
                        {
                            cret.feature.btGroupMaster = data.getByte();
                            break;
                        }
                    case 9: 4  // 氏族ID  公会ID
                        {
                            cret.feature.dwClanId = data.getUint32();
                            break;
                        }
                    case 10:// 1  行会职位  
                        {
                            cret.feature.btClanMaster = data.readByte();
                            break;
                        }
                    case 11://vip类型
                        {
                            cret.feature.dwVip = data.getUint32();
                            break;
                        }
                    case 12://名字颜色 0是正常的，1灰，2黄，3红
                        {
                            cret.feature.btNameColor = data.getUint8();
                            break;
                        }
                    case 13://pk值
                        {
                            cret.feature.wNowKilling = data.getInt32();
                            break;
                        }
                    default:
                        {
                            break;
                        }
                }
            }
            return 0;
        }
    }

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
            this.addProperty('wX', PacketBase.TYPE_WORD);           //坐标
            this.addProperty('wY', PacketBase.TYPE_WORD);

            if (data) {
                this.read(data);
            }
            this.cmd = 0x02A0;
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
            this.addProperty('dwEffId', PacketBase.TYPE_DWORD);	//当前效果ID
            this.addProperty('btQuality', PacketBase.TYPE_BYTE);//物品品质
            this.addProperty('i64OwnerId', PacketBase.TYPE_INT64);//归属权ID
            this.addProperty("coldTime", PacketBase.TYPE_BYTE);//消失时间戳
            this.read(data);
        }
    }


    /**
     * 接收服务器存档
     */
    export class RecvTypeKeyValue extends Packet {
        public static msgID: number = 0x02B9;//185
        public values = [];
        public count: number = 0;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('count', PacketBase.TYPE_INT);
            this.read(data);
        }
        public read(data: Laya.Byte): number {
            data.pos = super.read(data);
            this.count = this.getValue('count');
            if (this.count > 0) {
                for (let i: number = 0; i < this.count; ++i) {
                    this.values[i] = new TypeKeyValue(data);
                    console.log('RecvTypeKeyValue-->>', this.values[i].getValue('type'), this.values[i].getValue('key'), this.values[i].getValue('value'))
                }
            }
            return 0;
        }

        public clear(): void {
            super.clear();
            for (let i: number = 0; i < this.values.length; ++i) {
                this.values[i].clear();
                this.values[i] = null;
            }
            this.values.length = 0;
            this.values = null;
        }
    }

    /**
     * 有则更新，没则增加
     */
    export class AddTypeKeyValue extends Packet {
        public static msgID: number = 0x02BA; // 186
        public value: TypeKeyValue = new TypeKeyValue();
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('value', PacketBase.TYPE_BYTES, this.value.size(), this.value);
            this.read(data)
        }
    }

    /**
     * 新手引导进度
     */
    export class SUBCMD_QUESTBOOLDATA extends Packet {
        public static msgID: number = 0x02B5; // 181
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('value', PacketBase.TYPE_BYTES, 256);
            this.read(data)
        }
    }
}
