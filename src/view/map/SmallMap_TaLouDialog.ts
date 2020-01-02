/**Created by the LayaAirIDE*/
module view.map {
	export class SmallMap_TaLouDialog extends ui.map.SmallMap_TaLouDialogUI {
		constructor() {
			super();
		}
		public setData(): void {
			for (let i = 16001; i <= 16015; i++) {
				let btn: Laya.Button = this['btn_' + i];
				btn.label = '' + SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + i);
				btn.labelSize = (btn.label.length > 4) ? 16 : 18;
				btn.skin = 'image/map/smallMap/smallmap_icon_' + SheetConfig.mapRoomSheet.getInstance(null).ICONPIC('' + i) + '.png';
			}
			this.addEvent();
		}
		public addEvent(): void {
			for (let i = 16001; i <= 16015; i++) {
				EventManage.onWithEffect(this['btn_' + i], Laya.UIEvent.CLICK, this, () => {

					// 设置导航
					let findMap = new GameUtil.findMapPath(16001, 16015).minPath(GameApp.MainPlayer.roomId, i);
					console.log(findMap);
					GameUtil.parseMapPath(findMap);
				})
			}
		}
	}
}