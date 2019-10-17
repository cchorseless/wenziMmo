/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_EquipInfoItem extends ui.hero.Hero_EquipInfoItemUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.addEvent();
			this.getEquipBackground();
		}
		public addEvent(): void {

		}
		/**
		 * 初始化装备背景
		 */
		public getEquipBackground(): void {
			for (let i = 0; i < 10; i++) {
				this['ui_item' + i].img_bg.visible = true;
				this['ui_item' + i].img_bg.skin = 'image/common/daoju/itemicon_bg_' + i + '.png';
			}
		}
	}
}