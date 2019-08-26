/**Created by the LayaAirIDE*/
module view.juQingMode {
	export class JuQingModePanel extends ui.juQingMode.JuQingModePanelUI {
		constructor() {
			super();
		}

		public setData(): void {
			this.panel_0.vScrollBarSkin = '';
			this.vbox_0['sortItem'] = (items) => { };
			for (let i = 10001; i < 10008; i++) {
				this.addJuQingTalkItem('' + i);
			}
			this.addEvent();
		}
		public addEvent(): void {
			// 添加剧情对白
			this.vbox_0.on(Laya.UIEvent.CLICK, this, () => {
				let juqingId = parseInt(this.juqingId) + 1;
				if (juqingId > 10030) return;
				this.addJuQingTalkItem('' + juqingId);
				this.panel_0.scrollTo(0, this.vbox_0.height);
			});
			// 剧情进度
			this.btn_juQing.on(Laya.UIEvent.CLICK, this, this.openPanel, ['btn_juQing']);
			// 副本
			this.btn_fuBen.on(Laya.UIEvent.CLICK, this, this.openPanel, ['btn_fuBen']);
			// 图鉴
			this.btn_tuJian.on(Laya.UIEvent.CLICK, this, this.openPanel, ['btn_tuJian']);
			// 任务
			this.btn_task.on(Laya.UIEvent.CLICK, this, this.openPanel, ['btn_task']);
			// 场景模式
			this.btn_changeMode.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});
		}

		public juqingId: string;// 剧情对白ID
		public addJuQingTalkItem(juqingId: string): void {
			this.juqingId = juqingId;
			let npc = SheetConfig.juQingTxtSheet.getInstance(null).NPCID(juqingId);
			let context = SheetConfig.juQingTxtSheet.getInstance(null).TXTCONTENT(juqingId);
			let ui_item;
			switch (npc) {
				case '0':
					ui_item = new view.compart.JuQingContentV0Item();
					ui_item.setData(context);
					break;
				case '1':
					ui_item = new view.compart.JuQingContentV1Item();
					ui_item.setData(context);
					break
				default:
					ui_item = new view.compart.JuQingContentV2Item();
					ui_item.setData(npc, context);
					break;
			}
			this.vbox_0.addChild(ui_item);
		}


		public openPanel(msg): void {
			let btn_tmp: Laya.Button = this[msg];
			if (btn_tmp.selected) { return };
			btn_tmp.selected = true;
			switch (msg) {
				case 'btn_juQing':
					PanelManage.openJuQingInfoPanel()
					break;
				case 'btn_fuBen':
					PanelManage.openFuBenPanel()
					break;
				case 'btn_tuJian':
					PanelManage.openTuJianJiangHuPanel()
					break;
				case 'btn_task':
					PanelManage.openTaskPanel();
					break;
			}

		}
	}
}