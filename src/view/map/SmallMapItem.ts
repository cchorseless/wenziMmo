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
			this.init_task();
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
			//任务
			EventManage.onWithEffect(this.btn_task, Laya.UIEvent.CLICK, this, function () {
				new view.dialog.TaskDialog().setData().popup();
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

		/**
  		 * 加载大地图
  		 */
		public openBigMap(): void {
			switch (GameApp.MainPlayer.location.mapid) {
				// 酆都
				case EnumData.MAP_BIG_MAP_ID.MAP_FENG_DU:
					new view.map.SmallMap_fengduDialog().popup();
					break;
				// 福州城
				case EnumData.MAP_BIG_MAP_ID.MAP_FU_ZHOU_CHENG:
					new view.map.SmallMap_fuzhouDialog().popup();
					break;
				// 华山派
				case EnumData.MAP_BIG_MAP_ID.MAP_HUA_SHAN_PAI:
					new view.map.SmallMap_HuaShanDialog().popup();
					break;
				// 玉壶
				case EnumData.MAP_BIG_MAP_ID.MAP_YU_HU:
					new view.map.SmallMap_YuHuDialog().popup();
					break;
				// 药王庄
				case EnumData.MAP_BIG_MAP_ID.MAP_YAO_WANG:
					new view.map.SmallMap_YaoWangDialog().popup();
					break;
				// 洛阳
				case EnumData.MAP_BIG_MAP_ID.MAP_LUO_YANG:
					new view.map.SmallMap_LuoYangDialog().popup();
					break;
				// 良人鎮
				case EnumData.MAP_BIG_MAP_ID.MAP_LIANG_REN:
					new view.map.SmallMap_LiangRenDialog().popup();
					break;
				// 塔楼
				case EnumData.MAP_BIG_MAP_ID.MAP_TA_LOU:
					new view.map.SmallMap_TaLouDialog().popup();
					break;
				// 玉笔峰
				case EnumData.MAP_BIG_MAP_ID.MAP_YU_BI:
					new view.map.SmallMap_YuBiDialog().popup();
					break;
				// 魔教
				case EnumData.MAP_BIG_MAP_ID.MAP_MO_JIAO:
					new view.map.SmallMap_MoJiaoDialog().popup();
					break;
				// 摩尼教
				case EnumData.MAP_BIG_MAP_ID.MAP_MO_NI_JIAO:
					new view.map.SmallMap_MoNiJiaoDialog().popup();
					break;
				// 嵩山
				case EnumData.MAP_BIG_MAP_ID.MAP_SONG_SHAN:
					new view.map.SmallMap_SongShanDialog().popup();
					break;
				// 风云楼
				case EnumData.MAP_BIG_MAP_ID.MAP_FENG_YUN_LOU:
					new view.map.SmallMap_FengYunLouDialog().popup();
					break;
				// 丐帮
				case EnumData.MAP_BIG_MAP_ID.MAP_GAI_BANG:
					new view.map.SmallMap_GaiBangDialog().popup();
					break;
				//少林寺
				case EnumData.MAP_BIG_MAP_ID.MAP_SHAO_LIN:
					new view.map.SmallMap_ShaoLinShiDialog().popup();
					break;
				//风刀门
				case EnumData.MAP_BIG_MAP_ID.MAP_FENG_DAO:
					new view.map.SmallMap_FengDaoDialog().popup();
					break;
			}
		}
		public init_task(): void {
			this.lbl_now.text = '' + GameApp.MainPlayer.nTili;
			this.lbl_max.text = '/100';
			let zhuxianTask = GameApp.GameEngine.taskInfo[EnumData.TaskType.SYSTEM];
			if (zhuxianTask) {
				for (let i in zhuxianTask) {
					let taskInfo: ProtoCmd.stQuestInfoBase = zhuxianTask[i]
					this.lbl_task.text = taskInfo.questname;
					this.div_des.style.fontSize = 20;
					this.div_des.innerHTML = taskInfo.target;
					switch (taskInfo.queststatus) {
						case 0: case 1:
							this.lbl_state.text = '进行中';
							this.lbl_state.color = '#c43939';
							break;
						case 2: case 3:
							this.lbl_state.text = '已完成';
							this.lbl_state.color = '#39ad32';
							break;
					}
					this.lbl_state.x = this.lbl_task.x + this.lbl_task.width + 5;
				}
			} else {
				this.lbl_task.text = '暂无主线';
				this.div_des.innerHTML = '';
				this.lbl_state.text = '';
			}
		}
	}
}