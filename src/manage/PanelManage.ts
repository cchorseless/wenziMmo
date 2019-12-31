/**
 * 游戏界面管理
 */
module PanelManage {
    /**
     * 主界面显示组枚举
     */
    enum ShowType {
        NONE = 0,
        ALL = 1,
        TOP = 2,
        BOTTOM = 3
    }
    /**
     * 界面显示特效枚举
     * 0：没有动画 1:从中间轻微弹出 2：从中间猛烈弹出  3：从左向右 4：从右向左 5、从上到下 6、从下到上
     */
    enum EffectType {
        NONE = 0,
        CENTER_S = 1,
        CENTER_H = 2,
        L2R = 3,
        R2L = 4,
        T2B = 5,
        B2T = 6
    }

    /**
     * 获取纵向缩放因数
     */
    export function getScaleY(): number {
        return PanelManage.euiLayer.displayHeight / 1136;
    }

    /**
     * 获取横向缩放因数
     */
    export function getScaleX(): number {
        return PanelManage.euiLayer.displayWidth / 640;
    }


    /**
     * 获取高宽比
     */
    export function getAspectRatio(): boolean {
        return Laya.Browser.height / Laya.Browser.width > 1.9
    }

    /**********************************界面层************************************ */
    export let tipsLayer: Laya.Box;                                                      //文字气泡提示
    export let euiLayer: Laya.Box;                                                       //界面弹窗提示
    export let StartLoading: view.common.StartLoadingPanel                               //开始游戏加载界面
    export let netLoading: view.common.NetLoadingPanel;                                  //服务器网络数据加载界面
    export let resloading: view.common.ResLoadingPanel;                                  //游戏中加载资源切换场景界面
    export let serverError: view.common.ServerErrorPanel;                                //服务器意外失去连接界面
    export let Login: view.common.LoginPanel;                                            //登陆界面
    export let ChooseServer: view.common.ChooseServerPanel;                              //选择服务器界面
    export let CreateAvatar: view.common.CreateAvatarPanel;                              //创角界面
    export let ChooseAvatar: view.common.ChooseAvatarPanel;                              //选角界面
    export let Main: view.main.MainPanel;                                                //主界面                                              
    /*****************************游戏界面************************************* */
    export let JueSe: view.juese.Person_MainPanel;//角色界面
    export let Clothe: view.juese.ClothePanel;//时装界面
    export let WaiGong: view.wuXue.WuXueWaiGongPanel;//武学外功界面
    export let NeiGong: view.wuXue.WuXueNeiGongPanel;//武学内功界面
    export let HeDao: view.wuXue.WuXueHeDaoPanel;//武学合道界面
    export let CloseDoor: view.wuXue.WuXueCloseDoorPanel;//武学闭关界面
    export let BeiBao: view.beiBao.BagPanel;//背包界面
    export let FuBenMain: view.fuBen.FuBen_MainPanel;//主线副本界面
    export let FuBenDaily: view.fuBen.FuBen_DailyPanel;//日常副本界面
    export let FuBenLiLian: view.fuBen.FuBen_LiLianPanel;//历练副本界面
    export let FuBenXianShi: view.fuBen.FuBen_XianShiPanel;//限时副本界面


    export let ZhaiYuan: view.zhaiYuan.ZhaiYuanPanel;//养成界面
    export let Task_Main: view.task.Task_MainPanel;//主线任务界面
    export let Task_Daily: view.task.Task_DailyPanel;//日常任务界面
    export let Task_LiLian: view.task.Task_LiLianPanel;//历练任务界面

    export let NorthMap: view.map.BigMap_BeiLuPanel;//北陆地图界面
    export let SouthMap: view.map.BigMap_NanLuPanel;//南陆地图界面
    export let EastMap: view.map.BigMap_DongLuPanel;//东陆地图界面
    export let WorldMap: view.map.WorldMapPanel;//世界地图界面
    export let JuQingMode: view.juQingMode.JuQingModePanel;//剧情模式界面

    export let NewJuQing: view.juQingMode.JuQing_NewMainPanel;//剧情模式界面


    export let RankMain: view.rank.Rank_MainPanel;//排行榜主界面


    export let GuildSelect: view.guild.GuildSelectPanel;//公会界面
    export let GuildMain: view.guild.GuildMainPanel;//帮会界面
    export let Team: view.team.TeamPanel;//队伍界面
    export let GuildIntoCondition: view.guild.GuildIntoConditionPanel;//入帮设置界面
    export let GuildFuli: view.guild.GuildFuliPanel;//帮派福利界面
    export let GuildStore: view.guild.GuildStorePanel;//帮派仓库界面
    export let GuildWaiJiao: view.guild.GuildWaiJiaoPanel;//帮会外交界面
    export let GuildRecord: view.guild.GuildRecordPanel;//帮派日志界面
    export let GuildApply: view.guild.GuildApplyListPanel;//入帮申请界面
    export let GuildHelp: view.guild.GuildHelpPanel;//帮派支援界面
    export let GuildMember: view.guild.GuildMemberPanel;//帮派成员界面
    export let GuildShop: view.guild.GuildShopPanel;//帮派商店界面
    export let GuildRank: view.guild.GuildRankPanel;//帮派实力排行界面
    export let Menu: view.menu.MenuPanel;//菜单界面
    export let NewServerActive: view.newServer.NewServer_MainPanel;//新服活动界面
    export let LuckDraw: view.luckDraw.LuckDraw_MainPanel;//抽奖界面
    export let ShopMall: view.shopMall.ShopMall_MainPanel;//商城界面
    export let FuLi: view.fuli.FuLi_MainPanel;//商城界面
    export let DiZi: view.hero.Hero_MainPanel;//弟子界面
    export let TuJianDaoju: view.tujian.TuJianDaojuPanel;//图鉴道具界面
    export let TuJianJuese: view.tujian.TuJianJuesePanel;//图鉴角色界面
    export let TuJianEvent: view.tujian.TuJianEventPanel;//图鉴事件界面
    export let TuJianPlace: view.tujian.TuJianPlacePanel;//图鉴地理界面
    export let TianJian: view.tianJian.TianJianPanel;//天鉴界面
    export let Activity: view.activity.ActivityPanel;//活动界面
    export let Promotion: view.promotion.PromotionPanel;//活动界面

