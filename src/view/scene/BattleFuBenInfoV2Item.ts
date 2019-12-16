/**Created by the LayaAirIDE*/
module view.scene {
	export class BattleFuBenInfoV2Item extends ui.scene.BattleFuBenInfoV2ItemUI {
		constructor() {
			super();
			this.addEvent();
			this.panel_prize.vScrollBarSkin = '';
		}


		public setData() {

		}

		public addEvent(): void {
			this.btn_exit.on(Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.FB_CaiLiaoFuBenLikai);
				lcp.send(pkt);
				PanelManage.Main.img_bottomPartInfoBg.visible = true;
			});
			this.addLcpEvent();
		}
		public addLcpEvent() {
			GameApp.LListener.on(ProtoCmd.map_CaiLiaoFubenPlane2, this, (jsonData) => {
				console.log(jsonData);
				// GameApp.GameEngine.curFuBenMsg = jsonData;
				GameApp.GameEngine.curFuBenMsg = null;
				GameApp.GameEngine.curFuBenMsg = {
					curNum: jsonData.KILLCNT,
					maxNum: jsonData.MAXCNT,
					fubenStr:"",
					item: jsonData.JiangLi
				}
				// let aa = TimeUtils.getFormatBySecond(jsonData.sec, 1)
				if (jsonData.KILLCNT>=jsonData.MAXCNT){
					new scene.BattleRewardInfoV0Item().popup();
					return;
				}
				this.hbox_prize.removeChildren();
				for (let i in jsonData.item) {
					// jsonData.item[i];
					let itemBase = new ProtoCmd.ItemBase();
					itemBase.dwBaseID = jsonData.item[i].index;
					itemBase.dwCount = jsonData.item[i].num;
					itemBase.dwBinding = jsonData.item[i].bind;
					let new_ui = new view.compart.DaoJuWithNameItem();
					new_ui.setData(itemBase);
					this.hbox_prize.addChild(new_ui);
				}
				this.showNeed(jsonData);
				// let roomId = GameApp.MainPlayer.roomId;
				// this.lab_location.text = '' + SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + roomId);
			})
		}
		public showNeed(data) {
			this.html_tongGuanTiaoJian.style.fontFamily = 'SimHei';
			this.html_tongGuanTiaoJian.style.fontSize = 22;
			this.html_tongGuanTiaoJian.style.stroke = 1;
			this.html_tongGuanTiaoJian.style.strokeColor = '#000000';
			this.html_tongGuanTiaoJian.innerHTML = "<span style='color:#ffed8f'>" + data.tiaojian + "</span>"
				+ "<span style='color:#ffffff'>(" + data.totalcnt + "/" + data.curcnt + ")</span>";
		}

		public destroy() {
			GameApp.LListener.offCaller(ProtoCmd.map_CaiLiaoFubenPlane2, this);
			super.destroy(true)
		}
	}
}