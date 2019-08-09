#ifndef  CONSIGNMENT_CMD_DFJAKSDFJIWFNAKSDFNEWKEEEFASDF
#define CONSIGNMENT_CMD_DFJAKSDFJIWFNAKSDFNEWKEEEFASDF
#include "client_cmd.h"
#include "Item_cmd.h"

#define DB_CONSIGN_TBL "mydb_consignment"
#define DB_CONSIGNOK_TBL "mydb_consignment_ok"
#define DB_CONSIGNHISTORY_TBL "mydb_consignment_history"
#define DB_CONSIGNCONFIG_TBL "config_consignment"
#define MAX_PAGE_LEN	20

#define SUBCMD_CONSIGNMENT_SEARCH              1
#define SUBCMD_CONSIGNMENT_CHANGEPAGE          2
#define SUBCMD_CONSIGNMENT_SEARCH_RET          3
#define SUBCMD_CONSIGNMENT_SELL                4
#define SUBCMD_CONSIGNMENT_SELL_RET			   5
#define SUBCMD_CONSIGNMENT_BUY                 6
#define SUBCMD_CONSIGNMENT_SELL_LOG			   7
#define SUBCMD_CONSIGNMENT_TOTAL_MONEY		   8
#define SUBCMD_CONSIGNMENT_GET_MONEY		   9
#define SUBCMD_CONSIGNMENT_TAKEITEM            10
#define SUBCMD_CONSIGNMENT_GETMONEY_INNER	   11
#define SUBCMD_CONSIGNMENT_SELL_INNER          20  //出售内部消息
#define SUBCMD_CONSIGNMENT_BUY_INNER           21  //购买内部消息
#define SUBCMD_CONSIGNMENT_TAKEITEM_INNER      23	//提取物品内部包


enum emSearchType{
	em_Consignment_SearchNow			= 0,			//当前搜索的物品列表	
	em_Consignment_SearchBuyNoTake		= 1,			//买了未领取
	em_Consignment_SearchBuyAndTake		= 2,			//买了领取
	em_Consignment_SearchMySell			= 3,			//我的摊位
	em_Consignment_SearchSellNoTake		= 4,			//卖了未领取
	em_Consignment_SearchSellAndTake	= 5,			//卖了领取
	em_Consignment_SearchSellDown		= 6,			//超时下架
	em_Consignment_SearchSellLog		= 7,			//前端日志(最近的50条,超过两天清掉[卖了|超时下架])
	em_Consignment_SearchNowPage		= 8,			//当前搜索页的物品列表
};

enum emConsignSellType{
	Sell_Consign_Gold,		//金币
	Sell_Consign_Rmb,		//元宝
};

#pragma pack(push,1)

struct stConsignItem:public stItem
{
	uint dwIndex;					//寄售条目索引
	byte btConsignType;				//寄售类型(0 金币 1 元宝)
	char szName[_MAX_NAME_LEN_];	//物品名字
	ushort wType;						//物品类型
	uint dwWearLevel;				//佩戴等级
	uint dwZSLevel;				//转生等级
	byte  btRare;					//物品品质 稀世等
	uint dwConsignPrice;
	int64 i64SellOnlyId;
	int64 i64BuyOnlyId;
	uint tLeftTime;				//过期时间
	char szSeller[_MAX_NAME_LEN_];  //出售人
	uint tSellTime;				//售出时间
	char szBuyer[_MAX_NAME_LEN_];	//购买人
	byte btState;
	char szSellTip[_MAX_TIP_LEN_];
	bool boShowSellName;
	stConsignItem(){
		ZEROSELF;
	}
};


//c-s 搜索指定的物品 返回第一页
struct stConsignSearch:public stClientGameSvrConsignmentCmd<SUBCMD_CONSIGNMENT_SEARCH>{
	char szName[_MAX_NAME_LEN_];	//物品名字
	ushort wSubType;					//子类型
	ushort wType;						//主类型
	byte btFuzzyQuery;				//模糊查询
	byte btSortType;				//升降序
	char szSeller[_MAX_NAME_LEN_];	//出售者
	uint dwLowLv;					
	uint dwHighLv;
	stConsignSearch(){
		ZEROSELF
	}
};

//s-c 返回物品信息列表
struct stConsignSearchRet:public stClientGameSvrConsignmentCmd<SUBCMD_CONSIGNMENT_SEARCH_RET>{
	int nTotalSize;
	int nCurPage;
	byte btType;		//0 搜索返回,3正在出售
	stZeroArray<stConsignItem> items;//物品列表
	stConsignSearchRet(){
		ZEROCMD;
	}
};

