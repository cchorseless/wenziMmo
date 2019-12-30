/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_IntensifyContentDialog extends ui.juese.Person_IntensifyContentDialogUI {
		// public curEquipLv: number = 3;
		public allData = null;
		public curLv = 3; //当前是强化到第几阶段
		public nextLv = 5; //当前是强化到第几阶段
		public arrLV = [];
		constructor() {
			super();
		}
		public setData() {
			this.vbox_intensify['sortItem'] = (items) => { };
			let arr = ["头盔", "项链", "衣服", "武器", "手镯", "手镯", "戒指", "戒指", "鞋", "腰带"]
			this.allData = GameApp.GameEngine.mainPlayer.playerEquipIntensify;
			let lvNum = this.onLvIntensify();
			for (let i = 0; i < 10; i++) {
				this['btn_equip' + i].label = arr[i];
				this['btn_equip' + i].selected = false;
				this['btn_equip1_' + i].label = arr[i];
				this['btn_equip1_' + i].selected = false;
			}
			this.lab_result_intensify.text = "所有装备位强化:" + this.curLv + "(" + lvNum[0] + "/10)";
			if (this.curLv < 30) {
				this.lab_result_intensify1.text = "所有装备位强化:" + this.nextLv + "(" + lvNum[1] + "/10)";
				let effid: number;
				let effid1: number;
				for (let i in this.allData.sooulchaintab) {
					if (this.curLv == this.allData.sooulchaintab[i].minlvl) {
						effid = this.allData.sooulchaintab[i].effid;
					}
					if (this.nextLv == this.allData.sooulchaintab[i].minlvl) {
						effid1 = this.allData.sooulchaintab[i].effid;
					}
				}
				let effData = GameUtil.parseEffectidToObj([effid + ""])
				let effData1 = GameUtil.parseEffectidToObj([effid1 + ""])
				this.vbox_intensify.removeChildren();
				for (let i = 0; i < effData.des.length; i++) {
					this.vbox_intensify.addChild(new view.compart.SinglePropsItem().setData(effData.des[i]))
				}
				this.vbox_intensify1.removeChildren();
				for (let i = 0; i < effData1.des.length; i++) {
					this.vbox_intensify1.addChild(new view.compart.SinglePropsItem().setData(effData1.des[i]))
				}
			} else {
				this.lab_result_intensify1.text = "所有装备位强化:已满级";
				let effid: number;
				for (let i in this.allData.sooulchaintab) {
					if (this.curLv == this.allData.sooulchaintab[i].minlvl) {
						effid = this.allData.sooulchaintab[i].effid;
					}
				}
				let effData = GameUtil.parseEffectidToObj([effid + ""])
				this.vbox_intensify.removeChildren();
				for (let i = 0; i < effData.des.length; i++) {
					this.vbox_intensify.addChild(new view.compart.SinglePropsItem().setData(effData.des[i]))
				}
				this.vbox_intensify1.removeChildren();
			}


			//当前选择的是玩家或是弟子  0玩家  
			let type = GameApp.GameEngine.mainPlayer.playerORHero;
			let aa;
			if (type == 1) {
				aa = this.allData.herojson;
			}
			else {
				aa = this.allData.playerjson;
			}
			for (let o in aa) {
				let p = parseInt(o);
				if (aa[o] >= this.curLv) {
					this["btn_equip" + p].selected = true;
					this["btn_equip" + p].disabled = false;
				} else {
					this["btn_equip" + p].selected = false;
					this["btn_equip" + p].disabled = true;
				}
			}
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
		private onLvIntensify() {
			let type = GameApp.GameEngine.mainPlayer.playerORHero;
			let aa;
			//各强化等级的的装备个数
			if (type == 1) {
				aa = this.allData.herojson;
			}
			else {
				aa = this.allData.playerjson;
			}
			this.arrLV = []
			for (let i in aa) {
				this.arrLV.push(aa[i])
			}
			this.arrLV.sort(function (a, b) {
				return (a - b);
			})
			let minLv = this.arrLV[0]
			let arr = [];
			for (let i in this.allData.sooulchaintab) {
				arr.push(this.allData.sooulchaintab[i].minlvl)
			}
			for (let i = 0; i < arr.length; i++) {
				if (i <= 0) {
					if (minLv < arr[0]) {
						this.curLv = arr[0];
						this.nextLv = arr[1];
						break;
					}
				}
				else if (i > 0 && i < arr.length - 1) {
					if (minLv < arr[i]) {
						this.curLv = arr[i - 1];
						this.nextLv = arr[i];
						break;
					}
				} else {
					this.curLv = arr[arr.length - 1];
					this.nextLv = arr[arr.length - 1];
					break;
				}
			}
			let curNum = 0;
			for (let i = 0; i < this.arrLV.length; i++) {
				if (this.curLv <= this.arrLV[i]) {
					curNum++;
				}
			}
			let nextNum = 0;
			for (let i = 0; i < this.arrLV.length; i++) {
				if (this.nextLv <= this.arrLV[i]) {
					nextNum++;
				}
			}
			return [curNum, nextNum];
		}



	}
}