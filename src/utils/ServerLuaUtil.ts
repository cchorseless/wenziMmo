// class LuaScript {

//     public static xfxmoveCbs: String = "";
//     public static flynpc: String = "";
//     public static excuteScript(str: String, isstone: Boolean = false, isCostTrans: Boolean = true): void {
//         var arr: Array = str.split("`");
//         var strSend: String = "";
//         var strmapid: String = "";
//         var strmapx: String = "";
//         var strmapy: String = "";
//         var isAccurate: Boolean = true;
//         if (arr[0] == "findnpc") {
//             var npcarr: Array = arr[1].toString().split("`");
//             var npcid: number = 0;
//             if (parseInt(npcarr[0]) > 0) {
//                 npcid = parseInt(npcarr[0]);
//             } else {
//                 npcid = parseInt(arr[1]);
//             }
//             isAccurate = false;
//             var npc: stNpcGen = mydb_gamecfg.mydb_npcgen_tbl_map_byid.get(npcid);
//             if (npc) {
//                 strmapid = npc.mapid.toString();
//                 strmapx = npc.mapx.toString();
//                 strmapy = npc.mapy.toString();
//             }

//             if (parseInt(strmapid) == gamemap.getme().m_nMapID &&
//                 strmapx != "" && strmapy != "" && Game.mainPlayer.GetXYtoRate(npc.mapx, npc.mapy)
//             ) {//在npc附近，不用飞，直接跑去！
//                 script(str, null, null, 0);//跑去
//                 return;
//             }

//         } else if (arr[0] == "findpoint" || arr[0] == "findapath") {
//             var mapidarr: Array = arr[1].toString().split("`");
//             var mapid: number = 0;
//             if (parseInt(mapidarr[0]) > 0) {
//                 mapid = parseInt(mapidarr[0]);
//             } else {
//                 mapid = parseInt(arr[1]);
//             }
//             strmapid = mapid.toString();
//             strmapx = arr[2].toString();
//             strmapy = arr[3].toString();
//         } else if (arr[0] == "sendluapack") {
//             script(str, null, null, 0);//跑去
//             return;
//         }
//         strSend = strmapid + "~" + strmapx + "~" + strmapy + "~" + "\"" + str.replace("'", "") + "\"";
//         LuaScript.sendLuaPack('xfxmove', strSend, 1, false, isstone, isCostTrans, isAccurate);
//         flynpc = str;
//         control.getme().isclickflyshose = false;
//     }

//     public static m_xfxmd5: number = 0;
//     public static posx: number;
//     public static posy: number;
//     public static luaSendHashMap: HashMap = new HashMap;

//     public static sendLuaPack(strFunName: String, strMsg: String = "", nType: number = 1, boAllSend: Boolean = false, usestone: Boolean = false, isCostTrans: Boolean = true, isAccurateTrans: Boolean = true): void {
//         var sendkey: String = strFunName + strMsg + nType + boAllSend + usestone;
//         trace("-----------------------------strfun", sendkey)
//         if (luaSendHashMap.get(sendkey) && (getTimer() - luaSendHashMap.get(sendkey) < 16)) {
//             return;
//         }

//         //			if(strFunName == "ChatMoveTo"){
//         //				LuaScript.script("findpoint`" + strMsg);
//         //				control.cur_AutoRoadStr = "";
//         //				return;
//         //			}
//         luaSendHashMap.put(sendkey, getTimer());
//         for (sendkey in luaSendHashMap.getContent()) {
//             if (getTimer() - luaSendHashMap.get(sendkey) > 16) {
//                 luaSendHashMap.remove(sendkey);
//             }
//         }
//         if (!AvaterStageReadyEncoder.boisready) {
//             if (strFunName == "xfxmove") {
//                 return;
//             }
//         }

//         var upmsg: stQuestClientDataEncoder = new stQuestClientDataEncoder();

//         upmsg.SetValue('dwClientType', nType);
//         if (strFunName == "xfxmove") {
//             var xfxstr: String = aaxfx(strMsg);
//             if (isCostTrans) {
//                 strMsg = xfxstr + "," + strMsg + ",1";
//             } else {
//                 strMsg = xfxstr + "," + strMsg + ",0";
//             }

//             if (!isAccurateTrans) {
//                 strMsg += ",0";
//             } else {
//                 strMsg += ",1";
//             }
//             gamemap.getme().ClearMapRoadPoint();
//         }
//         if (posx > 0 && posy > 0) {
//             upmsg.SetValue("posx", posx);
//             upmsg.SetValue("posy", posy);
//             posx = 0;
//             posy = 0;
//         }
//         var strparm: String = '(' + strMsg + ')';
//         if (boAllSend) {
//             strparm = '';
//         }
//         var str: String = strFunName + strparm;
//         trace("str-->", str);
//         if (strFunName == "xfxmove") {
//             upmsg.setString(str);


//             if (Game.mainPlayer.nState == enumCreature.STATE_STAND || Game.mainPlayer.nState == enumCreature.STATE_HOLD || Game.mainPlayer.nState == enumCreature.STATE_BEATEN) {
//                 if (strparm.search("xfxmove") >= 0) return;
//                 upmsg.send();
//             } else {
//                 Game.mainPlayer.m_nextAction.push(upmsg);
//                 return;
//             }