//c-s 搜索制定编号页面 返回 stConsignSearchRet
struct stConsignChangePage:public stClientGameSvrConsignmentCmd<SUBCMD_CONSIGNMENT_CHANGEPAGE>{
	int nPage; //页面数量 每页8件
	byte btType;	//0搜索换页
};

////////////////////////////////////////////////////////////////////////////////////////
//c-s 出售物品
struct stConsignSellItem:public stClientGameSvrConsignmentCmd<SUBCMD_CONSIGNMENT_SELL>{
	int64 i64Id; //物品编号
	uint dwCount; //数量
	byte btDays;   //寄售的天数
	uint dwPrice; //售价
	uint dwCost;	//手续费,客户端不用管
	char szSellTip[_MAX_TIP_LEN_];
	byte btConsignType;
	bool boShowSellName;	//是否显示名字
};

struct stConsignSellItemRet : public stClientGameSvrConsignmentCmd<SUBCMD_CONSIGNMENT_SELL_RET>{
	byte btErrorCode;		//0 上架， 1下架
	stConsignSellItemRet(){
		ZEROCMD;
	}
};

//s-s 内部消息 出售物品数据传递
struct stConsignSellItemInner:public stClientGameSvrConsignmentCmd<SUBCMD_CONSIGNMENT_SELL_INNER>{
	int64 i64ItemId;	//物品id
	bool boShowName;	//是否匿名
	byte btErrorCode;	//返回的错误代码
	uint dwItemSearchTypeId;
	uint dwItemSearchSubTypeId;
	stConsignItem item;
};
/////////////////////////////////////////////////////////////////////////////////////////////////
//c-s 购买物品 A
struct stConsignBuyItem:public stClientGameSvrConsignmentCmd<SUBCMD_CONSIGNMENT_BUY>{
	uint dwIndex; //寄售索引
	uint dwGold;	//服务器用,客户端不用管
	uint dwCommissionGold;	//税收
	byte btConsignType;
};

struct stConsignItemLog{
	char szItemName[_MAX_NAME_LEN_];  //出售人
	uint tSellTime;				//售出时间
	uint dwPrice;					//Price
	char szBuyer[_MAX_NAME_LEN_];	//购买人
	byte btState;					//0 卖了未取,1卖了已取,2超时下架
};

struct stConsignItemLogCmd : public stClientGameSvrConsignmentCmd<SUBCMD_CONSIGNMENT_SELL_LOG>{
	stZeroArray<stConsignItemLog> items;
	stConsignItemLogCmd(){
		ZEROCMD;
	}
};

struct stConsignTotalMoney : public stClientGameSvrConsignmentCmd<SUBCMD_CONSIGNMENT_TOTAL_MONEY>{
	uint dwMoney;
	stConsignTotalMoney(){
		ZEROCMD;
	}
};
//client-super
struct stConsignGetMoney : public stClientGameSvrConsignmentCmd<SUBCMD_CONSIGNMENT_GET_MONEY>{
	stConsignGetMoney(){
		ZEROCMD;
	}
};

struct stConsignGetMoneyInner : public stClientGameSvrConsignmentCmd<SUBCMD_CONSIGNMENT_GETMONEY_INNER>{
	byte btErrorCode;
	uint dwMoney;
	stConsignGetMoneyInner(){
		ZEROCMD;
	}
};


//ss-gs 购买物品内部消息 传递物品数据 B 
struct stConsignBuyItemInner:public stClientGameSvrConsignmentCmd<SUBCMD_CONSIGNMENT_BUY_INNER>{
	byte btErrorCode;
	uint dwGold;
	uint dwIndex;
	byte btConsignType;
};

//////////////////////////////////////////////////////////////////////////////////////////////

//c-s 取回交易成功的物品
struct stConsignTakeMyItem:public stClientGameSvrConsignmentCmd<SUBCMD_CONSIGNMENT_TAKEITEM>{
	uint dwIndex; //取回的物品的寄售编号 
	byte btType;
};

struct stConsignTakeMyItemInner:public stClientGameSvrConsignmentCmd<SUBCMD_CONSIGNMENT_TAKEITEM_INNER>{
	byte btType;	//0 取物品 1 取钱 3购买后自动取回物品
	uint dwIdx;	//寄售条目id
	uint dwGold;
	stItem item;
	bool boOk;		//提取成功
};

