/**Created by the LayaAirIDE*/
module view.compart {
	export class GuildApplyItem extends ui.compart.GuildApplyItemUI {
		constructor() {
			super();
		}
		public item: ProtoCmd.szAskJoinUserInfoBase;
		public setData(item: ProtoCmd.szAskJoinUserInfoBase): void {
			this.item = item;
			this.initUI();
			this.addEvent();
		}

		public initUI(): void {
			this.lbl_playerName.text = '' + this.item.szName;
			this.lbl_lv.text = '' + this.item.dwLevel;
			this.lbl_lastOnLineTime.text = '' + this.item.dwLastLoginOutTime;
		}

		public addEvent(): void {
			this.btn_agree.on(Laya.UIEvent.CLICK, this, this.updateUI, [true]);
			this.btn_refuse.on(Laya.UIEvent.CLICK, this, this.updateUI, [false]);
		}

		public updateUI(isAgree): void {
			if (isAgree) {

			}
			else {

			}

		}

	}
}