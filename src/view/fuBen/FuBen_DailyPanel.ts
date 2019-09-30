/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_DailyPanel extends ui.fuBen.FuBen_DailyPanelUI {
		constructor() {
			super();
		}


		public setData(): void {
			this.tab_0.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_0.selectedIndex = index;
			}, null, false);
			this.panel_xinMo.hScrollBarSkin = '';
			this.panel_xinMo1.hScrollBarSkin = '';
			this.panel_res.vScrollBarSkin = '';
			this.init_res()
			this.init_XinMo();
			this.addEvent();
		}

		public addEvent(): void {
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, () => {
				PopUpManager.showPanel(PanelManage.JuQingMode);
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
		 * 资源界面
		 */
		public init_res(): void {
			let pkt = new ProtoCmd.QuestClientData();
			//拉取副本索引
			pkt.setString(ProtoCmd.FB_CLFubenStatus, null, null, this, (jsonData: { any }) => {
				for (let i = 1; jsonData[i]; ++i) {
					let data = jsonData[i];
					this.vbox_res.addChild(new view.compart.FuBenDailySourceItem().setData(data))
				}
			})
			lcp.send(pkt);
		}
		/**
		 * 心魔界面
		 */
		public init_XinMo(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FB_GeRenBoss_Open, null, null, this, (jsonData: { any }) => {
				let boss: ProtoCmd.itf_FB_XinMoInfo = jsonData[1];
				//boss[1]名称
				let bossName = SheetConfig.mydb_monster_tbl.getInstance(null).NAME('' + boss.monsterid);
				let name = bossName.split('_')
				this.lbl_bossName.text = '' + name[0];
				//BOSS[1]在造型图上名称
				this.lbl_bossTitle.text = '' + name[0];
				//boss[1]等级
				this.lbl_bossLvl.text = '' + SheetConfig.mydb_monster_tbl.getInstance(null).LEVEL('' + boss.monsterid);
				//boss[1]造型
				this.img_boss.skin = 'image/common/npc/npc_half_' + SheetConfig.mydb_monster_tbl.getInstance(null).STYLE_DRAWING('' + boss.monsterid) + '.png';
				//boss[1]挑战等级
				this.lbl_challengeLvl.text = '' + boss.minlv;
				//boss[1]坐标
				this.lbl_position.text = '(' + boss.x + ',' + boss.y + ')';
				//boss[1]掉落奖励
				let bossGet = SheetConfig.mydb_monster_tbl.getInstance(null).DROPPED_ARTICLES('' + boss.monsterid);
				for (let i = 0; bossGet[i]; i++) {
					this.hbox_xinMo1.addChild(new view.compart.DaoJuItem().fubenDaily(bossGet[i]))
				}

				for (let i = 1; jsonData[i]; ++i) {
					let boss: ProtoCmd.itf_FB_XinMoInfo = jsonData[i];
					//boss名称
					let bossName = SheetConfig.mydb_monster_tbl.getInstance(null).NAME('' + boss.monsterid);
					let name = bossName.split('_')
					//boss等级
					let bossLvl = '' + SheetConfig.mydb_monster_tbl.getInstance(null).LEVEL('' + boss.monsterid);
					//boss造型
					let img_bossID = SheetConfig.mydb_monster_tbl.getInstance(null).STYLE_DRAWING('' + boss.monsterid);
					//boss掉落奖励
					let bossGet = SheetConfig.mydb_monster_tbl.getInstance(null).DROPPED_ARTICLES('' + boss.monsterid);
					
					this.hbox_xinMo.addChild(new view.compart.FuBenDailyXinMoItem().setData(boss, name, bossLvl, img_bossID, bossGet))
					console.log('=============>心魔心魔心魔',bossGet)

				}
			});
			lcp.send(pkt);
		}
	}
}