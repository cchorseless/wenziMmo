/**Created by the LayaAirIDE*/
module view.compart {
	export class EquipInBodybgItem extends ui.compart.EquipInBodybgItemUI {
		constructor() {
			super();
		}
		public checkIsFull(): boolean {
			return this.box_equip.numChildren === 1;
		}

		public addItem(item) {
			this.clearItem();
			this.box_equip.addChild(item);
			item.top = item.bottom = item.left = item.right = 0;
		}
		public clearItem() {
			if (this.checkIsFull()) {
				this.box_equip.removeChildren();
			}
		}


		public setData(i): void {
			this.img_bg.visible = true;
			this.img_bg.skin = 'image/common/daoju/itemicon_bg_' + (i + 10) + '.png';
			if (GameApp.GameEngine.mainPlayer.playerEquipIntensify.playerjson[i] == 0) {
				this.lbl_stronger.text = '';
				this.img_stronger.visible = false;
			} else {
				this.lbl_stronger.text = '+' + GameApp.GameEngine.mainPlayer.playerEquipIntensify.playerjson[i];
				this.img_stronger.visible = true;
			}
			let sum = 0;
			let soulArray = GameApp.GameEngine.mainPlayer.playersoulStoneLevel.playerlvl[i]
			for (let shu in soulArray) {
				sum = parseInt(soulArray[shu]) + sum;
			}
			if (sum == 0) {
				this.lbl_soul.text = '';
				this.img_soul.visible = false;
			} else {
				this.lbl_soul.text = '精炼：' + sum;
				this.img_soul.visible = true;
			}
			let pos = i + 10;
			let data = GameUtil.findEquipInPlayer(pos);
			let shuziArray = ['0', '1', '2', '3', '4', '5']
			if (data) {
				let lvl = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMJIESHU(data.dwBaseID + '');
				this.lbl_chuanshi.text = '' + shuziArray[lvl];
				this.img_chuanShi.visible = true;
			}
			else {
				this.lbl_chuanshi.text = '';
				this.img_chuanShi.visible = false;
			}
		}
	}
}