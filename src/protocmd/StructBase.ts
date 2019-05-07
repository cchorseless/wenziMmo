// TypeScript file
enum JOB_TYPE {
    JOB_WARRIOR = 1,
    JOB_MAGE = 2,
    JOB_MONK = 3,
}

enum EQUIP_POS_TYPE {
    EQUIP_HEADDRESS,			//帽子
    EQUIP_NECKLACE,				//项链
    EQUIP_CLOTHES,				//衣服
    EQUIP_WEAPONS,				//武器
    EQUIP_BRACELET_LEFT,		//左手镯
    EQUIP_BRACELET_RIGHT,		//右手镯
    EQUIP_RING_LEFT,			//左戒指
    EQUIP_RING_RIGHT,			//右戒指
    EQUIP_SHOES,				//鞋
    EQUIP_BELT = 9,				//腰带

    EQUIP_ALL,
}

enum PACKAGE_TYPE {
    ITEMCELLTYPE_NONE,				// 不是格子，用于丢弃或捡到物品
    ITEMCELLTYPE_EQUIP,				// 装备
    ITEMCELLTYPE_STORE,				// 仓库
    ITEMCELLTYPE_PACKAGE,			// 包裹的格子
    ITEMCELLTYPE_SOLDITEM,			//已出售物品
    ITEMCELLTYPE_LINGSHBAOGUO,		//临时包裹

    //-----
    ITEMCELLTYPE_PLAYER_EQUIP = 50,		//人物战装(类型区分,不是实际包裹)
    ITEMCELLTYPE_PLAYER_LEGENDEQUIP,	//人物神装(类型区分,不是实际包裹)
    ITEMCELLTYPE_PLAYER_RUNEEQUIP,		//符文
    ITEMCELLTYPE_HERO_EQUIP,			//英雄装备
    //====================
    //客户端已使用
    ITEMCELLTYPE_VIRTUAL = 200,	// 虚拟
}

enum emNonpareilType {
    NONPAREIL_TYPE_NULL,			//没有极品