//         } else {
//             upmsg.setString(str);
//             upmsg.send();
//         }
//         upmsg.Clear();
//         upmsg = null;
//     }

//     private static m_szOStr: String = '';
//     private static m_szTStr: String = '';
//     private static __onePressed(): void {
//         sendLuaPack(m_szOStr, '', 1, true);
//     }

//     private static __twoPressed(): void {
//         sendLuaPack(m_szTStr, '', 1, true);
//     }

//     public static aaxfx(szmsg: String): String {
//         var sResult: ByteArray = new ByteArray;
//         sResult.writeUnsignedInt(m_xfxmd5);
//         var b: ByteArray = Bases.passwdCypto(szmsg, sResult);
//         sResult.clear();
//         var n: number = 0;
//         for (var i: number = 0; i < b.length; i++) {
//             n = n + parseInt(b[i].toString());
//             //trace(b[i].toString());
//         }
//         return n.toString();
//     }

//     private static __inputFun(s: String): void {
//         sendLuaPack(m_szOStr, s);
//     }

//     public static showDialog(arr: Array): void {
//         m_szOStr = arr[6];
//         m_szTStr = arr[8];
//         var btntwo: String = "";
//         if (arr.length > 7) {
//             btntwo = arr[7];
//         }
//     }


//     public static  UIMsg_delayLst: Array = [];
//     public static script(scriptstr: String, c: K3Dialog = null, focusNpc: BaseCreature = null, npcid: number = 0): Boolean {
//         //			trace("-------------------script",scriptstr);
//         var str: String = scriptstr;
//         var strExtends: String = '';
//         var editstr: String = '';
//         ///////////////////////////
//         var m_cParseArray: Array = null;
//         var temp: Array = str.split("`");
//         m_cParseArray = str.split("`");
//         //////////////////////////////
//         //m_cParseArray = str.split("`");
//         var strName: String = m_cParseArray[0];
//         strExtends = m_cParseArray[1];
//         if (strName) {
//             switch (strName) {
//                 case 'guildwar': {
//                     ActRankInfoDialog.getme().visible = true;

//                     var tmp_guildwar: Array = String(temp[1]).split("+");
//                     //15 夜战风云
//                     if (tmp_guildwar && tmp_guildwar[0] == "15") {
//                         ActRankInfoDialog.getme().setInfo(temp[1], ActRankInfoDialog.TYPE_YZBQ);
//                         //						  control.getme().RefYZBQ(temp[1]);
//                     } else if (tmp_guildwar && tmp_guildwar[0] == "16") {
//                         ActRankInfoDialog.getme().setInfo(temp[1], ActRankInfoDialog.TYEP_MZRQ);
//                         //							control.getme().RefMZRQ(temp[1]);
//                     }

//                     //16魔族入侵

//                 } break;
//                 case 'mapplaynum'://服务器发来的人数
//                     gamemap.m_nAllpeopleNum = parseInt(strExtends) <= 0 ? 30 : parseInt(strExtends);
//                     break;


//                 case "equipStrenLvls"://强化等级s
//                     {
//                         if (m_cParseArray.length > 0) {
//                             m_cParseArray.splice(0, 1);
//                         }
//                         GameData.getMe().onStrenLvlMsg(m_cParseArray)
//                         break;
//                     }
//                 case 'opendialog': {	//打开面板
//                     checkInitedDialogs();
//                     if (m_cParseArray.length < 2) {
//                         return false;
//                     }
//                     if (strExtends == "bag") {
//                         if (m_cParseArray.length > 2) {
//                             if ((m_cParseArray[2] as String).charAt(0) == "5" && (m_cParseArray[2] as String).charAt(1) == "+") {
//                                 var newarr: Array = (m_cParseArray[2] as String).split("+");
//                                 bag.openServerDay = parseInt(newarr[1]);
//                                 if (bag.instance) {
//                                     bag.getme().processPositon(bag.openServerDay);
//                                 }
//                                 return true;
//                             }
//                         }
//                     }

//                     if (strExtends == "BookShopDialog") {
//                         if (Game._mainPlayer.m_nLevel < 75) {
//                             return false;
//                         }
//                     }

//                     if (strExtends == "TransfermMapDialog") {
//                         if ((control.getme().m_cQuestPanel.MainquestID == 737 || control.getme().m_cQuestPanel.MainquestID == 815) && control.getme().m_cQuestPanel.MainquestStatus == npcdialog._QUESTCOMPLETED_) {
//                             return false;
//                         }
//                     }

//                     if (strExtends == "HeQuHuoDong") {
//                         if (m_cParseArray[2] == "0") {

//                         } else if (!HeQuHuoDong.instance) {
//                             return false;
//                         }
//                     }
//                     if (strExtends == "HeroDialog") {
//                         if (m_cParseArray[2] == "30") {
//                             if (!HeroDialog.instance) {
//                                 var openobj: Object = JSON.parse(m_cParseArray[3]);
//                                 HeroDialog.openHeroObj = openobj;
//                                 HeroDialog.SetHeroOpenTimeUpdate();
//                                 return true;
//                             }
//                         }
//                         if (m_cParseArray.length < 3) {
//                             return false;
//                         }
//                         if (strExtends == "HeroDialog" && !HeroDialog.instance && m_cParseArray[2] != "200" && m_cParseArray[2] != "201" && m_cParseArray[2] != "202" && m_cParseArray[2] != "203") {
//                             return true;
//                         }
//                     }



