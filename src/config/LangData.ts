/**
 * 多语言配置
 * by pipixia
 */
module LangConfig {

    /**
     * 获取等级描述
     * @param zs_level 转生等级
     * @param lvl 等级
     */
    export function getLevelDes(zs_level, lvl): string {
        let str = '';
        if (zs_level > 0) {
            str += zs_level + '转'
        }
        if (lvl > 0) {
            str += lvl + '级'
        }
        return str;
    }

    /**
     * 获取大数字的描述
     * @param n 
     */
    export function getBigNumberDes(n: number): string {
        let str = '' + n;
        if (n > 100000) {
            str = '' + Math.ceil(n / 10000) + '万'
        }
        return str
    }

    /**
     * 获取货币图片路径
     * @param coinType 
     */
    export function getCoinImagePicSkin(coinType: EnumData.CoinType): string {
        return 'image/main/icon_coin_' + coinType + '.png';
    }

    /**
     * 职业
     */
    export const JOB_TYPEDES = {
        JOB_NONE: '不限',//通用
        JOB_WARRIOR: '隐门传人',
        JOB_MAGE: '奇侠怪盗',
        JOB_MONK: '灭门孤儿'
    }

    /**
     * 性别
     */
    export const SEX_TYPEDes = {
        SEX_NONE: '不限',
        SEX_MAN: '男',
        SEX_WOMEN: '女'
    }

    /**
     * 装备部位描述
     */
    export const emEquipPositionDes = {
        EQUIP_HEADDRESS: '帽子',
        EQUIP_NECKLACE: '项链',
        EQUIP_CLOTHES: '衣服',
        EQUIP_WEAPONS: '武器',
        EQUIP_BRACELET_LEFT: '手镯',
        EQUIP_BRACELET_RIGHT: '手镯',
        EQUIP_RING_LEFT: '戒指',
        EQUIP_RING_RIGHT: '戒指',
        EQUIP_SHOES: '鞋子',
        EQUIP_BELT: '腰带',
    }



    /**
     * 创建角色枚举描述
     */
    export const createPlayerErrorDes = {
        _CREATEPLAYER_RET_SUCCESS_: '创建成功',
        _CREATEPLAYER_RET_LIMITSTR_: '有非法字符',
        _CREATEPLAYER_RET_HASMAXPLAYER_: '角色超过规定数量 ',
        _CREATEPLAYER_RET_STATEERROR_: '正在游戏 ',
        _CREATEPLAYER_RET_OTHERZONEHASPLAYER_: '其他区还有角色 ',
        _CREATEPLAYER_RET_NAMECHECKFAIL_: '角色名检查没通过',
        _CREATEPLAYER_RET_NAMENUMBERCHECKFAIL_: '角色名不能超过4个以上的数字 ',
        _CREATEPLAYER_RET_SERVERDOWN_: '当前服务器正在维护  	',
        _CREATEPLAYER_RET_NAMEREPEAT_: '角色重名',
        _CREATEPLAYER_RET_ONLYIDERROR_: 'onlyid分配失败  ',
        _CREATEPLAYER_RET_NAMECHECKSVRASSERT_: '角色名检查服务器没有开启  ',
        _CREATEPLAYER_RET_DBCONNECTERROR_: '数据库连接失败 ',
        _CREATEPLAYER_RET_DBINSERTERROR_: '插入失败 ',
        _CREATEPLAYER_RET_COUNTRYERROR_: '国家信息没有找到 ',
    }

    /**
     * 攻击防御描述
     */
    export const emAtkDef_Des = {

    }


