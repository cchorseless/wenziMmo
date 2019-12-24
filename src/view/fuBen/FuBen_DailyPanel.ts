/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_DailyPanel extends ui.fuBen.FuBen_DailyPanelUI {
		public bossRoomId;
		constructor() {
			super();
		}
		public setData(): void {
			this.btn_daily.selected = true;
			this.tab_0.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_0.selectedIndex = index;
			}, null, false);
			this.panel_xinMo.hScrollBarSkin = '';
			this.hbox_xinMo['sortItem'] = (items) => { };
			this.panel_xinMo1.hScrollBarSkin = '';
			this.hbox_xinMo1['sortItem'] = (items) => { };
			this.panel_res.vScrollBarSkin = '';
			this.vbox_res['sortItem'] = (items) => { };
			this.panel_boss.hScrollBarSkin = '';
			this.hbox_boss['sortItem'] = (items) => { };
			this.init_res()
			this.init_XinMo();
			this.init_JiDao();
			this.addEvent();
		}
		public Dispose(){
			GameApp.LListener.offCaller(ProtoCmd.FB_CaiLiaoFuBen_OneKey,this);
			GameApp.LListener.offCaller(ProtoCmd.FB_CLFubenStatus,this);
			PopUpManager.Dispose(this)
		}

		public addEvent(): void {
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, () => {
				FuBen_MainPanel.backPanel()
			});

			EventManage.onWithEffect(this.btn_changeMode, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});

			EventManage.onWithEffect(this.btn_daily, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenDailyPanel();
			});

			EventManage.onWithEffect(this.btn_juQing, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenMainPanel(FuBen_MainPanel.fromStr);
			});

			EventManage.onWithEffect(this.btn_liLian, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenLiLianPanel();
			});

			EventManage.onWithEffect(this.btn_xianShi, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenXianShiPanel();
			});

			// 挑战副本
			EventManage.onWithEffect(this.btn_challenge, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.FB_GeRenBoss_Enter, [this.curSelectIndex])
				lcp.send(pkt);
				// PanelManage.Main.img_bottomPartInfoBg.visible = false;
			});
			EventManage.onWithEffect(this.btn_go, Laya.UIEvent.CLICK, this, () => {
				let pk = new ProtoCmd.QuestClientData().setString(ProtoCmd.MAP_MOVE, [this.bossRoomId, 0], 0, this, function (jsonData) {
					if (jsonData.errorcode == 0) {
						FuBen_MainPanel.backPanel()
						// 清空视野
						GameApp.MainPlayer.clearViewObj();
						// 更新房间数据
						GameApp.MainPlayer.roomId = jsonData.curmapid;
						// 上下左右房间的信息
						GameApp.GameEngine.smallMapData = jsonData.dstmap;
						console.log('进入了' + jsonData.curmapid);
						// 更新主场景
						let mapType = SheetConfig.mapRoomSheet.getInstance(null).ROOMTYPE('' + jsonData.curmapid);
						GameApp.SceneManager.updateUiScene(mapType);
						// 更新场景信息
						this.updateSceneView('进入了' + jsonData.curmapid);

					}
				})
				lcp.send(pk);
			});
			GameApp.LListener.on(ProtoCmd.FB_CLFubenStatus, this, function (jsonData) {
				this.vbox_res.removeChildren();
				for (let i = 1; jsonData[i]; ++i) {
					let data = jsonData[i];
					this.vbox_res.addChild(new view.fuBen.FuBenDailySourceItem().setData(data))
				}
			})
			GameApp.LListener.on(ProtoCmd.FB_CaiLiaoFuBen_OneKey, this, function (data) {
				let o = new FuBen_SaoDang_Reward_Dialog();
				o.setData(data.index, data.beishu);
				o.popup()
				
			})
		}
		/**
		 * 资源界面
		 */
		public init_res(): void {
			let pkt = new ProtoCmd.QuestClientData();
			//拉取副本索引
			pkt.setString(ProtoCmd.FB_CLFubenStatus, null)
			lcp.send(pkt);
		}
		/**
		 * 心魔界面
		 */
		public json;
		public init_XinMo(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FB_GeRenBoss_Open, null, null, this, (jsonData) => {
				console.log(jsonData);
				let keys = Object.keys(jsonData);
				for (let key of keys) {
					let data: ProtoCmd.itf_FB_XinMoInfo = jsonData[key];
					// 索引
					data.index = parseInt(key);
					//是否展示为1时
					if (data.show == 1) {
						this.hbox_xinMo.addChild(new view.fuBen.FuBenDailyXinMoItem().setData(data));
					}
				}
				this.json = jsonData[1]
				this.update_XinMo(this.json);
			});
			lcp.send(pkt);
		}
		public curSelectIndex = 1;
		public update_XinMo(data: ProtoCmd.itf_FB_XinMoInfo): FuBen_DailyPanel {
			//点击发光效果
			for (let single of this.hbox_xinMo._childs) {
				single.img_light.visible = false;
			}
			let i = data.index - 1;
			this.hbox_xinMo._childs[i].img_light.visible = true;
			this.curSelectIndex = data.index;
			//boss[1]名称
			let name = SheetConfig.mydb_monster_tbl.getInstance(null).NAME('' + data.monsterid).split("_");
			this.lbl_bossName.text = '' + name[0];
			//BOSS在造型图上名称
			this.lbl_bossTitle.text = '' + name[0];
			//boss等级
			let lvl = SheetConfig.mydb_monster_tbl.getInstance(null).LEVEL('' + data.monsterid);
			this.lbl_bossLvl.text = '' + lvl;
			//boss造型
			let imgItem = SheetConfig.mydb_monster_tbl.getInstance(null).STYLE_DRAWING('' + data.monsterid);
			this.img_boss.skin = 'image/common/npc/npc_half_' + imgItem + '.png';
			//BOSS描述
			let detail = SheetConfig.mydb_monster_tbl.getInstance(null).MONSTERDES('' + data.monsterid);
			this.lbl_introduce.text = '' + detail;
			//boss挑战等级
			this.lbl_challengeLvl.text = '' + data.minlv;
			//boss挑战次数
			this.html_challengeNum.style.fontFamily = 'STKaiti';
			this.html_challengeNum.style.fontSize = 23;
			this.html_challengeNum.innerHTML = "<span style='color:#63491a'>挑战次数：</span>"
				+ "<span style='color:#a33330'>" + data.flag + "</span>"
				+ "<span style='color:#63491a'>" + "/" + data.maxcnt + "</span>";
			//boss坐标
			this.lbl_position.text = '(' + data.x + ',' + data.y + ')';
			// boss掉落奖励
			let jiangli = SheetConfig.mydb_monster_tbl.getInstance(null).DROPPED_ARTICLES('' + data.monsterid);
			this.hbox_xinMo1.removeChildren();
			for (let i = 0; jiangli[i]; i++) {
				let _itemUI = new view.compart.DaoJuWithNameItem();
				let itemInfo = new ProtoCmd.ItemBase();
				itemInfo.dwBaseID = jiangli[i];
				_itemUI.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				this.hbox_xinMo1.addChild(_itemUI)
			}

			return this;
		}
		public init_JiDao(): void {
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
		public update_yeWai(data: ProtoCmd.itf_FB_JiDaoInfo, index) {
			//点击发光效果
			for (let single of this.hbox_boss._childs) {
				single.img_light.visible = false;
			}
			let i = index - 1;
			this.hbox_boss._childs[i].img_light.visible = true;
			//boss名称
			let name = SheetConfig.mydb_monster_tbl.getInstance(null).NAME('' + data.monid).split("_");
			this.lab_name.text = '' + name[0];
			//推荐等级
			let lvl = SheetConfig.mydb_monster_tbl.getInstance(null).LEVEL('' + data.monid);
			this.lab_lv.text = '' + lvl;
			//bosss所在地
			let map = SheetConfig.mydb_mapinfo_tbl.getInstance(null).NAME('' + data.mapid);
			this.lab_location.text = '' + map;
			//BOSS头像
			let imgH = SheetConfig.mydb_monster_tbl.getInstance(null).HEAD_IMAGE('' + data.monid);
			this.img_icon.skin = 'image/common/npc/npc_half_' + imgH + '.png';
			//boss状态
			if (data.time != 0) {
				let time = TimeUtils.getFormatBySecond(data.time, 1)
				this.lab_status.text = '' + time;
			} else {
				this.lab_status.text = '可击杀';
			}
			this.bossRoomId = SheetConfig.mydb_monster_tbl.getInstance(null).TRANSFER_ROOM('' + data.monid);
			//BOSS介绍
			let introduce = SheetConfig.mydb_monster_tbl.getInstance(null).MONSTERDES('' + data.monid);
			this.lab_detail.text = introduce;
			//掉落奖励
			let jiangli = SheetConfig.mydb_monster_tbl.getInstance(null).DROPPED_ARTICLES('' + data.monid);
			this.hbox_reward.removeChildren();
			for (let item of jiangli) {
				let _itemUI = new view.compart.DaoJuItem();
				let itemInfo = new ProtoCmd.ItemBase();
				itemInfo.dwBaseID = item;
				_itemUI.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				this.hbox_reward.addChild(_itemUI);
			}
		}
	}
}