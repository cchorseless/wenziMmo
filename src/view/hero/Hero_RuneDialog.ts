/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_RuneDialog extends ui.hero.Hero_RuneDialogUI {
		constructor() {
			super();
		}
		//激活符文
		public runeid: ProtoCmd.ItemBase;
		//激活符文类型（0背包1身上）；
		public type;
		//交换符文1
		public runeid1: ProtoCmd.ItemBase;
		//交换符文类型1（0背包1身上）；
		public type1;
		//交换符文2
		public runeid2: ProtoCmd.ItemBase;
		//交换符文类型2（0背包1身上）；
		public type2;
		public setData(job): Hero_RuneDialog {
			// //弟子职业
			// switch (job) {
			// 	case 1:
			// 		this.type = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB1_EFFICTID;
			// 		break;
			// 	case 2:
			// 		this.type = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB2_EFFICTID;
			// 		break;
			// 	case 3:
			// 		this.type = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB3_EFFICTID;
			// 		break;
			// }
			this.tab_rune.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_rune.selectedIndex = index;
				if (index > 0) {
					this.init_RuneBagEvent();
				}
			}, null, false);
			this.panel_view.hScrollBarSkin = '';
			this.hbox_view['sortItem'] = (items) => { };
			this.panel_activation.vScrollBarSkin = '';
			this.vbox_rune1['sortItem'] = (items) => { };
			this.panel_exchange.vScrollBarSkin = '';
			this.vbox_rune2['sortItem'] = (items) => { };
			this.panel_recovery.vScrollBarSkin = '';
			this.vbox_rune3['sortItem'] = (items) => { };
			// //初始化item
			this.ui_item1.ui_item.img_item.skin = '';
			this.ui_item2.ui_item.img_item.skin = '';
			for (let j = 0; j < 6; j++) {
				this.vbox_item.addChild(new view.hero.Hero_RuneItem());
			}
			this.addEvent();
			let i = 1;
			this.init_view(i);
			this.init_ranePanel();
			return this;
		}
		public addEvent(): void {
			//关闭弹窗
			this.btn_close.on(Laya.UIEvent.CLICK, this, this.onclose);
			//符文激活
			this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
				this.init_activation();
			})
			// 符文交换卸下符文
			for (let i = 1; i < 3; i++) {
				this['ui_item' + i].on(Laya.UIEvent.CLICK, this, () => {
					this.init_takeOffEvent(i);
				})
			}
			//符文预览
			for (let i = 1; i < 11; i++) {
				this['box_' + i].on(Laya.UIEvent.CLICK, this, () => {
					this.init_ranePanel();
					this.init_view(i);
				})
			}
			//符文碎片属性
			for (let i = 1; i < 9; i++) {
				this['img_part_' + i].on(Laya.UIEvent.CLICK, this, () => {
					new view.hero.Hero_RunePartDialog().setData().popup();
				})
			}
			//全部回收
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
		 * 符文背包
		 */
		public init_RuneBagEvent(): void {
			this.vbox_rune1.removeChildren();
			this.vbox_rune2.removeChildren();
			this.vbox_rune3.removeChildren();
			//初始化vbox_rune1||vbox_rune2||vbox_rune3符文列表
			//玩家身上的符文
			let playridArray = [];
			for (let i = EnumData.emEquipPosition.EQUIP_RUNE_UP; i < (EnumData.emEquipPosition.EQUIP_RUNE_UPLEFT + 1); i++) {
				let id = GameUtil.findEquipInPlayer(i);
				if (id) {
					playridArray.push(id);
				}
			}
			let infos = Object.keys(playridArray);
			//玩家背包里的符文
			let bag = GameUtil.findFuWenInBag();
			let keys = Object.keys(bag);
			//符文总数量
			let lengthNum = infos.length + keys.length;
			//符文总行数
			let rowNum = Math.ceil(lengthNum / 6);
			let row = 6;
			//如果符文有5行以上初始化DaoJuGroupItem的数量
			if (rowNum >= 5) {
				row = rowNum;
			}
			for (let i = 0; i < row; i++) {
				this.vbox_rune1.addChild(new view.compart.DaoJuGroupItem())
				this.vbox_rune2.addChild(new view.compart.DaoJuGroupItem())
				this.vbox_rune3.addChild(new view.compart.DaoJuGroupItem())
			}
			//根据this.tab_rune.selectedIndex判断vbox
			let vbox;
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
			//符文类型（0背包；1身上）
			let type;
			if (playridArray.length > 0) {
				//把装备里的符文添加到界面
				for (let info of infos) {
					type = 1;
					let itemLvl = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMJIESHU('' + playridArray[info].dwBaseID);
					let EquipInPros = playridArray[info].stNpProperty;
					// this.EquipInRecoveryEvent(itemLvl);
					for (let child of vbox._childs) {
						if (!(child as view.compart.DaoJuGroupItem).checkIsFull()) {
							let item = new view.compart.DaoJuItem();
							item.on(Laya.UIEvent.CLICK, this, () => {
								this.init_runeEvent(playridArray[info], EquipInPros, type)
							})
							item.initUI(playridArray[info]);
							child.addItem(item);
							break;
						}
					}
				}
			}
			//把背包里的符文添加到界面
			for (let key of keys) {
				type = 0;
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
					this.init_runeEvent(data, pros, type)
				})
			}
		}
		/**
		* 符文事件
		*/
		public init_runeEvent(data, pros, type): void {
			this.vbox_item.removeChildren();
			for (let i = 0; i < 6; i++) {
				this.vbox_item.addChild(new view.hero.Hero_RuneItem());
			}
			let jipinArray = [];
			for (let i = 0; pros[i]; i++) {
				let j = i + 1;
				if (pros[j] !== undefined) {
					if (pros[i].btNpFrom == pros[j].btNpFrom) {
						let des = pros[i].btdes + '-' + pros[j].dwNpNum;
						jipinArray.push(des);
						i = i + 1;
					}
					else {
						jipinArray.push(pros[i].btdes);
					}
				}
				else {
					jipinArray.push(pros[i].btdes);
				}
			}
			//背包符文激活		
			if (this.tab_rune.selectedIndex == 1) {
				//符文展示
				this.box_item.removeChildren();
				let itemInfo = new ProtoCmd.ItemBase();
				itemInfo.dwBaseID = data.dwBaseID;
				this.ui_item0.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				this.runeid = data;
				this.type = type;
				//符文词条
				this.lbl_shanghai.text=''+jipinArray[0];
				for (let i = 1; jipinArray[i]; i++) {
					let index=i-1;
					this.vbox_item._childs[index].setData(jipinArray[i])
				}
			}
			// 背包符文交换
			if (this.tab_rune.selectedIndex == 2) {
				// ui_item1不为空，ui_item2为空时符文加入ui_item2
				if (this.ui_item1.name == '1' && this.ui_item2.name !== '1') {
					this.ui_item2.name = '1';
					this.runeid2 = data;
					this.type2 = type;
					let itemInfo = new ProtoCmd.ItemBase();
					//符文信息
					itemInfo.dwBaseID = data.dwBaseID;
					itemInfo.dwCount = data.dwCount;
					itemInfo.dwBinding = data.dwBinding;
					this.ui_item2.setData(itemInfo, EnumData.ItemInfoModel.SHOW_NONE);
					//符文极品属性
					this.vbox_exchange2.removeChildren();
					for (let i = 0; jipinArray[i]; i++) {
						this.vbox_exchange2.addChild(new view.hero.Hero_RuneItem().setData(jipinArray[i]))
					}
				}
				//ui_item1为空时，加入符文
				if (this.ui_item1.name !== '1') {
					this.ui_item1.name = '1';
					this.runeid1 = data;
					this.type1 = type;
					let itemInfo = new ProtoCmd.ItemBase();
					//符文信息
					itemInfo.dwBaseID = data.dwBaseID;
					itemInfo.dwCount = data.dwCount;
					itemInfo.dwBinding = data.dwBinding;
					this.ui_item1.setData(itemInfo, EnumData.ItemInfoModel.SHOW_NONE);
					//符文极品属性
					this.vbox_exchange1.removeChildren();
					for (let i = 0; jipinArray[i]; i++) {
						this.vbox_exchange1.addChild(new view.hero.Hero_RuneItem().setData(jipinArray[i]))
					}
				}
			}
		}
		/**
		 * 符文激活
		 */
		public init_activation(): void {
			if (this.runeid !== undefined && this.type !== undefined) {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.Hero_activeRuneExProperty, [this.runeid.i64ItemID, this.type])
				lcp.send(pkt);
			}
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
		/**
		 * 
		 * @param i 卸下交换框里的符文
		 */
		public init_takeOffEvent(i): void {
			if (this['ui_item' + i].name == '1') {
				this['ui_item' + i].name = '';
				this['ui_item' + i].ui_item.img_item.skin = '';
				this['ui_item' + i].lbl_itemName.text = '';
				this['vbox_exchange' + i].removeChildren();
			}
		}
	}
}