/**Created by the LayaAirIDE*/
module view.dialog {
	export class SetUpDialog extends ui.dialog.SetUpDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.panel_shezhi.vScrollBarSkin = '';
			this.panel_item0.vScrollBarSkin = '';
			this.vbox_item0['sortItem'] = (items) => { };
			this.panel_item1.vScrollBarSkin = '';
			this.vbox_item1['sortItem'] = (items) => { };
			this.panel_item2.vScrollBarSkin = '';
			this.vbox_item2['sortItem'] = (items) => { };
			for (let i = 0; i < 3; i++) {
				this['ui_item' + i].name = 0;
				this.vbox_item0.addChild(new view.compart.SetUpDaoJuItem())
				this.vbox_item1.addChild(new view.compart.SetUpDaoJuItem())
				this.vbox_item2.addChild(new view.compart.SetUpDaoJuItem())
			}
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			for (let i = 0; i < 3; i++) {
				//展开等级及货币选择条件
				this['btn_setup' + i].on(Laya.UIEvent.CLICK, this, () => {
					for (let j = 0; j < 3; j++) {
						Laya.Tween.to(this['img_setup' + j], { scaleX: 0, scaleY: 0 }, 300);
					}
					this['btn_setup' + i].selected = !this['btn_setup' + i].selected;
					this.openEvent(this['btn_setup' + i].selected, i);
				})
				//展开道具列表
				this['ui_item' + i].on(Laya.UIEvent.CLICK, this, () => {
					for (let j = 0; j < 3; j++) {
						Laya.Tween.to(this['img_item' + j], { scaleX: 0, scaleY: 0 }, 300);
					}
					if (this['ui_item' + i].name == 0) {
						this['ui_item' + i].name = 1;
					}
					else {
						this['ui_item' + i].name = 0;
					}
					this.openDaoJuEvent(this['ui_item' + i].name, i);
				})
			}
		}
		/**
		 * 展开等级及货币选择条件
		 */
		public openEvent(open: boolean, i: number): void {
			if (open) {
				Laya.Tween.to(this['img_setup' + i], { scaleX: 1, scaleY: 1 }, 300);
			}
			else {
				Laya.Tween.to(this['img_setup' + i], { scaleX: 0, scaleY: 0 }, 300);
			}
		}
		/**
		 * 展开道具列表
		 * @param open 
		 * @param j 
		 */
		public openDaoJuEvent(open: number, i: number): void {
			if (open == 1) {
				Laya.Tween.to(this['img_item' + i], { scaleX: 1, scaleY: 1 }, 300);
			}
			else {
				Laya.Tween.to(this['img_item' + i], { scaleX: 0, scaleY: 0 }, 300);

			}
		}
	}
}