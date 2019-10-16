/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_TalentInfoItem extends ui.juese.Person_TalentInfoItemUI {
		constructor() {
			super();
		}
		private hasInit = false;// 初始化自己
		//拉取天赋信息类型
		private talent;
		//装备类型
		private type;
		//天赋激活类型
		private index;
		//天赋升级类型
		private upLevelType;
		public setData(): void {
			if (this.hasInit) { return };
			this.panel_talent.hScrollBarSkin = '';
			this.hbox_talent['sortItem'] = (items) => { };
			this.panel_wupin.hScrollBarSkin = '';
			this.hbox_wupin['sortItem'] = (items) => { };
			this.talent = ProtoCmd.JS_DragonSoulPanel
			this.type = EnumData.emEquipPosition.EQUIP_DRAGONSOUL;
			this.index = ProtoCmd.JS_activeDragonSoul;
			this.upLevelType = ProtoCmd.JS_upgradeDragonSoul;
			this.hasInit = true;
			this.addEvent();
			this.TalentInfo();
		}


		public downX;
		// 根骨
		public curIndex = EnumData.emEquipPosition.EQUIP_MEDAL;
		public addEvent(): void {
			// this.box_0.on(Laya.UIEvent.MOUSE_DOWN, this, (e: Laya.Event) => {
			// 	this.downX = e.stageX;
			// });
			//升级
		
			//悟性
			this.btn_top0.on(Laya.UIEvent.CLICK, this, () => {
				this.talent = ProtoCmd.JS_DragonSoulPanel;
				this.type = EnumData.emEquipPosition.EQUIP_DRAGONSOUL;
				this.index = ProtoCmd.JS_activeDragonSoul;
				this.upLevelType = ProtoCmd.JS_upgradeDragonSoul;
				this.TalentInfo();
			});
			//臂力
			this.btn_top1.on(Laya.UIEvent.CLICK, this, () => {
				this.talent = ProtoCmd.JS_ShieldPanel;
				this.type = EnumData.emEquipPosition.EQUIP_SHIELD;
				this.index = ProtoCmd.JS_activeShield;
				this.upLevelType = ProtoCmd.JS_upgradeShield;
				this.TalentInfo();

			});
			//善緣
			this.btn_top2.on(Laya.UIEvent.CLICK, this, () => {
				this.talent = ProtoCmd.JS_OfficialSealPanel;
				this.type = EnumData.emEquipPosition.EQUIP_OFFICIALSEAL;
				this.index = ProtoCmd.JS_activeOfficialSeal;
				this.upLevelType = ProtoCmd.JS_upgradeOfficialSeal;
				this.TalentInfo();
			});
			//身法
			this.btn_top3.on(Laya.UIEvent.CLICK, this, () => {
				this.talent = ProtoCmd.JS_BloodJadePanel;
				this.type = EnumData.emEquipPosition.EQUIP_BLOODJADE;
				this.index = ProtoCmd.JS_activeBloodJade;
				this.upLevelType = ProtoCmd.JS_upgradeBloodJade;
				this.TalentInfo();

			});
			//根骨
			this.btn_top4.on(Laya.UIEvent.CLICK, this, () => {
				this.talent = ProtoCmd.JS_MedalPanel;
				this.type = EnumData.emEquipPosition.EQUIP_MEDAL;
				this.index = ProtoCmd.JS_activeMedal;
				this.upLevelType = ProtoCmd.JS_upgradeMedal;
				this.TalentInfo();

			});
				this.btn_up.on(Laya.UIEvent.CLICK, this, () => {
				this.lvUpTalent();
			})
		}


		/**
		 * 激活天赋
		 * @param index 
		 */
		public activeTalent(): void {
			this.btn_jiHuo.on(Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(this.index, null, null, this, (jsonData) => {
					this.TalentInfo()

				})
				lcp.send(pkt);
			})

		}
		/**
		 * 刷新天赋界面
		 * 
		 */
		public TalentInfo(): void {
			if (this.getItemInfo()) {
				this.viw_0.selectedIndex = 0;
				this.init_talent();
				this.zhuangbeiInfo(this.getItemInfo());
				this.init_laqu();

			}
			else {
				this.viw_0.selectedIndex = 1;
				this.activeTalent();
			}

		}
		public getItemInfo(): ProtoCmd.ItemBase {
			return GameUtil.findEquipInPlayer(this.type)
		}


		public init_talent(): void {
			// 拉取天賦
			GameApp.LListener.on(this.talent, this, (jsonData) => {
				this.lbl_jindu.text = jsonData.curscore + '/' + jsonData.score;
				this.img_progress.width = 472 * jsonData.curscore / jsonData.score;
				let keys = Object.keys(jsonData.itemtab);
				console.log('===>物品id',jsonData )
				this.hbox_wupin.removeChildren();
				for (let key of keys) {
					let data = jsonData.itemtab[key];
					let _itemUI = new view.compart.DaoJuWithNameItem();
					let itemInfo = new ProtoCmd.ItemBase();
					let num = GameUtil.findItemInBag(data.index, GameApp.GameEngine.bagItemDB);
					itemInfo.dwBaseID = data.index;
					itemInfo.dwCount = num;
					
					//经验值
					_itemUI.img_exp.visible = true;
					_itemUI.lbl_exp.visible = true;
					_itemUI.lbl_exp.text = jsonData.score;
					_itemUI.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_BAG_EQUIP);
					this.hbox_wupin.addChild(_itemUI)
									
				}
			})
		}
		public Dispose(): void {
			GameApp.LListener.offCaller(this.talent, this);
			PopUpManager.Dispose(this);
		}
		public init_laqu(): void {
			let pkt = new ProtoCmd.QuestClientData;
			pkt.setString(this.talent)
			lcp.send(pkt);
		}
		/**
	  * 升级天赋
	  * @param index 
	  */
		public lvUpTalent(): void {
			let pkt = new ProtoCmd.QuestClientData;
			pkt.setString(this.upLevelType)
			lcp.send(pkt);
		}
		/**
		 * 当前属性与星级
		 * @param data 当前天赋
		 */
		public zhuangbeiInfo(data: ProtoCmd.ItemBase): void {
			//星级
			for (let i = 0; i < data.dwLevel; i++) {
				let j = i + 1
				this['btn_' + j].selected = true;
			}
			switch (this.type) {
				//悟性
				case EnumData.emEquipPosition.EQUIP_DRAGONSOUL:
					//暴击率
					let baojilv = SheetConfig.mydb_effect_base_tbl.getInstance(null).CRIT_RATE('' + data.dwEffId);
					this.lbl_shuxing1.text = '暴击率：' + baojilv;
					//暴击伤害
					let baoji = SheetConfig.mydb_effect_base_tbl.getInstance(null).CRITICAL_DAMAGE('' + data.dwEffId);
					this.lbl_shuxing2.text = '暴击伤害：' + baoji;
					//增加对BOSS的暴击
					this.lbl_shuxing3.visible = true;
					let increase = SheetConfig.mydb_effect_base_tbl.getInstance(null).INJURY_INCREASE('' + data.dwEffId);
					this.lbl_shuxing3.text = '增加对BOSS的暴击：' + increase;
					// 减少对BOSS的暴击
					this.lbl_shuxing4.visible = true;
					let reduce = SheetConfig.mydb_effect_base_tbl.getInstance(null).REDUCE_INJURY('' + data.dwEffId);
					this.lbl_shuxing4.text = '减少对BOSS的暴击：' + reduce;
					break;
				//臂力
				case EnumData.emEquipPosition.EQUIP_SHIELD:
					//物理防御
					let minwulif = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_PHYSICAL('' + data.dwEffId);
					let maxwulif = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_PHYSICAL('' + data.dwEffId);
					this.lbl_shuxing1.text = '物理防御：' + minwulif + '-' + maxwulif;
					//魔法防御
					let minmofa = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_SPELLS('' + data.dwEffId);
					let maxmofa = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_SPELLS('' + data.dwEffId);
					this.lbl_shuxing2.text = '魔法防御：' + minmofa + '-' + maxmofa;
					//韧性
					this.lbl_shuxing3.visible = true;
					let renxing = SheetConfig.mydb_effect_base_tbl.getInstance(null).TOUGHNESS('' + data.dwEffId);
					this.lbl_shuxing3.text = '韧性：' + renxing;
					// 内功值
					this.lbl_shuxing4.visible = true;
					let neigong = SheetConfig.mydb_effect_base_tbl.getInstance(null).INTERNAL('' + data.dwEffId);
					this.lbl_shuxing4.text = '内功值：' + neigong;
					break;
				//善缘				
				case EnumData.emEquipPosition.EQUIP_OFFICIALSEAL:
					//生命上限
					let life = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_HP('' + data.dwEffId);
					this.lbl_shuxing1.text = '生命上限：' + life;
					//物理攻击
					let minwulig = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_ATTACK('' + data.dwEffId);
					let maxwulig = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_ATTACK('' + data.dwEffId);
					this.lbl_shuxing2.text = '物理攻击：' + minwulig + '-' + maxwulig;
					//对英雄伤害增加
					this.lbl_shuxing3.visible = true;
					let heroIncrease = SheetConfig.mydb_effect_base_tbl.getInstance(null).HERO_INCREASE('' + data.dwEffId);
					this.lbl_shuxing3.text = '对英雄伤害增加：' + heroIncrease;
					// 对boss伤害增加
					this.lbl_shuxing4.visible = true;
					let bossIncrease = SheetConfig.mydb_effect_base_tbl.getInstance(null).BOSS_INCREASE('' + data.dwEffId);
					this.lbl_shuxing4.text = '对boss伤害增加：' + bossIncrease;
					break;
				//身法
				case EnumData.emEquipPosition.EQUIP_BLOODJADE:
					//生命上限
					let maxHP = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_HP('' + data.dwEffId);
					this.lbl_shuxing1.text = '生命上限：' + maxHP;
					//魔法上限
					let maxMP = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_MP('' + data.dwEffId);
					this.lbl_shuxing2.text = '魔法上限：' + maxMP;
					this.lbl_shuxing3.visible = false;
					this.lbl_shuxing4.visible = false;
					break;
				//根骨
				case EnumData.emEquipPosition.EQUIP_MEDAL:
					//生命上限
					let maxlife = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_HP('' + data.dwEffId);
					this.lbl_shuxing1.text = '生命上限：' + maxlife;
					//物理攻击
					let minwulig1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_ATTACK('' + data.dwEffId);
					let maxwulig1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_ATTACK('' + data.dwEffId);
					this.lbl_shuxing2.text = '物理攻击：' + minwulig1 + '-' + maxwulig1;
					//受BOSS伤害减少
					this.lbl_shuxing3.visible = true;
					let bossIncrease1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).BOSS_REDUCE('' + data.dwEffId);
					this.lbl_shuxing3.text = '受BOSS伤害减少：' + bossIncrease1;
					// 受英雄伤害减少
					this.lbl_shuxing4.visible = true;
					let hero_reduce = SheetConfig.mydb_effect_base_tbl.getInstance(null).HERO_REDUCE('' + data.dwEffId);
					this.lbl_shuxing4.text = '受英雄伤害减少：' + hero_reduce;
					break;
			}
			this.init_xiajie(data.dwBaseID);
			this.init_xiajeshuxing(data.dwEffId);
		}
		/**
		 * 
		 * @param id 查找下阶物品id
		 */
		public init_xiajie(id): void {
			let xiajieID = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMLVUPID('' + id)
			this.hbox_talent.removeChildren();
			while (xiajieID > 0) {
				xiajieID = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMLVUPID('' + xiajieID);
				if (xiajieID == 0) {
					break;
				}
				this.hbox_talent.addChild(new view.juese.Person_TalentInfoBtnItem().setData(xiajieID));
			}
		}
		/**
		 * 下阶属性
		 * @param dwEffId 当前天赋ID
		 */
		public init_xiajeshuxing(dwEffId): void {
			//下阶效果属性ID
			let id = SheetConfig.mydb_effect_base_tbl.getInstance(null).NEXTID('' + dwEffId)
			switch (this.type) {
				//悟性
				case EnumData.emEquipPosition.EQUIP_DRAGONSOUL:
					//暴击率
					let baojilv = SheetConfig.mydb_effect_base_tbl.getInstance(null).CRIT_RATE('' + id);
					this.lbl_xiajie1.text = '暴击率：' + baojilv;
					//暴击伤害
					let baoji = SheetConfig.mydb_effect_base_tbl.getInstance(null).CRITICAL_DAMAGE('' + id);
					this.lbl_xiajie2.text = '暴击伤害：' + baoji;
					//增加对BOSS的暴击
					this.lbl_xiajie3.visible = true;
					let increase = SheetConfig.mydb_effect_base_tbl.getInstance(null).INJURY_INCREASE('' + id);
					this.lbl_xiajie3.text = '增加对BOSS的暴击：' + increase;
					// 减少对BOSS的暴击
					this.lbl_xiajie4.visible = true;
					let reduce = SheetConfig.mydb_effect_base_tbl.getInstance(null).REDUCE_INJURY('' + id);
					this.lbl_xiajie4.text = '减少对BOSS的暴击：' + reduce;
					break;
				//臂力
				case EnumData.emEquipPosition.EQUIP_SHIELD:
					//物理防御
					let minwulif = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_PHYSICAL('' + id);
					let maxwulif = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_PHYSICAL('' + id);
					this.lbl_xiajie1.text = '物理防御：' + minwulif + '-' + maxwulif;
					//魔法防御
					let minmofa = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_SPELLS('' + id);
					let maxmofa = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_SPELLS('' + id);
					this.lbl_xiajie2.text = '魔法防御：' + minmofa + '-' + maxmofa;
					//韧性
					this.lbl_xiajie3.visible = true;
					let renxing = SheetConfig.mydb_effect_base_tbl.getInstance(null).TOUGHNESS('' + id);
					this.lbl_xiajie3.text = '韧性：' + renxing;
					// 内功值
					this.lbl_xiajie4.visible = true;
					let neigong = SheetConfig.mydb_effect_base_tbl.getInstance(null).INTERNAL('' + id);
					this.lbl_xiajie4.text = '内功值：' + neigong;
					break;
				//善缘				
				case EnumData.emEquipPosition.EQUIP_OFFICIALSEAL:
					//生命上限
					let life = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_HP('' + id);
					this.lbl_xiajie1.text = '生命上限：' + life;
					//物理攻击
					let minwulig = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_ATTACK('' + id);
					let maxwulig = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_ATTACK('' + id);
					this.lbl_xiajie2.text = '物理攻击：' + minwulig + '-' + maxwulig;
					//对英雄伤害增加
					this.lbl_shuxing3.visible = true;
					let heroIncrease = SheetConfig.mydb_effect_base_tbl.getInstance(null).HERO_INCREASE('' + id);
					this.lbl_xiajie3.text = '对英雄伤害增加：' + heroIncrease;
					// 对boss伤害增加
					this.lbl_xiajie4.visible = true;
					let bossIncrease = SheetConfig.mydb_effect_base_tbl.getInstance(null).BOSS_INCREASE('' + id);
					this.lbl_xiajie4.text = '对boss伤害增加：' + bossIncrease;
					break;
				//身法
				case EnumData.emEquipPosition.EQUIP_BLOODJADE:
					//生命上限
					let maxHP = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_HP('' + id);
					this.lbl_xiajie1.text = '生命上限：' + maxHP;
					//魔法上限
					let maxMP = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_MP('' + id);
					this.lbl_xiajie2.text = '魔法上限：' + maxMP;
					this.lbl_xiajie3.visible = false;
					this.lbl_xiajie4.visible = false;
					break;
				//根骨
				case EnumData.emEquipPosition.EQUIP_MEDAL:
					//生命上限
					let maxlife = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_HP('' + id);
					this.lbl_xiajie1.text = '生命上限：' + maxlife;
					//物理攻击
					let minwulig1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_ATTACK('' + id);
					let maxwulig1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_ATTACK('' + id);
					this.lbl_xiajie2.text = '物理攻击：' + minwulig1 + '-' + maxwulig1;
					//受BOSS伤害减少
					this.lbl_xiajie3.visible = true;
					let bossIncrease1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).BOSS_REDUCE('' + id);
					this.lbl_xiajie3.text = '受BOSS伤害减少：' + bossIncrease1;
					// 受英雄伤害减少
					this.lbl_xiajie4.visible = true;
					let hero_reduce = SheetConfig.mydb_effect_base_tbl.getInstance(null).HERO_REDUCE('' + id);
					this.lbl_xiajie4.text = '受英雄伤害减少：' + hero_reduce;
					break;
			}

		}
	}
}