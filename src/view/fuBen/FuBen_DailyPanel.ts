/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_DailyPanel extends ui.fuBen.FuBen_DailyPanelUI {
		public bossRoomId;
		constructor() {
			super();
		}
		public setData(): void {
			this.tab_0.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_0.selectedIndex = index;
			}, null, false);
			this.panel_boss.hScrollBarSkin = '';
			this.hbox_boss['sortItem'] = (items) => { };
			this.btn_jina.selected = true;
			this.init_JiDao();
			this.addEvent();
		}
		public Dispose() {
			GameApp.LListener.offCaller(ProtoCmd.FB_CaiLiaoFuBen_OneKey, this);
			PopUpManager.Dispose(this)
		}

		public addEvent(): void {
			//返回
			this.btn_back.on(Laya.UIEvent.CLICK, this, function () {
				PopUpManager.checkPanel(this);
			})
			//剧情
			this.btn_juqing.on(Laya.UIEvent.CLICK, this, function () {
				PanelManage.openFuBenMainPanel('main')
			})
			//资源副本
			this.btn_res.on(Laya.UIEvent.CLICK, this, function () {
				PanelManage.openFuBenResPanel()
			})
			//心魔
			this.btn_xinmo.on(Laya.UIEvent.CLICK, this, function () {
				PanelManage.openFuBenXinMoPanel()
			})
			//缉拿
			this.btn_jina.on(Laya.UIEvent.CLICK, this, function () {
				return;
			})
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

			GameApp.LListener.on(ProtoCmd.FB_CaiLiaoFuBen_OneKey, this, function (data) {
				let o = new FuBen_SaoDang_Reward_Dialog();
				o.setData(data.index, data.beishu);
				o.popup()

			})
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