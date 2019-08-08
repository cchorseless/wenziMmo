module ProtoCmd {

    // 0x2B01
    // 点捐献
    export class stBeginDonateEquip extends Packet {
        public static msgID: number = 0x2B01;
        public constructor() {
            super();
            this.addProperty("i64ItemId", PacketBase.TYPE_INT64);//要捐献的装备ID
            this.addProperty("dwStoreId", PacketBase.TYPE_DWORD);//仓库编号
            this.cmd = 0x2B01;
        }
    }


    /** 0x2B02
	 * 捐献回复的包
	 * **/
    export class stBeginDonateEquipRet extends Packet {
        public static msgID: number = 0x2B02;
        public item: ItemBase = new ItemBase(null);
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty("btError", PacketBase.TYPE_BYTE);//0成功,1物品不存在,2此物品不允许捐献,3物品删除失败,4放入行会仓库失败，5您当前没有行会
            this.addProperty('item', PacketBase.TYPE_BYTES, this.item.size(), this.item);
            this.addProperty("dwStoreId", PacketBase.TYPE_DWORD);//仓库编号
            this.read(data);
        }

        public clear(): void {
            super.clear();
            this.item.clear();
            this.item = null;
        }
    }


}