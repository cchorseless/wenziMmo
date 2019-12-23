/**Created by the LayaAirIDE*/
module view.scene {
	export class SceneInfoDialog extends ui.scene.SceneInfoDialogUI {
		constructor() {
			super();
		}
		public item;
		public boss;
		public player;
		public setData(): SceneInfoDialog {
			this.tab_place.selectHandler = Laya.Handler.create(this, (index) => {
				this.view_palce.selectedIndex = index;
				this.init_tabEvent();
			}, null, false);
			this.panel_daoju.vScrollBarSkin = '';
			this.panel_boss.vScrollBarSkin = '';
			this.panel_player.vScrollBarSkin = '';
			let roomID = GameApp.MainPlayer.roomId;
			// 房间名称
			this.lbl_roomName.text = SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + roomID);
			// 房间描述
			this.lbl_roomInfo.text = SheetConfig.mapRoomSheet.getInstance(null).ROOMDES('' + roomID);
			this.addEvent();
			this.init_info();
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
		public init_info(): void {
			this.panel_daoju.removeChildren();
			this.panel_boss.removeChildren();
			this.panel_player.removeChildren();
			let player = GameApp.MainPlayer;
			//所有掉落
			this.item = Object.keys(player.allItem);
			let index0 = 0;
			for (let _itemkey of this.item) {
				index0 += 1;
				let num0 = index0 % 3;
				let floor0 = Math.ceil(index0 / 3);
				let _itemer = player.allItem[_itemkey];
				let itemui = new view.npc.NpcIconV0Item();
				itemui.init_item(_itemer);
				this.panel_boss.addChild(itemui);
				itemui.y = (floor0 - 1) * (itemui.height + 10);
				switch (num0) {
					case 0:
						itemui.x = (itemui.width + 60) * 2;
						break;
					case 1:
						itemui.x = 0;
						break;
					case 2:
						itemui.x = itemui.width + 60;
						break;
				}
			}
			//所有怪物
			this.boss = Object.keys(player.allMonster);
			let index2 = 0;
			for (let _bosskey of this.boss) {
				index2 += 1;
				let num2 = index2 % 3;
				let floor2 = Math.ceil(index2 / 3);
				let _bosser = player.allMonster[_bosskey];
				let bossui = new view.npc.NpcIconV0Item();
				bossui.init_monster(_bosser);
				this.panel_boss.addChild(bossui);
				bossui.y = (floor2 - 1) * (bossui.height + 10);
				switch (num2) {
					case 0:
						bossui.x = (bossui.width + 60) * 2;
						break;
					case 1:
						bossui.x = 0;
						break;
					case 2:
						bossui.x = bossui.width + 60;
						break;
				}
			}
			// 所有玩家
			this.player = Object.keys(player.allPlayer);
			let index1 = 0;
			for (let _playerkey of this.player) {
				index1 += 1;
				let num1 = index1 % 3;
				let floor1 = Math.ceil(index1 / 3);
				let _player: GameObject.OtherPlayer = player.allPlayer[_playerkey];
				let playerui = new view.compart.PlayerIconV0Item();
				playerui.setData(_player);
				this.panel_player.addChild(playerui);
				playerui.y = (floor1 - 1) * (playerui.height + 10);
				switch (num1) {
					case 0:
						playerui.x = (playerui.width + 60) * 2;
						break;
					case 1:
						playerui.x = 0;
						break;
					case 2:
						playerui.x = playerui.width + 60;
						break;
				}
			}
			this.init_tabEvent();
		}
		public init_tabEvent(): void {
			if (this.tab_place.selectedIndex == 0) {
				if (this.item.length == 0) {
					this.lbl_null.visible = true;
					this.lbl_null.text = '暂无掉落';
				} else {
					this.lbl_null.visible = false;
				}
				return;
			}
			if (this.tab_place.selectedIndex == 1) {
				if (this.boss.length == 0) {
					this.lbl_null.visible = true;
					this.lbl_null.text = '暂无怪物';
				} else {
					this.lbl_null.visible = false;
				}
				return;
			}
			if (this.tab_place.selectedIndex == 2) {
				if (this.player.length == 0) {
					this.lbl_null.visible = true;
					this.lbl_null.text = '暂无其他玩家';
				} else {
					this.lbl_null.visible = false;
				}
				return;
			}
		}
	}
}