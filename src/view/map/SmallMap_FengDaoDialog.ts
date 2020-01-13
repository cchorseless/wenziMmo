/**Created by the LayaAirIDE*/
module view.map {
	export class SmallMap_FengDaoDialog extends ui.map.SmallMap_FengDaoDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			for (let i = 26001; i <= 26011; i++) {
				let btn: Laya.Button = this['btn_' + i];
				btn.label = '' + SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + i);
				btn.labelSize = (btn.label.length > 4) ? 16 : 18;
				btn.skin = 'image/map/smallMap/smallmap_icon_' + SheetConfig.mapRoomSheet.getInstance(null).ICONPIC('' + i) + '.png';
			}
			this.addEvent();
		}
		public addEvent(): void {
			for (let i = 26001; i <= 26011; i++) {
				EventManage.onWithEffect(this['btn_' + i], Laya.UIEvent.CLICK, this, () => {
					// 隐藏自己
					// GameApp.SceneManager.showBigMap(false);
					// 设置导航
					let findMap = new GameUtil.findMapPath(26001, 26011).minPath(GameApp.MainPlayer.roomId, i);
					console.log(findMap);
					GameUtil.parseMapPath(findMap);
					this.close();
				})
			}
		}
	}
	// export class SmallMap_FengDaoItem extends ui.map.SmallMap_FengDaoItemUI {
	// 	constructor() {
	// 		super();
	// 	}
	// 	public setData(): void {
	// 		for (let i = 26001; i <= 26012; i++) {
	// 			let btn: Laya.Button = this['btn_' + i];
	// 			btn.label = '' + SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + i);
	// 			btn.labelSize = (btn.label.length > 4) ? 16 : 18;
	// 			btn.skin = 'image/map/smallMap/smallmap_icon_' + SheetConfig.mapRoomSheet.getInstance(null).ICONPIC('' + i) + '.png';
	// 		}
	// 		this.addEvent();
	// 	}
	// 	public addEvent(): void {
	// 		for (let i = 26001; i <= 26012; i++) {
	// 			EventManage.onWithEffect(this['btn_' + i], Laya.UIEvent.CLICK, this, () => {
	// 				// 设置导航
	// 				let findMap = new GameUtil.findMapPath(26001, 26012).minPath(GameApp.MainPlayer.roomId, i);
	// 				console.log(findMap);
	// 				GameUtil.parseMapPath(findMap);
	// 			})
	// 		}
	// 	}
	// }
}