/**Created by the LayaAirIDE*/
module view.map{
	export class SmallMap_LuoYangItem extends ui.map.SmallMap_LuoYangItemUI{
		constructor(){
			super();
		}
			public setData(): void {
			for (let i = 14001; i <= 14033; i++) {
				let btn: Laya.Button = this['btn_' + i];
				btn.label = '' + SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + i);
				btn.labelSize = (btn.label.length > 3) ? 18 : 20;
				btn.skin = 'image/map/smallMap/smallmap_icon_' + SheetConfig.mapRoomSheet.getInstance(null).ICONPIC('' + i) + '.png';
			}
			this.addEvent();
		}
		public addEvent(): void {
			for (let i = 14001; i <= 14033; i++) {
				EventManage.onWithEffect(this['btn_' + i], Laya.UIEvent.CLICK, this, () => {
					// 隐藏自己
					GameApp.SceneManager.showBigMap(false);
					// 设置导航
					let findMap = new GameUtil.findMapPath(14001, 14033).minPath(GameApp.MainPlayer.roomId, i);
					console.log(findMap);
					GameUtil.parseMapPath(findMap);
				})
			}
		}
	}
}