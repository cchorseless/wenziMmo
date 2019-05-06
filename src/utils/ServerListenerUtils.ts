/**
 * 监听服务器主动推送的消息
 * by pipixia
 */
class ServerListenerUtils {
    private static _instance: ServerListenerUtils = null;
    public constructor() {
        if (ServerListenerUtils._instance) {
            throw new Error("Instance is alreally exist");
        }

    }
    public static getInstance(): ServerListenerUtils {
        let Class: any = this;
        if (!Class._instance) {
            Class._instance = new Class();
        }
        return Class._instance;
    }
    // 初始化监听器
    public init(): void {
        this.initClientData();
        this.changeClientData();
    }
    // 客户端监听服务器初始化客户端的事件
    public initClientData(): void {
        // 初始化背包
        lcp.LListener.getInstance().on(Protocol.BagInfo, this, this.initBag.bind(this));
        // 初始化配方背包
        lcp.LListener.getInstance().on(Protocol.ReqMakeBag, this, this.initBag.bind(this));
        // 初始化图鉴背包
        lcp.LListener.getInstance().on(Protocol.ReqTuJianBag, this, this.initBag.bind(this));
        // 初始化邮件信息
        lcp.LListener.getInstance().on(Protocol.ReqGetEmailList, this, this.initEmail.bind(this));
        //初始化好友列表
        lcp.LListener.getInstance().on(Protocol.ReqGetFriendInfo, this, this.initFriendslist.bind(this));
        //初始化好友申请列表
        lcp.LListener.getInstance().on(Protocol.ReqGetFriendApplyForInfo, this, this.initFriendsapplylist.bind(this));
        /**初始化离线聊天信息 */
        lcp.LListener.getInstance().on(Protocol.FromOffLineMessage, this, this.initOffLineMessage.bind(this));

        lcp.LListener.getInstance().on(Protocol.ReqGuaJiInfo, this, this.ReqGuajiinfo.bind(this))
    }
    // 客户端监听服务器改变客户端的事件
    private changeClientData(): void {
        // 监听背包修改
        lcp.LListener.getInstance().on(Protocol.GetItem, this, this.changeBag.bind(this));
        // 监听阵容改变
        lcp.LListener.getInstance().on(Protocol.JoinParty, this, this.changeParty.bind(this));
        // 监听图鉴改变
        lcp.LListener.getInstance().on(Protocol.UpdateTuJianBag, this, this.changeTuJianBag.bind(this));
        // 监听配方改变
        lcp.LListener.getInstance().on(Protocol.UpdateMakeBag, this, this.changeMakeBag.bind(this));
        // 监听邮件信息改变
        lcp.LListener.getInstance().on(Protocol.UpdateEmailList, this, this.UpdateEmailList.bind(this));

        lcp.LListener.getInstance().on(Protocol.MakeLevelUp, this, this.makeLevelUp.bind(this));

        lcp.LListener.getInstance().on(Protocol.ReqSendMessage, this, this.UpdateWorldChannelMessages.bind(this));

        lcp.LListener.getInstance().on(Protocol.FromUpdateFriendApplyForInfo, this, this.UpdateFriendApplyForInfo.bind(this));

        lcp.LListener.getInstance().on(Protocol.FromUpdateFriendInfo, this, this.UpdateFriendInfo.bind(this));

    }
    // 初始化背包信息
    private initBag(data): void {
        if (data.code == Protocol.SERVER_SUCCESS) {
            let _data = JSON.parse(data.data)
            if (_data.comnBag) {
                GlobalData.BagInfo.comnBag = _data.comnBag;
                console.log("成功获取普通背包信息");
            }
            if (_data.rareBag) {
                GlobalData.BagInfo.rareBag = _data.rareBag;
                console.log("成功获取稀有背包信息");
            }
            if (_data.tuJianBag) {
                GlobalData.TuJianInfo = _data.tuJianBag;
                console.log("成功获取图鉴背包信息");
            }
            if (_data.makeBag) {
                GlobalData.MakeBagInfo = _data.makeBag;
                console.log("成功获取配方背包信息");
            }
        }
        else {
            TipsManage.showTips('获取背包数据失败');
        }
    }
    // 初始化邮件信息
    private initEmail(data): void {
        if (data.code == Protocol.SERVER_SUCCESS) {
            let _data = JSON.parse(data.data)
            GlobalData.EmailList = _data;
            console.log("成功获取邮件信息");
        }
        else {
            TipsManage.showTips('获取邮件数据失败');
        }
    }
    /**初始化好友列表 */
    private initFriendslist(data): void {
        console.log(data.code, JSON.parse(data.data));
        if (data.code == Protocol.SERVER_SUCCESS) {
            let _data = JSON.parse(data.data);
            GlobalData.friendslist = _data;
            console.log("成功获取好友列表信息");
        }
        else {
            TipsManage.showTxt("获取好友列表数据失败");
        }
    }
    /**初始化好友申请列表 */
    private initFriendsapplylist(data): void {
        console.log(data.code, JSON.parse(data.data));
        if (data.code == Protocol.SERVER_SUCCESS) {
            let _data = JSON.parse(data.data);
            GlobalData.friendsapplylist = _data;
            console.log("成功获取好友申请列表信息");
        }
        else {
            TipsManage.showTxt("获取好友申请列表数据失败");
        }
    }
    /**初始化离线消息 */
    private initOffLineMessage(data): void {
        console.log(data.code, JSON.parse(data.data));
        if (data.code == Protocol.SERVER_SUCCESS) {
            let _data = JSON.parse(data.data);
            GlobalData.OffLineMessages = _data;
            for (let key in GlobalData.OffLineMessages) {
                GlobalData.privatechatlist[key] = GlobalData.OffLineMessages[key][0];
                for (var i = 0; i < GlobalData.OffLineMessages[key].length; i++) {
                    GlobalData.privatechannelmessages.push(GlobalData.OffLineMessages[key][i]);
                }
            }
            console.log("成功获取离线消息信息");
        }
        else {
            TipsManage.showTxt("获取离线消息数据失败");
        }
    }
    // 服务器主动推送物品，修改背包数据
    private changeBag(data): void {
        if (data.code == Protocol.SERVER_SUCCESS) {
            let _data = JSON.parse(data.data)
            for (let i in _data.comnBag) {
                if (_data.comnBag[i] == null) {
                    delete GlobalData.BagInfo.comnBag[i];
                }
                else if (_data.comnBag[i].count == 0) {
                    delete GlobalData.BagInfo.comnBag[i];
                }
                else {
                    GlobalData.BagInfo.comnBag[i] = _data.comnBag[i]
                    TipsManage.showTxt(_data.comnBag[i].itemId)
                }
            }
            for (let i in _data.rareBag) {
                if (_data.rareBag[i] == null) {
                    delete GlobalData.BagInfo.rareBag[i];
                }
                else {
                    GlobalData.BagInfo.rareBag[i] = _data.rareBag[i];
                    TipsManage.showTxt(_data.rareBag[i].itemId)
                }
            }
            console.log("成功更新背包信息");
        }
        else {
            TipsManage.showTips('更新背包失败');
        }

    }

