/**Created by the LayaAirIDE*/
module view.map {
	export class SmallMapItem extends ui.map.SmallMapItemUI {
		constructor() {
			super();
			this.addEvent();
		}


		public updateUI(): void {
			let mapInfo = GameApp.GameEngine.smallMapData;
			let roomId = GameApp.MainPlayer.roomId;
			this.btn_center.label = '' + SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + roomId);
			// 中间自己
			// this.btn_mapCenter.label = '' + SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + roomId);
			this.btn_center.labelSize = (this.btn_center.label.length > 3) ? 20 : 25;
			// this.btn_mapCenter.skin = 'image/map/smallMap/smallmap_icon_' + SheetConfig.mapRoomSheet.getInstance(null).ICONPIC('' + roomId) + '.png';
			// 左侧
			// this.img_lineLeft.visible = Boolean(mapInfo.left);
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
			// this.img_lineDown.visible = Boolean(mapInfo.down);
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
			// this.img_lineUp.visible = Boolean(mapInfo.up);
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
			// this.img_lineRight.visible = Boolean(mapInfo.right);
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

			// 当前房间
			EventManage.onWithEffect(this.btn_center, Laya.UIEvent.CLICK, this, () => {
				new view.scene.SceneInfoDialog().setData().popup(true);
			});
			// 路引
			EventManage.onWithEffect(this.btn_flyPoint, Laya.UIEvent.CLICK, this, function () {
				new view.main.Main_LuYinDialog().setData().popup(true);
			});
			// 返回主界面
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, function () {
				PanelManage.Main.changeMode(0);
			});
			// 当前地图界面
			EventManage.onWithEffect(this.btn_mapBig, Laya.UIEvent.CLICK, this, function () {
				this.openBigMap()
			});
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

		/**
  		 * 加载大地图
  		 */
		public openBigMap(): void {
			let ui_map;
			switch (GameApp.MainPlayer.location.mapid) {
				// 酆都
				case EnumData.MAP_BIG_MAP_ID.MAP_FENG_DU:
					// ui_map = new view.map.SmallMap_fengduItem();
					ui_map.setData();
					break;
				// 福州城
				case EnumData.MAP_BIG_MAP_ID.MAP_FU_ZHOU_CHENG:
					// ui_map = new view.map.SmallMap_fuzhouItem();
					ui_map.setData();
					break;
				// 华山派
				case EnumData.MAP_BIG_MAP_ID.MAP_HUA_SHAN_PAI:
					// ui_map = new view.map.SmallMap_HuaShanItem();
					ui_map.y = 118;
					ui_map.setData();
					break;
				// 玉壶
				case EnumData.MAP_BIG_MAP_ID.MAP_YU_HU:
					// ui_map = new view.map.SmallMap_YuHuItem();
					ui_map.y = 118;
					ui_map.setData();
					break;
				// 药王庄
				case EnumData.MAP_BIG_MAP_ID.MAP_YAO_WANG:
					// ui_map = new view.map.SmallMap_YaoWangItem();
					ui_map.y = 118;
					ui_map.setData();
					break;
				// 洛阳
				case EnumData.MAP_BIG_MAP_ID.MAP_LUO_YANG:
					// ui_map = new view.map.SmallMap_LuoYangItem();
					ui_map.setData();
					break;
				// 良人鎮
				case EnumData.MAP_BIG_MAP_ID.MAP_LIANG_REN:
					// ui_map = new view.map.SmallMap_LiangRenItem();
					ui_map.y = 118;
					ui_map.setData();
					break;
				// 塔楼
				case EnumData.MAP_BIG_MAP_ID.MAP_TA_LOU:
					// ui_map = new view.map.SmallMap_TaLouItem();
					ui_map.y = 118;
					ui_map.setData();
					break;
				// 玉笔峰
				case EnumData.MAP_BIG_MAP_ID.MAP_YU_BI:
					// ui_map = new view.map.SmallMap_YuBiItem();
					ui_map.y = 118;
					ui_map.setData();
					break;
				// 嵩山
				case EnumData.MAP_BIG_MAP_ID.MAP_SONG_SHAN:
					// ui_map = new view.map.SmallMap_SongShanItem();
					ui_map.y = 118;
					ui_map.setData();
					break;
				// 全真
				case EnumData.MAP_BIG_MAP_ID.MAP_QUAN_ZHEN:
					// ui_map = new view.map.SmallMap_QuanZhenItem();
					ui_map.y = 118;
					ui_map.setData();
					break;
				// 青城派
				case EnumData.MAP_BIG_MAP_ID.MAP_QING_CHENG:
					// ui_map = new view.map.SmallMap_QingChengItem();
					ui_map.y = 118;
					ui_map.setData();
					break;
				//衡山派
				case EnumData.MAP_BIG_MAP_ID.MAP_HENG_SHAN_PAI:
					// ui_map = new view.map.SmallMap_HengShanItem();
					ui_map.y = 118;
					ui_map.setData();
					break;
				//泰山
				case EnumData.MAP_BIG_MAP_ID.MAP_TAI_SHAN:
					// ui_map = new view.map.SmallMap_TaiShanItem();
					ui_map.y = 118;
					ui_map.setData();
					break;
				//恒山
				case EnumData.MAP_BIG_MAP_ID.MAP_HENG_SHANA:
					// ui_map = new view.map.SmallMap_HengShanAItem();
					ui_map.y = 118;
					ui_map.setData();
					break;
				//风刀门
				case EnumData.MAP_BIG_MAP_ID.MAP_FENG_DAO:
					// ui_map = new view.map.SmallMap_FengDaoItem();
					ui_map.y = 118;
					ui_map.setData();
					break;
			}

		}
	}
}