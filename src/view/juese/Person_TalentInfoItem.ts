/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_TalentInfoItem extends ui.juese.Person_TalentInfoItemUI {
		constructor() {
			super();
		}
		public hasInit = false;// 初始化自己
		//拉取天赋信息类型
		public talent;
		//装备类型
		public type;
		//天赋激活类型
		public index;
		public setData(): void {
			if (this.hasInit) { return };
			this.panel_talent.hScrollBarSkin = '';
			this.hbox_talent['sortItem'] = (items) => { };
			this.talent = ProtoCmd.JS_DragonSoulPanel
			this.type = EnumData.emEquipPosition.EQUIP_DRAGONSOUL;
			this.index = ProtoCmd.JS_activeDragonSoul;
			this.hasInit = true;
			this.addEvent();
			this.TalentInfo();
			this.getItemInfo();
			this.init_talent();
			this.activeTalent();
			
		}


		public downX;
		// 根骨
		public curIndex = EnumData.emEquipPosition.EQUIP_MEDAL;
		public addEvent(): void {
			// this.box_0.on(Laya.UIEvent.MOUSE_DOWN, this, (e: Laya.Event) => {
			// 	this.downX = e.stageX;
			// });
			//悟性
			this.btn_top0.on(Laya.UIEvent.CLICK, this, () => {
				this.talent = ProtoCmd.JS_DragonSoulPanel;
				this.type = EnumData.emEquipPosition.EQUIP_DRAGONSOUL;
				this.index = ProtoCmd.JS_activeDragonSoul;
				this.TalentInfo();
			});
			//臂力
			this.btn_top1.on(Laya.UIEvent.CLICK, this, () => {
				this.talent = ProtoCmd.JS_ShieldPanel;
				this.type = EnumData.emEquipPosition.EQUIP_SHIELD;
				this.index = ProtoCmd.JS_activeShield;
				this.TalentInfo();

			});
			//善緣
			this.btn_top2.on(Laya.UIEvent.CLICK, this, () => {
				this.talent = ProtoCmd.JS_OfficialSealPanel;
				this.type = EnumData.emEquipPosition.EQUIP_OFFICIALSEAL;
				this.index = ProtoCmd.JS_activeOfficialSeal;
				this.TalentInfo();


			});
			//身法
			this.btn_top3.on(Laya.UIEvent.CLICK, this, () => {
				this.talent = ProtoCmd.JS_BloodJadePanel;
				this.type = EnumData.emEquipPosition.EQUIP_BLOODJADE;
				this.index = ProtoCmd.JS_activeBloodJade;
				this.TalentInfo();

			});
			//根骨
			this.btn_top4.on(Laya.UIEvent.CLICK, this, () => {
				this.talent = ProtoCmd.JS_MedalPanel;
				this.type = EnumData.emEquipPosition.EQUIP_MEDAL;
				this.index = ProtoCmd.JS_activeMedal;
				this.TalentInfo();

			});
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
			}
			else {
				this.viw_0.selectedIndex = 1;
			}

		}
		public getItemInfo(): ProtoCmd.ItemBase {
			return GameUtil.findEquipInPlayer(this.type)
		}

		/**
		 * 升级天赋
		 * @param index 
		 */
		public lvUpTalent(index): void {

		}
		public init_talent(): void {
			// 拉取天賦
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(this.talent, null, null, this, (jsonData) => {
				this.lbl_jindu.text = jsonData.curscore + '/' + jsonData.score;
				this.img_progress.width = 472 * jsonData.curscore / jsonData.score;
				for (let i = 1; jsonData.itemtab[i]; i++) {
					let _itemUI = new view.compart.DaoJuWithNameItem();
					let itemInfo = new ProtoCmd.ItemBase();
					itemInfo.dwBaseID = jsonData.itemtab[i].index;
					itemInfo.dwCount = jsonData.itemtab[i].score;
					_itemUI.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_BAG_EQUIP);
					this['box_talent' + i].addChild(_itemUI)
				}
				console.log('===>天賦天賦', jsonData);
			})
			lcp.send(pkt);
		}
		public zhuangbeiInfo(data: ProtoCmd.ItemBase): void {
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
			this.init_xiajie(data.dwEffId);
			this.init_xiajeshuxing(data.dwEffId);
		}
		public init_xiajie(id): void {
			let xiajieID = parseInt(SheetConfig.mydb_effect_base_tbl.getInstance(null).NEXTID('' + id))
			while (xiajieID !== 0) {
				xiajieID = parseInt(SheetConfig.mydb_effect_base_tbl.getInstance(null).NEXTID('' + xiajieID));

				this.hbox_talent.addChild(new view.juese.Person_TalentInfoBtnItem().setData(xiajieID));
			}
		}
		public init_xiajeshuxing(id): void {
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