module ProtoCmd {

	export class stBreakTrade extends Packet {
		//		TRADE_CANCEL_NO=0,					//正常,无需取消
		//		TRADE_CANCEL_TIMEOUT=1,				//时间到了取消交易
		//		TRADE_CANCEL_OUTLINE=2,				//对方已经不在了
		//		TRADE_CANCEL_MOVEOUT=3,				//超出交易范围取消交易
		//		TRADE_CANCEL_FLYING=4,				//飞行
		//		TRADE_CANCEL_FLIGHTING=5,			//战斗
		//		TRADE_CANCEL_TRADEING=6,			//正在和其他人交易交易
		//		TRADE_CANCEL_PAKNOCELL=7,			//包裹格子不够多
		//		TRADE_CANCEL_MONEYOVER=8,			//金币超上限了
		//		TRADE_CANCEL_NOAGREE=9,				//对方不同意开启交易
		//		TRADE_CANCEL_BREAK=10,				//中断了交易
		//		TRADE_CANCEL_NOTOME = 11,			//不能和自己交易
		//		TRADE_CANCEL_MYGOLDNOENOUGH =12,	//金币不够
		//		TRADE_CANCEL_COUNTRYDIFF = 13,		//国家不同
		//		TRADE_CANCEL_PETBOXMAX	=14,		//乾坤袋数量超出
		//		TRADE_CANCEL_CONFIGNOAGREE = 15,	//对方设置了拒绝任何交易请求
		//		TRADE_CANCEL_LISTMAX = 16,			//可交易物品数目超过最大
		//		TRADE_CANCEL_TRADEON = 17,			//已经在交易中
		//		TRADE_CANCEL_BINDING = 18,			//该物品绑定不能交易
		//		TRADE_CANCEL_COMMIT = 19,			//交易已经确认
		//		TRADE_CANCEL_MARRYRING = 20,		//结婚戒指检查不成功
		//		SEND_CANCEL_STARTTRADE = 41,		//开启交易中断给予过程
		//		SEND_CANCEL_STARTSEND = 42,			//正在给予中，不允许再次开启给予
		//		SEND_CANCEL_CONFIGNOAGREE = 43,		////对方设置了拒绝任何给与请求
		//		SEND_CANCEL_NOTQUEST = 44,			//不是任务所需的物品
		public static msgID: number = 0x040B;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('btType', PacketBase.TYPE_BYTE);//中断类型
			this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//姓名
			if (data) this.read(data);
		}
	}

	export class stLockTrade extends Packet {
		public static msgID: number = 0x0408;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('dwTmpID', PacketBase.TYPE_INT);//锁定对象id
			this.addProperty('boLock', PacketBase.TYPE_BOOL);//是否锁定
			this.cmd = 0x0408;
			if (data) {
				this.read(data);
			}
		}
	}

	export class stRemoveTradeItem extends Packet {
		public static msgID: number = 0x0409;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('dwAddPlayerId', PacketBase.TYPE_INT);//移除人对象id
			this.addProperty('i64ItemID', PacketBase.TYPE_INT64);
			this.cmd = 0x0409;
			if (data) {
				this.read(data);
			}
		}
	}


	export class TradeCancelEnDecoder extends Packet {
		public static msgID: number = 0x0406;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('btType', PacketBase.TYPE_BYTE);
			this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			if (data) this.read(data);
			this.cmd = 0x0406;
		}
	}

	export class TradeCompleteDecoder extends Packet {
		public static msgID: number = 0x0407;
		public items: Array<stToClientItemAndCountBase> = [];
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('dwGold', PacketBase.TYPE_INT);
			this.addProperty('itemid2count', PacketBase.TYPE_INT);
			this.read(data);
		}

		public read(data: Laya.Byte): number {
			data.pos = super.read(data);
			for (var i: number = 0; i < this.getValue('itemid2count'); i++) {
				this.items[i] = new stToClientItemAndCountBase(data);
			}
			return data.pos;
		}
	}
		export class TradeConfirmEnDecoder extends Packet {
		public static msgID: number = 0x0405;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('dwTmpId', PacketBase.TYPE_INT);
			this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			if (data) this.read(data);
			this.cmd = 0x0405;
		}

	}
	// export class TradeItemAddedEnDecoder extends Packet
	// {
	// public	static   msgID:number = 0x0404;
	// 	public  Item:stItem = new stItem;
	// 	public constructor(data: Laya.Byte) {
	//         super();
	// 		this.addProperty('dwAddPlayerId',PacketBase.TYPE_INT);
	// 		this.addProperty('dwGold',PacketBase.TYPE_INT);
	// 		this.addProperty('dwRmbGold',PacketBase.TYPE_INT);
	// 		this.addProperty('Item',PacketBase.TYPE_BYTES,this.Item.size(),this.Item);
	// 		this.addProperty('nNum',PacketBase.TYPE_INT);
	// 		if (data)
	// 		{
	// 			this.read(data);
	// 		}
	// 		this.cmd = 0x0404;
	// 	}

	// 	 public  clear():void{
	// 		super.clear();
	// 		this.Item = null;

	// 	}
	// }

	export class TradeItemOverDecoder extends Packet {
		public static msgID: number = 0x040B;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('btType', PacketBase.TYPE_BYTE); //中断原因
			this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);  //中断对方名称

			this.read(data);
		}
	}
	export class TradeRequestEnDecoder extends Packet {
		public static msgID: number = 0x0401;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('dwMeID', PacketBase.TYPE_INT);//发起人id
			this.addProperty('dwTargetID', PacketBase.TYPE_INT);//目标对象id
			this.addProperty('btType', PacketBase.TYPE_BYTE);//type=0普通交易 type=1 交换戒指
			this.cmd = 0x0401;
			if (data) {
				this.read(data);
			}
		}
	}
	export class TradeResponseEncoder extends Packet {
		public static msgID: number = 0x0402;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('boAgree', PacketBase.TYPE_BOOL); //是否同意
			this.cmd = 0x0402;
			if (data) {
				this.read(data);
			}
		}
	}

	export class TradeStartDecoder extends Packet {
		//开始交易
		public static msgID: number = 0x0403;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('dwAskerID', PacketBase.TYPE_INT);
			this.addProperty('dwAskerLevel', PacketBase.TYPE_INT);
			this.addProperty('dwAnswerID', PacketBase.TYPE_INT);
			this.addProperty('dwAnswerLevel', PacketBase.TYPE_INT);
			this.addProperty('btType', PacketBase.TYPE_BYTE);//type=0普通交易 type=1 交换戒指
			if (data) {
				this.read(data);
			}
		}
	}
}