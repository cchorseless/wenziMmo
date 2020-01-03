/**Created by the LayaAirIDE*/
module view.map {
	export class SmallMap_TaiShanDialog extends ui.map.SmallMap_TaiShanDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			for (let i = 24001; i <= 24011; i++) {
				let btn: Laya.Button = this['btn_' + i];
				btn.label = '' + SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + i);
				btn.labelSize = (btn.label.length > 4) ? 16 : 18;
				btn.skin = 'image/map/smallMap/smallmap_icon_' + SheetConfig.mapRoomSheet.getInstance(null).ICONPIC('' + i) + '.png';
			}
			this.addEvent();
		}
		public addEvent(): void {
			for (let i = 24001; i <= 24011; i++) {
				EventManage.onWithEffect(this['btn_' + i], Laya.UIEvent.CLICK, this, () => {
					// 设置导航
					let findMap = new GameUtil.findMapPath(24001, 24011).minPath(GameApp.MainPlayer.roomId, i);
					console.log(findMap);
					GameUtil.parseMapPath(findMap);
					this.close();
				})
			}
		}
	}
}