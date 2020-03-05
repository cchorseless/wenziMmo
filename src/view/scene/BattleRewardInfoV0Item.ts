/**Created by the LayaAirIDE*/
module view.scene {
	export class BattleRewardInfoV0Item extends ui.scene.BattleRewardInfoV0ItemUI {
		constructor() {
			super();
			this.addEvent()
			// this.setData()
		}
		/**
		\ * 
		\ * @param winState   0:胜利  1:失败
		\ * @param showStr 
		\ */
		public setData(winState, showStr = '击杀怪物') {
			if (winState = 0) {
				this.box_win.visible = true;
				this.box_lose.visible = false;
				this.img_bg.skin = 'image/main/main_tansuo/img_js_jieguo0.png'
				let data = GameApp.GameEngine.curFuBenMsg;
				this.hbox_prize.removeChildren();
				for (let i in data.item) {
					// jsonData.item[i];
					let itemBase = new ProtoCmd.ItemBase();
					itemBase.dwBaseID = data.item[i].index;
					itemBase.dwCount = data.item[i].num;
					itemBase.dwBinding = data.item[i].bind;
					let new_ui = new view.compart.DaoJuWithNameItem();
					new_ui.setData(itemBase);
					this.hbox_prize.addChild(new_ui);
				}
				if (data.fubenStr != "") {
					showStr = data.fubenStr
				}
				this.html_show.style.fontFamily = 'SimHei';
				this.html_show.style.fontSize = 22;
				this.html_show.style.stroke = 1;
				this.html_show.style.strokeColor = '#000000';
				this.html_show.innerHTML = "<span style='color:#f3d61a'>" + showStr + "</span>"
					+ "<span style='color:#24d916'>(" + data.curNum + "</span>"
					+ "<span style='color:#24d916'>/" + data.maxNum + ")</span>";
			} else {
				this.box_win.visible = false;
				this.box_lose.visible = true;
				this.img_bg.skin = 'image/main/main_tansuo/img_js_jieguo1.png';
				this.lab_my_Power.text = GameApp.MainPlayer.ability.nFight + '';
				let power = GameApp.MainPlayer.fubenMonsterPower;
				this.lab_monsterPower.text = power + '';
			}

		}
		public addEvent() {
			this.box_equip.on(Laya.UIEvent.CLICK, this, function () {
			})
			this.box_myself.on(Laya.UIEvent.CLICK, this, function () {
			})
			this.box_shop.on(Laya.UIEvent.CLICK, this, function () {
			})
			this.btn_confirm.on(Laya.UIEvent.CLICK, this, function () {
				main.Main_tanSuoItem.self.leaveFuBen();
				this.close();
			})
		}
	}
}