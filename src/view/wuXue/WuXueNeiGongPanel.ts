/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXueNeiGongPanel extends ui.wuXue.WuXueNeiGongPanelUI {
		constructor() {
			super();
		}


		public setData(): void {
			this.initUI();
			this.addEvent();
		}


		public addEvent(): void {
			// 模式切换
			this.btn_changeMode.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel();
			});
			// 返回
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});
			// 外功
			this.btn_waiGong.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueWaiGongPanel()
			});
			// 生活技能
			this.btn_lifeSkill.on(Laya.UIEvent.CLICK, this, () => {
				// PanelManage.openWuXueLifeSkillPanel();
			});
			// 合道
			this.btn_heDao.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueHeDaoPanel();
			});

		}

		public initUI(): void {
			this.ui_item7.lbl_buWei.text = '内功武学';
			this.ui_item8.lbl_buWei.text = '内功武学';
			this.ui_item9.lbl_buWei.text = '内功武学';
			this.ui_item10.lbl_buWei.text = '内功武学';
			// 动画
			this.changeWidthTw();
			
		}

		/**
		 * 动画
		 */
		public changeWidthTw(): void {
			Laya.Tween.to(this.img_exp, { width: this.img_expBg.width }, 3000, null,
				Laya.Handler.create(this, () => {
					this.img_exp.width = 0;
					this.changeWidthTw();
				}));
		}
	}
}