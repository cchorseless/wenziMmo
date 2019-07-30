/**Created by the LayaAirIDE*/
module view.yangCheng {
	export class YangChengPanel extends ui.yangCheng.YangChengPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_yangCheng.hScrollBarSkin = '';
			this.panel_yangCheng.scrollTo(100, 0);
			this.initSkeBone();
		}

		public initSkeBone(): void {
			let birdSke = new SkeletonUtil.SkeletonGroup();
			birdSke.loadRes(['sk/zhaiyuan_niao/CJ_NIAO_1.sk'], () => {
				this.panel_yangCheng.addChild(birdSke);
				birdSke.pos(this.width / 2, this.height * 0.3);
				// this._skeGroup.scale(0.5, 0.5)
				birdSke.play(0, true);
			});

			let guanJia = new SkeletonUtil.SkeletonGroup();
			guanJia.loadRes(['sk/zhaiyuan_laoguanjia/NPC_LGJ_1.sk'], () => {
				this.spr_guanJia.removeChildren();
				this.spr_guanJia.addChild(guanJia);
				// this._skeGroup.scale(0.5, 0.5)
				guanJia.play(0, true);
			});
		}
	}
}