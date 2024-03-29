/**Created by the LayaAirIDE*/
module view.npc {
	export class Main_TanSuoV15Dialog extends ui.npc.Main_TanSuoV15DialogUI {
		public item: GameObject.Monster;
		public itemID;
		constructor() {
			super();
		}
		public setData(item: GameObject.Monster) {
			this.item = item;
			this.itemID = item.feature.dwCretTypeId;
			this.lab_name.text = SheetConfig.mydb_monster_tbl.getInstance(null).NAME(this.itemID);
			this.lab_des.text = SheetConfig.mydb_monster_tbl.getInstance(null).MONSTERDES(this.itemID);
			let dropItemArr = SheetConfig.mydb_monster_tbl.getInstance(null).DROPPED_ARTICLES(this.itemID);

			// let jilv = SheetConfig.mydb_monster_tbl.getInstance(null).DROPPED_ARTICLES(this.itemID);
			let jiangliArr = dropItemArr.split('|');
			let resultArr = [];
			for (let i = 0; i < jiangliArr.length; i++) {
				let base = jiangliArr[i].split('`');
				resultArr.push(parseInt(base[0]))
			}
			this.showDrop(resultArr);
			this.addEvent();
			return this;
		}
		public showDrop(items: Array<number>) {
			let str = ['高概率', '中概率', '低概率']
			for (let i = 0; i < items.length; i++) {
				this['img_bg' + i].skin = PathUtil.getItemQualityFramePath(SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMQUALITY(items[i]));
				this['img_icon' + i].skin = PathUtil.getItemIconPath(SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMQUALITY(items[i]));
				this['lab_name' + i].text = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(items[i]);
				this['lab_jilv' + i].text = str[i];
			}
		}
		public addEvent() {
			this.btn_close.on(Laya.UIEvent.CLICK, this, function () {
				this.close();
			})
			this.btn_collect.on(Laya.UIEvent.CLICK, this, function () {
				let tempID;
				let keys = Object.keys(GameApp.MainPlayer.allMonster);
				for (let key of keys) {
					let monster: GameObject.Monster = GameApp.MainPlayer.allMonster[key];
					if (monster.feature.dwCretTypeId == this.itemID) {
						tempID = key;
					}
				}
				GameApp.LListener.event(view.main.Main_tanSuoItem.Collect,tempID);
				this.close();
			})


		}
	}
}