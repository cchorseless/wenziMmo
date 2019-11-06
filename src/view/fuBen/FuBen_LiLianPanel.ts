/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_LiLianPanel extends ui.fuBen.FuBen_LiLianPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.tab_top.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_top.selectedIndex = index;
			}, null, false);
			this.panel_0.vScrollBarSkin = '';
			this.vbox_0['sortItem'] = (items) => { };
			this.panel_1.vScrollBarSkin = '';
			this.vbox_1['sortItem'] = (items) => { };
			this.panel_yinkui.hScrollBarSkin = '';
			this.hbox_yinkui['sortItem'] = (items) => { };
			this.panel_world.hScrollBarSkin = '';
			this.hbox_world['sortItem'] = (items) => { };
			this.addEvent();
			this.init_yeWai();
			this.init_bossHome();
			this.init_yinKuiMen();
			this.init_killXieDi();
		}
		public addEvent(): void {
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, () => {
			PanelManage.openJuQingModePanel()
			});
			EventManage.onWithEffect(this.btn_changeMode, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});
			EventManage.onWithEffect(this.btn_daily, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenDailyPanel();
			});
			EventManage.onWithEffect(this.btn_juQing, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenMainPanel();
			});
			EventManage.onWithEffect(this.btn_liLian, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenLiLianPanel();
			});
			EventManage.onWithEffect(this.btn_xianShi, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenXianShiPanel();
			});
		}
		/**
		  *缉盗悬赏(野外BOSS)
		  */
		public init_yeWai(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FB_YeWaiBoss_Open, null, null, this, (jsonData: { any }) => {
				let keys = Object.keys(jsonData);
				this.vbox_0.removeChildren();
				let ui_jidao = null;
				for (let i = 1; jsonData[i]; i++) {
					let num = i % 3;
					let data = jsonData[i];
					if (num == 1) {
						ui_jidao = null;
						ui_jidao = new view.fuBen.FuBenLiLianV0Item()
						this.vbox_0.addChild(ui_jidao);
						ui_jidao.setData(num,data);
					}
					if (num == 2) {
						ui_jidao.setData(num,data)
					}
					if (num == 0) {
						ui_jidao.setData(num,data)
						ui_jidao = null;
					}


				}
				
			})
			lcp.send(pkt);
		}
		/**
		  * 天山血狱界面（boss之家）
		  */
		public init_bossHome(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FB_WorldBoss_Open, null, null, this, (jsonData) => {
				console.log('=====>天山血狱',jsonData)
				let keys = Object.keys(jsonData);
				let i=0;
				for (let key of keys) {
					i=i+1;
					let data: ProtoCmd.itf_FB_XueYuInfo = jsonData[key];
					this.vbox_1.addChild(new view.fuBen.FuBenLiLianV1Item().setData(key, data,i));
				}

			})
			lcp.send(pkt);
		}

		/**
		  * 阴葵门界面(锁妖塔)
		  */
		public init_yinKuiMen(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FB_BossSuoYaoTa, null, null, this, (jsonData: { any }) => {
				//进入条件
				this.lbl_lvl.text = '' + jsonData[1].zslvl;
				//BOSS名称
				let name = SheetConfig.mydb_monster_tbl.getInstance(null).NAME('' + jsonData[1].bossid);
				this.lbl_bossName.text = '' + name;
				//BOSS半身像
				let img = SheetConfig.mydb_monster_tbl.getInstance(null).STYLE_DRAWING('' + jsonData[1].bossid);
				this.img_yinkuiBoss.skin = 'image/common/npc/npc_half_' + img + '.png';
				//BOSS描述
				let detail = SheetConfig.mydb_monster_tbl.getInstance(null).MONSTERDES('' + jsonData[1].bossid);
				this.lbl_detail.text = '' + detail;
				//掉落奖励
				let jiangli = SheetConfig.mydb_monster_tbl.getInstance(null).DROPPED_ARTICLES('' + jsonData[1].bossid);
				this.hbox_yinkui.removeChildren();
				for (let i = 0; jiangli[i]; i++) {
					let _itemUI = new view.compart.DaoJuWithNameItem();
					let itemInfo = new ProtoCmd.ItemBase();
					itemInfo.dwBaseID = jiangli[i];
					_itemUI.setData(itemInfo);
					this.hbox_yinkui.addChild(_itemUI)
				}
				//BOSS地图
				let map = SheetConfig.mydb_mapinfo_tbl.getInstance(null).NAME('' + jsonData[1].mapid);
				this.lbl_map.text = '' + map;
				//Boss刷新时间
				if (jsonData[1].time == 0) {
					this.lbl_time.text = '已复活';
				}
				else {
					let time = TimeUtils.getFormatBySecond(jsonData[1].time, 1)
					this.lbl_time.text = '' + time;
				}
			})
			lcp.send(pkt);
		}
		/**
		  * 诛杀邪帝界面(世界BOSS)
		  */
		public init_killXieDi(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FB_WorldBossPanel, null, null, this, (jsonData: any) => {

				//进入条件
				this.lbl_worldLvl.text = '' + jsonData.openlvl;
				//BOSS名称
				let name = SheetConfig.mydb_monster_tbl.getInstance(null).NAME('' + jsonData.monsterid).split("_");
				this.lbl_worldName.text = '' + name[0];
				//BOSS半身像
				let img = SheetConfig.mydb_monster_tbl.getInstance(null).STYLE_DRAWING('' + jsonData.monsterid);
				this.img_worldBoss.skin = 'image/common/npc/npc_half_' + img + '.png';
				//BOSS血量
				let HP = SheetConfig.mydb_monster_tbl.getInstance(null).MAX_HP('' + jsonData.monsterid);
				this.lbl_HP.text = '' + HP;
				//BOSS描述
				let detail = SheetConfig.mydb_monster_tbl.getInstance(null).MONSTERDES('' + jsonData.monsterid);
				this.lbl_worldDetail.text = '' + detail;
				//活动时间
				let starMinute = jsonData.starttime % 60;
				let startHour = (jsonData.starttime - starMinute) / 60;
				let endMinute = jsonData.endtime % 60;
				let star = ':';
				let end = ':';
				if (starMinute < 10) {
					star = ':0'
				}
				if (endMinute < 10) {
					end = ':0'
				}
				let endtHour = (jsonData.endtime - endMinute) / 60;
				this.lbl_worldTime.text = startHour + star + starMinute + '-' + endtHour + end + endMinute;
				//掉落奖励

				this.hbox_world.removeChildren();
				for (let i = 1; jsonData.reward[i]; i++) {
					let _itemUI = new view.compart.DaoJuWithNameItem();
					let itemInfo = new ProtoCmd.ItemBase();
					itemInfo.dwBaseID = jsonData.reward[i].index;
					itemInfo.dwCount = jsonData.reward[i].num;
					_itemUI.setData(itemInfo);
					this.hbox_world.addChild(_itemUI)
				}
			})
			lcp.send(pkt);
		}
	}
}