    export let ZhiNan: view.zhiNan.ZhiNanPanel;//游戏指南界面
    export let ZhiNan_WanFa: view.zhiNan.ZhiNan_wanfaPanel;//游戏玩法界面
    export let ZhiNan_MenPai: view.zhiNan.ZhiNan_menpaiPanel;//游戏门派界面
    export let ZhiNan_WuXue: view.zhiNan.ZhiNan_wuxuePanel;//游戏武学界面
    export let ZhiNan_ShuXing: view.zhiNan.ZhiNan_shuxingPanel;//游戏武学界面
    export let ZhiNan_DiYu: view.zhiNan.ZhiNan_diyuPanel;//游戏武学界面

    /*****************************通用方法************************************* */

    // 游戏开始的资源加载界面
    export function openStartLoadingPanel(): void {
        PopUpManager.checkPanel(PanelManage.StartLoading);
        ResManage.loadResource(ResData.PanelRes.StartLoading, () => {
            PanelManage.StartLoading = new view.common.StartLoadingPanel();
            PanelManage.StartLoading['LCP_skin'] = ResData.PanelRes.StartLoading;
            PanelManage.euiLayer.addChild(PanelManage.StartLoading);
            PanelManage.StartLoading.gameInit();
        });
    }
    //服务器意外失去连接界面
    export function openServerErrorPanel(): void {
        PopUpManager.checkPanel(PanelManage.serverError);
        ResManage.loadResource(ResData.PanelRes.serverError, () => {
            PanelManage.serverError = new view.common.ServerErrorPanel();
            PanelManage.serverError['LCP_skin'] = ResData.PanelRes.serverError;
            PanelManage.serverError.setData();
            PopUpManager.addPanel(PanelManage.serverError, 999);
        });
    }

