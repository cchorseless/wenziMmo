/**Created by the LayaAirIDE*/
module view.map {
	export class SmallMap_fengduItem extends ui.map.SmallMap_fengduItemUI {
		constructor() {
			super();
		}

		public setData(): void {
			for (let i = 9001; i < 9006; i++) {
				let btn: Laya.Button = this['btn_' + i];
				btn.label = '' + SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + i);
				btn.labelSize = (btn.label.length > 3) ? 19 : 25;
				btn.skin = 'image/map/smallMap/smallmap_icon_' + SheetConfig.mapRoomSheet.getInstance(null).ICONPIC('' + i) + '.png';
			}
			this.addEvent();
		}

		public addEvent(): void {
			for (let i = 9001; i < 9006; i++) {
				EventManage.onWithEffect(this['btn_' + i], Laya.UIEvent.CLICK, this, () => {
					PanelManage.Main && PanelManage.Main.joinRoom(i);
				})
			}

		}
	}
}