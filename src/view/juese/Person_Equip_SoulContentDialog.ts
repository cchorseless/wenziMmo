/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_Equip_SoulContentDialog extends ui.juese.Person_Equip_SoulContentDialogUI {
		public arr = ["头盔", "项链", "衣服", "武器", "手镯", "手镯", "戒指", "戒指", "鞋", "腰带"];
		public allData;
		public baseLv = 60; //装备等级
		public curSoulStoneLv = 0;
		constructor() {
			super();
		}
		public setData(type) {
			if (type == 0) {
				this.box_Equip.visible = true;
				this.box_Soul.visible = false;
				this.lab_title.text = "主角装备灵魂锁链";
				this.equipView();
			}
			else if (type == 1) {
				this.box_Equip.visible = false;
				this.box_Soul.visible = true;
				this.lab_title.text = "主角魂石灵魂锁链";
				this.soulView()
			}
		}
		public equipView() {
			let curNum0 = 0;
			let curNum1 = 0;
			let equpLvNumArr = [];
			let showLvNumArr = [];
			let type = GameApp.GameEngine.mainPlayer.playerORHero;

			for (let i = 0; i < 10; i++) {
				this["lab_equip0_" + i].text = this.arr[i];
				this["lab_equip1_" + i].text = this.arr[i];
				this["lab_equip0_" + i].color = "#000000";
				this["lab_equip1_" + i].color = "#000000";
				let equipID;
				if (type == 0) {
					equipID = i
				}
				else {
					equipID = i + 18 + type * 10
				}

				let item = GameUtil.findEquipInPlayer(equipID);
				let lvNum
				if (item) {
					lvNum = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMLVNEED(item.dwBaseID.toString());
				} else {
					lvNum = 0;
				}

				equpLvNumArr.push(lvNum);
				showLvNumArr.push(lvNum);
			}


			let temp = equpLvNumArr.sort(function (a, b) {
				return b - a;
			});
			let max = temp[0];
			let min = temp[temp.length - 1]
			if (min < 60) {
				this.baseLv = 60;
			} else {
				let k = Math.floor((min - 60) / 10)
				this.baseLv = 60 + 10 * (k + 1);
			}
			this.lab_equip1_num.text = (10 + this.baseLv).toString();
			this.lab_equip0_num.text = this.baseLv.toString();
			for (let i = 0; i < 10; i++) {
				if (showLvNumArr[i] >= this.baseLv) {
					curNum0++;
					this["lab_equip0_" + i].color = "#6dd041";
				}
				if (showLvNumArr[i] >= this.baseLv + 10) {
					curNum1++;
					this["lab_equip1_" + i].color = "#6dd041";
				}
			}

			this.lab_equipTab0.text = "全套装备达到    " + "级(" + curNum0 + "/10)"
			this.lab_equipTab1.text = "全套装备达到    " + "级(" + curNum1 + "/10)"


		}
		public soulView() {
			this.allData = GameApp.GameEngine.mainPlayer.playersoulStoneLevel
			let baseLvData;    //魂石
			let type = GameApp.GameEngine.mainPlayer.playerORHero;
			if (type == 0) {
				baseLvData = this.allData.playerlvl;
			} else if (type > 0) {
				baseLvData = this.allData.herolvl;
			}

			for (let i in baseLvData) {
				for (let o in baseLvData[i]) {
					this.curSoulStoneLv += baseLvData[i][o];
				}
			}
			let k = Math.floor(this.curSoulStoneLv / 60);
			this.lab_soulTab0.text = "总魂石    " + "阶(" + this.curSoulStoneLv + "/" + (k + 1) * 60 + ")"
			this.lab_soulTab1.text = "总魂石    " + "阶(" + this.curSoulStoneLv + "/" + (k + 2) * 60 + ")"
			this.lab_soul_0_num.text = (k + 1) * 60 + "";
			this.lab_soul_1_num.text = (k + 2) * 60 + "";
		}
	}
}