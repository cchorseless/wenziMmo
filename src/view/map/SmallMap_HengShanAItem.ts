/**Created by the LayaAirIDE*/
module view.map {
	export class SmallMap_HengShanAItem extends ui.map.SmallMap_HengShanAItemUI {
		constructor() {
			super();
		}
		public setData(): void {
			for (let i = 25001; i <= 25012; i++) {
				let btn: Laya.Button = this['btn_' + i];
				btn.label = '' + SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + i);
				btn.labelSize = (btn.label.length > 4) ? 16 : 18;
				btn.skin = 'image/map/smallMap/smallmap_icon_' + SheetConfig.mapRoomSheet.getInstance(null).ICONPIC('' + i) + '.png';
			}
			this.addEvent();
		}
		public addEvent(): void {
			for (let i = 25001; i <= 25012; i++) {
				EventManage.onWithEffect(this['btn_' + i], Laya.UIEvent.CLICK, this, () => {
					// 隐藏自己
					GameApp.SceneManager.showBigMap(false);
					// 设置导航
					let findMap = new GameUtil.findMapPath(25001, 25012).minPath(GameApp.MainPlayer.roomId, i);
					console.log(findMap);
					GameUtil.parseMapPath(findMap);
				})
			}
		}
	}
}