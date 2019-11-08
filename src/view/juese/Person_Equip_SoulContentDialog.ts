/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_Equip_SoulContentDialog extends ui.juese.Person_Equip_SoulContentDialogUI {
		public arr = ["头盔", "项链", "手镯", "手镯", "戒指", "戒指", "鞋", "腰带"];
		public allData;
		public baseLv = 60; //装备等级
		public curSoulStoneLv = 0;
		constructor() {
			super();
		}
		public setData(type) {
			if (type == 0) {
				this.viw_equip.selectedIndex = 0;
				this.lab_title.text = "精炼大师";
				this.equipView();
			}
			else if (type == 1) {
				this.viw_equip.selectedIndex = 1;
				this.lab_title.text = "魂石大师";
				this.soulView()
			}
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
		public equipView() {
			let curNum0 = 0;
			let curNum1 = 0;
			let equpLvNumArr = [];
			let showLvNumArr = [];
			let type = GameApp.GameEngine.mainPlayer.playerORHero;
			let item;
			let lvNum;
			for (let i = 0; i < 8; i++) {
				this["btn_equip0_" + i].label = this.arr[i];
				this["btn_equip1_" + i].label = this.arr[i];
				this["btn_equip0_" + i].selected = false;
				this["btn_equip1_" + i].selected = false;
				let equipID;
				if (type == 0) {
					equipID = i
					if (equipID != 2 || equipID != 3) {
						item = GameUtil.findEquipInPlayer(equipID);
						lvNum
						if (item) {
							lvNum = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMLVNEED(item.dwBaseID.toString());
						} else {
							lvNum = 0;
						}

						equpLvNumArr.push(lvNum);
						showLvNumArr.push(lvNum);
					}
				}
				else {
					equipID = i + 18 + type * 10
					if (equipID != 20 + type * 10 || equipID != 21 + type * 10) {
						item = GameUtil.findEquipInPlayer(equipID);
						lvNum
						if (item) {
							lvNum = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMLVNEED(item.dwBaseID.toString());
						} else {
							lvNum = 0;
						}
						equpLvNumArr.push(lvNum);
						showLvNumArr.push(lvNum);
					}
				}
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
			// this.lab_equip1_num.text = (10 + this.baseLv).toString();
			// this.lab_equip0_num.text = this.baseLv.toString();
			for (let i = 0; i < 8; i++) {
				if (showLvNumArr[i] >= this.baseLv) {
					curNum0++;
					this["btn_equip0_" + i].selected = true;
				}
				if (showLvNumArr[i] >= this.baseLv + 10) {
					curNum1++;
					this["btn_equip1_" + i].selected = true;
				}
			}
			let lvl_baseData;
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.EquipSoulChain, null, 0, this, (data) => {
				lvl_baseData = data;
				let effid0;
				let effid1;
				for (let i in lvl_baseData[1]) {
					if (this.baseLv >= lvl_baseData[1][i].minlvl && this.baseLv <= lvl_baseData[1][i].maxlvl) {
						effid0 = lvl_baseData[1][i].effid
					}
					if ((this.baseLv + 10) >= lvl_baseData[1][i].minlvl && (this.baseLv + 10) <= lvl_baseData[1][i].maxlvl) {
						effid1 = lvl_baseData[1][i].effid
					}
				}
				let effData0 = GameUtil.parseEffectidToString(effid0 + "")
				let effData1 = GameUtil.parseEffectidToString(effid1 + "")
				for (let i = 0; i < effData0.des.length; i++) {
					let str = effData0.des[i];
					let loc = str.indexOf(":")
					let str1 = str.substring(0, loc + 1);
					let str2 = str.substring(loc + 1, str.length)
					this["lab_equip0_effect" + i].text = str2;
					this["lab_equip0_name" + i].text = str1;
					let str_1 = effData1.des[i];
					let loc_1 = str_1.indexOf(":")
					let str1_1 = str_1.substring(0, loc_1 + 1);
					let str2_1 = str_1.substring(loc_1 + 1, str_1.length)
					this["lab_equip1_effect" + i].text = str2_1;
					this["lab_equip1_name" + i].text = str1_1;
				}
			})
			lcp.send(pkt);
			this.lab_equipTab0.text = "全套装备达到" + this.baseLv.toString() + "级(" + curNum0 + "/8)"
			this.lab_equipTab1.text = "全套装备达到" + (10 + this.baseLv).toString() + "级(" + curNum1 + "/8)"
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
			this.lab_soulTab0.text = "总魂石       " + "阶(" + this.curSoulStoneLv + "/" + (k + 1) * 60 + ")"
			this.lab_soulTab1.text = "总魂石       " + "阶(" + this.curSoulStoneLv + "/" + (k + 2) * 60 + ")"
			this.lab_soul_0_num.text = (k + 1) * 60 + "";
			this.lab_soul_1_num.text = (k + 2) * 60 + "";
			let effid0;
			let effid1;
			for (let i in this.allData.soulchaintab) {
				let level0 = (k + 1) * 60;
				let level1 = (k + 2) * 60;
				if (level0 >= this.allData.soulchaintab[i].minlvl && level0 <= this.allData.soulchaintab[i].maxlvl) {
					effid0 = this.allData.soulchaintab[i].effid
				}
				if (level1 >= this.allData.soulchaintab[i].minlvl && level1 <= this.allData.soulchaintab[i].maxlvl) {
					effid1 = this.allData.soulchaintab[i].effid
				}
			}
			let effData0 = GameUtil.parseEffectidToString(effid0 + "")
			let effData1 = GameUtil.parseEffectidToString(effid1 + "")
			for (let i = 0; i < effData0.des.length; i++) {
				let str = effData0.des[i];
				let loc = str.indexOf(":")
				let str1 = str.substring(0, loc + 1);
				let str2 = str.substring(loc + 1, str.length)
				this["lab_soulContent0_" + i].text = str2;
				this["lab_name0_" + i].text = str1;
				let str_1 = effData1.des[i];
				let loc_1 = str_1.indexOf(":")
				let str1_1 = str_1.substring(0, loc_1 + 1);
				let str2_1 = str_1.substring(loc_1 + 1, str_1.length)
				this["lab_soulContent1_" + i].text = str2_1;
				this["lab_name1_" + i].text = str1_1;
			}
		}
	}
}