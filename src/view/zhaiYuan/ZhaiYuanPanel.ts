/**Created by the LayaAirIDE*/
module view.zhaiYuan {
	export class ZhaiYuanPanel extends ui.zhaiYuan.ZhaiYuanPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_shiWai.hScrollBarSkin = '';
			this.panel_yiLou.hScrollBarSkin = '';

			this.initSkeBone();
			this.addEvent();
		}

		public initSkeBone(): void {
			let birdSke = new SkeletonUtil.SkeletonGroup();
			birdSke.loadRes(['sk/zhaiyuan_niao/CJ_NIAO_1.sk'], () => {
				this.panel_shiWai.addChild(birdSke);
				birdSke.pos(this.width / 2, this.height * 0.3);
				// this._skeGroup.scale(0.5, 0.5)
				birdSke.play(0, true);
			});

			// let guanJia = new SkeletonUtil.SkeletonGroup();
			// guanJia.loadRes(['sk/zhaiyuan_laoguanjia/NPC_LGJ_1.sk'], () => {
			// 	this.spr_guanJia.removeChildren();
			// 	this.spr_guanJia.addChild(guanJia);
			// 	// this._skeGroup.scale(0.5, 0.5)
			// 	guanJia.play(0, true);
			// });
		}
		public addEvent(): void {
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel()
			})
			EventManage.onWithEffect(this.btn_changeMode, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});
			EventManage.onWithEffect(this.box_shiNei, Laya.UIEvent.CLICK, this, () => {
				this.viw_0.selectedIndex = 1;
			});
			EventManage.onWithEffect(this.box_geLou, Laya.UIEvent.CLICK, this, () => {
				this.viw_0.selectedIndex = 2;
			});
			EventManage.onWithEffect(this.box_yuanZi, Laya.UIEvent.CLICK, this, () => {
				this.viw_0.selectedIndex = 0;
			});
			EventManage.onWithEffect(this.box_yiLou, Laya.UIEvent.CLICK, this, () => {
				this.viw_0.selectedIndex = 1;
			});

		}
	}
}