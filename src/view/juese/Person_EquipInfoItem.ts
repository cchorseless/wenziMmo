/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_EquipInfoItem extends ui.juese.Person_EquipInfoItemUI {
		constructor() {
			super();
			this.setData();
		}
		public battle;
		public hasInit = false;// 初始化自己
		public setData(): void {
			if (this.hasInit) { return };
			this.hasInit = true;
			this.initUI();
			this.addEvent();
			this.getEquipMasterInfo();
			this.getEquipBackground();
		}
		public addEvent(): void {
			//精炼
			EventManage.onWithEffect(this.btn_equip, Laya.UIEvent.CLICK, this, () => {
				let o = new Person_Equip_SoulContentDialog()
				o.setData(1)
				o.popup();

			})
			//强化
			EventManage.onWithEffect(this.btn_intensify, Laya.UIEvent.CLICK, this, () => {
				let o = new Person_IntensifyContentDialog()
				o.setData()
				o.popup();
			})
			//等级
			EventManage.onWithEffect(this.btn_soul, Laya.UIEvent.CLICK, this, () => {
				let o = new Person_Equip_SoulContentDialog()
				o.setData(0)
				o.popup();
			})
			//装备打造
			EventManage.onWithEffect(this.btn_equipBuild, Laya.UIEvent.CLICK, this, () => {
				new view.juese.Person_BuildEquipDialog().popup();
			})
			// //武学基础
			// EventManage.onWithEffect(this.btn_wuXueBase, Laya.UIEvent.CLICK, this, () => {
			// 	new view.juese.Person_WuXueBaseDialog().popup();
			// })
			//装备强化
			EventManage.onWithEffect(this.btn_equipStrong, Laya.UIEvent.CLICK, this, () => {
				new view.zhaiYuan.ZhaiYuan_lianQiDialog().popup(true);
			})
			//战斗属性介绍
			// EventManage.onWithEffect(this.btn_shuxing, Laya.UIEvent.CLICK, this, () => {
			// 	new view.dialog.InfoV1Dialog().popup();
			// })
			this.btn_prestige.on(Laya.UIEvent.CLICK, this, function () {
				let o = new Person_shengwangMainDialog();
				o.popup(true);
			})
			this.addLcpEvent();
		}
		public addLcpEvent(): void {
			GameApp.LListener.on(LcpEvent.UPDATE_UI_PLAYER_POWER, this, () => {
				this.initUI();
			})
		}
		public destroy(isbool): void {
			GameApp.LListener.offCaller(LcpEvent.UPDATE_UI_PLAYER_POWER, this);
			super.destroy(isbool);
		}
		public initUI(): void {
			this.lbl_dengji.text = '(' + GameApp.MainPlayer.EquipmentNum[0] + ')';
			this.lbl_jinglian.text = '(' + GameApp.MainPlayer.EquipmentNum[1] + ')';
			this.lbl_stronger.text = '(' + GameApp.MainPlayer.EquipmentNum[2] + ')';
			let func = LangConfig.getBigNumberDes;
			//战力
			this.lbl_zhanli.text = '' + GameApp.MainPlayer.ability.nFight;
			//玩家倒影全身像
			this.img_avatarPic.skin = LangConfig.getPlayerAvatarSkinV1()
			let allKey = Object.keys(GameApp.GameEngine.equipDB);
			for (let key of allKey) {
				let _itemBase: ProtoCmd.ItemBase = GameApp.GameEngine.equipDB[key];
				let btLocation = _itemBase.location.getValue('btLocation');
				let btIndex = _itemBase.location.getValue('btIndex');
				// 筛选合适的装备
				if (btLocation == EnumData.PACKAGE_TYPE.ITEMCELLTYPE_EQUIP && btIndex <= EnumData.emEquipPosition.EQUIP_BELT && btIndex >= EnumData.emEquipPosition.EQUIP_HEADDRESS) {
					let itemUI = new view.compart.DaoJuItem();
					itemUI.setData(_itemBase, EnumData.ItemInfoModel.SHOW_IN_MAIL);
					(this['ui_item' + btIndex] as view.compart.EquipInBodybgItem).addItem(itemUI);
				}
			}
			//出身
			let player = GameApp.MainPlayer;
			this.img_job.skin='image/common/img_job0'+player.job+'.png'
			this.lbl_job.text = LangConfig.JOB_TYPEDES[EnumData.JOB_TYPE[player.job]];
			//等级
			this.lbl_level.text = player.zslevel + '转' + player.level + '级';
			//角色名
			this.lbl_name.text = player.objName;
			// 声望信息
			this.lbl_shengWang.text = '[' + LangConfig.getFameDes(player.wealth.nowFame) + ']';
			//门派
			if (SheetConfig.BaseMenPaiSheet.getInstance(null).data[player.guildInfo.dwID]) {
				let menpai = SheetConfig.BaseMenPaiSheet.getInstance(null).NAME('' + player.guildInfo.dwID);
				if (menpai) {
					this.lbl_menpai.text = menpai;
				} else {
					this.lbl_menpai.text = '无门无派';
				}
			} else {
				this.lbl_menpai.text = '无门无派';
			}
		}

		/**
		 * 拉取强化大师
		 */
		public getEquipMasterInfo(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JS_SoulNecklacePanel, [0], null, this, (jsonData) => {
				console.log(jsonData)
			})
			lcp.send(pkt);
		}
		/**
		 * 初始化装备背景
		 */
		public getEquipBackground(): void {
			for (let i = 0; i < 10; i++) {
				this['ui_item' + i].img_bg.visible = true;
				this['ui_item' + i].img_bg.skin = 'image/common/daoju/itemicon_bg_' + (i + 10) + '.png';
				if (GameApp.GameEngine.mainPlayer.playerEquipIntensify.playerjson[i] == 0) {
					this['ui_item' + i].lbl_stronger.text = '';
				} else {
					this['ui_item' + i].lbl_stronger.text = '+' + GameApp.GameEngine.mainPlayer.playerEquipIntensify.playerjson[i]
				}
				let sum = 0;
				let soulArray = GameApp.GameEngine.mainPlayer.playersoulStoneLevel.playerlvl[i]
				for (let shu in soulArray) {
					sum = parseInt(soulArray[shu]) + sum;
				}
				if (sum == 0) {
					this['ui_item' + i].lbl_soul.text = ''
				} else {
					this['ui_item' + i].lbl_soul.text = '精炼：' + sum;
				}
				let pos = i + 10;
				let data = GameUtil.findEquipInPlayer(pos);
				let shuziArray = ['','Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ']
				if (data) {
					let lvl = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMJIESHU(data.dwBaseID + '');
					if (lvl == 0) {
						this['ui_item' + i].lbl_chuanshi.text = '';
					} else {
						this['ui_item' + i].lbl_chuanshi.text = '' + shuziArray[lvl];
					}
				} else {
					this['ui_item' + i].lbl_chuanshi.text = '';
				}
			}
		}
	}
}