//                     if (strExtends == "characterDialog") {
//                         if (!characterDialog.instance) {
//                             if (m_cParseArray.length < 3) {
//                                 return false;
//                             }
//                             if (m_cParseArray[2] != "203" && m_cParseArray[2] != "204" && m_cParseArray[2] != "205" && m_cParseArray[2] != "206") {
//                                 return false;
//                             }
//                         }
//                     }

//                     if (strExtends == "EquipDialog") {
//                         if (!EquipDialog.instance) {
//                             if (m_cParseArray.length < 3) {
//                                 return false;
//                             }
//                             if (m_cParseArray[2] != "200" && m_cParseArray[2] != "201" && m_cParseArray[2] != "202" && m_cParseArray[2] != "555") {
//                                 return false;
//                             }
//                         }
//                     }
//                     if (strExtends == "treasure2dialog") {
//                         if (!treasure2dialog.instance) {
//                             return false;
//                         }
//                     }

//                     if (strExtends == "AchievementDialog") {
//                         if (!AchievementDialog.instance) {
//                             if (m_cParseArray.length < 3) {
//                                 return false;
//                             }
//                             if (m_cParseArray[2] != "200" && m_cParseArray[2] != "201") {
//                                 return false;
//                             }
//                         }
//                     }

//                     if (strExtends == "WonderfulActDialog") {
//                         if (!WonderfulActDialog.instance) {
//                             if (m_cParseArray.length < 3) {
//                                 return false;
//                             }
//                             if (m_cParseArray[2] != "0" && m_cParseArray[2] != "102") {
//                                 return false;
//                             }
//                         }
//                     }


//                     if (strExtends == "RuneDialog") {
//                         if (!RuneDialog.instance) {
//                             return false;
//                         }
//                     }

//                     if (strExtends == "treasureSystemDialog") {
//                         if (!treasureSystemDialog.instance) {
//                             if (m_cParseArray.length < 3) {
//                                 return false;
//                             }
//                             if (m_cParseArray[2] != "200" && m_cParseArray[2] != "201" && m_cParseArray[2] != "202" && m_cParseArray[2] != "203") {
//                                 return false;
//                             }
//                             //								return false;
//                         }
//                     }

//                     if (strExtends == "bag") {
//                         if (!bag.instance) {
//                             return false;
//                         }
//                     }

//                     if (strExtends == "FengMoGu" && m_cParseArray[2] == "30") {
//                         var fmgJson: Object = JSON.parse(m_cParseArray[3]);
//                         FengMoGu.isQuest = fmgJson.isQuest;
//                         FengMoGu.isExp = fmgJson.GET_JINGYAN;
//                         return true;
//                     }
//                     if (!Lycq_Main.ClientMapchangeComplete) {
//                         UIMsg_delayLst.push({ "str": scriptstr, "c": c, "f": focusNpc, "n": npcid });
//                         return false;
//                     }
//                     if (strExtends == "ui_activeDialog" && m_cParseArray.length == 2) {//meiri 比i做
//                         activeDialog.getme().visible = true;
//                     }

//                     if (strExtends == "activeDialog") {
//                         if (!activeDialog.instance) {
//                             return false;
//                         }
//                     }
//                     if (strExtends == "ui_guild2_into") {
//                         guild2Dialog.getme().visible = true;
//                     }

//                     if (strExtends == "ui_guild_ck") {
//                         if (Game.mainPlayer.getGuildID() == 0) {
//                             guild2Dialog.getme().visible = true;
//                         } else {
//                             guildDialog.getme().visible = true;
//                             guildDialog.getme().getTabButton(5).onClick();
//                         }

//                     }

//                     if (strExtends == "ui_treasure") {
//                         if (m_cParseArray.length == 2) {
//                             treasuredialog.getme().visible = true;
//                         } else if (!treasuredialog.instance) {
//                             return false;
//                         }
//                     }

//                     if (strExtends == "KaiFuHuoDong") {
//                         if (m_cParseArray[2] == "0" || m_cParseArray[2] == "555") {
//                         } else if (!KaiFuHuoDong.instance) {
//                             return false;
//                         }
//                     }





//                     if (strExtends == "ui_yunexplvl" && m_cParseArray.length == 2) {
//                         yunexplvlDialog.getme().visible = true;
//                     }

//                     if (strExtends == "malldialog" && m_cParseArray.length == 2) {//商城
//                         malldialog.getme().visible = true;
//                     }
//                     else if (strExtends == "guideManager" && m_cParseArray.length > 2) {
//                         guideManager.Instance().SetStudyByIDFromSever(parseInt(m_cParseArray[2]));
//                     }

//                     if (strExtends == "malldialog" && !malldialog.instance) {
//                         return false;
//                     }

//                     if (strExtends == "welcomedialog") {
//                         if (!welcomedialog.instance) {
//                             welcomedialog.getme();
//                         }
//                     }

//                     if (strExtends == "reviveDialog") {
//                         if (!reviveDialog.instance) {
//                             if (m_cParseArray[2] != "2") reviveDialog.getme();
//                         }
//                     }

//                     if (strExtends == "control") {
//                         if (!control.instance) {
//                             control.getme();
//                         }
//                     }
//                     if (strExtends == "newdialog") {
//                         if (m_cParseArray.length >= 5) {
//                             setServerGlobalStringMsg(m_cParseArray[4], 6);
//                         }
//                     }

