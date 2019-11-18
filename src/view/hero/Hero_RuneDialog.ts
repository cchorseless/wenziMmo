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
		public pos1;
		public pos2;
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
			for (let i = 0; i < 3; i++) {
				this['ui_item' + i].ui_item.img_item.skin = '';
				this['ui_item' + i].ui_item.lbl_count.text = '';
			}
			for (let j = 0; j < 6; j++) {
				this.vbox_item.addChild(new view.hero.Hero_RuneItem());
				this.vbox_exchange1.addChild(new view.hero.Hero_RuneItem());
				this.vbox_exchange2.addChild(new view.hero.Hero_RuneItem());
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
			//符文交換
			this.btn_exchange.on(Laya.UIEvent.CLICK, this, () => {
				this.init_exchangeEvent();
			})
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
				//符文精华
				this.lbl_have.text = this.lbl_exchangeHave.text = jsonData.score;
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
				for (let child of this.vbox_exchange1._childs) {
					child.btn_choose.selected = false;
				}
				for (let child of this.vbox_exchange2._childs) {
					child.btn_choose.selected = false;
				}
				this.pos1=null;
				this.pos2=null
				if (this.tab_rune.selectedIndex > 0 && this.runeid !== undefined) {
					this.init_runeEvent(this.runeid, this.type)
				}
				if (this.tab_rune.selectedIndex == 2 && this.runeid1 !== undefined) {
					this.ui_item1.name = '';
					this.init_runeEvent(this.runeid1, this.type1)
				}
				if (this.tab_rune.selectedIndex == 2 && this.runeid2 !== undefined) {
					this.ui_item2.name = '';
					this.init_runeEvent(this.runeid2, this.type2)
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
					let itemLvl = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMJIESHU('' + playridArray[info].dwBaseID);
					// this.EquipInRecoveryEvent(itemLvl);
					for (let child of vbox._childs) {
						if (!(child as view.compart.DaoJuGroupItem).checkIsFull()) {
							let item = new view.compart.DaoJuItem();
							item.on(Laya.UIEvent.CLICK, this, () => {
								type = 1;
								this.init_runeEvent(playridArray[info], type)
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
				let data = bag[key];
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
					type = 0;
					this.init_runeEvent(data, type)
				})
			}
		}
		/**
		* 符文点击事件
		*/
		public init_runeEvent(data, type): void {
			let boxNum;
			let pros = data.stNpProperty;
			let pos;
			this.vbox_item.removeChildren();
			for (let i = 0; i < 6; i++) {
				this.vbox_item.addChild(new view.hero.Hero_RuneItem());
			}
			let labelArray = [];
			let singleArray = [];
			for (let runeObj of pros) {
				let find = false;
				for (let singleObj of singleArray) {
					if (runeObj.btNpFrom == singleObj.btNpFrom) {
						singleObj.dwNpNum = runeObj.dwNpNum + '-' + singleObj.dwNpNum;
						find = true;
					}
				}
				if (!find) {
					labelArray.push(runeObj);
					singleArray.push(JSON.parse(JSON.stringify(runeObj)));
				}
			}
			//根據位置排序
			function compare(property) {
				return function (a, b) {
					var value1 = a[property];
					var value2 = b[property];
					return value1 - value2;
				}
			}
			singleArray = singleArray.sort(compare('btNpFrom'))
			labelArray = labelArray.sort(compare('btNpFrom'))
			//背包符文激活		
			if (this.tab_rune.selectedIndex == 1) {
				this.type = type;
				//符文展示
				this.box_item.removeChildren();
				let itemInfo = new ProtoCmd.ItemBase();
				itemInfo.dwBaseID = data.dwBaseID;
				this.ui_item0.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				this.runeid = data;
				//极品属性
				let label = labelArray[0].btdes.split('上');
				if (label[1]) {
					this.lbl_shanghai.text = label[0] + ':' + singleArray[0].dwNpNum;

				} else {
					let label1 = labelArray[0].btdes.split(':');
					this.lbl_shanghai.text = label1[0] + ':' + singleArray[0].dwNpNum;
				}
				for (let i = 1; singleArray[i]; i++) {
					let index = i - 1;
					pos = i + 1;
					boxNum = 0;
					this.vbox_item._childs[index].setData(singleArray[i], labelArray[i].btdes, this.tab_rune.selectedIndex, boxNum, this)
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
					let label = labelArray[0].btdes.split('上');
					if (label[1]) {
						this.lbl_shuxing02.text = label[0] + ':' + singleArray[0].dwNpNum;

					} else {
						let label1 = labelArray[0].btdes.split(':');
						this.lbl_shuxing02.text = label1[0] + ':' + singleArray[0].dwNpNum;
					}
					for (let i = 1; singleArray[i]; i++) {
						let index = i - 1;
						pos = i + 1;
						boxNum = 2;
						this.vbox_exchange2._childs[index].setData(singleArray[i], labelArray[i].btdes, this.tab_rune.selectedIndex, boxNum, this)
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
					let label = labelArray[0].btdes.split('上');
					if (label[1]) {
						this.lbl_shuxing01.text = label[0] + ':' + singleArray[0].dwNpNum;

					} else {
						let label1 = labelArray[0].btdes.split(':');
						this.lbl_shuxing01.text = label1[0] + ':' + singleArray[0].dwNpNum;
					}
					for (let i = 1; singleArray[i]; i++) {
						let index = i - 1;
						pos = i + 1;
						boxNum = 1;
						this.vbox_exchange1._childs[index].setData(singleArray[i], labelArray[i].btdes, this.tab_rune.selectedIndex, boxNum, this)
					}
				}
			}
			this.init_runeAttribute(data.dwBaseID, pos)
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
				this['lbl_shuxing0' + i].text = '';
				for (let child of this['vbox_exchange' + i]._childs) {
					child.lbl_name.text = '';
					child.view_single.selectedIndex = 0;
				}
			}
		}
		/**
		 * 符文属性
		 */
		public init_runeAttribute(id: number, pos: number): void {
			let jieshu = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMJIESHU('' + id);
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_clickRunePreperty, [jieshu, pos], null, this, (jsonData) => {
				console.log('=====》符文属性', jsonData);
				this.lbl_use.text = jsonData.need;
			})
			lcp.send(pkt);
		}
		public init_exchangeBtn(num, boxNum): void {
			for (let child of this['vbox_exchange' + boxNum]._childs) {
				child.btn_choose.selected = false;
			}
			this['vbox_exchange' + boxNum]._childs[num].btn_choose.selected = true;

			let keys1 = Object.keys(this.vbox_exchange1._childs);
			for (let key1 of keys1) {
				if (this.vbox_exchange1._childs[key1].btn_choose.selected) {
					this.pos1 = parseInt(key1) + 1;
				}
			}
			let keys2 = Object.keys(this.vbox_exchange2._childs);
			for (let key2 of keys2) {
				if (this.vbox_exchange2._childs[key2].btn_choose.selected) {
					this.pos2 = parseInt(key2) + 1;
				}
			}

		}
		public init_exchangeEvent(): void {
			//交換屬性
			if (this.runeid1 && this.runeid2 && this.pos1 && this.pos2) {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.Hero_exchangeRuneproperty, [this.runeid1.i64ItemID, this.type1, this.pos1, this.runeid2.i64ItemID, this.type2, this.pos2])
				lcp.send(pkt);
			}
			else {
				TipsManage.showTips('交换条件不足')
			}
		}
	}
}