    NONPAREIL_TYPE_MaxHP,                   //最大血量
    NONPAREIL_TYPE_MaxMP,                   //最大蓝量
    NONPAREIL_TYPE_MaxAtk,                  //物理/魔法/道术攻击上限全部
    NONPAREIL_TYPE_MinAtk,                  //物理/魔法/道术攻击下限全部
    NONPAREIL_TYPE_MaxDC,                   //物理攻击上限值,攻击力上限，影响所有职业普通攻击和战士技能的最大伤害。
    NONPAREIL_TYPE_MinDC,                   //物理攻击下限值,攻击力下限，影响所有职业普通攻击和战士技能的最小伤害。
    NONPAREIL_TYPE_MaxMC,                   //自然魔法攻击上限值,魔法攻击上限，影响法师技能的最大伤害。
    NONPAREIL_TYPE_MinMC,                   //自然魔法攻击下限值,魔法攻击下限，影响法师技能的最小伤害。
    NONPAREIL_TYPE_MaxSC,                   //灵魂魔法攻击上限值,道士攻击上限，影响法师技能的最大伤害。
    NONPAREIL_TYPE_MinSC,                   //灵魂魔法攻击下限值,道术攻击下限，影响法师技能的最小伤害。
    NONPAREIL_TYPE_MaxAC,                   //物理防御上限值,防御上限，影响受到物理攻击时可以降低的伤害。
    NONPAREIL_TYPE_MinAC,                   //物理防御下限值,防御下限，影响受到物理攻击时可以降低的伤害。
    NONPAREIL_TYPE_MaxMAC,                  //全系法术防御上限值,魔法防御上限，影响受到魔法和道术攻击时可以降低的伤害。
    NONPAREIL_TYPE_MinMAC,                  //全系法术防御下限值,魔法防御下限，影响受到魔法和道术攻击时可以降低的伤害。
    NONPAREIL_TYPE_Hit,                     //命中(准确),在攻击时，增加命中目标的几率。当自身准确大于目标闪避时，目标不能闪避攻击
    NONPAREIL_TYPE_HitRate,                 //命中的概率，准确值折算成命中率
    NONPAREIL_TYPE_Juck,                    //闪避,影响受到所有攻击可以闪避的概率
    NONPAREIL_TYPE_JuckRate,                //闪避的概率，闪避值折算成闪避率
    NONPAREIL_TYPE_Crit,                    //暴击,在攻击时，增加暴击的几率。每160点暴击增加1%的暴击率
    NONPAREIL_TYPE_CritRate,                //暴击率, 暴击的概率
    NONPAREIL_TYPE_Toughness,               //韧性(暴抗),受攻击时，减少被暴击的几率。每160点韧性抵消对方1%的暴击率
    NONPAREIL_TYPE_ToughnessRate,           //(韧性率)抗暴率, 抵抗暴击的概率
    NONPAREIL_TYPE_AtkCrit,                 //暴击伤害,暴击时，暴伤越高，可以造成更多的额外伤害
    NONPAREIL_TYPE_Lucky,                   //幸运,幸运值越高，出现攻击（所有）上限的几率越大，为9时必出
    NONPAREIL_TYPE_RestoreHp,               //每次恢复血量，正负,每N秒自动回复生命//生命恢复是英雄抗怪能力最重要的指标。
    NONPAREIL_TYPE_RestoreMp,               //每次恢复蓝量，正负,每N秒自动回复法力
    NONPAREIL_TYPE_MoveSpeed,               //增加人物行走时的移动速度
    NONPAREIL_TYPE_PalsyRate,               //麻痹概率
    NONPAREIL_TYPE_PalsyResi,               //抗麻痹概率
    NONPAREIL_TYPE_UnionAtkRate,            //合击威力
    NONPAREIL_TYPE_IncAtkWarrior,           //对战士伤害增加
    NONPAREIL_TYPE_DecAtkWarrior,           //受战士伤害减少
    NONPAREIL_TYPE_IncAtkMage,              //对法师伤害增加
    NONPAREIL_TYPE_DecAtkMage,              //受法师伤害减少
    NONPAREIL_TYPE_IncAtkMonk,              //对道士伤害增加
    NONPAREIL_TYPE_DecAtkMonk,              //受道士伤害减少
    NONPAREIL_TYPE_IncAtkMonster,           //对怪物伤害增加
    NONPAREIL_TYPE_DecAtkMonster,           //受怪物伤害减少
    NONPAREIL_TYPE_IncAtkBoss,              //对BOSS伤害增加
    NONPAREIL_TYPE_DecAtkBoss,              //受BOSS伤害减少
    NONPAREIL_TYPE_IncAtkHero,              //增加对英雄伤害
    NONPAREIL_TYPE_DecAtkHero,              //减少受英雄伤害
    NONPAREIL_TYPE_Energy,                  //内功值(能量)，护盾能量最大值
    NONPAREIL_TYPE_RestoreEnergy,           //恢复内功值
    NONPAREIL_TYPE_EnergyResi,              //内功抵消伤害比例
    NONPAREIL_TYPE_IncDamage,               //增伤,提高攻击时可以造成的伤害（百分比）
    NONPAREIL_TYPE_DecDamage,               //减伤,降低受到的所有伤害（百分比）
    NONPAREIL_TYPE_IncBossCrit,				//增加对BOSS的暴击
    NONPAREIL_TYPE_IncBossAtkCrit,			//增加对BOSS的暴伤
    NONPAREIL_TYPE_DecUnionAtkDamage,		//受合击伤害减少
    NONPAREIL_TYPE_DecAtkCritDamage,		//受暴击伤害减少
    NONPAREIL_TYPE_RestoreAnger,			//怒气恢复率
    NONPAREIL_TYPE_UAToMonster,				//合击对怪增伤率
    NONPAREIL_TYPE_UAToPlayer,				//合击对人增伤率

