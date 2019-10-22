/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_RuneDialog extends ui.hero.Hero_RuneDialogUI {
		constructor() {
			super();
		}
		//效果id类型
		public type;
		public setData(job): Hero_RuneDialog {
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
			}, null, false);
			this.panel_view.hScrollBarSkin = '';
			this.hbox_view['sortItem'] = (items) => { };
			this.panel_activation.vScrollBarSkin = '';
			this.vbox_activation['sortItem'] = (items) => { };
			this.addEvent();
			let i = 1;
			this.init_view(i);
			this.init_Activation();
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			for (let i = 1; i < 11; i++) {
				this['box_' + i].on(Laya.UIEvent.CLICK, this, () => {
					this.init_view(i);

				})
			}
			for (let i = 1; i < 9; i++) {
				this['img_part_' + i].on(Laya.UIEvent.CLICK, this, () => {
					new view.hero.Hero_RunePartDialog().setData().show();

				})
			}

		}
		/**
		 * 符文预览
		 */
		public init_view(i): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_openActiveRunePanel, null, null, this, (jsonData) => {
				let itemID = jsonData.viewtab[i]
				let suitID = SheetConfig.mydb_item_base_tbl.getInstance(null).SUIT_EFFICTID('' + jsonData.viewtab[i]);
				// let boss = SheetConfig.mydb_effect_base_tbl.getInstance(null).SUIT_EFFICTID('' + suitID);
				console.log('======>效果id', suitID)
				for (let j = 1; j < 9; j++) {
					this['img_part_' + j].skin = 'image/common/daoju/itemicon_' + itemID + '.png';
					itemID = itemID + 1;
				}

			})
			lcp.send(pkt);
		}
		/**
		 * 符文激活
		 */
		public init_Activation(): void {
			let EquipIn = GameUtil.findEquipInPlayer(EnumData.emEquipPosition.EQUIP_RUNE_UP);
			let bag = GameUtil.findFuWenInBag();
			let keys = Object.keys(bag);
			let sum = (bag.length + EquipIn.dwCount) / 6
			let group = Math.ceil(sum);
			this.vbox_activation.removeChildren();
			for (let i = 0; i < group; i++) {
				this.vbox_activation.addChild(new view.compart.DaoJuGroupItem())
			}
		//装备里的符文
			for (let child of this.vbox_activation._childs) {
				if (!(child as view.compart.DaoJuGroupItem).checkIsFull()) {
					let item = new view.compart.DaoJuItem();
					item.on(Laya.UIEvent.CLICK,this,()=>{
							
						})
					item.initUI(EquipIn);
					child.addItem(item);
					break;
				}
			}
			//背包里的符文
			for (let key of keys) {
				let data = bag[key];
				let pros = data.stNpProperty;
				for (let child of this.vbox_activation._childs) {
					if (!(child as view.compart.DaoJuGroupItem).checkIsFull()) {
						let item = new view.compart.DaoJuItem();
						item.initUI(data);
						item.on(Laya.UIEvent.CLICK,this,()=>{

						})
						child.addItem(item);
						break;
					}
				}
			}
console.log('====>弟子符文包', bag,'=====>装备',EquipIn)
		}
	}
}