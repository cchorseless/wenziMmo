/**Created by the LayaAirIDE*/
module view.dialog{
	export class ChapterListDialog extends ui.dialog.ChapterListDialogUI{
		constructor(){
			super();
			this.setData();
		}
			public setData(): void {
				
			this.btn_chapterListClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
		})
	}
	}
}