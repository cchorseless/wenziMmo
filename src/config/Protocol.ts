/**
  * 前后端协议
  * by fany
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module Protocol {
  // 服务器错误码
  export const SERVER_SUCCESS = 0  //成功。
  export const SERVER_ERR_SRV_NO_READY = 1  // 服务器没有准备好。
  export const SERVER_ERR_SRV_OVERLOAD = 2  // 服务器负载过重。
  export const SERVER_ERR_ILLEGAL_LOGIN = 3  // 非法登录。
  export const SERVER_ERR_NAME_PASSWORD = 4  // 用户名或者密码不正确。
  export const SERVER_ERR_NAME = 5  // 用户名不正确。
  export const SERVER_ERR_PASSWORD = 6  // 密码不正确。
  export const SERVER_ERR_ACCOUNT_CREATE_FAILED = 7  // 创建账号失败（已经存在一个相同的账号）。
  export const SERVER_ERR_BUSY = 8  // 操作过于繁忙(例如：在服务器前一次请求未执行完毕的情况下连续N次创建账号)。
  export const SERVER_ERR_ACCOUNT_LOGIN_ANOTHER = 9  // 当前账号在另一处登录了。
  export const SERVER_ERR_ACCOUNT_IS_ONLINE = 10  // 账号已登陆。
  export const SERVER_ERR_PROXY_DESTROYED = 11  // 与客户端关联的proxy在服务器上已经销毁。
  export const SERVER_ERR_ENTITYDEFS_NOT_MATCH = 12  // EntityDefs不匹配。
  export const SERVER_ERR_SERVER_IN_SHUTTINGDOWN = 13  // 服务器正在关闭中。
  export const SERVER_ERR_NAME_MAIL = 14  // Email地址错误。
  export const SERVER_ERR_ACCOUNT_LOCK = 15  // 账号被冻结。
  export const SERVER_ERR_ACCOUNT_DEADLINE = 16  // 账号已过期。
  export const SERVER_ERR_ACCOUNT_NOT_ACTIVATED = 17  // 账号未激活。
  export const SERVER_ERR_VERSION_NOT_MATCH = 18  // 与服务端的版本不匹配。
  export const SERVER_ERR_OP_FAILED = 19  // 操作失败。
  export const SERVER_ERR_SRV_STARTING = 20  // 服务器正在启动中。
  export const SERVER_ERR_ACCOUNT_REGISTER_NOT_AVAILABLE = 21  // 未开放账号注册功能。
  export const SERVER_ERR_CANNOT_USE_MAIL = 22  // 不能使用email地址。
  export const SERVER_ERR_NOT_FOUND_ACCOUNT = 23  // 找不到此账号。
  export const SERVER_ERR_DB = 24  // 数据库错误(请检查dbmgr日志和DB)。
  export const SERVER_ERR_USER1 = 25  // 用户自定义错误码1。
  export const SERVER_ERR_USER2 = 26  // 用户自定义错误码2。
  export const SERVER_ERR_USER3 = 27  // 用户自定义错误码3。
  export const SERVER_ERR_USER4 = 28  // 用户自定义错误码4。
  export const SERVER_ERR_USER5 = 29  // 用户自定义错误码5。
  export const SERVER_ERR_USER6 = 30  // 用户自定义错误码6。
  export const SERVER_ERR_USER7 = 31  // 用户自定义错误码7。
  export const SERVER_ERR_USER8 = 32  // 用户自定义错误码8。
  export const SERVER_ERR_USER9 = 33  // 用户自定义错误码9。
  export const SERVER_ERR_USER10 = 34  // 用户自定义错误码10。
  export const SERVER_ERR_LOCAL_PROCESSING = 35  // 本地处理，通常为某件事情不由第三方处理而是由KBE服务器处理。
  export const SERVER_ERR_ACCOUNT_RESET_PASSWORD_NOT_AVAILABLE = 36  // 未开放账号重置密码功能。
  export const SERVER_ERR_ACCOUNT_LOGIN_ANOTHER_SERVER = 37  // 当前账号在其他服务器登陆了。
  // --------------------client与服务器通讯-----------------------------
  /**********************************cellapp相关事件*********************************** */
  /***********************************通用 cellapp事件 */
  // 实体进入视野
  export const OnEnterWorld: string = 'Entity.onEnterWorld';
  // 实体离开视野
  export const OnLeaveWorld: string = 'Entity.onLeaveWorld';
  // 实体进入房间
  export const OnEnterSpace: string = 'Entity.onEnterSpace';
  // 实体离开房间
  export const OnLeaveSpace: string = 'Entity.onLeaveSpace';

  /**********************************baseapp相关事件*********************************** */
  //*********************************通用 baseapp事件*********************************** */
  // 登陆服务器
  export const ReqLogin: string = "login";
  // 断线重连
  export const Re_ReqLogin: string = 'reloginBaseapp';
  // 创建账户
  export const CreateAccount: string = 'createAccount';
  // 绑定邮箱
  export const BindAccountEmail: string = 'bindAccountEmail';
  // 修改密码
  export const NewPassword: string = 'newPassword';

  //************************************游戏事件**************************************** */
  // 请求appServer列表信息
  export const GetAppServerInfo: string = 'Account.EntityCall.reqAppServerInfo';
  // 登陆到appServer
  export const LoginAppServer: string = 'Account.EntityCall.reqLoginToAppServer';

  /*********************************初始化客户端事件********************************* */
  // 初始化客户端数据
  export const InitClientData: string = "Avatar.EntityCall.reqInitClientData";
  // 请求背包数据
  export const BagInfo = 'Avatar.EntityCall.reqBagData';
  /** 请求获取配方列表 */
  export const ReqMakeBag = "Avatar.EntityCall.reqMakeBag";
  /** 请求获取图鉴信息 */
  export const ReqTuJianBag = "Avatar.EntityCall.reqTuJianBag";
  /**请求获取邮件列表 */
  export const ReqGetEmailList = "Avatar.EntityCall.reqGetEmailList";

  /***********************************监听服务器主动推送数据************************** */
  // GM获取道具,客户端背包改变
  export const GetItem: string = 'Avatar.EntityCall.reqGetItem';
  // 阵容改变
  export const JoinParty = 'Avatar.EntityCall.reqGetPartyList';
  // 改变图鉴
  export const UpdateTuJianBag = 'Avatar.EntityCall.FromUpdateTuJianBag';
  // 改变配方
  export const UpdateMakeBag = 'Avatar.EntityCall.FromUpdateMakeBag';
  // 客户端制造等级升级
  export const MakeLevelUp = 'Avatar.EntityCall.FromMakeLevelUp';
  // 改变邮件
  export const UpdateEmailList = 'Avatar.EntityCall.FromUpdateEmailList'

  /*********************************阵容********************************* */
  //请求上阵
  export const ReqJoinParty = "Avatar.EntityCall.reqJoinParty";

  //一键清空所有阵容
  export const ReqClearParty = "Avatar.EntityCall.reqClearParty";
  //请求升级
  export const ReqLevelUp = "Avatar.EntityCall.reqLevelUp";
  //请求强化装备
  export const ReqEquipQiangHua = "Avatar.EntityCall.reqEquipQiangHua";

  //请求洗练装备
  export const ReqEquipXiLian = "Avatar.EntityCall.reqEquipXiLian";

  //请求保存洗练的装备属性
  export const ReqEquipChangeSkill = "Avatar.EntityCall.reqEquipChangeSkill";

  /**请求卡牌升级 */
  export const ReqPartnerLvUp = "Avatar.EntityCall.reqPartnerLvUp";

  /**请求卡牌升星 */
  export const ReqPartnerStarUp = "Avatar.EntityCall.reqPartnerStarUp";

  /**请求武学升星 */
  export const ReqGongFaStarUp = "Avatar.EntityCall.reqGongFaStarUp";

  /**请求装备升星 */
  export const ReqEquipStarUp = "Avatar.EntityCall.reqEquipStarUp";

  /**请求领悟配方 */
  export const ReqLearnPeiFang = "Avatar.EntityCall.reqLearnPeiFang";

  /**请求制造物品 */
  export const ReqMakeItem = "Avatar.EntityCall.reqMakeItem";
  /**领取图鉴奖励 */
  export const ReqTuJianPrize = "Avatar.EntityCall.reqTuJianPrize";

  /**请求已经领取的图鉴奖励ID*/
  export const ReqTuJianPrize_hasDone = "Avatar.EntityCall.reqTuJianPrize_hasDone";

  /**主动领取邮件奖励 */
  export const ReqGetEmailPrize = "Avatar.EntityCall.reqGetEmailPrize";

  /**主动请求改变邮件已读状态 */
  export const ReqChangeEmailHadRead = "Avatar.EntityCall.reqChangeEmailHadRead";

  /**一键领取 */
  export const ReqGetAllEmailPrize = "Avatar.EntityCall.reqGetAllEmailPrize";

  /**一键删除 */
  export const ReqDeleteAllEmail = "Avatar.EntityCall.reqDeleteAllEmail";

  /**删除邮件 */
  export const ReqDeleteEmail = "Avatar.EntityCall.reqDeleteEmail";

  /**发送全世界/全联盟 聊天消息 */
  export const ReqSendGroupMessage = "Avatar.EntityCall.reqSendGroupMessage";

  /**监听服务器推送的聊天信息 */
  export const ReqSendMessage = "Avatar.EntityCall.reqSendMessage";

  /**请求使用宝箱 */
  export const ReqUseBaoXiang = "Avatar.EntityCall.reqUseBaoXiang";

  /**图鉴合成人物 */
  export const ReqTuJianHeCheng = "Avatar.EntityCall.reqTuJianHeCheng";

  /**请求查找玩家 */
  export const ReqFindAvatar = "Avatar.EntityCall.reqFindAvatar";

  /**请求好友列表 */
  export const ReqGetFriendInfo = "Avatar.EntityCall.reqGetFriendInfo";

  /**请求好友申请列表 */
  export const ReqGetFriendApplyForInfo = "Avatar.EntityCall.reqGetFriendApplyForInfo";

  /**请求添加好友 */
  export const ReqAddFriend = "Avatar.EntityCall.reqAddFriend";

  /**拒绝添加好友 */
  export const ReqRefuseFriend = "Avatar.EntityCall.reqRefuseFriend";

  /**同意添加好友 */
  export const ReqAgreeFriend = "Avatar.EntityCall.reqAgreeFriend";

  /**监听更新好友列表 */
  export const FromUpdateFriendInfo = "Avatar.EntityCall.FromUpdateFriendInfo";

  /**监听更新好友申请列表 */
  export const FromUpdateFriendApplyForInfo = "Avatar.EntityCall.FromUpdateFriendApplyForInfo";

  /**登陆后 获取离线消息 */
  export const FromOffLineMessage = "Avatar.EntityCall.FromOffLineMessage";

  /**发送私聊给个人 */
  export const ReqSendPersonMessage = "Avatar.EntityCall.reqSendPersonMessage";

  /**请求布阵 */
  export const ReqChangePartyOrder = "Avatar.EntityCall.reqChangePartyOrder";

  /**请求分解装备 */
  export const ReqResolveEquip = "Avatar.EntityCall.reqResolveEquip";

  /**请求分解武学 */
  export const ReqResolveGongFa = "Avatar.EntityCall.reqResolveGongFa";

  /**拉取联盟信息 */
  export const ReqGetAllLianMengInfo = "Avatar.EntityCall.reqGetAllLianMengInfo";

  /**请求加入联盟 */
  export const ReqJoinLianMeng = "Avatar.EntityCall.reqJoinLianMeng";

  /**请求离开联盟 */
  export const ReqLeaveLianMeng = "Avatar.EntityCall.reqLeaveLianMeng";

  /**请求修改联盟公告 */
  export const ReqChangeLianMengNotice = "Avatar.EntityCall.reqChangeLianMengNotice";

  /**拉取自己联盟信息 */
  export const ReqGetLianMengInfo = "Avatar.EntityCall.reqGetLianMengInfo";

  /**请求拉取联盟玩家信息 */
  export const ReqGetLianMengPlayerInfo = "Avatar.EntityCall.reqGetLianMengPlayerInfo";

  /**请求拉取联盟玩家功绩排名 */
  export const ReqGetLianMengPlayerRank = "Avatar.EntityCall.reqGetLianMengPlayerRank";

  /**请求扭蛋 */
  export const ReqNiuDan = "Avatar.EntityCall.reqNiuDan";

  /*请求获取挂机信息*/
  export const ReqGuaJiInfo = "Avatar.EntityCall.reqGuaJiInfo";

  /*请求挑战关卡BOSS*/
  export const ReqBattleBoss = "Avatar.EntityCall.reqBattleBoss";

  /*请求更改挂机关卡*/
  export const ReqChangeGuaJiInfo = "Avatar.EntityCall.reqChangeGuaJiInfo";

  /*请求扫荡关卡*/
  export const ReqSaoDangPrize = "Avatar.EntityCall.reqSaoDangPrize";

  /*请求快速挂机奖励*/
  export const ReqQuickGuaJiPrize = "Avatar.EntityCall.reqQuickGuaJiPrize";

  /*请求增加挂机时间*/
  export const ReqAddSafeTime = "Avatar.EntityCall.reqAddSafeTime";

  /*请求领取挂机奖励*/
  export const ReqGetGuaJiPrize = "Avatar.EntityCall.reqGetGuaJiPrize";

  /*完成挂机事件*/
  export const ReqFinishGuaJiEvent = "Avatar.EntityCall.reqFinishGuaJiEvent";

  /*拉取房间内其他挂机玩家列表信息*/
  export const ReqGetAllAvatarInfoInGuaJiRoom = "Avatar.EntityCall.reqGetAllAvatarInfoInGuaJiRoom";
}