//                     if (strExtends == "YunRewardHallDialog") {
//                         if (m_cParseArray.length == 2) {
//                             YunRewardHallDialog.getme().visible = true;
//                             LuaScript.sendLuaPack("huodong_mianban");
//                         } else if (!YunRewardHallDialog.instance) {
//                             return false;
//                         }

//                     }


//                     if (strExtends == "ChongZhiDialog" && m_cParseArray.length == 2) {
//                         ChargeDialog.getme().visible = true;
//                     }


//                     if (strExtends == "sbkdialog") {
//                         if (m_cParseArray.length == 2) {
//                             var sbkLevel: String = BdfManager.getGlobalString("sbkLevel", 1);
//                             if (sbkLevel && Game.mainPlayer.m_nLevel < number(sbkLevel)) {
//                                 var tip: String = BdfManager.getGlobalString("sbkLevel", 2);
//                                 if (tip) {
//                                     setServerGlobalStringMsg(tip, 6, control.getme());
//                                 }
//                             } else {
//                                 Lcbattledialog.getme().visible = true;
//                                 LuaScript.sendLuaPack("LCZB_clientopen");
//                             }
//                         }
//                         if (m_cParseArray.length < 3) {
//                             return false;
//                         }
//                         if (!Lcbattledialog.instance && m_cParseArray[2] != "1") {
//                             return false;
//                         }

//                     }

//                     if (strExtends == "BossJiZhan") {
//                         if (m_cParseArray.length == 2 || m_cParseArray[2] == 20) {
//                             if (m_cParseArray[2] == 20) {
//                                 BossJiZhan.getme().msgOpen = false;
//                             }
//                             BossJiZhan.getme().visible = true;
//                         } else if (!BossJiZhan.instance) {
//                             return false;
//                         }
//                     }
//                     if (strExtends == "SpecialRingDialog") {
//                         if (m_cParseArray.length < 3) {
//                             return false;
//                         }
//                         if (m_cParseArray[2] == "0") {
//                         } else if (!SpecialRingDialog.instance) {
//                             return false;
//                         }
//                     }
//                     if (strExtends == "LimitedActShortCut") {
//                         if (!control.getme().isLimitActOpen()) {
//                             activeDialog.getme().openFirstTab();
//                         } else {
//                             var actId: number = XianShiHuoDong.getLimitedActId(XianShiHuoDong.appActId);
//                             if (actId > 0) {
//                                 XianShiHuoDong.getme().ActiveShow(actId, 0);
//                             }
//                         }
//                         return false;
//                     }

//                     if (strExtends == "yunexplvlDialog" && m_cParseArray.length == 2) {//经验炼制
//                         yunexplvlDialog.getme().visible = true;
//                     }
//                     if (strExtends == "CompoundDialog" && m_cParseArray.length == 2) {//装备合成
//                         CompoundDialog.getMe().visible = true;
//                     }


//                     if (strExtends == "activeDialog" && m_cParseArray.length == 2) {//日常活动
//                         activeDialog.getme().visible = true;
//                     }

//                     if (strExtends == "npcdialog") {
//                         switch (parseInt(m_cParseArray[2])) {
//                             case 1:
//                                 npcdialog.getme().sethuishou();//回收装备
//                                 break;
//                             case 2://强化
//                                 EquipDialog.getMe().visible = true;
//                                 break;
//                             case 3:
//                                 characterDialog.getme().showSkillPanelWithLead();
//                                 break;
//                             case 4:
//                                 YunRewardHallDialog.getme().visible = true;
//                                 LuaScript.sendLuaPack("huodong_mianban");
//                                 guideManager.Instance().SetStudyByIDFromSever(90);
//                                 break;
//                         }
//                     }
//                     if (strExtends == "QiFuDialog") {
//                         try {
//                             QiFuDialog.getme().visible = true;
//                         }
//                         catch (error: Error) {
//                         }

//                     }

//                     if (strExtends == "ZunGuiTeQuan") {
//                         if (Game._mainPlayer.m_nLevel < 43) {
//                             setServerGlobalStringMsg("等级不足", 6);
//                         }
//                         else {
//                             ZunGuiTeQuan.getMe().visible = true;
//                         }
//                     }

//                     if (strExtends == "IconTip") {
//                         try {
//                             IconTip.getMe().OnScriptMsg(m_cParseArray[3] as String);
//                         }
//                         catch (error: Error) {
//                             //								trace("---------------------角标Json异常");
//                         }

//                         return false;

//                     }

//                     //						if(strExtends == "EquipDialog" && !EquipDialog.instance&&(m_cParseArray[2] != "555")){
//                     //							return false;
//                     //						}
//                     //						trace("------------------::",scriptstr);
//                     if (strExtends == "ShenWeiMoYu") {
//                         if (control.getme().m_cQuestPanel.MainquestID == 725 || control.getme().m_cQuestPanel.MainquestID == 721) {
//                             return false;
//                         }
//                     }

//                     if (m_cParseArray[2] == "hide") {
//                         if (!K3UIManager.m_cStaticDialogHashMap.get(strExtends)) {
//                             return false;
//                         }
//                     }


