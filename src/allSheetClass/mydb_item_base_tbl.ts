module SheetConfig {
    export class mydb_item_base_tbl  {
        private data; public constructor(data) {  this.data = data; }
        /**
         *  物品升级编号
         */
        public ITEMLVUPID(configID: string): string { return this.data[configID][0] }
        /**
         *  物品名称
         */
        public ITEMNAME(configID: string): string { return this.data[configID][1] }
        /**
         *  deleted
         */
        public DELETED(configID: string): number { return this.data[configID][2] }
        /**
         *  等级需求
         */
        public ITEMLVNEED(configID: string): number { return this.data[configID][3] }
        /**
         *  类型区分
         */
        public ITEMTYPE(configID: string): number { return this.data[configID][4] }
        /**
         *  道具阶数
         */
        public ITEMJIESHU(configID: string): number { return this.data[configID][5] }
        /**
         *  装备品质
         */
        public ITEMQUALITY(configID: string): number { return this.data[configID][6] }
        /**
         *  装备储备
         */
        public ITEMSTORE(configID: string): number { return this.data[configID][7] }
        /**
         *  防装备爆出
         */
        public ITEMAVOIDBAOCHU(configID: string): number { return this.data[configID][8] }
        /**
         *  穿戴位置
         */
        public ITEMPOSITION(configID: string): number { return this.data[configID][9] }
        /**
         *  使用性别
         */
        public ITEMSEX(configID: string): number { return this.data[configID][10] }
        /**
         *  使用职业
         */
        public ITEMJOB(configID: string): number { return this.data[configID][11] }
        /**
         *  使用属性
         */
        public ITEMABILITY(configID: string): number { return this.data[configID][12] }
        /**
         *  所需属性数值
         */
        public ITEMNEEDABILITY(configID: string): number { return this.data[configID][13] }
        /**
         *  所需历史声望
         */
        public ITEMSHENGWANG(configID: string): number { return this.data[configID][14] }
        /**
         *  是否天生绑定
         */
        public ISLOCK(configID: string): number { return this.data[configID][15] }
        /**
         *  可拥有极品属性数
         */
        public HASGOODABILITYCOUNT(configID: string): number { return this.data[configID][16] }
        /**
         *  战士效果ID
         */
        public JOB1_EFFICTID(configID: string): number { return this.data[configID][17] }
        /**
         *  法师效果ID
         */
        public JOB2_EFFICTID(configID: string): number { return this.data[configID][18] }
        /**
         *  道士效果ID
         */
        public JOB3_EFFICTID(configID: string): number { return this.data[configID][19] }
        /**
         *  药水BUFFID
         */
        public POTIONBUFFID(configID: string): number { return this.data[configID][20] }
        /**
         *  套装效果ID
         */
        public SUIT_EFFICTID(configID: string): number { return this.data[configID][21] }
        /**
         *  套装类型
         */
        public SUIT_TYPE(configID: string): number { return this.data[configID][22] }
        /**
         *  掉落极品效果ID
         */
        public DROP_GOODEFFECTID(configID: string): number { return this.data[configID][23] }
        /**
         *  技能编号
         */
        public SKILLID(configID: string): number { return this.data[configID][24] }
        /**
         *  物品冷却时间
         */
        public ITEMUSECD(configID: string): number { return this.data[configID][25] }
        /**
         *  购买价格
         */
        public ITEMBUYPRICE(configID: string): number { return this.data[configID][26] }
        /**
         *  卖出价格
         */
        public ITEMSELLPRICE(configID: string): number { return this.data[configID][27] }
        /**
         *  外观编号
         */
        public LOOKID(configID: string): number { return this.data[configID][28] }
        /**
         *  发光外观编号
         */
        public SPECLOOKID(configID: string): number { return this.data[configID][29] }
        /**
         *  ICON编号
         */
        public ICONID(configID: string): number { return this.data[configID][30] }
        /**
         *  最大叠加数量
         */
        public MAXADDCOUNT(configID: string): number { return this.data[configID][31] }
        /**
         *  最大耐久
         */
        public MAXDURABLE(configID: string): number { return this.data[configID][32] }
        /**
         *  脚本编号
         */
        public SCRIPTID(configID: string): number { return this.data[configID][33] }
        /**
         *  物品消失时间
         */
        public ITEMDISPOSETIME(configID: string): number { return this.data[configID][34] }
        /**
         *  物品有效时间类型
         */
        public ITEMVALIDTIMETYPE(configID: string): number { return this.data[configID][35] }
        /**
         *  物品有效使用时间
         */
        public ITEMVALIDTIME(configID: string): number { return this.data[configID][36] }
        /**
         *  不能强化
         */
        public CANSTRENGTHEN(configID: string): number { return this.data[configID][37] }
        /**
         *  不能摧毁
         */
        public CANDESTROY(configID: string): number { return this.data[configID][38] }
        /**
         *  不能放入仓库
         */
        public CANINSTOREHOUSE(configID: string): number { return this.data[configID][39] }
        /**
         *  不能打孔
         */
        public CANBORE(configID: string): number { return this.data[configID][40] }
        /**
         *  名字颜色
         */
        public ITEMNAMECOLOR(configID: string): number { return this.data[configID][41] }
        /**
         *  是否公告
         */
        public ISNOTICE(configID: string): number { return this.data[configID][42] }
        /**
         *  日志记录
         */
        public ISLOG(configID: string): number { return this.data[configID][43] }
        /**
         *  物品积分限制
         */
        public ITEMSCORELIMIT(configID: string): number { return this.data[configID][44] }
        /**
         *  允许批量使用
         */
        public CANBATCHUSE(configID: string): number { return this.data[configID][45] }
        /**
         *  请求信息
         */
        public REQUESTINFO(configID: string): number { return this.data[configID][46] }
        /**
         *  扩展类型区分
         */
        public PLUSTYPE(configID: string): number { return this.data[configID][47] }
        /**
         *  交易行类型
         */
        public JYH_TYPE(configID: string): number { return this.data[configID][48] }
        /**
         *  交易行子类型
         */
        public JYH_SUBTYPE(configID: string): number { return this.data[configID][49] }
        /**
         *  物品说明
         */
        public ITEMDES(configID: string): string { return this.data[configID][50] }
        /**
         *  物品扩展说明
         */
        public ITEMPLUSDES(configID: string): string { return this.data[configID][51] }
        /**
         *  商城简介
         */
        public INSHOPDES(configID: string): string { return this.data[configID][52] }
        /**
         *  特效显示
         */
        public SHOWEFFECT(configID: string): number { return this.data[configID][53] }
        /**
         *  贡献值
         */
        public CONTRIBUTIONVALUE(configID: string): number { return this.data[configID][54] }
        /**
         *  装备攻击需求
         */
        public EQUIP_ATK_NEED(configID: string): number { return this.data[configID][55] }
        /**
         *  装备魔法需求
         */
        public EQUIP_MAGIC_NEED(configID: string): number { return this.data[configID][56] }
        /**
         *  装备道术需求
         */
        public EQUIP_DS_NEED(configID: string): number { return this.data[configID][57] }
        /**
         *  装备元神需求
         */
        public EQUIP_YS_NEED(configID: string): number { return this.data[configID][58] }
        /**
         *  装备强化效果
         */
        public EQUIP_STRENGTHENEFFECT(configID: string): number { return this.data[configID][59] }
        /**
         *  装备长短标示
         */
        public EQUIP_LENGTHSIGN(configID: string): number { return this.data[configID][60] }
        /**
         *  装备战斗力需求
         */
        public EQUIP_POWERNEED(configID: string): number { return this.data[configID][61] }
        /**
         *  掉落描述
         */
        public ITEMDROPDES(configID: string): string { return this.data[configID][62] }
        /**
         *  背景描述
         */
        public ITEMBGDES(configID: string): string { return this.data[configID][63] }
        /**
         *  转生等级
         */
        public ZS_LEVEL(configID: string): number { return this.data[configID][64] }
        /**
         *  强化上限
         */
        public STRENGTHENLIMIT(configID: string): number { return this.data[configID][65] }
        /**
         *  日用次数
         */
        public USETIMESDAILY(configID: string): number { return this.data[configID][66] }
        /**
         *  回收经验
         */
        public RECOVEREXP(configID: string): number { return this.data[configID][67] }
        /**
         *  回收英雄经验
         */
        public RECOVERHEROEXP(configID: string): number { return this.data[configID][68] }
        /**
         *  神装颜色
         */
        public SZ_COLOR(configID: string): number { return this.data[configID][69] }
        /**
         *  展示子类型
         */
        public SHOWSUBTYPE(configID: string): number { return this.data[configID][70] }
        /**
         *  神装编号
         */
        public SZ_ID(configID: string): number { return this.data[configID][71] }
        /**
         *  使用获得道具
         */
        public USEPRIZE(configID: string): number { return this.data[configID][72] }
        /**
         *  排序类型
         */
        public SORTTYPE(configID: string): number { return this.data[configID][73] }
        /**
         *  排序子类型
         */
        public SORTSUBTYPE(configID: string): number { return this.data[configID][74] }
        /**
         *  英雄等级需求
         */
        public LVNEED(configID: string): number { return this.data[configID][75] }
        /**
         *  盛世融合id
         */
        public SX_MIXID(configID: string): number { return this.data[configID][76] }
        /**
         *  盛世拆分id
         */
        public SX_SPLITID(configID: string): number { return this.data[configID][77] }
        /**
         *  融合所需个数
         */
        public MIXNEEDCOUNT(configID: string): number { return this.data[configID][78] }
        /**
         *  不可拆分
         */
        public CANSPLIT(configID: string): number { return this.data[configID][79] }
    }
}