    NONPAREIL_TYPE_MAXCOUNT,				//最大
};

class CfgItemDB {
    public baseID: number;
    public name: string;
    public level: number;
    public type: number;
    public quality: number;
    public pos: number;
    public sex: number;
    public job: number;
    public warriorEffID: number;
    public mageEffID: number;
    public monkEffID: number;
    public color: number;
    public desc: string;
    public zslevel: number;
    public intensify: number;
    public constructor() {

    }
}



class CfgEffectDB {
    public dwID: number;						//效果ID
    public deleted: number;
    public szName: string;	                    //效果名字
    public dwNextId: number;					//升级后效果ID
    public nMaxHP: number;				//最大血量
    public nMaxMP: number;				//最大蓝量
    public nMaxAtk: number;			//物理/魔法/道术攻击上限全部
    public nMinAtk: number;			//物理/魔法/道术攻击下限全部
    public nMaxDC: number;				//物理攻击上限值,攻击力上限，影响所有职业普通攻击和战士技能的最大伤害。
    public nMinDC: number;				//物理攻击下限值,攻击力下限，影响所有职业普通攻击和战士技能的最小伤害。
    public nMaxMC: number;				//自然魔法攻击上限值,魔法攻击上限，影响法师技能的最大伤害。
    public nMinMC: number;				//自然魔法攻击下限值,魔法攻击下限，影响法师技能的最小伤害。
    public nMaxSC: number;				//灵魂魔法攻击上限值,道士攻击上限，影响法师技能的最大伤害。
    public nMinSC: number;				//灵魂魔法攻击下限值,道术攻击下限，影响法师技能的最小伤害。
    public nMaxAC: number;				//物理防御上限值,防御上限，影响受到物理攻击时可以降低的伤害。
    public nMinAC: number;				//物理防御下限值,防御下限，影响受到物理攻击时可以降低的伤害。
    public nMaxMAC: number;			//全系法术防御上限值,魔法防御上限，影响受到魔法和道术攻击时可以降低的伤害。
    public nMinMAC: number;			//全系法术防御下限值,魔法防御下限，影响受到魔法和道术攻击时可以降低的伤害。
    public nHit: number;				//命中(准确),在攻击时，增加命中目标的几率。当自身准确大于目标闪避时，目标不能闪避攻击
    public nHitRate: number;			//命中的概率，准确值折算成命中率
    public nJuck: number;				//闪避,影响受到所有攻击可以闪避的概率
    public nJuckRate: number;			//闪避的概率，闪避值折算成闪避率
    public nCrit: number;				//暴击,在攻击时，增加暴击的几率。每160点暴击增加1%的暴击率
    public nCritRate: number;			//暴击率, 暴击的概率
    public nToughness: number;			//韧性(暴抗),受攻击时，减少被暴击的几率。每160点韧性抵消对方1%的暴击率
    public nToughnessRate: number;		//(韧性率)抗暴率, 抵抗暴击的概率
    public nAtkCrit: number;			//暴击伤害,暴击时，暴伤越高，可以造成更多的额外伤害
    public nLucky: number;				//幸运,幸运值越高，出现攻击（所有）上限的几率越大，为9时必出
    public nRestoreHp: number;			//每次恢复血量，正负,每N秒自动回复生命//生命恢复是英雄抗怪能力最重要的指标。
    public nRestoreMp: number;			//每次恢复蓝量，正负,每N秒自动回复法力
    public nMoveSpeed: number;			//增加人物行走时的移动速度
    public nPalsyRate: number;			//麻痹概率
    public nPalsyResi: number;			//抗麻痹概率
    public nUnionAtkRate: number;		//合击威力
    public nIncAtkWarrior: number;		//对战士伤害增加
    public nDecAtkWarrior: number;		//受战士伤害减少
    public nIncAtkMage: number;		//对法师伤害增加
    public nDecAtkMage: number;		//受法师伤害减少
    public nIncAtkMonk: number;		//对道士伤害增加
    public nDecAtkMonk: number;		//受道士伤害减少
    public nIncAtkMonster: number;		//对怪物伤害增加
    public nDecAtkMonster: number;		//受怪物伤害减少
    public nIncAtkBoss: number;		//对BOSS伤害增加
    public nDecAtkBoss: number;		//受BOSS伤害减少
    public nIncAtkHero: number;		//增加对英雄伤害
    public nDecAtkHero: number;		//减少受英雄伤害
    public nEnergy: number;			//内功值(能量)，护盾能量最大值
    public nRestoreEnergy: number;		//恢复内功值
    public nEnergyResi: number;		//内功抵消伤害比例
    public nIncDamage: number;			//增伤,提高攻击时可以造成的伤害（百分比）
    public nDecDamage: number;			//减伤,降低受到的所有伤害（百分比）
    public nIncBossCrit: number;		//增加对BOSS的暴击率
    public nIncBossAtkCrit: number;	//增加对BOSS的暴伤值
    public nDecUnionAtkDamage: number; //受合击伤害减少率
    public nDecAtkCritDamage: number;	//受暴击伤害减少率
    public nRestoreAnger: number;		//怒气恢复率（万分比）
    public nUAToMonster: number;		//合击对怪增伤率
    public nUAToPlayer: number;		//合击对人增伤率
    public nUASkillLvl: number;		//合击技能等级
    public nHpPer: number;             //生命万分比