//                     if (strExtends == "weichongzhidialog") {
//                         alertdialogmanager.setAlertDialog(null, BdfManager.getGlobalString("system", 257), "充值", (): void {
//                             try {
//                                 ChargeDialog.getme().visible = true;
//                             } catch (e: Error) {
//                                 alertdialogmanager.setAlertDialog(null, BdfManager.getGlobalString("system", 213));
//                             }
//                         }, BdfManager.getGlobalString("system", 9));
//                         return true;
//                     }
//                     var tempDialog: K3Dialog = K3DialogManager.creategetmeDialog(strExtends);
//                     if (tempDialog) {
//                         {
//                             if (m_cParseArray[2] == "hide") {
//                                 tempDialog.visible = false;
//                                 return false;
//                             }
//                             if (m_cParseArray[2] == "show") {
//                                 try {
//                                     tempDialog.visible = true;
//                                 }
//                                 catch (error: Error) {
//                                 }
//                             }
//                             try {
//                                 tempDialog.OnMsgBefore(m_cParseArray);
//                             }
//                             catch (error: Error) {
//                                 //								trace("------------------luascript dialog OnMsgBefore error");
//                             }
//                             var classname: String = getQualifiedClassName(tempDialog);
//                             var dname: String = classname.substr(classname.lastIndexOf("::") + 2, classname.length);
//                             var dInfo: Object = {};
//                             dInfo.dialog = tempDialog;
//                             dInfo.name = dname;
//                             dInfo.cretTime = getTimer();
//                             K3Dialog.luaInitedDialogs.put(dname, dInfo);
//                         }
//                     } else {
//                         //							trace("找不到:["+strExtends+"]面板",new Error().getStackTrace());
//                         return false;
//                     }
//                 } break;
//                 case "findapath": {
//                     if (Game.mainPlayer.m_nFindNpc <= 0) {
//                         control.cur_AutoRoadStr = 'findpoint`' + m_cParseArray[1] + '`' + m_cParseArray[2] + '`' + m_cParseArray[3];
//                         LuaScript.script('findpoint`' + m_cParseArray[1] + '`' + m_cParseArray[2] + '`' + m_cParseArray[3]);
//                     }
//                     Game.mainPlayer.requestMonTime = getTimer();
//                 } break;
//                 case "closeAutoAttack": {
//                     Game.mainPlayer.requestMonTime = getTimer();
//                 } break;
//                 case "sendluapack": {
//                     var sparam: String = "";
//                     if (m_cParseArray.length > 2) {
//                         for (var i: number = 2; i < m_cParseArray.length; i++) {
//                             sparam += m_cParseArray[i];
//                             if (i < m_cParseArray.length - 1) {
//                                 sparam += '`';
//                             }
//                         }
//                     }
//                     sendLuaPack(m_cParseArray[1], sparam);
//                 } break;
//                 case "gettop": {
//                     //							topdialog.getMe().getTop(parseInt(strExtends),true);
//                 } break;
//                 case "openurl":
//                     navigateToURL(new URLRequest(strExtends), "_blank");
//                     break;
//                 case 'ShowBtnTips':
//                     var keDialog: K3Dialog = K3DialogManager.creategetmeDialog(m_cParseArray[1]);
//                     var StipArr: Array = (m_cParseArray[2] as String).split(",");
//                     if (keDialog) {
//                         GameUtils.setMsgValue(StipArr[1], StipArr[0], keDialog);
//                     }
//                 case "loopprice":
//                     //						questleaddialog.getMe().getringprice(parseInt(m_cParseArray[1]),parseInt(m_cParseArray[2]));
//                     break;
//                 case 'findnpc':	//查找npc 格式 findnpc,npcid
//                 case 'findnpc()':
//                     {

//                         var npcs: Array = strExtends.split(',');

//                         if (m_cParseArray.length > 2) {
//                             var havehook: Array = (m_cParseArray[2] as String).split('havehook:');

//                             //未知暗殿两张地图
//                             var curMapId: number = gamemap.getme().m_nMapID;
//                             if (int(npcs[0]) == 88 && (curMapId == 1008 || curMapId == 1081)) {
//                                 havehook[1] = curMapId;
//                             }

//                             if (havehook.length >= 1 && havehook[1] && parseInt(havehook[1]) == gamemap.getme().m_nMapID) {

//                                 Game.mainPlayer.SetAutoAttack(2000);
//                                 return false;
//                             }
//                         }

//                         var boFindRightMap: Boolean = false;
//                         for (var j: number = 0; j < npcs.length; j++) {
//                             var npc: stNpcGen = mydb_gamecfg.mydb_npcgen_tbl_map_byid.get(parseInt(npcs[j]));
//                             if (npc) {
//                                 if (npc.mapid == gamemap.getme().m_nMapID) {
//                                     Game.mainPlayer.m_nFindNpc = npc.npcid;
//                                     if (Game.mainPlayer.m_nFindNpc > 0 && Game.mainPlayer.m_pHitTarget != null) {//如果是找NPC,且有目标怪物时,就清除怪物
//                                         Game.mainPlayer.m_pHitTarget = null
//                                     }
//                                     //
//                                     if (!Game.mainPlayer.checkHasItem2Pick()) {
//                                         gamemap.getme().findAPath(gamemap.getme().m_nMapID, npc.mapid, npc.mapx, npc.mapy);
//                                     } else {
//                                         Game.mainPlayer.m_boAutoAttack = true;
//                                     }
//                                     boFindRightMap = true;
//                                     break;
//                                 } else {
//                                     if (Game.mainPlayer.m_nFindNpc > 0) {//如果是找NPC,不同一副图
//                                         Game.mainPlayer.m_boAutoAttack = false;
//                                     }

