/**Created by the LayaAirIDE*/
module view.scene {
	export class BattleFuBenInfoV0Item extends ui.scene.BattleFuBenInfoV0ItemUI {
		constructor() {
			super();
			this.name = 'BattleFuBenInfoV0Item';
			this.addEvent();
		}


		public setData(): void {

		}

		public addEvent() {
			EventManage.onWithEffect(this.btn_exit, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.FB_ChuMoLeave);
				lcp.send(pkt);
				PanelManage.Main.img_bottomPartInfoBg.visible = true;
			});
			this.lab_roomContent.on(Laya.UIEvent.CLICK, this, function () {
				new view.scene.SceneInfoDialog().setData().popup(true);
			})

			this.addLcpEvent();
		}

		public addLcpEvent() {
			GameApp.LListener.on(ProtoCmd.FB_ChuMoRightPlane, this, (jsonData: ProtoCmd.itf_FB_MainFBjindu) => {
				console.log(jsonData);
				// GameApp.GameEngine.curFuBenMsg = jsonData;
				GameApp.GameEngine.curFuBenMsg = null;
				GameApp.GameEngine.curFuBenMsg = {
					curNum: jsonData.curcnt,
					maxNum: jsonData.totalcnt,
					fubenStr: jsonData.tiaojian,
					item: jsonData.item
				}
				// let aa = TimeUtils.getFormatBySecond(jsonData.sec, 1)
				if (jsonData.curcnt >= jsonData.totalcnt) {
					new scene.BattleRewardInfoV0Item().popup();
					return;
				}
				this.timeCount(this.lbl_leftTime, jsonData.sec)
				// this.lbl_leftTime.text = aa;
				this.lbl_tongGuanTiaoJian.text = '' + jsonData.tiaojian + '(' + jsonData.curcnt + '/' + jsonData.totalcnt + ')';
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
				for (let i = 1; i < 4 + 1; i++) {
					this['btn_star' + i].selected = false;
					if (i <= jsonData.star) {
						this['btn_star' + i].selected = true;
					}
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
		public timeCount(ui: Laya.Label, second: number) {
			if (second >= 0) {
				let aa = TimeUtils.getFormatBySecond(second, 1);
				ui.text = aa;
			} else {
				ui.text = '副本失败!';
			}
			Laya.timer.loop(1000, ui, round);
			function round() {
				second--;
				if (second >= 0) {
					let time = TimeUtils.getFormatBySecond(second, 1)
					ui.text = time
				}
				else {
					ui.text = '副本失败!';
					Laya.timer.clear(ui, round)
				}
			}
		}

		public destroy() {
			GameApp.LListener.offCaller(ProtoCmd.FB_ChuMoRightPlane, this);
			super.destroy(true)
		}
	}
}