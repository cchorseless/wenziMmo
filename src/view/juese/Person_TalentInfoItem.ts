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
		//天赋名称
		public title = '悟性';
		//天赋当前值类型
		private dangqianNum;
		//资质天赋功能ID
		private id = 7003;
		//角色职业
		private job = GameApp.MainPlayer.job;
		//天赋阶数
		public jieshu = 0;
		private client_func_index = 14;// 功能ID编号
		public talentName = ['悟性', '臂力', '善缘', '身法', '根骨']
		public eventList = [ProtoCmd.JS_DragonSoulPanel, ProtoCmd.JS_ShieldPanel, ProtoCmd.JS_OfficialSealPanel, ProtoCmd.JS_BloodJadePanel, ProtoCmd.JS_MedalPanel]
		public setData(): void {
			if (this.hasInit) { return };
			this.hasInit = true;
			this.panel_talent.hScrollBarSkin = '';
			this.hbox_talent['sortItem'] = (items) => { };
			this.panel_wupin.hScrollBarSkin = '';
			this.hbox_wupin['sortItem'] = (items) => { };
			this.vbox_left['sortItem'] = (items) => { };
			this.vbox_right['sortItem'] = (items) => { };
			//初始化
			this.talent = ProtoCmd.JS_DragonSoulPanel
			this.type = EnumData.emEquipPosition.EQUIP_DRAGONSOUL;
			this.index = ProtoCmd.JS_activeDragonSoul;
			this.upLevelType = ProtoCmd.JS_upgradeDragonSoul;
			this.dangqianNum = 2;
			this.img_type.skin = 'image/common/daoju/itemicon_123001.png';
			this.btn_top0.selected = true;
			this.btn_top0.alpha = 1;
			this.img_xiaoguo0.visible = true;
			this.btn_top0.scaleX = this.btn_top0.scaleY = 1.1;
			this.addEvent();
			this.TalentInfo();

		}
		public addEvent(): void {
			for (let i = 0; i < 5; i++) {
				this['btn_top' + i].label = this.talentName[i]
				this['btn_top' + i].on(Laya.UIEvent.CLICK, this, () => {
					this.init_Initialization(i);
				});
			}

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
		 * 控制参数变化
		 */
		public init_Initialization(i): void {
			for (let j = 0; j < 5; j++) {
				this['btn_top' + j].selected = false;
				this['img_xiaoguo' + j].visible = false;
				this['btn_top' + j].alpha = 0.5;
				this['btn_top' + j].scaleX = this['btn_top' + j].scaleY = 1;
				this['btn_top' + j].labelColors = '#ffffff';
				this['btn_top' + j].label = this.talentName[j];
			}
			this['btn_top' + i].selected = true;
			this['btn_top' + i].alpha = 1;
			this['btn_top' + i].scaleX = this['btn_top' + i].scaleY = 1.1;
			this['img_xiaoguo' + i].visible = true;
			switch (i) {
				case 0:
					this.talent = ProtoCmd.JS_DragonSoulPanel;
					this.type = EnumData.emEquipPosition.EQUIP_DRAGONSOUL;
					this.index = ProtoCmd.JS_activeDragonSoul;
					this.upLevelType = ProtoCmd.JS_upgradeDragonSoul;
					this.dangqianNum = 2;
					this.img_type.skin = 'image/common/daoju/itemicon_123001.png';
					this.title = '悟性';
					this.id = 7003;
					this.TalentInfo();
					break;
				case 1:
					this.talent = ProtoCmd.JS_ShieldPanel;
					this.type = EnumData.emEquipPosition.EQUIP_SHIELD;
					this.index = ProtoCmd.JS_activeShield;
					this.upLevelType = ProtoCmd.JS_upgradeShield;
					this.dangqianNum = 4;
					this.img_type.skin = 'image/common/daoju/itemicon_122001.png';
					this.title = '臂力';
					this.id = 7005;
					this.TalentInfo();
					break;
				case 2:
					this.talent = ProtoCmd.JS_OfficialSealPanel;
					this.type = EnumData.emEquipPosition.EQUIP_OFFICIALSEAL;
					this.index = ProtoCmd.JS_activeOfficialSeal;
					this.upLevelType = ProtoCmd.JS_upgradeOfficialSeal;
					this.dangqianNum = 5;
					this.img_type.skin = 'image/common/daoju/itemicon_124001.png';
					this.title = '善缘';
					this.id = 7004;
					this.TalentInfo();
					break;
				case 3:
					this.talent = ProtoCmd.JS_BloodJadePanel;
					this.type = EnumData.emEquipPosition.EQUIP_BLOODJADE;
					this.index = ProtoCmd.JS_activeBloodJade;
					this.upLevelType = ProtoCmd.JS_upgradeBloodJade;
					this.dangqianNum = 3;
					this.img_type.skin = 'image/common/daoju/itemicon_121001.png';
					this.title = '身法';
					this.id = 7002;
					this.TalentInfo();
					break;
				case 4:
					this.talent = ProtoCmd.JS_MedalPanel;
					this.type = EnumData.emEquipPosition.EQUIP_MEDAL;
					this.index = ProtoCmd.JS_activeMedal;
					this.upLevelType = ProtoCmd.JS_upgradeMedal;
					this.dangqianNum = 1;
					this.img_type.skin = 'image/common/daoju/itemicon_160001.png';
					this.title = '根骨';
					this.id = 7001;
					this.TalentInfo();
					break;
			}
		}
		/**
		 * 刷新天赋界面
		 * 
		 */
		public TalentInfo(): void {
			if (this.getItemInfo()) {
				this.viw_0.selectedIndex = 0;
				this.img_jieshu.visible = true;
				this.zhuangbeiInfo(this.getItemInfo());
				this.init_laqu();
			}
			else {
				this.viw_0.selectedIndex = 1;
				this.img_jieshu.visible = false;
				this.lbl_dangqian.text = '' + GameApp.MainPlayer.talentInfo[this.dangqianNum];
				this.notActivation();
			}
		}
		/**
    * 未激活时
    */
		public notActivation(): void {
			let id = this.client_func_index + 1000;
			this.lbl_detail.text = SheetConfig.Introduction_play.getInstance(null).CONTENT('' + this.id);
			this.lbl_condition.text = '' + SheetConfig.Introduction_play.getInstance(null).TEXT1('' + id)
			this.lbl_type.text = '先天' + this.title + '资质';
		}
		public getItemInfo(): ProtoCmd.ItemBase {
			return GameUtil.findEquipInPlayer(this.type)
		}


		public addLcpEvent(): void {
			// 拉取天賦
			for (let event of this.eventList) {
				GameApp.LListener.on(event, this, (jsonData: ProtoCmd.itf_JS_TalentInfo) => {
					//进度条
					this.lbl_jindu.text = jsonData.curscore + '/' + jsonData.score;
					//经验球
					// this.img_progress.height = 101 * jsonData.curscore / jsonData.score;
					let keys = Object.keys(jsonData.itemtab);
					//升级天赋所需物品
					this.hbox_wupin.removeChildren();
					for (let key of keys) {
						let data = jsonData.itemtab[key];
						let _itemUI = new view.compart.DaoJuWithNameItem();
						let itemInfo = new ProtoCmd.ItemBase();
						let num = GameUtil.findItemInBag(data.index, GameApp.GameEngine.bagItemDB);
						itemInfo.dwBaseID = data.index;
						itemInfo.dwCount = num;
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
			//获取途径
			this.lbl_from.text = SheetConfig.Introduction_play.getInstance(null).GROWUPDES('' + this.id)
			//初始化星星
			for (let i = 1; i < 11; i++) {
				this['btn_' + i].selected = false;
			}
			//星级
			this.jieshu = data.dwLevel;
			for (let i = 0; i < data.dwLevel; i++) {
				let j = i + 1
				this['btn_' + j].selected = true;
			};

			switch (this.type) {
				//悟性
				case EnumData.emEquipPosition.EQUIP_DRAGONSOUL:
					let wuxing = GameUtil.parseEffectidToObj(['' + data.dwEffId]);
					let attribute1 = wuxing.des;
					let battle1 = wuxing.battle[this.job];
					this.lbl_power1.text = '' + battle1;
					this.vbox_left.removeChildren();
					for (let key of attribute1) {
						this.vbox_left.addChild(new view.compart.SinglePropsItem().setData(key))
					}
					break;
				//臂力
				case EnumData.emEquipPosition.EQUIP_SHIELD:
					let bili = GameUtil.parseEffectidToObj(['' + data.dwEffId])
					let attribute2 = bili.des;
					let battle2 = bili.battle[this.job];
					this.lbl_power1.text = '' + battle2;
					this.vbox_left.removeChildren();
					for (let key2 of attribute2) {
						this.vbox_left.addChild(new view.compart.SinglePropsItem().setData(key2))
					}
					break;
				//善缘				
				case EnumData.emEquipPosition.EQUIP_OFFICIALSEAL:
					let shanyuan = GameUtil.parseEffectidToObj(['' + data.dwEffId])
					let attribute3 = shanyuan.des;
					let battle3 = shanyuan.battle[this.job];
					this.lbl_power1.text = '' + battle3;
					this.vbox_left.removeChildren();
					for (let key3 of attribute3) {
						this.vbox_left.addChild(new view.compart.SinglePropsItem().setData(key3))
					}
					break;
				//身法
				case EnumData.emEquipPosition.EQUIP_BLOODJADE:
					let shenfa = GameUtil.parseEffectidToObj(['' + data.dwEffId])
					let attribute4 = shenfa.des;
					let battle4 = shenfa.battle[this.job];
					this.lbl_power1.text = '' + battle4;
					this.vbox_left.removeChildren();
					for (let key4 of attribute4) {
						this.vbox_left.addChild(new view.compart.SinglePropsItem().setData(key4))
					}
					break;
				//根骨
				case EnumData.emEquipPosition.EQUIP_MEDAL:
					let gengu = GameUtil.parseEffectidToObj(['' + data.dwEffId])
					let attribute5 = gengu.des;
					let battle5 = gengu.battle[this.job];
					this.lbl_power1.text = '' + battle5;
					this.vbox_left.removeChildren();
					for (let key5 of attribute5) {
						this.vbox_left.addChild(new view.compart.SinglePropsItem().setData(key5))
					}
					break;
			}
			let array = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
			this.lbl_des.text = this.title + array[data.dwLevel] + '阶';
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
			if (this.jieshu != 0) {
				let num;
				switch (this.dangqianNum) {
					case 1:
						num = 4;
						break;
					case 2:
						num = 0;
						break;
					case 3:
						num = 3;
						break;
					case 4:
						num = 1;
						break;
					case 5:
						num = 2;
						break;
				}
				let dangqian = this.jieshu - 1;
				let jieshuID = this.hbox_talent._childs[dangqian].id;
				let name = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + jieshuID);
				this['btn_top' + num].labelColors = '#f9e596';
				this['btn_top' + num].label = name;
				this['img_talent' + num].skin = 'image/common/daoju/itemicon_' + jieshuID + '.png';
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
					let wuxing = GameUtil.parseEffectidToObj(['' + id]);
					let attribute1 = wuxing.des;
					let battle1 = wuxing.battle[this.job];
					this.lbl_power2.text = '' + battle1;
					this.vbox_right.removeChildren();
					for (let key of attribute1) {
						this.vbox_right.addChild(new view.compart.SinglePropsItem().setData(key))
					}
					break;
				//臂力
				case EnumData.emEquipPosition.EQUIP_SHIELD:
					let bili = GameUtil.parseEffectidToObj(['' + id])
					let attribute2 = bili.des;
					let battle2 = bili.battle[this.job];
					this.lbl_power2.text = '' + battle2;
					this.vbox_right.removeChildren();
					for (let key2 of attribute2) {
						this.vbox_right.addChild(new view.compart.SinglePropsItem().setData(key2))
					}
					break;
				//善缘				
				case EnumData.emEquipPosition.EQUIP_OFFICIALSEAL:
					let shanyuan = GameUtil.parseEffectidToObj(['' + id])
					let attribute3 = shanyuan.des;
					let battle3 = shanyuan.battle[this.job];
					this.lbl_power2.text = '' + battle3;
					this.vbox_right.removeChildren();
					for (let key3 of attribute3) {
						this.vbox_right.addChild(new view.compart.SinglePropsItem().setData(key3))
					}
					break;
				//身法
				case EnumData.emEquipPosition.EQUIP_BLOODJADE:
					let shenfa = GameUtil.parseEffectidToObj(['' + id])
					let attribute4 = shenfa.des;
					let battle4 = shenfa.battle[this.job];
					this.lbl_power2.text = '' + battle4;
					this.vbox_right.removeChildren();
					for (let key4 of attribute4) {
						this.vbox_right.addChild(new view.compart.SinglePropsItem().setData(key4))
					}
					break;
				//根骨
				case EnumData.emEquipPosition.EQUIP_MEDAL:
					let gengu = GameUtil.parseEffectidToObj(['' + id])
					let attribute5 = gengu.des;
					let battle5 = gengu.battle[this.job];
					this.lbl_power2.text = '' + battle5;
					this.vbox_right.removeChildren();
					for (let key5 of attribute5) {
						this.vbox_right.addChild(new view.compart.SinglePropsItem().setData(key5))
					}
					break;
			}

		}
	}
}