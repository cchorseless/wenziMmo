/**Created by the LayaAirIDE*/
module view.main {
	export class LuYin_PlaceItem extends ui.main.LuYin_PlaceItemUI {
		constructor() {
			super();
			this.addEvent();
		}
		public tabID;// tabID
		public index;// 位置ID
		public roomID;// 房间ID
		public setData(data: { idx: number, roomID: number }, tabID: number) {
			this.tabID = tabID;
			this.index = data.idx;
			this.btn_delete.visible = false;
			// 存了数据
			if (data.roomID) {
				this.roomID = '' + data.roomID;
				this.lab_cityName.text = SheetConfig.mapRoomSheet.getInstance(null).MAPNAME(this.roomID);
				this.lab_locationName.text = SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME(this.roomID);
				this.img_location.skin = 'image/map/smallMap/smallmap_icon_' + SheetConfig.mapRoomSheet.getInstance(null).ICONPIC(this.roomID) + '.png';
				this.viw_0.selectedIndex = 1;
			}
			// 没有存数据
			else {
				this.viw_0.selectedIndex = 0;
			}

		}

		public addEvent(): void {
			// 添加
			this.btn_add.on(Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.addChuangSongRecord, [this.tabID, this.index])
				lcp.send(pkt);
			});
			// 删除
			this.btn_delete.on(Laya.UIEvent.CLICK, this, () => {
				let p = Laya.Handler.create(this, () => {
					this.btn_delete.visible = false;
					let pk = new ProtoCmd.QuestClientData().setString(ProtoCmd.delChuangSongRecord, [this.tabID, this.index])
					lcp.send(pk);
				})
				new view.dialog.SureOrCanelDialog().setData('确定删除此地点吗？', p).show();
			});
			// 前往
			this.img_location.on(Laya.UIEvent.CLICK, this, () => {
				if (this.roomID == GameApp.MainPlayer.roomId) {
					TipsManage.showTips('已在该房间')
					return;
				}
				let p = Laya.Handler.create(this, () => {
					let pk = new ProtoCmd.QuestClientData().setString(ProtoCmd.MAP_MOVE, [this.roomID, this.tabID]);
					lcp.send(pk);
				})
				new view.dialog.SureOrCanelDialog().setData('确定前往[' + this.lab_cityName.text + ']-' + this.lab_locationName.text + '-吗？', p).show(true);
			})

		}

		public showDelete(isbool): void {
			if (this.roomID) {
				this.btn_delete.visible = isbool;
			}
			else {
				this.btn_delete.visible = false;
			}
		}
	}
}