struct stConsignConfig{
	int  nMaxSellCount;
	int  nMinSellLevel;
	int  nMaxSellPrice;
	int  nMinSellPrice; //Days
	uint nSellDayCount;
	uint dwGoldCostRate;
	uint dwMinGoldCost;
	stConsignConfig(){
		nMaxSellCount= 50;
		nMinSellLevel= 1;
		nMaxSellPrice= 999999999;
		nMinSellPrice= 1;
		nSellDayCount = 3;
		dwMinGoldCost = 0;
		dwGoldCostRate = 2;
		 
	}
};

static dbCol ConsignConfig_define[] = { 
	{_DBC_SO_("最大出售个数", DB_DWORD, stConsignConfig, nMaxSellCount)}, 
	{_DBC_SO_("最低出售等级", DB_DWORD, stConsignConfig, nMinSellLevel)}, 
	{_DBC_SO_("最高售价", DB_DWORD, stConsignConfig, nMaxSellPrice)}, 
	{_DBC_SO_("最低售价", DB_DWORD, stConsignConfig, nMinSellPrice)}, 
	{_DBC_SO_("最大寄售天数", DB_DWORD, stConsignConfig, nSellDayCount)},
	{_DBC_SO_("寄售费用百分比", DB_DWORD, stConsignConfig, dwGoldCostRate)},
	{_DBC_SO_("寄售最低费用", DB_DWORD, stConsignConfig, dwMinGoldCost)},
	{_DBC_MO_NULL_(stConsignConfig)}, 
};
 


struct stConsignRecord
{
	uint dwIndex;
	byte btConsignType;
	char szName[_MAX_NAME_LEN_];
	uint dwPrice;
	uint dwOnePrice;
	ushort dwType;
	uint dwWearLevel;
	byte btRare;
	byte btLevel;
	uint dwSearchTypeID;
	uint dwSearchSubTypeID;
	int64 i64SellOnlyId;
	int64 i64BuyOnlyId;
	char szSeller[_MAX_NAME_LEN_];
	char szBuyer[_MAX_NAME_LEN_];
	char szItem[2048];
	byte btState;
	uint tStopTime;  //下架时间
	uint tBuyTime; //购买时间
	uint dwCountryID; //出售国家ID
	uint dwVersion;
	char szSellTip[_MAX_TIP_LEN_];
	char szItem64Id[20];
	uint dwTimeSec;		//下架时间(sec)
	stConsignRecord(){
		ZEROSELF;
	}
};


static dbCol ConsignRecord_define[] = { 
	{_DBC_SO_("ConId", DB_DWORD, stConsignRecord, dwIndex)}, 
	{_DBC_SO_("ConType", DB_BYTE, stConsignRecord, btConsignType)}, 
	{_DBC_SO_("ItemName", DB_STR, stConsignRecord, szName)}, 
	{_DBC_SO_("ItemPrice", DB_DWORD, stConsignRecord, dwPrice)}, 
	{_DBC_SO_("ItemType", DB_DWORD, stConsignRecord, dwType)},
	{_DBC_SO_("ItemWearLevel", DB_DWORD, stConsignRecord, dwWearLevel)},
	{_DBC_SO_("ItemQuality", DB_BYTE, stConsignRecord, btRare)},
	{_DBC_SO_("ItemZSLevel", DB_BYTE, stConsignRecord, btLevel)},
	{_DBC_SO_("SellerId", DB_QWORD, stConsignRecord, i64SellOnlyId)},
	{_DBC_SO_("SellerName", DB_STR, stConsignRecord, szSeller)},
	{_DBC_SO_("ItemAttribute", DB_STR, stConsignRecord, szItem)},
	{_DBC_SO_("ConState", DB_BYTE, stConsignRecord, btState)},
	{_DBC_SO_("ItemDownTime", DB_DATETIME, stConsignRecord, tStopTime)},
	{_DBC_SO_("ItemSelledTime", DB_DATETIME, stConsignRecord, tBuyTime)},
	{_DBC_SO_("BuyerId", DB_QWORD, stConsignRecord, i64BuyOnlyId)},
	{_DBC_SO_("buyerName", DB_STR, stConsignRecord, szBuyer)},
	{_DBC_SO_("CountryID", DB_DWORD, stConsignRecord, dwCountryID)},
	{_DBC_SO_("ItemEdition", DB_DWORD, stConsignRecord, dwVersion)},
	{_DBC_SO_("ItemSellMsg", DB_STR, stConsignRecord, szSellTip)},
	{_DBC_SO_("ItemI64Id", DB_STR, stConsignRecord, szItem64Id)},
	{_DBC_SO_("SearchTypeId", DB_DWORD, stConsignRecord, dwSearchTypeID)},
	{_DBC_SO_("SearchTypeSubId", DB_DWORD, stConsignRecord, dwSearchSubTypeID)},
	{_DBC_SO_("OnePrice", DB_DWORD, stConsignRecord, dwOnePrice)},
	{_DBC_SO_("TimeSec", DB_DWORD, stConsignRecord, dwTimeSec)},

	{_DBC_MO_NULL_(stConsignRecord)}, 
};