    // 登陆界面
    export function openLoginPanel(): void {
        if (PopUpManager.showPanel(PanelManage.Login)) return;
        ResManage.loadResource(ResData.PanelRes.Login, () => {
            PanelManage.Login = new view.common.LoginPanel();
            PanelManage.Login['LCP_skin'] = ResData.PanelRes.Login;
            PanelManage.Login.setData();
            PanelManage.Login.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.Login, 1);
            GameApp.SDKManager.login();
        })
    }

    // 选择服务器界面
    export function openChooseServerPanel(): void {
        if (PopUpManager.showPanel(PanelManage.ChooseServer)) return;
        ResManage.loadResource(ResData.PanelRes.ChooseServer, () => {
            PanelManage.ChooseServer = new view.common.ChooseServerPanel();
            PanelManage.ChooseServer['LCP_skin'] = ResData.PanelRes.ChooseServer;
            // PanelManage.ChooseServer.setData();
            PanelManage.ChooseServer.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.ChooseServer, 2);
        })
    }
    // 创建角色界面
    export function openCreateAvatarPanel(): void {
        if (PopUpManager.showPanel(PanelManage.CreateAvatar)) return;
        ResManage.loadResource(ResData.PanelRes.CreateAvatar, () => {
            PanelManage.CreateAvatar = new view.common.CreateAvatarPanel();
            PanelManage.CreateAvatar['LCP_skin'] = ResData.PanelRes.CreateAvatar;
            PanelManage.CreateAvatar.setData();
            PanelManage.CreateAvatar.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.CreateAvatar, 3);
        })
    }

    // 选择角色界面
    export function openChooseAvatarPanel(data): void {
        if (PopUpManager.showPanel(PanelManage.ChooseAvatar)) return;
        ResManage.loadResource(ResData.PanelRes.ChooseAvatar, () => {
            PanelManage.ChooseAvatar = new view.common.ChooseAvatarPanel();
            PanelManage.ChooseAvatar['LCP_skin'] = ResData.PanelRes.CreateAvatar;
            PanelManage.ChooseAvatar.setData(data);
            PanelManage.ChooseAvatar.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.ChooseAvatar, 3);
        })
    }

    /**
     * 显示主界面
     */
    export function openMainPanel(): void {
        if (PopUpManager.showPanel(PanelManage.Main)) {
            PanelManage.Main.updateUI();
            PanelManage.Main.view_scene.selectedIndex = 1;
            PanelManage.Main.box_menu.visible = true;
            PanelManage.Main.box_mainBottom.visible = true;
            PanelManage.Main.box_mainTop.visible = true;
        }
        else {
            ResManage.loadResource(ResData.PanelRes.Main, () => {
                PanelManage.Main = new view.main.MainPanel();
                PanelManage.Main['LCP_skin'] = ResData.PanelRes.Main;
                PanelManage.Main.setData();
                PanelManage.Main.mouseEnabled = true;
                PanelManage.Main.box_mainBottom.visible = true;
                PopUpManager.addPanel(PanelManage.Main, 0);
                PanelManage.Main.box_mainTop.visible = true;
            });
        }
    }

    /******************************游戏界面************************************* */
    /**
     * 角色界面
     */
    export function openJueSePanel(): void {
        if (PopUpManager.showPanel(PanelManage.JueSe)) return;
        ResManage.loadResource(ResData.PanelRes.JueSe, () => {
            PanelManage.JueSe = new view.juese.Person_MainPanel();
            PanelManage.JueSe['LCP_skin'] = ResData.PanelRes.JueSe;
            PanelManage.JueSe.setData();
            PanelManage.JueSe.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.JueSe, 1, 0, 2);
        })

    }

    /**
    * 弟子界面
    */
    export function openDiZiPanel(): void {
        if (PopUpManager.showPanel(PanelManage.DiZi)) return;
        ResManage.loadResource(ResData.PanelRes.DiZi, () => {
            PanelManage.DiZi = new view.hero.Hero_MainPanel();
            PanelManage.DiZi['LCP_skin'] = ResData.PanelRes.DiZi;
            PanelManage.DiZi.setData();
            PanelManage.DiZi.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.DiZi, 2, 0, 2);
        })
    }

    /**
    * 时装界面
    */
    export function openClothePanel(): void {
        if (PopUpManager.showPanel(PanelManage.Clothe)) return;
        ResManage.loadResource(ResData.PanelRes.Clothe, () => {
            PanelManage.Clothe = new view.juese.ClothePanel();
            PanelManage.Clothe['LCP_skin'] = ResData.PanelRes.Clothe;
            PanelManage.Clothe.setData();
            PanelManage.Clothe.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.Clothe, 2, 0, 1);
        })
    }
    /**
    * 武学外功界面
    */
    export function openWuXueWaiGongPanel(): void {
        if (PopUpManager.showPanel(PanelManage.WaiGong)) return;
        ResManage.loadResource(ResData.PanelRes.WaiGong, () => {
            PanelManage.WaiGong = new view.wuXue.WuXueWaiGongPanel();
            PanelManage.WaiGong['LCP_skin'] = ResData.PanelRes.WaiGong;
            PanelManage.WaiGong.setData();
            PanelManage.WaiGong.name = "waigong"
            PanelManage.WaiGong.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.WaiGong, 1, 0, 2);
        })
    }
    /**
    * 武学内功界面
    */
    export function openWuXueNeiGongPanel(): void {
        if (PopUpManager.showPanel(PanelManage.NeiGong)) return;
        ResManage.loadResource(ResData.PanelRes.NeiGong, () => {
            PanelManage.NeiGong = new view.wuXue.WuXueNeiGongPanel();
            PanelManage.NeiGong['LCP_skin'] = ResData.PanelRes.NeiGong;
            PanelManage.NeiGong.setData();
            PanelManage.NeiGong.name = "neigong"
            PanelManage.NeiGong.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.NeiGong, 1, 0, 2);
        })
    }
    /**
    * 武学合道界面
    */
    export function openWuXueHeDaoPanel(): void {
        if (PopUpManager.showPanel(PanelManage.HeDao)) return;
        ResManage.loadResource(ResData.PanelRes.HeDao, () => {
            PanelManage.HeDao = new view.wuXue.WuXueHeDaoPanel();
            PanelManage.HeDao['LCP_skin'] = ResData.PanelRes.HeDao;
            PanelManage.HeDao.setData();
            PanelManage.HeDao.name = "hedao"
            PanelManage.HeDao.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.HeDao, 1, 0, 2);
        })
    }
    /**
      * 武学闭关界面
      */
    export function openWuXueCloseDoorPanel(): void {
        if (PopUpManager.showPanel(PanelManage.CloseDoor)) return;
        ResManage.loadResource(ResData.PanelRes.CloseDoor, () => {
            PanelManage.CloseDoor = new view.wuXue.WuXueCloseDoorPanel();
            PanelManage.CloseDoor['LCP_skin'] = ResData.PanelRes.CloseDoor;
            PanelManage.CloseDoor.setData();
            PanelManage.CloseDoor.name = "biguan"
            PanelManage.CloseDoor.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.CloseDoor, 1, 0, 2);
        })
    }





    /**
     * 宅院界面
     */
    export function openZhaiYuanPanel(): void {
        if (PopUpManager.showPanel(PanelManage.ZhaiYuan)) return;
        ResManage.loadResource(ResData.PanelRes.ZhaiYuan, () => {
            PanelManage.ZhaiYuan = new view.zhaiYuan.ZhaiYuanPanel();
            PanelManage.ZhaiYuan['LCP_skin'] = ResData.PanelRes.ZhaiYuan;
            PanelManage.ZhaiYuan.setData();
            PanelManage.ZhaiYuan.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.ZhaiYuan, 1);
        })
    }
    /**
    * 帮会创建界面
    */
    export function openGuildSelectPanel(): void {
        if (PopUpManager.showPanel(PanelManage.GuildSelect)) return;
        ResManage.loadResource(ResData.PanelRes.GuildSelect, () => {
            PanelManage.GuildSelect = new view.guild.GuildSelectPanel();
            PanelManage.GuildSelect['LCP_skin'] = ResData.PanelRes.GuildSelect;
            PanelManage.GuildSelect.setData();
            PanelManage.GuildSelect.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.GuildSelect, 1, 0, 2);
        })
    }
    /**
    * 帮会界面
    */
    export function openGuildTeamPanel(data): void {
        if (PopUpManager.showPanel(PanelManage.GuildMain)) return;
        ResManage.loadResource(ResData.PanelRes.GuildMain, () => {
            PanelManage.GuildMain = new view.guild.GuildMainPanel();
            PanelManage.GuildMain['LCP_skin'] = ResData.PanelRes.GuildMain;
            PanelManage.GuildMain.setData(data);
            PanelManage.GuildMain.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.GuildMain, 2, 0, 2);
        })
    }
    /**
   * 队伍界面
   */
    export function openTeamPanel(): void {
        if (PopUpManager.showPanel(PanelManage.Team)) return;
        ResManage.loadResource(ResData.PanelRes.Team, () => {
            PanelManage.Team = new view.team.TeamPanel();
            PanelManage.Team['LCP_skin'] = ResData.PanelRes.Team;
            PanelManage.Team.setData();
            PanelManage.Team.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.Team, 1, 0, 2);
        })
    }

    /**
    * 帮会外交界面
    */
    export function openGuildWaiJiaoPanel(): void {
        if (PopUpManager.showPanel(PanelManage.GuildWaiJiao)) return;
        ResManage.loadResource(ResData.PanelRes.GuildWaiJiao, () => {
            PanelManage.GuildWaiJiao = new view.guild.GuildWaiJiaoPanel();
            PanelManage.GuildWaiJiao['LCP_skin'] = ResData.PanelRes.GuildIntoCondition;
            PanelManage.GuildWaiJiao.setData();
            PanelManage.GuildWaiJiao.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.GuildWaiJiao, 3, 0, 1);
        })
    }

    /**
    * 帮会入会设定界面
    */
    export function openGuildIntoConditionPanel(): void {
        if (PopUpManager.showPanel(PanelManage.GuildIntoCondition)) return;
        ResManage.loadResource(ResData.PanelRes.GuildIntoCondition, () => {
            PanelManage.GuildIntoCondition = new view.guild.GuildIntoConditionPanel();
            PanelManage.GuildIntoCondition['LCP_skin'] = ResData.PanelRes.GuildIntoCondition;
            PanelManage.GuildIntoCondition.setData();
            PanelManage.GuildIntoCondition.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.GuildIntoCondition, 3, 0, 1);
        })
    }


    /**
    * 帮派福利界面
    */
    export function openGuildFuliPanel(): void {
        if (PopUpManager.showPanel(PanelManage.GuildFuli)) return;
        ResManage.loadResource(ResData.PanelRes.GuildFuli, () => {
            PanelManage.GuildFuli = new view.guild.GuildFuliPanel();
            PanelManage.GuildFuli['LCP_skin'] = ResData.PanelRes.GuildFuli;
            PanelManage.GuildFuli.setData();
            PanelManage.GuildFuli.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.GuildFuli, 3, 0, 1);
        })
    }
    /**
   * 帮派仓库界面
   */
    export function openGuildStorePanel(): void {
        if (PopUpManager.showPanel(PanelManage.GuildStore)) return;
        ResManage.loadResource(ResData.PanelRes.GuildStore, () => {
            PanelManage.GuildStore = new view.guild.GuildStorePanel();
            PanelManage.GuildStore['LCP_skin'] = ResData.PanelRes.GuildStore;
            PanelManage.GuildStore.setData();
            PanelManage.GuildStore.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.GuildStore, 3, 0, 1);
        })
    }
    /**
     * 帮派日志界面
     */
    export function openGuildRecordPanel(): void {
        if (PopUpManager.showPanel(PanelManage.GuildRecord)) return;
        ResManage.loadResource(ResData.PanelRes.GuildRecord, () => {
            PanelManage.GuildRecord = new view.guild.GuildRecordPanel();
            PanelManage.GuildRecord['LCP_skin'] = ResData.PanelRes.GuildRecord;
            PanelManage.GuildRecord.setData();
            PanelManage.GuildRecord.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.GuildRecord, 3, 0, 1);
        })
    }



    /**
    * 入帮申请界面
    */
    export function openGuildApplyPanel(): void {
        if (PopUpManager.showPanel(PanelManage.GuildApply)) return;
        ResManage.loadResource(ResData.PanelRes.GuildApply, () => {
            PanelManage.GuildApply = new view.guild.GuildApplyListPanel();
            PanelManage.GuildApply['LCP_skin'] = ResData.PanelRes.GuildApply;
            PanelManage.GuildApply.setData();
            PanelManage.GuildApply.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.GuildApply, 3, 0, 1);
        })
    }

    /**
     * 帮会成员界面
     */
    export function openGuildMemberPanel(): void {
        if (PopUpManager.showPanel(PanelManage.GuildMember)) return;
        ResManage.loadResource(ResData.PanelRes.GuildMember, () => {
            PanelManage.GuildMember = new view.guild.GuildMemberPanel();
            PanelManage.GuildMember['LCP_skin'] = ResData.PanelRes.GuildMember;
            PanelManage.GuildMember.setData();
            PanelManage.GuildMember.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.GuildMember, 3, 0, 1);
        })
    }

    /**
     * 帮会实力排行界面
     */
    export function openGuildRankPanel(): void {
        if (PopUpManager.showPanel(PanelManage.GuildRank)) return;
        ResManage.loadResource(ResData.PanelRes.GuildRank, () => {
            PanelManage.GuildRank = new view.guild.GuildRankPanel();
            PanelManage.GuildRank['LCP_skin'] = ResData.PanelRes.GuildRank;
            PanelManage.GuildRank.setData();
            PanelManage.GuildRank.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.GuildRank, 3, 0, 1);
        })
    }

    /**
        * 帮派支援界面
        */
    export function openGuildHelpPanel(): void {
        if (PopUpManager.showPanel(PanelManage.GuildHelp)) return;
        ResManage.loadResource(ResData.PanelRes.GuildHelp, () => {
            PanelManage.GuildHelp = new view.guild.GuildHelpPanel();
            PanelManage.GuildHelp['LCP_skin'] = ResData.PanelRes.GuildHelp;
            PanelManage.GuildHelp.setData();
            PanelManage.GuildHelp.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.GuildHelp, 3, 0, 1);
        })
    }
    /**
        * 帮派商店界面
        */
    export function openGuildShopPanel(): void {
        if (PopUpManager.showPanel(PanelManage.GuildShop)) return;
        ResManage.loadResource(ResData.PanelRes.GuildShop, () => {
            PanelManage.GuildShop = new view.guild.GuildShopPanel();
            PanelManage.GuildShop['LCP_skin'] = ResData.PanelRes.GuildShop;
            PanelManage.GuildShop.setData();
            PanelManage.GuildShop.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.GuildShop, 3, 0, 1);
        })
    }
    /**
    * 菜单界面
    */
    export function openMenuPanel(): void {
        if (PopUpManager.showPanel(PanelManage.Menu)) return;
        ResManage.loadResource(ResData.PanelRes.Menu, () => {
            PanelManage.Menu = new view.menu.MenuPanel();
            PanelManage.Menu['LCP_skin'] = ResData.PanelRes.Menu;
            PanelManage.Menu.setData();
            PanelManage.Menu.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.Menu, 99, 0, 2);
        })
    }
    /**
* 新服活动
*/
    export function openNewServer_MainPanel(): void {
        // if (PopUpManager.showPanel(PanelManage.NewServerActive)) return;
        ResManage.loadResource(ResData.PanelRes.NewServerActive, () => {
            PanelManage.NewServerActive = new view.newServer.NewServer_MainPanel();
            PanelManage.NewServerActive['LCP_skin'] = ResData.PanelRes.NewServerActive;
            PanelManage.NewServerActive.setData();
            PanelManage.NewServerActive.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.NewServerActive, 100, 0, 2);
        })
    }
    /**
   * 抽奖界面
   */
    export function openLuckDrawPanel(): void {
        if (PopUpManager.showPanel(PanelManage.LuckDraw)) return;
        ResManage.loadResource(ResData.PanelRes.LuckDraw, () => {
            PanelManage.LuckDraw = new view.luckDraw.LuckDraw_MainPanel();
            PanelManage.LuckDraw['LCP_skin'] = ResData.PanelRes.LuckDraw;
            PanelManage.LuckDraw.setData();
            PanelManage.LuckDraw.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.LuckDraw, 100, 0, 2);
        })
    }

    /**
* 商城界面
*/
    export function openShopMallPanel(): void {
        if (PopUpManager.showPanel(PanelManage.ShopMall)) return;
        ResManage.loadResource(ResData.PanelRes.ShopMall, () => {
            PanelManage.ShopMall = new view.shopMall.ShopMall_MainPanel();
            PanelManage.ShopMall['LCP_skin'] = ResData.PanelRes.ShopMall;
            PanelManage.ShopMall.setData();
            PanelManage.ShopMall.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.ShopMall, 100, 0, 2);
        })
    }
    /**
* 福利界面
*/
    export function openFuLiPanel(): void {
        if (PopUpManager.showPanel(PanelManage.FuLi)) return;
        ResManage.loadResource(ResData.PanelRes.FuLi, () => {
            PanelManage.FuLi = new view.fuli.FuLi_MainPanel();
            PanelManage.FuLi['LCP_skin'] = ResData.PanelRes.FuLi;
            PanelManage.FuLi.setData();
            PanelManage.FuLi.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.FuLi, 100, 0, 2);
        })
    }

    /**
     * 背包界面
     */
    export function openBeiBaoPanel(): void {
        if (PopUpManager.showPanel(PanelManage.BeiBao)) return;
        ResManage.loadResource(ResData.PanelRes.BeiBao, () => {
            PanelManage.BeiBao = new view.beiBao.BagPanel();
            PanelManage.BeiBao['LCP_skin'] = ResData.PanelRes.BeiBao;
            PanelManage.BeiBao.setData();
            PanelManage.BeiBao.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.BeiBao, 1, 0, 2);
        })
    }
    /**
     * 主线任务界面
     */
    export function openTask_MainPanel(): void {
        if (PopUpManager.showPanel(PanelManage.Task_Main)) return;
        ResManage.loadResource(ResData.PanelRes.Task_Main, () => {
            PanelManage.Task_Main = new view.task.Task_MainPanel();
            PanelManage.Task_Main['LCP_skin'] = ResData.PanelRes.Task_Main;
            PanelManage.Task_Main.setData();
            PanelManage.Task_Main.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.Task_Main, 2, 0, 2);
        })
    }

    /**
     * 日常任务界面
     */
    export function openTask_DailyPanel(): void {
        if (PopUpManager.showPanel(PanelManage.Task_Daily)) return;
        ResManage.loadResource(ResData.PanelRes.Task_Daily, () => {
            PanelManage.Task_Daily = new view.task.Task_DailyPanel();
            PanelManage.Task_Daily['LCP_skin'] = ResData.PanelRes.Task_Daily;
            PanelManage.Task_Daily.setData();
            PanelManage.Task_Daily.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.Task_Daily, 2, 0, 2);
        })
    }

    /**
     * 历练任务界面
     */
    export function openTask_LiLianPanel(): void {
        if (PopUpManager.showPanel(PanelManage.Task_LiLian)) return;
        ResManage.loadResource(ResData.PanelRes.Task_LiLian, () => {
            PanelManage.Task_LiLian = new view.task.Task_LiLianPanel();
            PanelManage.Task_LiLian['LCP_skin'] = ResData.PanelRes.Task_LiLian;
            PanelManage.Task_LiLian.setData();
            PanelManage.Task_LiLian.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.Task_LiLian, 2, 0, 2);
        })
    }

    /**
     * 主线副本界面
     */
    export function openFuBenMainPanel(from: string): void {
        if (PopUpManager.showPanel(PanelManage.FuBenMain)) return;
        ResManage.loadResource(ResData.PanelRes.FuBenMain, () => {
            PanelManage.FuBenMain = new view.fuBen.FuBen_MainPanel();
            PanelManage.FuBenMain['LCP_skin'] = ResData.PanelRes.FuBenMain;
            PanelManage.FuBenMain.setData(from);
            PanelManage.FuBenMain.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.FuBenMain, 2, 0, 2);
        })
    }

    /**
     * 每日副本界面
     */
    export function openFuBenDailyPanel(): void {
        if (PopUpManager.showPanel(PanelManage.FuBenDaily)) return;
        ResManage.loadResource(ResData.PanelRes.FuBenDaily, () => {
            PanelManage.FuBenDaily = new view.fuBen.FuBen_DailyPanel();
            PanelManage.FuBenDaily['LCP_skin'] = ResData.PanelRes.FuBenDaily;
            PanelManage.FuBenDaily.setData();
            PanelManage.FuBenDaily.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.FuBenDaily, 2, 0, 2);
        })
    }

    /**
     * 历练副本界面
     */
    export function openFuBenLiLianPanel(): void {
        if (PopUpManager.showPanel(PanelManage.FuBenLiLian)) return;
        ResManage.loadResource(ResData.PanelRes.FuBenLiLian, () => {
            PanelManage.FuBenLiLian = new view.fuBen.FuBen_LiLianPanel();
            PanelManage.FuBenLiLian['LCP_skin'] = ResData.PanelRes.FuBenLiLian;
            PanelManage.FuBenLiLian.setData();
            PanelManage.FuBenLiLian.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.FuBenLiLian, 2, 0, 2);
        })
    }

    /**
     * 限时副本界面
     */
    export function openFuBenXianShiPanel(): void {
        if (PopUpManager.showPanel(PanelManage.FuBenXianShi)) return;
        ResManage.loadResource(ResData.PanelRes.FuBenXianShi, () => {
            PanelManage.FuBenXianShi = new view.fuBen.FuBen_XianShiPanel();
            PanelManage.FuBenXianShi['LCP_skin'] = ResData.PanelRes.FuBenXianShi;
            PanelManage.FuBenXianShi.setData();
            PanelManage.FuBenXianShi.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.FuBenXianShi, 2, 0, 2);
        })
    }



    /**
     * 游戏指南界面
     */
    export function openZhiNanPanel(): void {
        if (PopUpManager.showPanel(PanelManage.ZhiNan)) return;
        ResManage.loadResource(ResData.PanelRes.ZhiNan, () => {
            PanelManage.ZhiNan = new view.zhiNan.ZhiNanPanel();
            PanelManage.ZhiNan['LCP_skin'] = ResData.PanelRes.ZhiNan;
            PanelManage.ZhiNan.setData();
            PanelManage.ZhiNan.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.ZhiNan, 2, 0, 0);
        })
    }
    /**
     * 游戏玩法界面
     */
    export function openZhiNanWanFaPanel(): void {
        if (PopUpManager.showPanel(PanelManage.ZhiNan_WanFa)) return;
        ResManage.loadResource(ResData.PanelRes.ZhiNan_WanFa, () => {
            PanelManage.ZhiNan_WanFa = new view.zhiNan.ZhiNan_wanfaPanel();
            PanelManage.ZhiNan_WanFa['LCP_skin'] = ResData.PanelRes.ZhiNan_WanFa;
            PanelManage.ZhiNan_WanFa.setData();
            PanelManage.ZhiNan_WanFa.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.ZhiNan_WanFa, 3, 0, 0);
        })
    }
    /**
     * 游戏门派界面
     */
    export function openZhiNanMenPaiPanel(): void {
        if (PopUpManager.showPanel(PanelManage.ZhiNan_MenPai)) return;
        ResManage.loadResource(ResData.PanelRes.ZhiNan_MenPai, () => {
            PanelManage.ZhiNan_MenPai = new view.zhiNan.ZhiNan_menpaiPanel();
            PanelManage.ZhiNan_MenPai['LCP_skin'] = ResData.PanelRes.ZhiNan_MenPai;
            PanelManage.ZhiNan_MenPai.setData();
            PanelManage.ZhiNan_MenPai.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.ZhiNan_MenPai, 3, 0, 0);
        })
    }
    /**
     * 游戏武学界面
     */
    export function openZhiNanWuXuePanel(): void {
        if (PopUpManager.showPanel(PanelManage.ZhiNan_WuXue)) return;
        ResManage.loadResource(ResData.PanelRes.ZhiNan_WuXue, () => {
            PanelManage.ZhiNan_WuXue = new view.zhiNan.ZhiNan_wuxuePanel();
            PanelManage.ZhiNan_WuXue['LCP_skin'] = ResData.PanelRes.ZhiNan_WuXue;
            PanelManage.ZhiNan_WuXue.setData();
            PanelManage.ZhiNan_WuXue.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.ZhiNan_WuXue, 3, 0, 0);
        })
    }
    /**
    * 游戏属性界面
    */
    export function openZhiNanShuXingPanel(): void {
        if (PopUpManager.showPanel(PanelManage.ZhiNan_ShuXing)) return;
        ResManage.loadResource(ResData.PanelRes.ZhiNan_ShuXing, () => {
            PanelManage.ZhiNan_ShuXing = new view.zhiNan.ZhiNan_shuxingPanel();
            PanelManage.ZhiNan_ShuXing['LCP_skin'] = ResData.PanelRes.ZhiNan_ShuXing;
            PanelManage.ZhiNan_ShuXing.setData();
            PanelManage.ZhiNan_ShuXing.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.ZhiNan_ShuXing, 3, 0, 0);
        })
    }
    /**
     * 游戏地域界面
     */
    export function openZhiNanDiYuPanel(): void {
        if (PopUpManager.showPanel(PanelManage.ZhiNan_DiYu)) return;
        ResManage.loadResource(ResData.PanelRes.ZhiNan_DiYu, () => {
            PanelManage.ZhiNan_DiYu = new view.zhiNan.ZhiNan_diyuPanel();
            PanelManage.ZhiNan_DiYu['LCP_skin'] = ResData.PanelRes.ZhiNan_DiYu;
            PanelManage.ZhiNan_DiYu.setData();
            PanelManage.ZhiNan_DiYu.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.ZhiNan_DiYu, 3, 0, 0);
        })
    }



    /**
     * 排行榜界面
     */
    export function openRankMainPanel(): void {
        if (PopUpManager.showPanel(PanelManage.RankMain)) return;
        ResManage.loadResource(ResData.PanelRes.RankMain, () => {
            PanelManage.RankMain = new view.rank.Rank_MainPanel();
            PanelManage.RankMain['LCP_skin'] = ResData.PanelRes.RankMain;
            PanelManage.RankMain.setData();
            PanelManage.RankMain.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.RankMain, 2, 0, 2);
        })


    }
    /**
     * 北陆地图界面
     */
    export function openNorthMapPanel(): void {
        if (PopUpManager.showPanel(PanelManage.NorthMap)) return;
        ResManage.loadResource(ResData.PanelRes.NorthMap, () => {
            PanelManage.NorthMap = new view.map.BigMap_BeiLuPanel();
            PanelManage.NorthMap['LCP_skin'] = ResData.PanelRes.NorthMap;
            PanelManage.NorthMap.setData();
            PanelManage.NorthMap.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.NorthMap, 2);
        })
    }
    /**
     * 南陆地图界面
     */
    export function openSouthMapPanel(): void {
        if (PopUpManager.showPanel(PanelManage.SouthMap)) return;
        ResManage.loadResource(ResData.PanelRes.SouthMap, () => {
            PanelManage.SouthMap = new view.map.BigMap_NanLuPanel();
            PanelManage.SouthMap['LCP_skin'] = ResData.PanelRes.SouthMap;
            PanelManage.SouthMap.setData();
            PanelManage.SouthMap.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.SouthMap, 2);
        })
    }
    /**
     * 东陆地图界面
     */
    export function openEastMapPanel(): void {
        if (PopUpManager.showPanel(PanelManage.EastMap)) return;
        ResManage.loadResource(ResData.PanelRes.EastMap, () => {
            PanelManage.EastMap = new view.map.BigMap_DongLuPanel();
            PanelManage.EastMap['LCP_skin'] = ResData.PanelRes.EastMap;
            PanelManage.EastMap.setData();
            PanelManage.EastMap.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.EastMap, 3);
        })
    }


    /**
     * 世界地图界面
     */
    export function openWorldMapPanel(): void {
        if (PopUpManager.showPanel(PanelManage.WorldMap)) return;
        ResManage.loadResource(ResData.PanelRes.WorldMap, () => {
            PanelManage.WorldMap = new view.map.WorldMapPanel();
            PanelManage.WorldMap['LCP_skin'] = ResData.PanelRes.WorldMap;
            PanelManage.WorldMap.setData();
            PanelManage.WorldMap.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.WorldMap, 3);
        })
    }


    /**
     * 剧情模式界面(特殊处理了)
     */
    export function openJuQingModePanel(): void {
        PanelManage.openMainPanel();
        PanelManage.Main.box_mainTop.visible = false;
        PanelManage.Main.box_mainBottom.visible = false;
        PanelManage.Main.box_menu.visible = false;
        if (PanelManage.Main.view_scene.numChildren == 2) {
            ResManage.loadResource(ResData.PanelRes.JuQingMode, () => {
                PanelManage.JuQingMode = new view.juQingMode.JuQingModePanel();
                PanelManage.JuQingMode['LCP_skin'] = ResData.PanelRes.JuQingMode;
                PanelManage.JuQingMode.setData();
                PanelManage.JuQingMode.mouseEnabled = true;
                PanelManage.JuQingMode.top = PanelManage.JuQingMode.bottom = PanelManage.JuQingMode.left = PanelManage.JuQingMode.right = 0;
                PanelManage.Main.view_scene.addItem(PanelManage.JuQingMode);
                PanelManage.Main.view_scene.selectedIndex = 2;
            })
        }
        else {
            PanelManage.Main.view_scene.selectedIndex = 2;
        }
    }


    /**
  * 图鉴道具界面
  */
    export function openTuJianDaojuPanel(): void {
        if (PopUpManager.showPanel(PanelManage.TuJianDaoju)) return;
        ResManage.loadResource(ResData.PanelRes.TuJianDaoju, () => {
            PanelManage.TuJianDaoju = new view.tujian.TuJianDaojuPanel();
            PanelManage.TuJianDaoju['LCP_skin'] = ResData.PanelRes.TuJianDaoju;
            PanelManage.TuJianDaoju.setData();
            PanelManage.TuJianDaoju.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.TuJianDaoju, 2, 0, 2);
        })
    }
    /**
    * 图鉴角色界面
    */
    export function openTuJianJuesePanel(): void {
        if (PopUpManager.showPanel(PanelManage.TuJianJuese)) return;
        ResManage.loadResource(ResData.PanelRes.TuJianJuese, () => {
            PanelManage.TuJianJuese = new view.tujian.TuJianJuesePanel();
            PanelManage.TuJianJuese['LCP_skin'] = ResData.PanelRes.TuJianJuese;
            PanelManage.TuJianJuese.setData();
            PanelManage.TuJianJuese.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.TuJianJuese, 2, 0, 2);
        })
    }
    /**
      * 图鉴事件界面
      */
    export function openTuJianEventPanel(): void {
        if (PopUpManager.showPanel(PanelManage.TuJianEvent)) return;
        ResManage.loadResource(ResData.PanelRes.TuJianEvent, () => {
            PanelManage.TuJianEvent = new view.tujian.TuJianEventPanel();
            PanelManage.TuJianEvent['LCP_skin'] = ResData.PanelRes.TuJianEvent;
            PanelManage.TuJianEvent.setData();
            PanelManage.TuJianEvent.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.TuJianEvent, 2, 0, 2);
        })
    }

    /**
       * 图鉴地理界面
       */
    export function openTuJianPlacePanel(): void {
        if (PopUpManager.showPanel(PanelManage.TuJianPlace)) return;
        ResManage.loadResource(ResData.PanelRes.TuJianPlace, () => {
            PanelManage.TuJianPlace = new view.tujian.TuJianPlacePanel();
            PanelManage.TuJianPlace['LCP_skin'] = ResData.PanelRes.TuJianPlace;
            PanelManage.TuJianPlace.setData();
            PanelManage.TuJianPlace.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.TuJianPlace, 2, 0, 2);
        })
    }
    /**
    * 天鉴界面
    */
    export function openTianJianPanel(data: any): void {
        if (PopUpManager.showPanel(PanelManage.TianJian)) return;
        ResManage.loadResource(ResData.PanelRes.TianJian, () => {
            PanelManage.TianJian = new view.tianJian.TianJianPanel();
            PanelManage.TianJian['LCP_skin'] = ResData.PanelRes.TianJian;
            PanelManage.TianJian.setData(data);
            PanelManage.TianJian.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.TianJian, 2, 0, 0);
        })
    }
    /**
    * 活动界面
    */
    export function openActivePanel(): void {
        if (PopUpManager.showPanel(PanelManage.Activity)) return;
        ResManage.loadResource(ResData.PanelRes.Activity, () => {
            PanelManage.Activity = new view.activity.ActivityPanel();
            PanelManage.Activity['LCP_skin'] = ResData.PanelRes.Activity;
            PanelManage.Activity.setData();
            PanelManage.Activity.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.Activity, 100, 0, 2);
        })
    }
    /**
     * 促销
     */
    export function openPromotionPanel(): void {
        if (PopUpManager.showPanel(PanelManage.Promotion)) return;
        ResManage.loadResource(ResData.PanelRes.Promotion, () => {
            PanelManage.Promotion = new view.promotion.PromotionPanel();
            PanelManage.Promotion['LCP_skin'] = ResData.PanelRes.Promotion;
            PanelManage.Promotion.setData();
            PanelManage.Promotion.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.Promotion, 100, 0, 2);
        })
    }

}