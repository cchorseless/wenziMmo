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
			this.img_npcPic.skin = 'image/common/npc/npc_half_' + iconID + '.png';
			this.lbl_npcDes0.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_DES1(configId);
			this.lbl_npcDes1.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_DES2(configId);
			let nickName = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_NICKNAME(configId);
			if (nickName != '0') { this.lbl_nickname.text = '(' + nickName + ')'; }
			let commonName = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME(configId);
			this.lbl_npcName.text = commonName;
			// 喜好
			let xiHaoItem = SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_LOVE(configId);
			for (let _itemId of xiHaoItem) {
				let _itembase = new ProtoCmd.ItemBase();
				_itembase.dwBaseID = _itemId;
				let itemUI = new view.compart.DaoJuWithNameItem();
				itemUI.setData(_itembase);
				this.hbox_0.addChild(itemUI);
			}
			// 装备
			let equipItem = SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_EQUIP(configId);
			for (let _itemId of equipItem) {
				let itemUI = new view.compart.DaoJuWithNameItem();
				let _itembase = new ProtoCmd.ItemBase();
				_itembase.dwBaseID = _itemId;
				itemUI.setData(_itembase);
				this.hbox_1.addChild(itemUI);
			}
			// 宝物
			let BAOWUItem = SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_BAOWU(configId);
			for (let _itemId of BAOWUItem) {
				let itemUI = new view.compart.DaoJuWithNameItem();
				let _itembase = new ProtoCmd.ItemBase();
				_itembase.dwBaseID = _itemId;
				itemUI.setData(_itembase);
				this.hbox_2.addChild(itemUI);
			}

			this.addEvent();
			return this
		}
		public addEvent(): void {
			EventManage.onWithEffect(this.btn_close, Laya.UIEvent.CLICK, this, () => { this.close() });
		}
	}
}