/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_TalentInfoItem extends ui.juese.Person_TalentInfoItemUI {
		constructor() {
			super();
			this.setData();
			this.panel_left.vScrollBarSkin = '';
		}
		public dialog: Person_zhuansheng_Talent_Dialog = null;
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
		public talentName = ['悟性', '根骨', '臂力', '身法', '善缘'];
		public jingMaiName = ['阴维脉', '任脉', '冲脉', '督脉', '阳维脉'];
		//拉取天赋协议
		public eventList = [ProtoCmd.JS_Panel0, ProtoCmd.JS_Panel1, ProtoCmd.JS_Panel2,
		ProtoCmd.JS_Panel3, ProtoCmd.JS_Panel4];
		//升级天赋协议
		public UpEventList = [ProtoCmd.JS_upgrade0, ProtoCmd.JS_upgrade1, ProtoCmd.JS_upgrade2,
		ProtoCmd.JS_upgrade3, ProtoCmd.JS_upgrade4];
		//激活天赋协议
		public activeEventList = [ProtoCmd.JS_active0, ProtoCmd.JS_active1, ProtoCmd.JS_active2,
		ProtoCmd.JS_active3, ProtoCmd.JS_active4];
		//枚举  对应资源
		public posList = [EnumData.emEquipPosition.EQUIP_DRAGONSOUL, EnumData.emEquipPosition.EQUIP_MEDAL, EnumData.emEquipPosition.EQUIP_SHIELD,
		EnumData.emEquipPosition.EQUIP_BLOODJADE, EnumData.emEquipPosition.EQUIP_OFFICIALSEAL];

		public setData(): void {
			let zhuansheng = GameApp.MainPlayer.zslevel;
			this.img_ceng.skin = 'image/juese/jingmai/fong_jingmaimain_' + zhuansheng + '.png'
			if (this.hasInit) { return };
			this.hasInit = true;
			this.vbox_left['sortItem'] = (items) => { };
			//初始化
			//装备位置
			this.type = this.posList[0];
			this.talent = this.eventList[0]
			this.upLevelType = this.UpEventList[0];
			this.dangqianNum = 1;
			this.btn_top0.selected = true;
			// this.img_xiaoguo0.visible = true;
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_zhuanShengPanel, [0])
			lcp.send(pkt);
			this.init_updataLevel();
			this.addEvent();
			this.TalentInfo();
			this.init_changeIcon();
		}
		public addEvent(): void {
			//转生界面打开
			this.btn_shoot.on(Laya.UIEvent.CLICK, this, function () {
				let total = 0;
				for (let index in this.posList) {
					let pos = this.posList[index]
					let data = GameUtil.findEquipInPlayer(pos);
					total += data.dwLevel;
				}
				this.dialog = new Person_zhuansheng_Talent_Dialog();
				this.dialog.setData(this.zsData, total)
				this.dialog.popup();
			})
			//天赋切换
			for (let i = 0; i < 5; i++) {
				// this['btn_top' + i].label = this.talentName[i]
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
					new view.juese.Person_BuyAndUseDialog().setData(this.iteminfo, 1).show();
				}
			})
		}
		/**
    * 天赋按钮icon
    */
		public init_changeIcon(): void {
			let talentAllData = GameApp.MainPlayer.talentInfo;
			// for (let pos = EnumData.emEquipPosition.EQUIP_MEDAL; pos < EnumData.emEquipPosition.EQUIP_HERO_DRAGONHEART; pos++) {
			// 	let data = GameUtil.findEquipInPlayer(pos);
			// 	if (pos == EnumData.emEquipPosition.EQUIP_DRAGONSOUL && data) {
			// 		this.img_talent0.skin = PathUtil.getItemIconPath(data.dwBaseID);
			// 	}
			// 	if (pos == EnumData.emEquipPosition.EQUIP_SHIELD && data) {
			// 		this.img_talent1.skin = PathUtil.getItemIconPath(data.dwBaseID);
			// 	}
			// 	if (pos == EnumData.emEquipPosition.EQUIP_OFFICIALSEAL && data) {
			// 		this.img_talent2.skin = PathUtil.getItemIconPath(data.dwBaseID);
			// 	}
			// 	if (pos == EnumData.emEquipPosition.EQUIP_BLOODJADE && data) {
			// 		this.img_talent3.skin = PathUtil.getItemIconPath(data.dwBaseID);
			// 	}
			// 	if (pos == EnumData.emEquipPosition.EQUIP_MEDAL && data) {
			// 		this.img_talent4.skin = PathUtil.getItemIconPath(data.dwBaseID);
			// 	}
			// }
		}
		/**
		 * 控制参数变化
		 */
		public init_Initialization(i): void {
			//选中状态
			for (let j = 0; j < 5; j++) {
				this['btn_top' + j].selected = false;
				this['img_touch' + j].skin = 'image/juese/jingmai/frame_mingcheng_0.png'
				this.lab_Touch_name0
				this['lab_Touch_name' + j].color = '#773f15';
				// this['img_xiaoguo' + j].visible = false;
				// this['btn_top' + j].label = this.talentName[j];
			}
			this['btn_top' + i].selected = true;
			this['img_touch' + i].skin = 'image/juese/jingmai/frame_mingcheng_1.png'
			this['lab_Touch_name' + i].color = '#000000'
			// this['img_xiaoguo' + i].visible = true;
			this.title = this.talentName[i];
			this.lab_show_cur_Name.text = this.jingMaiName[i];
			let item = this.iteminfo[i];
			// this.img_talentcoin2.skin
			// this.lab_show_curLv.text = 
			this.btn_show_curMai.skin = 'image/juese/jingmai/mai_' + i + '.png'
			switch (i) {
				//悟性
				case 0:
					this.dangqianNum = EnumData.emTalentType.talent_wuXing;
					this.img_talentcoin2.scaleX = this.img_talentcoin2.scaleY = 1;
					this.img_talentcoin2.skin = 'image/juese/img_talent1.png';
					// this.img_talentcoin1.width = this.img_talentcoin2.width = 49;
					// this.img_talentcoin1.height = this.img_talentcoin2.height = 48;
					// this.img_talentcoin1.y = this.img_talentcoin2.y = -6;

					break;
				//根骨
				case 1:
					this.dangqianNum = EnumData.emTalentType.talent_genGu;
					this.img_talentcoin2.scaleX = this.img_talentcoin2.scaleY = 0.8;
					this.img_talentcoin2.skin = 'image/juese/img_talent3.png';
					// this.img_talentcoin1.width = this.img_talentcoin2.width = 44;
					// this.img_talentcoin1.height = this.img_talentcoin2.height = 45;
					// this.img_talentcoin1.y = this.img_talentcoin2.y = -6;
					break;
				//臂力
				case 2:
					this.dangqianNum = EnumData.emTalentType.talent_biLi;
					this.img_talentcoin2.scaleX = this.img_talentcoin2.scaleY = 1;
					this.img_talentcoin2.skin = 'image/juese/img_talent5.png';
					// this.img_talentcoin1.width = this.img_talentcoin2.width = 50;
					// this.img_talentcoin1.height = this.img_talentcoin2.height = 48;
					// this.img_talentcoin1.y = this.img_talentcoin2.y = -6;
					break;
				//身法
				case 3:
					this.dangqianNum = EnumData.emTalentType.talent_shenFa;
					this.img_talentcoin2.scaleX = this.img_talentcoin2.scaleY = 0.8;
					this.img_talentcoin2.skin = 'image/juese/img_talent4.png';
					// this.img_talentcoin1.width = this.img_talentcoin2.width = 37;
					// this.img_talentcoin1.height = this.img_talentcoin2.height = 48;
					// this.img_talentcoin1.y = this.img_talentcoin2.y = -6;
					break;

				//善缘
				case 4:
					this.dangqianNum = EnumData.emTalentType.talent_shanYuan;
					this.img_talentcoin2.scaleX = this.img_talentcoin2.scaleY = 1;
					this.img_talentcoin2.skin = 'image/juese/img_talent2.png';
					// this.img_talentcoin1.width = this.img_talentcoin2.width = 50;
					// this.img_talentcoin1.height = this.img_talentcoin2.height = 53;
					// this.img_talentcoin1.y = this.img_talentcoin2.y = -12;
					break;
			}
			this.type = this.posList[i]
			//拉取天赋协议
			this.talent = this.eventList[i];
			//升级天赋协议
			this.upLevelType = this.UpEventList[i];
			this.TalentInfo();
		}
		/**
	  * 判断天赋是否激活
	  * 
	  */
		public TalentInfo(): void {
			if (this.getItemInfo()) {
				// this.viw_0.selectedIndex = 0;
				this.zhuangbeiInfo(this.getItemInfo());
				this.init_laqu();
				this.init_changeIcon();
			}
			else {
				// this.viw_0.selectedIndex = 1;
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
		public zsData;
		public zsLvTotal = 0;
		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.Hero_zhuanShengPanel, this,
				(jsonData: ProtoCmd.itf_Hero_ZhuanShengInfo) => {
					this.zsData = jsonData;
					this.zsLvTotal = jsonData.jmlvl;
					this.lab_needLV.text = '' + this.zsLvTotal;
					if (this.dialog) {
						this.dialog.close();
						this.dialog = null;
						this.setData();
					}
				})

			// 拉取天賦
			for (let event of this.eventList) {
				GameApp.LListener.on(event, this, (jsonData: ProtoCmd.itf_JS_TalentInfo) => {
					//所需经验
					// this.lbl_need.text = '' + jsonData.score;
					//当前经验
					let strcolor = '';
					this.html_need.style.align = 'center';
					this.html_need.style.fontSize = 22;
					this.html_need.style.fontFamily = 'STKaiti';
					if (jsonData.curscore < jsonData.score) {
						strcolor = '#a53232';
						this.html_need.innerHTML = "<span style='color:#a53232'>" + LangConfig.getBigNumberDes(jsonData.curscore)
							+ '</span>' + "<span style='color:#ffffff'>/" + LangConfig.getBigNumberDes(jsonData.score) + '</span>';
					} else {
						strcolor = '#38ad32';
						this.html_need.innerHTML = "<span style='color:#38ad32'>" + LangConfig.getBigNumberDes(jsonData.curscore)
							+ '</span>' + "<span style='color:#ffffff'>/" + LangConfig.getBigNumberDes(jsonData.score) + '</span>';
					}
					// this.lbl_have.text = '' + jsonData.curscore



					//升级天赋所需物品
					this.iteminfo = []
					for (let i in jsonData.itemtab) {
						this.iteminfo.push(jsonData.itemtab[i].index);
					}
					//天赋升级后刷新
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
			// this.lbl_name.text = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + data.dwBaseID);
			// this.img_type.skin = PathUtil.getItemIconPath(data.dwBaseID);
			let lvl;
			if (this.dangqianNum == EnumData.emTalentType.talent_genGu) {
				lvl = (data.dwBaseID - 160001) * 10 + data.dwLevel;
			} else {
				lvl = data.dwLevel;
			}
			this.lab_show_curLv.text = 'LV.' + lvl;
			//当前属性
			let attribute = GameUtil.parseEffectidToObj(['' + data.dwEffId]);
			let des = attribute.des;
			let battle = attribute.battle[this.job];
			this.lbl_battle.text = '' + battle;
			//当前天赋未满级显示下级属性变化
			let power = GameApp.MainPlayer.ability.nFight;
			this.lab_curPower.text = LangConfig.getBigNumberDes(power);
			if (lvl < 60) {
				this.lbl_nextLevel.text = '' + (lvl + 1);
				this.lbl_nextLevel.visible = true;
				// this.box_talent.x = 21;
				// this.lbl_add.visible = this.img_battle.visible = true;
				//下级属性
				let id = SheetConfig.mydb_effect_base_tbl.getInstance(null).NEXTID('' + data.dwEffId)
				let nextAttribute = GameUtil.parseEffectidToObj(['' + id]);
				let nextdes = nextAttribute.des;
				let nextBattle = nextAttribute.battle[this.job];
				this.vbox_left.removeChildren();
				for (let i in des) {
					if (des[i].label == '没有极品:') {
						continue;
					} else {
						this.vbox_left.addChild(new view.juese.Person_jingmai_item_shuxingInfo().setData(des[i], nextdes[i]))

					}
					// this.vbox_left.addChild(new view.juese.Person_attributeItem().setData(des[i], nextdes[i], 1))
				}
				//升到下阶战力增加
				this.lab_addPower.text = '' + (nextBattle - battle);
				this.box_add.x = this.lab_curPower.x + this.lab_curPower.width;
			} else {
				this.lbl_nextLevel.visible = false;
				this.img_add.visible = this.lbl_add.visible = this.img_battle.visible = false;
				// this.box_talent.x = 153;
				this.vbox_left.removeChildren();
				for (let i in des) {
					this.vbox_left.addChild(new view.juese.Person_attributeItem().setData(des[i], null, 1))
				}
			}


			//刷新等级
			this.init_updataLevel();
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
			GameApp.LListener.offCaller(ProtoCmd.Hero_zhuanShengPanel, this);
			super.destroy(isbool);
		}
		public init_updataLevel(): void {
			for (let index in this.posList) {
				let pos = this.posList[index]
				let data = GameUtil.findEquipInPlayer(pos);
				if (data) {
					if (pos == EnumData.emEquipPosition.EQUIP_MEDAL) {
						this['lab_Num' + parseInt(index)].text = 'LV.' + ((data.dwBaseID - 160001) * 10 + data.dwLevel);

					} else {
						this['lab_Num' + parseInt(index)].text = 'LV.' + data.dwLevel;
					}
				}
			}
		}
	}
}