    // 服务器主动推动阵容数据改变
    private changeParty(data): void {
        if (data.code == Protocol.SERVER_SUCCESS) {
            let _data = JSON.parse(data.data)
            if (_data.firstPartyInfo) {
                GlobalData.FirstPartyInfo = _data.firstPartyInfo;
            }
            if (_data.firstPartyAttr) {
                GlobalData.FirstPartyAttr = _data.firstPartyAttr;
                if (GameConfig.curPanel == PanelManage.ZhenRong) {
                    PanelManage.ZhenRong.RenderUI();
                }
            }
        }
    }

    // 服务器主动推送图鉴数据
    private changeTuJianBag(data): void {
        if (data.code == Protocol.SERVER_SUCCESS) {
            let _data = JSON.parse(data.data);
            for (let key in _data) {
                if (!GlobalData.TuJianInfo[key]) {
                    GlobalData.TuJianInfo[key] = []
                }
                GlobalData.TuJianInfo[key] = GlobalData.TuJianInfo[key].concat(_data[key]);
            }
            console.log('更新图鉴背包成功')
        }
        else {
            TipsManage.showTips('更新图鉴背包失败');
        }

    }
    // 服务器主动推送配方数据
    private changeMakeBag(data): void {
        if (data.code == Protocol.SERVER_SUCCESS) {
            let _data = JSON.parse(data.data);
            for (let i in _data) {
                if (GlobalData.MakeBagInfo.indexOf(_data[i]) == -1) {
                    GlobalData.MakeBagInfo.push(_data[i])
                }
            }
        }
        else {
            TipsManage.showTips('更新配方背包失败');
        }
    }
    // 服务器主动推送更改邮件
    private UpdateEmailList(data): void {
        if (data.code == Protocol.SERVER_SUCCESS) {
            let _data = JSON.parse(data.data);
            for (let i in _data) {
                if (_data[i] == undefined && GlobalData.EmailList[i]) {
                    delete GlobalData.EmailList[i]
                }
                else {
                    GlobalData.EmailList[i] = _data[i]
                }
            }
            console.log("成功更新邮件信息成功");
        }
        else {
            TipsManage.showTips('更新邮件失败');
        }
    }
    // 服务器主动推送制造等级升级事件
    private makeLevelUp(data): void {

    }
    //服务器主动推送聊天信息
    private UpdateWorldChannelMessages(data): void {
        if (data.code == Protocol.SERVER_SUCCESS) {
            let _date = JSON.parse(data.data);
            if (_date.messageType == 1) {
                if (GlobalData.worldchanelmessages.length == GlobalData.json.canshuSheet.WORLDCHAT_LIMIT.DATA[0]) {
                    GlobalData.worldchanelmessages.splice(0, 1);
                }
                GlobalData.worldchanelmessages.push(_date);
            }
            else if (_date.messageType == 2) {
                if (GlobalData.schoolchannelmessages.length == GlobalData.json.canshuSheet.GUILDCHAT_LIMIT.DATA[0]) {
                    GlobalData.worldchanelmessages.splice(0, 1);
                }
                GlobalData.schoolchannelmessages.push(_date);
            }
            else if (_date.messageType == 3) {
                if (GlobalData.privatechannelmessages.length == GlobalData.json.canshuSheet.PRIVATECHAT_LIMIT.DATA[0]) {
                    GlobalData.privatechannelmessages.splice(0, 1);
                }
                GlobalData.privatechannelmessages.push(_date);
            }
        }
    }



    /**服务器主动推送好友申请列表 */
    private UpdateFriendApplyForInfo(data): void {
        console.log(data.code, JSON.parse(data.data))
        if (data.code == Protocol.SERVER_SUCCESS) {
            let _data = JSON.parse(data.data);
            for (let key in _data) {
                if (_data[key] == null) {
                    delete GlobalData.friendsapplylist[key];
                }
                else {
                    GlobalData.friendsapplylist[key] = _data[key];
                }
            }
        }
    }

    /**服务器主动推送更新好友列表 */
    private UpdateFriendInfo(data): void {
        console.log(data.code, JSON.parse(data.data));
        if (data.code == Protocol.SERVER_SUCCESS) {
            let _data = JSON.parse(data.data);
            for (let key in _data) {
                if (_data[key] == null) {
                    delete GlobalData.friendslist[key];
                }
                else {
                    GlobalData.friendslist[key] = _data[key];
                }
            }
        }
    }

    /*服务器更新挂机信息*/
    private ReqGuajiinfo(data): void {
        if (data.code == Protocol.SERVER_SUCCESS) {
            let _data = JSON.parse(data.data);
            GlobalData.guajiinfo = _data;
        }
    }

}