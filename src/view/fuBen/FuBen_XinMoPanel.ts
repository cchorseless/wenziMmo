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
			this.btn_xinmo.selected = true;
			this.addEvent();
			this.init_XinMo();
		}
		public addEvent(): void {
			//返回
			this.btn_back.on(Laya.UIEvent.CLICK, this, function () {
				PopUpManager.checkPanel(this);
				PanelManage.FuBenXinMo = undefined;
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
			//缉拿
			this.btn_jina.on(Laya.UIEvent.CLICK, this, function () {
				PanelManage.openFuBenJiNaPanel();
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
				let vipLvl = GameApp.MainPlayer.viplvl;
				if (vipLvl > 0) {
					if (this.btn_battle.gray) {
						TipsManage.showTips('玩家等级不足');
					} else {
						let pkt = new ProtoCmd.QuestClientData();
						pkt.setString(ProtoCmd.FB_GeRenBoss_Enter, [this.curSelectIndex])
						lcp.send(pkt);
					}
				} else {
					if (this.curSelectIndex != 4 && this.btn_battle.gray == false) {
						let pkt = new ProtoCmd.QuestClientData();
						pkt.setString(ProtoCmd.FB_GeRenBoss_Enter, [this.curSelectIndex])
						lcp.send(pkt);
					}
					if (this.curSelectIndex != 4 && this.btn_battle.gray) {
						TipsManage.showTips('玩家等级不足');
					}
					if (this.curSelectIndex == 4) {
						let o = new view.recharge_vip.Recharge_VipDialog();
						o.setData(0);
						o.popup(true);
					}
				}
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
			let jiangliArr = jiangli.split('|');
			let resultArr = [];
			for (let i = 0; i < jiangliArr.length; i++) {
				let base = jiangliArr[i].split('`');
				resultArr.push(parseInt(base[0]))
			}
			this.hbox_drop.removeChildren();
			for (let i = 0; resultArr[i]; i++) {
				let _itemUI = new view.compart.DaoJuWithNameItem();
				let itemInfo = new ProtoCmd.ItemBase();
				itemInfo.dwBaseID = resultArr[i];
				_itemUI.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				this.hbox_drop.addChild(_itemUI)
			}
			//挑战等级限制
			let mylvl = GameApp.MainPlayer.level;
			let myzslvl = GameApp.MainPlayer.zslevel;
			this.btn_battle.gray = false;
			let vipLvl = GameApp.MainPlayer.viplvl;
			if (index == 4 && vipLvl == 0) {
				this.btn_battle.gray = true;
			}

			let lvl = '';
			if (data.minzslv && myzslvl < data.minzslv || data.maxzslv && mylvl > data.maxzslv) {
				this.btn_battle.gray = true;
			}
			if (data.minlv && mylvl < data.minlv || data.maxlv && mylvl > data.maxlv) {
				this.btn_battle.gray = true;
			}
			if (data.minzslv) { lvl = data.minzslv + '转'; }
			if (data.minlv) { lvl = data.minlv + '级'; }
			this.lbl_lvl.text = lvl;
			//心魔名称
			let nameArray = ['', '贪婪', '怨念', '神秘', '仇恨', '痴念', '妄念'];
			this.lbl_name.text = nameArray[index];
			//已挑战次数/最大挑战次数
			this.lbl_count.text = (data.maxcnt - data.flag) + '/' + data.maxcnt;
			//战力
			this.lbl_num.text = '' + SheetConfig.mydb_monster_tbl.getInstance(null).MONSTER_COMBAT('' + data.monsterid);
			//击败心魔可获得经验
			this.lbl_coin1.text = '' + SheetConfig.mydb_monster_tbl.getInstance(null).EMPIRICAL_VALUE('' + data.monsterid);
			//击败心魔可获得金币
			this.lbl_coin2.text = '' + SheetConfig.mydb_monster_tbl.getInstance(null).GOLD_NUMBER('' + data.monsterid);
			//心魔头像
			this.img_avatarPic.skin = 'image/common/npc/npc_icon_' + SheetConfig.mydb_monster_tbl.getInstance(null).HEAD_IMAGE('' + data.monsterid) + '.png'
			//心魔名称
			this.lab_name.text = SheetConfig.mydb_monster_tbl.getInstance(null).NAME('' + data.monsterid);
			//心魔等级
			this.lab_level.text = lvl;
			this.lab_neePower.text = '' + SheetConfig.mydb_monster_tbl.getInstance(null).MONSTER_COMBAT('' + data.monsterid);
			this.lab_level.text = LangConfig.getLevelDes(GameApp.MainPlayer.zslevel, GameApp.MainPlayer.level);
			this.html_times.style.align = 'center';
			this.html_times.style.fontFamily = 'STKaiti';
			this.html_times.style.fontSize = 24;
			if ((data.maxcnt - data.flag) >= data.maxcnt) {
				this.html_times.innerHTML = "<span style='color:#000000;'>挑战次数" + (data.maxcnt - data.flag) + "</span>"
					+ "<span style='color:#000000;'>/" + data.maxcnt + "</span>"
			} else {
				this.html_times.innerHTML = "<span style='color:#000000;'>挑战次数</span>"
					+ "<span style='color:#cd3735;'>/" + (data.maxcnt - data.flag) + "</span>"
					+ "<span style='color:#000000;'>/" + data.maxcnt + "</span>";
			}


		}

	}
}