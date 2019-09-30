/**Created by the LayaAirIDE*/
module view.dialog {
	export class ProgressDialog extends ui.dialog.ProgressDialogUI {
		constructor() {
			super();
		}
		public setData(title: string, time: number): ProgressDialog {
			this.lbl_title.text = title;
			this.img_jinDu.width = 100;
			Laya.Tween.to(this.img_jinDu, { width: 640 }, time, Laya.Ease.sineInOut, Laya.Handler.create(
				this, () => {
					this.close();
				}
			))
			return this;
		}

		public addEvent(): void {

		}
	}
}