    /**
     * 属性描述枚举
     */
    export const emNonpareilTypeDes = {
        NONPAREIL_TYPE_NULL: '没有极品:',
        NONPAREIL_TYPE_MAXHP: '最大血量:',
        NONPAREIL_TYPE_MAXMP: '最大蓝量:',
        NONPAREIL_TYPE_MAXATK: '攻击上限:',
        NONPAREIL_TYPE_MINATK: '攻击下限:',
        NONPAREIL_TYPE_MAXDC: '力道上限:',
        NONPAREIL_TYPE_MINDC: '力道下限:',
        NONPAREIL_TYPE_MAXMC: '柔劲上限:',
        NONPAREIL_TYPE_MINMC: '柔劲下限:',
        NONPAREIL_TYPE_MAXSC: '刚劲上限:',
        NONPAREIL_TYPE_MINSC: '刚劲下限:',
        NONPAREIL_TYPE_MAXAC: '卸力上限:',
        NONPAREIL_TYPE_MINAC: '卸力下限:',
        NONPAREIL_TYPE_MAXMAC: '化劲上限:',
        NONPAREIL_TYPE_MINMAC: '化劲下限:',
        NONPAREIL_TYPE_HIT: '命中:',
        NONPAREIL_TYPE_HITRATE: '命中率:',
        NONPAREIL_TYPE_JUCK: '闪避:',
        NONPAREIL_TYPE_JUCKRATE: '闪避率:',
        NONPAREIL_TYPE_CRIT: '暴击:',
        NONPAREIL_TYPE_CRITRATE: '暴击率:',
        NONPAREIL_TYPE_TOUGHNESS: '韧性:',
        NONPAREIL_TYPE_TOUGHNESSRATE: '抗暴率:',
        NONPAREIL_TYPE_ATKCRIT: '暴击伤害:',
        NONPAREIL_TYPE_LUCKY: '幸运:',
        NONPAREIL_TYPE_RESTOREHP: '每次恢复血量:',
        NONPAREIL_TYPE_RESTOREMP: '每次恢复蓝量:',
        NONPAREIL_TYPE_MOVESPEED: '移动速度:',
        NONPAREIL_TYPE_PALSYRATE: '麻痹概率:',
        NONPAREIL_TYPE_PALSYRESI: '抗麻痹概率:',
        NONPAREIL_TYPE_UNIONATKRATE: '合击威力:',
        NONPAREIL_TYPE_INCATKWARRIOR: '对战士伤害增加:',
        NONPAREIL_TYPE_DECATKWARRIOR: '受战士伤害减少:',
        NONPAREIL_TYPE_INCATKMAGE: '对法师伤害增加:',
        NONPAREIL_TYPE_DECATKMAGE: '受法师伤害减少:',
        NONPAREIL_TYPE_INCATKMONK: '对道士伤害增加:',
        NONPAREIL_TYPE_DECATKMONK: '受道士伤害减少:',
        NONPAREIL_TYPE_INCATKMONSTER: '对怪物伤害增加:',
        NONPAREIL_TYPE_DECATKMONSTER: '受怪物伤害减少:',
        NONPAREIL_TYPE_INCATKBOSS: '对BOSS伤害增加:',
        NONPAREIL_TYPE_DECATKBOSS: '受BOSS伤害减少:',
        NONPAREIL_TYPE_INCATKHERO: '增加对英雄伤害:',
        NONPAREIL_TYPE_DECATKHERO: '减少受英雄伤害:',
        NONPAREIL_TYPE_ENERGY: '内功值:',
        NONPAREIL_TYPE_RESTOREENERGY: '恢复内功值:',
        NONPAREIL_TYPE_ENERGYRESI: '内功抵消伤害比例:',
        NONPAREIL_TYPE_INCDAMAGE: '增伤:',
        NONPAREIL_TYPE_DECDAMAGE: '减伤:',
        NONPAREIL_TYPE_INCBOSSCRIT: '增加对BOSS的暴击:',
        NONPAREIL_TYPE_INCBOSSATKCRIT: '增加对BOSS的暴伤:',
        NONPAREIL_TYPE_DECUNIONATKDAMAGE: '受合击伤害减少:',
        NONPAREIL_TYPE_DECATKCRITDAMAGE: '受暴击伤害减少:',
        NONPAREIL_TYPE_RESTOREANGER: '怒气恢复率:',
        NONPAREIL_TYPE_UATOMONSTER: '合击对怪增伤率:',
        NONPAREIL_TYPE_UATOPLAYER: '合击对人增伤率:',
        NONPAREIL_TYPE_UPCOMBOSKILLLEVEL: ' 合计技能提升等级:',
        NONPAREIL_TYPE_MAXCOUNT: '生命百分比:',
    }


