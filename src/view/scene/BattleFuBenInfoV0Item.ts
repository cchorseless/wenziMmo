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
				// let aa = TimeUtils.getFormatBySecond(jsonData.sec, 1)
				this.timeCount(this.lbl_leftTime, jsonData.sec)
				// this.lbl_leftTime.text = aa;
				this.lbl_tongGuanTiaoJian.text = '' + jsonData.tiaojian + '(' + jsonData.curcnt + '/' + jsonData.totalcnt + ')';
				// if (this.hbox_0.numChildren > 0) {
				// 	for (let i = 0; jsonData.item[i]; i++) {
				// 		let itemBase = new ProtoCmd.ItemBase();
				// 		let new_ui = new view.compart.DaoJuWithNameItem();
				// 		new_ui.setData(itemBase);
				// 		this.vbox_0.addChild(new_ui);
				// 	}
				// }
				// let roomId = GameApp.MainPlayer.roomId;
				// this.lab_location.text = '' + SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + roomId);
			})
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