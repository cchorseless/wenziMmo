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

}