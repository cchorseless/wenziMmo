module ProtoCmd {
	export class GetOtherPlayerInfoDecoder extends Packet {
		public static msgID: number = 0x0313;
		public items: Array<ItemBase> = [];         //装备列表
		public strenLvls = [];
		public constructor(data: Laya.Byte = null) {
			super();
			this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);//错误编号 0正确 1不在线 
			this.addProperty('btType', PacketBase.TYPE_BYTE);//指定类型  
			this.addProperty('dwLevel', PacketBase.TYPE_DWORD);//人物等级
			this.addProperty('btSex', PacketBase.TYPE_BYTE);//性别
			this.addProperty('btJob', PacketBase.TYPE_BYTE);//职业
			this.addProperty('nFightScore', PacketBase.TYPE_DWORD);  //攻击战斗力
			this.addProperty("btPlatForm", PacketBase.TYPE_BYTE);//平台类型
			this.addProperty("btTxYellowType", PacketBase.TYPE_BYTE);//黄钻类型 1黄钻,2年黄钻,3豪华黄钻
			this.addProperty("btTxYellowLevel", PacketBase.TYPE_BYTE);//黄钻等级
			this.addProperty("btLevel3366", PacketBase.TYPE_BYTE);//3366等级
			this.addProperty("btTxBlueType", PacketBase.TYPE_BYTE);//蓝钻类型 1蓝钻,2年蓝钻,3豪华蓝钻
			this.addProperty("btTxBlueLevel", PacketBase.TYPE_BYTE);//蓝钻等级
			this.addProperty("btTxQQVipType", PacketBase.TYPE_BYTE);//QQ会员类型 1会员,2年会员,3豪华会员
			this.addProperty("btTxQQVipLevel", PacketBase.TYPE_BYTE);//QQ会员等级
			this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);// 名字 
			this.addProperty('szTitle', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//称号 
			this.addProperty('szClanName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//行会
			this.addProperty('szSpouseName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//配偶名字 
			this.addProperty("clientFlag", PacketBase.TYPE_BYTE);//前端标记
			for (var i: number = 0; i < 20; i++) {
				this.addProperty("strenLvl" + i, PacketBase.TYPE_DWORD);
			}
			for (i = 0; i < 120; i++) {
				this.addProperty("soulStone" + i, PacketBase.TYPE_BYTE);
			}
			this.addProperty("mainRLvl", PacketBase.TYPE_DWORD);
			this.addProperty("heroRLvl", PacketBase.TYPE_DWORD);
			for (i = 0; i < 8; i++) {
				this.addProperty("fightSoulLvl" + i, PacketBase.TYPE_BYTE);
			}

			for (i = 0; i < 20; i++) {
				this.addProperty("btSoulsAct" + i, PacketBase.TYPE_BOOL);
			}
			this.addProperty('dwCount', PacketBase.TYPE_INT);//物品数量
			this.read(data);
		}

		public get titleId(): number {
			return this.getValue("szTitle");
		}
		public getStrenLvl(pos: number): number {
			return this.getValue("strenLvl" + pos);
		}

		public get clientFlag(): number {
			return this.getValue("clientFlag");
		}

		public get playerName(): String {
			return this.getValue("szName");
		}

		public get sex(): number {
			return this.getValue("btSex");
		}

		/**0主角<br>1英雄战士<br>2英雄法师<br>3英雄道士*/
		public get type(): number {
			return this.getValue("btType");
		}
		// public read(data: Laya.Byte): number {
		// 	data.pos = super.read(data);
		// 	var nCount: number = this.getValue('dwCount');
		// 	if (data.pos >= data.length) {
		// 		return 0;
		// 	}
		// 	for (var i: number = 0; i < nCount; i++) {
		// 		var item: ItemBase = new ItemBase(data);
		// 		this.items[i] = item;
		// 	}
		// 	var strenLvls: Array = [];
		// 	for (i = 0; i < 20; i++) {
		// 		strenLvls.push(this.getValue("strenLvl" + i));
		// 	}
		// 	GameData.getMe().clearOtherLvls();
		// 	GameData.getMe().setOtherStrenLvls(strenLvls);
		// 	//
		// 	var soulStoneLvl: Array = [];
		// 	for (i = 0; i < 120; i++) {
		// 		soulStoneLvl.push(this.getValue("soulStone" + i));
		// 	}
		// 	GameData.getMe().setOtherSoulStoneLvls(soulStoneLvl);
		// 	soulStoneLvl.length = 0;
		// 	for (i = 0; i < 20; i++) {
		// 		soulStoneLvl.push(this.getValue("btSoulsAct" + i));
		// 	}

		// 	GameData.getMe().setOtherSoulStoneStatus(soulStoneLvl);
		// 	GameData.getMe().otherLvl = this.getValue("dwLevel");

		// 	var fsLvl: Array = [];
		// 	for (i = 0; i < 8; i++) {
		// 		fsLvl.push(this.getValue("fightSoulLvl" + i));
		// 	}
		// 	GameData.getMe().setOtherFightSoulLvls(fsLvl);
		// 	if (type == 0) {
		// 		GameData.getMe().otherJob = this.getValue("btJob");
		// 		GameData.getMe().otherHeroJob = 0;
		// 		GameData.getMe().otherRLvl = this.getValue("mainRLvl");
		// 	} else {
		// 		GameData.getMe().otherJob = 0;
		// 		GameData.getMe().otherHeroJob = type;
		// 		GameData.getMe().otherRLvl = this.getValue("heroRLvl");
		// 	}
		// 	return 0;
		// }

		public clear(): void {
			super.clear();
			for (var i: number = 0; i < this.items.length; i++) {
				this.items[i].clear();
				this.items[i] = null;
			}
			this.items.splice(0);
		}
	}
	export class GetOtherPlayerInfoEncoder extends Packet {
		public static  REQUEST_TYPE_ROLE: number = 0;
		public static  REQUEST_TYPE_HERO1: number = 1;
		public static  REQUEST_TYPE_HERO2: number = 2;
		public static  REQUEST_TYPE_HERO3: number = 3;
		/**查看他人角色面板调用*/
		public static  REQUEST_ORIGIN_LOOK: number = 0;
		/**威名面板调用*/
		public static  REQUEST_ORIGIN_FAME: number = 1;
		/**膜拜城主面板*/
		public static  REQUEST_ORIGIN_WORSHIP: number = 2;
		public cbPacket = GetOtherPlayerInfoDecoder;
		public constructor(data: Laya.Byte = null) {
			super();
		this.addProperty('btType', PacketBase.TYPE_BYTE);//请求类型:0主角,1战士英雄,2法师英雄,3道士英雄
		this.addProperty('szName', PacketBase.TYPE_STRING,Packet. _MAX_NAME_LEN);
		this.addProperty("clientFlag",PacketBase. TYPE_BYTE);//用作前端标记,比如哪个面板调用的
		this.cmd = 0x0312;
	}

	public  set clientFlag(value:number) {
		this.setValue("clientFlag",value);
	}

	public  set requestType(value:number) {
		this.setValue("btType",value);
	}

	public  set name(value:String) {
		this.setValue("szName",value);
	}
	}
}