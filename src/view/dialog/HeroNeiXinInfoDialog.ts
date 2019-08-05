/**Created by the LayaAirIDE*/
module view.dialog{
	export class HeroNeiXinInfoDialog extends ui.dialog.HeroNeiXinInfoDialogUI{
		constructor(){
			super();
				this.addEvent();
		}
			public addEvent(): void {
			this.btn_jiNengClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
		})
	}
	}
}