    public constructor() {

    }
}

class CfgMonsterDB {
    public ID: number;
    public name: string;

    public constructor() {

    }
}

class Int64 {
    private _bytes: Laya.Byte;
    private _id: string = "";
    public constructor(data: any) {
        this._bytes = new Laya.Byte;
        this._bytes.endian = Laya.Byte.LITTLE_ENDIAN;
        data.readBytes(this._bytes, 0, 8);
        this._id = this.int64ToStr();
    }

    public byteStr(): string {
        let str: string = "";
        str = this._bytes.readUTFBytes(this._bytes.length);
        this._bytes.pos = 0;
        return str;
    }

    public get data(): Laya.Byte {
        return this._bytes;
    }

    public get id(): string {
        return this._id;
    }

    public toString(): string {
        return this.int64ToNumber() + '';
    }

    public int64ToStr(): string {
        let h = this._bytes.getInt32();
        let l = this._bytes.getInt32();
        this._bytes.pos = 0;
        return h + '_' + l;
    }

    public int64ToNumber(): number {
        let num: number = 0;
        let nk: number = 0;
        for (let i = 0; i < 8; i++) {
            nk = this._bytes.getUint8();
            num = num + (nk * Math.pow(2, 8 * i));
        }

        if (nk & 0x80) {  //最高位是1
            num = 18446744073709551616 - num + 1;
            num = -num;
        }
        this._bytes.pos = 0;
        return num;
    }
}

class SimpleFeature extends PacketBase {
    public constructor() {
        super();
        this.addProperty('sex', PacketBase.TYPE_BYTE);
        this.addProperty('job', PacketBase.TYPE_BYTE);
        this.addProperty('hair', PacketBase.TYPE_BYTE);
        this.addProperty('dwFaceId', PacketBase.TYPE_DWORD);
        this.addProperty('weapon', PacketBase.TYPE_DWORD);
        this.addProperty('dress', PacketBase.TYPE_DWORD);
    }
}

class CretFeature extends PacketBase {
    public feature: SimpleFeature = new SimpleFeature;

