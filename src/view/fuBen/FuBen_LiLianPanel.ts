/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_LiLianPanel extends ui.fuBen.FuBen_LiLianPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.btn_liLian.selected = true;
			this.tab_top.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_top.selectedIndex = index;
			}, null, false);
			this.panel_boss.hScrollBarSkin = '';
			this.hbox_boss['sortItem'] = (items) => { };
			this.panel_jiangli.hScrollBarSkin = '';
			this.hbox_jiangli['sortItem'] = (items) => { };
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
				this.hbox_boss.removeChildren();
				for (let key of keys) {
					let data = jsonData[key];
					this.hbox_boss.addChild(new view.fuBen.FuBenDailyXinMoItem().init_liLian(data, key));
				}
				let json = jsonData[1]
				this.update_yeWai(json, 1);
			})
			lcp.send(pkt);
		}
		/**
	    *更新缉盗悬赏(野外BOSS)
	    */
		public update_yeWai(data: ProtoCmd.itf_FB_JiDaoInfo, index): FuBen_LiLianPanel {
			//点击发光效果
			for (let single of this.hbox_boss._childs) {
				single.img_light.visible = false;
			}
			let i = index - 1;
			this.hbox_boss._childs[i].img_light.visible = true;
			//boss名称
			let name = SheetConfig.mydb_monster_tbl.getInstance(null).NAME('' + data.monid).split("_");
			this.lbl_bossTitle.text = '' + name[0];
			//推荐等级
			let lvl = SheetConfig.mydb_monster_tbl.getInstance(null).LEVEL('' + data.monid);
			this.lbl_level.text = '' + lvl;
			//bosss所在地
			let map = SheetConfig.mydb_mapinfo_tbl.getInstance(null).NAME('' + data.mapid);
			this.lbl_pos.text = '' + map;
			//BOSS头像
			let imgH = SheetConfig.mydb_monster_tbl.getInstance(null).HEAD_IMAGE('' + data.monid);
			this.img_boss.skin = 'image/common/npc/npc_half_' + imgH + '.png';
			//boss状态
			if (data.time != 0) {
				let time = TimeUtils.getFormatBySecond(data.time, 1)
				this.lbl_state.text = '' + time;
			} else {
				this.lbl_state.text = '可击杀';
			}
			//BOSS介绍
			let introduce = SheetConfig.mydb_monster_tbl.getInstance(null).MONSTERDES('' + data.monid);
			this.lbl_introduce.text = introduce;
			//掉落奖励
			let jiangli = SheetConfig.mydb_monster_tbl.getInstance(null).DROPPED_ARTICLES('' + data.monid);
			this.hbox_jiangli.removeChildren();
			for (let item of jiangli) {
				let _itemUI = new view.compart.DaoJuItem();
				let itemInfo = new ProtoCmd.ItemBase();
				itemInfo.dwBaseID = item;
				_itemUI.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				this.hbox_jiangli.addChild(_itemUI);
			}
			return this;
		}
		/**
		  * 天山血狱界面（boss之家）
		  */
		public init_bossHome(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FB_WorldBoss_Open, null, null, this, (jsonData) => {
				console.log('=====>天山血狱', jsonData)
				let keys = Object.keys(jsonData);
				let i = 0;
				for (let key of keys) {
					i = i + 1;
					let data: ProtoCmd.itf_FB_XueYuInfo = jsonData[key];
					this.vbox_1.addChild(new view.fuBen.FuBenLiLianV1Item().setData(key, data, i));
				}

			})
			lcp.send(pkt);
		}
	/**
	    *更新天山血狱界面(boss之家)
	    */
		public update_bossHome(): FuBen_LiLianPanel {
			
			return this;
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
					_itemUI.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL);
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
					_itemUI.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL);
					this.hbox_world.addChild(_itemUI)
				}
			})
			lcp.send(pkt);
		}
	}
}