/**Created by the LayaAirIDE*/
module view.scene {
	export class BattleRewardInfoV0Item extends ui.scene.BattleRewardInfoV0ItemUI {
		constructor() {
			super();
			this.addEvent()
			this.setData()
		}
		public setData(showStr = '击杀怪物') {
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
			this.html_show.innerHTML = "<span style='color:#ffed8f'>" + showStr + "</span>"
				+ "<span style='color:#ffffff'>(" + data.curNum + "/" + data.maxNum + ")</span>";
		}
		public addEvent() {
			this.btn_confirm.on(Laya.UIEvent.CLICK, this, function () {
				this.close();
			})
		}
	}
}