//                                 }
//                             }
//                         }
//                         if (!boFindRightMap) {
//                             if (Game.mainPlayer.m_nJob >= enumCreature.JOB_WARRIOR && Game.mainPlayer.m_nJob <= enumCreature.JOB_TAOIST && npcs.length >= 3) {
//                                 var npcid1: number = parseInt(npcs[Game.mainPlayer.m_nJob - 1]);
//                             } else {
//                                 npcid1 = parseInt(npcs[0]);
//                             }

//                             npc = mydb_gamecfg.mydb_npcgen_tbl_map_byid.get(npcid1);
//                             if (npc) {
//                                 Game.mainPlayer.m_nFindNpc = npc.npcid;
//                                 var isFindPath: Boolean = false;
//                                 if (!Game.mainPlayer.checkHasItem2Pick()) {
//                                     isFindPath = gamemap.getme().findAPath(gamemap.getme().m_nMapID, npc.mapid, npc.mapx, npc.mapy);
//                                     if (!isFindPath) {
//                                         npcid1 = parseInt(npcs[0]);
//                                         npc = mydb_gamecfg.mydb_npcgen_tbl_map_byid.get(npcid1);
//                                         if (npc) {
//                                             Game.mainPlayer.m_nFindNpc = npc.npcid;
//                                             if (!gamemap.getme().findAPath(gamemap.getme().m_nMapID, npc.mapid, npc.mapx, npc.mapy)) {
//                                                 //寻路失败 直接传送
//                                                 if (gamemap.getme().m_nMapID != npc.mapid) {

//                                                     var strSend: String = npc.mapid + "~" + npc.mapx + "~" + npc.mapy + "~" + "\"" + str.replace("'", "") + "\"";
//                                                     LuaScript.sendLuaPack('xfxmove', strSend, 1, false, false);
//                                                 }

//                                             }
//                                         }
//                                     }
//                                 } else {
//                                     Game.mainPlayer.m_boAutoAttack = true;
//                                 }
//                                 //									if (!gamemap.getme().findAPath(gamemap.getme().m_nMapID,npc.mapid,npc.mapx,npc.mapy))
//                                 //									{
//                                 //										npcid1 =  parseInt(npcs[0]);
//                                 //										npc = mydb_gamecfg.mydb_npcgen_tbl_map_byid.get(npcid1);
//                                 //										if(npc)
//                                 //										{
//                                 //											Game.mainPlayer.m_nFindNpc = npc.npcid;
//                                 //											if(!gamemap.getme().findAPath(gamemap.getme().m_nMapID,npc.mapid,npc.mapx,npc.mapy)){
//                                 //												//寻路失败 直接传送
//                                 //												if(gamemap.getme().m_nMapID!=npc.mapid){
//                                 //													
//                                 //													var strSend:String =npc.mapid+"~"+npc.mapx+"~"+npc.mapy+"~"+"\""+str.replace("'","")+"\"";
//                                 //													LuaScript.sendLuaPack('xfxmove',strSend,1,false,false);
//                                 //												}
//                                 //												
//                                 //											}
//                                 //										}
//                                 //									}
//                             }
//                         }

//                     } break;
//                 case 'findpoint'://findpoint+世界id+x+y
//                 case 'findpoint()':
//                     {
//                         Game.mainPlayer.m_nDestMap = 0;
//                         Game.mainPlayer.m_nDestX = 0;
//                         Game.mainPlayer.m_nDestY = 0;
//                         var strExtends1: String = "";
//                         var strExtends2: String = "";
//                         var strExtends3: String = "";
//                         var strExtends4: String = "";
//                         var maps: Array = strExtends.split(',');
//                         if (m_cParseArray.length >= 2) strExtends1 = m_cParseArray[2];
//                         if (m_cParseArray.length >= 3) {
//                             strExtends2 = m_cParseArray[3];
//                             var boFindMap: Boolean = false;
//                             for (j = 0; j < maps.length; j++) {
//                                 var nMapid: number = parseInt(maps[j]);
//                                 if (nMapid == gamemap.getme().m_nMapID) {
//                                     gamemap.getme().findAPath(gamemap.getme().m_nMapID, nMapid, parseInt(strExtends1), parseInt(strExtends2));
//                                     Game.mainPlayer.m_nDestMap = nMapid;
//                                     Game.mainPlayer.m_nDestX = parseInt(strExtends1);
//                                     Game.mainPlayer.m_nDestY = parseInt(strExtends2);
//                                     boFindMap = true;

//                                     break;
//                                 }
//                             }
//                             if (!boFindMap) {
//                                 if (Game.mainPlayer.m_nJob >= enumCreature.JOB_WARRIOR && Game.mainPlayer.m_nJob <= enumCreature.JOB_TAOIST && maps.length >= 3) {
//                                     nMapid = parseInt(maps[Game.mainPlayer.m_nJob - 1]);

//                                 } else {
//                                     nMapid = parseInt(maps[0]);
//                                 }
//                                 Game.mainPlayer.m_nDestMap = nMapid;
//                                 Game.mainPlayer.m_nDestX = parseInt(strExtends1);
//                                 Game.mainPlayer.m_nDestY = parseInt(strExtends2);

