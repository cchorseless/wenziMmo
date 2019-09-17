/**Created by the LayaAirIDE*/
module view.dialog {
	export class SceneInfoDialog extends ui.dialog.SceneInfoDialogUI {
		constructor() {
			super();
		}

		public setData(): SceneInfoDialog {
			let roomID = GameApp.MainPlayer.roomId;
			// 房间名称
			this.lbl_roomName.text = SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + roomID);
			// 房间描述
			this.lbl_roomInfo.text = SheetConfig.mapRoomSheet.getInstance(null).ROOMDES('' + roomID);
			let player = GameApp.MainPlayer;
			// 所有玩家
			let playerKeys = Object.keys(player.allPlayer);
			for (let _playerkey of playerKeys) {
				let _player = player.allPlayer[_playerkey];
				let playerui = new view.compart.PlayerIconV0Item();
				// playerui.setData(_player);

			}
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}


	}
}