    public constructor() {
        super();
        this.addProperty('btCretType', PacketBase.TYPE_BYTE);//  1  此人物的类型，比如1==玩家，2==NPC，3==怪,4宝宝 ,  5，人形怪，6英雄
        this.addProperty('feature', PacketBase.TYPE_BYTES, this.feature.size());//  昵称外观信息stSimpleFeature结构
        this.addProperty('nTitleId', PacketBase.TYPE_WORD);//称号ID
        this.addProperty('btBattleCamp', PacketBase.TYPE_BYTE);
        this.addProperty('dwWingId', PacketBase.TYPE_WORD);//翅膀Id
        this.addProperty('n_bo_AllFeature', PacketBase.TYPE_DWORD);                  //外观 位状态信息
    }

    public read(data: Laya.Byte): number {
        let pos: number = super.read(data);
        this.feature.read(this.getValue('feature'));
        return pos;
    }
}


class AnimalFeature extends CretFeature {
    public constructor() {
        super()
        this.addProperty('dwMonsterAudioId', PacketBase.TYPE_DWORD);// 怪物声音类型
        this.addProperty("dwRefreshTime", PacketBase.TYPE_DWORD);//BOSS刷新时间
        this.addProperty('dwMasterTmpID', PacketBase.TYPE_DWORD);                    //主人ID;
        this.addProperty('dwCretTypeId', PacketBase.TYPE_INT);//  4  NPC 怪物基本ID  
    }
}

class PlayerFeature extends CretFeature {
    public constructor() {
        super();
        this.addProperty('btGroupId', PacketBase.TYPE_DWORD);//队伍ID
        this.addProperty('btGroupMaster', PacketBase.TYPE_BYTE);//是否是队长			
        this.addProperty('dwClanId', PacketBase.TYPE_INT);//  4  氏族ID  公会ID
        this.addProperty('btClanMaster', PacketBase.TYPE_BYTE);// 1  是否族长  
        this.addProperty('dwVip', PacketBase.TYPE_DWORD); //vip类型
        this.addProperty("btNameColor", PacketBase.TYPE_BYTE);//名字颜色 0是正常的，1灰，2黄，3红
        this.addProperty("wNowKilling", PacketBase.TYPE_DWORD);//pk值
    }
}

class SelectPlayerInfo extends PacketBase {

    public feature: SimpleFeature = new SimpleFeature;

    public constructor(data: Laya.Byte) {
        super();
        this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
        this.addProperty('nlevel', PacketBase.TYPE_INT);
        this.addProperty('mapid', PacketBase.TYPE_WORD);
        this.addProperty('cloneid', PacketBase.TYPE_WORD);
        this.addProperty('homemapid', PacketBase.TYPE_WORD);
        this.addProperty('conid', PacketBase.TYPE_WORD);
        this.addProperty('countryId', PacketBase.TYPE_BYTE);
        this.addProperty('ngmlvl', PacketBase.TYPE_BYTE);
        this.addProperty('Feature', PacketBase.TYPE_BYTES, this.feature.size(), this.feature);
        this.addProperty('dwUserOnlyId', PacketBase.TYPE_BYTES, 8);
        this.addProperty('btisdel', PacketBase.TYPE_BOOL);
        this.addProperty('posdeltime', PacketBase.TYPE_INT);
        this.addProperty('lastlogintime', PacketBase.TYPE_INT);
        this.addProperty('remaindeltime', PacketBase.TYPE_INT);
        this.addProperty("playerBanTime", PacketBase.TYPE_INT);//封号时间
        this.addProperty('lastloginip', PacketBase.TYPE_BYTES, 4);
        if (data) {
            data.pos += this.read(data);
        }
    }

    public read(data: Laya.Byte) {
        data.pos += super.read(data);
        return this._bytes.length;
    }

    public clear(): void {
        super.clear();
        this.feature = null;
    }
}

