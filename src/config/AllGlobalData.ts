/**
  * 游戏全局参数
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module GlobalData {

  /*********************用户基础信息**********************/
  export var userInfo: any;                                                         //第三方登陆数据
  export var name: string;                                                          //昵称
  export var avatarIcon: string;                                                    //头像图片路径
  export var openid: string = "";
  export var token: string = "";                                                    //微信登陆成功的密匙，使用此内容login
  export var legalKey: Array<any> = [];                                             //合法的更改属性的密钥
  export var tableState: string = "0";                                              //0 空闲  1，游戏中
  export var isSign: boolean = false;                                               //是否已经签到 0未签到
  export var serverid: string = "";
  export var version: string = "";//版本号
  // export var account: KBEngine.Account;                                             //账号实体
  // export var avatar: KBEngine.Avatar;                                               //角色实体
  export var serverInfo;                                                            //服务器信息
  export var huancun: any = null;
  export var hasLogin: boolean = false;                                              //是否已经登录过，

  //kbe配置
  export var isWss: Boolean = false;                                                    // 通讯协议，true:wss://  false:ws://
  export var remoteServer: Boolean = true;                                             // 服务器调试环境，true :云服务器；false :本地服务器
  export var connectIP: string = (GlobalData.remoteServer) ? '101.132.174.5' : '192.168.200.64';
  export var connectPort: number = 20013;
  export var cdnResUrl: string = '';
  export var curData: string = 'Laya_h5';
  export var updateHZ: number = 100;                                                      // 客户端玩家跟新更新坐标频率
  export var clientType: number = EnumData.CLIENT_TYPE.CLIENT_TYPE_MOBILE;                // 客户端类型
  export var isOnInitCallPropertysSetMethods: boolean = true;                             // 在Entity初始化时是否触发属性的set_*事件(callPropertysSetMethods)

  // game配置
  export var appType: string = 'App_CheMaoXian';                                          // 小游戏类型,服务器上有专门处理该类型的类
  export var avatarType: string = 'Avatar';                                               // 小游戏avatar类型
  export var platform: string = 'Web';                                                  // 小游戏客户端运行平台
  export var music: any = { "data": { "musicurl": 1 } };                                  // 外部加载背景音乐
  export var isGuest: boolean = false;                                                    // 来宾模式，随机一个账号进行服务器登陆
  export var reConnectUpper: number = 5;                                                  // 断线连接次数上限
  export var isDebug: boolean = false;//调试模式

  /***************************end***************************/

  /*********************用户基础配置**********************/
  export var isMusic: boolean = true;//音乐开关  
  export var isSound: boolean = true;//按键音效
  export var lang: any = null;       //语言配置
  /***************************end***************************/

  /*************************用户初始化数据****************** */
  export var json;//策划配置表

  /******************************************************** */

  /*************************用户本地数据******************** */
  export var AppServerInfo: { serverInfo: Array<any>, avatarInfo: Array<any> };//服务器列表信息
  export var BagInfo: { comnBag: any, rareBag: any } = { comnBag: {}, rareBag: {} };//物品背包

  /******************************************************** */

} 