/////////////////////////////////////////////////////////////////////////////////////

struct stConsignOkRecord
{
	uint dwIndex;
	uint dwConId;
	byte btConsignType;
	char szName[_MAX_NAME_LEN_];
	uint dwPrice;
	int64 i64SellOnlyId;
	int64 i64BuyOnlyId;
	char szSeller[_MAX_NAME_LEN_];
	char szBuyer[_MAX_NAME_LEN_];
	char szItem[2048];
	uint tBuyTime; //购买时间
	uint dwVersion;
	byte  btBuyerTakeItem;
	byte  btSellerTakeGold;
	char szItem64Id[20];
	uint dwTimeStamp;

	stConsignOkRecord(){
		ZEROSELF;
	}
};

static dbCol ConsignOkRecord_define[] = { 
	{_DBC_SO_("OkId", DB_DWORD, stConsignOkRecord, dwIndex)},
	{_DBC_SO_("ConId", DB_DWORD, stConsignOkRecord, dwConId)},	
	{_DBC_SO_("ConType", DB_BYTE, stConsignOkRecord, btConsignType)}, 
	{_DBC_SO_("ItemName", DB_STR, stConsignOkRecord, szName)}, 
	{_DBC_SO_("ItemPrice", DB_DWORD, stConsignOkRecord, dwPrice)}, 
	{_DBC_SO_("SellerId", DB_QWORD, stConsignOkRecord, i64SellOnlyId)},
	{_DBC_SO_("SellerName", DB_STR, stConsignOkRecord, szSeller)},
	{_DBC_SO_("ItemAttribute", DB_STR, stConsignOkRecord, szItem)},
	{_DBC_SO_("ConTime", DB_DATETIME, stConsignOkRecord, tBuyTime)},
	{_DBC_SO_("BuyerId", DB_QWORD, stConsignOkRecord, i64BuyOnlyId)},
	{_DBC_SO_("buyerName", DB_STR, stConsignOkRecord, szBuyer)},
	{_DBC_SO_("BuyerTakeItem", DB_BYTE, stConsignOkRecord, btBuyerTakeItem)}, 
	{_DBC_SO_("SellerTakeGold", DB_BYTE, stConsignOkRecord, btSellerTakeGold)}, 
	{_DBC_SO_("ItemEdition", DB_DWORD, stConsignOkRecord, dwVersion)}, 
	{_DBC_SO_("ItemI64Id", DB_STR, stConsignOkRecord, szItem64Id)},
	{_DBC_SO_("TimeStamp", DB_DWORD, stConsignOkRecord, dwTimeStamp)},
	{_DBC_MO_NULL_(stConsignOkRecord)}, 
};

////////////////////////////////////////////////////////////////////////////////

struct stGlobalNotice
{
	uint dwIndex;
	char szNotice[512];
	int nStratTime;
	int nEndTime;
	int nDelayTime;
	byte btShow;
	stGlobalNotice(){
		ZEROSELF;
	}
};


static dbCol GlobalNotice_define[] = { 
	{_DBC_SO_("idx", DB_DWORD, stGlobalNotice, dwIndex)}, 
	{_DBC_SO_("公告内容", DB_STR, stGlobalNotice, szNotice)}, 
	{_DBC_SO_("开始时间", DB_DWORD, stGlobalNotice, nStratTime)}, 
	{_DBC_SO_("结束时间", DB_DWORD, stGlobalNotice, nEndTime)},
	{_DBC_SO_("间隔时间", DB_DWORD, stGlobalNotice, nDelayTime)},
	{_DBC_SO_("是否启用", DB_BYTE, stGlobalNotice, btShow)},
	{_DBC_MO_NULL_(stGlobalNotice)}, 
};


#pragma pack(pop)
#endif
