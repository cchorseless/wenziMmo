/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_BuildEquipDialog extends ui.juese.Person_BuildEquipDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public equipInfo;
		public jobEquip1 = [];
		public jobEquip2 = [];
		public jobEquip3 = [];
		public job = 1;
		public setData(): void {
			this.panel_equip.hScrollBarSkin = '';
			this.hbox_equip['sortItem'] = (items) => { };
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
				let daojuData = SheetConfig.mydb_item_base_tbl.getInstance(null).GRTALLDATA(key);
				//职业
				switch (daojuData[11]) {
					case 1:
						//隐门传人所有装备
						this.jobEquip1.push(daojuData);
						break;
					case 2:
						//奇侠怪盗所有装备
						this.jobEquip2.push(daojuData);
						break;
					case 3:
						//神秘孤儿所有装备
						this.jobEquip3.push(daojuData);
						break;
				}
			}
			this.addEvent();
			this.init_euipInfo(0);
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
					break;
				case 1:
					lvl = 70;
					break;
				case 2:
					lvl = 1;
					break;
				case 3:
					lvl = 3;
					break;
				case 4:
					lvl = 5;
					break;
				case 5:
					lvl = 7;
					break;
				case 6:
					lvl = 9;
					break;
				case 7:
					lvl = 11;
					break;
				case 8:
					lvl = EnumData.emRareType.RARE_TYPE_LEGEND;
					break;
				case 9:
					lvl = EnumData.emRareType.RARE_TYPE_GOD;
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
						if (item[67] == 0 && item[3] == lvl) {
							this.hbox_equip.addChild(new view.juese.Person_BuildEquipItem().setData(item))
						}
					}
					if (num > 2 && num < 8) {
						//转生等级为lvl
						if (item[67] == lvl) {
							this.hbox_equip.addChild(new view.juese.Person_BuildEquipItem().setData(item))
						}
					}
					if (num >= 8) {
						//装备品质为lvl
						if (item[6] == lvl) {
							this.hbox_equip.addChild(new view.juese.Person_BuildEquipItem().setData(item))
						}
					}
				}
			}
			// this.init_dangqian();
		}
		// public init_dangqian(id = null): void {
		// 	//当前装备选中状态显示
		// 	for (let item of this.hbox_equip._childs) {
		// 		item.img_light.visible = false;
		// 	}
		// 	if (id == null) {
		// 		this.hbox_equip._childs[0].img_light.visible = true;
		// 	} else {
		// 		for (let item of this.hbox_equip._childs) {
		// 			if (item.data[0] == id) {
		// 				item.img_light.visible = true;

		// 			}
		// 		}
		// 	}
		// 	//当前装备打造信息
		// 	let keys = Object.keys(this.equipInfo);
		// 	for (let key of keys) {
		// 		if (id == key) {
		// 			let equipData = this.equipInfo[key];
		// 		}
		// 	}
		// 	//equipFabricate(baseid, i64Ids, status) 要打造的装备ID, 要消耗的物品64ID, 状态0不附加材料,1附加材料
		// 	//111`11
		// }
	}
}