/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_BuildEquipDialog extends ui.juese.Person_BuildEquipDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public equipInfo;
		//剑客可打造所有装备
		public jobEquip1 = [];
		//怪盗可打造所有装备
		public jobEquip2 = [];
		//隐门可打造所有装备
		public jobEquip3 = [];
		//职业1剑客2怪盗3隐门
		public job = 1;
		//必选装备所需数量
		public maxNum;
		//必选装备的等级条件限制
		public level;
		//要打造的装备的dwBaseID
		public result;
		//必选装备所有材料的int64id（用'`'号连接）
		public stuff;
		public setData(): void {
			this.panel_equip.hScrollBarSkin = '';
			this.hbox_equip['sortItem'] = (items) => { };
			this.vbox_shuxing['sortItem'] = (items) => { };
			//职业页签
			this.tab_daoju.selectHandler = Laya.Handler.create(this, (index) => {
				//职业
				this.job = index + 1;
				this.init_euipInfo(this.tab_lvl.selectedIndex);
			}, null, false);
			//等级页签
			this.tab_lvl.selectHandler = Laya.Handler.create(this, (index) => {
				this.init_euipInfo(index);
				this.btn_select.selected = false;
				this.init_selected(this.btn_select.selected);
			}, null, false);
			//装备打造全部数据
			this.equipInfo = SheetConfig.zhuangbei_make.getInstance(null).data;
			let keys = Object.keys(this.equipInfo);
			for (let key of keys) {
				let daojuData = SheetConfig.mydb_item_base_tbl.getInstance(null).data[key];
				//职业
				switch (daojuData[11]) {
					case 1:
						//隐门传人所有装备
						this.jobEquip1.push({ data: daojuData, key: key });
						break;
					case 2:
						//奇侠怪盗所有装备
						this.jobEquip2.push({ data: daojuData, key: key });
						break;
					case 3:
						//神秘孤儿所有装备
						this.jobEquip3.push({ data: daojuData, key: key });
						break;
				}
			}
			this.addEvent();
			this.init_euipInfo(0);
			this.init_selectPart();
			this.updata();
		}
		public addEvent(): void {
			//装备等级选择
			this.btn_select.on(Laya.UIEvent.CLICK, this, () => {
				this.btn_select.selected = !this.btn_select.selected;
				this.init_selected(this.btn_select.selected);
			})
			//关闭弹窗
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			//选择必选材料
			this.box_add.on(Laya.UIEvent.CLICK, this, () => {
				if (this.level >= 0 && this.maxNum) {
					new view.juese.Person_BuildEquipSelectDialog().setData(this.level, this.maxNum).popup();
				}
			})
			//打造裝備
			this.btn_build.on(Laya.UIEvent.CLICK, this, () => {
				this.init_buildEquip();
			})
			//是否选中可选材料
			this.btn_putAnother.on(Laya.UIEvent.CLICK, this, () => {
				this.btn_putAnother.selected = !this.btn_putAnother.selected;
			})
		}
		/**
		 * 选择装备页签伸缩
		 * @param select 
		 */
		public init_selected(select): void {
			if (select) {
				Laya.Tween.to(this.img_lvl, { scaleY: 1 }, 200);
			} else {
				Laya.Tween.to(this.img_lvl, { scaleY: 0 }, 200);
			}
		}
		public init_euipInfo(num): void {
			let lvl;
			switch (num) {
				case 0:
					lvl = 60;
					this.lbl_lvl.text = '60级';
					break;
				case 1:
					lvl = 70;
					this.lbl_lvl.text = '70级';
					break;
				case 2:
					lvl = 1;
					this.lbl_lvl.text = '1转';
					break;
				case 3:
					lvl = 3;
					this.lbl_lvl.text = '3转';
					break;
				case 4:
					lvl = 5;
					this.lbl_lvl.text = '5转';
					break;
				case 5:
					lvl = 7;
					this.lbl_lvl.text = '7转';
					break;
				case 6:
					lvl = 9;
					this.lbl_lvl.text = '9转';
					break;
				case 7:
					lvl = 11;
					this.lbl_lvl.text = '11转';
					break;
				case 8:
					lvl = EnumData.emRareType.RARE_TYPE_LEGEND;
					this.lbl_lvl.text = '传说';
					break;
				case 9:
					lvl = EnumData.emRareType.RARE_TYPE_GOD;
					this.lbl_lvl.text = '神品';
					break;
			}
			let equipInfo;
			switch (this.job) {
				case 1:
					equipInfo = this.jobEquip1;
					break;
				case 2:
					equipInfo = this.jobEquip2;
					break;
				case 3:
					equipInfo = this.jobEquip3;
					break;
			}
			this.hbox_equip.removeChildren();
			if (equipInfo) {
				for (let item of equipInfo) {
					if (num < 2) {
						//转生等级为0&&等级需求
						if (item.data[67] == 0 && item.data[3] == lvl) {
							this.hbox_equip.addChild(new view.juese.Person_BuildEquipItem().setData(item))
						}
					}
					if (num >= 2 && num < 8) {
						//转生等级为lvl
						if (item.data[67] == lvl) {
							this.hbox_equip.addChild(new view.juese.Person_BuildEquipItem().setData(item))
						}
					}
					if (num >= 8) {
						//装备品质为lvl
						if (item.data[6] == lvl) {
							this.hbox_equip.addChild(new view.juese.Person_BuildEquipItem().setData(item))
						}
					}
				}
			}
			this.init_dangqian();
		}
		public init_dangqian(equipInfo = null): void {
			//当前装备选中状态发光显示
			for (let item of this.hbox_equip._childs) {
				item.img_light.visible = false;
			}
			if (equipInfo == null) {
				if (this.hbox_equip._childs.length > 0) {
					this.hbox_equip._childs[0].img_light.visible = true;
					equipInfo = this.hbox_equip._childs[0].data;
				}
			} else {
				for (let item of this.hbox_equip._childs) {
					if (item.data.key == equipInfo.key) {
						item.img_light.visible = true;
					}
				}
			}
			//当前装备打造信息
			if (this.hbox_equip._childs.length > 0) {
				let keys = Object.keys(this.equipInfo);
				for (let key of keys) {
					if (equipInfo.key == key) {
						//可合成装备
						let itemInfo = new ProtoCmd.ItemBase();
						itemInfo.dwBaseID = parseInt(key);
						this.result = parseInt(key)
						this.ui_build.setData(itemInfo);
						this.lbl_name.text = equipInfo.data[1];
						//基础属性显示
						this.init_baseAttribute(equipInfo.data);
						//所需材料
						let equipData = this.equipInfo[key];
						//初始化必选材料信息
						this.btn_add.visible = true;
						let item0 = equipData[0].split('`');
						this.level = parseInt(item0[0]);
						if (parseInt(item0[0]) >= 1000) {
							let zs = Math.ceil(parseInt(item0[0]) / 1000);
							this.lbl_condition.text = '等级等于' + zs + '转'
						} else {
							this.lbl_condition.text = '等级等于' + item0[0] + '级'
						}
						this.lbl_num.text = '0/' + item0[1];
						this.maxNum = item0[1];
						this.ui_item0.img_item.visible = false;
						this.ui_item0.lbl_count.visible = false;
						//固定材料
						let item12 = equipData[1].match(/\d+/g);
						//材料1
						let itemInfo1 = new ProtoCmd.ItemBase();
						itemInfo1.dwBaseID = parseInt(item12[0]);
						itemInfo1.dwCount = parseInt(item12[1]);
						this.ui_item1.setData(itemInfo1,EnumData.ItemInfoModel.SHOW_IN_MAIL);
						this.lbl_item1.text = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + item12[0]);
						//材料2
						let itemInfo2 = new ProtoCmd.ItemBase();
						itemInfo2.dwBaseID = parseInt(item12[2]);
						itemInfo2.dwCount = parseInt(item12[3]);
						this.ui_item2.setData(itemInfo2,EnumData.ItemInfoModel.SHOW_IN_MAIL);
						this.lbl_item2.text = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + item12[2]);
						//可选材料
						let itemInfo3 = new ProtoCmd.ItemBase();
						itemInfo3.dwBaseID = equipData[2];
						let kexuan = GameUtil.findItemInBag(equipData[2], GameApp.GameEngine.bagItemDB);
						//可选道具数量
						this.lbl_kexuan.text = kexuan + '/' + equipData[3];
						this.ui_item3.ui_item.lbl_count.visible = false;
						this.ui_item3.ui_item.setData(itemInfo3, EnumData.ItemInfoModel.SHOW_IN_MAIL);
						break;
					}
				}
			}

		}
		/**
		 * 更新选中装备
		 */
		public updata(): void {
			GameApp.LListener.on(ProtoCmd.JS_updateBuildEquip, this, (data) => {
				this.init_dangqian(data);
			})
		}
		/**
		 * 
		 * @param data 打造的装备基础属性
		 */
		public init_baseAttribute(data): void {
			let effid;
			switch (data[11]) {
				case 1:
					effid = data[17];
					break;
				case 2:
					effid = data[18];
					break;
				case 3:
					effid = data[19];
					break;
			}
			let attribute = GameUtil.parseEffectidToObj(['' + effid]).des;
			let battle = GameUtil.parseEffectidToObj(['' + effid]).battle[data[11]];
			//战力
			this.fclip_battle.value = '' + battle;
			//属性
			this.vbox_shuxing.removeChildren();
			for (let part of attribute) {
				this.vbox_shuxing.addChild(new view.compart.SinglePropsItem().setData(part))
			}
		}
		/**
		 * 选择的必选材料显示
		 */
		public init_selectPart(): void {
			GameApp.LListener.on(ProtoCmd.JS_updateBuildEquipItem, this, (jsonData, type: number) => {
				//type为选择材料弹窗响应1为打造装备弹窗响应
				if (type == 1) {
					this.ui_item0.lbl_count.visible = false;
					//会配一个通用icon显示，此处只需要显示材料数量
					// let itemInfo = new ProtoCmd.ItemBase();
					// itemInfo.dwBaseID = jsonData.dwBaseID;
					// itemInfo.dwBinding = jsonData.dwBinding;
					// itemInfo.dwCount = jsonData.dwCount;
					// this.ui_item0.setData(itemInfo);
					//所需必选装备数量
					let num = this.lbl_num.text.split('/');
					for (let item of jsonData) {
						//获取必选装备所有材料的int64id（用'`'号连接）
						if (this.stuff) {
							this.stuff = this.stuff + '`' + item.i64ItemID.id;
						} else {
							this.stuff = item.i64ItemID.id
						}
					}
					//当前必选装备数量/所需必选装备数量
					if (GameApp.GameEngine.buildEquip.length > 0) {
						this.lbl_num.text = GameApp.GameEngine.buildEquip.length + '/' + num[1];
						this.ui_item0.img_item.visible = true;
					} else {
						this.lbl_num.text = '0/' + num[1];
						this.ui_item0.img_item.visible = false;
					}
					if (GameApp.GameEngine.buildEquip.length == parseInt(num[1])) {
						this.btn_add.visible = false;
					}
				}
			})
		}
		public onClosed(TYPE?) {
			GameApp.LListener.offCaller(ProtoCmd.JS_updateBuildEquipItem, this)
			GameApp.LListener.offCaller(ProtoCmd.JS_updateBuildEquip, this)
			GameApp.GameEngine.buildEquip = undefined;
		}
		/**
		 * 打造装备
		 */
		public init_buildEquip(): void {
			if (this.stuff && this.result) {
				//可选装备选中状态0不附加材料,1附加材料
				let type;
				if (this.btn_putAnother.selected) {
					type = 1;
				} else {
					type = 0;
				}
				//打造装备
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.JS_equipFabricate, [this.result, this.stuff, type], null, this, (jsonData, type) => {

				})
				lcp.send(pkt)
			} else {
				TipsManage.showTips('材料不足')
			}
		}
	}
}