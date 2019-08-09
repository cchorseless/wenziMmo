module ProtoCmd {

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

    // 0x0305
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

    //0x033D 
    //丢弃物品
    export class CretForsakeItem extends Packet {
        public static msgID: number = 0x033D;
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
    // 0x030D
    // 强制销毁物品,不返回
    export class stitemDestroyEncoder extends Packet {
        public static msgID: number = 0x030D;
        public constructor() {
            super();
            this.addProperty('Errorcode', PacketBase.TYPE_INT);
            this.addProperty('i64Id', PacketBase.TYPE_INT64);
            this.cmd = 0x030D;
        }
    }

    //0x026C 
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

    //0x0315
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

    // 0x030F
    // 拆分道具
    export class SplitItemEnDecoder extends Packet {
        public static msgID: number = 0x030F;
        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty('nErrorCode', PacketBase.TYPE_INT);
            this.addProperty('i64Id', PacketBase.TYPE_INT64);  //要拆分的物品ID
            this.addProperty('nCount', PacketBase.TYPE_INT);  //要拆出来的数量
            this.read(data);
            this.cmd = 0x030F;
        }
    }

    // **********************************交易行*************************
    // 0x1F06
    /**
     * 拍卖行购买物品
     */
    export class stAuctionBuyItem extends Packet {
        public static msgID: number = 0x1F06;
        public constructor() {
            super();
            this.addProperty("dwIndex", PacketBase.TYPE_DWORD);
            this.addProperty('dwGold', PacketBase.TYPE_DWORD);
            this.addProperty("tax", PacketBase.TYPE_DWORD);//tax
            this.addProperty('btConsignType', PacketBase.TYPE_BYTE);//0金币,1元宝
            this.cmd = 0x1F06;
        }

        public set dwIndex(value: number) {
            this.setValue("dwIndex", value)
        }
        public get dwIndex(): number {
            return this.getValue('dwIndex');
        }
    }
    // 0x1F02
    /**
     * 初始化自己摊位信息(包括 日志 物品 和 未领取的元宝数），拍卖行页签翻页
     */
    export class stAuctionChangePage extends Packet {
        public static msgID: number = 0x1F02;
        // btType=3 返回 stAuctionItemsRet；
        // btType=7 返回 stConsignSellLogRet
        // btType=4 返回 stAuctionProfitRet
        public cbPacket: any = stAuctionItemsRet;
        public constructor() {
            super();
            this.addProperty('nPage', PacketBase.TYPE_INT); //页面数量 每页20件
            this.addProperty('btType', PacketBase.TYPE_BYTE);	//0搜索换页 3自己的摊位物品 4卖了未领取 7日志
            this.cmd = 0x1F02;
        }
    }
    // 0x1F09
    /**
     * 领取摊位总收益
     */
    export class stAuctionGetProfit extends Packet {
        public static msgID: number = 0x1F09;
        public cbPacket = stAuctionProfitRet;
        public constructor() {
            super();
            this.cmd = 0x1F09;
        }
    }
    // 0x1F03
    /**
     * 返回摊位道具信息结果
     */
    export class stAuctionItemsRet extends Packet {
        public static msgID: number = 0x1F03;
        public items: Array<stAuctionItemBase> = [];
        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty('nTotalSize', PacketBase.TYPE_INT); //总条目数
            this.addProperty('nCurPage', PacketBase.TYPE_INT); //当前页数
            this.addProperty('nType', PacketBase.TYPE_BYTE);//0查询1卖出2领取
            this.addProperty('nCount', PacketBase.TYPE_INT);//总数
            this.read(data);
            this.cmd = 0x1F03;
        }

        public read(data: Laya.Byte): number {
            if (data == null) {
                return 0
            }
            data.pos = super.read(data);
            let count = this.count;
            for (var i: number = 0; i < count; i++) {
                this.items[i] = new stAuctionItemBase(data);
            }
            return data.pos;
        }

        /**0当前搜索的物品列表<br>1买了未领取的列表<br>2买了领取的列表<br>3我的摊位<br>4卖了未领取<br>5卖了领取<br>6超时下架<br>7摊位日志最大50条<br>8当前搜索页的物品列表*/
        public get searchType(): number {
            return this.getValue("nType");
        }

        public set searchType(value: number) {
            this.setValue('nType', value);
        }

        public get curPage(): number {
            return this.getValue("nCurPage");
        }

        public get totalItem(): number {
            return this.getValue("nTotalSize");
        }
        public get count(): number {
            return this.getValue('nCount')
        }

        public clear(): void {
            super.clear();
            let len = this.items.length
            for (var i: number = 0; i < len; i++) {
                this.items[i].clear();
                this.items[i] = null;
            }
            this.items.length = 0;
            this.items = null;
        }
    }
    // 0x1F08
    /**
     * 获取总收益数值返回
     */
    export class stAuctionProfitRet extends Packet {
        public static msgID: number = 0x1F08;
        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty("myMoney", PacketBase.TYPE_DWORD);
            this.cmd = 0x1F08;
            this.read(data);
        }

        public get profit(): number {
            return this.getValue("myMoney");
        }
    }
    // 0x1F01
    // 筛选摊位
    export class stAuctionSearch extends Packet {
        public static msgID: number = 0x1F01;
        public cbPacket = stAuctionItemsRet;
        public constructor() {
            super();
            this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//物品名称
            this.addProperty('wSubType', PacketBase.TYPE_WORD);//交易子类型
            this.addProperty('wType', PacketBase.TYPE_WORD);//交易主类型
            this.addProperty('btFuzzyQuery', PacketBase.TYPE_BYTE);//模糊查询
            this.addProperty('btSortType', PacketBase.TYPE_BYTE);//升降序
            this.addProperty('szSeller', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
            this.addProperty("dwLowLv", PacketBase.TYPE_DWORD);//等级小
            this.addProperty("dwHighLv", PacketBase.TYPE_DWORD)//等级大
            this.cmd = 0x1F01;
        }


        /**物品名称*/
        public set itemName(iName: string) {
            this.setValue('szName', iName);
        }

        /**设置交易子类型:如道士衣服：301 */
        public set auctionSubType(type: number) {
            this.setValue('wSubType', type);
        }

        /**设置交易类型<br>全部物品：0<br>战士装备：100<br>法师装备：200<br>道士装备：300<br>变强道具：400<br>药剂：800<br>其他物品：900<br>*/
        public set auctionType(type: number) {
            this.setValue('wType', type);
        }

        /**模糊查询*/
        public set vagueSearch(value: boolean) {
            if (value) {
                this.setValue('btFuzzyQuery', 1);
            } else {
                this.setValue('btFuzzyQuery', 0);
            }
        }
        /**强化等级*/
        public set strenLevel(value: number) {
            this.setValue('btLevel', value);
        }

        /**设置返回物品排序方式<br>按单价升：1<br>按单价降：2<br>按总价升：3<br>按总价降：4<br>按等级升：5<br>按等级降：6*/
        public set sortType(value: number) {
            this.setValue('btSortType', value);
        }

        /**摊主名*/
        public set sellerName(str: string) {
            this.setValue('szSeller', str);
        }

        /**查询的最小等级*/
        public set lowLevel(value: number) {
            this.setValue('dwLowLv', value);
        }

        /**查询的物品的最大等级*/
        public set highLevel(value: number) {
            this.setValue('dwHighLv', value);
        }
    }
    // 0x1F04
    // 上架物品
    export class stAuctionSellItem extends Packet {
        public static msgID: number = 0x1F04;
        public cbPacket = stStallRet;
        public constructor() {
            super();
            this.addProperty('i64Id', PacketBase.TYPE_INT64);//物品编号
            this.addProperty('dwCount', PacketBase.TYPE_DWORD); //数量
            this.addProperty('btDays', PacketBase.TYPE_BYTE);   //寄售的天数
            this.addProperty('dwPrice', PacketBase.TYPE_DWORD); //售价
            this.addProperty('dwCost', PacketBase.TYPE_DWORD);	//手续费,客户端不用管
            this.addProperty('szSellTip', PacketBase.TYPE_STRING, 256);
            this.addProperty('btConsignType', PacketBase.TYPE_BYTE);// 货币类型
            this.addProperty('boShowName', PacketBase.TYPE_BOOL);//是否显示卖家名字
            this.cmd = 0x1F04;
        }
    }
    // 0x1F0A
    // 下架物品
    export class stAuctionTakeMyItem extends Packet {
        public static msgID: number = 0x1F0A;
        public cbPacket = stStallRet;
        public constructor() {
            super();
            this.addProperty('dwIndex', PacketBase.TYPE_DWORD);
            this.addProperty('btType', PacketBase.TYPE_BYTE);
            this.cmd = 0x1F0A;
        }
    }
    // 0x1F05
    // 上下架返回包
    export class stStallRet extends Packet {
        public static msgID: number = 0x1F05;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty('dwResult', PacketBase.TYPE_BYTE);//类型
            this.read(data);
            this.cmd = 0x1F05;
        }

        /**0物品上架成功  1 下架成功*/
        public get result(): number {
            return this.getValue("dwResult");
        }
    }
    // 0x1F07
    // 交易记录返回包
    export class stConsignSellLogRet extends Packet {
        public static msgID: number = 0x1F07;
        public logs: Array<stConsignLogBase> = [];
        public constructor(data: Laya.Byte = null) {
            super();
            this.addProperty('nCount', PacketBase.TYPE_INT);
            this.read(data);
        }

        public read(data: Laya.Byte): number {
            data.pos = super.read(data);
            for (var i: number = 0; i < this.nCount; i++) {
                this.logs[i] = new stConsignLogBase(data);
                data.pos += this.logs[i].size();
            }
            return data.pos;
        }

        public get nCount(): number {
            return this.getValue('nCount');
        }

        public clear(): void {
            super.clear();
            for (var i: number = 0; i < this.logs.length; i++) {
                this.logs[i].clear();
                this.logs[i] = null;
            }
            this.logs.length = 0;
            this.logs = null;
        }
    }
}