    /**
     * 道具操作错误枚举描述
     */
    export const emItemErrorCodeDes = {
        ITEM_SUCCESS: '成功操作',
        ITEM_FAIL_NOITEM: '没有物品',
        ITEM_FAIL_NOTENOUGH: '物品数量不足以拆分',
        ITEM_FAIL_NOSPACE: '没有剩余的空间',
        ITEM_FAIL_NOT_ENOUGH_GOLD: '人物金币不足',
        ITEM_FAIL_MAX_CARRY_GOLD: '人物金币已达上限值',
        ITEM_FAIL_SAVE_NOT_ENOUGH_GOLD: '仓库金币不足',
        ITEM_FAIL_SAVE_MAX_CARRY_GOLD: '仓库已达上限值',
        ITEM_FAIL_FULL: '已满',
        ITEM_FAIL_WRONGSTORAGE: '仓库编号错误',
        ITEM_FAIL_WRONGBAG: '包裹编号错误',
        ITEM_FAIL_NOTOPENED: '未开放',
        ITEM_FAIL_LOWLEVEL: '等级不足',
        ITEM_FAIL_WRONG_POSITION: '佩戴位置错误',
        ITEM_FAIL_WRONG_TYPE: '物品操作类型错误',
        ITEM_FAIL_WRONG_SEX: '物品性别错误',
        ITEM_FAIL_NOT_IDENT: '未鉴定',
        ITEM_FAIL_NOTFIND_TARGET: '未找到使用目标',
        ITEM_FAIL_NONEED: '不需要使用 ',
        ITEM_USER_DIE: '用户已死亡 ',
        ITEM_FAIL_FIGHT: '战斗中无法使用 ',
        ITEM_FAIL_UKNOWN: '未知错误 ',
        ITEM_FAIL_LOCKED: '装备已锁定 ',
        ITEM_FAIL_NOTLOCKED: '装备已锁定 ',
        ITEM_FAIL_BAG_FULL: '包裹满  ',
        ITEM_SKILL_STUDY: '技能已学习(技能存档结构修改后)',
        ITEM_SKILL_NOMAGIC: '没有技能的下一等级 ',
        ITEM_SKILL_NOITEM: '没有该技能书 ',
        ITEM_FAIL_NOJOB: '职业不符合  ',
        ITEM_DRUG_NODRUG: '药品没有 ',
        ITEM_DRUG_NOBUFF: '药品使用不成功  ',
        ITEM_FAIL_NOCDTIME: '物品没有冷却 ',
        ITEM_FORSAKE_NOITEM: '物品不存在 	',
        ITEM_FORSAKE_BINDING: '物品绑定 ',
        ITEM_FORSAKE_NOMOVE: '物品不能移出包裹 ',
        ITEM_FORSAKE_NOMAP: '不能地面创建物品  ',
        ITEM_FAIL_NOPUTSTORAGE: '不能放入仓库  ',
        ITEM_MARRIED_BINDING: '结婚戒指被绑定,不能摘下和替换 ',
        ITEM_FAIL_DESTORY: '不能摧毁  ',
        ITEM_FAIL_NORESORTSTORAGE: '不能整理仓库  ',
        ITEM_FAIL_TMPPACKETNOREPLACE: '临时包裹有东西时不能替换 	',
        ITEM_FAIL_NOFAME: '物品所需声望不足 ',
        ITEM_FAIL_USELOWLEVEL: '物品使用等级不足 ',
        ITEM_FAIL_TREASURESTONE: '勋章和印不是luacall ',
        ITEM_FAIL_SAMERUNEPROPERTY: '已佩戴相同属性兽魂 ',
        ITEM_FAIL_EATANIMALSOUL: '兽魂吞噬失败 ',
        ITEM_FAIL_CROSSSVR: '跨服不能丢弃 ',
        ITEM_FAIL_ZHUANSHENGLV: '转生等级不足 ',
        ITEM_FAIL_LEGEND_BINDING: '传世装备绑定，不能取下替换 ',
    }



    /**
     * 货币枚举描述
     */
    export const CoinTypeDes = {
        COIN_TYPE_YUANBAO: '元宝',
        COIN_TYPE_YUANBAOLOCK: '礼券',
        COIN_TYPE_GOLD: '金币',
        COIN_TYPE_HONOR: '荣誉',
        COIN_TYPE_GUILDSORCE: '帮贡',
        COIN_TYPE_PLAYER_EXP: '阅历',//-玩家经验
        COIN_TYPE_HERO_EXP: '默契',//-英雄经验
    }

}


