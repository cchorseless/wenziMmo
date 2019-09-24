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

    /**********************************界面层************************************ */
    export let tipsLayer: Laya.Box;                                                      //文字气泡提示
    export let euiLayer: Laya.Box;                                                       //界面弹窗提示
    export let StartLoading: view.common.StartLoadingPanel                               //开始游戏加载界面
    export let netLoading: view.common.NetLoadingPanel;                                  //服务器网络数据加载界面
    export let resloading: view.common.ResLoadingPanel;                                  //游戏中加载资源切换场景界面
    export let serverError: view.common.ServerErrorPanel;                                //服务器意外失去连接界面
    export let GM: view.common.GmPanel;                                                  //GM界面
    export let Login: view.common.LoginPanel;                                            //登陆界面
    export let ServerList: view.common.ServerListPanel;                                  //服务器列表界面
    export let ServerNotice: view.common.ServerNoticePanel;                              //服务器公告界面
    export let CreateAvatar: view.common.CreateAvatarPanel;                              //创角界面
    export let ChooseAvatar: view.common.ChooseAvatarPanel;                              //选角界面
    export let Main: view.main.MainPanel;                                                //主界面                                              
    /*****************************游戏界面************************************* */
    export let JueSe: view.juese.JueSePanel;//角色界面
    export let Clothe: view.juese.ClothePanel;//时装界面
    export let WaiGong: view.wuXue.WuXueWaiGongPanel;//武学外功界面
    export let NeiGong: view.wuXue.WuXueNeiGongPanel;//武学内功界面
    export let HeDao: view.wuXue.WuXueHeDaoPanel;//武学和道界面
    export let LifeSkill: view.wuXue.WuXueLifeSkillPanel;//武学生活技能
    export let BeiBao: view.beiBao.BeiBaoPanel;//背包界面
    export let FuBenMain: view.fuBen.FuBen_MainPanel;//主线副本界面
    export let FuBenDaily: view.fuBen.FuBen_DailyPanel;//日常副本界面
    export let FuBenLiLian: view.fuBen.FuBen_LiLianPanel;//历练副本界面
    export let FuBenXianShi: view.fuBen.FuBen_XianShiPanel;//限时副本界面


    export let ZhaiYuan: view.zhaiYuan.ZhaiYuanPanel;//养成界面
    export let Task_Main: view.task.Task_MainPanel;//主线任务界面
    export let Task_Daily: view.task.Task_DailyPanel;//日常任务界面
    export let Task_LiLian: view.task.Task_LiLianPanel;//历练任务界面
    export let Task_chengJiu: view.task.Task_ChengJiuPanel;//成就任务界面

    export let NorthMap: view.map.BigMap_BeiLuPanel;//北陆地图界面
    export let SouthMap: view.map.BigMap_NanLuPanel;//南陆地图界面
    export let EastMap: view.map.BigMap_DongLuPanel;//东陆地图界面
    export let WorldMap: view.map.WorldMapPanel;//世界地图界面
    export let JuQingMode: view.juQingMode.JuQingModePanel;//剧情模式界面
    export let JuQingInfo: view.juQing.JuQingInfoPanel;//手册界面
    export let RankMain: view.rank.Rank_MainPanel;//排行榜主界面
    export let ZhiNan: view.zhiNan.ZhiNanPanel;//游戏指南界面
    export let YinDao: view.yindao.YinDaoPanel;//游戏引导界面

    export let GuildSelect: view.guild.GuildSelectPanel;//公会界面
    export let GuildMain: view.guild.GuildMainPanel;//帮会界面
    export let Team: view.team.TeamPanel;//队伍界面
    export let Friend: view.friend.FriendPanel;//好友界面
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
    export let DiZi: view.hero.HeroPanel;//弟子界面
    export let TuJianDaoju: view.tujian.TuJianDaojuPanel;//图鉴道具界面
    export let TuJianJuese: view.tujian.TuJianJuesePanel;//图鉴角色界面
    export let TuJianEvent: view.tujian.TuJianEventPanel;//图鉴事件界面
    export let TuJianPlace: view.tujian.TuJianPlacePanel;//图鉴地理界面
    export let TianJian: view.tianJian.TianJianPanel;//天鉴界面
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
        ResManage.loadResource(null, () => {
            PanelManage.serverError = new view.common.ServerErrorPanel();
            PanelManage.serverError['LCP_skin'] = null;
            PanelManage.serverError.setData();
            PopUpManager.addPanel(PanelManage.serverError, 1, 2);
        });
    }
    // 加载游戏主界面
    export function loadMainPanel(): void {
        PopUpManager.checkPanel(PanelManage.Main);
        ResManage.loadResource(ResData.PanelRes.Main, () => {
            PanelManage.Main = new view.main.MainPanel();
            PanelManage.Main['LCP_skin'] = ResData.PanelRes.Main;
            PanelManage.Main.setData();
            PopUpManager.addPanel(PanelManage.Main, 0);
            // 为了避免黑屏，这里特殊化处理一下销毁StartLoadingPanel
            PopUpManager.checkPanel(PanelManage.StartLoading, true, 2);
        });
    }
    // GM工具
    export function openGmPanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.GM) {
            return
        }
        PopUpManager.checkPanel(PanelManage.GM);
        ResManage.loadResource(ResData.PanelRes.GM, () => {
            PanelManage.GM = new view.common.GmPanel();
            PanelManage.GM['LCP_skin'] = ResData.PanelRes.GM;
            PanelManage.GM.setData();
            PanelManage.GM.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.GM, 99, 0, ShowType.BOTTOM);
        })
    }
    // 登陆界面
    export function openLoginPanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.Login) {
            return
        }
        PopUpManager.checkPanel(PanelManage.Login);
        ResManage.loadResource(ResData.PanelRes.Login, () => {
            PanelManage.Login = new view.common.LoginPanel();
            PanelManage.Login['LCP_skin'] = ResData.PanelRes.Login;
            PanelManage.Login.setData();
            PanelManage.Login.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.Login, 0);
        })
    }
    // 服务器列表界面
    export function openServerListPanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.ServerList) {
            return
        }
        PopUpManager.checkPanel(PanelManage.ServerList);
        ResManage.loadResource(ResData.PanelRes.ServerList, () => {
            PanelManage.ServerList = new view.common.ServerListPanel();
            PanelManage.ServerList['LCP_skin'] = ResData.PanelRes.ServerList;
            PanelManage.ServerList.setData();
            PanelManage.ServerList.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.ServerList, 2);
        })
    }
    // 服务器公告界面
    export function openServerNoticePanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.ServerNotice) {
            return
        }
        PopUpManager.checkPanel(PanelManage.ServerNotice);
        ResManage.loadResource(ResData.PanelRes.ServerNotice, () => {
            PanelManage.ServerNotice = new view.common.ServerNoticePanel();
            PanelManage.ServerNotice['LCP_skin'] = ResData.PanelRes.ServerList;
            PanelManage.ServerNotice.setData();
            PanelManage.ServerNotice.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.ServerNotice, 2);
        })
    }
    // 创建角色界面
    export function openCreateAvatarPanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.CreateAvatar) {
            return
        }
        PopUpManager.checkPanel(PanelManage.CreateAvatar);
        ResManage.loadResource(ResData.PanelRes.CreateAvatar, () => {
            PanelManage.CreateAvatar = new view.common.CreateAvatarPanel();
            PanelManage.CreateAvatar['LCP_skin'] = ResData.PanelRes.CreateAvatar;
            PanelManage.CreateAvatar.setData();
            PanelManage.CreateAvatar.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.CreateAvatar, 1);
        })
    }

    // 选择角色界面
    export function openChooseAvatarPanel(data): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.ChooseAvatar) {
            return
        }
        PopUpManager.checkPanel(PanelManage.ChooseAvatar);
        ResManage.loadResource(ResData.PanelRes.ChooseAvatar, () => {
            PanelManage.ChooseAvatar = new view.common.ChooseAvatarPanel();
            PanelManage.ChooseAvatar['LCP_skin'] = ResData.PanelRes.CreateAvatar;
            PanelManage.ChooseAvatar.setData(data);
            PanelManage.ChooseAvatar.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.ChooseAvatar, 1);
        })
    }
    /**
     * 显示主界面
     */
    export function openMainPanel(): void {
        if (PanelManage.Main) {
            PopUpManager.showPanel(PanelManage.Main);
        }
        else {
            PanelManage.loadMainPanel();
        }
    }
    // /**
    //  * 显示剧情界面
    //  */
    // export function openJuQingModePanel(): void {

    //     if (PanelManage.JuQingMode) {
    //         PopUpManager.showPanel(PanelManage.JuQingMode);
    //     }
    //     else {
    //         PanelManage.loadJuQingModePanel();
    //     }

    // }

    /******************************游戏界面************************************* */
    /**
     * 角色界面
     */
    export function openJueSePanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.JueSe) {
            return
        }
        PopUpManager.checkPanel(PanelManage.JueSe);
        ResManage.loadResource(ResData.PanelRes.JueSe, () => {
            PanelManage.JueSe = new view.juese.JueSePanel();
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
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.DiZi) {
            return
        }
        PopUpManager.checkPanel(PanelManage.DiZi);
        ResManage.loadResource(ResData.PanelRes.DiZi, () => {
            PanelManage.DiZi = new view.hero.HeroPanel();
            PanelManage.DiZi['LCP_skin'] = ResData.PanelRes.JueSe;
            PanelManage.DiZi.setData();
            PanelManage.DiZi.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.DiZi, 1, 0, 2);
        })
    }

    /**
    * 时装界面
    */
    export function openClothePanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.Clothe) {
            return
        }
        PopUpManager.checkPanel(PanelManage.Clothe);
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
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.WaiGong) {
            return
        }
        PopUpManager.checkPanel(PanelManage.WaiGong);
        ResManage.loadResource(ResData.PanelRes.WaiGong, () => {
            PanelManage.WaiGong = new view.wuXue.WuXueWaiGongPanel();
            PanelManage.WaiGong['LCP_skin'] = ResData.PanelRes.WaiGong;
            PanelManage.WaiGong.setData();
            PanelManage.WaiGong.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.WaiGong, 1, 0, 2);
        })
    }
    /**
    * 武学内功界面
    */
    export function openWuXueNeiGongPanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.NeiGong) {
            return
        }
        PopUpManager.checkPanel(PanelManage.NeiGong);
        ResManage.loadResource(ResData.PanelRes.NeiGong, () => {
            PanelManage.NeiGong = new view.wuXue.WuXueNeiGongPanel();
            PanelManage.NeiGong['LCP_skin'] = ResData.PanelRes.NeiGong;
            PanelManage.NeiGong.setData();
            PanelManage.NeiGong.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.NeiGong, 1, 0, 2);
        })
    }
    /**
    * 武学合道界面
    */
    export function openWuXueHeDaoPanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.HeDao) {
            return
        }
        PopUpManager.checkPanel(PanelManage.HeDao);
        ResManage.loadResource(ResData.PanelRes.HeDao, () => {
            PanelManage.HeDao = new view.wuXue.WuXueHeDaoPanel();
            PanelManage.HeDao['LCP_skin'] = ResData.PanelRes.HeDao;
            PanelManage.HeDao.setData();
            PanelManage.HeDao.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.HeDao, 1, 0, 2);
        })
    }
    /**
    * 武学生活技能界面
    */
    export function openWuXueLifeSkillPanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.LifeSkill) {
            return
        }
        PopUpManager.checkPanel(PanelManage.LifeSkill);
        ResManage.loadResource(ResData.PanelRes.LifeSkill, () => {
            PanelManage.LifeSkill = new view.wuXue.WuXueLifeSkillPanel();
            PanelManage.LifeSkill['LCP_skin'] = ResData.PanelRes.LifeSkill;
            PanelManage.LifeSkill.setData();
            PanelManage.LifeSkill.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.LifeSkill, 1, 0, 2);
        })
    }





    /**
     * 宅院界面
     */
    export function openZhaiYuanPanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.ZhaiYuan) {
            return
        }
        PopUpManager.checkPanel(PanelManage.ZhaiYuan);
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
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.GuildSelect) {
            return
        }
        PopUpManager.checkPanel(PanelManage.GuildSelect);
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
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.GuildMain) {
            return
        }
        PopUpManager.checkPanel(PanelManage.GuildMain);
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
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.Team) {
            return
        }
        PopUpManager.checkPanel(PanelManage.Team);
        ResManage.loadResource(ResData.PanelRes.Team, () => {
            PanelManage.Team = new view.team.TeamPanel();
            PanelManage.Team['LCP_skin'] = ResData.PanelRes.Team;
            PanelManage.Team.setData();
            PanelManage.Team.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.Team, 1, 0, 2);
        })
    }
    /**
   * 好友界面
   */
    export function openFriendPanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.Friend) {
            return
        }
        PopUpManager.checkPanel(PanelManage.Friend);
        ResManage.loadResource(ResData.PanelRes.Friend, () => {
            PanelManage.Friend = new view.friend.FriendPanel();
            PanelManage.Friend['LCP_skin'] = ResData.PanelRes.Friend;
            PanelManage.Friend.setData();
            PanelManage.Friend.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.Friend, 1, 0, 2);
        })
    }
    /**
    * 帮会外交界面
    */
    export function openGuildWaiJiaoPanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.GuildWaiJiao) {
            return
        }
        PopUpManager.checkPanel(PanelManage.GuildWaiJiao);
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
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.GuildIntoCondition) {
            return
        }
        PopUpManager.checkPanel(PanelManage.GuildIntoCondition);
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
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.GuildFuli) {
            return
        }
        PopUpManager.checkPanel(PanelManage.GuildFuli);
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
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.GuildStore) {
            return
        }
        PopUpManager.checkPanel(PanelManage.GuildStore);
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
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.GuildRecord) {
            return
        }
        PopUpManager.checkPanel(PanelManage.GuildRecord);
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
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.GuildApply) {
            return
        }
        PopUpManager.checkPanel(PanelManage.GuildApply);
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
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.GuildMember) {
            return
        }
        PopUpManager.checkPanel(PanelManage.GuildMember);
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
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.GuildRank) {
            return
        }
        PopUpManager.checkPanel(PanelManage.GuildRank);
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
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.GuildHelp) {
            return
        }
        PopUpManager.checkPanel(PanelManage.GuildHelp);
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
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.GuildShop) {
            return
        }
        PopUpManager.checkPanel(PanelManage.GuildShop);
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
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.Menu) {
            return
        }
        PopUpManager.checkPanel(PanelManage.Menu);
        ResManage.loadResource(ResData.PanelRes.Menu, () => {
            PanelManage.Menu = new view.menu.MenuPanel();
            PanelManage.Menu['LCP_skin'] = ResData.PanelRes.Menu;
            PanelManage.Menu.setData();
            PanelManage.Menu.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.Menu, 99, 0, 2);
        })
    }
    /**
     * 背包界面
     */
    export function openBeiBaoPanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.BeiBao) {
            return
        }
        PopUpManager.checkPanel(PanelManage.BeiBao);
        ResManage.loadResource(ResData.PanelRes.BeiBao, () => {
            PanelManage.BeiBao = new view.beiBao.BeiBaoPanel();
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
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.Task_Main) {
            return
        }
        PopUpManager.checkPanel(PanelManage.Task_Main);
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
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.Task_Daily) {
            return
        }
        PopUpManager.checkPanel(PanelManage.Task_Daily);
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
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.Task_LiLian) {
            return
        }
        PopUpManager.checkPanel(PanelManage.Task_LiLian);
        ResManage.loadResource(ResData.PanelRes.Task_LiLian, () => {
            PanelManage.Task_LiLian = new view.task.Task_LiLianPanel();
            PanelManage.Task_LiLian['LCP_skin'] = ResData.PanelRes.Task_LiLian;
            PanelManage.Task_LiLian.setData();
            PanelManage.Task_LiLian.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.Task_LiLian, 2, 0, 2);
        })
    }

    /**
     * 成就任务界面
     */
    export function openTask_ChengJiuPanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.Task_chengJiu) {
            return
        }
        PopUpManager.checkPanel(PanelManage.Task_chengJiu);
        ResManage.loadResource(ResData.PanelRes.Task_chengJiu, () => {
            PanelManage.Task_chengJiu = new view.task.Task_ChengJiuPanel();
            PanelManage.Task_chengJiu['LCP_skin'] = ResData.PanelRes.Task_chengJiu;
            PanelManage.Task_chengJiu.setData();
            PanelManage.Task_chengJiu.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.Task_chengJiu, 2, 0, 2);
        })
    }



    /**
     * 主线副本界面
     */
    export function openFuBenMainPanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.FuBenMain) {
            return
        }
        PopUpManager.checkPanel(PanelManage.FuBenMain);
        ResManage.loadResource(ResData.PanelRes.FuBenMain, () => {
            PanelManage.FuBenMain = new view.fuBen.FuBen_MainPanel();
            PanelManage.FuBenMain['LCP_skin'] = ResData.PanelRes.FuBenMain;
            PanelManage.FuBenMain.setData();
            PanelManage.FuBenMain.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.FuBenMain, 2, 0, 2);
        })
    }

    /**
     * 每日副本界面
     */
    export function openFuBenDailyPanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.FuBenDaily) {
            return
        }
        PopUpManager.checkPanel(PanelManage.FuBenDaily);
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
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.FuBenLiLian) {
            return
        }
        PopUpManager.checkPanel(PanelManage.FuBenLiLian);
        ResManage.loadResource(ResData.PanelRes.FuBenLiLian, () => {
            PanelManage.FuBenLiLian = new view.fuBen.FuBen_LiLianPanel();
            PanelManage.FuBenLiLian['LCP_skin'] = ResData.PanelRes.FuBenDaily;
            PanelManage.FuBenLiLian.setData();
            PanelManage.FuBenLiLian.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.FuBenLiLian, 2, 0, 2);
        })
    }

    /**
     * 限时副本界面
     */
    export function openFuBenXianShiPanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.FuBenXianShi) {
            return
        }
        PopUpManager.checkPanel(PanelManage.FuBenXianShi);
        ResManage.loadResource(ResData.PanelRes.FuBenXianShi, () => {
            PanelManage.FuBenXianShi = new view.fuBen.FuBen_XianShiPanel();
            PanelManage.FuBenXianShi['LCP_skin'] = ResData.PanelRes.FuBenXianShi;
            PanelManage.FuBenXianShi.setData();
            PanelManage.FuBenXianShi.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.FuBenXianShi, 2, 0, 2);
        })
    }





    /**
     * 剧情进度界面
     */
    export function openJuQingInfoPanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.JuQingInfo) {
            return
        }
        PopUpManager.checkPanel(PanelManage.JuQingInfo);
        ResManage.loadResource(ResData.PanelRes.JuQingInfo, () => {
            PanelManage.JuQingInfo = new view.juQing.JuQingInfoPanel();
            PanelManage.JuQingInfo['LCP_skin'] = ResData.PanelRes.JuQingInfo;
            PanelManage.JuQingInfo.setData();
            PanelManage.JuQingInfo.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.JuQingInfo, 2, 0, 2);
        })
    }

    /**
     * 游戏引导界面
     */
    export function openYinDaoPanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.YinDao) {
            return
        }
        PopUpManager.checkPanel(PanelManage.YinDao);
        ResManage.loadResource(ResData.PanelRes.YinDao, () => {
            PanelManage.YinDao = new view.yindao.YinDaoPanel();
            PanelManage.YinDao['LCP_skin'] = ResData.PanelRes.YinDao;
            PanelManage.YinDao.setData();
            PanelManage.YinDao.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.YinDao, 2, 0, 2);
        })
    }

    /**
     * 游戏指南界面
     */
    export function openZhiNanPanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.ZhiNan) {
            return
        }
        PopUpManager.checkPanel(PanelManage.ZhiNan);
        ResManage.loadResource(ResData.PanelRes.ZhiNan, () => {
            PanelManage.ZhiNan = new view.zhiNan.ZhiNanPanel();
            PanelManage.ZhiNan['LCP_skin'] = ResData.PanelRes.ZhiNan;
            PanelManage.ZhiNan.setData();
            PanelManage.ZhiNan.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.ZhiNan, 2, 0, 2);
        })
    }


    /**
     * 排行榜界面
     */
    export function openRankMainPanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.RankMain) {
            return
        }
        PopUpManager.checkPanel(PanelManage.RankMain);
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
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.NorthMap) {
            return
        }
        PopUpManager.checkPanel(PanelManage.NorthMap);
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
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.SouthMap) {
            return
        }
        PopUpManager.checkPanel(PanelManage.SouthMap);
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
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.EastMap) {
            return
        }
        PopUpManager.checkPanel(PanelManage.EastMap);
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
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.WorldMap) {
            return
        }
        PopUpManager.checkPanel(PanelManage.WorldMap);
        ResManage.loadResource(ResData.PanelRes.WorldMap, () => {
            PanelManage.WorldMap = new view.map.WorldMapPanel();
            PanelManage.WorldMap['LCP_skin'] = ResData.PanelRes.WorldMap;
            PanelManage.WorldMap.setData();
            PanelManage.WorldMap.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.WorldMap, 3);
        })
    }


    /**
     * 剧情模式界面
     */
    export function openJuQingModePanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.JuQingMode) {
            return
        }
        PopUpManager.checkPanel(PanelManage.JuQingMode);
        ResManage.loadResource(ResData.PanelRes.JuQingMode, () => {
            PanelManage.JuQingMode = new view.juQingMode.JuQingModePanel();
            PanelManage.JuQingMode['LCP_skin'] = ResData.PanelRes.JuQingMode;
            PanelManage.JuQingMode.setData();
            PanelManage.JuQingMode.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.JuQingMode, 1);
        })
    }


    /**
  * 图鉴道具界面
  */
    export function openTuJianDaojuPanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.TuJianDaoju) {
            return
        }
        PopUpManager.checkPanel(PanelManage.TuJianDaoju);
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
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.TuJianJuese) {
            return
        }
        PopUpManager.checkPanel(PanelManage.TuJianJuese);
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
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.TuJianEvent) {
            return
        }
        PopUpManager.checkPanel(PanelManage.TuJianEvent);
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
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.TuJianPlace) {
            return
        }
        PopUpManager.checkPanel(PanelManage.TuJianPlace);
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
    export function openTianJianPanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.TianJian) {
            return
        }
        PopUpManager.checkPanel(PanelManage.TianJian);
        ResManage.loadResource(ResData.PanelRes.TianJian, () => {
            PanelManage.TianJian = new view.tianJian.TianJianPanel();
            PanelManage.TianJian['LCP_skin'] = ResData.PanelRes.TianJian;
            PanelManage.TianJian.setData();
            PanelManage.TianJian.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.TianJian, 2, 0, 2);
        })
    }

}