//                                 if (!gamemap.getme().findAPath(gamemap.getme().m_nMapID, nMapid, parseInt(strExtends1), parseInt(strExtends2))) {
//                                     nMapid = parseInt(maps[0]);
//                                     Game.mainPlayer.m_nDestMap = nMapid;
//                                     Game.mainPlayer.m_nDestX = parseInt(strExtends1);
//                                     Game.mainPlayer.m_nDestY = parseInt(strExtends2);
//                                     if (!gamemap.getme().findAPath(gamemap.getme().m_nMapID, nMapid, parseInt(strExtends1), parseInt(strExtends2))) {

//                                         strSend = nMapid + "~" + strExtends1 + "~" + strExtends2 + "~" + "\"" + str.replace("'", "") + "\"";
//                                         LuaScript.sendLuaPack('xfxmove', strSend, 1, false, false);
//                                     }
//                                 }


//                             }
//                         }
//                         if (m_cParseArray.length >= 5) {
//                             strExtends3 = m_cParseArray[4];
//                             if (strExtends3 == null)
//                                 strExtends3 = "";
//                         }

//                         if (m_cParseArray.length >= 6) {
//                             strExtends4 = m_cParseArray[5];
//                             if (strExtends4 == null)
//                                 strExtends4 = "";
//                         }

//                         Game.mainPlayer.m_sFindMonster.clear();
//                         if (strExtends3 != "" && strExtends3) {
//                             var findmon: Array = strExtends3.split(",");
//                             for each (var sName: String in findmon){
//                                 Game.mainPlayer.m_sFindMonster.put(sName, sName);
//                             }

//                             var target: BaseCreature = CreatureManager.GetNearByTarget(500);
//                             if (!target) {
//                                 //									Game.mainPlayer.AutoOnHorse();
//                             }
//                             Game.mainPlayer.m_boAutoAttack = true;
//                         } else {
//                             //								Game.mainPlayer.AutoOnHorse();
//                         }


//                         if (strExtends4 != "" && strExtends4) {
//                             var pickitem: Array = strExtends4.split(",");
//                             for each (sName in pickitem){
//                                 //									Game.mainPlayer.m_sPickItem.put(sName,sName);
//                             }

// //								Game.mainPlayer.RefreshMapItem();
// 							}

 
//                         //						trace(m_cParseArray[0]+":"+"MapId:"+m_cParseArray[1]+" "+"MapX:"+m_cParseArray[2]+"  MapY:"+m_cParseArray[3]+" NpcName:"+m_cParseArray[4]);

//                     } break;
//                 case 'favorites': {
//                     //							ExternalInterface.call("window.external.AddFavorite",main.szMainUrl,"传奇无双");
//                     //							ExternalInterface.call("window.external.AddFavorite",main.szFavoriteUrl,"传奇无双");
//                 } break;
//                 case 'expcopy': {
//                     LuaScript.sendLuaPack("JingYanFuBen_DaKai");
//                 } break;
//                 case 'guildboss': {
//                     //							if(main.MainPlayer.m_nGuildID != 0){
//                     //								guildDialog.getMe().OpenAnyDialog(7);
//                     //							}else{
//                     //								main.setServerGlobalStringMsg("您尚未加入行会!",6,null);
//                     //							}	
//                 } break;
//                 case 'walkto': {
//                     var npa: Array = strExtends.split(',');
//                     Game.mainPlayer.walkto(0, 0);
//                 } break;
//                 case 'returnstr': {
//                     var upmsg: stQuestClientDataEncoder = new stQuestClientDataEncoder();
//                     upmsg.SetValue('dwClientType', 0);
//                     upmsg.setString(m_cParseArray[1].toString());
//                     upmsg.send();
//                     upmsg.Clear();
//                     upmsg = null;
//                 } break;
//                 case 'sp': {  //物品属性
//                     //							var getitemmsg:stCretGetChatItemMsgEncoder = new stCretGetChatItemMsgEncoder();
//                     //							getitemmsg.SetValue('i64ItemId',Bases.ReadStrInt642(strExtends));
//                     //							getitemmsg.SetValue('dwOnlyID',parseInt(m_cParseArray[2]));
//                     //							if(m_cParseArray[2] == null){
//                     //								getitemmsg.SetValue('btType',1);
//                     //							}else{
//                     //								getitemmsg.SetValue('btType',0);
//                     //							}
//                     //
//                     //							getitemmsg.send();
//                     //							getitemmsg.Clear();
//                     //							getitemmsg = null;
//                 } break;
//                 case 'buyitem': {	//购买物品发包
//                     //							var items:Array = strExtends.split(',');
//                     //							shopdialog.getMe().sendBuyItemCmd(parseInt(items[0]),items.length>1?parseInt(items[1]):0);
//                 } break;

//                 case 'buymallitem': { //商城购买物品
//                     //							var pl:mallstorepanel = 	mallstoredialog.getMe().findItem(parseInt(strExtends),2);
//                     //							if(pl){
//                     //								mallstoredialog_buy.getMe().setItem(pl.getItemId(),pl.getPrice(),pl.getCostType(),pl.getTabType(),pl.getMaxCount());
//                     //								if(parseInt(m_cParseArray[2])>0){
//                     //									mallstoredialog_buy.getMe().setBuyCount(parseInt(m_cParseArray[2]));
//                     //								}
//                     //
//                     //								mallstoredialog_buy.getMe().changeOwner(null);
//                     //								mallstoredialog_buy.getMe().setVisible(true);
//                     //							}

