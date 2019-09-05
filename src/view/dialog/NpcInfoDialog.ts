/**Created by the LayaAirIDE*/
module view.dialog {
	export class NpcInfoDialog extends ui.dialog.NpcInfoDialogUI {
		constructor() {
			super();
		}
		public item: GameObject.Npc;
		public setData(item: GameObject.Npc): NpcInfoDialog {
			this.item = item;

			this.initUI();
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => { this.close() });
			this.btn_return.on(Laya.UIEvent.CLICK, this, () => {
				this.viw_bottom.selectedIndex = 0;
				this.btn_return.visible = false;
			});
			// 送礼
			this.btn_songLi.on(Laya.UIEvent.CLICK, this, () => {
				this.viw_bottom.selectedIndex = 2;
				this.btn_return.visible = true;
			});
			// 详细信息
			this.btn_info.on(Laya.UIEvent.CLICK, this, () => {
				this.viw_bottom.selectedIndex = 1;
				this.btn_return.visible = true;
			});
			// 任务
			this.btn_task.on(Laya.UIEvent.CLICK, this, () => {
				this.viw_bottom.selectedIndex = 3;
				this.btn_return.visible = true;
			});
		}

		public initUI(): void {
			this.viw_bottom.selectedIndex = 0;
			this.btn_return.visible = (this.viw_bottom.selectedIndex > 0);
			this.tab_info.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_info.selectedIndex = index;
			}, null, false);
			// 配置表ID
			let configId = '' + this.item.feature.dwCretTypeId;
			this.img_npcPic.skin = 'image/common/npc/npc_half_' + configId + '.png';
			this.lbl_npcDes0.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_DES1(configId);
			this.lbl_npcDes1.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_DES2(configId);
			let nickName = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_NICKNAME(configId);
			let commonName = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME(configId);
			if (nickName) {
				commonName += '(' + nickName + ')';
			}
			this.lbl_npcName.text = commonName;
			// 喜好
			let xiHaoItem = SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_LOVE(configId);
			for (let _itemId of xiHaoItem) {
				let itemUI = new view.compart.DaoJuWithNameItem();
				this.hbox_xiHao.addChild(itemUI);
			}
			// 装备
			let equipItem = SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_EQUIP(configId);
			for (let _itemId of equipItem) {
				let itemUI = new view.compart.DaoJuWithNameItem();
				this.hbox_equip.addChild(itemUI);
			}
			// 宝物
			let BAOWUItem = SheetConfig.mydb_npcgen_tbl.getInstance(null).NPC_BAOWUID(configId);
			for (let _itemId of BAOWUItem) {
				let itemUI = new view.compart.DaoJuWithNameItem();
				this.hbox_baoWu.addChild(itemUI);
			}
		}
	}
}