class CretLocation extends PacketBase {
    public constructor() {
        super();
        this.addProperty('mapid', PacketBase.TYPE_INT);//  地图编号  
        this.addProperty('ncurx', PacketBase.TYPE_WORD);//  2  所在坐标X  
        this.addProperty('ncury', PacketBase.TYPE_WORD);//   所在坐标Y  
        this.addProperty('ncurz', PacketBase.TYPE_WORD);//   所在坐标Z 
    }
}

class ArpgAbility extends PacketBase {
    public constructor() {
        super();
        this.addProperty('nMaxHP', PacketBase.TYPE_INT); //最大血量
        this.addProperty('nMaxMP', PacketBase.TYPE_INT); //最大蓝量
        this.addProperty("nMaxAttack", PacketBase.TYPE_INT);//攻击上限
        this.addProperty("nMinAttack", PacketBase.TYPE_INT);//攻击下限
        this.addProperty('nMaxDC', PacketBase.TYPE_INT); //物理攻击上限值
        this.addProperty('nMinDC', PacketBase.TYPE_INT); //物理攻击下限值
        this.addProperty('nMaxMC', PacketBase.TYPE_INT); //自然魔法攻击上限值
        this.addProperty('nMinMC', PacketBase.TYPE_INT); //自然魔法攻击下限值
        this.addProperty('nMaxSC', PacketBase.TYPE_INT); //灵魂魔法攻击上限值
        this.addProperty('nMinSC', PacketBase.TYPE_INT); //灵魂魔法攻击下限值
        this.addProperty('nMaxAC', PacketBase.TYPE_INT); //物理防御上限值
        this.addProperty('nMinAC', PacketBase.TYPE_INT); //物理防御下限值
        this.addProperty('nMaxMAC', PacketBase.TYPE_INT); //全系法术防御上限值
        this.addProperty('nMinMAC', PacketBase.TYPE_INT); //全系法术防御下限值
        this.addProperty('nHit', PacketBase.TYPE_INT); //命中
        this.addProperty("nHitRatio", PacketBase.TYPE_INT);//命中率
        this.addProperty('nJuck', PacketBase.TYPE_INT); //闪避
        this.addProperty("nJuckRatio", PacketBase.TYPE_INT);//闪避率
        this.addProperty('nCrit', PacketBase.TYPE_INT); //暴击
        this.addProperty("nCritRatio", PacketBase.TYPE_INT);//暴击率
        this.addProperty('nCritResi', PacketBase.TYPE_INT); //暴抗
        this.addProperty("nCritResiRatio", PacketBase.TYPE_INT);//暴抗率
        this.addProperty('nAtkCrit', PacketBase.TYPE_INT); //暴击伤害,每次暴击额外增加的伤害
        this.addProperty('nLucky', PacketBase.TYPE_INT); //幸运
        this.addProperty('nRestoreHp', PacketBase.TYPE_INT); //每次恢复血量，正负
        this.addProperty('nRestoreMp', PacketBase.TYPE_INT); //每次恢复蓝量，正负
        this.addProperty("nMoveSpeed", PacketBase.TYPE_INT);//移动速度
        this.addProperty("nPalsyRatio", PacketBase.TYPE_INT);//麻痹几率
        this.addProperty("nPalsyResiRatio", PacketBase.TYPE_INT);//抗麻痹几率
        this.addProperty("nCoAtkPower", PacketBase.TYPE_INT);//合击威力
        this.addProperty("nAtkAdd1", PacketBase.TYPE_INT);//对战士伤害增加
        this.addProperty("nAtkReduce1", PacketBase.TYPE_INT);//受战士伤害减少
        this.addProperty("nAtkAdd2", PacketBase.TYPE_INT);	//对法师伤害增加
        this.addProperty("nAtkReduce2", PacketBase.TYPE_INT);//受法师伤害减少
        this.addProperty("nAtkAdd3", PacketBase.TYPE_INT);//对道士伤害增加
        this.addProperty("nAtkReduce3", PacketBase.TYPE_INT);//受道士伤害减少
        this.addProperty("nAtkAddMon", PacketBase.TYPE_INT);	//对怪物伤害增加
        this.addProperty("nAtkReduceMon", PacketBase.TYPE_INT);	//受怪物伤害减少
        this.addProperty("nAtkAddBoss", PacketBase.TYPE_INT);//对BOSS伤害增加
        this.addProperty("nAtkReduceBoss", PacketBase.TYPE_INT);//受BOSS伤害减少
        this.addProperty("nAtkAddHero", PacketBase.TYPE_INT);//增加对英雄伤害
        this.addProperty("nAtkReduceHero", PacketBase.TYPE_INT);//减少受英雄伤害
        this.addProperty("nInnerValue", PacketBase.TYPE_INT);//内功值
        this.addProperty("nInnerRestore", PacketBase.TYPE_INT);//内功恢复
        this.addProperty("nInnerResi", PacketBase.TYPE_INT);//内功抵伤
        this.addProperty("nFinalDamageAdd", PacketBase.TYPE_INT);//最终伤害增加
        this.addProperty("nFinalDamageReduce", PacketBase.TYPE_INT);//最终伤害减免
        this.addProperty("nCritAdd2BOSS", PacketBase.TYPE_INT);//增加对BOSS的暴击
        this.addProperty("nAtkCritAdd2BOSS", PacketBase.TYPE_INT);//增加对BOSS的爆伤
        this.addProperty("nCoAtkReduce", PacketBase.TYPE_INT);//受合击伤害减少
        this.addProperty("nCritReduce", PacketBase.TYPE_INT);//受暴击伤害减少
        this.addProperty("nRestoreAnger", PacketBase.TYPE_INT);//怒气恢复(万分比)	
        this.addProperty("nCoAtt2Monster", PacketBase.TYPE_INT);//合击对怪物增伤率
        this.addProperty("nCoAtt2Player", PacketBase.TYPE_INT);//合击对怪物增伤害
        this.addProperty("nCoAttLvl", PacketBase.TYPE_INT);//合击技能等级
        this.addProperty("nHpPer", PacketBase.TYPE_INT);//生命万分比
    }
}

