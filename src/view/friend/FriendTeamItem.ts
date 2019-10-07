/**Created by the LayaAirIDE*/
module view.friend {
	export class FriendTeamItem extends ui.friend.FriendTeamItemUI {
		constructor() {
			super();
		}
		public setData(item: ProtoCmd.stRelationInfoBase): FriendTeamItem {
			this.lbl_name.text = '' + item.szName;
			this.lbl_lvl.text = '' + item.level;
			this.lbl_guild.text = '' + item.guildName;
			this.addEvent();
			this.addEvent();
			return this
		}
		public addEvent(): void {
			this.btn_blackList.on(Laya.UIEvent.CLICK, this, () => {
				new view.friend.FriendBlackListDialog().popup();
			});
		}
		public showMore(v: boolean): void {
			if (v) {
				// Laya.Tween.to(this.img_black, { scaleY: 1 }, 500);
			}
			else {
				// Laya.Tween.to(this.img_black, { scaleY: 0 }, 500);
			
			}
		}
	}
}