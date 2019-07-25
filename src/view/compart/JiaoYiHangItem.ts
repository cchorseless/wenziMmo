/**Created by the LayaAirIDE*/
module view.compart {
	export class JiaoYiHangItem extends ui.compart.JiaoYiHangItemUI {
		constructor() {
			super();
			this.setData();
			this.addEvent();
		}

		public setData(): void {
			this.panel_0.vScrollBarSkin = '';
			this.img_jobShow.scaleY = this.img_levelShow.scaleY = this.img_typeShow.scaleY = 0;
			this.img_jobShow.visible = this.img_levelShow.visible = this.img_typeShow.visible = false;

			this.tab_job.selectHandler = Laya.Handler.create(this, (index) => {
				this.showTab('btn_job');
			}, null, false);
			this.tab_level.selectHandler = Laya.Handler.create(this, (index) => {
				this.showTab('btn_level');
			}, null, false);
			this.tab_type.selectHandler = Laya.Handler.create(this, (index) => {
				this.showTab('btn_type');
			}, null, false);

		}

		public addEvent(): void {
			this.btn_job.on(Laya.UIEvent.CLICK, this, this.showTab, ['btn_job']);
			this.btn_level.on(Laya.UIEvent.CLICK, this, this.showTab, ['btn_level']);
			this.btn_type.on(Laya.UIEvent.CLICK, this, this.showTab, ['btn_type']);
		}

		public showTab(btnSign): void {
			let btn;
			let img;
			switch (btnSign) {
				case 'btn_job':
					btn = this.btn_job;
					img = this.img_jobShow;
					break;
				case 'btn_level':
					btn = this.btn_level;
					img = this.img_levelShow;
					break;
				case 'btn_type':
					btn = this.btn_type;
					img = this.img_typeShow;
					break;
			}
			btn.selected = !btn.selected;
			if (btn.selected) {
				img.visible = true;
				Laya.Tween.to(img, { scaleY: 1 }, 300)
			}
			else {
				Laya.Tween.to(img, { scaleY: 0 }, 300, null, Laya.Handler.create(this, () => {
					img.visible = false;
				}))
			}
		}
	}
}