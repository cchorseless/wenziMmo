/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_SpeLabelItem extends ui.juese.Person_SpeLabelItemUI {
		constructor() {
			super();
		}
		public id;
		public setData(configID) {
			this.id=configID;
			let imgRes = SheetConfig.Label.getInstance(null).GRADE(configID);
			//根据品质判断标签背景
			this.img_bg.skin = 'image/common/tab_rw_0' + imgRes + '.png';
			//根据品质判断字体颜色
			switch(imgRes){
				case 1:
				this.lbl_des.color='#6e862d';
				break;
				case 2:
				this.lbl_des.color='#7d85aa';
				break;
				case 3:
				this.lbl_des.color='#9774ac';
				break;
				case 4:
				this.lbl_des.color='#a9790b';
				break;
				case 5:
				this.lbl_des.color='#a9420b';
				break;
			}
			this.lbl_des.text = SheetConfig.Label.getInstance(null).NAME(configID);
			this.addEvent();
		}
		public addEvent(): void {
			this.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.PlayerTagDialog().setData(this.id).popup(true);
			})
		}
	}
}