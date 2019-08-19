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
    export let BeiBao: view.beiBao.BeiBaoPanel;//背包界面
    export let FuBen: view.fuBen.FuBenPanel;//副本界面
    export let YangCheng: view.yangCheng.YangChengPanel;//养成界面
    export let Task: view.task.TaskPanel;//任务界面
    export let WorldMap: view.map.WorldMapPanel;//世界地图界面
    export let JuQingTalk: view.juQing.JuQingTalkPanel;//剧情对白界面
    export let GuildSelect: view.guild.GuildSelectPanel;//公会界面
    export let GuildTeam: view.guild.GuildTeamPanel;//帮会界面
    export let GuildIntoCondition: view.guild.GuildIntoConditionPanel;//入帮设置界面
    export let GuildFuli: view.guild.GuildFuliPanel;//帮派福利界面
    export let GuildRecord: view.guild.GuildRecordPanel;//帮派日志界面
    export let GuildApply: view.guild.GuildApplyPanel;//入帮申请界面
    export let GuildHelp: view.guild.GuildHelpPanel;//帮派支援界面
    export let Menu: view.menu.MenuPanel;//菜单界面
    export let DiZi: view.hero.HeroPanel;//弟子界面
    export let TuJianJiangHu: view.tujian.TuJianJiangHuPanel;//图鉴江湖界面
    export let TuJianDaoju: view.tujian.TuJianDaojuPanel;//图鉴道具界面
    export let TuJianJuese: view.tujian.TuJianJuesePanel;//图鉴角色界面
    export let TuJianBoss: view.tujian.TuJianBossPanel;//图鉴角色界面
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
            PopUpManager.addPanel(PanelManage.JueSe, 1, 3, 1);
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
            PopUpManager.addPanel(PanelManage.DiZi, 2, 0, 1);
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
            PopUpManager.addPanel(PanelManage.Clothe, 2, 3, 1);
        })
    }
    /**
     * 养成界面
     */
    export function openYangChengPanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.YangCheng) {
            return
        }
        PopUpManager.checkPanel(PanelManage.YangCheng);
        ResManage.loadResource(ResData.PanelRes.YangCheng, () => {
            PanelManage.YangCheng = new view.yangCheng.YangChengPanel();
            PanelManage.YangCheng['LCP_skin'] = ResData.PanelRes.YangCheng;
            PanelManage.YangCheng.setData();
            PanelManage.YangCheng.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.YangCheng, 1, 5, 1);
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
            PopUpManager.addPanel(PanelManage.GuildSelect, 1, 5, 1);
        })
    }
    /**
    * 帮会界面
    */
    export function openGuildTeamPanel(data): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.GuildTeam) {
            return
        }
        PopUpManager.checkPanel(PanelManage.GuildTeam);
        ResManage.loadResource(ResData.PanelRes.GuildTeam, () => {
            PanelManage.GuildTeam = new view.guild.GuildTeamPanel();
            PanelManage.GuildTeam['LCP_skin'] = ResData.PanelRes.GuildTeam;
            PanelManage.GuildTeam.setData(data);
            PanelManage.GuildTeam.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.GuildTeam, 1, 5, 1);
        })
    }
    /**
    * 入帮设置界面
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
            PopUpManager.addPanel(PanelManage.GuildIntoCondition, 2, 5, 1);
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
            PopUpManager.addPanel(PanelManage.GuildFuli, 2, 5, 1);
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
            PopUpManager.addPanel(PanelManage.GuildRecord, 2, 5, 1);
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
            PanelManage.GuildApply = new view.guild.GuildApplyPanel();
            PanelManage.GuildApply['LCP_skin'] = ResData.PanelRes.GuildApply;
            PanelManage.GuildApply.setData();
            PanelManage.GuildApply.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.GuildApply, 2, 5, 1);
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
            PopUpManager.addPanel(PanelManage.GuildHelp, 2, 5, 1);
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
            PopUpManager.addPanel(PanelManage.Menu, 99, 5, 2);
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
            PopUpManager.addPanel(PanelManage.BeiBao, 1, 6, 1);
        })
    }
    /**
   * 任务界面
   */
    export function openTaskPanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.Task) {
            return
        }
        PopUpManager.checkPanel(PanelManage.Task);
        ResManage.loadResource(ResData.PanelRes.Task, () => {
            PanelManage.Task = new view.task.TaskPanel();
            PanelManage.Task['LCP_skin'] = ResData.PanelRes.Task;
            PanelManage.Task.setData();
            PanelManage.Task.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.Task, 2, 5, 1);
        })
    }
   
    /**
     * 剧情副本界面
     */
    export function openFuBenPanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.FuBen) {
            return
        }
        PopUpManager.checkPanel(PanelManage.FuBen);
        ResManage.loadResource(ResData.PanelRes.FuBen, () => {
            PanelManage.FuBen = new view.fuBen.FuBenPanel();
            PanelManage.FuBen['LCP_skin'] = ResData.PanelRes.FuBen;
            PanelManage.FuBen.setData();
            PanelManage.FuBen.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.FuBen, 1, 4, 1);
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
            PopUpManager.addPanel(PanelManage.WorldMap, 2);
        })
    }
    /**
     * 剧情对白界面
     */
    export function openJuQingTalkPanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.JuQingTalk) {
            return
        }
        PopUpManager.checkPanel(PanelManage.JuQingTalk);
        ResManage.loadResource(ResData.PanelRes.JuQingTalk, () => {
            PanelManage.JuQingTalk = new view.juQing.JuQingTalkPanel();
            PanelManage.JuQingTalk['LCP_skin'] = ResData.PanelRes.JuQingTalk;
            PanelManage.JuQingTalk.setData();
            PanelManage.JuQingTalk.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.JuQingTalk, 2, 3, 3);
        })
    }

    /**
   * 图鉴江湖界面
   */
    export function openTuJianJiangHuPanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.TuJianJiangHu) {
            return
        }
        PopUpManager.checkPanel(PanelManage.TuJianJiangHu);
        ResManage.loadResource(ResData.PanelRes.TuJianJiangHu, () => {
            PanelManage.TuJianJiangHu = new view.tujian.TuJianJiangHuPanel();
            PanelManage.TuJianJiangHu['LCP_skin'] = ResData.PanelRes.TuJianJiangHu;
            PanelManage.TuJianJiangHu.setData();
            PanelManage.TuJianJiangHu.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.TuJianJiangHu, 2, 3, 1);
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
            PopUpManager.addPanel(PanelManage.TuJianDaoju, 2, 3, 1);
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
            PopUpManager.addPanel(PanelManage.TuJianJuese, 2, 3, 1);
        })
    }
    /**
     * 图鉴怪物界面
     */
    export function openTuJianBossPanel(): void {
        if (PopUpManager.curPanel && PopUpManager.curPanel == PanelManage.TuJianBoss) {
            return
        }
        PopUpManager.checkPanel(PanelManage.TuJianBoss);
        ResManage.loadResource(ResData.PanelRes.TuJianBoss, () => {
            PanelManage.TuJianBoss = new view.tujian.TuJianBossPanel();
            PanelManage.TuJianBoss['LCP_skin'] = ResData.PanelRes.TuJianBoss;
            PanelManage.TuJianBoss.setData();
            PanelManage.TuJianBoss.mouseEnabled = true;
            PopUpManager.addPanel(PanelManage.TuJianBoss, 2, 3, 1);
        })
    }
}