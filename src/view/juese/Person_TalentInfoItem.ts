/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_TalentInfoItem extends ui.juese.Person_TalentInfoItemUI {
		constructor() {
			super();
			this.setData();
		}
		private hasInit = false;// 初始化自己
		//拉取天赋信息类型
		private talent;
		//升级所需物品
		public iteminfo;
		//装备类型
		private type;
		//天赋升级类型
		private upLevelType;
		//天赋名称
		public title = '悟性';
		//天赋当前枚举类型
		private dangqianNum;
		//角色职业
		private job = GameApp.MainPlayer.job;
		//天赋阶数
		public jieshu = 0;
		private client_func_index = 14;// 功能ID编号
		public talentName = ['悟性', '臂力', '善缘', '身法', '根骨'];
		//拉取天赋协议
		public eventList = [ProtoCmd.JS_DragonSoulPanel, ProtoCmd.JS_ShieldPanel, ProtoCmd.JS_OfficialSealPanel,
		ProtoCmd.JS_BloodJadePanel, ProtoCmd.JS_MedalPanel];
		//升级天赋协议
		public UpEventList = [ProtoCmd.JS_upgradeDragonSoul, ProtoCmd.JS_upgradeShield, ProtoCmd.JS_upgradeOfficialSeal,
		ProtoCmd.JS_upgradeBloodJade, ProtoCmd.JS_upgradeMedal];
		//激活天赋协议
		public activeEventList = [ProtoCmd.JS_activeDragonSoul, ProtoCmd.JS_activeShield, ProtoCmd.JS_activeOfficialSeal,
		ProtoCmd.JS_activeBloodJade, ProtoCmd.JS_activeMedal];
		public setData(): void {
			if (this.hasInit) { return };
			this.hasInit = true;
			this.vbox_left['sortItem'] = (items) => { };
			//初始化
			//装备位置
			this.type = EnumData.emEquipPosition.EQUIP_DRAGONSOUL;
			this.talent = this.eventList[0]
			this.upLevelType = this.UpEventList[0];
			this.dangqianNum = 2;
			this.img_type.skin = 'image/common/daoju/itemicon_123001.png';
			this.btn_top0.selected = true;
			this.img_xiaoguo0.visible = true;
			let talentAllData = GameApp.MainPlayer.talentInfo;
			if (talentAllData) {
				this.lbl_lvl0.text = 'LV.' + talentAllData[1];
				this.lbl_lvl1.text = 'LV.' + talentAllData[3];
				this.lbl_lvl2.text = 'LV.' + talentAllData[5];
				this.lbl_lvl3.text = 'LV.' + talentAllData[4];
				this.lbl_lvl4.text = 'LV.' + talentAllData[2];
			}
			this.addEvent();
			this.TalentInfo();
			this.init_changeIcon();
		}
		public addEvent(): void {
			//天赋切换
			for (let i = 0; i < 5; i++) {
				this['btn_top' + i].label = this.talentName[i]
				this['btn_top' + i].on(Laya.UIEvent.CLICK, this, () => {
					this.init_Initialization(i);
				});
			}
			// 一键激活
			this.btn_jiHuo.on(Laya.UIEvent.CLICK, this, () => {
				for (let active of this.activeEventList) {
					let pkt = new ProtoCmd.QuestClientData();
					pkt.setString(active, null, null, this, (jsonData) => {
						this.TalentInfo()
					})
					lcp.send(pkt);
				}
			})
			// 升级
			this.btn_up.on(Laya.UIEvent.CLICK, this, () => {
				this.lvUpTalent();
			})
			this.addLcpEvent();
			//购买
			this.btn_buy.on(Laya.UIEvent.CLICK, this, () => {
				if (this.iteminfo.length > 0) {
					new view.juese.Person_BuyAndUseDialog().setData(this.iteminfo, 1).popup();
				}
			})
		}
		/**
    * 天赋按钮icon
    */
		public init_changeIcon(): void {
			let talentAllData = GameApp.MainPlayer.talentInfo;
			for (let pos = EnumData.emEquipPosition.EQUIP_MEDAL; pos < EnumData.emEquipPosition.EQUIP_HERO_DRAGONHEART; pos++) {
				let data = GameUtil.findEquipInPlayer(pos);
				if (pos == EnumData.emEquipPosition.EQUIP_DRAGONSOUL && data) {
					this.img_talent0.skin = 'image/common/daoju/itemicon_' + data.dwBaseID + '.png';

				}
				if (pos == EnumData.emEquipPosition.EQUIP_SHIELD && data) {
					this.img_talent1.skin = 'image/common/daoju/itemicon_' + data.dwBaseID + '.png';

				}
				if (pos == EnumData.emEquipPosition.EQUIP_OFFICIALSEAL && data) {
					this.img_talent2.skin = 'image/common/daoju/itemicon_' + data.dwBaseID + '.png';

				}
				if (pos == EnumData.emEquipPosition.EQUIP_BLOODJADE && data) {
					this.img_talent3.skin = 'image/common/daoju/itemicon_' + data.dwBaseID + '.png';

				}
				if (pos == EnumData.emEquipPosition.EQUIP_MEDAL && data) {
					this.img_talent4.skin = 'image/common/daoju/itemicon_' + data.dwBaseID + '.png';

				}
			}
		}
		/**
		 * 控制参数变化
		 */
		public init_Initialization(i): void {
			//选中状态
			for (let j = 0; j < 5; j++) {
				this['btn_top' + j].selected = false;
				this['img_xiaoguo' + j].visible = false;
				this['btn_top' + j].label = this.talentName[j];
			}
			this['btn_top' + i].selected = true;
			this['img_xiaoguo' + i].visible = true;
			this.title = this.talentName[i];

			switch (i) {
				//悟性
				case 0:
					this.type = EnumData.emEquipPosition.EQUIP_DRAGONSOUL;
					this.dangqianNum = EnumData.emTalentType.talent_wuXing;

					break;
				//臂力
				case 1:
					this.type = EnumData.emEquipPosition.EQUIP_SHIELD;
					this.dangqianNum = EnumData.emTalentType.talent_biLi;

					break;
				//善缘
				case 2:
					this.type = EnumData.emEquipPosition.EQUIP_OFFICIALSEAL;
					this.dangqianNum = EnumData.emTalentType.talent_shanYuan;

					break;
				//身法
				case 3:
					this.type = EnumData.emEquipPosition.EQUIP_BLOODJADE;
					this.dangqianNum = EnumData.emTalentType.talent_shenFa;

					break;

				//根骨
				case 4:
					this.type = EnumData.emEquipPosition.EQUIP_MEDAL;
					this.dangqianNum = EnumData.emTalentType.talent_genGu;

					break;
			}
			//拉取天赋协议
			this.talent = this.eventList[i];
			//升级天赋协议
			this.upLevelType = this.UpEventList[i];
			this.TalentInfo();
		}
		/**
	  * 刷新天赋界面
	  * 
	  */
		public TalentInfo(): void {
			if (this.getItemInfo()) {
				this.viw_0.selectedIndex = 0;
				this.zhuangbeiInfo(this.getItemInfo());
				this.init_laqu();
				this.init_changeIcon();
			}
			else {
				this.viw_0.selectedIndex = 1;
				this.notActivation();
			}
		}
		/**
    * 未激活时
    */
		public notActivation(): void {
			let id = this.client_func_index + 1000;
			this.lbl_condition.text = '' + SheetConfig.Introduction_play.getInstance(null).TEXT1('' + id)
			this.lbl_add.text = this.lbl_battle.text = '';
			this.img_add.visible = this.img_battle.visible = false;
		}
		public getItemInfo(): ProtoCmd.ItemBase {
			return GameUtil.findEquipInPlayer(this.type)
		}
		public addLcpEvent(): void {
			// 拉取天賦
			for (let event of this.eventList) {
				GameApp.LListener.on(event, this, (jsonData: ProtoCmd.itf_JS_TalentInfo) => {
					//所需经验
					this.lbl_need.text = '' + jsonData.score;
					//当前经验
					if (jsonData.curscore < jsonData.score) {
						this.lbl_have.color = '#a53232';
					} else {
						this.lbl_have.color = '#000000';
					}
					this.lbl_have.text = '' + jsonData.curscore
					//升级天赋所需物品
					this.iteminfo = []
					for (let i in jsonData.itemtab) {
						this.iteminfo.push(jsonData.itemtab[i].index);
					}
					this.zhuangbeiInfo(this.getItemInfo());
				})
			}
		}
		/**
		 * 当前属性与星级
		 * @param data 当前天赋
		 */
		public zhuangbeiInfo(data: ProtoCmd.ItemBase): void {
			this.img_add.visible = this.img_battle.visible = true;
			//天赋名称
			this.lbl_name.text = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + data.dwBaseID);
			this.img_type.skin = 'image/common/daoju/itemicon_' + data.dwBaseID + '.png';
			//天赋等级
			let talentAllData = GameApp.MainPlayer.talentInfo;
			//刷新等级
			if (talentAllData) {
				this.lbl_lvl0.text = 'LV.' + talentAllData[1];
				this.lbl_lvl1.text = 'LV.' + talentAllData[3];
				this.lbl_lvl2.text = 'LV.' + talentAllData[5];
				this.lbl_lvl3.text = 'LV.' + talentAllData[4];
				this.lbl_lvl4.text = 'LV.' + talentAllData[2];
			}
			this.lbl_level.text = 'LV.' + talentAllData[this.dangqianNum];
			this.lbl_nextLevel.text = '' + (talentAllData[this.dangqianNum] + 1);
			//当前属性
			let attribute = GameUtil.parseEffectidToObj(['' + data.dwEffId]);
			let des = attribute.des;
			let battle = attribute.battle[this.job];
			this.lbl_battle.text = '' + battle;
			//下级属性
			let id = SheetConfig.mydb_effect_base_tbl.getInstance(null).NEXTID('' + data.dwEffId)
			let nextAttribute = GameUtil.parseEffectidToObj(['' + id]);
			let nextdes = nextAttribute.des;
			let nextBattle = nextAttribute.battle[this.job];
			this.vbox_left.removeChildren();
			for (let i in des) {
				this.vbox_left.addChild(new view.juese.Person_attributeItem().setData(des[i], nextdes[i], 1))
			}
			//升到下阶战力增加
			this.lbl_add.text = '' + (nextBattle - battle);
		}
		/**
	  * 拉取界面信息
	  */
		public init_laqu(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(this.talent)
			lcp.send(pkt);
		}
		/**
	  	 * 升级天赋
	  	 * @param index 
	  	 */
		public lvUpTalent(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(this.upLevelType)
			lcp.send(pkt);
		}
		public destroy(isbool): void {
			for (let event of this.eventList) {
				GameApp.LListener.offCaller(event, this);
			}
			super.destroy(isbool);
		}
	}
}