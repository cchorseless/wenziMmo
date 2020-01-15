/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_MiJi_Panel extends ui.wuXue.WuXue_MiJi_PanelUI {
		public tabID = 0;
		constructor() {
			super();
			this.addEvent();
		}
		public setData() {
			this.btn_recircle.disabled = true;
			this.btn_miji.selected = true;
			for (let i = 0; i < 4; i++) {
				let box = new Laya.Box();
				box.top = box.bottom = box.right = box.left = 0;
				this.V_Show.addItem(box);
			}

			this.V_Show.selectedIndex = this.tab_show.selectedIndex = this.tabID;
			this.setInitView(this.tabID, false)
		}
		public setInitView(id, boo) {

			let box = this.V_Show.getChildAt(id);
			if (boo) {
				box.removeChildren();
			}
			if (box.numChildren <= 0) {
				let o = new WuXue_MiJi_VS_Info()
				o.setData(id)
				box.addChild(o);
			}
			this.V_Show.selectedIndex = id;
		}
		public Dispose(): void {
			GameApp.LListener.offCaller(ProtoCmd.WX_upData_panel_MiJi, this);
			PopUpManager.Dispose(this);
		}
		public addEvent(): void {

			GameApp.LListener.on(ProtoCmd.WX_upData_panel_MiJi, this, function () {
				this.setInitView(this.tabID, true)

			})


			this.tab_show.on(Laya.UIEvent.CLICK, this, () => {
				// this.VS_show.selectedIndex = this.tab_wuxue.selectedIndex;
				this.tabID = this.tab_show.selectedIndex;
				this.setInitView(this.tabID, false)
			})
			this.btn_miji.on(Laya.UIEvent.CLICK, this, () => {
				return;
			})
			this.btn_waigong.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueWaiGongPanel();

			})
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});
		}
	}
}