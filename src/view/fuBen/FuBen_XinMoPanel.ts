/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_XinMoPanel extends ui.fuBen.FuBen_XinMoPanelUI {
		constructor() {
			super();
		}
		public bossData;
		public curSelectIndex = 1;
		public setData(): void {
			this.panel_item.hScrollBarSkin = '';
			this.hbox_drop['sortItem'] = (items) => { };
			this.addEvent();
			this.init_XinMo();
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
				return;
			})
			//日常
			this.btn_jina.on(Laya.UIEvent.CLICK, this, function () {
				PanelManage.openFuBenDailyPanel();
			})
			for (let i = 1; i <= 6; i++) {
				this['img_light' + i].visible = false;
				this.img_light1.visible = true;
				this['btn_boss' + i].on(Laya.UIEvent.CLICK, this, () => {
					for (let j = 1; j <= 6; j++) {
						this['btn_boss' + j].selected = this['img_light' + j].visible = false;
					}
					this['btn_boss' + i].selected = !this['btn_boss' + i].selected;
					this['img_light' + i].visible = this['btn_boss' + i].selected;
					this.init_changeXinMo(i);
				})
			}
			EventManage.onWithEffect(this.btn_see, Laya.UIEvent.CLICK, this, () => {
				new view.fuBen.FuBen_XinMoInfoDialog().setData(this.bossData, this.curSelectIndex).popup();
			})
			//战斗
			EventManage.onWithEffect(this.btn_battle, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.FB_GeRenBoss_Enter, [this.curSelectIndex])
				lcp.send(pkt);
			});
		}
		/**
	  * 心魔界面
	  */
		public init_XinMo(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FB_GeRenBoss_Open, null, null, this, (jsonData) => {
				this.bossData = jsonData;
				this.init_changeXinMo(1);
			});
			lcp.send(pkt);
		}
		public init_changeXinMo(index: number): void {
			this.curSelectIndex = index;
			let data: ProtoCmd.itf_FB_XinMoInfo = this.bossData[index]
			// boss掉落奖励
			let jiangli = SheetConfig.mydb_monster_tbl.getInstance(null).DROPPED_ARTICLES('' + data.monsterid);
			this.hbox_drop.removeChildren();
			for (let i = 0; jiangli[i]; i++) {
				let _itemUI = new view.compart.DaoJuWithNameItem();
				let itemInfo = new ProtoCmd.ItemBase();
				itemInfo.dwBaseID = jiangli[i];
				_itemUI.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				this.hbox_drop.addChild(_itemUI)
			}
			//挑战等级限制
			let mylvl = GameApp.MainPlayer.level;
			let myzslvl = GameApp.MainPlayer.zslevel;
			this.btn_battle.disabled = false;
			let lvl = ''
			if (data.minzslv && myzslvl < data.minzslv || data.maxzslv && mylvl > data.maxzslv) {
				this.btn_battle.disabled = true;
			}
			if (data.minlv && mylvl < data.minlv || data.maxlv && mylvl > data.maxlv) {
				this.btn_battle.disabled = true;
			}
			if (data.minzslv) { lvl = data.minzslv + '转'; }
			if (data.minlv) { lvl = data.minlv + '级'; }
			this.lbl_lvl.text = lvl;
			//已挑战次数/最大挑战次数
			this.lbl_count.text = (data.maxcnt - data.flag) + '/' + data.maxcnt;
			//战力
			this.lbl_num.text = '' + SheetConfig.mydb_monster_tbl.getInstance(null).MONSTER_COMBAT('' + data.monsterid);
			//击败心魔可获得经验
			this.lbl_coin1.text = '' + SheetConfig.mydb_monster_tbl.getInstance(null).EMPIRICAL_VALUE('' + data.monsterid);
			//击败心魔可获得金币
			this.lbl_coin2.text = '' + SheetConfig.mydb_monster_tbl.getInstance(null).GOLD_NUMBER('' + data.monsterid);
		}

	}
}