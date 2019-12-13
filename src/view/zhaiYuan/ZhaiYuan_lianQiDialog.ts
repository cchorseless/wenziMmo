/**Created by the LayaAirIDE*/
module view.zhaiYuan {
	export class ZhaiYuan_lianQiDialog extends ui.zhaiYuan.ZhaiYuan_lianQiDialogUI {
		constructor() {
			super();
			this.group = 'ZhaiYuan_lianQiDialog';
			this.setData();
			this.addEvent();
		}
		public setData() {
			for (let i = 0; i < 3; i++) {
				let box = new Laya.Box();
				box.top = box.bottom = box.right = box.left = 0;
				this.view_SMain.addItem(box);
			}
			this.view_SMain.selectedIndex = this.tab_top.selectedIndex = 0;
			this.onShowItem(0);
		}
		public addEvent(): void {
			this.tab_top.selectHandler = Laya.Handler.create(this, (index) => {
				// this.getData_PlayerEquipMsg(this.curPage, this.TouchID)
				this.view_SMain.selectedIndex = this.tab_top.selectedIndex;
				this.onShowItem(this.tab_top.selectedIndex);
			}, null, false);
			EventManage.onWithEffect(this.btn_close, Laya.UIEvent.CLICK, this, this.onclose);
		}
		public onclose(): void {
			// GameApp.LListener.offCaller(ProtoCmd.soulStoneLevel, this);
			// GameApp.LListener.offCaller(LcpEvent.UPDATE_UI_LIANQI_CHUANSHI_UI, this);
			this.close()
		}
		public onShowItem(id) {
			let box = this.view_SMain.getChildAt(id);
			if (box.numChildren == 0) {
				if (id == 0) {
					box.removeChildren();
					let o = new ZhaiYuan_LianQi_Intensify()
					o.setData()
					box.addChild(o);
				}else if (id == 1) {
					box.removeChildren();
					let o = new ZhaiYuan_LianQi_SoulStone()
					o.setData()
					box.addChild(o);
				}else if (id == 2) {
					box.removeChildren();
					let o = new ZhaiYuan_LianQi_CSitem()
					o.setData()
					box.addChild(o);
				} else if (id == 3) {
					// box.removeChildren();
					// let o = new ZhaiYuan_LianQi_HQitem()
					// o.setData()
					// box.addChild(o);
				}
			}
		}

	}
}