//                 } break;
//                 case "openworldmap":
//                     //						bigmapdialog.getMe().OtheropenWorldmap();
//                     break;
//                 case "userinternal":

//                     break;
//                 case 'newdialog': {
//                     showDialog(m_cParseArray);
//                 } break;

//                 case 'controlnotice':
//                     {
//                         //controlnotice.OnScriptMsg(m_cParseArray);
//                     } break;
//                 case 'xfxreturn': {
//                     var str1: String = "";
//                     for (i = 1; i < m_cParseArray.length; i++) {
//                         str1 = str1 + m_cParseArray[i] + "`";
//                     }
//                     control.getme().fly_xfy = true;
//                     var sdie: String = scriptstr.substr(10);//10是xfxreturn`
//                     script(sdie);
//                     if (xfxmoveCbs != "") {
//                         LuaScript.script(xfxmoveCbs);
//                         xfxmoveCbs = "";
//                     }
//                     //							gamemap.getme().testNpcPoint();
//                     //							npcdialog.m_stSmallTarget = str1;
//                 } break;
//                 case 'guildwar':
//                     //						main.MainPlayer.m_GuildWarMap.clear();			
//                     //						if(strExtends && strExtends!=""){
//                     //							var guilds:Array = strExtends.split(',');
//                     //							for each(var s:String in guilds){
//                     //								var a2:Array = s.split(":");
//                     //								main.MainPlayer.m_GuildWarMap.put(parseInt(a2[1]),parseInt(a2[0]));
//                     //							}
//                     //
//                     //							for each(p in main.g_CreatureHash.values()){
//                     //								p.changeNameColor();
//                     //							}
//                     //
//                     //						}
//                     break;
//                 case 'guildowner':
//                     Game.mainPlayer.m_nGuildOwner = parseInt(strExtends);
//                     for each (var player: Player in CreatureManager.NowProcessPlayer.getContent()){
//                         if (player.getGuildID() == Game.mainPlayer.m_nGuildOwner) {
//                             player.changeGuildName();
//                         }
//                     }
//                     break;
//                 case 'tipmsg'://boss公告
//                     //						var temDialog:K3Dialog = null
//                     //						if(m_cParseArray.length>3){
//                     //							temDialog=K3DialogManager.creategetmeDialog(m_cParseArray[3]);
//                     //						}
//                     //						main.setServerGlobalStringMsg(m_cParseArray[1],m_cParseArray[2],tempDialog);
//                     break;
//                 default: {
//                     m_cParseArray.length = 0;
//                     m_cParseArray = null;
//                     return false;
//                 } break;
//             }

//         }
//         m_cParseArray.length = 0;
//         m_cParseArray = null;
//         return true;
//     }





//     public static Do_delayUIMsg(): void {
//         while (UIMsg_delayLst.length > 0) {
//             var mso: Object = UIMsg_delayLst.shift();
//             if (mso) {
//                 script(mso["str"], mso["c"], mso["f"], mso["n"]);
//             }
//         }
//     }

//     public static clearData(): void {
//         UIMsg_delayLst.length = 0;
//     }

//     public static checkInitedDialogs(): void {
//         var dialog: K3Dialog;
//         var cretTime: number, dname: String;
//         for each(var dInfo: Object in K3Dialog.luaInitedDialogs.getContent()){
//             cretTime = dInfo.cretTime;
//             dialog = dInfo.dialog;
//             if (cretTime - getTimer() > 3000) {
//                 if (dialog && !dialog.visible && !dialog.isloading && !dialog.parent) {
//                     if (dialog != control.instance && dialog != loadmap.instance && dialog != npcdialog.instance) {
//                         K3Dialog.luaInitedDialogs.remove(dname);
//                         dialog.Close();
//                         //							trace("---------------------bad inited",dname);
//                     }
//                 }
//             }
//         }


//         for each(dInfo in K3Dialog.dialogs.getContent()){
//             cretTime = dInfo.cretTime;
//             dialog = dInfo.dialog;
//             dname = dInfo.name;
//             if(dialog == numberernalDialog.instance) {
//                 continue;
//             }
// 				if(dialog == FightSoulDialog.instance) {
//                 continue;
//             }
// 				if(dialog == RebirthDialog.instance) {
//                 continue;
//             }
// 				if(dialog == HeroRebirthDialog.instance) {
//                 continue;
//             }
// 				if(dialog == HeroTalentDialog.instance) {
//                 continue;
//             }
// 				if(dialog.DialogName == "alertdialog") {
//                 continue;
//             }
// 				if(dialog.DialogName == "NoticeLabel") {

//                 continue;
//             }
// 				if(dialog==New_hero.instance) {
//                 continue;
//             }
// 				if(dialog==bag.instance) {
//                 continue;
//             }
// 				if(getTimer() - cretTime > 10000 && (dialog && !dialog.visible && !dialog.isloading && dialog != control.instance && dialog != chatDialog.instance && dialog != npcdialog.instance)) {
//                 dialog.Close();
//             }
//         }
// 		}			
// }
// }