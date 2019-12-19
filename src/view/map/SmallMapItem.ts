/**Created by the LayaAirIDE*/
module view.map {
	export class SmallMapItem extends ui.map.SmallMapItemUI {
		constructor() {
			super();
			this.name = 'SmallMapItem';
			this.addEvent();
		}


		public updateUI(): void {
			let mapInfo = GameApp.GameEngine.smallMapData;
			let roomId = GameApp.MainPlayer.roomId;
			this.lab_location.text = '' + SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + roomId);
			// 中间自己
			// this.btn_mapCenter.label = '' + SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + roomId);
			this.btn_mapCenter.labelSize = (this.btn_mapCenter.label.length > 3) ? 20 : 25;
			// this.btn_mapCenter.skin = 'image/map/smallMap/smallmap_icon_' + SheetConfig.mapRoomSheet.getInstance(null).ICONPIC('' + roomId) + '.png';
			// 左侧
			this.img_lineLeft.visible = Boolean(mapInfo.left);
			if (mapInfo.left) {
				this.btn_mapLeft.visible = true;
				this.btn_mapLeft.label = '' + SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + mapInfo.left);
				this.btn_mapLeft.labelSize = (this.btn_mapLeft.label.length > 3) ? 20 : 25;
				// this.btn_mapLeft.skin = 'image/map/smallMap/smallmap_icon_' + SheetConfig.mapRoomSheet.getInstance(null).ICONPIC('' + mapInfo.left) + '.png';
			}
			else {
				this.btn_mapLeft.visible = false;
			}
			// 下面
			this.img_lineDown.visible = Boolean(mapInfo.down);
			if (mapInfo.down) {
				this.btn_mapDown.visible = true;
				this.btn_mapDown.label = '' + SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + mapInfo.down);
				this.btn_mapDown.labelSize = (this.btn_mapDown.label.length > 3) ? 20 : 25;
				// this.btn_mapDown.skin = 'image/map/smallMap/smallmap_icon_' + SheetConfig.mapRoomSheet.getInstance(null).ICONPIC('' + mapInfo.down) + '.png';
			}
			else {
				this.btn_mapDown.visible = false;
			}
			// 上面
			this.img_lineUp.visible = Boolean(mapInfo.up);
			if (mapInfo.up) {
				this.btn_mapUp.visible = true;
				this.btn_mapUp.label = '' + SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + mapInfo.up);
				this.btn_mapUp.labelSize = (this.btn_mapUp.label.length > 3) ? 20 : 25;
				// this.btn_mapUp.skin = 'image/map/smallMap/smallmap_icon_' + SheetConfig.mapRoomSheet.getInstance(null).ICONPIC('' + mapInfo.up) + '.png';
			}
			else {
				this.btn_mapUp.visible = false;
			}
			// 右边
			this.img_lineRight.visible = Boolean(mapInfo.right);
			if (mapInfo.right) {
				this.btn_mapRight.visible = true;
				this.btn_mapRight.label = '' + SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + mapInfo.right);
				this.btn_mapRight.labelSize = (this.btn_mapRight.label.length > 3) ? 20 : 25;
				// this.btn_mapRight.skin = 'image/map/smallMap/smallmap_icon_' + SheetConfig.mapRoomSheet.getInstance(null).ICONPIC('' + mapInfo.right) + '.png';
			}
			else {
				this.btn_mapRight.visible = false;
			}
		}


		public addEvent(): void {
			// ****************小地图***************
			// 向下移动
			EventManage.onWithEffect(this.btn_mapDown, Laya.UIEvent.CLICK, this, () => {
				this.joinRoom(GameApp.GameEngine.smallMapData.down);
			});
			// 向上移动
			EventManage.onWithEffect(this.btn_mapUp, Laya.UIEvent.CLICK, this, () => {
				this.joinRoom(GameApp.GameEngine.smallMapData.up);
			});
			// 向左移动
			EventManage.onWithEffect(this.btn_mapLeft, Laya.UIEvent.CLICK, this, () => {
				this.joinRoom(GameApp.GameEngine.smallMapData.left);
			});
			// 向右移动
			EventManage.onWithEffect(this.btn_mapRight, Laya.UIEvent.CLICK, this, () => {
				this.joinRoom(GameApp.GameEngine.smallMapData.right);
			});
			// 路引弹窗
			// EventManage.onWithEffect(this.btn_flyPoint, Laya.UIEvent.CLICK, this, () => {
			// 	new view.main.Main_LuYinDialog().setData().popup(true);
			// });
			// 地图展开界面
			EventManage.onWithEffect(this.btn_mapBig, Laya.UIEvent.CLICK, this, () => {
				this.btn_mapBig.selected = !this.btn_mapBig.selected;
				// if (this.btn_mapBig.selected) {
				// 	this.ui_mainDownMapItem.showSelf(true);
				// }
				// else {
				// 	this.ui_mainDownMapItem.showSelf(false);
				// }
			});
			this.lab_roomContent.on(Laya.UIEvent.CLICK,this,function(){
				new view.scene.SceneInfoDialog().setData().popup(true);
			})
		}
		/**
 		  * 进入房间
  		 * @param roomid 
  		 */
		public joinRoom(roomid): void {
			if (!roomid) { return };
			if (GameApp.MainPlayer.roomId == roomid) {
				TipsManage.showTips('当前就在此地图');
				return
			}
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.MAP_MOVE, [roomid])
			lcp.send(pkt);
		}
	}
}