class ItemLocation extends PacketBase {

    public constructor() {
        super();
        this.addProperty('btLocation', PacketBase.TYPE_CHAR);
        this.addProperty('btTableID', PacketBase.TYPE_CHAR);
        this.addProperty('btIndex', PacketBase.TYPE_CHAR);
    }
}

class Nonpareil {
    public btNpFrom: number;
    public btNpType: number;
    public dwNpNum: number;
    public constructor() {
    }
}

class ItemBase extends PacketBase {
    public i64ItemID: Int64;					//8物品id
    public dwBaseID: number;					//4物品基本id
    public location: ItemLocation;              //3存储位置
    public dwLevel: number;						//4当前等级
    public nValue: number;							//4当前经验
    public nMaxValue: number;						//4下次升级需要经验
    public boIdent: number;						//1是否鉴定
    public nDura: number;							//4当前耐久度
    public nMaxDura: number;						//4最大耐久度
    public dwCount: number;                       //4物品数量  0..100
    public dwBinding: number;                     //4是否绑定
    public btBornFrom: number;					//1物品来源
    public dwEffId: number;						//4当前效果ID
    public btQuality: number;                     //1品质
    public btStrengCount: number;					//1强化1
    public dwExpireTime: number;					//4物品到期时间(秒)
    public btNpPropertyCount: number;				//1极品属性条目数--55
    public stNpProperty: Array<Nonpareil>;          //60属性
    public ExtensionProperty: Laya.Byte;		//预留10字节，做扩充

