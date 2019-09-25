/**Created by the LayaAirIDE*/
module view.dialog {
	export class NpcInfoV0Dialog extends ui.dialog.NpcInfoV0DialogUI {
		constructor() {
			super();
		}

		public setData(configId:string): NpcInfoV0Dialog {
			if (configId == null) { return }
			this.tab_0.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_0.selectedIndex = index;
			}, null, false);
			for (let i = 0; i < 2; i++) {
				this['panel_' + i].hScrollBarSkin = '';
				this['hbox_' + i]['sortItem'] = (items) => { };
			};
			this.img_npcPic.skin = 'image/common/npc/npc_half_' + configId + '.png';
			this.lbl_npcDes0.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_DES1(configId);
			this.lbl_npcDes1.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_DES2(configId);
			let nickName = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_NICKNAME(configId);
			let commonName = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME(configId);
			this.lbl_npcName.text = commonName;
			// // 喜好
			// let xiHaoItem = SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_LOVE(configId);
			// console.log(xiHaoItem)
			// for (let itemid0 of xiHaoItem) {
			// 	let itemUI = new view.compart.DaoJuWithNameItem();
			// 	let xihaoItemInfo = new ProtoCmd.ItemBase();
			// 	xihaoItemInfo.dwBaseID = itemid0;
			// 	itemUI.setData(xihaoItemInfo);
			// 	this.hbox_0.addChild(itemUI);
			// }
			// // 宝物
			// let baowuItem = SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_BAOWUID(configId);
			// for (let itemid1 of baowuItem) {
			// 	let itemUI = new view.compart.DaoJuWithNameItem();
			// 	let baowuItemInfo = new ProtoCmd.ItemBase();
			// 	baowuItemInfo.dwBaseID = itemid1;
			// 	itemUI.setData(baowuItemInfo);
			// 	this.hbox_1.addChild(itemUI);
			// }
			// // 装备
			// let equipItem = SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_EQUIP(configId);
			// for (let itemid2 of equipItem) {
			// 	let itemUI = new view.compart.DaoJuWithNameItem();
			// 	let equipItemInfo = new ProtoCmd.ItemBase();
			// 	equipItemInfo.dwBaseID = itemid2;
			// 	// itemUI.setData(equipItemInfo);
			// 	this.hbox_2.addChild(itemUI);
			// }

			if (nickName) { this.lbl_nickname.text = '(' + nickName + ')'; }
			this.addEvent();
			return this
		}
		public addEvent(): void {
			EventManage.onWithEffect(this.btn_close, Laya.UIEvent.CLICK, this, () => { this.close() })
		}
	}
}