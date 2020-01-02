/**Created by the LayaAirIDE*/
module view.map {
	export class SmallMap_fuzhouItem extends ui.map.SmallMap_fuzhouItemUI {
		constructor() {
			super();
		}

		public setData(): void {
			for (let i = 10001; i <= 10027; i++) {
				let btn: Laya.Button = this['btn_' + i];
				btn.label = '' + SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + i);
				btn.labelSize = (btn.label.length > 4) ? 16 : 20;
				btn.skin = 'image/map/smallMap/smallmap_icon_' + SheetConfig.mapRoomSheet.getInstance(null).ICONPIC('' + i) + '.png';
			}

			this.addEvent();
		}

		public addEvent(): void {
			for (let i = 10001; i <= 10027; i++) {
				EventManage.onWithEffect(this['btn_' + i], Laya.UIEvent.CLICK, this, () => {

					// 设置导航
					let findMap = new GameUtil.findMapPath(10001, 10027).minPath(GameApp.MainPlayer.roomId, i);
					console.log(findMap);
					GameUtil.parseMapPath(findMap);

				})
			}
		}
	}

}
