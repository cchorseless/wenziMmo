/**Created by the LayaAirIDE*/
module view.dialog {
	export class SureOrCanelDialog extends ui.dialog.SureOrCanelDialogUI {
		constructor() {
			super();
			this.addEvent();
		}
		public model: EnumData.SureCanelModel;
		public extData;
		/**
		 * 
		 * @param model 
		 * @param txt 
		 * @param data 
		 */
		public setData(txt: string, model: EnumData.SureCanelModel, extData = null): SureOrCanelDialog {
			this.model = model;
			this.lbl_context.text = txt;
			this.extData = extData;
			return this;
		}
		public addEvent(): void {
			this.btn_canel.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			});
			this.btn_sure.on(Laya.UIEvent.CLICK, this, () => {
				this.close('sure');
			});
		}
		public onClosed(type?: string): void {
			if (type === 'sure') {
				switch (this.model) {
					// 背包内删除道具
					case EnumData.SureCanelModel.DELET_ITEM:
						let packect = new ProtoCmd.CretForsakeItem()
						packect.setValue('i64id', this.extData)
						lcp.send(packect, this, (data) => {
							let msg = new ProtoCmd.CretForsakeItem(data);
							let errorcode = msg.getValue('btErrorCode');
							switch (errorcode) {
								case 0:
									TipsManage.showTips('丢弃物品成功');
									break;
								case 33:
									TipsManage.showTips('绑定物品不允许丢弃');
									break;
								default:
									TipsManage.showTips('该物品不允许丢弃');
									break;
							}
							msg.clear();
							msg = null;
						});
						break;
				}

			}
		}
	}
}