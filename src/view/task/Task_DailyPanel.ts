/**Created by the LayaAirIDE*/
module view.task {
	export class Task_DailyPanel extends ui.task.Task_DailyPanelUI {
		constructor() {
			super();
		}

		public setData(): void {
			this.panel_0.vScrollBarSkin = '';
			this.vbox_0['sortItem'] = (items) => { };
			this.panel_1.vScrollBarSkin = '';
			this.vbox_1['sortItem'] = (items) => { };
			this.panel_2.vScrollBarSkin = '';
			this.vbox_2['sortItem'] = (items) => { };
			this.panel_3.vScrollBarSkin = '';
			this.vbox_3['sortItem'] = (items) => { };
			for (let i = 0; i < 15; i++) {
				// this.vbox_1.addChild(new view.compart.TaskInfoV0Item())
				// this.vbox_2.addChild(new view.compart.TaskInfoV0Item())
				// this.vbox_3.addChild(new view.compart.TaskInfoV0Item())
			}
			this.tab_0.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_0.selectedIndex = index;
			}, null, false);

			this.addEvent();
			this.init_huoYue();
			this.init_daily();

		}
		public addEvent(): void {
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
		PanelManage.openJuQingModePanel()
			});

			this.btn_changeMode.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});

			this.btn_achieveTask.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTask_ChengJiuPanel()
			});

			this.btn_dailyTask.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTask_DailyPanel()
			});

			this.btn_liLianTask.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTask_LiLianPanel()
			});
			this.btn_juQingTask.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTask_MainPanel()
			});
			this.addLcpEvent();
		}
		/**
			 * 活跃
			 * 
			 */
		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.TASK_HuoYueDuClientOpen, this, (jsonData) => {
				let keys = Object.keys(jsonData.tab);
				console.log('=====>宝箱活跃度',jsonData)
				//活跃度进度条
				if (jsonData.value / jsonData.maxvalue < 1) {
					//当前活跃度/最大活跃度时<1时，进度条长度
					this.img_pregress.width = 447 * jsonData.value / jsonData.maxvalue;
				} else {
					//当前活跃度/最大活跃度时>=1时，进度条长度
					this.img_pregress.width = 447;
				}

				//当前活跃度
				if (jsonData.value < jsonData.maxvalue) {
					//当前活跃度<最大活跃度时
					this.lbl_huoyue.text = '' + jsonData.value;
				}
				else {
					//当前活跃度>=最大活跃度时,显示最大活跃度
					this.lbl_huoyue.text = '' + jsonData.maxvalue;
				}

				for (let key of keys) {
					let data = jsonData.tab[key];
					this.vbox_0.addChild(new view.compart.TaskInfoV0Item().setData(data));
				}
				for (let i = 1; jsonData.wardtab[i]; i++) {
					switch (jsonData.wardtab[i].bj) {
						case 0:
							this['img_baoxiang' + i].skin = 'image/common/icon_baoxiang' + i + '_close.png'
							this.chakan(i, jsonData.wardtab[i].item);
							break;
						case 1:
							this['img_baoxiang' + i].skin = 'image/common/icon_baoxiang' + i + '_light.png'
							this.lingqu(i);
							break;
						case 2:
							this['img_baoxiang' + i].skin = 'image/common/icon_baoxiang' + i + '_open.png'
							break;
					}
				}
			})
		}
		public Dispose(): void {
			GameApp.LListener.offCaller(ProtoCmd.TASK_HuoYueDuClientOpen, this);
			PopUpManager.Dispose(this);
		}

		public init_huoYue(): void {
			let pkt = new ProtoCmd.QuestClientData;
			pkt.setString(ProtoCmd.TASK_HuoYueDuClientOpen)
			lcp.send(pkt);

		}
		public getBaoxiang(id): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.TASK_HuoYueGetWard, [id])
			lcp.send(pkt);

		}
		/**
		 * 活跃领取宝箱奖励
		 */
		public lingqu(i): void {
			if (i = 1) {
				this.img_baoxiang1.on(Laya.UIEvent.CLICK, this, () => {
					i = 1;
					this.getBaoxiang(i);
				});
			}
			if (i = 2) {
				this.img_baoxiang2.on(Laya.UIEvent.CLICK, this, () => {
					i = 2;
					this.getBaoxiang(i);
				});
			}
			if (i = 3) {
				this.img_baoxiang3.on(Laya.UIEvent.CLICK, this, () => {
					i = 3;
					this.getBaoxiang(i);
				});
			}
			if (i = 4) {
				this.img_baoxiang4.on(Laya.UIEvent.CLICK, this, () => {
					i = 4;
					this.getBaoxiang(i);
				});
			}
		}
		/**
		 * 活跃查看宝箱奖励
		 */
		public chakan(i, item): void {
			switch (i) {
				case 1:
					this.img_baoxiang1.on(Laya.UIEvent.CLICK, this, () => {
						new view.dialog.BaoXiangPrizeDialog().setData(item).show();
					});
					break;
				case 2:
					this.img_baoxiang2.on(Laya.UIEvent.CLICK, this, () => {
						new view.dialog.BaoXiangPrizeDialog().setData(item).show();
					});
					break;
				case 3:
					this.img_baoxiang3.on(Laya.UIEvent.CLICK, this, () => {

						new view.dialog.BaoXiangPrizeDialog().setData(item).show();
					});
					break;
				case 4:
					this.img_baoxiang4.on(Laya.UIEvent.CLICK, this, () => {

						new view.dialog.BaoXiangPrizeDialog().setData(item).show();
					});
					break;
			}
		}
		/**
		 * 每日
		 * 
		 */
		public init_daily(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.TASK_DailyTaskClientOpen, null, null, this, (jsonData: { any }) => {
				let keys = Object.keys(jsonData);
					for (let key of keys) {
					let data = jsonData[key];
					this.vbox_1.addChild(new view.compart.TaskInfoV0Item().daily(data));
				}
			})
			lcp.send(pkt);
		}
	}
}