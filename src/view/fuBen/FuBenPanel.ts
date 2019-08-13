/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBenPanel extends ui.fuBen.FuBenPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_left.vScrollBarSkin = '';
			this.panel_event.hScrollBarSkin = '';
			this.hbox_event['sortItem'] = (items) => { };
			this.vbox_left['sortItem'] = (items) => { };

			for (let i = 1; i < 10; i++) {
				this.vbox_left.addChild(new view.compart.JuQingTitleItem().setData('第' + i + '章'));
			}
			this.addEvent();
		}

		public addEvent(): void {
			this.btn_goJuQing.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingTalkPanel();
			})
			this.btn_chapterListCenter.on(Laya.UIEvent.CLICK, this, () => {
					new view.dialog.ChapterListDialog().popup(true);
			})
				this.btn_paiming.on(Laya.UIEvent.CLICK, this, () => {
					new view.dialog.FuBenPaiMingDialog().popup(true);
			})
		this.btn_pinglun.on(Laya.UIEvent.CLICK, this, () => {
					new view.dialog.FuBenPingLunDialog().popup(true);
			})
			this.btn_share.on(Laya.UIEvent.CLICK, this, () => {
					new view.dialog.FuBenShareDialog().popup(true);
			})
		}
	}
}