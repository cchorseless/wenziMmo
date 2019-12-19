/**Created by the LayaAirIDE*/
module view.zhaiYuan {
	export class ZhaiYuanPanel extends ui.zhaiYuan.ZhaiYuanPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_shiWai.hScrollBarSkin = '';
			this.panel_yiLou.hScrollBarSkin = '';
			this.initUI();
			// 延时两帧滚动
			Laya.timer.frameOnce(2, this, () => { this.panel_shiWai.scrollTo(640, 0) });
			this.initSkeBone();
			this.addEvent();

		}


		public initUI(): void {
			let getScaleY = PanelManage.getScaleY();
			this.box_heHuaChi.scaleY = getScaleY;
			this.box_back.scaleY = getScaleY;
			this.box_back.y = this.box_back.y * getScaleY;
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

			EventManage.onWithEffect(this.box_back, Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			});

			// 荷花池
			EventManage.onWithEffect(this.box_heHuaChi, Laya.UIEvent.CLICK, this, () => {
				new view.zhaiYuan.ZhaiYuan_yangYuDialog().setData().popup(true);
			});

			// 炼器
			EventManage.onWithEffect(this.box_lianQi, Laya.UIEvent.CLICK, this, () => {
				new view.zhaiYuan.ZhaiYuan_lianQiDialog().popup(true);
			});
			// 磨石  合成装备
			EventManage.onWithEffect(this.box_moshi, Laya.UIEvent.CLICK, this, () => {
				let o = new view.dialog.EquipMixUp();
				o.setData(2)
				o.popup(true);
			});

			//出门按钮
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			});
			this.btn_build.on(Laya.UIEvent.CLICK, this, () => {
				let o = new ZhaiYuan_Build_Dialog();
				o.popup();
			});
			this.btn_servant.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			});
			this.btn_jitui.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			});

		}
	}
}