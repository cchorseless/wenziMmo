module ProtoCmd {


    //购买物品
    export class stMallBuyItemEncoder extends Packet {
        public static msgID: number = 0x043E;
        public cbPacket = stMallBuyItemRet;
        public constructor() {
            super();
            this.addProperty('dwBaseID', PacketBase.TYPE_DWORD);
            this.addProperty('nCount', PacketBase.TYPE_INT);
            this.addProperty('btType', PacketBase.TYPE_BYTE);
            this.addProperty('btCostType', PacketBase.TYPE_BYTE);// 2 元宝  3 绑定元宝  4绑定金币
            this.cmd = 0x043E;
        }
    }

    //购买物品返回
    export class stMallBuyItemRet extends Packet {
        public static msgID: number = 0x0447;
        public constructor(data: Laya.Byte) {
            super();
            this.addProperty("dwPrice", PacketBase.TYPE_INT);
            this.addProperty("dwItemId", PacketBase.TYPE_INT);
            this.addProperty("dwCount", PacketBase.TYPE_INT);
            this.read(data);
        }

        public getPrice(): number {
            return this.getValue("dwPrice");
        }

        public getItemId(): number {
            return this.getValue("dwItemId");
        }

        public getItemCount(): number {
            return this.getValue("dwCount");
        }
    }


    //获取商城配置
    export class stMallGetAllConfigEncoder extends Packet {
        public static msgID: number = 0x0440;
        // public cbPacket = stMallGetAllConfigRetDecoder;
        public constructor() {
            super();
            this.cmd = 0x0440;
        }
    }

//     //获取商城配置返回
//     export class stMallGetAllConfigRetDecoder extends Packet {
//         public static msgID: number =  0x043D;
//         public  configs:Array<stMallConfig> =[];
//     public constructor(data: Laya.Byte) {
//             super();
//         this.addProperty('nCount', PacketBase.TYPE_INT);
//         this.read(data);

//     }

//      public  read(data: Laya.Byte): number {
//         data.pos = super.read(data);
//         for (var i: number = 0; i < this.getValue('nCount'); i++) {
//            this. configs[i] = new stMallConfig(data);
//         }
//         return data.pos;
//     }

//      public  clear(): void {
//         super.clear();
//         for (var i: number = 0; i < this.configs.length; i++) {
//            this.configs[i] = null;
//         }
//         this.configs.length = 0;
//         this.configs = null;
//     }
// }

//获取商城物品
	export class stMallGetAllItemEncoder  extends Packet
	{
         public static msgID: number = 0x043F;
        //  public cbPacket = stMallGetAllItemRetDecoder;
		public constructor() {
            super();
			this.cmd=0x043F;
		}
	}

    //获取商城物品返回
	export class stMallGetAllItemRetDecoder  extends Packet
	{
		  public static msgID: number = 0x043C;
        
		public  items:Array<stMallItem> = [];
		public constructor(data: Laya.Byte) {
            super();
			this.addProperty('nCount',PacketBase.TYPE_INT);
			this.read(data);
			
		}
		
		 public  read(data: Laya.Byte):number
		{
			data.pos = super.read(data);
			for(var i:number=0;i< this.getValue('nCount');i++)
			{
				this.items[i] = new stMallItem(data);
			}
			return data.pos;
		}
	}
	// NPC商店操作
	export class stToNpcCancel extends Packet
	{
		  public static msgID: number  = 0x0429;

	public	static   NPCTRADE_BUY_OBJECT:number =1;// 买 
	public	static   NPCTRADE_SELL_OBJECT:number =2;// 卖 
	public	static   NPCTRADE_REPAIR_OBJECT:number =4;// 修理 
	public	static   NPCTRADE_ALLREPAIR_OBJECT:number =8;// 

		public constructor(data: Laya.Byte) {
            super();
			this.addProperty('btActionType',PacketBase.TYPE_BYTE);
			this.addProperty('btCancelType',PacketBase.TYPE_BYTE);
			this.read(data);
		}
	}


}