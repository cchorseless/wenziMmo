/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_TalentInfoBtnItem extends ui.juese.Person_TalentInfoBtnItemUI {
		constructor() {
			super();
		}
		public id;
		public setData(id): Person_TalentInfoBtnItem {
			this.id = id;
			//天赋效果
			this.btn_talent.skin = PathUtil.getItemIconPath(id);
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.InfoV0Dialog().setData(this.id).popup();
			})
		}
	}
}