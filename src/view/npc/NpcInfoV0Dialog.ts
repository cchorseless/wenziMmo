/**Created by the LayaAirIDE*/
module view.npc {
	export class NpcInfoV0Dialog extends ui.npc.NpcInfoV0DialogUI {
		constructor() {
			super();
		}

		public setData(configId: string): NpcInfoV0Dialog {
			if (configId == null) { return }
			this.tab_0.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_0.selectedIndex = index;
			}, null, false);
			for (let i = 0; i < 2; i++) {
				this['panel_' + i].hScrollBarSkin = '';
				this['hbox_' + i]['sortItem'] = (items) => { };
			};
			let iconID = SheetConfig.mydb_npcgen_tbl.getInstance(null).ICON_NUMBER(configId)
			this.img_npcPic.skin = PathUtil.getNpcHalfPath(iconID);
			this.lbl_npcDes0.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_DES1(configId);
			this.lbl_npcDes1.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_DES2(configId);
			let nickName = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_NICKNAME(configId);
			if (nickName != '0') { this.lbl_nickname.text = '(' + nickName + ')'; }
			let commonName = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME(configId);
			this.lbl_npcName.text = commonName.split('_')[0];
			// 喜好
			let xiHaoItem = SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_LOVE(configId);
			for (let _itemId of xiHaoItem) {
				if (_itemId) {
					let _itembase = new ProtoCmd.ItemBase();
					_itembase.dwBaseID = parseInt(_itemId);
					let itemUI = new view.compart.DaoJuWithNameItem();
					itemUI.setData(_itembase);
					this.hbox_0.addChild(itemUI);
				}
			}
			// 装备
			let equipItem = SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_EQUIP(configId);
			for (let _itemId of equipItem) {
				if (_itemId) {
					let itemUI = new view.compart.DaoJuWithNameItem();
					let _itembase = new ProtoCmd.ItemBase();
					_itembase.dwBaseID = parseInt(_itemId) ;
					itemUI.setData(_itembase);
					this.hbox_1.addChild(itemUI);
				}
			}
			// 宝物
			let BAOWUItem = SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_BAOWU(configId);
			for (let _itemId of BAOWUItem) {
				if (_itemId) {
					let itemUI = new view.compart.DaoJuWithNameItem();
					let _itembase = new ProtoCmd.ItemBase();
					_itembase.dwBaseID = parseInt(_itemId);
					itemUI.setData(_itembase);
					this.hbox_2.addChild(itemUI);
				}
			}

			this.addEvent();
			return this
		}
		public addEvent(): void {
			EventManage.onWithEffect(this.btn_close, Laya.UIEvent.CLICK, this, () => { this.close() });
		}
	}
}