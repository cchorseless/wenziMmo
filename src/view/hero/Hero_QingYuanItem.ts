/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_QingYuanItem extends ui.hero.Hero_QingYuanItemUI {
		constructor() {
			super();
		}
		public type;
		//被选中的item
		public selectItem;
		//交换符文1
		public runeid1: ProtoCmd.ItemBase;
		//交换符文类型1（0背包1身上）；
		public type1;
		//交换符文2
		public runeid2: ProtoCmd.ItemBase;
		//交换符文类型2（0背包1身上）；
		public type2;
		//符文交换位置1
		public pos1;
		//符文交换位置2
		public pos2;
		public setData(): void {
			this.tab_rune.selectHandler = Laya.Handler.create(this, (index) => {
				this.view_rune.selectedIndex = index;
				this.init_selectItem();
			}, null, false);
			for (let j = 0; j < 6; j++) {
				this.vbox_item.addChild(new view.hero.Hero_QingYuanActiveItem());
				this.vbox_exchange1.addChild(new view.hero.Hero_RuneItem());
				this.vbox_exchange2.addChild(new view.hero.Hero_RuneItem());
			}
			this.addEvent();
			this.init_RuneBagEvent();
			this.init_selectItem();
		}
		public addEvent(): void {
			this.btn_shuxing.on(Laya.UIEvent.CLICK, this, () => {
				new view.hero.Hero_RuneDialog().setData().popup(true);
			})
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
			//符文交換
			this.btn_exchange.on(Laya.UIEvent.CLICK, this, () => {
				this.init_exchangeEvent();
			})
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
			this.list_rune.vScrollBarSkin = '';
			this.list_rune.array = [];
			this.list_rune.vScrollBarSkin = '';
			//装备位置
			// let posArray = [];
			//玩家身上的符文
			let runeInSelf = [];
			for (let i = EnumData.emEquipPosition.EQUIP_RUNE_UP; i < (EnumData.emEquipPosition.EQUIP_RUNE_UPLEFT + 1); i++) {
				let data: ProtoCmd.ItemBase = GameUtil.findEquipInPlayer(i);
				if (data) {
					let jobLimit = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMJOB('' + data.dwBaseID)
					runeInSelf.push(data);
					// posArray.push({ pos: i, pingfen: id.battleScore[jobLimit] });
				}
			}
			//玩家背包里的符文
			let runeInBag = GameUtil.findFuWenInBag();
			let runeArray = [];
			//身上的符文
			for (let inSelf of runeInSelf) {
				runeArray.push({ data: inSelf, type: 0 });
			}
			//背包里的符文
			for (let inBag of runeInBag) {
				runeArray.push({ data: inBag, type: 1 });
			}
			//符文总行数
			let rowNum = Math.ceil(runeArray.length / 5);
			let row = 20;
			//如果符文有4行以上初始化DaoJuGroupV0Item的数量
			if (rowNum >= 4) {
				row = rowNum * 5;
			}
			for (let i = 0; i < row; i++) {
				this.list_rune.array.push(i);
			}
			for (let index in runeArray) {
				let itemInfo = new ProtoCmd.ItemBase;
				itemInfo.clone(runeArray[index].data.data);
				runeArray[index].data = itemInfo;
				this.list_rune.array[index] = runeArray[index];
			}
			let num = -1;
			this.list_rune.itemRender = view.compart.DaoJuBgV0Item;
			this.list_rune.renderHandler = Laya.Handler.create(this, (cell: view.compart.DaoJuBgV0Item, index) => {
				num += 1;
				cell.setData(cell.dataSource, num);
			}, null, false)
			//符文类型（0身上；1背包）
		}
		/**
		 * 符文选中状态
		 */
		public init_selectItem(): void {
			if (this.tab_rune.selectedIndex == 3) {
				this.img_bg.height = 455;
				this.list_rune.height = 450;
			} else {
				this.img_bg.height = 308;
				this.list_rune.height = 300;
			}
			//初始化选中状态
			for (let child in this.list_rune.cells) {
				let listData = this.list_rune.cells
				listData[child].img_light.visible = false;
			}
			//type符文类型0身上1背包,index点击符文索引
			GameApp.LListener.on(ProtoCmd.Hero_runeSelect, this, (type: number, index: number) => {
				for (let child in this.list_rune.cells) {
					let listData = this.list_rune.cells;
					if (parseInt(child) == index) {
						//搭配界面且选中符文已在身上
						if (this.tab_rune.selectedIndex == 0 && type == 0) {
							TipsManage.showTips('该符文已穿戴');
							listData[child].img_light.visible = false;
						} else if (this.tab_rune.selectedIndex != 3) {
							listData[child].img_light.visible = true;
							this.selectItem = listData[child].item;
							this.type=listData[child].item.type;
						}
					} else {
						listData[child].img_light.visible = false;
					}
				}
				switch (this.tab_rune.selectedIndex) {
					case 0:
						this.init_DressEvent();
						break;
					case 1:
						this.init_ActiveEvent();
						break;
					case 2:
						this.init_ChangeEvent();
						break;
				}
			});
		}
		/**
		 * 搭配
		 */
		public init_DressEvent(): void {

		}
		/**
		 * 激活
		 */
		public init_ActiveEvent(): void {
			let data = this.selectItem.data;
			//符文极品属性
			let pros = data.stNpProperty;
			this.vbox_item.removeChildren();
			for (let i = 0; i < 6; i++) {
				this.vbox_item.addChild(new view.hero.Hero_QingYuanActiveItem());
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
			//符文展示
			let itemInfo = new ProtoCmd.ItemBase();
			itemInfo.clone(data.data);
			this.ui_item0.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL);
			//极品属性显示
			let label = labelArray[0].btdes.split('上');
			if (label[1]) {
				this.lbl_shanghai.text = label[0] + ':' + singleArray[0].dwNpNum;

			} else {
				let label1 = labelArray[0].btdes.split(':');
				this.lbl_shanghai.text = label1[0] + ':' + singleArray[0].dwNpNum;
			}
			for (let i = 1; singleArray[i]; i++) {
				let index = i - 1;
				this.vbox_item._childs[index].setData(singleArray[i], labelArray[i].btdes)
			}
		}
		/**
	  * 符文激活
	  */
		public init_activation(): void {
			if (this.selectItem.data != undefined && this.type != undefined) {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.Hero_activeRuneExProperty, [this.selectItem.data.i64ItemID, this.type])
				lcp.send(pkt);
			}
		}
		/**
		 * 交换
		 */
		public init_ChangeEvent(): void {
			let boxNum;
			let data = this.selectItem.data;
			let type = this.selectItem.type;
			//符文极品属性
			let pros = data.stNpProperty;
			let pos;
			this.vbox_item.removeChildren();
			for (let i = 0; i < 6; i++) {
				this.vbox_item.addChild(new view.hero.Hero_QingYuanActiveItem());
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
			// ui_item1不为空，ui_item2为空时符文加入ui_item2
			if (this.ui_item1.name == '1' && this.ui_item2.name != '1') {
				this.ui_item2.name = '1';
				this.runeid2 = data;
				this.type2 = type;
				//符文信息
				let itemInfo = new ProtoCmd.ItemBase();
				itemInfo.clone(data.data);
				this.ui_item2.setData(itemInfo, EnumData.ItemInfoModel.SHOW_NONE);
				//符文极品属性
				let label = labelArray[0].btdes.split('上');
				for (let i = 1; singleArray[i]; i++) {
					let index = i - 1;
					pos = i + 1;
					boxNum = 2;
					this.vbox_exchange2._childs[index].setData(singleArray[i], labelArray[i].btdes, this.tab_rune.selectedIndex, boxNum, this)
				}
			}
			//ui_item1为空时，加入符文
			if (this.ui_item1.name != '1') {
				this.ui_item1.name = '1';
				this.runeid1 = data;
				this.type1 = type;
				//符文信息
				let itemInfo = new ProtoCmd.ItemBase();
				itemInfo.clone(data.data);
				this.ui_item1.setData(itemInfo, EnumData.ItemInfoModel.SHOW_NONE);
				for (let i = 1; singleArray[i]; i++) {
					let index = i - 1;
					pos = i + 1;
					boxNum = 1;
					this.vbox_exchange1._childs[index].setData(singleArray[i], labelArray[i].btdes, this.tab_rune.selectedIndex, boxNum, this)
				}
			}
		}
		/**
* 符文交换位置
* @param num 
* @param boxNum 
*/
		public init_exchangeBtn(num, boxNum): void {
			for (let child of this['vbox_exchange' + boxNum]._childs) {
				child.btn_choose.selected = false;
			}
			this['vbox_exchange' + boxNum]._childs[num].btn_choose.selected = true;
			this['vbox_exchange' + boxNum]._childs[num].btn_choose.skin = 'image/juese/frame_list _suxing4.png';
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
	  * 符文交换
	  */
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
		/**
		 * 回收
		 */
		public init_RecoveryEvent(): void {

		}

	}
}