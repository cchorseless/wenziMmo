/**Created by the LayaAirIDE*/
module view.compart {
	export class FriendNearbyItem extends ui.compart.FriendNearbyItemUI {
		constructor() {
			super();
			this.addEvent();
		}
		public item;

		/**
		 * 设置附近玩家信息
		 * @param item 
		 */
		public setNearbyPlayerInfo(item: GameObject.Player): FriendNearbyItem {
			this.item = item;
			this.lbl_playerName.text = '' + this.item.objName;
			this.lbl_lvl.text = '' + this.item.level;
			this.lbl_guild.text = '' + this.item.guildInfo.szName;
			// 如果是自己不显示
			this.btn_nearby.visible = (item.tempId != GameApp.MainPlayer.tempId);
			return this;
		}

		/**
		 * 设置查找玩家信息
		 * @param item 
		 */
		public setFindPlayerInfo(item: ProtoCmd.stFindResultBase): FriendNearbyItem {
			this.item = item;
			return this;
		}
		public addEvent(): void {
			this.btn_nearby.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.FriendNearbyDialog().setData(this.item).popup();
			});
		}
	}
}