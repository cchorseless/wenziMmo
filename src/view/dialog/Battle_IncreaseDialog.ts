/**Created by the LayaAirIDE*/
module view.dialog {
	export class Battle_IncreaseDialog extends ui.dialog.Battle_IncreaseDialogUI {
		constructor() {
			super();
		}
		public setData(before: number, after: number): Battle_IncreaseDialog {
			if (after > before) {
				this.img_add.scaleY = 1;
				this.img_add.y = 0;
				this.lbl_add.text = '' + (after - before);
			}
			if (after < before) {
				this.img_add.scaleY = -1;
				this.img_add.y = 44;
				this.lbl_add.text = '' + (before - after);
			}
			this.lbl_battle.text = '' + before;
			GameUtil.battleChange(this.lbl_battle, before, after,this);
			return this;
		}
	}
}