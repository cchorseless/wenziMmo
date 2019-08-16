module ProtoCmd {
    /**0x2A01
	 *   创建
     * 
	 * */
	export class stCreatGlobalGuild extends Packet {
		public static msgID: number = 0x2A01;
		public cbPacket = stCreatGlobalGuildRet;
		public constructor(data: Laya.Byte = null) {
			super();
			this.addProperty("btOPType", PacketBase.TYPE_BYTE)		//0 增加  1 解散 3 检测名字
			this.addProperty("szGuildName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//要创建的氏族名
			this.addProperty("szGuildNotice", PacketBase.TYPE_STRING, 512);//帮派公告
			this.cmd = 0x2A01;
			if (data) {
				data.pos += this.read(data);
			}
		}
	}

    /**0x2A02
     * 创建工会的返回
     * */
	export class stCreatGlobalGuildRet extends Packet {
		public static msgID: number = 0x2A02;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("btOPType", PacketBase.TYPE_BYTE);
			this.addProperty("dwGuildId", PacketBase.TYPE_DWORD);
			this.addProperty("errorcode", PacketBase.TYPE_BYTE);
			if (data) {
				data.pos += this.read(data);
			}
		}
	}

    /**0x2A03
     * 服务器同步行会信息
     * */
	export class stGlobalGuildChangeGuildRet extends Packet {
		public static msgID: number = 0x2A03;
		public guildSinfo: stGSGuildInfoBase = new stGSGuildInfoBase();
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("dwOnlyId", PacketBase.TYPE_DOUBLE);
			this.addProperty("guildinfo", PacketBase.TYPE_BYTES, this.guildSinfo.size(), this.guildSinfo);
			this.cmd = 0x2A03;
			if (data) {
				data.pos += this.read(data);
			}
		}

		public clear(): void {
			super.clear();
			this.guildSinfo.clear();
			this.guildSinfo = null;
		}
	}

	/**0x2A04
	  * 获取行会列表
	  * */
	export class stGlobalGuildGetList extends Packet {
		public static msgID: number = 0x2A04;
		public cbPacket = stGlobalGuildGetListRet;
		public constructor(data: Laya.Byte = null) {
			super();
			this.addProperty("btType", PacketBase.TYPE_BYTE);		//0新人查看 1外交界面列表
			this.addProperty("dwPageNum", PacketBase.TYPE_DWORD);   // 页数 从1开始
			if (data) {
				data.pos += this.read(data);
			}
			this.cmd = 0x2A04;
		}
	}
	/**0x2A05
	  * 获取行会列表返回
	  * */
	export class stGlobalGuildGetListRet extends Packet {
		public static msgID: number = 0x2A05;
		public stZeroArray: Array<stSingleGuildinfoBase> = [];
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("btType", PacketBase.TYPE_BYTE);
			this.addProperty('dwMaxPage', PacketBase.TYPE_DWORD);
			this.addProperty('nCount', PacketBase.TYPE_INT);
			if (data) {
				this.read(data);
			}
		}
		public read(data: Laya.Byte): number {
			data.pos = super.read(data);
			for (var i: number = 0; i < this.getValue('nCount'); i++) {
				this.stZeroArray[i] = new stSingleGuildinfoBase(data);
			}
			return data.pos;
		}
	}

    /**0x2A06
     * 申请加入行会
     * */
	export class stGlobalGuildAskJoinGuild extends Packet {
		public static msgID: number = 0x2A06;
		public cbPacket = stGlobalGuildAskJoinGuildRet;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("szName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			this.addProperty("btSex", PacketBase.TYPE_CHAR);
			this.addProperty("btJob", PacketBase.TYPE_CHAR);
			this.addProperty("dwLevel", PacketBase.TYPE_DWORD);
			this.addProperty("boOnline", PacketBase.TYPE_BOOL);
			this.addProperty("szGuildName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			this.cmd = 0x2A06;
			if (data) {
				data.pos += this.read(data);
			}
		}
	}

	/**0x2A07
	 * 申请加入工会的返回
	 * */
	export class stGlobalGuildAskJoinGuildRet extends Packet {
		public static msgID: number = 0x2A07;
		public stZeroArray = new Array<stSingleGuildinfoBase>();
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);
			this.addProperty('nCount', PacketBase.TYPE_INT);
			if (data) {
				data.pos += this.read(data);
			}
		}
		public read(data: Laya.Byte): number {
			data.pos = super.read(data);
			for (var i: number = 0; i < this.getValue('nCount'); i++) {
				this.stZeroArray[i] = new stSingleGuildinfoBase(data);
			}
			return data.pos;
		}
	}

	/**0x2A08
	 * 会长返回申请
	 * */
	export class stGlobalGuildMasterRetAskJoin extends Packet {
		public static msgID: number = 0x2A08;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("szJoinName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			this.addProperty("szMasterName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			this.addProperty("szGuildName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			this.addProperty("dwGuildId", PacketBase.TYPE_DWORD);
			this.addProperty("boAllow", PacketBase.TYPE_BOOL);
			this.addProperty("btErrorCode", PacketBase.TYPE_BYTE);
			this.cmd = 0x2A08;
			if (data) {
				data.pos += this.read(data);
			}
		}
	}

    /**0x2A09
	 * 请求单条行会信息
	 * */
	export class stGlobalGuildCurGuildInfo extends Packet {
		public static msgID: number = 0x2A09;
		public cbPacket = stGlobalGuildCurGuildInfoRet;
		public constructor(data: Laya.Byte = null) {
			super();
			this.addProperty("btType", PacketBase.TYPE_BYTE);  //0本行会信息1关系行会信息
			this.addProperty("dwGuildId", PacketBase.TYPE_DWORD);
			this.cmd = 0x2A09;
			if (data) {
				data.pos += this.read(data);
			}
		}
	}

	/**0x2A0A
	  * 本行会信息返回
	  * */
	export class stGlobalGuildCurGuildInfoRet extends Packet {
		public static msgID: number = 0x2A0A;
		public singleGuildinfo: stSingleGuildinfoBase = new stSingleGuildinfoBase();
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("btType", PacketBase.TYPE_BYTE);
			this.addProperty("guildinfo", PacketBase.TYPE_BYTES, this.singleGuildinfo.size(), this.singleGuildinfo);
			if (data) {
				data.pos += this.read(data);
			}
		}
	}


    /**0x2A4B
	 * 行会事件
	 * */
	export class stGloalClientGuildEvent extends Packet {
		public static msgID: number = 0x2A4B;
		public cbPacket = stGloalClientGuildEventRet;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("btType", PacketBase.TYPE_BYTE);
			this.addProperty("i64OnlyId", PacketBase.TYPE_INT64);
			this.addProperty("dwGuildId", PacketBase.TYPE_DWORD);
			this.cmd = 0x2A4B;
			if (data) {
				data.pos += this.read(data);
			}

		}
	}

    /**0x2A4C
     * 行会事件返回
     * */
	export class stGloalClientGuildEventRet extends Packet {
		public stGuildeveArray: Array<stGuildEventBase> = [];
		public static msgID: number = 0x2A4C;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('nCount', PacketBase.TYPE_INT);
			if (data) {
				this.read(data);
			}
		}
		public read(data: Laya.Byte): number {
			data.pos = super.read(data);
			for (var i: number = 0; i < this.getValue('nCount'); i++) {
				this.stGuildeveArray[i] = new stGuildEventBase(data);
			}
			return data.pos;
		}
		public clear(): void {
			super.clear();
			for (var i: number = 0; i < this.stGuildeveArray.length; i++) {
				this.stGuildeveArray[i].clear();
				this.stGuildeveArray[i] = null;
			}
			this.stGuildeveArray.length = 0;
		}
	}

	/**0x2A4D
	 * 行会搜索
	 * */
	export class stGlobalClientSearchGuild extends Packet {
		public static msgID: number = 0x2A4D;
		public cbPacket = stGlobalClientSearchGuildRet;
		public constructor(data: Laya.Byte = null) {
			super();
			this.addProperty("szName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			if (data) {
				data.pos += this.read(data);
			}
			this.cmd = 0x2A4D;
		}
	}

	/**0x2A4E
	 * 行会搜索返回
	 * */
	export class stGlobalClientSearchGuildRet extends Packet {
		public guildinfo: stSingleGuildinfoBase = new stSingleGuildinfoBase();
		public static msgID: number = 0x2A4E;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("guildinfo", PacketBase.TYPE_BYTES, this.guildinfo.size(), this.guildinfo);
			if (data) {
				data.pos += this.read(data);
			}
		}
	}



    /**0x2A1B
     * 添加外交关系
     * */
	export class stGlobalGuildAddToDiplomacy extends Packet {
		public static msgID: number = 0x2A1B;
		public cbPacket = stGlobalGuildAddToDiplomacyRet;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("btType", PacketBase.TYPE_BYTE);//0关注行会1行会联盟2敌对行会3宣战行会
			this.addProperty("szGuildName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			this.cmd = 0x2A1B;
			if (data) data.pos += this.read(data);
		}
	}

	/** 0x2A1C
	 * 添加外交关系返回
	 * */
	export class stGlobalGuildAddToDiplomacyRet extends Packet {
		public static msgID: number = 0x2A1C;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('btType', PacketBase.TYPE_BYTE);//0关注行会1行会联盟2敌对行会3宣战行会
			this.addProperty('szGuildName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			this.addProperty('btErrorCode', PacketBase.TYPE_BYTE);
			this.cmd = 0x2A1C;
			if (data) {
				data.pos += this.read(data);
			}
		}
	}



    /**0x2A22
	 * 	会长获取申请列表
	 * */
	export class stGlobalGuildAskJoinGuildUser extends Packet {
		public static msgID: number = 0x2A22;
		public cbPacket = stGlobalGuildAskJoinGuildUserRet;
		public constructor(data: Laya.Byte) {
			super();
			this.cmd = 0x2A22;
			this.addProperty("nPage", PacketBase.TYPE_INT);
			if (data) {
				data.pos += this.read(data);
			}
		}
	}


	/**0x2A23
	 * 	会长获取申请列表返回
	 * */
	export class stGlobalGuildAskJoinGuildUserRet extends Packet {
		public static msgID: number = 0x2A23;
		public stZeroArray: Array<szAskJoinUserInfoBase> = [];
		public constructor(data: Laya.Byte) {
			super();
			this.cmd = 0x2A23;
			this.addProperty("nPage", PacketBase.TYPE_INT);				//当前页
			this.addProperty("nMaxPage", PacketBase.TYPE_INT);			//当前的最大页数
			this.addProperty("nMaxCount", PacketBase.TYPE_INT);			//当前人数
			this.addProperty('nCount', PacketBase.TYPE_INT);
			if (data) {
				data.pos += this.read(data);
			}
		}

		public read(data: Laya.Byte): number {
			data.pos = super.read(data);
			for (var i: number = 0; i < this.getValue("nCount"); i++) {
				this.stZeroArray[i] = new szAskJoinUserInfoBase(data);
			}
			return data.pos;
		}
		public clear(): void {
			super.clear();
			for (var i: number = 0; i < this.stZeroArray.length; i++) {
				this.stZeroArray[i].clear();
				this.stZeroArray[i] = null;
			}
			this.stZeroArray.length = 0;
			this.stZeroArray = null;

		}
	}

    /** 0x2A33
     *发起废除会长
     * */
	export class stGlobalGuildBeginBanMaster extends Packet {
		public static msgID: number = 0x2A33;
		public cbPacket = stGlobalGuildBeginBanMasterRet;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("btType", PacketBase.TYPE_BYTE);//0弹劾会长，1取消弹劾
			this.addProperty("szDesc", PacketBase.TYPE_STRING, 512);
			this.cmd = 0x2A33;
		}
	}
    /**0x2A34
     *发起废除会长返回
     * */
	export class stGlobalGuildBeginBanMasterRet extends Packet {
		public static msgID: number = 0x2A34;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("btErrorCode", PacketBase.TYPE_BYTE);
			this.addProperty("btType", PacketBase.TYPE_BYTE);//0弹劾会长，1取消弹劾
			this.addProperty("szDesc", PacketBase.TYPE_STRING, 512);//原因描述
			if (data) {
				data.pos += this.read(data);
			}
		}
	}

    /**0x2A11
     * 取消申请
     * */
	export class stGlobalGuildCancelAskJoin extends Packet {
		public static msgID: number = 0x2A11;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("szName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			this.addProperty("szGuildName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			this.cmd = 0x2A11;
			if (data) data.pos += this.read(data);
		}
	}

    /**0x2A0D
     * 改变行会称号
     * */
	export class stGlobalGuildChangeAliaName extends Packet {
		public static msgID: number = 0x2A0D;
		public cbPacket = stGlobalGuildChangeAliaNameRet;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("btType", PacketBase.TYPE_BYTE);//0新建标签1删除标签2修改标签3修改成员称号
			this.addProperty("szName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			this.addProperty("szAliaName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			this.cmd = 0x2A0D;
			if (data) {
				data.pos += this.read(data);
			}
		}
	}

	/**0x2A0E
	 * 改变行会称号返回
	 * */
	export class stGlobalGuildChangeAliaNameRet extends Packet {
		public static msgID: number = 0x2A0E;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("btType", PacketBase.TYPE_BYTE);//0新建标签1删除标签2修改标签3修改成员称号
			this.addProperty("szMasterName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			this.addProperty("szName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			this.addProperty("boChanged", PacketBase.TYPE_BOOL);
			if (data) {
				data.pos += this.read(data);
			}
		}
	}



    /**0x2A14
     * 修改公告
     * */
	export class stGlobalGuildChangeNotice extends Packet {
		public static msgID: number = 0x2A14;
		public cbPacket = stGlobalGuildChangeNoticeRet;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("btType", PacketBase.TYPE_BYTE);	//0是行会公告1是招贤公告
			this.addProperty("dwLevel", PacketBase.TYPE_DWORD);	//招贤等级
			this.addProperty("szGuildNotice", PacketBase.TYPE_STRING, 512);
			this.cmd = 0x2A14;
			if (data) {
				data.pos += this.read(data);
			}
		}
	}

	/**0x2A15
	 * 修改公告返回
	 * */
	export class stGlobalGuildChangeNoticeRet extends Packet {
		public static msgID: number = 0x2A15;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("btType", PacketBase.TYPE_BYTE);
			this.addProperty("btErrorCode", PacketBase.TYPE_BYTE);
			if (data) data.pos += this.read(data);
		}
	}

	/**0x2A0F
	 * 改变行会权限
	 * */
	export class stGlobalGuildChangePowerLvl extends Packet {
		public static msgID: number = 0x2A0F;
		public cbPacket = stGlobalGuildChangePowerLvlRet;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("szName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			this.addProperty("dwPowerLvl", PacketBase.TYPE_DWORD);
			this.cmd = 0x2A0F;
			if (data) data.pos += this.read(data);
		}
	}
	/**0x2A10
	  * 改变行会权限返回
	  * */
	export class stGlobalGuildChangePowerLvlRet extends Packet {
		public static msgID: number = 0x2A10;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("szMasterName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			this.addProperty("szName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			this.addProperty("dwPowerLvl", PacketBase.TYPE_DWORD);
			this.addProperty("boChanged", PacketBase.TYPE_BOOL);
			if (data) data.pos += this.read(data);
		}
	}


	/**0x2A1F
	 * 删除外交关系
	 * */
	export class stGlobalGuildDelToDiplomacy extends Packet {
		public static msgID: number = 0x2A1F;
		public cbPacket = stGlobalGuildDelToDiplomacyRet;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("btType", PacketBase.TYPE_BYTE);//0关注行会1行会联盟2敌对行会3宣战行会
			this.addProperty("szGuildName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			this.cmd = 0x2A1F;
			if (data) {
				data.pos += this.read(data);
			}
		}
	}

	export class stGlobalGuildDelToDiplomacyRet extends Packet {
		public static msgID: number = 0x2A20;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("btType", PacketBase.TYPE_BYTE);//0关注行会1行会联盟2敌对行会3宣战行会
			this.addProperty("szGuildName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			this.addProperty("btErrorCode", PacketBase.TYPE_BYTE);
			if (data) {
				data.pos += this.read(data);
			}
		}
	}

	// 0x2A2B
	export class stGlobalGuildGameSvrGetGuildRet extends Packet {
		public static msgID: number = 0x2A2B;
		public guilds: Array<stGSALLGuild> = [];
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('nCount', PacketBase.TYPE_INT);
			this.read(data);
		}

		public read(data: Laya.Byte): number {
			if (data) {
				data.pos = super.read(data);
				for (var i: number = 0; i < this.getValue("nCount"); i++) {
					this.guilds.push(new stGSALLGuild(data));
				}
				return data.pos;
			}
			return 0;
		}

		public clear(): void {
			super.clear();
			for (var i: number = 0; i < this.guilds.length; i++) {
				this.guilds[i].clear();
				this.guilds[i] = null;
			}
			this.guilds.length = 0;
		}
	}

	/**0x2A17
	 * 获取称号列表和人数
	 * */
	export class stGlobalGuildGetAlia extends Packet {
		public static msgID: number = 0x2A17;
		public cbPacket = stGlobalGuildGetAliaRet;
		public constructor(data: Laya.Byte) {
			super();
			this.cmd = 0x2A17;
			if (data) this.read(data);
		}
	}
	/**0x2A18
	  * 获取称号列表和人数返回
	  * */
	export class stGlobalGuildGetAliaRet extends Packet {
		public static msgID: number = 0x2A18;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("szAliaNames", PacketBase.TYPE_STRING, 1280);//称号:人数/称号:人数
			if (data) data.pos += this.read(data);
		}
	}

	/**
		 * 获取称号成员
		 * */
	export class stGlobalGuildGetAliaMember extends Packet {
		public static msgID: number = 0x2A19;
		public cbPacket = stGlobalGuildGetAliaMemberRet;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("szAliaName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			this.cmd = 0x2A19;
			if (data) {
				data.pos += this.read(data);
			}
		}
	}

	/**0x2A1A
		 * 获取称号成员返回
		 * */
	export class stGlobalGuildGetAliaMemberRet extends Packet {
		public static msgID: number = 0x2A1A;
		public stZeroArray: Array<AliaMemberInfoBase> = [];
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("szAliaName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			this.addProperty("nCount", PacketBase.TYPE_INT);
			if (data) {
				this.read(data);//data.position +=
			}
		}
		public read(data: Laya.Byte): number {
			data.pos = super.read(data);
			for (var i: number = 0; i < this.getValue('nCount'); i++) {
				this.stZeroArray[i] = new AliaMemberInfoBase(data);
			}
			return data.pos;
		}
	}


	/**0x2A12
		 * 获取已申请行会列表
		 * */
	export class stGlobalGuildGetAskJoinList extends Packet {
		public static msgID: number = 0x2A12;
		public cbPacket = stGlobalGuildGetAskJoinListRet;
		public constructor(data: Laya.Byte) {
			super();
			this.cmd = 0x2A12;
		}
	}

	/**0x2A13
	   * 获取已申请行会列表返回
	   * */
	export class stGlobalGuildGetAskJoinListRet extends Packet {
		public static msgID: number = 0x2A13;
		public stZeroArray: Array<stSingleGuildinfoBase> = [];
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('nCount', PacketBase.TYPE_INT);
			if (data) {
				this.read(data);
			}
		}
		public read(data: Laya.Byte): number {
			data.pos = super.read(data);
			for (var i: number = 0; i < this.getValue('nCount'); i++) {
				this.stZeroArray[i] = new stSingleGuildinfoBase(data);
			}
			return data.pos;
		}
	}

	/**
		 * 获取外交列表
		 * */
	export class stGlobalGuildGetDiplomacyList extends Packet {
		public static msgID: number = 0x2A1D;
		public cbPacket = stGlobalGuildGetDiplomacyListRet;
		public constructor(data: Laya.Byte) {
			super();

			this.addProperty("btType", PacketBase.TYPE_BYTE);
			this.cmd = 0x2A1D;
			if (data) {
				data.pos += this.read(data);
			}
		}
	}

	/**
		 * 获取外交列表返回
		 * */
	export class stGlobalGuildGetDiplomacyListRet extends Packet {
		public static msgID: number = 0x2A1E;
		public stZeroArray: Array<DiplomacyGuildBase> = [];
		public constructor(data: Laya.Byte) {
			super();

			this.addProperty("btType", PacketBase.TYPE_BYTE);
			this.addProperty("nCount", PacketBase.TYPE_INT);
			if (data) {
				data.pos += this.read(data);
			}
		}
		public read(data: Laya.Byte): number {
			data.pos = super.read(data);
			for (var i: number = 0; i < this.getValue("nCount"); i++) {
				this.stZeroArray[i] = new DiplomacyGuildBase(data);
			}
			return data.pos;
		}
	}

	/**0x2A24
			 * 获取外交关系行会数
			 * */
	export class stGlobalGuildGetDiplomacyTypeNum extends Packet {
		public static msgID: number = 0x2A24;
		public cbPacket = stGlobalGuildGetDiplomacyTypeNumRet;
		public constructor(data: Laya.Byte) {
			super();
			this.cmd = 0x2A24;
			if (data) data.pos += this.read(data);
		}
	}

    /**0x2A25
	 * //获取外交关系行会数返回
	 * */
	export class stGlobalGuildGetDiplomacyTypeNumRet extends Packet {
		public static msgID: number = 0x2A25;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('dwInterestGuildCount', PacketBase.TYPE_DWORD);//关注行会
			this.addProperty('dwAllianceGuildCount', PacketBase.TYPE_DWORD);//联盟行会
			this.addProperty('dwHostilityGuildCount', PacketBase.TYPE_DWORD);//敌对行会
			this.addProperty('dwFightGuildCount', PacketBase.TYPE_DWORD);//宣战行会
			this.addProperty('dwGuildCount', PacketBase.TYPE_DWORD);//行会列表数
			if (data) {
				data.pos += this.read(data);
			}

		}
	}


	/**0x2A40
		 *帮会邀请
		 */
	export class stGlobalGuildInviteInter extends Packet {
		public cbPacket = stGlobalGuildInviteInterRet;
		public static msgID: number = 0x2A40;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('nError', PacketBase.TYPE_INT);//错误吗
			this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//名字
			this.cmd = 0x2A40;
			if (data) data.pos += this.read(data);
		}
	}
	/**0x2A41
		 *帮会邀请返回
		 */
	export class stGlobalGuildInviteInterRet extends Packet {
		public static msgID: number = 0x2A41;
		public constructor(data: Laya.Byte) {
			super();

			this.addProperty('btAgree', PacketBase.TYPE_BYTE);//1同意
			this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//邀请者名字
			this.addProperty('szGuildName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//行会名称
			this.addProperty('dwGuildLevel', PacketBase.TYPE_DWORD);//行会等级
			this.addProperty('dwPowerLevel', PacketBase.TYPE_DWORD);//
			this.cmd = 0x2A41;
			if (data) data.pos += this.read(data);
		}
	}
	export class stGlobalGuildMasterInfo extends Packet {
		public static msgID: number = 0x2A31;
		public members: Array<stGuildMemberBase> = [];
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("dwGuildId", PacketBase.TYPE_DWORD); //行会编号
			this.addProperty('nCount', PacketBase.TYPE_INT);
			this.cmd = 0x2A31;
			if (data) {
				data.pos += this.read(data);
			}
		}
		public read(data: Laya.Byte): number {
			data.pos = super.read(data);
			for (var i: number = 0; i < this.getValue('nCount'); i++) {
				this.members[i] = new stGuildMemberBase(data);
			}

			return data.pos;
		}
		public clear(): void {
			super.clear();
			for (var i: number = 0; i < this.members.length; i++) {
				this.members[i].clear();
				this.members[i] = null;
			}
			this.members.length = 0;
			this.members = null;

		}
	}



    /**
	 * 玩家离开行会
	 * */
	export class stGlobalGuildMemberLeave extends Packet {
		public static msgID: number = 0x2A16;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("btType", PacketBase.TYPE_BYTE);		//0主动退出行会1会长踢出
			this.addProperty("szName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			this.addProperty("szMasterName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			this.cmd = 0x2A16;
			if (data) data.pos += this.read(data);
		}
	}

    /**
	 * 获取行会成员
	 * */
	export class stGlobalGuildMemberList extends Packet {
		public static msgID: number = 0x2A0B;
		public cbPacket = stGlobalGuildMemberListRet;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("dwPageNum", PacketBase.TYPE_DWORD);
			this.addProperty("btType", PacketBase.TYPE_BYTE);//成员列表排序类型 0权利1等级2日贡献3战斗力
			this.addProperty("boShowOffLine", PacketBase.TYPE_BOOL);//是否显示不在线玩家
			this.cmd = 0x2A0B;
			if (data) data.pos += this.read(data);
		}
	}

	/**0x2A0C
		 * 获取行会成员返回
		 * */
	export class stGlobalGuildMemberListRet extends Packet {
		public static msgID: number = 0x2A0C;
		public stZeroArray: Array<stSingleGuildMemberInfoBase> = [];
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("dwMaxPage", PacketBase.TYPE_DWORD);
			this.addProperty("dwAskJoinNum", PacketBase.TYPE_DWORD);
			this.addProperty("nCount", PacketBase.TYPE_INT);
			if (data) {
				data.pos += this.read(data);
			}
		}
		public read(data: Laya.Byte): number {
			data.pos = super.read(data);
			for (var i: number = 0; i < this.getValue('nCount'); i++) {
				this.stZeroArray[i] = new stSingleGuildMemberInfoBase(data);
			}
			return data.pos;
		}

	}

	// 0x2A39

	export class stGlobalGuildSabacOverView extends Packet {
		public static msgID: number = 0x2A39;
		public members: Array<stGuildMemberExtenBase> = [];
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("dwGuildId", PacketBase.TYPE_DWORD); //行会编号
			this.addProperty("szGuildName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN)
			this.addProperty('nCount', PacketBase.TYPE_INT);
			this.cmd = 0x2A39;
			if (data) {
				data.pos += this.read(data);
			}
		}

		public read(data: Laya.Byte): number {
			data.pos = super.read(data);
			for (var i: number = 0; i < this.getValue('nCount'); i++) {
				this.members[i] = new stGuildMemberExtenBase(data);
			}

			return data.pos;
		}

		public clear(): void {
			super.clear();
			for (var i: number = 0; i < this.members.length; i++) {
				this.members[i].clear();
				this.members[i] = null;
			}
			this.members.length = 0;
			this.members = null;

		}
	}


	// 0x2A2E
	/**行会中自己的信息*/
	export class stGlobalGuildSelfInfo extends Packet {
		public static msgID: number = 0x2A2E;
		public cbPacket = stGlobalGuildSelfInfoRet;
		public constructor(data: Laya.Byte = null) {
			super();
			this.cmd = 0x2A2E;
		}
	}


	// 0x2A2F
	/**行会中自己的信息返回*/

	export class stGlobalGuildSelfInfoRet extends Packet {
		public static msgID: number = 0x2A2F;
		public stPlayerInfo: stSingleGuildMemberInfoBase;
		public constructor(data: Laya.Byte) {
			super();
			if (data) {
				data.pos += this.read(data);
			}
		}
		public read(data: Laya.Byte): number {
			data.pos = super.read(data);
			this.stPlayerInfo = new stSingleGuildMemberInfoBase(data);
			return data.pos;
		}
	}

	// 0x2A35
	//发起投票
	export class stGlobalGuildVoteBanMaster extends Packet {
		public static msgID: number = 0x2A35;
		public cbPacket = stGlobalGuildVoteBanMasterRet;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("btVote", PacketBase.TYPE_BYTE);	//投票，1同意，0不同意
			this.cmd = 0x2A35;
		}
	}
	// 0x2A36
	// 发起投票返回
	export class stGlobalGuildVoteBanMasterRet extends Packet {
		public static msgID: number = 0x2A36;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("btError", PacketBase.TYPE_BYTE);//0已经成功投票
			if (data) {
				data.pos += this.read(data);
			}
		}
	}

	// 0x2A37
	//通知会员已经发起了废除会长
	export class stGlobalGuildVoteBanMasterNotice extends Packet {
		public static msg: number = 0x2A37;
		public stZeroArray: Array<stVoterBase> = [];
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("btErrorCode", PacketBase.TYPE_BYTE);//0是正确，其他是出错
			this.addProperty("szName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//发起人姓名
			this.addProperty("szDesc", PacketBase.TYPE_STRING, 512);//理由
			this.addProperty("dwBeginTime", PacketBase.TYPE_DWORD);//发起时间
			this.addProperty("nAgree", PacketBase.TYPE_INT);//同意人数
			this.addProperty("nDisagree", PacketBase.TYPE_INT);//不同意人数
			this.addProperty("nNotVoted", PacketBase.TYPE_INT);//未同意人数
			this.addProperty("btVoted", PacketBase.TYPE_BYTE);//本人投的票，1同意，2不同意,0没有投票
			this.addProperty('nCount', PacketBase.TYPE_INT);
			if (data) {
				data.pos += this.read(data);
			}
		}

		public read(data: Laya.Byte): number {
			data.pos = super.read(data);
			for (var i: number = 0; i < this.getValue("nCount"); i++) {
				this.stZeroArray.push(new stVoterBase(data));
			}
			return data.pos;
		}

		public clear(): void {
			super.clear();
			for (var i: number = 0; i < this.stZeroArray.length; i++) {
				this.stZeroArray[i].clear();
				this.stZeroArray[i] = null;
			}
			this.stZeroArray.length = 0;
		}

	}


	// 0x2A38
	//投票情况查看
	export class stGlobalGuildVoteBanMasterView extends Packet {
		public static msgID: number = 0x2A38;
		public constructor(data: Laya.Byte) {
			super();
			this.cmd = 0x2A38;
		}
	}



	// 0x1049
	export class stGreenGetGuildJoinConfig extends Packet {
		public static msgID: number = 0x1049;
		public cbPacket = stGreenGetGuildJoinConfigRet;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("dwGuildId", PacketBase.TYPE_DWORD);
			this.cmd = 0x1049;
			if (data) this.read(data);
		}
	}

	// 0x104A
	export class stGreenGetGuildJoinConfigRet extends Packet {

		public static msgID: number = 0x104A;
		public m_cStAddpersonArrWarror: Array<stGreenGuildJobJoinConfig> = [];
		public m_cWarriorJoinConfig: stGreenGuildJobJoinConfig = new stGreenGuildJobJoinConfig(null);
		public m_cMageJoinConfig: stGreenGuildJobJoinConfig = new stGreenGuildJobJoinConfig(null);
		public m_cMonkJoinConfig: stGreenGuildJobJoinConfig = new stGreenGuildJobJoinConfig(null);


		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("szGuildName", PacketBase.TYPE_STRING, 48);//行会名称
			this.addProperty("dwGuildLvl", PacketBase.TYPE_DWORD);//行会等级
			this.addProperty("dwMaxPlayerCount", PacketBase.TYPE_DWORD);//最大行会人数上限
			this.addProperty("szGuildJoinNotice", PacketBase.TYPE_STRING, 512);//行会招募公告

			this.addProperty("WarriorJoinConfig", PacketBase.TYPE_BYTES, this.m_cWarriorJoinConfig.size(), this.m_cWarriorJoinConfig);
			this.addProperty("MageJoinConfig", PacketBase.TYPE_BYTES, this.m_cMageJoinConfig.size(), this.m_cMageJoinConfig);
			this.addProperty("MonkJoinConfig", PacketBase.TYPE_BYTES, this.m_cMonkJoinConfig.size(), this.m_cMonkJoinConfig);
			if (data) {
				this.read(data);
				this.m_cStAddpersonArrWarror[0] = this.m_cWarriorJoinConfig;
				this.m_cStAddpersonArrWarror[1] = this.m_cMageJoinConfig;
				this.m_cStAddpersonArrWarror[2] = this.m_cMonkJoinConfig;
			}
			this.cmd = 0x104A;
		}
	}

	// 0x1050
	export class stGreenGuildSaveJoinConfigRet extends Packet {
		public static msgID: number = 0x1050;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("ErrorCode", PacketBase.TYPE_INT);

		}
	}

	/**0x2B0E
	 *   行会仓库物品回收
	 * */
	export class stGuidMasterRecoverItem extends Packet {
		public static msgID: number = 0x2B0E;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("i64ItemId", PacketBase.TYPE_INT64);
			this.addProperty("itemlv", PacketBase.TYPE_INT);
			this.addProperty("islast", PacketBase.TYPE_BOOL);
			this.cmd = 0x2B0E;
			if (data) {
				data.pos += this.read(data);
			}
		}
	}
	// 0x2B0F
	export class stGuidMasterRecoverItemRet extends Packet {
		public static msgID: number = 0x2B0F;
		public item: ItemBase = new ItemBase();
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("btError", PacketBase.TYPE_BYTE);//0 成功 ,1兑换值不够
			this.read(data);
		}
	}

	// 0x1013
	export class stGuildAlmsDecoder extends Packet {

		public static msgID: number = 0x1013;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('i64GemAlms', PacketBase.TYPE_INT64);
			this.addProperty('i64MineralAlms', PacketBase.TYPE_INT64);
			this.addProperty('i64SpiritAlms', PacketBase.TYPE_INT64);
			this.addProperty('i64GoldAlms', PacketBase.TYPE_INT64);
			this.read(data);

		}
	}

	// 0x1017
	export class stGuildAnimalLevelUpEncoderDecoder extends Packet {

		public static msgID: number = 0x1017;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('nErrorCode', PacketBase.TYPE_INT);
			this.addProperty('dwCurAnimalLv', PacketBase.TYPE_DWORD);
			this.cmd = 0x1017;
			this.read(data);

		}
	}

	/**
	 *行会申请提示
	 **/
	export class stGuildApply extends Packet {
		public static msgID: number = 0x2A4F;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("btState", PacketBase.TYPE_BYTE); //0不显示，1显示
			this.cmd = 0x2A4F;

			if (data) {
				data.pos += this.read(data);
			}
		}
	}


	// 0x1003
	export class stGuildChangeMember extends Packet {
		public static msgID: number = 0x1003;
		// public cbPacket = stGuildChangeMemberRet;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('btOPType', PacketBase.TYPE_BYTE);		//0 增加 1 删除 2 修改
			this.addProperty('btDstLvl', PacketBase.TYPE_BYTE);//目标等级
			this.addProperty('dwUserOnluId', PacketBase.TYPE_DWORD);////用户唯一ID
			this.addProperty('szMemberName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);		//要创建的氏族名
			this.cmd = 0x1003;
		}
	}

	export class stGuildChangeMemberRet extends Packet {
		public static msgID: number = 0x1004;
		public member: stGuildMemberBase = new stGuildMemberBase();
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('btOPType', PacketBase.TYPE_BYTE);		//0 增加 1 删除 2 修改
			this.addProperty('errorcode', PacketBase.TYPE_BYTE);
			this.addProperty('member', PacketBase.TYPE_BYTES, this.member.size(), this.member);
			this.read(data);
		}
	}

	// 0x2B0A
	export class stGuildDonateItemLog extends Packet {
		public static msgID: number = 0x2B0A;
		public cbPacket = stGuildDonateItemLogRet;
		public constructor() {
			super();
			this.cmd = 0x2B0A;
		}
	}

	// 0x2B0B
	export class stGuildDonateItemLogRet extends Packet {
		public static msgID: number = 0x2B0B;
		public stZeroArray: Array<stDonateLogBase> = [];
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("btError", PacketBase.TYPE_BYTE);//0 成功 
			this.addProperty('nCount', PacketBase.TYPE_DWORD);
			if (data) {
				data.pos += this.read(data);
			}
		}

		public read(data: Laya.Byte): number {
			data.pos = super.read(data);
			var co: number = this.getValue('nCount');
			for (var i: number = 0; i < this.getValue('nCount'); i++) {
				this.stZeroArray[i] = new stDonateLogBase(data);
			}
			return data.pos;
		}

		public clear(): void {
			super.clear();
			for (var i: number = 0; i < this.stZeroArray.length; i++) {
				this.stZeroArray[i].clear();
				this.stZeroArray[i] = null;
			}

			this.stZeroArray.length = 0;
			this.stZeroArray = null;
		}

	}

	// 0x100F

	export class stGuildGetEvents extends Packet {
		public static msgID: number = 0x100F;
		public cbPacket = stGuildGetEventsRet;
		public constructor(data: Laya.Byte) {
			super();
			this.cmd = 0x100F;
		}
	}
	// 0x1010
	export class stGuildGetEventsRet extends Packet {
		public static msgID: number = 0x1010;
		public events: Array<stGuildEventDB> = [];
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('nCount', PacketBase.TYPE_INT);
			this.read(data);
		}

		public read(data: Laya.Byte): number {
			data.pos = super.read(data);
			for (var i: number = 0; i < this.getValue('nCount'); i++) {
				this.events[i] = new stGuildEventDB(data);
			}

			return data.pos;
		}
	}
	// 0x100B
	export class stGuildGetLvlConfigs extends Packet {
		public static msgID: number = 0x100B;
		public cbPacket = stGuildGetLvlConfigsRet;
		public constructor(data: Laya.Byte) {
			super();
			this.cmd = 0x100B;
		}
	}
	// 0x100C
	export class stGuildGetLvlConfigsRet extends Packet {
		public static msgID: number = 0x100C;
		public LvlInfos: Array<stMemberLvlConfigBase> = [];
		public constructor(data: Laya.Byte) {
			super();
			this.read(data);
		}

		public read(data: Laya.Byte): number {
			data.pos = super.read(data);
			for (var i: number = 0; i < 10; i++) {
				this.LvlInfos[i] = new stMemberLvlConfigBase(data);
			}

			return data.pos;
		}
	}


	// 0x1009
	export class stGuildGetMembers extends Packet {
		public static msgID: number = 0x1009;
		public cbPacket = stGuildGetMembersRet;
		public constructor(data: Laya.Byte) {
			super();
			this.cmd = 0x1009;
		}
	}

	// 0x100A
	export class stGuildGetMembersRet extends Packet {
		public static msgID: number = 0x100A;
		public members: Array<stGuildMemberBase> = [];
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('guildname', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			this.addProperty('szNotice', PacketBase.TYPE_STRING, 512);//目标等级
			this.addProperty('nCount', PacketBase.TYPE_INT);
			this.read(data);

		}

		/*
		struct GuildGetMemberRet{
		char guildname[_max_name_len];
		char szNotice[512];
		stZeroArray<stGuildMember> FightIngGuildArr;
		}
		*/

		public read(data: Laya.Byte): number {
			data.pos = super.read(data);
			for (var i: number = 0; i < this.getValue('nCount'); i++) {
				this.members[i] = new stGuildMemberBase(data);
			}

			return data.pos;
		}
	}
	// 0x100D
	export class stGuildGetNotice extends Packet {
		public static msgID: number = 0x100D;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('btOPType', PacketBase.TYPE_BYTE);//0 今日公告  1 行会公
			this.cmd = 0x100D;
		}
	}

	// 0x1014
	export class stGuildLevelUpEncoderDecoder extends Packet {
		public static msgID: number = 0x1014;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('nErrorCode', PacketBase.TYPE_INT);
			this.addProperty('dwCurLv', PacketBase.TYPE_DWORD);
			this.cmd = 0x1014;
			if (data) this.read(data);
		}
	}

	// 0x1007
	export class stGuildSetLvlInfo extends Packet {
		public static msgID: number = 0x1007;
		public cbPacket = stGuildSetLvlInfoRet;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('btLvl', PacketBase.TYPE_BYTE);		//0 今日公告  1 行会公告
			this.addProperty('szLvlName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//目标等级
			this.addProperty('dwAuthoritys', PacketBase.TYPE_DWORD);////新权限
			this.cmd = 0x1007;
		}
	}

	// 0x1008
	export class stGuildSetLvlInfoRet extends Packet {
		public static msgID: number = 0x1008;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('btLvl', PacketBase.TYPE_BYTE);		//0 今日公告  1 行会公告
			this.addProperty('szLvlName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);//目标等级
			this.addProperty('dwAuthoritys', PacketBase.TYPE_DWORD);////新权限
			this.read(data);
		}
	}

	// 0x1005
	export class stGuildSetNotice extends Packet {
		public static msgID: number = 0x1005;
		public cbPacket = stGuildSetNoticeRet;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('btOPType', PacketBase.TYPE_BYTE);		//0 今日公告  1 行会公告
			this.addProperty('szNotice', PacketBase.TYPE_STRING, 512);//目标等级
			this.cmd = 0x1005;
		}
	}

	// 0x1006
	export class stGuildSetNoticeRet extends Packet {
		public static msgID: number = 0x1006;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('btOPType', PacketBase.TYPE_BYTE);		//0 今日公告  1 行会公告
			this.addProperty('szNotice', PacketBase.TYPE_STRING, 512);//目标等级
			this.read(data);
		}
	}

	// 0x1015
	export class stGuildWarEncoder extends Packet {
		public static msgID: number = 0x1015;
		public constructor(data: Laya.Byte) {
			super();

			this.addProperty('szToWarGuildId', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);

			this.cmd = 0x1015;
		}
	}

	// 0x1016
	export class stGuildWarInfoEncoderDecoder extends Packet {
		public static msgID: number = 0x1016;
		public stCurWarGuild: stWarGuildBase = new stWarGuildBase();
		public WarGuilds: Array<stWarGuildBase> = [];

		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("stCurWarGuild", PacketBase.TYPE_BYTES, this.stCurWarGuild.size(), this.stCurWarGuild);
			this.addProperty("FightIngGuildArr", PacketBase.TYPE_INT);
			this.cmd = 0x1016;
			if (data) this.read(data);
		}

		public read(data: Laya.Byte): number {
			data.pos = super.read(data);

			for (var i: number = 0; i < this.getValue('FightIngGuildArr'); i++) {
				this.WarGuilds[i] = new stWarGuildBase(data);
			}

			return data.pos;
		}
	}

	// 0x1018
	export class stGuildWarTipDecoder extends Packet {
		public static msgID: number = 0x1018;
		public TipWarGuild: stWarGuildBase = new stWarGuildBase();
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('nErrorCode', PacketBase.TYPE_INT);
			this.addProperty('nType', PacketBase.TYPE_INT);
			this.addProperty("TipWarGuild", PacketBase.TYPE_BYTES, this.TipWarGuild.size(), this.TipWarGuild);
			this.read(data);

		}
	}

	// 0x1011
	export class stQueryGuildInfoEncoder extends Packet {
		public static msgID: number = 0x1011;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty('dwGuildID', PacketBase.TYPE_DWORD);
			this.addProperty('dwPowerLvl', PacketBase.TYPE_BYTE);
			this.cmd = 0x1011;
		}
	}


	// 0x1012
	export class stQueryGuildInfoRetDecoder extends Packet {
		public static msgID: number = 0x1012;
		public constructor(data: Laya.Byte) {
			super();

			this.addProperty('dwGuildID', PacketBase.TYPE_DWORD);
			this.addProperty('btPowerLvl', PacketBase.TYPE_BYTE);
			this.addProperty('szGuildName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			this.addProperty('szLvlName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			this.addProperty('dwmaxplayercount', PacketBase.TYPE_DWORD);
			this.addProperty('dwGuildLevel', PacketBase.TYPE_DWORD);
			this.addProperty('i64GemNum', PacketBase.TYPE_INT64);
			this.addProperty('i64MineralNum', PacketBase.TYPE_INT64);
			this.addProperty('i64SpiritNum', PacketBase.TYPE_INT64);
			this.addProperty('i64GoldNum', PacketBase.TYPE_INT64);
			this.addProperty('wGuildAnimalLv', PacketBase.TYPE_WORD);
			this.read(data);
		}
	}

	// // 0x2A2C
	// export class strGlobalGuildSendAllianceList extends Packet {
	// 	public static msgID: number = 0x2A2C;
	// 	public guilds: Array<number> = [];
	// 	public constructor(data: Laya.Byte) {
	// 		super();
	// 		this.addProperty("nsize", PacketBase.TYPE_INT)
	// 		if (data) {
	// 			data.pos += this.read(data);
	// 		}
	// 	}
	// 	public read(data: Laya.Byte): number {
	// 		data.pos = super.read(data);
	// 		for (var i: number = 0; i < this.getValue('nsize'); i++) {
	// 			this.guilds.push(BaseFunctions.ReadInt(data, true));
	// 		}
	// 		return data.pos;
	// 	}
	// }

	// // 0x2a21
	// export class strGlobalGuildSendFightList extends Packet {
	// 	public guilds: Array<number> = [];
	// 	public static msgID: number = 0x2a21;
	// 	public constructor(data: Laya.Byte) {
	// 		super();
	// 		this.addProperty('nCount', PacketBase.TYPE_INT);
	// 		this.read(data);
	// 	}

	// 	public read(data: Laya.Byte): number {
	// 		data.pos += super.read(data);
	// 		for (var i: number = 0; i < this.getValue('nCount'); i++) {
	// 			this.guilds.push(BaseFunctions.ReadInt(data, true));
	// 		}
	// 		return data.pos;
	// 	}
	// }


	// 0x2A2D
	/**
	 * 星巴克禁言
	 * */
	export class stSabacMasterBlanUser extends Packet {
		public static msgID: number = 0x2A2D;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("btChatType", PacketBase.TYPE_BYTE);
			this.addProperty('szName', PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			this.cmd = 0x2A2D;
			if (data) {
				data.pos += this.read(data);
			}
		}
	}


	// 0x2B07
	export class stSucessGetGuildPackageItem extends Packet {
		public static msgID: number = 0x2B07;
		public item: ItemBase = new ItemBase();
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("btError", PacketBase.TYPE_BYTE);//0 成功 ,1兑换值不够
			this.addProperty("dwJiFen", PacketBase.TYPE_DWORD);
			this.addProperty('item', PacketBase.TYPE_BYTES, this.item.size(), this.item);
			this.read(data);
		}
		public clear(): void {
			super.clear();
			this.item = null;
		}
	}

	/**0x2B03
		 * 查看公会仓库
		 * */
	export class stViewGuildPackage extends Packet {
		public static msgID: number = 0x2B03;
		// public cbPacket = stViewGuildPackageRet;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("dwStoreId", PacketBase.TYPE_DWORD);//仓库编号
			this.cmd = 0x2B03;
		}
	}

	/**0x2B04
	  * 查看仓库的返回
	  * */
	export class stViewGuildPackageRet extends Packet {
		public static msgID: number = 0x2B04;
		public items: Array<ItemBase> = [];
		public ncount: number = 0;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("dwStoretype", PacketBase.TYPE_BYTE);//0表示清空1表示附加
			this.addProperty("dwStoreId", PacketBase.TYPE_DWORD);//仓库编号
			this.addProperty("nCount", PacketBase.TYPE_INT);//
			if (data) {
				data.pos += this.read(data);
			}
		}

		public read(data: Laya.Byte): number {
			data.pos = super.read(data);
			this.ncount = this.getValue('nCount');
			if (this.ncount > 0) {
				for (var i: number = 0; i < this.ncount; i++) {
					this.items[i] = new ItemBase(data);
				}

			}
			return 0;
		}

		public clear(): void {
			for (var i: number = 0; i < this.items.length; i++) {
				if (this.items[i]) {
					this.items[i].clear();
					this.items[i] = null;
				}
			}
			this.items.length = 0;
			this.ncount = 0;
			super.clear();
		}
	}

	// 0x2B05
	export class stWantGetGuildPackageItem extends Packet {
		public static msgID: number = 0x2B05;
		public constructor(data: Laya.Byte) {
			super();
			this.addProperty("i64ItemId", PacketBase.TYPE_INT64);//要捐献的装备ID
			this.cmd = 0x2B05;
		}
	}
	// 0x2B01
	// 点捐献
	export class stBeginDonateEquip extends Packet {
		public static msgID: number = 0x2B01;
		public cbPacket = stBeginDonateEquipRet;
		public constructor() {
			super();
			this.addProperty("i64ItemId", PacketBase.TYPE_INT64);//要捐献的装备ID
			this.addProperty("dwStoreId", PacketBase.TYPE_DWORD);//仓库编号
			this.cmd = 0x2B01;
		}
	}

    /** 0x2B02
	 * 捐献回
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

	// 0x2A54
	//前端获取行会名字
	export class stClientGetSingleGuildInfo extends Packet {
		public static msgID: number = 0x2A54;
		public cbPacket = stClientGetSingleGuildInfoRet;
		public constructor() {
			super();
			this.cmd = 0x2A54;
			this.addProperty("guildId", PacketBase.TYPE_DWORD);
		}
	}



	// 0x2A55
	//前端获取行会名字返回
	export class stClientGetSingleGuildInfoRet extends Packet {
		public static msgID: number = 0x2A55;
		public constructor() {
			super();
			this.addProperty("guildId", PacketBase.TYPE_DWORD);
			this.addProperty("guildName", PacketBase.TYPE_STRING, Packet._MAX_NAME_LEN);
			this.cmd = 0x2A55;
		}

	}
}


