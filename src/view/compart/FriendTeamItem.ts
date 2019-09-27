/**Created by the LayaAirIDE*/
module view.compart {
	export class FriendTeamItem extends ui.compart.FriendTeamItemUI {
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
				new view.dialog.FriendBlackListDialog().popup();
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