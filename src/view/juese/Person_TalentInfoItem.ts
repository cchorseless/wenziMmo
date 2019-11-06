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
		//天赋当前值类型
		private dangqianNum;
		//角色职业
		private job = GameApp.MainPlayer.job;
		private client_func_index = 14;// 功能ID编号
		public eventList = [ProtoCmd.JS_DragonSoulPanel, ProtoCmd.JS_ShieldPanel, ProtoCmd.JS_OfficialSealPanel, ProtoCmd.JS_BloodJadePanel, ProtoCmd.JS_MedalPanel]
		public setData(): void {
			if (this.hasInit) { return };
			this.panel_talent.hScrollBarSkin = '';
			this.hbox_talent['sortItem'] = (items) => { };
			this.panel_wupin.hScrollBarSkin = '';
			this.hbox_wupin['sortItem'] = (items) => { };
			this.vbox_left['sortItem'] = (items) => { };
			this.vbox_right['sortItem'] = (items) => { };
			this.talent = ProtoCmd.JS_DragonSoulPanel
			this.type = EnumData.emEquipPosition.EQUIP_DRAGONSOUL;
			this.index = ProtoCmd.JS_activeDragonSoul;
			this.upLevelType = ProtoCmd.JS_upgradeDragonSoul;
			this.dangqianNum = 2;
			this.hasInit = true;
			this.addEvent();
			this.TalentInfo();

		}
		public addEvent(): void {
			//升级
			//悟性
			this.btn_top0.on(Laya.UIEvent.CLICK, this, () => {
				this.talent = ProtoCmd.JS_DragonSoulPanel;
				this.type = EnumData.emEquipPosition.EQUIP_DRAGONSOUL;
				this.index = ProtoCmd.JS_activeDragonSoul;
				this.upLevelType = ProtoCmd.JS_upgradeDragonSoul;
				this.dangqianNum = 2;
				this.TalentInfo();
			});

			//臂力
			this.btn_top1.on(Laya.UIEvent.CLICK, this, () => {
				this.talent = ProtoCmd.JS_ShieldPanel;
				this.type = EnumData.emEquipPosition.EQUIP_SHIELD;
				this.index = ProtoCmd.JS_activeShield;
				this.upLevelType = ProtoCmd.JS_upgradeShield;
				this.dangqianNum = 4;
				this.TalentInfo();
			});

			//善緣
			this.btn_top2.on(Laya.UIEvent.CLICK, this, () => {
				this.talent = ProtoCmd.JS_OfficialSealPanel;
				this.type = EnumData.emEquipPosition.EQUIP_OFFICIALSEAL;
				this.index = ProtoCmd.JS_activeOfficialSeal;
				this.upLevelType = ProtoCmd.JS_upgradeOfficialSeal;
				this.dangqianNum = 5;
				this.TalentInfo();
			});

			//身法
			this.btn_top3.on(Laya.UIEvent.CLICK, this, () => {
				this.talent = ProtoCmd.JS_BloodJadePanel;
				this.type = EnumData.emEquipPosition.EQUIP_BLOODJADE;
				this.index = ProtoCmd.JS_activeBloodJade;
				this.upLevelType = ProtoCmd.JS_upgradeBloodJade;
				this.dangqianNum = 3;
				this.TalentInfo();
			});

			//根骨
			this.btn_top4.on(Laya.UIEvent.CLICK, this, () => {
				this.talent = ProtoCmd.JS_MedalPanel;
				this.type = EnumData.emEquipPosition.EQUIP_MEDAL;
				this.index = ProtoCmd.JS_activeMedal;
				this.upLevelType = ProtoCmd.JS_upgradeMedal;
				this.dangqianNum = 1;
				this.TalentInfo();
			});

			// 激活
			this.btn_jiHuo.on(Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(this.index, null, null, this, (jsonData) => {
					this.TalentInfo()
				})
				lcp.send(pkt);
			})

			// 升级
			this.btn_up.on(Laya.UIEvent.CLICK, this, () => {
				this.lvUpTalent();
			})

			this.addLcpEvent();
		}


		/**
		 * 刷新天赋界面
		 * 
		 */
		public TalentInfo(): void {
			if (this.getItemInfo()) {
				this.viw_0.selectedIndex = 0;
				this.img_jieshu.visible=true;
				this.zhuangbeiInfo(this.getItemInfo());
				this.init_laqu();
			}
			else {
				this.viw_0.selectedIndex = 1;
				this.img_jieshu.visible=false;
				this.lbl_dangqian.text = '' + GameApp.MainPlayer.talentInfo[this.dangqianNum];
				this.notActivation();
			}
		}
		/**
    * 未激活时
    */
		public notActivation(): void {
			let id = this.client_func_index + 1000;
			this.lbl_detail.text = SheetConfig.Introduction_play.getInstance(null).CONTENT('' + id);
			this.lbl_condition.text = '' + SheetConfig.Introduction_play.getInstance(null).TEXT1('' + id)

		}
		public getItemInfo(): ProtoCmd.ItemBase {
			return GameUtil.findEquipInPlayer(this.type)
		}


		public addLcpEvent(): void {
			// 拉取天賦
			for (let event of this.eventList) {
				GameApp.LListener.on(event, this, (jsonData: ProtoCmd.itf_JS_TalentInfo) => {
					console.log('======>天赋啊1', jsonData)
					this.lbl_jindu.text = jsonData.curscore + '/' + jsonData.score;
					this.img_progress.width = 472 * jsonData.curscore / jsonData.score;
					let keys = Object.keys(jsonData.itemtab);
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
						_itemUI.lbl_exp.text = '' + jsonData.score;
						_itemUI.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_BAG_EQUIP);
						this.hbox_wupin.addChild(_itemUI)
					}
					this.init_xiajie(jsonData.itemid);
				})
			}

		}

		public destroy(isbool): void {
			for (let event of this.eventList) {
				GameApp.LListener.offCaller(event, this);
			}

			super.destroy(isbool);
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
					let wuxing = GameUtil.parseEffectidToString('' + data.dwEffId);
					let attribute1 = wuxing.des;
					let battle1 = wuxing.battle[this.job];
					this.clip_power1.value = '' + battle1;
					let keys1 = Object.keys(attribute1)
					this.vbox_left.removeChildren();
					for (let key of keys1) {
						this.vbox_left.addChild(new view.juese.Person_LableItem().setData(attribute1[key]))
					}
					break;
				//臂力
				case EnumData.emEquipPosition.EQUIP_SHIELD:
					let bili = GameUtil.parseEffectidToString('' + data.dwEffId)
					let attribute2 = bili.des;
					let battle2 = bili.battle[this.job];
					this.clip_power1.value = '' + battle2;
					let keys2 = Object.keys(attribute2)
					this.vbox_left.removeChildren();
					for (let key of keys2) {
						this.vbox_left.addChild(new view.juese.Person_LableItem().setData(attribute2[key]))
					}
					break;
				//善缘				
				case EnumData.emEquipPosition.EQUIP_OFFICIALSEAL:
					let shanyuan = GameUtil.parseEffectidToString('' + data.dwEffId)
					let attribute3 = shanyuan.des;
					let battle3 = shanyuan.battle[this.job];
					this.clip_power1.value = '' + battle3;
					let keys3 = Object.keys(attribute3)
					this.vbox_left.removeChildren();
					for (let key of keys3) {
						this.vbox_left.addChild(new view.juese.Person_LableItem().setData(attribute3[key]))
					}
					break;
				//身法
				case EnumData.emEquipPosition.EQUIP_BLOODJADE:
					let shenfa = GameUtil.parseEffectidToString('' + data.dwEffId)
					let attribute4 = shenfa.des;
					let battle4 = shenfa.battle[this.job];
					this.clip_power1.value = '' + battle4;
					let keys4 = Object.keys(attribute4)
					this.vbox_left.removeChildren();
					for (let key of keys4) {
						this.vbox_left.addChild(new view.juese.Person_LableItem().setData(attribute4[key]))
					}
					break;
				//根骨
				case EnumData.emEquipPosition.EQUIP_MEDAL:
					let gengu = GameUtil.parseEffectidToString('' + data.dwEffId)
					let attribute5 = gengu.des;
					let battle5 = gengu.battle[this.job];
					this.clip_power1.value = '' + battle5;
					let keys5 = Object.keys(attribute5)
					this.vbox_left.removeChildren();
					for (let key of keys5) {
						this.vbox_left.addChild(new view.juese.Person_LableItem().setData(attribute5[key]))
					}
					break;
			}

			this.init_xiajeshuxing(data.dwEffId);
		}
		/**
		 * 
		 * @param id 查找下阶物品id
		 */
		public init_xiajie(id): void {
			this.hbox_talent.removeChildren();
			this.hbox_talent.addChild(new view.juese.Person_TalentInfoBtnItem().setData(id))
			while (id > 0) {
				id = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMLVUPID('' + id);
				if (id == 0) {
					break;
				}
				this.hbox_talent.addChild(new view.juese.Person_TalentInfoBtnItem().setData(id));
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
					let wuxing = GameUtil.parseEffectidToString('' + id);
					let attribute1 = wuxing.des;
					let battle1 = wuxing.battle[this.job];
					this.clip_power2.value = '' + battle1;
					let keys1 = Object.keys(attribute1)
					this.vbox_right.removeChildren();
					for (let key of keys1) {
						this.vbox_right.addChild(new view.juese.Person_LableItem().setData(attribute1[key]))
					}
					break;
				//臂力
				case EnumData.emEquipPosition.EQUIP_SHIELD:
					let bili = GameUtil.parseEffectidToString('' + id)
					let attribute2 = bili.des;
					let battle2 = bili.battle[this.job];
					this.clip_power2.value = '' + battle2;
					let keys2 = Object.keys(attribute2)
					this.vbox_right.removeChildren();
					for (let key of keys2) {
						this.vbox_right.addChild(new view.juese.Person_LableItem().setData(attribute2[key]))
					}
					break;
				//善缘				
				case EnumData.emEquipPosition.EQUIP_OFFICIALSEAL:
					let shanyuan = GameUtil.parseEffectidToString('' + id)
					let attribute3 = shanyuan.des;
					let battle3 = shanyuan.battle[this.job];
					this.clip_power2.value = '' + battle3;
					let keys3 = Object.keys(attribute3)
					this.vbox_right.removeChildren();
					for (let key of keys3) {
						this.vbox_right.addChild(new view.juese.Person_LableItem().setData(attribute3[key]))
					}
					break;
				//身法
				case EnumData.emEquipPosition.EQUIP_BLOODJADE:
					let shenfa = GameUtil.parseEffectidToString('' + id)
					let attribute4 = shenfa.des;
					let battle4 = shenfa.battle[this.job];
					this.clip_power2.value = '' + battle4;
					let keys4 = Object.keys(attribute4)
					this.vbox_right.removeChildren();
					for (let key of keys4) {
						this.vbox_right.addChild(new view.juese.Person_LableItem().setData(attribute4[key]))
					}
					break;
				//根骨
				case EnumData.emEquipPosition.EQUIP_MEDAL:
					let gengu = GameUtil.parseEffectidToString('' + id)
					let attribute5 = gengu.des;
					let battle5 = gengu.battle[this.job];
					this.clip_power2.value = '' + battle5;
					let keys5 = Object.keys(attribute5)
					this.vbox_right.removeChildren();
					for (let key of keys5) {
						this.vbox_right.addChild(new view.juese.Person_LableItem().setData(attribute5[key]))
					}
					break;
			}

		}
	}
}