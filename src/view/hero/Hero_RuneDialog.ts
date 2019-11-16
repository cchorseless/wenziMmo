/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_RuneDialog extends ui.hero.Hero_RuneDialogUI {
		constructor() {
			super();
		}
		//效果id类型
		public type;
		private sum0 = 0;
		private sum1 = 0;
		private sum2 = 0;
		private sum3 = 0;
		private sum4 = 0;
		private sum5 = 0;
		private sum6 = 0;
		private sum7 = 0;
		private sum8 = 0;
		private sum9 = 0;
		private sum00 = 0;
		private sum01 = 0;
		private sum02 = 0;
		private sum03 = 0;
		private sum04 = 0;
		private sum05 = 0;
		private sum06 = 0;
		private sum07 = 0;
		private sum08 = 0;
		private sum09 = 0;
		public setData(job): Hero_RuneDialog {
			//弟子职业
			switch (job) {
				case 1:
					this.type = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB1_EFFICTID;
					break;
				case 2:
					this.type = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB2_EFFICTID;
					break;
				case 3:
					this.type = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB3_EFFICTID;
					break;

			}
			this.tab_rune.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_rune.selectedIndex = index;
				this.init_RuneEvent();
			}, null, false);
			this.panel_view.hScrollBarSkin = '';
			this.hbox_view['sortItem'] = (items) => { };
			this.panel_activation.vScrollBarSkin = '';
			this.vbox_rune1['sortItem'] = (items) => { };
			this.panel_exchange.vScrollBarSkin = '';
			this.vbox_rune2['sortItem'] = (items) => { };
			this.panel_recovery.vScrollBarSkin = '';
			this.vbox_rune3['sortItem'] = (items) => { };
			//初始化item
			for (let i = 0; i < 6; i++) {
				this.vbox_item.addChild(new view.hero.Hero_RuneItem());
				this.vbox_exchange1.addChild(new view.hero.Hero_RuneItem())
				this.vbox_exchange2.addChild(new view.hero.Hero_RuneItem())
			}
			this.addEvent();
			let i = 1;
			this.init_view(i);
			this.init_ranePanel();
			return this;

		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, this.onclose)
			//符文交换卸下交换符文
			this.box_exchange1.on(Laya.UIEvent.CLICK, this, () => {
				if (this.box_exchange1._childs.length > 0) {
					this.box_exchange1.removeChildren();
					this.vbox_exchange1.removeChildren();
					this.ui_item1.visible = true;
				}
				this.vbox_exchange1.removeChildren();
				for (let i = 0; i < 6; i++) {
					this.vbox_exchange1.addChild(new view.hero.Hero_RuneItem())
				}
			})
			//符文交换卸下被交换符文
			this.box_exchange2.on(Laya.UIEvent.CLICK, this, () => {
				if (this.box_exchange2._childs.length > 0) {
					this.box_exchange2.removeChildren();
					this.vbox_exchange2.removeChildren();
					this.ui_item2.visible = true;
				}
				this.vbox_exchange2.removeChildren();
				for (let i = 0; i < 6; i++) {
					this.vbox_exchange2.addChild(new view.hero.Hero_RuneItem())
				}
			})
			//符文预览
			for (let i = 1; i < 11; i++) {
				this['box_' + i].on(Laya.UIEvent.CLICK, this, () => {
					this.init_ranePanel();
					this.init_view(i);

				})
			}
			//符文预览
			for (let i = 1; i < 9; i++) {
				this['img_part_' + i].on(Laya.UIEvent.CLICK, this, () => {
					new view.hero.Hero_RunePartDialog().setData().popup();
				})
			}
			this.btn_all.on(Laya.UIEvent.CLICK, this, () => {
				this.init_Allrecovery();
			})
		}
		/**
		 * 符文预览
		 */
		public init_view(i): void {
			GameApp.LListener.on(ProtoCmd.Hero_openActiveRunePanel, this, (jsonData) => {
				let itemID = jsonData.viewtab[i]
				let suitID = SheetConfig.mydb_item_base_tbl.getInstance(null).SUIT_EFFICTID('' + jsonData.viewtab[i]);
				let id1 = suitID + 3;
				let id2 = suitID + 5;
				let id3 = suitID + 8;
				let a = GameUtil.parseEffectidToObj(['' + id1]);
				// let bossHurt = SheetConfig.mydb_effect_base_tbl.getInstance(null).NONPAREIL_TYPE_UATOMONSTER('' + id1);
				// this.lbl_value1.text='合击对怪物伤害+'+bossHurt;
				// let personHurt = SheetConfig.mydb_effect_base_tbl.getInstance(null).NONPAREIL_TYPE_UATOPLAYER('' + id2);
				// this.lbl_value2.text='合击对玩家和弟子伤害+'+personHurt;
				// let HurtTime = SheetConfig.mydb_effect_base_tbl.getInstance(null).NONPAREIL_TYPE_UATOMONSTER('' + id3);
				// this.lbl_value2.text='合击技能回满时间降至'+personHurt;
				console.log('======>效果id', suitID)
				for (let j = 1; j < 9; j++) {
					this['img_part_' + j].skin = 'image/common/daoju/itemicon_' + itemID + '.png';
					itemID = itemID + 1;
				}
			})
		}
		public onclose(): void {
			GameApp.LListener.offCaller(ProtoCmd.Hero_openActiveRunePanel, this);
			this.close();
		}
		// 符文面板发协议
		public init_ranePanel(): void {
			let pkt = new ProtoCmd.QuestClientData;
			pkt.setString(ProtoCmd.Hero_openActiveRunePanel)
			lcp.send(pkt);
		}
		/**
		 * 符文激活||符文交换||符文回收
		 */
		public init_RuneEvent(): void {
			//初始化vbox_rune1||vbox_rune2||vbox_rune3符文列表
			let EquipIn = GameUtil.findEquipInPlayer(EnumData.emEquipPosition.EQUIP_RUNE_UP);
			console.log('=====>装备装备', EquipIn)
			let bag = GameUtil.findFuWenInBag();
			let keys = Object.keys(bag);
			this.vbox_rune1.removeChildren();
			this.vbox_rune2.removeChildren();
			this.vbox_rune3.removeChildren();
			for (let i = 0; i < 10; i++) {
				this.vbox_rune1.addChild(new view.compart.DaoJuGroupItem())
				this.vbox_rune2.addChild(new view.compart.DaoJuGroupItem())
				this.vbox_rune3.addChild(new view.compart.DaoJuGroupItem())
			}
			//根据this.tab_rune.selectedIndex判断vbox
			let vbox = this.vbox_rune1;
			switch (this.tab_rune.selectedIndex) {
				case 1:
					vbox = this.vbox_rune1;
					break;
				case 2:
					vbox = this.vbox_rune2;
					break;
				case 3:
					vbox = this.vbox_rune3;
					break;
			}
			if (EquipIn !== undefined) {
				//把装备里的符文添加到界面
				let EquipInPros = EquipIn.stNpProperty;
				let itemLvl = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMJIESHU('' + EquipIn.dwBaseID);
				this.EquipInRecoveryEvent(itemLvl);
				for (let child of vbox._childs) {
					if (!(child as view.compart.DaoJuGroupItem).checkIsFull()) {
						let item = new view.compart.DaoJuItem();
						item.on(Laya.UIEvent.CLICK, this, () => {
							this.EquipInEvent(EquipIn, EquipInPros)
						})
						item.initUI(EquipIn);
						child.addItem(item);
						break;
					}
				}
			}
			//把背包里的符文添加到界面
			for (let key of keys) {
				let data = bag[key];
				let pros = data.stNpProperty;
				let itemLvl = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMJIESHU('' + data.dwBaseID);
				let item;
				for (let child of vbox._childs) {
					if (!(child as view.compart.DaoJuGroupItem).checkIsFull()) {
						item = new view.compart.DaoJuItem();
						item.initUI(data);
						child.addItem(item);
						break;
					}
				}
				item.on(Laya.UIEvent.CLICK, this, () => {
					this.bagEvent(data, pros)
				})
				this.bagRecoveryEvent(itemLvl);
			}
			this.init_sum()
		}
		/**
		 * 装备符文事件
		 */
		public EquipInEvent(EquipIn, EquipInPros): void {
			//符文激活
			if (this.tab_rune.selectedIndex == 1) {
				//符文展示
				this.box_item.removeChildren();
				let ui_item = new view.compart.DaoJuWithNameItem();
				let itemInfo = new ProtoCmd.ItemBase();
				itemInfo.dwBaseID = EquipIn.dwBaseID;
				ui_item.setData(itemInfo, EnumData.ItemInfoModel.SHOW_NONE);
				this.box_item.addChild(ui_item);
				this.ui_item0.visible = false;
				//符文词条
				this.vbox_item.removeChildren();
				for (let i = 0; EquipInPros[i]; i++) {
					this.vbox_item.addChild(new view.hero.Hero_RuneItem())
				}
			}
			//装备符文交换
			if (this.tab_rune.selectedIndex == 2) {
				//box_exchange1不为空，box_exchange2为空时符文加入box_exchange2
				if (this.box_exchange1._childs.length > 0 && this.box_exchange2._childs.length == 0) {
					let ui_item = new view.compart.DaoJuWithNameItem();
					let itemInfo = new ProtoCmd.ItemBase();
					itemInfo.dwBaseID = EquipIn.dwBaseID;
					ui_item.setData(itemInfo, EnumData.ItemInfoModel.SHOW_NONE);
					this.box_exchange2.addChild(ui_item);
					this.ui_item2.visible = false;
					//符文词条	
					this.vbox_exchange2.removeChildren();
					for (let i = 0; EquipInPros[i]; i++) {
						this.vbox_exchange2.addChild(new view.hero.Hero_RuneItem())
					}
				}
				//box_exchange1为空时，加入符文
				if (this.box_exchange1._childs.length == 0) {
					let ui_item = new view.compart.DaoJuWithNameItem();
					let itemInfo = new ProtoCmd.ItemBase();
					itemInfo.dwBaseID = EquipIn.dwBaseID;
					ui_item.setData(itemInfo, EnumData.ItemInfoModel.SHOW_NONE);
					this.box_exchange1.addChild(ui_item);
					this.ui_item1.visible = false;
					//符文词条
					this.vbox_exchange1.removeChildren();
					for (let i = 0; EquipInPros[i]; i++) {
						this.vbox_exchange1.addChild(new view.hero.Hero_RuneItem())
					}
				}
			}
		}
		/**
		* 背包符文事件
		*/
		public bagEvent(data, pros): void {
			//背包符文激活		
			let ui_item;
			if (this.tab_rune.selectedIndex == 1) {
				//符文展示
				this.box_item.removeChildren();
				ui_item = new view.compart.DaoJuWithNameItem();
				let itemInfo = new ProtoCmd.ItemBase();
				itemInfo.dwBaseID = data.dwBaseID;
				ui_item.setData(itemInfo, EnumData.ItemInfoModel.SHOW_NONE);
				this.box_item.addChild(ui_item);
				this.ui_item0.visible = false;
				//符文词条
				this.vbox_item.removeChildren();
				for (let i = 0; pros[i]; i++) {
					this.vbox_item.addChild(new view.hero.Hero_RuneItem())
				}
			}
			// 背包符文交换
			if (this.tab_rune.selectedIndex == 2) {
				//box_exchange1不为空，box_exchange2为空时符文加入box_exchange2
				if (this.box_exchange1._childs.length > 0 && this.box_exchange2._childs.length == 0) {
					let ui_item = new view.compart.DaoJuWithNameItem();
					let itemInfo = new ProtoCmd.ItemBase();
					itemInfo.dwBaseID = data.dwBaseID;
					ui_item.setData(itemInfo, EnumData.ItemInfoModel.SHOW_NONE);
					this.box_exchange2.addChild(ui_item);
					this.ui_item2.visible = false;
					//符文词条
					this.vbox_exchange2.removeChildren();
					for (let i = 0; pros[i]; i++) {
						this.vbox_exchange2.addChild(new view.hero.Hero_RuneItem())
					}
				}
				//box_exchange1为空时，加入符文
				if (this.box_exchange1._childs.length == 0) {
					let ui_item = new view.compart.DaoJuWithNameItem();
					let itemInfo = new ProtoCmd.ItemBase();
					itemInfo.dwBaseID = data.dwBaseID;
					ui_item.setData(itemInfo, EnumData.ItemInfoModel.SHOW_NONE);
					this.box_exchange1.addChild(ui_item);
					this.ui_item1.visible = false;
					//符文词条
					this.vbox_exchange1.removeChildren();
					for (let i = 0; pros[i]; i++) {
						this.vbox_exchange1.addChild(new view.hero.Hero_RuneItem())
					}
				}
			}
		}
		/**
		 * 装备符文回收界面
		 */
		public EquipInRecoveryEvent(itemLvl): void {
			if (this.tab_rune.selectedIndex == 3) {
				switch (itemLvl) {
					case 0:
						this.sum00 = this.sum00 + 1;
						break;
					case 1:
						this.sum01 = this.sum01 + 1;
						break;
					case 3:
						this.sum02 = this.sum02 + 1;
						break;
					case 4:
						this.sum03 = this.sum03 + 1;
						break;
					case 5:
						this.sum04 = this.sum04 + 1;
						break;
					case 6:
						this.sum05 = this.sum05 + 1;
						break;
					case 7:
						this.sum06 = this.sum06 + 1;
						break;
					case 8:
						this.sum07 = this.sum07 + 1;
						break;
					case 9:
						this.sum08 = this.sum08 + 1;
						break;
					case 10:
						this.sum09 = this.sum09 + 1;
						break;
				}
			}
		}
		/**
		 * 背包符文界面
		 */
		public bagRecoveryEvent(itemLvl): void {
			if (this.tab_rune.selectedIndex == 3) {
				switch (itemLvl) {
					case 0:
						this.sum0 = this.sum0 + 1;
						break;
					case 1:
						this.sum1 = this.sum1 + 1;
						break;
					case 3:
						this.sum2 = this.sum2 + 1;
						break;
					case 4:
						this.sum3 = this.sum3 + 1;
						break;
					case 5:
						this.sum4 = this.sum4 + 1;
						break;
					case 6:
						this.sum5 = this.sum5 + 1;
						break;
					case 7:
						this.sum6 = this.sum6 + 1;
						break;
					case 8:
						this.sum7 = this.sum7 + 1;
						break;
					case 9:
						this.sum8 = this.sum8 + 1;
						break;
					case 10:
						this.sum9 = this.sum9 + 1;
						break;
				}
			}
		}
		//符文分阶数计算总数
		public init_sum(): void {
			let sum0 = this.sum0 + this.sum00;
			let sum1 = this.sum1 + this.sum01;
			let sum2 = this.sum2 + this.sum02;
			let sum3 = this.sum3 + this.sum03;
			let sum4 = this.sum4 + this.sum04;
			let sum5 = this.sum5 + this.sum05;
			let sum6 = this.sum6 + this.sum06;
			let sum7 = this.sum7 + this.sum07;
			let sum8 = this.sum8 + this.sum08;
			let sum9 = this.sum9 + this.sum09;
			this.lbl_recovery_0.text = '(' + sum0 + ')';
			this.lbl_recovery_1.text = '(' + sum1 + ')';
			this.lbl_recovery_2.text = '(' + sum2 + ')';
			this.lbl_recovery_3.text = '(' + sum3 + ')';
			this.lbl_recovery_4.text = '(' + sum4 + ')';
			this.lbl_recovery_5.text = '(' + sum5 + ')';
			this.lbl_recovery_6.text = '(' + sum6 + ')';
			this.lbl_recovery_7.text = '(' + sum7 + ')';
			this.lbl_recovery_8.text = '(' + sum8 + ')';
			this.lbl_recovery_9.text = '(' + sum9 + ')';

		}
		/**
		 * 符文全部回收发协议
		 */
		public init_Allrecovery(): void {
			for (let i = 0; i < 11; i++) {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.Hero_runeRecycle, [i])
				lcp.send(pkt);
			}
		}
	}
}