/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_DailyPanel extends ui.fuBen.FuBen_DailyPanelUI {
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
			this.init_res()
			this.init_XinMo();
			this.addEvent();
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
				pkt.setString(ProtoCmd.FB_GeRenBoss_Enter, [this.curSelectIndex]);
				lcp.send(pkt);
			});
		}
		/**
		 * 资源界面
		 */
		public init_res(): void {
			let pkt = new ProtoCmd.QuestClientData();
			//拉取副本索引
			pkt.setString(ProtoCmd.FB_CLFubenStatus, null, null, this, (jsonData: { any }) => {
				for (let i = 1; jsonData[i]; ++i) {
					let data = jsonData[i];
					this.vbox_res.addChild(new view.fuBen.FuBenDailySourceItem().setData(data))
				}
			})
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
	}
}