    public defaultName: string;
    public constructor(data: Laya.Byte) {
        super();

        this.location = new ItemLocation;
        this.stNpProperty = new Array<Nonpareil>();
        this.ExtensionProperty = new Laya.Byte;
        this.ExtensionProperty.endian = Laya.Byte.LITTLE_ENDIAN;


        this.addProperty('i64ItemID', PacketBase.TYPE_INT64);	//物品id
        this.addProperty('dwBaseID', PacketBase.TYPE_INT);	//物品基本id
        this.addProperty('Location', PacketBase.TYPE_BYTES, this.location.size(), this.location);	//存储位置
        this.addProperty('dwLevel', PacketBase.TYPE_DWORD);//当前等级
        this.addProperty('nValue', PacketBase.TYPE_INT); //当前存储的经验
        this.addProperty('nMaxValue', PacketBase.TYPE_INT);//存储的最大经验
        this.addProperty('boIdent', PacketBase.TYPE_BOOL);	//是否鉴定
        this.addProperty('nDura', PacketBase.TYPE_INT);	//当前耐久度
        this.addProperty('nMaxDura', PacketBase.TYPE_INT);	//最大耐久度
        this.addProperty('dwCount', PacketBase.TYPE_INT);	//物品数量	0..100
        this.addProperty('dwBinding', PacketBase.TYPE_DWORD);	//绑定信息
        this.addProperty('btBornFrom', PacketBase.TYPE_BYTE);	//物品来源
        this.addProperty('dwEffId', PacketBase.TYPE_DWORD);		 //当前效果ID
        this.addProperty('btQuality', PacketBase.TYPE_BYTE);	//物品品质
        this.addProperty('btStrengCount', PacketBase.TYPE_BYTE);	//强化次数
        this.addProperty('dwExpireTime', PacketBase.TYPE_DWORD);//过期时间	
        this.addProperty('btNpPropertyCount', PacketBase.TYPE_BYTE);	//极品属性条目数
        this.addProperty('UnionData', PacketBase.TYPE_BYTES, 60);
        this.addProperty('ExtensionProperty', PacketBase.TYPE_BYTES, 10);	//预留10字节，做扩充
        this.read(data);
    }

    public read(data: Laya.Byte): number {
        if (data) {
            data.pos += super.read(data);
            this.readProperty();
            return data.pos;
        }
        return 0;
    }

    public readProperty() {
        this.i64ItemID = this.getValue('i64ItemID');
        this.dwBaseID = this.getValue('dwBaseID');
        //this.location = this.getValue('Location');
        this.dwLevel = this.getValue('dwLevel');
        this.nValue = this.getValue('nValue');
        this.nMaxValue = this.getValue('nMaxValue');
        this.boIdent = this.getValue('boIdent');
        this.nDura = this.getValue('nDura');
        this.nMaxDura = this.getValue('nMaxDura');
        this.dwCount = this.getValue('dwCount');
        this.dwBinding = this.getValue('dwBinding');
        this.btBornFrom = this.getValue('btBornFrom');
        this.dwEffId = this.getValue('dwEffId');
        this.btQuality = this.getValue('btQuality');
        this.btStrengCount = this.getValue('btStrengCount');
        this.dwExpireTime = this.getValue('dwExpireTime');
        this.btNpPropertyCount = this.getValue('btNpPropertyCount');

        for (let i = 0; i < this.stNpProperty.length; ++i) {
            this.stNpProperty[i] = null
        }
        this.stNpProperty.length = 0;

        if (this.btNpPropertyCount > 0) {
            let npdata: Laya.Byte = new Laya.Byte();;
            npdata.endian = Laya.Byte.LITTLE_ENDIAN;
            npdata = this.getValue('UnionData');
            for (let j = 0; j < this.btNpPropertyCount; ++j) {
                let np = new Nonpareil();
                np.btNpFrom = npdata.getUint8();
                np.btNpType = npdata.getUint8();
                np.dwNpNum = npdata.getUint32();
                this.stNpProperty.push(np);
            }
        }



        //this.stNpProperty[_MAX_NP_ALL_COUNT] = this.getValue('stNpProperty[_MAX_NP_ALL_COUNT]')
    }
}