/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_JiNaPanel extends ui.fuBen.FuBen_JiNaPanelUI {
		constructor() {
			super();
		}
		//boss所在房间
		public bossRoomId;
		//所有boss信息
		public bossData;
		public beginPos;
		public finalPos;
		public index = 0;
		public maxPage;
		public setData(): void {
			this.btn_jina.selected = true;
			this.panel_item.hScrollBarSkin = '';
			this.init_JiDao();
			this.addEvent();
			this.img_left.disabled=true;
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
				PanelManage.openFuBenResPanel();
			})
			//心魔
			this.btn_xinmo.on(Laya.UIEvent.CLICK, this, function () {
				PanelManage.openFuBenXinMoPanel();
			})
			//缉拿
			this.btn_jina.on(Laya.UIEvent.CLICK, this, function () {
				return;
			})
			this.panel_boss.on(Laya.Event.MOUSE_DOWN, this,(ev)=>{
				this.beginPos = ev.stageX;
			})
			this.panel_boss.on(Laya.Event.MOUSE_MOVE, this,(ev)=>{
				if (Math.abs(ev.stageX - this.beginPos) > 50) {
					this.finalPos = ev.stageX;
					this.init_slideEvent();
				}
			})
			EventManage.onWithEffect(this.btn_go, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.MAP_MOVE, [this.bossRoomId, 0], 0, this, function (jsonData) {
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
				lcp.send(pkt);
			});
		}
		public init_JiDao(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FB_YeWaiBoss_Open, null, null, this, (jsonData: { [v: string]: ProtoCmd.itf_FB_JiDaoInfo }) => {
				let bossArray = [];
				for (let i in jsonData) {
					let data = jsonData[i];
					let battle = SheetConfig.mydb_monster_tbl.getInstance(null).MONSTER_COMBAT('' + data.monid);
					bossArray.push({ data: data, battle: battle });
				}
				//根據战力把boss信息从小到大排序
				function compare(property) {
					return function (a, b) {
						var value1 = a[property];
						var value2 = b[property];
						return value1 - value2;
					}
				}
				bossArray = bossArray.sort(compare('battle'))
				this.bossData = bossArray;
				this.maxPage = Math.ceil(bossArray.length / 8);
				this.box_boss.removeChildren();
				for (let i in this.bossData) {
					let num = parseInt(i) + 1;
					let ui_boss = new view.fuBen.FuBen_JiNaBossItem();
					ui_boss.setData(this.bossData[i], parseInt(i));
					ui_boss.x = (Math.ceil(num / 8) - 1) * (this.panel_boss.width + 5) + parseInt(i) % 4 * (ui_boss.width - 18);
					let index = parseInt(i) % 8;
					if (index < 4) {
						ui_boss.y = 0
					} else {
						ui_boss.y = ui_boss.height - 20;
					}
					this.box_boss.addChild(ui_boss);
				}
				this.update_yeWai(0);
			})
			lcp.send(pkt);
		}
		public init_slideEvent(): void {
			let num = this.beginPos - this.finalPos;
			if (num > 0) {
				if (this.index < (this.maxPage - 1)) {
					this.index += 1;
				}
			} else {
				if (this.index > 0) {
					this.index -= 1;
				}
			}
			if (this.index == (this.maxPage - 1)) {
				this.img_right.disabled = true;
			} else {
				this.img_right.disabled = false;
			}
			if (this.index == 0) {
				this.img_left.disabled = true;
			} else {
				this.img_left.disabled = false;
			}
			Laya.Tween.to(this.box_boss,{x:(-this.index * this.panel_boss.width)},500)
			this.beginPos = this.finalPos = undefined;
			let dangqian = this.index * 8;
			this.update_yeWai(dangqian)
		}
		/**
	 *更新缉盗悬赏(野外BOSS)
	 */
		public update_yeWai(num) {
			let bossInfo: { data: ProtoCmd.itf_FB_JiDaoInfo, battle: number };
			// 点击发光效果
			for (let index in this.box_boss._childs) {
				let item = this.box_boss._childs[index];
				if (parseInt(index) == num) {
					item.btn_boss.selected = item.img_light.visible = true;
					bossInfo = item.data;
				} else {
					item.btn_boss.selected = item.img_light.visible = false;
				}
			}
			//BOSS介绍
			this.lbl_des.text = SheetConfig.mydb_monster_tbl.getInstance(null).MONSTERDES('' + bossInfo.data.monid);
			//BOSS半身像
			let bossicon = SheetConfig.mydb_monster_tbl.getInstance(null).STYLE_DRAWING('' + bossInfo.data.monid);
			this.img_boss.skin = 'image/common/npc/npc_half_' + bossicon + '.png';
			//boss名称
			let name = SheetConfig.mydb_monster_tbl.getInstance(null).NAME('' + bossInfo.data.monid).split("_");
			this.lbl_name.text = '' + name[0];
			//战力
			this.lbl_battle.text = '' + SheetConfig.mydb_monster_tbl.getInstance(null).MONSTER_COMBAT('' + bossInfo.data.monid)
			//推荐等级
			let lvl = SheetConfig.mydb_monster_tbl.getInstance(null).LEVEL('' + bossInfo.data.monid);
			this.lbl_lvl.text = '' + lvl;
			//掉落奖励
			let jiangli = SheetConfig.mydb_monster_tbl.getInstance(null).DROPPED_ARTICLES('' + bossInfo.data.monid);
			this.panel_item.removeChildren();
			for (let index in jiangli) {
				let _itemUI = new view.compart.DaoJuItem();
				let itemInfo = new ProtoCmd.ItemBase();
				itemInfo.dwBaseID = jiangli[index];
				_itemUI.scaleX = _itemUI.scaleY = 0.9;
				_itemUI.x = parseInt(index) % 4 * (_itemUI.width + 10);
				if (jiangli.length > 4) {
					_itemUI.y = Math.floor(parseInt(index) / 4) * (_itemUI.height + 5);
				} else {
					_itemUI.y = (this.panel_item.height - _itemUI.height) / 2;
				}
				_itemUI.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				this.panel_item.addChild(_itemUI);
			}
			//boss状态
			if (bossInfo.data.time != 0) {
				this.lbl_time.color = '#c43939';
				this.lbl_time.text = '' + bossInfo.data.time;
				GameUtil.timeCountDownByS(bossInfo.data.time, this.lbl_time)
			} else {
				this.lbl_time.color = '#39ad32';
				this.lbl_time.text = '可击杀';
			}
			this.bossRoomId = SheetConfig.mydb_monster_tbl.getInstance(null).TRANSFER_ROOM('' + bossInfo.data.monid);
		}
	}
}